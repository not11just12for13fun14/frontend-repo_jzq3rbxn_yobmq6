import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const demoEnabled = typeof window !== 'undefined' && localStorage.getItem('flames_demo_login') === '1'

  async function fetchMe() {
    if (!demoEnabled) {
      setUser(null)
      setLoading(false)
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`${BACKEND_URL}/api/user`)
      if (res.ok) {
        const data = await res.json()
        setUser(data.user)
      } else {
        setUser(null)
      }
    } catch (e) {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const login = async () => {
    localStorage.setItem('flames_demo_login', '1')
    await fetchMe()
  }

  const logout = async () => {
    localStorage.removeItem('flames_demo_login')
    setUser(null)
  }

  const value = useMemo(() => ({ user, loading, login, logout, refresh: fetchMe }), [user, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
