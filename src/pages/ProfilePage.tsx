import { useState } from 'react'
import type { FormEvent } from 'react'
import InputField from '../components/InputField'

type Profile = {
  fullName: string
  email: string
  role: string
  department: string
  bio: string
}

type ProfileErrors = Partial<Record<keyof Profile, string>>

type MyListing = {
  id: number
  title: string
  category: string
  price: string
}

const initialProfile: Profile = {
  fullName: 'Amara Diallo',
  email: 'amara@university.edu',
  role: 'Student',
  department: 'Computer Science',
  bio: 'Third year CS student. I enjoy teaching programming and helping classmates with their projects.',
}

const initialListings: MyListing[] = [
  { id: 1, title: 'Python Tutoring', category: 'Academic & Tech', price: 'From ₵35' },
  { id: 2, title: 'Data Analysis with Excel', category: 'Academic & Tech', price: 'From ₵30' },
  { id: 3, title: 'Presentation Slide Design', category: 'Creative & Craft', price: 'From ₵40' },
]

function ProfilePage() {
  const [profile, setProfile] = useState<Profile>(initialProfile)
  const [draft, setDraft] = useState<Profile>(initialProfile)
  const [isEditing, setIsEditing] = useState(false)
  const [errors, setErrors] = useState<ProfileErrors>({})
  const [message, setMessage] = useState('')
  const [listings, setListings] = useState<MyListing[]>(initialListings)

  const initials = profile.fullName
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const updateDraft = (field: keyof Profile, value: string) => {
    setDraft({ ...draft, [field]: value })
  }

  const startEditing = () => {
    setDraft(profile)
    setErrors({})
    setMessage('')
    setIsEditing(true)
  }

  const cancelEditing = () => {
    setErrors({})
    setIsEditing(false)
  }

  const validate = (): ProfileErrors => {
    const newErrors: ProfileErrors = {}

    if (draft.fullName.trim() === '') {
      newErrors.fullName = 'Full name is required'
    }

    if (draft.email.trim() === '') {
      newErrors.email = 'Email is required'
    } else if (!/^\S+@\S+\.\S+$/.test(draft.email)) {
      newErrors.email = 'Enter a valid email address'
    }

    if (draft.department.trim() === '') {
      newErrors.department = 'Department is required'
    }

    if (draft.bio.length > 200) {
      newErrors.bio = 'Bio must be 200 characters or less'
    }

    return newErrors
  }

  const handleSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newErrors = validate()
    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      setProfile(draft)
      setIsEditing(false)
      setMessage('Profile updated (demo). It will be saved to the database with Firebase later.')
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
                  <span className="text-gray-600">{profile.department}</span>
                </div>
                <p className="mt-1 text-gray-500">{profile.email}</p>
                <p className="mt-4 text-gray-700">{profile.bio}</p>
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

              <InputField
                label="Email"
                type="email"
                value={draft.email}
                onChange={(value) => updateDraft('email', value)}
                error={errors.email}
              />

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
                error={errors.department}
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

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-blue-900 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-800"
                >
                  Save Changes
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
            <p className="font-serif text-3xl font-bold text-blue-950">24</p>
            <p className="mt-1 text-sm text-gray-500">Completed Projects</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-200">
            <p className="font-serif text-3xl font-bold text-blue-950">★ 4.9</p>
            <p className="mt-1 text-sm text-gray-500">Average Rating</p>
          </div>
        </div>

        <h2 className="mt-12 font-serif text-3xl font-bold text-blue-950">My Listings</h2>

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