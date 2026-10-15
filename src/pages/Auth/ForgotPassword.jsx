
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Mail } from 'lucide-react'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F0F7F4] px-4 py-10">
      <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10">
        <Link to="/login" className="inline-flex items-center gap-2 text-sm text-[#075C36] hover:underline">
          <ArrowLeft size={16} />
          Back to login
        </Link>

        <div className="mt-8 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-[#075C36]">
          <Mail size={23} />
        </div>

        <h1 className="mt-5 text-2xl font-bold text-slate-900">
          Forgot password?
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Enter your email address to start the password reset process.
        </p>

        {submitted ? (
          <p className="mt-6 rounded-lg bg-emerald-50 p-4 text-sm text-emerald-800">
            Form submitted. Connect your authentication service to send a real password reset email.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <label htmlFor="reset-email" className="block text-xs font-bold uppercase tracking-wide text-slate-500">
              Email Address
            </label>

            <input
              id="reset-email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-[#075C36] focus:ring-2 focus:ring-[#075C36]/10"
            />

            <button
              type="submit"
              className="h-12 w-full rounded-xl bg-[#0B603A] text-sm font-bold text-white hover:bg-[#084A2D]"
            >
              Reset Password
            </button>
          </form>
        )}
      </section>
    </main>
  )
}
