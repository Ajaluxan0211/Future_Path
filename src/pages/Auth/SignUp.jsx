
import { Link, useNavigate } from 'react-router-dom'

const accountTypes = [
  {
    title: 'Student / Professional',
    icon: '🎓',
    description:
      'Looking to study, work, or travel abroad. Find verified agencies, explore visa options, and track your application.',
    features: [
      'Browse verified agencies',
      'Track visa applications',
      'Find scholarships',
    ],
    button: 'Continue as Student',
    type: 'student',
    style: 'primary',
  },
  {
    title: 'Agency / Consultant',
    icon: '🏢',
    description:
      "Register your agency, manage client applications, and build your verified profile on Agency's trusted platform.",
    features: [
      'List your agency publicly',
      'Manage client applications',
      'Receive leads from students',
    ],
    button: 'Continue as Agency',
    type: 'agency',
    style: 'secondary',
  },
]

export default function SignUp() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#F0F8F5] px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-3xl">
        {/* Heading */}
        <div className="mb-10 text-center">
          <p className="mb-2 text-xl font-bold text-[#085C38]">
            Agency
          </p>

          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Create your account
          </h1>

          <p className="mt-3 text-sm text-gray-500 sm:text-base">
            Choose how you'll use Agency.
          </p>
        </div>

        {/* Account type cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {accountTypes.map((account) => (
            <div
              key={account.type}
              className="flex flex-col rounded-2xl border-2 border-gray-200 bg-white p-6 sm:p-8"
            >
              <div className="mb-4 text-5xl" aria-hidden="true">
                {account.icon}
              </div>

              <h2 className="text-xl font-bold text-gray-900">
                {account.title}
              </h2>

              <p className="mt-3 min-h-24 text-sm leading-6 text-gray-500">
                {account.description}
              </p>

              <ul className="mb-7 mt-5 space-y-3">
                {account.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 text-sm text-slate-700"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E7F5ED] text-xs font-bold text-[#08633D]">
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() =>
                  navigate(`/register/${account.type}`)
                }
                className={`mt-auto flex w-full items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 text-sm font-bold transition ${
                  account.style === 'primary'
                    ? 'border-[#0B603A] bg-[#0B603A] text-white hover:bg-[#084B2D]'
                    : 'border-[#0B603A] bg-white text-[#085C38] hover:bg-[#F0F8F5]'
                }`}
              >
                {account.button}
                <span aria-hidden="true">→</span>
              </button>
            </div>
          ))}
        </div>

        {/* Login link */}
        <div className="mt-9 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-bold text-[#085C38] hover:underline"
          >
            Log in →
          </Link>
        </div>
      </div>
    </div>
  )
}
