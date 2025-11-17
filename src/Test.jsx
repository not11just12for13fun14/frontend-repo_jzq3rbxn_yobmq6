import { useEffect, useState } from 'react'
import TopNav from './components/TopNav'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Test() {
  const [result, setResult] = useState(null)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/test`)
        setResult(await res.json())
      } catch (e) {
        setResult({ error: String(e) })
      }
    })()
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <TopNav />
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">Connectivity Test</h1>
        <pre className="bg-gray-50 p-4 rounded-lg border overflow-auto text-sm">{JSON.stringify(result, null, 2)}</pre>
      </div>
    </div>
  )
}
