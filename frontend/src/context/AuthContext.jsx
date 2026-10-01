import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { authService } from '../services/authService.js'

const AuthContext = createContext(null)

// Messages for the `auth_error` the API adds when it sends the visitor back from social sign-in.
const returnErrors = {
  unavailable: 'That sign-in option isn’t available yet. Please use your mobile number or email.',
  cancelled: 'Sign-in was cancelled.',
  expired: 'That sign-in took too long. Please try again.',
  failed: 'We couldn’t sign you in. Please try again.',
}

// Signed-in person (from the API's session cookie) and the login / sign-up popup.
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [status, setStatus] = useState('loading')
  const [modal, setModal] = useState({ open: false, mode: 'login' })
  const [notice, setNotice] = useState(null)

  useEffect(() => {
    let cancelled = false
    authService.me()
      .then((user) => { if (!cancelled) setCurrentUser(user) })
      .catch(() => { if (!cancelled) setCurrentUser(null) })
      .finally(() => { if (!cancelled) setStatus('ready') })

    // Back from Google / Facebook / Instagram: show the outcome, then tidy the address bar.
    const url = new URL(window.location.href)
    const outcome = url.searchParams.get('auth')
    const error = url.searchParams.get('auth_error')
    if (outcome || error) {
      setNotice(error ? { tone: 'error', text: returnErrors[error] ?? returnErrors.failed } : { tone: 'success', text: 'You’re signed in. Welcome to PIAX!' })
      if (error) setModal({ open: true, mode: 'login' })
      url.searchParams.delete('auth')
      url.searchParams.delete('auth_error')
      window.history.replaceState(window.history.state, '', url)
    }
    return () => { cancelled = true }
  }, [])

  const openAuth = useCallback((mode = 'login') => setModal({ open: true, mode }), [])
  const closeAuth = useCallback(() => setModal((current) => ({ ...current, open: false })), [])

  const signedIn = useCallback((user, text) => {
    setCurrentUser(user)
    setModal((current) => ({ ...current, open: false }))
    setNotice({ tone: 'success', text })
    return user
  }, [])

  const value = useMemo(() => ({
    currentUser,
    status,
    isAuthenticated: Boolean(currentUser),
    modal,
    openAuth,
    closeAuth,
    notice,
    clearNotice: () => setNotice(null),
    register: async (name, email, password) => signedIn(await authService.register(name, email, password), `Welcome to PIAX, ${name.split(' ')[0]}!`),
    loginWithEmail: async (email, password) => {
      const user = await authService.login(email, password)
      return signedIn(user, `Welcome back${user.name ? `, ${user.name.split(' ')[0]}` : ''}!`)
    },
    requestOtp: (phone) => authService.requestOtp(phone),
    verifyOtp: async (phone, code, name) => {
      const user = await authService.verifyOtp(phone, code, name)
      return signedIn(user, `You’re signed in${user.name ? `, ${user.name.split(' ')[0]}` : ''}.`)
    },
    logout: async () => {
      await authService.logout().catch(() => {})
      setCurrentUser(null)
      setNotice({ tone: 'success', text: 'You’ve been logged out.' })
    },
  }), [currentUser, status, modal, openAuth, closeAuth, notice, signedIn])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
