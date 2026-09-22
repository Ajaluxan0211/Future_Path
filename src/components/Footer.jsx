import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">

      {/* ── Main grid ── */}
      <div className="max-w-6xl mx-auto px-6 pt-14 pb-10">
        <div className="grid grid-cols-3 gap-12">

          {/* Brand */}
          <div>
            <div className="text-white font-bold text-xl mb-3">Agency</div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Building transparency in international migration. We help students and
              professionals navigate global mobility with verified data and scam protection.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div className="text-primary-500 text-xs font-semibold uppercase tracking-widest mb-4">
              Navigation
            </div>
            {[
              { to: '/',             label: 'Home'               },
              { to: '/courses',      label: 'Course Finder'      },
              { to: '/agencies',     label: 'Verified Agencies'  },
              { to: '/visas',        label: 'Visa Eligibility'   },
              { to: '/scholarships', label: 'Scholarship Finder' },
            ].map(({ to, label }) => (
              <Link
                key={label}
                to={to}
                className="block text-sm py-1.5 text-gray-400 hover:text-white transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Company */}
          <div>
            <div className="text-primary-500 text-xs font-semibold uppercase tracking-widest mb-4">
              Company
            </div>
            {['About Us', 'Global Offices', 'Careers', 'Contact Support', 'Report Scam'].map(label => (
              <span
                key={label}
                className="block text-sm py-1.5 text-gray-400 hover:text-white cursor-pointer transition-colors"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-xs text-gray-600">© 2024 Agency. All rights reserved.</span>
          <div className="flex gap-5">
            {['Privacy', 'Terms', 'Cookie Policy'].map(label => (
              <span
                key={label}
                className="text-xs text-gray-500 hover:text-white cursor-pointer transition-colors"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}