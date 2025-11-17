import { Link, useLocation } from 'react-router-dom'

export default function TopNav() {
  const { pathname } = useLocation()
  const tabs = [
    { to: '/', label: 'Public' },
    { to: '/login', label: 'Login' },
    { to: '/dashboard', label: 'User' },
    { to: '/admin/users', label: 'Admin' },
  ]

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <nav className="bg-white/80 backdrop-blur border shadow-card rounded-full px-2 py-1 flex gap-1">
        {tabs.map((t) => {
          const active = pathname === t.to || (t.to !== '/' && pathname.startsWith(t.to))
          return (
            <Link
              key={t.to}
              to={t.to}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                active
                  ? 'bg-flames-blue text-white'
                  : 'text-flames-dark hover:bg-gray-100'
              }`}
            >
              {t.label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
