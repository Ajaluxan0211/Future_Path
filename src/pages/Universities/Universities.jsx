import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, ArrowRight, Sparkles, GitCompare, Plus } from 'lucide-react'

/* ══════════════════════════════════════
   DATA
══════════════════════════════════════ */
const UNIVERSITIES = [
  { id: 1,  code: 'UN', name: 'UNSW Sydney',              country: 'Australia',     flag: '🇦🇺', qs: 19,  tuition: '$32,000',  ielts: '6.5+', color: '#2563EB' },
  { id: 2,  code: 'UT', name: 'University of Toronto',    country: 'Canada',        flag: '🇨🇦', qs: 21,  tuition: '$45,000',  ielts: '6.5+', color: '#B91C1C' },
  { id: 3,  code: 'UM', name: 'University of Melbourne',  country: 'Australia',     flag: '🇦🇺', qs: 33,  tuition: '$34,500',  ielts: '6.5+', color: '#3730A3' },
  { id: 4,  code: 'UE', name: 'University of Edinburgh',  country: 'UK',            flag: '🇬🇧', qs: 22,  tuition: '£26,000',  ielts: '6.5+', color: '#C2680C' },
  { id: 5,  code: 'MO', name: 'Monash University',        country: 'Australia',     flag: '🇦🇺', qs: 42,  tuition: '$31,000',  ielts: '6.5+', color: '#1E3A8A' },
  { id: 6,  code: 'MC', name: 'McGill University',        country: 'Canada',        flag: '🇨🇦', qs: 46,  tuition: '$42,000',  ielts: '6.5+', color: '#BE123C' },
  { id: 7,  code: 'MA', name: 'University of Manchester', country: 'UK',            flag: '🇬🇧', qs: 28,  tuition: '£25,000',  ielts: '6.5+', color: '#7C3AED' },
  { id: 8,  code: 'TU', name: 'TU Munich',                country: 'Germany',       flag: '🇩🇪', qs: 37,  tuition: '€0',       ielts: '6.5+', color: '#15803D' },
  { id: 9,  code: 'UA', name: 'University of Auckland',   country: 'New Zealand',   flag: '🇳🇿', qs: 68,  tuition: '$38,000',  ielts: '6.5+', color: '#0E7490' },
  { id: 10, code: 'DC', name: 'Dublin City University',   country: 'Ireland',       flag: '🇮🇪', qs: 251, tuition: '€16,000',  ielts: '6.5+', color: '#1D4ED8' },
  { id: 11, code: 'LU', name: 'Leiden University',        country: 'Netherlands',   flag: '🇳🇱', qs: 128, tuition: '€18,000',  ielts: '6.5+', color: '#4338CA' },
  { id: 12, code: 'NU', name: 'NUS Singapore',             country: 'Singapore',     flag: '🇸🇬', qs: 8,   tuition: '$24,000',  ielts: '6.5+', color: '#C2410C' },
]

const TOP_PICKS = [
  { flag: '🇦🇺', country: 'Australia', count: 142 },
  { flag: '🇨🇦', country: 'Canada',    count: 98  },
  { flag: '🇬🇧', country: 'UK',         count: 115 },
  { flag: '🇺🇸', country: 'USA',        count: 210 },
]

const POPULAR_FIELDS = [
  { label: 'Cyber Security', bg: '#EBF7F1', text: '#0D5C3A' },
  { label: 'Nursing',        bg: '#ECFDF5', text: '#047857' },
  { label: 'Data Science',   bg: '#FFF7ED', text: '#C2410C' },
  { label: 'MBA',            bg: '#F3F4F6', text: '#374151' },
  { label: 'Psychology',     bg: '#FEF2F2', text: '#B91C1C' },
]

const COUNTRIES = ['Country', 'Australia', 'Canada', 'United Kingdom', 'Germany', 'New Zealand', 'Ireland', 'Netherlands', 'Singapore']
const FIELDS     = ['Field of Study', 'Cyber Security', 'Computer Science', 'Business Management', 'Nursing', 'Engineering', 'Data Science']
const RANKINGS    = ['Ranking', 'Top 50', 'Top 100', 'Top 200', 'Top 500']

