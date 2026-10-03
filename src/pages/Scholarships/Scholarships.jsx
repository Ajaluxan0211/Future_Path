import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search, Clock, ArrowRight, Trophy,
  GraduationCap, Coins, Star, Globe2,
  Sparkles, Bell
} from 'lucide-react'

/* ══════════════════════════════════════
   DATA
══════════════════════════════════════ */
const SCHOLARSHIPS = [
  {
    id: 1,
    title: 'Rhodes Trust Global Leadership Scholarship',
    university: 'University of Oxford', type: 'Full Funding',
    tags: ['FULL TUITION', 'GLOBAL STUDENTS'],
    deadline: 'Deadline: Nov 15',
    value: '$120,000', valueLabel: null,
    posted: 'Posted 2 days ago',
    icon: Trophy, iconBg: '#EBF7F1', iconColor: '#0D5C3A',
    topMatch: true,
  },
  {
    id: 2,
    title: 'Fulbright Graduate Student Award',
    university: 'U.S. Department of State', type: 'Graduate',
    tags: ['STIPEND INCL.', 'POSTGRAD'],
    deadline: 'Deadline: Oct 12',
    value: 'Full Ride', valueLabel: null,
    posted: 'Posted 1 week ago',
    icon: GraduationCap, iconBg: '#EEF2FF', iconColor: '#2563EB',
    topMatch: false,
  },
  {
    id: 3,
    title: 'Gates Cambridge Scholarship',
    university: 'University of Cambridge', type: 'PhD/Masters',
    tags: ['ALLOWANCE', 'STEM FOCUS'],
    deadline: 'Deadline: Jan 05',
    value: '$85,000', valueLabel: null,
    posted: 'Posted 3 days ago',
    icon: Coins, iconBg: '#FFF7ED', iconColor: '#C2410C',
    topMatch: false,
  },
  {
    id: 4,
    title: 'Vanier Canada Graduate Scholarship',
    university: 'Government of Canada', type: 'PhD',
    tags: ['HEALTH', 'RENEWABLE'],
    deadline: 'Deadline: Nov 01',
    value: '$50,000/yr', valueLabel: null,
    posted: 'Posted 1 day ago',
    icon: Star, iconBg: '#F5F3FF', iconColor: '#7C3AED',
    topMatch: false,
  },
  {
    id: 5,
    title: 'Erasmus Mundus Joint Masters',
    university: 'European Commission', type: 'Multi-Country',
    tags: ['TRAVEL INCL.', 'EU-BASED'],
    deadline: 'Deadline: Feb 14',
    value: 'Full Funding', valueLabel: null,
    posted: 'Posted 5 days ago',
    icon: Globe2, iconBg: '#ECFDF5', iconColor: '#047857',
    topMatch: false,
  },
]

const BY_COUNTRY = [
  { flag: '🇺🇸', country: 'United States', count: 84 },
  { flag: '🇬🇧', country: 'United Kingdom', count: 42 },
  { flag: '🇨🇦', country: 'Canada',        count: 31 },
  { flag: '🇦🇺', country: 'Australia',      count: 25 },
]

