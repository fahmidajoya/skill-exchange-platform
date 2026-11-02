import { useState } from 'react'
import type { FormEvent } from 'react'
import InputField from '../components/InputField'

type Mode = 'login' | 'signup'

type AuthFormData = {
  fullName: string
  email: string
  role: string
  password: string
  confirmPassword: string
}

type FormErrors = Partial<Record<keyof AuthFormData, string>>

const emptyForm: AuthFormData = {
  fullName: '',
  email: '',
  role: 'Student',
  password: '',
  confirmPassword: '',
}

function LoginPage() {
  const [mode, setMode] = useState<Mode>('login')
  const [form, setForm] = useState<AuthFormData>(emptyForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [message, setMessage] = useState('')

  const updateField = (field: keyof AuthFormData, value: string) => {
    setForm({ ...form, [field]: value })
  }

  const switchMode = (newMode: Mode) => {
    setMode(newMode)
    setForm(emptyForm)
    setErrors({})
    setMessage('')
  }

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {}

    if (mode === 'signup' && form.fullName.trim() === '') {
      newErrors.fullName = 'Full name is required'
    }

    if (form.email.trim() === '') {
      newErrors.email = 'Email is required'
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email address'
    }

    if (form.password === '') {
      newErrors.password = 'Password is required'
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (mode === 'signup' && form.confirmPassword !== form.password) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    return newErrors
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newErrors = validate()
    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      setMessage(
        mode === 'login'
          ? 'Login successful (demo). Real login will be added with Firebase.'
          : 'Account created (demo). Real signup will be added with Firebase.'
      )
    } else {
      setMessage('')
    }
  }

  const tabClass = (tab: Mode) =>
    `py-2 rounded-lg font-medium ${
      mode === tab ? 'bg-white text-blue-950 shadow-sm' : 'text-gray-500 hover:text-blue-950'
    }`

  return (
    <div className="bg-gray-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
        <h1 className="font-serif text-3xl font-bold text-blue-950 text-center">
          {mode === 'login' ? 'Welcome back' : 'Create your account'}
        </h1>
        <p className="mt-2 text-center text-gray-500">
          {mode === 'login'
            ? 'Log in to find or offer skills on campus'
            : 'Join the campus skill exchange community'}
        </p>

        <div className="mt-6 grid grid-cols-2 bg-gray-100 rounded-xl p-1">
          <button type="button" onClick={() => switchMode('login')} className={tabClass('login')}>
            Log In
          </button>
          <button type="button" onClick={() => switchMode('signup')} className={tabClass('signup')}>
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
          {mode === 'signup' && (
            <InputField
              label="Full Name"
              value={form.fullName}
              onChange={(value) => updateField('fullName', value)}
              placeholder="Your full name"
              error={errors.fullName}
            />
          )}

          <InputField
            label="Email"
            type="email"
            value={form.email}
            onChange={(value) => updateField('email', value)}
            placeholder="you@university.edu"
            error={errors.email}
          />

          {mode === 'signup' && (
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">I am a</label>
              <select
                value={form.role}
                onChange={(e) => updateField('role', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:border-blue-900 bg-white"
              >
                <option>Student</option>
                <option>Faculty</option>
              </select>
            </div>
          )}

          <InputField
            label="Password"
            type="password"
            value={form.password}
            onChange={(value) => updateField('password', value)}
            placeholder="At least 6 characters"
            error={errors.password}
          />

          {mode === 'signup' && (
            <InputField
              label="Confirm Password"
              type="password"
              value={form.confirmPassword}
              onChange={(value) => updateField('confirmPassword', value)}
              placeholder="Re-enter your password"
              error={errors.confirmPassword}
            />
          )}

          {message && (
            <p className="p-3 rounded-lg bg-green-50 text-green-700 text-sm">{message}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-900 text-white font-semibold py-3 rounded-xl hover:bg-blue-800"
          >
            {mode === 'login' ? 'Log In' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage