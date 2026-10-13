
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, GraduationCap } from 'lucide-react'

export default function StudentRegister() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    interest: 'Student Visa',
  })

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))

    setError('')
    setSuccess('')
  }

  function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim() ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError('Please fill in all required fields.')
      return
    }

    if (formData.password.length < 8) {
      setError('Password must contain at least 8 characters.')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    // Frontend validation only. Connect your backend or
    // authentication service here to create the real account.
    setSuccess(
      'Your details have been validated. Connect authentication to finish creating your account.'
    )
  }

  const inputClass =
    'mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-[#0B603A] focus:ring-2 focus:ring-[#0B603A]/10'

  const labelClass =
    'block text-xs font-bold uppercase tracking-wide text-gray-400'

  return (
    <div className="min-h-screen bg-[#F0F8F5] px-4 py-10 sm:py-12">
      <div className="mx-auto max-w-lg rounded-2xl border border-gray-200 bg-white px-6 py-8 shadow-sm sm:px-11 sm:py-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <GraduationCap
            size={42}
            strokeWidth={1.8}
            className="mx-auto mb-2 text-[#303030]"
          />

          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
            Student Registration
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Create your free account to get started.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* First and last name */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="firstName">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="given-name"
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="lastName">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                autoComplete="family-name"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="mt-5">
            <label className={labelClass} htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="john.doe@example.com"
              value={formData.email}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          {/* Password */}
          <div className="mt-5">
            <label className={labelClass} htmlFor="password">
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="Minimum 8 characters"
                value={formData.password}
                onChange={handleChange}
                className={`${inputClass} pr-12`}
                minLength={8}
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={
                  showPassword ? 'Hide password' : 'Show password'
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>

            <p className="mt-1 text-xs text-gray-400">
              Min. 8 characters
            </p>
          </div>

          {/* Confirm password */}
          <div className="mt-5">
            <label
              className={labelClass}
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>

            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`${inputClass} pr-12`}
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword((value) => !value)
                }
                aria-label={
                  showConfirmPassword
                    ? 'Hide confirm password'
                    : 'Show confirm password'
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Visa interest */}
          <fieldset className="mt-6">
            <legend className={labelClass}>
              I am interested in:
            </legend>

            <div className="mt-3 space-y-3">
              {['Student Visa', 'Work Visa', 'Tourist Visa'].map(
                (interest) => (
                  <label
                    key={interest}
                    className="flex cursor-pointer items-center gap-3 text-sm text-gray-800"
                  >
                    <input
                      type="radio"
                      name="interest"
                      value={interest}
                      checked={formData.interest === interest}
                      onChange={handleChange}
                      className="h-5 w-5 accent-[#0B603A]"
                    />
                    {interest}
                  </label>
                )
              )}
            </div>
          </fieldset>

          {/* Feedback */}
          {error && (
            <p
              role="alert"
              className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700"
            >
              {error}
            </p>
          )}

          {success && (
            <p
              role="status"
              className="mt-4 rounded-lg bg-green-50 p-3 text-sm text-green-800"
            >
              {success}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="mt-5 w-full rounded-xl bg-[#0B603A] px-4 py-3.5 text-sm font-bold text-white transition hover:bg-[#084B2D] focus:outline-none focus:ring-2 focus:ring-[#0B603A] focus:ring-offset-2"
          >
            Create Account
          </button>
        </form>

        {/* Login link */}
        <p className="mt-7 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-[#085C38] hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}
