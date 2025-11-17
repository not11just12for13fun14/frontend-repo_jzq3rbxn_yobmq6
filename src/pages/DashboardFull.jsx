import { useEffect, useMemo, useState } from 'react'
import FooterNav from '../components/FooterNav'
import { useAuth } from '../context/AuthContext'
import { QRCodeCanvas } from 'qrcode.react'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function DashboardFull() {
  const { user } = useAuth()
  const [bundle, setBundle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState(null)

  const [form, setForm] = useState({ job_title: '', company: '', bio: '', phone_number: '' })
  const [links, setLinks] = useState([])
  const [newLink, setNewLink] = useState({ platform: '', url: '' })

  useEffect(() => {
    (async () => {
      if (!user) { setLoading(false); return }
      try {
        const res = await fetch(`${BACKEND_URL}/api/user`)
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setBundle(data)
        setForm({
          job_title: data.profile.job_title || '',
          company: data.profile.company || '',
          bio: data.profile.bio || '',
          phone_number: data.profile.phone_number || '',
        })
        setLinks(data.social_links || [])
      } catch (e) {
        setErr(String(e))
      } finally {
        setLoading(false)
      }
    })()
  }, [user])

  async function saveProfile(e) {
    e.preventDefault()
    try {
      const res = await fetch(`${BACKEND_URL}/api/profile`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (!res.ok) throw new Error('Failed to save')
      alert('Saved')
    } catch (e) {
      alert('Error saving')
    }
  }

  async function addLink(e) {
    e.preventDefault()
    if (!newLink.platform || !newLink.url) return
    try {
      const res = await fetch(`${BACKEND_URL}/api/social-links`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newLink) })
      if (!res.ok) throw new Error('Failed to add')
      const { id } = await res.json()
      setLinks([{ id, ...newLink }, ...links])
      setNewLink({ platform: '', url: '' })
    } catch (e) {
      alert('Error adding link')
    }
  }

  async function removeLink(id) {
    try {
      const res = await fetch(`${BACKEND_URL}/api/social-links/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed')
      setLinks(links.filter((l) => l.id !== id))
    } catch (e) {
      alert('Error deleting link')
    }
  }

  const publicUrl = useMemo(() => (bundle?.user?.profile_slug ? `${window.location.origin}/p/${bundle.user.profile_slug}` : ''), [bundle])

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-flames-dark mb-4">My Dashboard</h1>
        {!user ? (
          <p className="text-gray-600">Please login to view your dashboard.</p>
        ) : loading ? (
          <p>Loading...</p>
        ) : err ? (
          <p className="text-red-600 text-sm">{err}</p>
        ) : (
          <div className="space-y-8">
            <section className="border rounded-xl shadow-sm">
              <div className="px-5 py-4 border-b bg-gray-50"><h2 className="font-semibold text-flames-dark">Profile</h2></div>
              <form onSubmit={saveProfile} className="p-5 grid gap-4">
                <div>
                  <label className="block text-sm font-medium text-flames-dark mb-1">Job Title</label>
                  <input value={form.job_title} onChange={(e)=>setForm({...form, job_title: e.target.value})} className="w-full border border-flames-dark rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-flames-blue bg-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-flames-dark mb-1">Company</label>
                  <input value={form.company} onChange={(e)=>setForm({...form, company: e.target.value})} className="w-full border border-flames-dark rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-flames-blue bg-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-flames-dark mb-1">Phone</label>
                  <input value={form.phone_number} onChange={(e)=>setForm({...form, phone_number: e.target.value})} className="w-full border border-flames-dark rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-flames-blue bg-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-flames-dark mb-1">Bio</label>
                  <textarea value={form.bio} onChange={(e)=>setForm({...form, bio: e.target.value})} className="w-full border border-flames-dark rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-flames-blue bg-white" rows={4} />
                </div>
                <div>
                  <button type="submit" className="px-4 py-2 rounded-lg font-semibold" style={{ backgroundColor: '#FCD900', color: '#1D3F87' }}>Save Changes</button>
                </div>
              </form>
            </section>

            <section className="border rounded-xl shadow-sm">
              <div className="px-5 py-4 border-b bg-gray-50"><h2 className="font-semibold text-flames-dark">Social Links</h2></div>
              <div className="p-5 space-y-4">
                <form onSubmit={addLink} className="grid md:grid-cols-3 gap-3">
                  <input value={newLink.platform} onChange={(e)=>setNewLink({...newLink, platform: e.target.value})} placeholder="Platform" className="border border-flames-dark rounded-lg px-3 py-2 focus:ring-2 focus:ring-flames-blue" />
                  <input value={newLink.url} onChange={(e)=>setNewLink({...newLink, url: e.target.value})} placeholder="https://..." className="border border-flames-dark rounded-lg px-3 py-2 focus:ring-2 focus:ring-flames-blue" />
                  <button className="px-4 py-2 rounded-lg font-semibold" style={{ backgroundColor: '#FCD900', color: '#1D3F87' }}>Add Link</button>
                </form>

                <ul className="divide-y">
                  {links.map((l) => (
                    <li key={l.id} className="flex items-center justify-between py-3">
                      <div>
                        <div className="font-medium text-flames-dark capitalize">{l.platform}</div>
                        <div className="text-sm text-gray-500">{l.url}</div>
                      </div>
                      <button onClick={()=>removeLink(l.id)} className="px-3 py-2 rounded-lg border border-flames-dark text-flames-dark">Delete</button>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="border rounded-xl shadow-sm">
              <div className="px-5 py-4 border-b bg-gray-50"><h2 className="font-semibold text-flames-dark">My Profile QR</h2></div>
              <div className="p-5 flex items-center justify-center">
                {publicUrl ? <QRCodeCanvas value={publicUrl} size={180} /> : <p className="text-gray-500 text-sm">No profile URL</p>}
              </div>
            </section>

            <section className="border rounded-xl shadow-sm">
              <div className="px-5 py-4 border-b bg-gray-50"><h2 className="font-semibold text-flames-dark">NFC Instructions</h2></div>
              <div className="p-5">
                <div className="border border-flames-dark rounded-lg p-4 bg-white">
                  <p className="text-sm text-flames-dark">
                    How to write to your NFC card:
                    <br />1. Download 'NFC Tools'.
                    <br />2. Go to 'Write'.
                    <br />3. Add 'URL' record.
                    <br />4. Paste your profile URL: <a className="underline text-flames-blue" href={publicUrl} target="_blank" rel="noreferrer">{publicUrl || '—'}</a>
                    <br />5. Tap 'Write' and hold card.
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>

      <FooterNav />
    </div>
  )
}
