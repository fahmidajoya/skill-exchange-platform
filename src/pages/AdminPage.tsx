import { useState } from 'react'

type UserStatus = 'Active' | 'Suspended'
type ListingStatus = 'Pending' | 'Approved' | 'Rejected'
type ListingFilter = 'All' | ListingStatus
type Tab = 'users' | 'listings'

type AdminUser = {
  id: number
  name: string
  email: string
  role: string
  status: UserStatus
}

type AdminListing = {
  id: number
  title: string
  provider: string
  category: string
  status: ListingStatus
}

const initialUsers: AdminUser[] = [
  { id: 1, name: 'Amara Diallo', email: 'amara@university.edu', role: 'Student', status: 'Active' },
  { id: 2, name: 'Kofi Mensah', email: 'kofi@university.edu', role: 'Student', status: 'Active' },
  { id: 3, name: 'Dr. Esi Owusu', email: 'esi@university.edu', role: 'Faculty', status: 'Active' },
  { id: 4, name: 'Nadia Rahman', email: 'nadia@university.edu', role: 'Student', status: 'Active' },
  { id: 5, name: 'Rafiq Hasan', email: 'rafiq@university.edu', role: 'Student', status: 'Suspended' },
  { id: 6, name: 'Tania Akter', email: 'tania@university.edu', role: 'Student', status: 'Active' },
  { id: 7, name: 'Farhan Ahmed', email: 'farhan@university.edu', role: 'Faculty', status: 'Active' },
  { id: 8, name: 'Lamia Sultana', email: 'lamia@university.edu', role: 'Student', status: 'Suspended' },
]

const initialListings: AdminListing[] = [
  { id: 1, title: 'Logo and Poster Design', provider: 'Nadia Rahman', category: 'Art & Beauty', status: 'Approved' },
  { id: 2, title: 'Bridal and Party Makeup', provider: 'Tania Akter', category: 'Art & Beauty', status: 'Pending' },
  { id: 3, title: 'Video Editing for YouTube', provider: 'Kofi Mensah', category: 'Media & Content', status: 'Approved' },
  { id: 4, title: 'Podcast Editing', provider: 'Sadia Islam', category: 'Media & Content', status: 'Pending' },
  { id: 5, title: 'Python Tutoring', provider: 'Amara Diallo', category: 'Academic & Tech', status: 'Approved' },
  { id: 6, title: 'UI Design Mentoring', provider: 'Farhan Ahmed', category: 'Academic & Tech', status: 'Pending' },
  { id: 7, title: 'Custom Fashion Design', provider: 'Lamia Sultana', category: 'Creative & Craft', status: 'Rejected' },
  { id: 8, title: 'Handmade Jewelry', provider: 'Priya Das', category: 'Creative & Craft', status: 'Approved' },
]

const listingFilters: ListingFilter[] = ['All', 'Pending', 'Approved', 'Rejected']

const badgeClass = (status: string) => {
  if (status === 'Active' || status === 'Approved') return 'bg-green-50 text-green-700'
  if (status === 'Pending') return 'bg-yellow-50 text-yellow-700'
  return 'bg-red-50 text-red-700'
}

function AdminPage() {
  const [tab, setTab] = useState<Tab>('users')
  const [users, setUsers] = useState<AdminUser[]>(initialUsers)
  const [listings, setListings] = useState<AdminListing[]>(initialListings)
  const [listingFilter, setListingFilter] = useState<ListingFilter>('All')

  const suspendedCount = users.filter((user) => user.status === 'Suspended').length
  const pendingCount = listings.filter((listing) => listing.status === 'Pending').length
  const approvedCount = listings.filter((listing) => listing.status === 'Approved').length

  const filteredListings = listings.filter(
    (listing) => listingFilter === 'All' || listing.status === listingFilter
  )

  const toggleUserStatus = (id: number) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? { ...user, status: user.status === 'Active' ? 'Suspended' : 'Active' }
          : user
      )
    )
  }

  const setListingStatus = (id: number, status: ListingStatus) => {
    setListings(listings.map((listing) => (listing.id === id ? { ...listing, status } : listing)))
  }

  const deleteListing = (id: number) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      setListings(listings.filter((listing) => listing.id !== id))
    }
  }

  const tabClass = (name: Tab) =>
    `px-5 py-2 rounded-lg font-medium ${
      tab === name
        ? 'bg-blue-900 text-white'
        : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-900'
    }`

  const stats = [
    { label: 'Total Users', value: users.length },
    { label: 'Suspended Users', value: suspendedCount },
    { label: 'Pending Listings', value: pendingCount },
    { label: 'Approved Listings', value: approvedCount },
  ]

  return (
    <div className="bg-gray-50 px-8 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-serif text-4xl font-bold text-blue-950">Admin Panel</h1>
        <p className="mt-2 text-gray-600">Manage users and service listings on campus</p>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-2xl border border-gray-200 text-center">
              <p className="font-serif text-3xl font-bold text-blue-950">{stat.value}</p>
              <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex gap-3">
          <button onClick={() => setTab('users')} className={tabClass('users')}>
            Users
          </button>
          <button onClick={() => setTab('listings')} className={tabClass('listings')}>
            Listings
          </button>
        </div>

        {tab === 'users' && (
          <div className="mt-6 bg-white rounded-2xl border border-gray-200 overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-sm text-gray-500">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-t border-gray-200">
                    <td className="px-4 py-3 font-medium text-gray-900">{user.name}</td>
                    <td className="px-4 py-3 text-gray-600">{user.email}</td>
                    <td className="px-4 py-3 text-gray-600">{user.role}</td>
                    <td className="px-4 py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeClass(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleUserStatus(user.id)}
                        className="text-sm font-medium text-blue-900 hover:underline"
                      >
                        {user.status === 'Active' ? 'Suspend' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'listings' && (
          <div className="mt-6">
            <div className="flex flex-wrap gap-3">
              {listingFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setListingFilter(filter)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border ${
                    listingFilter === filter
                      ? 'bg-blue-900 text-white border-blue-900'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-900'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="mt-4 bg-white rounded-2xl border border-gray-200 overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-sm text-gray-500">
                  <tr>
                    <th className="px-4 py-3">Title</th>
                    <th className="px-4 py-3">Provider</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredListings.map((listing) => (
                    <tr key={listing.id} className="border-t border-gray-200">
                      <td className="px-4 py-3 font-medium text-gray-900">{listing.title}</td>
                      <td className="px-4 py-3 text-gray-600">{listing.provider}</td>
                      <td className="px-4 py-3 text-gray-600">{listing.category}</td>
                      <td className="px-4 py-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeClass(listing.status)}`}>
                          {listing.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-4 text-sm font-medium">
                          {listing.status !== 'Approved' && (
                            <button
                              onClick={() => setListingStatus(listing.id, 'Approved')}
                              className="text-green-700 hover:underline"
                            >
                              Approve
                            </button>
                          )}
                          {listing.status !== 'Rejected' && (
                            <button
                              onClick={() => setListingStatus(listing.id, 'Rejected')}
                              className="text-yellow-700 hover:underline"
                            >
                              Reject
                            </button>
                          )}
                          <button
                            onClick={() => deleteListing(listing.id)}
                            className="text-red-600 hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredListings.length === 0 && (
                <p className="p-8 text-center text-gray-600">No listings in this category.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPage