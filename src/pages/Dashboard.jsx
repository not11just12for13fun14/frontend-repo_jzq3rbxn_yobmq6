import TopNav from '../components/TopNav'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-white">
      <TopNav />
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-2">User Dashboard</h1>
        <p className="text-gray-600">Profile editing and social link management will appear here.</p>
      </div>
    </div>
  )
}
