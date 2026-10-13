function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        'I found a UI design tutor within a day. Saved me hours of confusion before my project deadline.',
      name: 'Amara Diallo',
      role: '3rd Year, Computer Science',
    },
    {
      quote:
        'I earn between ₵400–₵800 a month just editing videos for classmates. Skill Exchange Platform made that possible.',
      name: 'Kofi Mensah',
      role: 'Service Provider — Video Editor',
    },
    {
      quote:
        'I hired a student to design infographics for my lecture slides. Excellent quality at reasonable rates.',
      name: 'Dr. Esi Owusu',
      role: 'Lecturer, Business School',
    },
  ]

  const getInitials = (name: string) =>
    name
      .replace('Dr. ', '')
      .split(' ')
      .map((word) => word[0])
      .join('')

  return (
    <section className="bg-gray-50 px-8 py-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-4xl font-bold text-blue-950">What the campus says</h2>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div key={item.name} className="bg-white p-8 rounded-2xl border border-gray-200">
              <p className="text-lg text-gray-800">"{item.quote}"</p>
              <div className="mt-8 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-900 font-bold flex items-center justify-center">
                  {getInitials(item.name)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection