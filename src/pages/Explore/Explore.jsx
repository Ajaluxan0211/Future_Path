import { useNavigate } from 'react-router-dom'
import {
  Globe, BookOpen, GraduationCap, Building2, Award, BarChart3, ArrowRight
} from 'lucide-react'

const EXPLORE_SECTIONS = [
  {
    id: 'countries',
    icon: Globe,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    title: 'Countries',
    desc: 'Browse 40+ destinations and compare tuition, work rights, visa approval rates, and post-study opportunities.',
    tag: '40+ Destinations',
    tagColor: 'bg-emerald-100 text-emerald-700',
    to: '/countries',
    cta: 'Browse all countries',
  },
  {
    id: 'visas',
    icon: BookOpen,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    title: 'Visas',
    desc: 'Understand student, work, and visit visa requirements, fees, processing times and checklists for every country.',
    tag: '3 Visa Types',
    tagColor: 'bg-blue-100 text-blue-700',
    to: '/visas',
    cta: 'View visa information',
  },
  {
    id: 'courses',
    icon: GraduationCap,
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
    title: 'Courses',
    desc: 'Search thousands of degree programs across Cyber Security, Nursing, Engineering, Business, and more.',
    tag: '10,000+ Courses',
    tagColor: 'bg-purple-100 text-purple-700',
    to: '/courses',
    cta: 'Find your course',
  },
  {
    id: 'universities',
    icon: Building2,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    title: 'Universities',
    desc: 'Explore 3,800+ universities worldwide. Compare rankings, fees, IELTS requirements, and intake dates.',
    tag: '3,800+ Universities',
    tagColor: 'bg-amber-100 text-amber-700',
    to: '/universities',
    cta: 'Search universities',
  },
  {
    id: 'scholarships',
    icon: Award,
    iconBg: 'bg-teal-50',
    iconColor: 'text-teal-600',
    title: 'Scholarships',
    desc: 'Discover 180+ scholarships by country, degree level, and field of study. Find funding that fits your profile.',
    tag: '180+ Scholarships',
    tagColor: 'bg-teal-100 text-teal-700',
    to: '/scholarships',
    cta: 'Find scholarships',
  },
  {
    id: 'compare',
    icon: BarChart3,
    iconBg: 'bg-gray-100',
    iconColor: 'text-gray-600',
    title: 'Country Comparison',
    desc: 'Select up to 3 countries and compare tuition, visa fees, work rights, approval rates, and living costs side by side.',
    tag: 'Side-by-side',
    tagColor: 'bg-gray-100 text-gray-600',
    to: '/compare',
    cta: 'Compare countries',
  },
]

const QUICK_STATS = [
  { value: '40+',   label: 'Countries'         },
  { value: '3800+', label: 'Universities'       },
  { value: '180+',  label: 'Scholarships'       },
  { value: '120+',  label: 'Verified agencies'  },
]

export default function Explore() {
  const navigate = useNavigate()

  return (
    <div style={{ backgroundColor: '#F0F7F4' }} className="min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* ── Page header ── */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Explore</h1>
          <p className="text-sm text-gray-500">
            Everything you need to plan your journey abroad — in one place.
          </p>
        </div>

        {/* ── Quick stats bar ── */}
        <div className="grid grid-cols-4 gap-3 mb-10">
          {QUICK_STATS.map(s => (
            <div
              key={s.label}
              className="bg-white rounded-xl border border-gray-100 py-4 text-center"
            >
              <div className="text-xl font-bold mb-0.5" style={{ color: '#0D5C3A' }}>
                {s.value}
              </div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── Section cards 2-column grid ── */}
        <div className="grid grid-cols-2 gap-4">
          {EXPLORE_SECTIONS.map(sec => {
            const Icon = sec.icon
            return (
              <div
                key={sec.id}
                className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-all duration-200 group cursor-pointer"
                onClick={() => navigate(sec.to)}
              >
                {/* Icon + tag row */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${sec.iconBg}`}>
                    <Icon size={20} className={sec.iconColor} />
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${sec.tagColor}`}>
                    {sec.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-green-800 transition-colors">
                  {sec.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-500 leading-relaxed mb-5">
                  {sec.desc}
                </p>

                {/* CTA link */}
                <div
                  className="flex items-center gap-1 text-sm font-semibold transition-colors"
                  style={{ color: '#0D5C3A' }}
                >
                  {sec.cta}
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform duration-200"
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* ── Bottom CTA banner ── */}
        <div
          className="mt-8 rounded-2xl p-6 flex items-center justify-between"
          style={{ backgroundColor: '#0D5C3A' }}
        >
          <div>
            <div className="text-white font-bold text-base mb-1">
              Not sure where to start?
            </div>
            <div className="text-sm" style={{ color: '#A8D5BC' }}>
              Take our 5-step eligibility checker and get personalised recommendations.
            </div>
          </div>
          <button
            onClick={() => navigate('/eligibility')}
            className="bg-white text-sm font-bold px-5 py-2.5 rounded-lg hover:bg-gray-50 transition-colors flex-shrink-0 ml-6"
            style={{ color: '#0D5C3A' }}
          >
            Check eligibility →
          </button>
        </div>

      </div>
    </div>
  )
}