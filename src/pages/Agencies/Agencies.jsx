import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, MapPin, SlidersHorizontal, Shield, ArrowRight } from 'lucide-react'

/* ══════════════════════════════════════
   DATA
══════════════════════════════════════ */
const AGENCIES = [
  {
    id: 1,
    name: 'Overseas Education Lanka',
    location: 'Colombo, Sri Lanka',
    trust: 92,
    tags: ['Premium', 'Education Specialists'],
    tagStyles: [
      { bg: '#EBF7F1', color: '#0D5C3A', border: '#A8DFC4' },
      { bg: '#F3F4F6', color: '#374151', border: '#E5E7EB' },
    ],
    scores: [
      { label: 'Verification',  value: 98 },
      { label: 'Success Rate',  value: 94 },
      { label: 'Reviews',       value: 89 },
      { label: 'Transparency',  value: 90 },
    ],
    desc: 'Specializing in Australian and UK Student Visa pathways since 2012.',
    initials: 'OE',
    avatarBg: '#EBF7F1',
    avatarColor: '#0D5C3A',
    featured: true,
  },
  {
    id: 2,
    name: 'Visa Global Consultants',
    location: 'Dubai, UAE',
    trust: 87,
    tags: ['Immigration', 'Business Visas'],
    tagStyles: [
      { bg: '#F3F4F6', color: '#374151', border: '#E5E7EB' },
      { bg: '#F3F4F6', color: '#374151', border: '#E5E7EB' },
    ],
    scores: [
      { label: 'Verification',  value: 92 },
      { label: 'Success Rate',  value: 88 },
      { label: 'Reviews',       value: 81 },
      { label: 'Transparency',  value: 85 },
    ],
    desc: 'Global reach with offices in 5 countries. Experts in Skilled Migration.',
    initials: 'VG',
    avatarBg: '#EEF2FF',
    avatarColor: '#3730A3',
    featured: false,
  },
  {
    id: 3,
    name: 'PathWay Education Group',
    location: 'Sydney, Australia',
    trust: 85,
    tags: ['Student Visas', 'PR Pathway'],
    tagStyles: [
      { bg: '#EEF2FF', color: '#3730A3', border: '#C7D2FE' },
      { bg: '#FEF9EE', color: '#C2410C', border: '#FDE68A' },
    ],
    scores: [
      { label: 'Verification',  value: 90 },
      { label: 'Success Rate',  value: 85 },
      { label: 'Reviews',       value: 88 },
      { label: 'Transparency',  value: 82 },
    ],
    desc: 'Registered migration agents with MARA. Specialising in Australia PR pathways.',
    initials: 'PW',
    avatarBg: '#FFF7ED',
    avatarColor: '#C2410C',
    featured: false,
  },
]

const TRUST_STEPS = [
  { n: 1, title: 'Identity Verification',   desc: 'Legal entity registration, office address verification, and government licensing checks.' },
  { n: 2, title: 'Authentic Reviews',        desc: 'Verified testimonials from users who have completed the full visa process through the agency.' },
  { n: 3, title: 'Case Success Records',     desc: 'Historical success rates cross-referenced with local immigration authority statistics.' },
  { n: 4, title: 'Fee Transparency',         desc: 'Clear breakdown of professional fees versus government costs without hidden charges.' },
]

const REGIONS   = ['All Regions', 'Sri Lanka', 'Australia', 'UAE', 'UK', 'Canada', 'India']
const VISA_TYPES = ['All Visa Types', 'Student Visas', 'Work Visas', 'Business Visas', 'PR Pathway', 'Visit Visas']

