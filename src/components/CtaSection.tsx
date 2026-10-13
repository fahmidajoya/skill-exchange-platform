import { Link } from 'react-router-dom'

function CtaSection() {
  return (
    <section className="bg-blue-950 text-white px-8 py-20 text-center">
      <h2 className="font-serif text-5xl font-bold">Ready to get started?</h2>
      <p className="mt-5 text-lg text-blue-100">
        Join 238 students and faculty already exchanging skills on campus via the Skill Exchange
        Platform.
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link
          to="/login"
          className="bg-white text-blue-950 font-semibold px-8 py-4 rounded-xl hover:bg-blue-50"
        >
          Join as Provider
        </Link>
        <Link
          to="/browse"
          className="border border-blue-400 text-white font-semibold px-8 py-4 rounded-xl hover:bg-blue-900"
        >
          Browse Services
        </Link>
      </div>
    </section>
  )
}

export default CtaSection