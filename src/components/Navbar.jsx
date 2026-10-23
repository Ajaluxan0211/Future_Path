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
  Menu,
  X,
} from 'lucide-react'

import futurePathLogo from '../assets/futurepath-logo.png'

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
    desc: 'Search universities',
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
    desc: 'Compare destinations',
    icon: BarChart3,
    color: 'bg-gray-100 text-gray-700',
    to: '/compare',
  },
]

export default function Navbar() {
  const [exploreOpen, setExploreOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const dropRef = useRef(null)

  const closeMenus = () => {
    setExploreOpen(false)
    setMobileOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8)

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropRef.current && !dropRef.current.contains(event.target)) {
        setExploreOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  const navLinkClass = ({ isActive }) =>
    `whitespace-nowrap text-[15px] font-medium transition-colors duration-200 ${
      isActive
        ? 'text-[#0B603A]'
        : 'text-slate-600 hover:text-[#0B603A]'
    }`

  return (
    <nav
      className={`sticky top-0 z-50 w-full border-b border-gray-200 bg-white transition-shadow duration-200 ${
        scrolled ? 'shadow-sm' : ''
      }`}
    >
      <div className="mx-auto grid h-[76px] w-full max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center px-6 sm:px-8 lg:px-10">

        {/* Left: FuturePath logo */}
        <Link
          to="/"
          onClick={closeMenus}
          className="flex w-fit shrink-0 items-center justify-self-start"
          aria-label="FuturePath home"
        >
          <img
            src={futurePathLogo}
            alt="FuturePath"
            className="block h-12 w-auto max-w-[230px] object-contain"
          />
        </Link>

        {/* Center: Main navigation */}
        <div className="hidden items-center justify-self-center gap-7 lg:flex xl:gap-9">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `border-b-2 pb-1 ${navLinkClass({ isActive })} ${
                isActive ? 'border-[#0B603A]' : 'border-transparent'
              }`
            }
          >
            Home
          </NavLink>

          {/* Explore dropdown */}
          <div className="relative" ref={dropRef}>
            <button
              type="button"
              onClick={() => setExploreOpen((open) => !open)}
              aria-expanded={exploreOpen}
              className="flex items-center gap-1 whitespace-nowrap text-[15px] font-medium text-slate-600 transition-colors hover:text-[#0B603A]"
            >
              Explore
              <ChevronDown
                size={15}
                className={`transition-transform duration-200 ${
                  exploreOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {exploreOpen && (
              <div className="absolute left-0 top-full z-50 mt-4 w-[460px] rounded-2xl border border-gray-100 bg-white p-4 shadow-xl">
                <div className="grid grid-cols-2 gap-1">
                  {EXPLORE_ITEMS.map((item) => {
                    const Icon = item.icon

                    return (
                      <Link
                        key={item.label}
                        to={item.to}
                        onClick={closeMenus}
                        className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-gray-50"
                      >
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${item.color}`}
                        >
                          <Icon size={17} />
                        </div>

                        <div>
                          <div className="text-sm font-semibold text-gray-900 transition-colors group-hover:text-[#0B603A]">
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
              `whitespace-nowrap text-[15px] font-medium transition-colors ${
                isActive
                  ? 'text-red-700'
                  : 'text-red-500 hover:text-red-600'
              }`
            }
          >
            Report Scam
          </NavLink>
        </div>

        {/* Right: Login and Sign Up */}
        <div className="hidden shrink-0 items-center justify-self-end gap-5 lg:flex">
          <Link
            to="/login"
            className="whitespace-nowrap text-[15px] font-medium text-slate-700 transition-colors hover:text-[#0B603A]"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="whitespace-nowrap rounded-lg bg-[#0B603A] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#084B2D]"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className="col-start-3 flex h-10 w-10 items-center justify-self-end rounded-lg text-slate-700 hover:bg-gray-100 lg:hidden"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>

      {/* Mobile navigation */}
      {mobileOpen && (
        <div className="border-t border-gray-100 bg-white px-5 py-4 shadow-lg lg:hidden">
          <div className="flex flex-col gap-1">
            <NavLink
              to="/"
              end
              onClick={closeMenus}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2.5 text-sm font-medium ${
                  isActive
                    ? 'bg-green-50 text-[#0B603A]'
                    : 'text-slate-600 hover:bg-gray-50'
                }`
              }
            >
              Home
            </NavLink>

            <button
              type="button"
              onClick={() => setExploreOpen((open) => !open)}
              className="flex items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-600 hover:bg-gray-50"
            >
              Explore
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  exploreOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {exploreOpen && (
              <div className="ml-3 flex flex-col border-l-2 border-green-100 pl-3">
                {EXPLORE_ITEMS.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={closeMenus}
                    className="rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-green-50 hover:text-[#0B603A]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}

            <NavLink
              to="/agencies"
              onClick={closeMenus}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2.5 text-sm font-medium ${
                  isActive
                    ? 'bg-green-50 text-[#0B603A]'
                    : 'text-slate-600 hover:bg-gray-50'
                }`
              }
            >
              Agencies
            </NavLink>

            <NavLink
              to="/stories"
              onClick={closeMenus}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2.5 text-sm font-medium ${
                  isActive
                    ? 'bg-green-50 text-[#0B603A]'
                    : 'text-slate-600 hover:bg-gray-50'
                }`
              }
            >
              Stories
            </NavLink>

            <NavLink
              to="/report"
              onClick={closeMenus}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50"
            >
              Report Scam
            </NavLink>

            <div className="mt-2 flex gap-3 border-t border-gray-100 pt-4">
              <Link
                to="/login"
                onClick={closeMenus}
                className="flex-1 rounded-lg border border-gray-200 px-4 py-2.5 text-center text-sm font-medium text-slate-700"
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={closeMenus}
                className="flex-1 rounded-lg bg-[#0B603A] px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-[#084B2D]"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
