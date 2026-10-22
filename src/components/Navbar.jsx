
import { useState, useRef, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import {
  ChevronDown,
  Globe,
  BookOpen,
  GraduationCap,
  Building2,
  Award,
  BarChart3,
} from 'lucide-react'

const EXPLORE_ITEMS = [
  {
    label: 'Countries',
    desc: 'Explore 40+ destinations',
    icon: Globe,
    color: 'bg-green-50 text-green-700',
    to: '/countries',
  },
  {
    label: 'Visas',
    desc: 'Requirements and fees',
    icon: BookOpen,
    color: 'bg-blue-50 text-blue-700',
    to: '/visas',
  },
  {
    label: 'Courses',
    desc: 'Degrees and programs',
    icon: GraduationCap,
    color: 'bg-purple-50 text-purple-700',
    to: '/courses',
  },
  {
    label: 'Universities',
    desc: 'Search 3800+ universities',
    icon: Building2,
    color: 'bg-amber-50 text-amber-700',
    to: '/universities',
  },
  {
    label: 'Scholarships',
    desc: 'Find funding opportunities',
    icon: Award,
    color: 'bg-teal-50 text-teal-700',
    to: '/scholarships',
  },
  {
    label: 'Country Comparison',
    desc: 'Compare side by side',
    icon: BarChart3,
    color: 'bg-gray-100 text-gray-700',
    to: '/compare',
  },
]

export default function Navbar() {
  const [exploreOpen, setExploreOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const dropRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handler = (event) => {
      if (dropRef.current && !dropRef.current.contains(event.target)) {
        setExploreOpen(false)
      }
    }

    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const navLinkClass = ({ isActive }) =>
    `whitespace-nowrap text-sm font-medium transition-colors ${
      isActive
        ? 'text-green-900'
        : 'text-gray-600 hover:text-gray-900'
    }`

  return (
    <nav
      className={`sticky top-0 z-50 border-b border-gray-200 bg-white transition-shadow duration-200 ${
        scrolled ? 'shadow-sm' : ''
      }`}
    >
      <div className="mx-auto grid h-16 w-full max-w-7xl grid-cols-[auto_1fr_auto] items-center px-4 sm:px-6 lg:px-8">
        {/* LEFT: BRAND */}
        <Link to="/" className="flex-shrink-0 justify-self-start">
          <span className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
            Agency
          </span>
        </Link>

        {/* CENTER: NAVIGATION */}
        <div className="flex min-w-0 items-center justify-center gap-4 sm:gap-5 lg:gap-8">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `whitespace-nowrap border-b-2 pb-1 text-sm font-medium transition-colors ${
                isActive
                  ? 'border-green-800 text-green-900'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`
            }
          >
            Home
          </NavLink>

          {/* EXPLORE DROPDOWN */}
          <div className="relative" ref={dropRef}>
            <button
              type="button"
              onClick={() => setExploreOpen((value) => !value)}
              aria-expanded={exploreOpen}
              className="flex items-center gap-1 whitespace-nowrap text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
            >
              Explore
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${
                  exploreOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {exploreOpen && (
              <div className="absolute left-1/2 top-full z-50 mt-4 w-[min(460px,90vw)] -translate-x-1/2 rounded-2xl border border-gray-100 bg-white p-4 shadow-xl">
                <div className="grid grid-cols-2 gap-1">
                  {EXPLORE_ITEMS.map((item) => {
                    const Icon = item.icon

                    return (
                      <Link
                        key={item.label}
                        to={item.to}
                        onClick={() => setExploreOpen(false)}
                        className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-gray-50"
                      >
                        <div
                          className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${item.color}`}
                        >
                          <Icon size={15} />
                        </div>

                        <div>
                          <div className="text-sm font-semibold text-gray-900 transition-colors group-hover:text-green-700">
                            {item.label}
                          </div>

                          <div className="mt-0.5 text-xs text-gray-400">
                            {item.desc}
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          <NavLink to="/agencies" className={navLinkClass}>
            Agencies
          </NavLink>

          <NavLink to="/stories" className={navLinkClass}>
            Stories
          </NavLink>

          <NavLink
            to="/report"
            className={({ isActive }) =>
              `whitespace-nowrap text-sm font-medium transition-colors ${
                isActive
                  ? 'text-red-700'
                  : 'text-red-500 hover:text-red-600'
              }`
            }
          >
            Report Scam
          </NavLink>
        </div>

        {/* RIGHT: AUTHENTICATION */}
        <div className="flex flex-shrink-0 items-center justify-self-end gap-3 sm:gap-5">
          <Link
            to="/login"
            className="whitespace-nowrap text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="whitespace-nowrap rounded-lg bg-[#0B603A] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#084B2D] sm:px-5"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  )
}
