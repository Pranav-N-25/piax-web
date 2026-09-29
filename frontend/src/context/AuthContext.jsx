import { createContext, useContext, useEffect, useState } from 'react'
import data from '../data/dummyData.json'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('piax-session')) || null } catch { return null }
  })

  useEffect(() => {
    if (currentUser) localStorage.setItem('piax-session', JSON.stringify(currentUser))
    else localStorage.removeItem('piax-session')
  }, [currentUser])

  const login = (email) => {
    const user = data.users.find((candidate) => candidate.email === email) || data.users[0]
    setCurrentUser(user)
    return user
  }

  return <AuthContext.Provider value={{ currentUser, isAuthenticated: Boolean(currentUser), login, logout: () => setCurrentUser(null) }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
