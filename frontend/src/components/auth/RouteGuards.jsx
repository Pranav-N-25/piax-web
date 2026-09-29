import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'

export function Protected({ children }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

export function RoleOnly({ role, children }) {
  const { currentUser } = useAuth()
  return currentUser?.role === role ? children : <Navigate to="/login" replace />
}
