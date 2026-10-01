// Auth settings, all from environment variables (see backend/.env.example).
const crypto = require('crypto')

const isProduction = process.env.NODE_ENV === 'production'

// JWT signing secret. Required in production; in development a random one is made per run (sessions end on restart).
let jwtSecret = process.env.JWT_SECRET
if (!jwtSecret || jwtSecret.length < 32) {
  if (isProduction) throw new Error('JWT_SECRET must be set (32+ characters) in production.')
  jwtSecret = crypto.randomBytes(48).toString('hex')
  console.warn('[auth] JWT_SECRET not set: using a temporary development secret. Sessions end when the server restarts.')
}

// Where the website lives, for redirects back after Google / Facebook / Instagram sign-in.
const appUrl = (process.env.APP_URL || 'http://localhost:5173').replace(/\/$/, '')
// Public URL of this API, used to build OAuth callback URLs.
const apiUrl = (process.env.API_URL || `http://localhost:${process.env.PORT || 5000}`).replace(/\/$/, '')

module.exports = {
  isProduction,
  jwtSecret,
  appUrl,
  apiUrl,
  sessionCookie: 'piax_session',
  sessionDays: 7,
  otp: {
    length: 6,
    ttlSeconds: 5 * 60,
    maxAttempts: 5,
    resendSeconds: 30,
    // Development only (CLAUDE.md): with no SMS provider configured, every code is 123456. Never used in production.
    devCode: '123456',
  },
}
