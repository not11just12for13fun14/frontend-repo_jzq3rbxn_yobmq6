import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import FooterNav from '../components/FooterNav'

export default function AuthPage() {
  const { user, login } = useAuth()
  const [mode, setMode] = useState('login')

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="max-w-md mx-auto p-6">
        <h1 className="text-2xl font-bold text-flames-dark mb-2">{mode === 'login' ? 'Login' : 'Register'}</h1>
        <p className="text-sm text-gray-600 mb-6">Demo mode: pressing the button authenticates the demo user.</p>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-flames-dark mb-1">Email</label>
            <input className="w-full border border-flames-dark rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-flames-blue" placeholder="you@company.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-flames-dark mb-1">Password</label>
            <input type="password" className="w-full border border-flames-dark rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-flames-blue" placeholder="••••••••" />
          </div>
          <button type="button" onClick={login} className="w-full py-3 rounded-lg font-semibold" style={{ backgroundColor: '#FCD900', color: '#1D3F87' }}>
            {mode === 'login' ? 'Login' : 'Register'}
          </button>
        </form>

        <button className="mt-4 text-sm text-flames-blue underline" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
          {mode === 'login' ? "Don't have an account? Register" : 'Already have an account? Login'}
        </button>
      </div>

      <FooterNav />
    </div>
  )
}
