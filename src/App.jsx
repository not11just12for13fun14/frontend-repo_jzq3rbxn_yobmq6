import { useEffect, useState } from 'react'
import Spline from '@splinetool/react-spline'
import TopNav from './components/TopNav'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function App() {
  const [bundle, setBundle] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${BACKEND_URL}/api/p/flames-blue`)
        if (!res.ok) throw new Error('Failed to load demo profile')
        const data = await res.json()
        setBundle(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div className="min-h-screen bg-flames-white flex flex-col">
      <TopNav />
      <header className="relative h-[300px] md:h-[420px] w-full overflow-hidden">
        <Spline scene="https://prod.spline.design/qQUip0dJPqrrPryE/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 to-transparent pointer-events-none" />
      </header>

      <main className="-mt-24 md:-mt-32 px-4 pb-16 flex justify-center">
        <div className="w-full max-w-md rounded-2xl shadow-card overflow-hidden">
          <div className="bg-flames-blue p-6 text-flames-white">
            {loading ? (
              <div className="animate-pulse space-y-3">
                <div className="w-20 h-20 rounded-full bg-white/30 mx-auto" />
                <div className="h-4 bg-white/30 rounded w-2/3 mx-auto" />
                <div className="h-3 bg-white/20 rounded w-1/2 mx-auto" />
              </div>
            ) : bundle ? (
              <div className="text-center">
                <img src={bundle?.profile?.profile_image_path || 'https://api.dicebear.com/7.x/thumbs/svg?seed=FlamesBlue'} alt="avatar" className="w-24 h-24 rounded-full mx-auto ring-4 ring-white/20" />
                <h1 className="text-2xl font-semibold mt-4">{bundle.user.name}</h1>
                <p className="text-sm opacity-90">{bundle.profile.job_title} {bundle.profile.company ? `• ${bundle.profile.company}` : ''}</p>
                <a href={`${BACKEND_URL}/api/p/${bundle.user.profile_slug}/vcf`} className="mt-5 inline-flex items-center justify-center w-full py-3 rounded-lg font-semibold" style={{ backgroundColor: '#FCD900', color: '#1D3F87' }}>
                  Save Contact
                </a>
              </div>
            ) : (
              <div className="text-center py-8">Failed to load demo profile.</div>
            )}
          </div>

          <div className="bg-white p-5">
            {bundle?.social_links?.length ? (
              <ul className="space-y-2">
                {bundle.social_links.map((l) => (
                  <li key={l.id}>
                    <a href={l.url} target="_blank" rel="noreferrer" className="flex items-center justify-between px-4 py-3 border rounded-lg hover:bg-gray-50">
                      <span className="font-medium text-flames-dark capitalize">{l.platform}</span>
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
      </main>

      <footer className="text-center text-sm text-gray-500 py-6">© {new Date().getFullYear()} flamesblue.com</footer>
    </div>
  )
}

export default App
