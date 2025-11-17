import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import FooterNav from '../components/FooterNav'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function AdminPage() {
  const { user } = useAuth()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    (async () => {
      if (!user?.is_admin) {
        setLoading(false)
        return
      }
      try {
        const res = await fetch(`${BACKEND_URL}/api/admin/users`)
        if (!res.ok) throw new Error('Failed to fetch users')
        setUsers(await res.json())
      } catch (e) {
        setError(String(e))
      } finally {
        setLoading(false)
      }
    })()
  }, [user])

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-flames-dark mb-4">Admin • Users</h1>
        {!user?.is_admin ? (
          <p className="text-gray-600">Admin access required.</p>
        ) : loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-600 text-sm">{error}</p>
        ) : (
          <div className="overflow-x-auto border rounded-lg">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-2 text-flames-dark">Name</th>
                  <th className="text-left px-4 py-2 text-flames-dark">Email</th>
                  <th className="text-left px-4 py-2 text-flames-dark">Profile Slug</th>
                  <th className="text-left px-4 py-2 text-flames-dark">Admin</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, idx) => (
                  <tr key={u.id} className={idx % 2 ? 'bg-white' : 'bg-gray-50/50'}>
                    <td className="px-4 py-2">{u.name}</td>
                    <td className="px-4 py-2">{u.email}</td>
                    <td className="px-4 py-2">{u.profile_slug}</td>
                    <td className="px-4 py-2">{u.is_admin ? 'Yes' : 'No'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <FooterNav />
    </div>
  )
}
