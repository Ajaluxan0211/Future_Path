import { useState, useRef, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ChevronDown, Globe, BookOpen, GraduationCap, Building2, Award, BarChart3 } from 'lucide-react'

const EXPLORE_ITEMS = [
  { label: 'Countries',          desc: 'Explore 40+ destinations',  icon: Globe,         color: 'bg-green-50 text-green-700',   to: '/countries'    },
  { label: 'Visas',              desc: 'Requirements and fees',      icon: BookOpen,      color: 'bg-blue-50 text-blue-700',     to: '/visas'        },
  { label: 'Courses',            desc: 'Degrees and programs',       icon: GraduationCap, color: 'bg-purple-50 text-purple-700', to: '/courses'      },
  { label: 'Universities',       desc: 'Search 3800+ universities',  icon: Building2,     color: 'bg-amber-50 text-amber-700',   to: '/universities' },
  { label: 'Scholarships',       desc: 'Find funding opportunities', icon: Award,         color: 'bg-teal-50 text-teal-700',     to: '/scholarships' },
  { label: 'Country Comparison', desc: 'Compare side by side',       icon: BarChart3,     color: 'bg-gray-100 text-gray-700',    to: '/compare'      },
]

export default function Navbar() {
  const [exploreOpen, setExploreOpen] = useState(false)
  const [scrolled,    setScrolled]    = useState(false)
  const dropRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setExploreOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <nav className={`sticky top-0 z-50 bg-white border-b border-gray-200 transition-shadow duration-200 ${scrolled ? 'shadow-sm' : ''}`}>
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center gap-8">

        <Link to="/" className="flex-shrink-0">
          <span className="text-xl font-bold text-gray-900">Agency</span>
        </Link>

        <div className="flex items-center gap-7 flex-1">

          <NavLink to="/" end
            className={({ isActive }) =>
              `text-sm font-medium transition-colors pb-0.5 ${isActive ? 'text-green-900 border-b-2 border-green-800' : 'text-gray-600 hover:text-gray-900'}`
            }>
            Home
          </NavLink>

          <div className="relative" ref={dropRef}>
            <button
              onClick={() => setExploreOpen(v => !v)}
              className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Explore
              <ChevronDown size={14} className={`transition-transform duration-200 ${exploreOpen ? 'rotate-180' : ''}`} />
            </button>

            {exploreOpen && (
              <div className="absolute top-full left-0 mt-3 w-[460px] bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-50">
                <div className="grid grid-cols-2 gap-1">
                  {EXPLORE_ITEMS.map(item => {
                    const Icon = item.icon
                    return (
                      <Link key={item.label} to={item.to}
                        onClick={() => setExploreOpen(false)}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${item.color}`}>
                          <Icon size={15} />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900 group-hover:text-green-700 transition-colors">
                            {item.label}
                          </div>
                          <div className="text-xs text-gray-400 mt-0.5">{item.desc}</div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          <NavLink to="/agencies"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${isActive ? 'text-green-900' : 'text-gray-600 hover:text-gray-900'}`
            }>
            Agencies
          </NavLink>

          <NavLink to="/stories"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${isActive ? 'text-green-900' : 'text-gray-600 hover:text-gray-900'}`
            }>
            Stories
          </NavLink>

          <NavLink to="/report"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${isActive ? 'text-red-700' : 'text-red-500 hover:text-red-600'}`
            }>
            Report Scam
          </NavLink>
        </div>

        <div className="flex items-center gap-4 flex-shrink-0">
          <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
            Login
          </Link>
          <Link to="/signup"
            className="text-sm font-semibold text-white px-5 py-2 rounded-lg transition-colors hover:opacity-90"
            style={{ backgroundColor: '#0D5C3A' }}>
            Sign Up
          </Link>
        </div>

      </div>
    </nav>
  )
}