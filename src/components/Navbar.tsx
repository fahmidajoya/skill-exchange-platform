import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'

function Navbar() {
  const { user, profile, logout } = useAuth()
  const navigate = useNavigate()

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? 'px-4 py-2 rounded-lg border-2 border-blue-900 bg-blue-50 text-blue-900 font-medium'
      : 'px-4 py-2 text-gray-600 hover:text-blue-900'

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const firstName = profile?.fullName.split(' ')[0] || user?.email || ''

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200">
      <Link to="/" className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-900 rounded-xl flex items-center justify-center">
          <div className="w-4 h-4 bg-white rounded-sm"></div>
        </div>
        <span className="text-xl font-bold text-blue-950">Skill Exchange Platform</span>
      </Link>

      <div className="flex items-center gap-2">
        <NavLink to="/" end className={linkClass}>Home</NavLink>
        <NavLink to="/browse" className={linkClass}>Browse Services</NavLink>
        <NavLink to="/profile" className={linkClass}>My Profile</NavLink>
        {profile?.isAdmin && (
          <NavLink to="/admin" className={linkClass}>Admin</NavLink>
        )}
      </div>

      {user ? (
        <div className="flex items-center gap-4">
          <span className="text-gray-600">Hi, {firstName}</span>
          <button
            onClick={handleLogout}
            className="bg-blue-900 text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-800"
          >
            Log Out
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-blue-900 font-medium">Log In</Link>
          <Link
            to="/login"
            className="bg-blue-900 text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-800"
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar