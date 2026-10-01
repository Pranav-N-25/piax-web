// Calls to the PIAX auth API (backend/auth/routes.js). The session is an httpOnly cookie the browser sends
// automatically; this file never sees or stores the token.

export class AuthError extends Error {
  constructor(message, field) {
    super(message)
    this.field = field
  }
}

async function call(path, { method = 'GET', body } = {}) {
  let res
  try {
    res = await fetch(`/api/auth${path}`, {
      method,
      credentials: 'include',
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    })
  } catch {
    throw new AuthError('You seem to be offline. Check your connection and try again.')
  }
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new AuthError(data.error || 'Something went wrong. Please try again.', data.field)
  return data
}

export const authService = {
  me: () => call('/me').then((data) => data.user),
  providers: () => call('/providers'),
  register: (name, email, password) => call('/register', { method: 'POST', body: { name, email, password } }).then((data) => data.user),
  login: (email, password) => call('/login', { method: 'POST', body: { email, password } }).then((data) => data.user),
  requestOtp: (phone) => call('/otp/request', { method: 'POST', body: { phone } }),
  verifyOtp: (phone, code, name) => call('/otp/verify', { method: 'POST', body: { phone, code, name } }).then((data) => data.user),
  logout: () => call('/logout', { method: 'POST' }),
  // Full-page redirect to Google / Facebook / Instagram; the API sends the visitor back to `returnTo`.
  oauthUrl: (provider, returnTo) => `/api/auth/oauth/${provider}?returnTo=${encodeURIComponent(returnTo)}`,
}
