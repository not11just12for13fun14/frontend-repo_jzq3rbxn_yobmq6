import { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import FooterNav from '../components/FooterNav'

export default function LogoutPage() {
  const { logout } = useAuth()
  useEffect(() => {
    logout()
  }, [])
  return (
    <div className="min-h-screen bg-white pb-20 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-xl font-semibold text-flames-dark">You have been logged out</h1>
        <p className="text-gray-600 mt-2">Use the footer to navigate.</p>
      </div>
      <FooterNav />
    </div>
  )
}