/* ══════════════════════════════════════
   COMPONENT
══════════════════════════════════════ */
export default function Universities() {
  const navigate = useNavigate()
  const [search,    setSearch]    = useState('')
  const [country,   setCountry]   = useState('Country')
  const [field,     setField]     = useState('Field of Study')
  const [ranking,   setRanking]   = useState('Ranking')
  const [visible,   setVisible]   = useState(12)

  const filtered = UNIVERSITIES.filter(u => {
    const matchSearch  = search === '' || u.name.toLowerCase().includes(search.toLowerCase()) || u.country.toLowerCase().includes(search.toLowerCase())
    const matchCountry = country === 'Country' || u.country === country
    return matchSearch && matchCountry
  })

  const shown = filtered.slice(0, visible)

  return (
    <div style={{ backgroundColor: '#F0F7F4' }} className="min-h-screen">

      {/* ── HEADER ── */}
      <div className="bg-white border-b border-gray-200 px-8 pt-7 pb-5">
        <h1 className="text-2xl font-bold mb-0.5" style={{ color: '#0D5C3A' }}>
          Explore Universities
        </h1>
        <p className="text-sm text-gray-400 mb-5">
          Search 3,800+ universities across 40+ countries
        </p>

        {/* Filter row */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[260px]">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="University name or city"
              className="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-white outline-none focus:border-green-700 transition-colors"
            />
          </div>

          <div className="relative">
            <select value={country} onChange={e => setCountry(e.target.value)}
              className="appearance-none text-sm border border-gray-200 rounded-lg bg-white pl-3 pr-8 py-2.5 outline-none cursor-pointer min-w-[140px]">
              {COUNTRIES.map(c => <option key={c}>{c}</option>)}
            </select>
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">▾</span>
          </div>

          <div className="relative">
            <select value={field} onChange={e => setField(e.target.value)}
              className="appearance-none text-sm border border-gray-200 rounded-lg bg-white pl-3 pr-8 py-2.5 outline-none cursor-pointer min-w-[150px]">
              {FIELDS.map(f => <option key={f}>{f}</option>)}
            </select>
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">▾</span>
          </div>

          <div className="relative">
            <select value={ranking} onChange={e => setRanking(e.target.value)}
              className="appearance-none text-sm border border-gray-200 rounded-lg bg-white pl-3 pr-8 py-2.5 outline-none cursor-pointer min-w-[120px]">
              {RANKINGS.map(r => <option key={r}>{r}</option>)}
            </select>
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">▾</span>
          </div>

          <button
            className="flex items-center justify-center w-10 h-10 rounded-lg text-white flex-shrink-0 hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#0D5C3A' }}
          >
            <Search size={16} />
          </button>
        </div>
      </div>

      {/* ── MAIN ── */}
      <div className="max-w-7xl mx-auto px-8 py-6 flex gap-6">

        {/* LEFT: grid */}
        <div className="flex-1 min-w-0">
          <div className="grid grid-cols-3 gap-5">
            {shown.map(u => (
              <div key={u.id}
                onClick={() => navigate(`/universities/${u.id}`)}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                style={{ borderColor: '#F3F4F6' }}
              >
                {/* Color banner */}
                <div
                  className="h-24 flex items-center justify-center"
                  style={{ backgroundColor: u.color }}
                >
                  <span className="text-white font-bold text-3xl tracking-wide opacity-90">
                    {u.code}
                  </span>
                </div>

                {/* Info */}
                <div className="p-4">
                  {/* Country + QS rank */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500 flex items-center gap-1.5">
                      <span>{u.flag}</span> {u.country}
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: '#EFF6FF', color: '#1D4ED8' }}>
                      QS #{u.qs}
                    </span>
                  </div>

                  {/* Name */}
                  <h3 className="text-sm font-bold text-gray-900 mb-2.5 leading-snug">
                    {u.name}
                  </h3>

                  {/* Tuition row */}
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-400">Tuition</span>
                    <span className="font-semibold text-gray-700">From {u.tuition}/yr</span>
                  </div>
                  {/* IELTS row */}
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="text-gray-400">IELTS</span>
                    <span className="font-semibold text-gray-700">{u.ielts} Overall</span>
                  </div>

                  {/* Pills */}
                  <div className="flex gap-1.5 mb-3">
                    <span className="text-xs font-bold px-2 py-1 rounded-md"
                      style={{ backgroundColor: '#ECFDF5', color: '#047857' }}>
                      WORK RIGHTS
                    </span>
                    <span className="text-xs font-bold px-2 py-1 rounded-md"
                      style={{ backgroundColor: '#FCE7F3', color: '#BE185D' }}>
                      POST-STUDY
                    </span>
                  </div>

                  {/* View details */}
                  <button
                    className="flex items-center gap-1 text-sm font-semibold transition-colors hover:opacity-80"
                    style={{ color: '#0D5C3A' }}
                  >
                    View details <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Load more */}
          {visible < filtered.length && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setVisible(v => v + 6)}
                className="flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors bg-white"
              >
                Load more universities
                <span className="text-gray-400">▾</span>
              </button>
            </div>
          )}
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="w-64 flex-shrink-0 flex flex-col gap-4">

          {/* Top picks by country */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <div className="text-sm font-bold text-gray-900 mb-3">Top picks by country</div>
            {TOP_PICKS.map(p => (
              <button key={p.country}
                onClick={() => setCountry(p.country)}
                className="flex items-center justify-between w-full py-2 group">
                <span className="text-sm text-gray-700 flex items-center gap-2">
                  <span>{p.flag}</span> {p.country}
                </span>
                <span className="text-sm font-semibold text-gray-400">{p.count}</span>
              </button>
            ))}
          </div>

          {/* Popular fields */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <div className="text-sm font-bold text-gray-900 mb-3">Popular fields</div>
            <div className="flex flex-wrap gap-2">
              {POPULAR_FIELDS.map(f => (
                <button key={f.label}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full transition-opacity hover:opacity-80"
                  style={{ backgroundColor: f.bg, color: f.text }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Eligibility CTA */}
          <div className="rounded-2xl p-5" style={{ backgroundColor: '#0D5C3A' }}>
            <Sparkles size={20} color="#fff" className="mb-2" />
            <div className="text-white font-bold text-sm mb-1.5 leading-snug">
              Find your best university match
            </div>
            <div className="text-xs mb-4 leading-relaxed" style={{ color: '#A8DFC4' }}>
              Our AI-powered eligibility checker analyzes your profile in seconds.
            </div>
            <button
              onClick={() => navigate('/eligibility')}
              className="w-full bg-white font-bold text-xs py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
              style={{ color: '#0D5C3A' }}
            >
              Check Eligibility
            </button>
          </div>

          {/* Compare tool */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-2">
              <GitCompare size={15} style={{ color: '#0D5C3A' }} />
              <span className="text-sm font-bold text-gray-900">Compare tool</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed mb-3">
              Add up to 4 universities to see side-by-side comparison.
            </p>
            <button
              onClick={() => navigate('/compare')}
              className="w-full border-2 border-dashed border-gray-200 rounded-xl py-5 flex flex-col items-center gap-1.5 text-gray-400 hover:border-gray-300 hover:text-gray-500 transition-colors"
            >
              <Plus size={18} />
              <span className="text-xs font-medium">Select university</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}