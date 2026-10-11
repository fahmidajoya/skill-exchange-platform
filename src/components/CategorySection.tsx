import { Link } from 'react-router-dom'
import CategoryCard from './CategoryCard'

function CategorySection() {
  const categories = [
    {
      icon: '🎨',
      title: 'Art & Beauty',
      description: 'Makeup, illustration, photography, styling',
      listings: 156,
      colorClass: 'bg-orange-50 border-orange-200',
    },
    {
      icon: '🎬',
      title: 'Media & Content',
      description: 'Video editing, podcasting, social media, writing',
      listings: 127,
      colorClass: 'bg-teal-50 border-teal-200',
    },
    {
      icon: '💻',
      title: 'Academic & Tech',
      description: 'Tutoring, coding, data analysis, research',
      listings: 91,
      colorClass: 'bg-blue-50 border-blue-200',
    },
    {
      icon: '✂️',
      title: 'Creative & Craft',
      description: 'Fashion design, jewelry, handmade goods, décor',
      listings: 38,
      colorClass: 'bg-purple-50 border-purple-200',
    },
  ]

  return (
    <section className="bg-gray-50 px-8 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-serif text-4xl font-bold text-blue-950">Browse by Category</h2>
            <p className="mt-3 text-gray-600">Find what you need across four core disciplines</p>
          </div>
          <Link to="/browse" className="text-blue-900 font-medium hover:underline">
            View all →
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat) => (
            <CategoryCard key={cat.title} {...cat} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategorySection