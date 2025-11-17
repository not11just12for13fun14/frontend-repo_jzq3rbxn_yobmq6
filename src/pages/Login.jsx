import TopNav from '../components/TopNav'

export default function Login() {
  return (
    <div className="min-h-screen bg-white">
      <TopNav />
      <div className="max-w-md mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-2">Login</h1>
        <p className="text-gray-600 mb-6">Demo placeholder. Auth flow coming next.</p>
        <form className="space-y-4">
          <input className="w-full border rounded-lg px-3 py-2" placeholder="Email" />
          <input className="w-full border rounded-lg px-3 py-2" type="password" placeholder="Password" />
          <button type="button" className="w-full py-2 rounded-lg font-semibold bg-flames-blue text-white">Sign In</button>
        </form>
      </div>
    </div>
  )
}
