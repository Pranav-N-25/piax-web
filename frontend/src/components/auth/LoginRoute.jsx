import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'

// /login and /signup: open the popup over the home page, so old links and bookmarks still work.
// Someone already signed in just lands on the home page.
export default function LoginRoute({ mode }) {
  const { openAuth, currentUser, status } = useAuth()
  useEffect(() => {
    if (status === 'ready' && !currentUser) openAuth(mode)
  }, [mode, openAuth, currentUser, status])
  return status === 'ready' ? <Navigate to="/" replace /> : null
}
