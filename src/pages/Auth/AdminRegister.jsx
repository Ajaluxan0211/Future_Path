
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, AlertTriangle, Eye, EyeOff, LockKeyhole } from 'lucide-react'

export default function AdminRegister() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    inviteCode: '',
    password: '',
    confirmPassword: '',
    role: '',
    audited: true,
    responsible: true,
    revocable: true,
  })

  const updateField = (event) => {
    const { name, value, type, checked } = event.target

    setForm((previous) => ({
      ...previous,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (form.password.length < 8) {
      alert('Password must contain at least 8 characters.')
      return
    }

    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match.')
      return
    }

    if (!form.inviteCode.trim()) {
      alert('Please enter your administrator invite code.')
      return
    }

    if (!form.role) {
      alert('Please select an administrator role.')
      return
    }

    if (!form.audited || !form.responsible || !form.revocable) {
      alert('Please accept all administrator responsibilities.')
      return
    }

    // Connect this form to your backend for real registration.
    alert('Form validated. Connect your backend to submit the admin access request.')
  }

  const inputClass =
    'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#0B603A] focus:ring-2 focus:ring-emerald-50'

  const labelClass =
    'mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-400'

  return (
    <div className="min-h-screen bg-[#EFF7F4] px-4 py-8 font-sans sm:py-10">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-slate-100 bg-white px-6 py-8 shadow-sm sm:px-9 sm:py-10">
        <header className="text-center">
          <ShieldCheck
            size={34}
            strokeWidth={1.9}
            className="mx-auto text-slate-900"
          />

          <h1 className="mt-5 text-2xl font-bold tracking-tight text-slate-900">
            Admin Registration
          </h1>

          <p className="mt-2 text-sm leading-5 text-slate-400">
            Restricted access. Requires institutional invite or admin clearance.
          </p>
        </header>

        <div className="mt-6 flex gap-3 rounded-xl border border-orange-200 bg-orange-50 p-3 text-xs leading-5 text-orange-700">
          <AlertTriangle size={17} className="mt-0.5 shrink-0" />

          <p>
            This account type requires verification by an existing Super Admin.
            Your access will be restricted until approved.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>First Name</label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={updateField}
                placeholder="John"
                autoComplete="given-name"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>Last Name</label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={updateField}
                placeholder="Doe"
                autoComplete="family-name"
                className={inputClass}
                required
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Work Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={updateField}
              placeholder="admin@agency.com"
              autoComplete="email"
              className={inputClass}
              required
            />
            <p className="mt-1.5 text-xs text-slate-400">
              Use your official institutional email address.
            </p>
          </div>

          <div>
            <label className={labelClass}>Admin Invite Code</label>
            <input
              name="inviteCode"
              value={form.inviteCode}
              onChange={updateField}
              placeholder="Enter your invite code"
              autoComplete="off"
              className={inputClass}
              required
            />
            <p className="mt-1.5 flex items-center gap-1 text-xs text-slate-400">
              <LockKeyhole size={12} />
              Invite codes are issued by existing Super Admins only.
            </p>
          </div>

          <div>
            <label className={labelClass}>Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={updateField}
                placeholder="Minimum 8 characters"
                autoComplete="new-password"
                minLength={8}
                className={`${inputClass} pr-11`}
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-700"
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
            <p className="mt-1.5 text-xs text-slate-400">Min. 8 characters</p>
          </div>

          <div>
            <label className={labelClass}>Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={updateField}
                placeholder="Re-enter your password"
                autoComplete="new-password"
                className={`${inputClass} pr-11`}
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
                className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-700"
              >
                {showConfirmPassword ? (
                  <EyeOff size={17} />
                ) : (
                  <Eye size={17} />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className={labelClass}>Admin Role</label>
            <select
              name="role"
              value={form.role}
              onChange={updateField}
              className={inputClass}
              required
            >
              <option value="">Select admin role</option>
              <option value="content-admin">Content Administrator</option>
              <option value="verification-admin">Verification Administrator</option>
              <option value="support-admin">Support Administrator</option>
              <option value="super-admin">Super Admin</option>
            </select>
          </div>

          <fieldset className="space-y-3 pt-2">
            <legend className={labelClass}>I Understand That:</legend>

            {[
              ['audited', 'My activity will be logged and audited by the platform.'],
              ['responsible', 'I am responsible for all actions taken under this account.'],
              ['revocable', 'My account can be revoked at any time by a Super Admin.'],
            ].map(([name, text]) => (
              <label
                key={name}
                className="flex cursor-pointer items-start gap-3 text-xs leading-5 text-slate-700"
              >
                <input
                  type="checkbox"
                  name={name}
                  checked={form[name]}
                  onChange={updateField}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[#0B603A]"
                  required
                />
                <span>{text}</span>
              </label>
            ))}
          </fieldset>

          <button
            type="submit"
            className="w-full rounded-xl bg-[#0B603A] px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-[#084A2E] focus:outline-none focus:ring-4 focus:ring-emerald-100"
          >
            Request Admin Access
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-400">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-[#0B603A] hover:underline"
          >
            Log in →
          </Link>
        </p>
      </div>
    </div>
  )
}