const COUNTRIES = ['Country', 'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'New Zealand']
const LEVELS     = ['Degree Level', "Bachelor's", "Master's", 'PhD', 'Diploma']
const FUNDING    = ['Funding Type', 'Full funding', 'Partial funding', 'Living allowance only']

/* ══════════════════════════════════════
   COMPONENT
══════════════════════════════════════ */
export default function Scholarships() {
  const navigate = useNavigate()
  const [search,   setSearch]   = useState('')
  const [country,  setCountry]  = useState('Country')
  const [level,    setLevel]    = useState('Degree Level')
  const [funding,  setFunding]  = useState('Funding Type')
  const [visible,  setVisible]  = useState(5)

  const filtered = SCHOLARSHIPS.filter(s =>
    search === '' ||
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.university.toLowerCase().includes(search.toLowerCase())
  )

  const shown = filtered.slice(0, visible)
  const remaining = 177 - visible // matches "172 left" style counter from screenshot baseline

  return (
    <div style={{ backgroundColor: '#F0F7F4' }} className="min-h-screen">

      {/* ── HERO HEADER ── */}
      <div className="bg-white border-b border-gray-200 px-8 pt-12 pb-8 text-center">
        <h1 className="text-4xl font-bold mb-2" style={{ color: '#0D5C3A' }}>
          Find Scholarships
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          Discover 180+ scholarships worth over $50M in funding
        </p>

        {/* Filter bar */}
        <div className="max-w-5xl mx-auto flex items-center gap-3 flex-wrap justify-center">
          <div className="relative flex-1 min-w-[280px]">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search scholarships, keywords, or universities..."
              className="w-full pl-10 pr-3 py-3 text-sm border border-gray-200 rounded-lg bg-white outline-none focus:border-green-700 transition-colors text-left"
            />
          </div>

          <div className="relative">
            <select value={country} onChange={e => setCountry(e.target.value)}
              className="appearance-none text-sm border border-gray-200 rounded-lg bg-white pl-3 pr-8 py-3 outline-none cursor-pointer min-w-[140px] text-left">
              {COUNTRIES.map(c => <option key={c}>{c}</option>)}
            </select>
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">▾</span>
          </div>

          <div className="relative">
            <select value={level} onChange={e => setLevel(e.target.value)}
              className="appearance-none text-sm border border-gray-200 rounded-lg bg-white pl-3 pr-8 py-3 outline-none cursor-pointer min-w-[140px] text-left">
              {LEVELS.map(l => <option key={l}>{l}</option>)}
            </select>
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">▾</span>
          </div>

          <div className="relative">
            <select value={funding} onChange={e => setFunding(e.target.value)}
              className="appearance-none text-sm border border-gray-200 rounded-lg bg-white pl-3 pr-8 py-3 outline-none cursor-pointer min-w-[150px] text-left">
              {FUNDING.map(f => <option key={f}>{f}</option>)}
            </select>
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">▾</span>
          </div>

          <button
            className="flex items-center justify-center w-12 h-12 rounded-lg text-white flex-shrink-0 hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#0D5C3A' }}
          >
            <Search size={18} />
          </button>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-7xl mx-auto px-8 py-7 flex gap-6">

        {/* LEFT: scholarship list */}
        <div className="flex-1 min-w-0 flex flex-col gap-4">
          {shown.map((s) => {
            const Icon = s.icon
            return (
              <div key={s.id}
                className="bg-white rounded-2xl overflow-hidden relative transition-all duration-200 hover:shadow-md"
                style={{ border: s.topMatch ? '2px solid #0D5C3A' : '1px solid #E5E7EB' }}
              >
                {/* TOP MATCH badge */}
                {s.topMatch && (
                  <div className="absolute top-0 right-0">
                    <span className="inline-block text-xs font-bold px-4 py-1.5 text-white rounded-bl-xl"
                      style={{ backgroundColor: '#0D5C3A' }}>
                      TOP MATCH
                    </span>
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: s.iconBg }}
                    >
                      <Icon size={22} style={{ color: s.iconColor }} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-1">
                        <h3 className="text-base font-bold text-gray-900 leading-snug">
                          {s.title}
                        </h3>
                        <div className="text-lg font-bold flex-shrink-0" style={{ color: '#0D5C3A' }}>
                          {s.value}
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mb-3">
                        {s.university} • {s.type}
                      </p>

                      {/* Tags */}
                      <div className="flex items-center gap-2 flex-wrap mb-4">
                        {s.tags.map(tag => (
                          <span key={tag}
                            className="text-xs font-bold px-2.5 py-1 rounded-md"
                            style={{ backgroundColor: '#ECFDF5', color: '#047857' }}>
                            {tag}
                          </span>
                        ))}
                        <span className="text-xs font-bold px-2.5 py-1 rounded-md"
                          style={{ backgroundColor: '#FEF3E2', color: '#C2680C' }}>
                          {s.deadline}
                        </span>
                      </div>

                      {/* Footer row */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <span className="flex items-center gap-1.5 text-xs text-gray-400">
                          <Clock size={12} /> {s.posted}
                        </span>
                        <button
                          onClick={() => navigate(`/scholarships/${s.id}`)}
                          className="flex items-center gap-1 text-sm font-bold transition-colors hover:opacity-80"
                          style={{ color: '#0D5C3A' }}
                        >
                          View details <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

          {/* Load more */}
          {visible < SCHOLARSHIPS.length + 172 && (
            <button
              onClick={() => setVisible(v => v + 5)}
              className="border-2 border-dashed border-gray-300 rounded-2xl py-4 text-center text-sm font-semibold text-gray-500 hover:border-gray-400 hover:text-gray-700 transition-colors bg-transparent"
            >
              Load more scholarships ({Math.max(172 - (visible - 5), 0)} left)
            </button>
          )}
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="w-72 flex-shrink-0 flex flex-col gap-4">

          {/* Funding overview */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <div className="text-sm font-bold text-gray-900 mb-4">Funding overview</div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl p-3" style={{ backgroundColor: '#F0F7F4' }}>
                <div className="text-xs text-gray-400 mb-1">TOTAL VALUE</div>
                <div className="text-lg font-bold" style={{ color: '#0D5C3A' }}>$52.4M</div>
              </div>
              <div className="rounded-xl p-3" style={{ backgroundColor: '#F0F7F4' }}>
                <div className="text-xs text-gray-400 mb-1">AVERAGE AWARD</div>
                <div className="text-lg font-bold" style={{ color: '#0D5C3A' }}>$28.5k</div>
              </div>
              <div className="rounded-xl p-3" style={{ backgroundColor: '#F0F7F4' }}>
                <div className="text-xs text-gray-400 mb-1">SUCCESS RATE</div>
                <div className="text-lg font-bold text-gray-900">12%</div>
              </div>
              <div className="rounded-xl p-3" style={{ backgroundColor: '#F0F7F4' }}>
                <div className="text-xs text-gray-400 mb-1">NEW THIS WEEK</div>
                <div className="text-lg font-bold text-gray-900">24</div>
              </div>
            </div>
          </div>

          {/* By country */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <div className="text-sm font-bold text-gray-900 mb-3">By country</div>
            {BY_COUNTRY.map(c => (
              <button key={c.country}
                onClick={() => setCountry(c.country)}
                className="flex items-center justify-between w-full py-2.5 border-b border-gray-50 last:border-0 group hover:bg-gray-50 rounded-lg px-1 transition-colors"
              >
                <span className="text-sm text-gray-700 flex items-center gap-2">
                  <span>{c.flag}</span> {c.country}
                </span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">
                  {c.count}
                </span>
              </button>
            ))}
          </div>

          {/* AI Smart Match */}
          <div className="rounded-2xl p-5 relative overflow-hidden" style={{ backgroundColor: '#0D5C3A' }}>
            <Sparkles size={20} color="#fff" className="mb-2" />
            <div className="text-white font-bold text-base mb-2">AI Smart Match</div>
            <div className="text-xs mb-4 leading-relaxed" style={{ color: '#A8DFC4' }}>
              Let our AI analyze your profile to find scholarships you have the highest chance of winning.
            </div>
            <button
              onClick={() => navigate('/eligibility')}
              className="w-full bg-white font-bold text-sm py-3 rounded-lg hover:bg-gray-50 transition-colors"
              style={{ color: '#0D5C3A' }}
            >
              Get matched now
            </button>
          </div>

          {/* Upcoming deadlines */}
          <div className="rounded-2xl p-5" style={{ backgroundColor: '#FEF3E2', border: '1px solid #FCE3B8' }}>
            <div className="flex items-start gap-3">
              <Bell size={18} style={{ color: '#C2680C' }} className="flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-bold mb-1" style={{ color: '#9A4F0C' }}>
                  Upcoming Deadlines
                </div>
                <div className="text-xs text-gray-600 leading-relaxed mb-2">
                  12 scholarships in your wishlist are closing in the next 7 days.
                </div>
                <button className="text-xs font-bold underline" style={{ color: '#9A4F0C' }}>
                  View deadlines
                </button>
              </div>
            </div>
          </div>

        </div>
        
      </div>
     
    </div>
    
  )
}