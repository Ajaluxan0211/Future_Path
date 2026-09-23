import { Link } from 'react-router-dom'
import { Globe, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 pt-14 pb-6">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div>
            <div className="text-white font-bold text-xl mb-3">Agency</div>
            <p className="text-sm text-gray-500 leading-relaxed mb-5">
              The ultimate destination for Sri Lankans seeking truthful guidance on
              international opportunities.
            </p>
            <div className="flex gap-3">
              <Globe size={17} className="text-gray-500 hover:text-white cursor-pointer transition-colors" />
              <Mail  size={17} className="text-gray-500 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div className="text-xs uppercase tracking-widest font-semibold text-gray-400 mb-5">Navigation</div>
            {[
              { to: '/countries',    label: 'Destinations'      },
              { to: '/universities', label: 'University Finder'  },
              { to: '/agencies',     label: 'Verified Agencies'  },
              { to: '/scholarships', label: 'Scholarships'       },
            ].map(({ to, label }) => (
              <Link key={label} to={to} className="block text-sm py-1.5 text-gray-400 hover:text-white transition-colors">
                {label}
              </Link>
            ))}
          </div>

          {/* Resources */}
          <div>
            <div className="text-xs uppercase tracking-widest font-semibold text-gray-400 mb-5">Resources</div>
            {[
              { to: '/visas',       label: 'Visa Guide'        },
              { to: '/eligibility', label: 'IELTS Preparation' },
              { to: '/report',      label: 'Fraud Prevention'  },
              { to: '/',            label: 'Contact Support'   },
            ].map(({ to, label }) => (
              <Link key={label} to={to} className="block text-sm py-1.5 text-gray-400 hover:text-white transition-colors">
                {label}
              </Link>
            ))}
          </div>

          {/* Legal */}
          <div>
            <div className="text-xs uppercase tracking-widest font-semibold text-gray-400 mb-5">Legal</div>
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(label => (
              <span key={label} className="block text-sm py-1.5 text-gray-400 hover:text-white cursor-pointer transition-colors">
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-5 flex justify-between items-center">
          <p className="text-xs text-gray-600">
            © 2024 Agency. All rights reserved. Your expert companion for global mobility.
          </p>
          <div className="flex gap-6 text-xs text-gray-500">
            {['Privacy Policy', 'Terms of Service', 'Fraud Prevention'].map(l => (
              <span key={l} className="hover:text-white cursor-pointer transition-colors">{l}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}