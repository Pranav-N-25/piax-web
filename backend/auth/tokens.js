// Session tokens: a signed JWT in an httpOnly cookie, so page scripts can never read it.
// `tokenVersion` is copied into the token; bumping it on the user (log out everywhere, password change) revokes
// every token issued before.
const jwt = require('jsonwebtoken')
const { isProduction, jwtSecret, sessionCookie, sessionDays } = require('./config')

const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  // Lax keeps the cookie on top-level redirects back from Google/Facebook/Instagram, and off cross-site POSTs.
  sameSite: 'lax',
  path: '/',
}

function setSession(res, user) {
  const token = jwt.sign({ sub: user.id, v: user.tokenVersion }, jwtSecret, {
    algorithm: 'HS256',
    expiresIn: `${sessionDays}d`,
    issuer: 'piax-api',
    audience: 'piax-web',
  })
  res.cookie(sessionCookie, token, { ...cookieOptions, maxAge: sessionDays * 24 * 60 * 60 * 1000 })
}

function clearSession(res) {
  res.clearCookie(sessionCookie, cookieOptions)
}

// The verified token payload, or null when missing, expired or tampered with.
function readSession(req) {
  const token = req.cookies?.[sessionCookie]
  if (!token) return null
  try {
    return jwt.verify(token, jwtSecret, { algorithms: ['HS256'], issuer: 'piax-api', audience: 'piax-web' })
  } catch {
    return null
  }
}

// Short-lived signed cookie carrying OAuth `state` and PKCE verifier between the redirect and the callback.
const OAUTH_COOKIE = 'piax_oauth'
function setOAuthState(res, payload) {
  const token = jwt.sign(payload, jwtSecret, { algorithm: 'HS256', expiresIn: '10m', audience: 'piax-oauth' })
  res.cookie(OAUTH_COOKIE, token, { ...cookieOptions, maxAge: 10 * 60 * 1000 })
}
function takeOAuthState(req, res) {
  const token = req.cookies?.[OAUTH_COOKIE]
  res.clearCookie(OAUTH_COOKIE, cookieOptions)
  if (!token) return null
  try {
    return jwt.verify(token, jwtSecret, { algorithms: ['HS256'], audience: 'piax-oauth' })
  } catch {
    return null
  }
}

module.exports = { setSession, clearSession, readSession, setOAuthState, takeOAuthState }
