import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LogIn, LogOut, Home, LayoutDashboard, Shield } from 'lucide-react'

const tabsBase = [
  { to: '/', label: 'Home', icon: Home, requires: null },
  { to: '/dashboard', label: 'My Dashboard', icon: LayoutDashboard, requires: 'auth' },
  { to: '/admin/users', label: 'Admin', icon: Shield, requires: 'admin' },
]

export default function FooterNav() {
  const { pathname } = useLocation()
  const { user } = useAuth()

  const tabs = [...tabsBase]
  if (user) tabs.push({ to: '/logout', label: 'Logout', icon: LogOut, requires: 'auth' })
  else tabs.push({ to: '/auth', label: 'Login', icon: LogIn, requires: null })

  return (
    <nav className="fixed bottom-0 inset-x-0 bg-flames-blue text-white border-t border-white/10">
      <div className="max-w-4xl mx-auto grid grid-cols-4 gap-1 px-2 py-2">
        {tabs.map((t) => {
          const active = pathname === t.to || (t.to !== '/' && pathname.startsWith(t.to))
          const Icon = t.icon
          if (t.requires === 'auth' && !user) return null
          if (t.requires === 'admin' && !user?.is_admin) return null
          return (
            <Link key={t.to} to={t.to} className="flex flex-col items-center justify-center py-2 rounded-md">
              <Icon size={20} className={active ? 'text-flames-yellow' : 'text-white'} />
              <span className={`text-xs mt-1 ${active ? 'text-flames-yellow' : 'text-white'}`}>{t.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
