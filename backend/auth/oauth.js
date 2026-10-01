// Google, Facebook and Instagram sign-in (OAuth 2.0 authorization-code flow, exchanged server-side).
// A provider is offered only when its client id and secret are set in the environment.
//
// Instagram note: Meta's "Instagram API with Instagram Login" only signs in Instagram business and creator
// accounts, and never shares an email address. Personal Instagram accounts cannot use it.
const crypto = require('crypto')
const { apiUrl } = require('./config')

const providers = {
  google: {
    label: 'Google',
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    authorizeUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    scope: 'openid email profile',
    pkce: true,
    async profile(accessToken) {
      const res = await fetch('https://openidconnect.googleapis.com/v1/userinfo', { headers: { Authorization: `Bearer ${accessToken}` } })
      if (!res.ok) throw new Error('Google profile request failed')
      const data = await res.json()
      return { id: data.sub, name: data.name ?? '', email: data.email ?? null, emailVerified: data.email_verified === true }
    },
  },
  facebook: {
    label: 'Facebook',
    clientId: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    authorizeUrl: 'https://www.facebook.com/v21.0/dialog/oauth',
    tokenUrl: 'https://graph.facebook.com/v21.0/oauth/access_token',
    scope: 'public_profile,email',
    async profile(accessToken) {
      const url = new URL('https://graph.facebook.com/v21.0/me')
      url.searchParams.set('fields', 'id,name,email')
      url.searchParams.set('access_token', accessToken)
      const res = await fetch(url)
      if (!res.ok) throw new Error('Facebook profile request failed')
      const data = await res.json()
      // Facebook only returns emails the person has confirmed, but does not say so: treat as unverified for linking.
      return { id: data.id, name: data.name ?? '', email: data.email ?? null, emailVerified: false }
    },
  },
  instagram: {
    label: 'Instagram',
    clientId: process.env.INSTAGRAM_APP_ID,
    clientSecret: process.env.INSTAGRAM_APP_SECRET,
    authorizeUrl: 'https://www.instagram.com/oauth/authorize',
    tokenUrl: 'https://api.instagram.com/oauth/access_token',
    scope: 'instagram_business_basic',
    async profile(accessToken) {
      const url = new URL('https://graph.instagram.com/v21.0/me')
      url.searchParams.set('fields', 'user_id,username')
      url.searchParams.set('access_token', accessToken)
      const res = await fetch(url)
      if (!res.ok) throw new Error('Instagram profile request failed')
      const data = await res.json()
      return { id: String(data.user_id ?? data.id), name: data.username ?? '', email: null, emailVerified: false }
    },
  },
}

const isEnabled = (name) => Boolean(providers[name]?.clientId && providers[name]?.clientSecret)
const enabledProviders = () => Object.keys(providers).filter(isEnabled)
const callbackUrl = (name) => `${apiUrl}/api/auth/oauth/${name}/callback`
const base64url = (buffer) => buffer.toString('base64url')

// The provider's sign-in page URL, plus the state (and PKCE verifier) to check when it sends the person back.
function authorizationRequest(name) {
  const provider = providers[name]
  const state = base64url(crypto.randomBytes(24))
  const url = new URL(provider.authorizeUrl)
  url.searchParams.set('client_id', provider.clientId)
  url.searchParams.set('redirect_uri', callbackUrl(name))
  url.searchParams.set('response_type', 'code')
  url.searchParams.set('scope', provider.scope)
  url.searchParams.set('state', state)
  let verifier
  if (provider.pkce) {
    verifier = base64url(crypto.randomBytes(32))
    url.searchParams.set('code_challenge', base64url(crypto.createHash('sha256').update(verifier).digest()))
    url.searchParams.set('code_challenge_method', 'S256')
  }
  if (name === 'google') url.searchParams.set('prompt', 'select_account')
  return { url: url.toString(), state, verifier }
}

// Swap the one-time code for an access token, then read the person's basic profile.
async function exchangeCode(name, code, verifier) {
  const provider = providers[name]
  const body = new URLSearchParams({
    client_id: provider.clientId,
    client_secret: provider.clientSecret,
    redirect_uri: callbackUrl(name),
    grant_type: 'authorization_code',
    code,
  })
  if (verifier) body.set('code_verifier', verifier)
  const res = await fetch(provider.tokenUrl, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body })
  if (!res.ok) throw new Error(`${provider.label} token exchange failed (${res.status})`)
  const { access_token: accessToken } = await res.json()
  if (!accessToken) throw new Error(`${provider.label} returned no access token`)
  return provider.profile(accessToken)
}

module.exports = { providers, isEnabled, enabledProviders, authorizationRequest, exchangeCode }
