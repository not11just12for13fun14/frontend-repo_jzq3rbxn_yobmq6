import { useEffect, useState } from 'react'
import FooterNav from '../components/FooterNav'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function PublicProfile() {
  const [bundle, setBundle] = useState(null)
  const [loading, setLoading] = useState(true)
  const slug = 'flames-blue'

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/p/${slug}`)
        if (!res.ok) throw new Error('Failed to load profile')
        setBundle(await res.json())
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-md mx-auto px-4 pt-6">
        <div className="rounded-2xl shadow-card overflow-hidden">
          <div className="p-6" style={{ backgroundColor: '#008BDB', color: '#FFFFFF' }}>
            {loading ? (
              <div className="animate-pulse space-y-3 text-center">
                <div className="w-24 h-24 rounded-full bg-white/30 mx-auto" />
                <div className="h-4 bg-white/30 rounded w-2/3 mx-auto" />
                <div className="h-3 bg-white/20 rounded w-1/2 mx-auto" />
              </div>
            ) : bundle ? (
              <div className="text-center">
                <img src={bundle?.profile?.profile_image_path || 'https://api.dicebear.com/7.x/thumbs/svg?seed=FlamesBlue'} alt="avatar" className="w-24 h-24 rounded-full mx-auto" style={{ boxShadow: '0 0 0 4px #1D3F87' }} />
                <h1 className="text-2xl font-bold mt-4">{bundle.user.name}</h1>
                <p className="text-sm opacity-90">{bundle.profile.job_title} {bundle.profile.company ? `• ${bundle.profile.company}` : ''}</p>
                <a href={`${BACKEND_URL}/api/p/${bundle.user.profile_slug}/vcf`} className="mt-5 inline-flex items-center justify-center w-full py-3 rounded-lg font-semibold" style={{ backgroundColor: '#FCD900', color: '#1D3F87' }}>
                  Save Contact
                </a>
              </div>
            ) : (
              <div className="text-center py-8">Failed to load profile.</div>
            )}
          </div>

          <div className="bg-white p-5">
            {bundle?.social_links?.length ? (
              <ul className="space-y-2">
                {bundle.social_links.map((l) => (
                  <li key={l.id}>
                    <a href={l.url} target="_blank" rel="noreferrer" className="flex items-center justify-between px-4 py-3 border rounded-lg hover:bg-gray-50">
                      <span className="font-medium text-flames-white-contrast capitalize" style={{ color: '#1D3F87' }}>{l.platform}</span>
                      <span className="text-sm text-gray-500 truncate max-w-[50%]">{l.url}</span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500">No links yet.</p>
            )}
          </div>
        </div>
      </div>

      <FooterNav />
    </div>
  )
}
