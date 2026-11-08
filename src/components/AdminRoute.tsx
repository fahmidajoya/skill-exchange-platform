import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../AuthContext'

function AdminRoute({ children }: { children: ReactNode }) {
  const { user, profile, loading } = useAuth()

  if (loading) {
    return <p className="p-12 text-center text-gray-600">Loading...</p>
  }

  if (!user) {
    return (
      <div className="bg-gray-50 px-8 py-16">
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl border border-gray-200 text-center">
          <h1 className="font-serif text-2xl font-bold text-blue-950">Please log in</h1>
          <p className="mt-2 text-gray-600">You need to log in to open this page.</p>
          <Link
            to="/login"
            className="inline-block mt-6 bg-blue-900 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-800"
          >
            Log In
          </Link>
        </div>
      </div>
    )
  }

  if (!profile?.isAdmin) {
    return (
      <div className="bg-gray-50 px-8 py-16">
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl border border-gray-200 text-center">
          <h1 className="font-serif text-2xl font-bold text-blue-950">Access denied</h1>
          <p className="mt-2 text-gray-600">Only administrators can open the Admin Panel.</p>
          <Link
            to="/"
            className="inline-block mt-6 border border-blue-900 text-blue-900 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50"
          >
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

export default AdminRoute