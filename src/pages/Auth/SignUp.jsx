
import { Link, useNavigate } from 'react-router-dom'
import {
  GraduationCap,
  Building2,
  ShieldCheck,
  Check,
  ArrowRight,
} from 'lucide-react'

const options = [
  {
    title: 'Student / Professional',
    description:
      'Looking to study, work, or travel abroad. Find verified agencies, explore visa options, and track your application.',
    icon: GraduationCap,
    iconStyle: 'bg-emerald-50 text-emerald-800',
    features: [
      'Browse verified agencies',
      'Track visa applications',
      'Find scholarships & courses',
    ],
    button: 'Continue as Student',
    buttonStyle:
      'bg-[#0B603A] text-white hover:bg-[#084A2E]',
    path: '/register/student',
  },
  {
    title: 'Agency / Consultant',
    description:
      "Register your agency, manage client applications, and build your verified profile on Agency's trusted platform.",
    icon: Building2,
    iconStyle: 'bg-slate-100 text-slate-600',
    features: [
      'List your agency publicly',
      'Manage client applications',
      'Receive leads from students',
    ],
    button: 'Continue as Agency',
    buttonStyle:
      'border-2 border-[#0B603A] text-[#0B603A] hover:bg-emerald-50',
    path: '/register/agency',
  },
  {
    title: 'Platform Administrator',
    description:
      'Access platform governance, oversee agency verification, investigate scam reports, and audit system operations.',
    icon: ShieldCheck,
    iconStyle: 'bg-slate-100 text-slate-600',
    features: [
      'Verify agency credentials',
      'Investigate trust & safety alerts',
      'Platform analytics & audit control',
    ],
    button: 'Continue as Admin',
    buttonStyle:
      'border-2 border-slate-900 text-slate-900 hover:bg-slate-50',
    path: '/admin-register',
    admin: true,
  },
]

export default function SignUp() {
  const navigate = useNavigate()

  const handleContinue = (option) => {
    navigate(option.path)
  }

  return (
    <div className="min-h-screen bg-[#F6F9FC] px-5 py-12 font-sans sm:px-8 lg:flex lg:flex-col lg:justify-center lg:py-10">
      <div className="mx-auto w-full max-w-7xl">
        {/* Page heading */}
        <header className="mb-12 text-center">
          <Link
            to="/"
            className="text-xl font-bold text-[#0B603A]"
          >
            Agency
          </Link>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Create your account
          </h1>

          <p className="mt-3 text-base text-slate-500 sm:text-lg">
            Choose how you'll use Agency.
          </p>
        </header>

        {/* Registration options */}
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
          {options.map((option) => {
            const Icon = option.icon

            return (
              <section
                key={option.title}
                className="flex min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md sm:p-8"
              >
                {/* Icon */}
                <div
                  className={`mb-7 flex h-[60px] w-[60px] items-center justify-center rounded-2xl ${option.iconStyle}`}
                >
                  <Icon size={31} strokeWidth={1.8} />
                </div>

                {/* Title and description */}
                <h2 className="text-xl font-bold leading-7 text-slate-950">
                  {option.title}
                </h2>

                <p className="mt-4 min-h-[90px] text-[15px] leading-[25px] text-slate-600">
                  {option.description}
                </p>

                {/* Features */}
                <ul className="my-7 space-y-4">
                  {option.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm leading-5 text-slate-800"
                    >
                      <span className="mt-0.5 flex h-[21px] w-[21px] shrink-0 items-center justify-center rounded-full bg-emerald-50 text-[#0B603A]">
                        <Check size={14} strokeWidth={2.5} />
                      </span>

                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Action */}
                <div className="mt-auto pt-2">
                  <button
                    type="button"
                    onClick={() => handleContinue(option)}
                    className={`flex min-h-[56px] w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-center text-sm font-semibold transition sm:text-base ${option.buttonStyle}`}
                  >
                    {option.button}
                    <ArrowRight size={18} />
                  </button>

                
                </div>
              </section>
            )
          })}
        </div>

        {/* Login link */}
        <p className="mt-12 text-center text-sm text-slate-600">
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