/* ══════════════════════════════════════
   SCORE BAR
══════════════════════════════════════ */
function ScoreBar({ label, value }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-gray-500">{label}</span>
        <span className="text-xs font-semibold text-gray-700">{value}%</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${value}%`, backgroundColor: '#0D5C3A' }}
        />
      </div>
    </div>
  )
}

/* ══════════════════════════════════════
   COMPONENT
══════════════════════════════════════ */
export default function Agencies() {
  const navigate = useNavigate()
  const [search,   setSearch]   = useState('')
  const [region,   setRegion]   = useState('All Regions')
  const [visaType, setVisaType] = useState('Student Visas')

  const filtered = AGENCIES.filter(a =>
    search === '' || a.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ backgroundColor: '#F0F7F4' }} className="min-h-screen pb-16">
      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* ── Title ── */}
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Find a verified agency
        </h1>

        {/* ── Filter card ── */}
        <div className="bg-white rounded-2xl border border-gray-200 px-7 py-6 mb-8 shadow-sm">
          <div className="flex items-end gap-5 flex-wrap">

            {/* Search */}
            <div className="flex-1 min-w-[180px]">
              <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                Search by Name
              </div>
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Agency name..."
                  className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-white outline-none focus:border-green-700 transition-colors"
                />
              </div>
            </div>

            {/* Region */}
            <div className="flex-1 min-w-[160px]">
              <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                Service Region
              </div>
              <div className="relative">
                <select
                  value={region}
                  onChange={e => setRegion(e.target.value)}
                  className="w-full appearance-none text-sm border border-gray-200 rounded-lg bg-white pl-3 pr-8 py-2.5 outline-none cursor-pointer"
                >
                  {REGIONS.map(r => <option key={r}>{r}</option>)}
                </select>
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">▾</span>
              </div>
            </div>

            {/* Visa type */}
            <div className="flex-1 min-w-[160px]">
              <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                Visa Type
              </div>
              <div className="relative">
                <select
                  value={visaType}
                  onChange={e => setVisaType(e.target.value)}
                  className="w-full appearance-none text-sm border border-gray-200 rounded-lg bg-white pl-3 pr-8 py-2.5 outline-none cursor-pointer"
                >
                  {VISA_TYPES.map(v => <option key={v}>{v}</option>)}
                </select>
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">▾</span>
              </div>
            </div>

            {/* Apply filters btn */}
            <button
              className="flex items-center gap-2 text-white font-bold text-sm px-7 py-2.5 rounded-lg hover:opacity-90 transition-opacity flex-shrink-0"
              style={{ backgroundColor: '#0D5C3A' }}
            >
              <SlidersHorizontal size={15} /> Apply Filters
            </button>
          </div>
        </div>

        {/* ── Two column layout ── */}
        <div className="flex gap-6 items-start">

          {/* LEFT: agency cards */}
          <div className="flex-1 flex flex-col gap-5">
            {filtered.map(a => (
              <div
                key={a.id}
                className="bg-white rounded-2xl overflow-hidden transition-shadow duration-200 hover:shadow-md"
                style={{ border: a.featured ? '2px solid #0D5C3A' : '1px solid #E5E7EB' }}
              >
                <div className="p-6">
                  <div className="flex gap-5">

                    {/* Left: avatar + trust score */}
                    <div className="flex flex-col items-center gap-2 flex-shrink-0 w-20">
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold border border-gray-100"
                        style={{ backgroundColor: a.avatarBg, color: a.avatarColor }}
                      >
                        {a.initials}
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold leading-none" style={{ color: '#0D5C3A' }}>
                          {a.trust}
                        </div>
                        <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide mt-0.5">
                          Trust Score
                        </div>
                      </div>
                    </div>

                    {/* Right: content */}
                    <div className="flex-1 min-w-0">

                      {/* Header row */}
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 leading-tight">{a.name}</h3>
                          <div className="flex items-center gap-1 mt-0.5">
                            <MapPin size={12} className="text-gray-400" />
                            <span className="text-xs text-gray-400">{a.location}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {a.tags.map((tag, i) => (
                            <span key={tag}
                              className="text-xs font-semibold px-2.5 py-1 rounded-full border"
                              style={{
                                backgroundColor: a.tagStyles[i].bg,
                                color:           a.tagStyles[i].color,
                                borderColor:     a.tagStyles[i].border,
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Score bars 2x2 */}
                      <div className="grid grid-cols-2 gap-x-8 gap-y-2.5 mt-4 mb-4">
                        {a.scores.map(s => (
                          <ScoreBar key={s.label} label={s.label} value={s.value} />
                        ))}
                      </div>

                      {/* Description + buttons */}
                      <div className="flex items-end justify-between gap-4 mt-3">
                        <p className="text-xs text-gray-400 leading-relaxed flex-1">{a.desc}</p>
                        <div className="flex gap-2 flex-shrink-0">
                          <button
                            onClick={() => navigate(`/agencies/${a.id}`)}
                            className="text-sm font-bold px-5 py-2.5 rounded-xl border-2 border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            View Profile
                          </button>
                          <button
                            onClick={() => navigate(`/agencies/${a.id}/contact`)}
                            className="text-sm font-bold px-5 py-2.5 rounded-xl text-white hover:opacity-90 transition-opacity"
                            style={{ backgroundColor: '#0D5C3A' }}
                          >
                            Contact Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center">
                <div className="text-4xl mb-3">🔍</div>
                <div className="text-gray-900 font-semibold mb-1">No agencies found</div>
                <div className="text-sm text-gray-400">Try adjusting your search</div>
              </div>
            )}
          </div>

          {/* RIGHT sidebar */}
          <div className="w-72 flex-shrink-0 flex flex-col gap-4">

            {/* How trust scores work */}
            <div className="rounded-2xl p-6" style={{ backgroundColor: '#0D5C3A' }}>
              <div className="flex items-center gap-3 mb-3">
                <Shield size={20} color="#fff" />
                <span className="text-white font-bold text-base leading-snug">
                  How trust scores are calculated
                </span>
              </div>
              <p className="text-xs leading-relaxed mb-5" style={{ color: '#A8DFC4' }}>
                Our proprietary algorithm analyzes hundreds of data points to ensure you work with only the most reliable partners.
              </p>

              <div className="flex flex-col gap-4">
                {TRUST_STEPS.map(s => (
                  <div key={s.n} className="flex gap-3">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#fff' }}
                    >
                      {s.n}
                    </div>
                    <div>
                      <div className="text-white font-bold text-sm mb-0.5">{s.title}</div>
                      <div className="text-xs leading-relaxed" style={{ color: '#A8DFC4' }}>
                        {s.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                className="w-full mt-6 py-3 rounded-xl font-bold text-sm transition-colors hover:bg-green-100"
                style={{ backgroundColor: '#A8DFC4', color: '#0D5C3A' }}
              >
                Learn more about Integrity
              </button>
            </div>

            {/* Need help choosing */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#EBF7F1' }}>
                  <Shield size={14} style={{ color: '#0D5C3A' }} />
                </div>
                <span className="text-sm font-bold text-gray-900">Need help choosing?</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed mb-3">
                Our expert advisors can match you with the right agency based on your specific profile and destination.
              </p>
              <button
                className="flex items-center gap-1 text-sm font-bold hover:opacity-80 transition-opacity"
                style={{ color: '#0D5C3A' }}
              >
                Speak with a consultant <ArrowRight size={13} />
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}