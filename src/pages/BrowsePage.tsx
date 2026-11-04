import { useState } from 'react'
import { services, categories } from '../data/services'
import ServiceCard from '../components/ServiceCard'

function BrowsePage() {
  const [searchText, setSearchText] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredServices = services.filter((service) => {
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory

    const text = searchText.toLowerCase()
    const matchesSearch =
      service.title.toLowerCase().includes(text) ||
      service.provider.toLowerCase().includes(text) ||
      service.description.toLowerCase().includes(text)

    return matchesCategory && matchesSearch
  })

  const clearFilters = () => {
    setSearchText('')
    setSelectedCategory('All')
  }

  return (
    <div className="bg-gray-50 px-8 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-serif text-4xl font-bold text-blue-950">Browse Services</h1>
        <p className="mt-2 text-gray-600">Find skilled students and faculty on campus</p>

        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search for a skill, service or provider..."
          className="mt-8 w-full px-5 py-4 rounded-xl border border-gray-300 bg-white outline-none focus:border-blue-900"
        />

        <div className="mt-4 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium border ${
                selectedCategory === category
                  ? 'bg-blue-900 text-white border-blue-900'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-blue-900'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <p className="mt-6 text-sm text-gray-500">{filteredServices.length} services found</p>

        {filteredServices.length > 0 ? (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="mt-8 p-10 bg-white rounded-2xl border border-gray-200 text-center">
            <p className="text-lg font-medium text-gray-900">No services match your search</p>
            <button onClick={clearFilters} className="mt-4 text-blue-900 font-medium hover:underline">
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default BrowsePage