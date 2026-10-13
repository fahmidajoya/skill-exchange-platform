function HowItWorksSection() {
  const steps = [
    {
      number: '1',
      title: 'Search & Discover',
      description: 'Browse categories or search for the skill you need from verified campus providers.',
    },
    {
      number: '2',
      title: 'Connect & Agree',
      description: 'Message the provider, discuss the details and agree on scope and price.',
    },
    {
      number: '3',
      title: 'Exchange & Review',
      description: 'Complete the work, then leave a review to help the next person on campus.',
    },
  ]

  return (
    <section className="bg-white px-8 py-20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="font-serif text-4xl font-bold text-blue-950">
          How Skill Exchange Platform Works
        </h2>
        <p className="mt-3 text-gray-500">Simple. Trusted. Campus-first.</p>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step) => (
            <div key={step.number}>
              <div className="mx-auto w-14 h-14 rounded-full bg-blue-950 text-white text-xl font-bold flex items-center justify-center">
                {step.number}
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">{step.title}</h3>
              <p className="mt-2 text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection