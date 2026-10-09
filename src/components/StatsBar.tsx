function StatsBar() {
  const stats = [
    { number: '238', label: 'Registered Providers' },
    { number: '412', label: 'Active Listings' },
    { number: '1,840', label: 'Completed Projects' },
    { number: '14', label: 'Campus Departments' },
  ]

  return (
    <section className="bg-white border-b border-gray-200 px-8 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="font-serif text-4xl font-bold text-blue-950">{stat.number}</p>
            <p className="mt-1 text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default StatsBar