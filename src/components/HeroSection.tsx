import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

function HeroSection() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const popular = ['Video Editing', 'UI Design', 'Python Tutoring', 'Photography']

  const goToBrowse = (text: string) => {
    const trimmed = text.trim()
    navigate(trimmed ? `/browse?search=${encodeURIComponent(trimmed)}` : '/browse')
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    goToBrowse(query)
  }

  return (
    <section className="bg-blue-950 text-white px-8 py-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-serif text-6xl font-bold leading-tight">
          Find talent.
          <br />
          Share skills.
          <br />
          <span className="text-blue-400">Grow together.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-xl text-blue-100">
          Skill Exchange Platform connects students and faculty on campus. Hire
          skilled peers or offer your expertise — all in one trusted platform.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 flex gap-3 max-w-3xl">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a skill or service..."
            className="flex-1 px-5 py-4 rounded-xl bg-blue-900/50 border border-blue-800 text-white placeholder-blue-300 outline-none focus:border-blue-400"
          />
          <button
            type="submit"
            className="bg-white text-blue-950 font-semibold px-8 rounded-xl hover:bg-blue-50"
          >
            Search
          </button>
        </form>

        <div className="mt-6 flex flex-wrap items-center gap-4 text-blue-200">
          <span>Popular:</span>
          {popular.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => goToBrowse(item)}
              className="hover:text-white hover:underline"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeroSection