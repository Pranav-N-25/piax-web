// One-time codes for mobile-number sign-in.
// Codes are random, stored only as an HMAC, expire after five minutes, allow five attempts and can be resent after
// 30 seconds. They are never logged. Pending codes live in memory: fine for one server; move them to Redis before
// running more than one instance (CLAUDE.md: Redis for short-lived state).
const crypto = require('crypto')
const { isProduction, jwtSecret, otp: rules } = require('./config')

const pending = new Map()

// Indian mobile numbers by default: "98765 43210" → "+919876543210". Other countries need a leading +.
function normalisePhone(input) {
  const digits = String(input ?? '').replace(/[\s()-]/g, '')
  if (/^[6-9]\d{9}$/.test(digits)) return `+91${digits}`
  if (/^0[6-9]\d{9}$/.test(digits)) return `+91${digits.slice(1)}`
  if (/^\+[1-9]\d{7,14}$/.test(digits)) return digits
  return null
}

const hash = (phone, code) => crypto.createHmac('sha256', jwtSecret).update(`${phone}:${code}`).digest()

// SMS delivery. Connect a provider (MSG91, Twilio, …) here behind SMS_PROVIDER; until then development uses the
// fixed code and production refuses to send.
const smsService = {
  configured: Boolean(process.env.SMS_PROVIDER),
  async send() {
    throw new Error('SMS provider not connected')
  },
}

class OtpError extends Error {
  constructor(message, status = 400) {
    super(message)
    this.status = status
  }
}

async function sendCode(phone) {
  const existing = pending.get(phone)
  const now = Date.now()
  if (existing && now - existing.sentAt < rules.resendSeconds * 1000) {
    const wait = Math.ceil((rules.resendSeconds * 1000 - (now - existing.sentAt)) / 1000)
    throw new OtpError(`Please wait ${wait} seconds before asking for a new code.`, 429)
  }

  let code
  if (smsService.configured) {
    code = String(crypto.randomInt(0, 10 ** rules.length)).padStart(rules.length, '0')
    await smsService.send(phone, `${code} is your PIAX sign-in code. It expires in 5 minutes. Never share it.`)
  } else if (!isProduction) {
    code = rules.devCode
  } else {
    throw new OtpError('Mobile sign-in is not available right now. Please use email or another option.', 503)
  }

  pending.set(phone, { hash: hash(phone, code), sentAt: now, expiresAt: now + rules.ttlSeconds * 1000, attempts: 0 })
  return { resendIn: rules.resendSeconds, devCode: smsService.configured ? undefined : code }
}

function verifyCode(phone, code) {
  const entry = pending.get(phone)
  if (!entry || Date.now() > entry.expiresAt) {
    pending.delete(phone)
    throw new OtpError('That code has expired. Please ask for a new one.')
  }
  entry.attempts += 1
  if (entry.attempts > rules.maxAttempts) {
    pending.delete(phone)
    throw new OtpError('Too many attempts. Please ask for a new code.', 429)
  }
  const given = hash(phone, String(code ?? '').trim())
  if (!crypto.timingSafeEqual(given, entry.hash)) {
    throw new OtpError(`That code didn’t match. ${rules.maxAttempts - entry.attempts} attempts left.`)
  }
  pending.delete(phone)
}

// Drop expired entries now and then so the map does not grow.
setInterval(() => {
  const now = Date.now()
  for (const [phone, entry] of pending) if (now > entry.expiresAt) pending.delete(phone)
}, 60 * 1000).unref()

module.exports = { normalisePhone, sendCode, verifyCode, OtpError, smsConfigured: () => smsService.configured }
