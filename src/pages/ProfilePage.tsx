import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import InputField from '../components/InputField'
import { useAuth } from '../AuthContext'
import type { EditableProfile } from '../AuthContext'

type ProfileErrors = Partial<Record<keyof EditableProfile, string>>

type MyListing = {
  id: number
  title: string
  category: string
  price: string
}

const sampleListings: MyListing[] = [
  { id: 1, title: 'Python Tutoring', category: 'Academic & Tech', price: 'From ₵35' },
  { id: 2, title: 'Data Analysis with Excel', category: 'Academic & Tech', price: 'From ₵30' },
  { id: 3, title: 'Presentation Slide Design', category: 'Creative & Craft', price: 'From ₵40' },
]

function ProfilePage() {
  const { user, profile, loading, saveProfile } = useAuth()

  const [draft, setDraft] = useState<EditableProfile>({
    fullName: '',
    role: 'Student',
    department: '',
    bio: '',
  })
  const [isEditing, setIsEditing] = useState(false)
  const [errors, setErrors] = useState<ProfileErrors>({})
  const [message, setMessage] = useState('')
  const [saveError, setSaveError] = useState('')
  const [saving, setSaving] = useState(false)
  const [listings, setListings] = useState<MyListing[]>(sampleListings)

  if (loading) {
    return <p className="p-12 text-center text-gray-600">Loading...</p>
  }

  if (!user) {
    return (
      <div className="bg-gray-50 px-8 py-16">
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl border border-gray-200 text-center">
          <h1 className="font-serif text-2xl font-bold text-blue-950">Please log in</h1>
          <p className="mt-2 text-gray-600">You need to log in to see your profile.</p>
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

  if (!profile) {
    return (
      <p className="p-12 text-center text-gray-600">
        Profile data could not be loaded. Please try logging in again.
      </p>
    )
  }

  const initials = profile.fullName
    .split(' ')
    .filter(Boolean)
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const updateDraft = (field: keyof EditableProfile, value: string) => {
    setDraft({ ...draft, [field]: value })
  }

  const startEditing = () => {
    setDraft({
      fullName: profile.fullName,
      role: profile.role,
      department: profile.department,
      bio: profile.bio,
    })
    setErrors({})
    setMessage('')
    setSaveError('')
    setIsEditing(true)
  }

  const cancelEditing = () => {
    setErrors({})
    setSaveError('')
    setIsEditing(false)
  }

  const validate = (): ProfileErrors => {
    const newErrors: ProfileErrors = {}

    if (draft.fullName.trim() === '') {
      newErrors.fullName = 'Full name is required'
    }

    if (draft.bio.length > 200) {
      newErrors.bio = 'Bio must be 200 characters or less'
    }

    return newErrors
  }

  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newErrors = validate()
    setErrors(newErrors)
    setSaveError('')

    if (Object.keys(newErrors).length > 0) return

    setSaving(true)
    try {
      await saveProfile({
        fullName: draft.fullName.trim(),
        role: draft.role,
        department: draft.department.trim(),
        bio: draft.bio.trim(),
      })
      setIsEditing(false)
      setMessage('Profile saved to the database.')
    } catch (error) {
      console.error(error)
      setSaveError('Could not save your profile. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const removeListing = (id: number) => {
    setListings(listings.filter((listing) => listing.id !== id))
  }

  return (
    <div className="bg-gray-50 px-8 py-12">
      <div className="max-w-5xl mx-auto">
        {message && (
          <p className="mb-6 p-3 rounded-lg bg-green-50 text-green-700 text-sm">{message}</p>
        )}

        <div className="bg-white p-8 rounded-2xl border border-gray-200">
          {!isEditing ? (
            <div className="flex flex-wrap items-start gap-6">
              <div className="w-24 h-24 rounded-full bg-blue-950 text-white text-3xl font-bold flex items-center justify-center">
                {initials}
              </div>

              <div className="flex-1 min-w-[240px]">
                <h1 className="font-serif text-3xl font-bold text-blue-950">{profile.fullName}</h1>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-900 font-semibold">
                    {profile.role}
                  </span>
                  <span className="text-gray-600">
                    {profile.department || 'Department not set'}
                  </span>
                </div>
                <p className="mt-1 text-gray-500">{profile.email}</p>
                <p className="mt-4 text-gray-700">
                  {profile.bio || 'No bio yet. Click Edit Profile to add one.'}
                </p>
              </div>

              <button
                onClick={startEditing}
                className="border border-blue-900 text-blue-900 font-semibold px-5 py-2 rounded-xl hover:bg-blue-50"
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <form onSubmit={handleSave} noValidate className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-blue-950">Edit Profile</h2>

              <InputField
                label="Full Name"
                value={draft.fullName}
                onChange={(value) => updateDraft('fullName', value)}
                error={errors.fullName}
              />

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                <p className="px-4 py-3 rounded-xl bg-gray-100 text-gray-500">{profile.email}</p>
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">I am a</label>
                <select
                  value={draft.role}
                  onChange={(e) => updateDraft('role', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:border-blue-900 bg-white"
                >
                  <option>Student</option>
                  <option>Faculty</option>
                </select>
              </div>

              <InputField
                label="Department"
                value={draft.department}
                onChange={(value) => updateDraft('department', value)}
                placeholder="For example: Computer Science"
              />

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Bio</label>
                <textarea
                  rows={4}
                  value={draft.bio}
                  onChange={(e) => updateDraft('bio', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border outline-none focus:border-blue-900 ${
                    errors.bio ? 'border-red-400' : 'border-gray-300'
                  }`}
                />
                <div className="flex justify-between mt-1 text-sm">
                  <span className="text-red-600">{errors.bio}</span>
                  <span className="text-gray-500">{draft.bio.length}/200</span>
                </div>
              </div>

              {saveError && (
                <p className="p-3 rounded-lg bg-red-50 text-red-700 text-sm">{saveError}</p>
              )}

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-blue-900 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-800 disabled:opacity-60"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={cancelEditing}
                  className="border border-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-xl hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
          <div className="bg-white p-6 rounded-2xl border border-gray-200">
            <p className="font-serif text-3xl font-bold text-blue-950">{listings.length}</p>
            <p className="mt-1 text-sm text-gray-500">Active Listings</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-200">
            <p className="font-serif text-3xl font-bold text-blue-950">0</p>
            <p className="mt-1 text-sm text-gray-500">Completed Projects</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-200">
            <p className="font-serif text-3xl font-bold text-blue-950">—</p>
            <p className="mt-1 text-sm text-gray-500">Average Rating</p>
          </div>
        </div>

        <h2 className="mt-12 font-serif text-3xl font-bold text-blue-950">My Listings</h2>
        <p className="mt-1 text-sm text-gray-500">
          Sample listings (demo data). Real listings will be added later.
        </p>

        {listings.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <div key={listing.id} className="bg-white p-6 rounded-2xl border border-gray-200">
                <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-900 text-xs font-semibold">
                  {listing.category}
                </span>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">{listing.title}</h3>
                <p className="mt-2 font-semibold text-blue-950">{listing.price}</p>
                <button
                  onClick={() => removeListing(listing.id)}
                  className="mt-4 text-sm font-medium text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-6 p-10 bg-white rounded-2xl border border-gray-200 text-center text-gray-600">
            You have no listings yet.
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfilePage