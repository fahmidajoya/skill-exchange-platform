type CategoryCardProps = {
  icon: string
  title: string
  description: string
  listings: number
  colorClass: string
}

function CategoryCard({ icon, title, description, listings, colorClass }: CategoryCardProps) {
  return (
    <div className={`p-8 rounded-2xl border cursor-pointer transition hover:shadow-lg ${colorClass}`}>
      <div className="text-4xl">{icon}</div>
      <h3 className="mt-6 text-2xl font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
      <span className="inline-block mt-6 px-4 py-2 bg-white/70 rounded-lg text-sm font-semibold text-gray-800">
        {listings} listings
      </span>
    </div>
  )
}

export default CategoryCard