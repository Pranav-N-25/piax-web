// /api/auth — sign up and log in with email & password, mobile number (OTP), Google, Facebook or Instagram.
// Every successful sign-in sets the same httpOnly JWT session cookie (tokens.js).
const express = require('express')
const bcrypt = require('bcryptjs')
const { rateLimit } = require('express-rate-limit')
const { appUrl, isProduction } = require('./config')
const { userStore, StoreUnavailableError } = require('./userStore')
const { setSession, clearSession, readSession, setOAuthState, takeOAuthState } = require('./tokens')
const { normalisePhone, sendCode, verifyCode, OtpError, smsConfigured } = require('./otp')
const { providers, isEnabled, enabledProviders, authorizationRequest, exchangeCode } = require('./oauth')

const router = express.Router()

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const BCRYPT_ROUNDS = 12
// Compared against when an email is unknown, so a wrong email takes as long as a wrong password.
const DUMMY_HASH = bcrypt.hashSync('piax-timing-equaliser', BCRYPT_ROUNDS)

const limiter = (limit, message) => rateLimit({ windowMs: 15 * 60 * 1000, limit, standardHeaders: 'draft-8', legacyHeaders: false, message: { error: message } })
const passwordLimiter = limiter(20, 'Too many attempts. Please wait a few minutes and try again.')
const otpSendLimiter = limiter(6, 'Too many codes requested. Please wait a few minutes and try again.')
const otpVerifyLimiter = limiter(25, 'Too many attempts. Please wait a few minutes and try again.')

// What the website may know about the signed-in person. Never the password hash or token version.
const publicUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  role: user.role,
  providers: Object.keys(user.providers ?? {}),
  hasPassword: Boolean(user.passwordHash),
})

const cleanName = (value) => String(value ?? '').trim().replace(/\s+/g, ' ').slice(0, 80)
const cleanEmail = (value) => String(value ?? '').trim().toLowerCase().slice(0, 200)

// Cross-site request guard for state-changing calls: the browser's Origin must be the website (or absent,
// for same-origin tools). SameSite=Lax cookies already block most cross-site posts; this closes the rest.
const allowedOrigins = new Set([appUrl, ...(process.env.CORS_ORIGIN?.split(',').map((origin) => origin.trim()) ?? [])])
router.use((req, res, next) => {
  if (req.method === 'GET') return next()
  const { origin } = req.headers
  if (origin && !allowedOrigins.has(origin) && isProduction) return res.status(403).json({ error: 'Request not allowed.' })
  next()
})

// Wraps a handler so known errors become friendly responses and nothing internal leaks.
const handle = (fn) => async (req, res) => {
  try {
    await fn(req, res)
  } catch (err) {
    if (err instanceof OtpError) return res.status(err.status).json({ error: err.message })
    if (err instanceof StoreUnavailableError) return res.status(503).json({ error: 'Sign-in is not available right now. Please try again later.' })
    console.error('[auth]', err.message)
    res.status(500).json({ error: 'Something went wrong. Please try again.' })
  }
}

async function signIn(res, user) {
  const updated = await userStore.update(user.id, { lastLoginAt: new Date().toISOString() })
  setSession(res, updated)
  return publicUser(updated)
}

// Which sign-in options are switched on, so the website can show only working buttons.
router.get('/providers', (req, res) => {
  res.json({ oauth: enabledProviders(), phone: smsConfigured() || !isProduction, devOtp: !smsConfigured() && !isProduction })
})

router.post('/register', passwordLimiter, handle(async (req, res) => {
  const name = cleanName(req.body?.name)
  const email = cleanEmail(req.body?.email)
  const password = String(req.body?.password ?? '')
  if (!name) return res.status(400).json({ error: 'Please tell us your name.', field: 'name' })
  if (!EMAIL.test(email)) return res.status(400).json({ error: 'Please enter a valid email address.', field: 'email' })
  if (password.length < 8) return res.status(400).json({ error: 'Use at least 8 characters for your password.', field: 'password' })
  if (Buffer.byteLength(password) > 72) return res.status(400).json({ error: 'That password is too long.', field: 'password' })
  if (await userStore.findByEmail(email)) return res.status(409).json({ error: 'An account with this email already exists. Please log in instead.', field: 'email' })

  const user = await userStore.create({ name, email, passwordHash: await bcrypt.hash(password, BCRYPT_ROUNDS) })
  res.status(201).json({ user: await signIn(res, user) })
}))

router.post('/login', passwordLimiter, handle(async (req, res) => {
  const email = cleanEmail(req.body?.email)
  const password = String(req.body?.password ?? '')
  const user = EMAIL.test(email) ? await userStore.findByEmail(email) : null
  const matches = await bcrypt.compare(password, user?.passwordHash ?? DUMMY_HASH)
  if (!user || !user.passwordHash || !matches) return res.status(401).json({ error: 'Email or password is incorrect.' })
  res.json({ user: await signIn(res, user) })
}))

router.post('/otp/request', otpSendLimiter, handle(async (req, res) => {
  const phone = normalisePhone(req.body?.phone)
  if (!phone) return res.status(400).json({ error: 'Please enter a valid 10-digit mobile number.', field: 'phone' })
  const { resendIn, devCode } = await sendCode(phone)
  res.json({ ok: true, phone, resendIn, ...(devCode && { devCode }) })
}))

router.post('/otp/verify', otpVerifyLimiter, handle(async (req, res) => {
  const phone = normalisePhone(req.body?.phone)
  if (!phone) return res.status(400).json({ error: 'Please enter a valid mobile number.', field: 'phone' })
  verifyCode(phone, req.body?.code)
  const existing = await userStore.findByPhone(phone)
  const user = existing ?? await userStore.create({ phone, name: cleanName(req.body?.name) })
  res.json({ user: await signIn(res, user), created: !existing })
}))

router.get('/me', handle(async (req, res) => {
  const session = readSession(req)
  const user = session && await userStore.findById(session.sub)
  // Signed out is a normal state, not an error: answer 200 with no user.
  if (!user || user.tokenVersion !== session.v) {
    if (session) clearSession(res)
    return res.json({ user: null })
  }
  res.json({ user: publicUser(user) })
}))

router.post('/logout', (req, res) => {
  clearSession(res)
  res.json({ ok: true })
})

// Only same-site paths are allowed as the page to return to after social sign-in.
const safeReturn = (value) => (typeof value === 'string' && value.startsWith('/') && !value.startsWith('//') && !value.includes('\\') ? value.slice(0, 300) : '/')
const backToSite = (returnTo, params) => {
  const url = new URL(safeReturn(returnTo), appUrl)
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value))
  return url.toString()
}

router.get('/oauth/:provider', (req, res) => {
  const name = req.params.provider
  const returnTo = safeReturn(req.query.returnTo)
  if (!providers[name] || !isEnabled(name)) return res.redirect(backToSite(returnTo, { auth_error: 'unavailable' }))
  const { url, state, verifier } = authorizationRequest(name)
  setOAuthState(res, { provider: name, state, verifier, returnTo })
  res.redirect(url)
})

router.get('/oauth/:provider/callback', async (req, res) => {
  const name = req.params.provider
  const saved = takeOAuthState(req, res)
  const returnTo = saved?.returnTo ?? '/'
  if (!saved || saved.provider !== name || !req.query.state || req.query.state !== saved.state) {
    return res.redirect(backToSite(returnTo, { auth_error: 'expired' }))
  }
  if (req.query.error || !req.query.code) return res.redirect(backToSite(returnTo, { auth_error: 'cancelled' }))

  try {
    const profile = await exchangeCode(name, String(req.query.code), saved.verifier)
    let user = await userStore.findByProvider(name, profile.id)
    // Link to an existing account only through an email the provider has verified (Google).
    if (!user && profile.email && profile.emailVerified) {
      const existing = await userStore.findByEmail(profile.email.toLowerCase())
      if (existing) user = await userStore.update(existing.id, { providers: { ...existing.providers, [name]: profile.id }, emailVerified: true })
    }
    if (!user) {
      const email = profile.email?.toLowerCase() ?? null
      const emailTaken = email && await userStore.findByEmail(email)
      user = await userStore.create({
        name: cleanName(profile.name),
        email: emailTaken ? null : email,
        emailVerified: Boolean(email && profile.emailVerified && !emailTaken),
        providers: { [name]: profile.id },
      })
    }
    await signIn(res, user)
    res.redirect(backToSite(returnTo, { auth: 'success' }))
  } catch (err) {
    console.error(`[auth] ${name} sign-in failed:`, err.message)
    res.redirect(backToSite(returnTo, { auth_error: err instanceof StoreUnavailableError ? 'unavailable' : 'failed' }))
  }
})

module.exports = router
