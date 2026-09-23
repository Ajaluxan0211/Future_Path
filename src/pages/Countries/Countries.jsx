import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, ArrowRight, ChevronDown } from 'lucide-react'

const ALL_COUNTRIES = [
  {
    id: 'australia', name: 'Australia', code: 'AU', flag: '🇦🇺', region: 'Asia Pacific',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
    tuition: '$20,000 - $45,000 AUD/yr',
    approval: '92',
    tags: ['Work rights', 'Post-study visa'],
  },
  {
    id: 'canada', name: 'Canada', code: 'CA', flag: '🇨🇦', region: 'North America',
    image: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=600&q=80',
    tuition: '$15,000 - $35,000 CAD/yr',
    approval: '88',
    tags: ['Work rights', 'Post-study visa'],
  },
  {
    id: 'uk', name: 'United Kingdom', code: 'GB', flag: '🇬🇧', region: 'Europe',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80',
    tuition: '£12,000 - £30,000/yr',
    approval: '85',
    tags: ['Work rights', 'Post-study visa'],
  },
  {
    id: 'germany', name: 'Germany', code: 'DE', flag: '🇩🇪', region: 'Europe',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&q=80',
    tuition: '€0 - €15,000/yr',
    approval: '79',
    tags: ['Work rights', 'Post-study visa'],
  },
  {
    id: 'newzealand', name: 'New Zealand', code: 'NZ', flag: '🇳🇿', region: 'Asia Pacific',
    image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=600&q=80',
    tuition: '$22,000 - $40,000 NZD/yr',
    approval: '90',
    tags: ['Work rights', 'Post-study visa'],
  },
  {
    id: 'ireland', name: 'Ireland', code: 'IE', flag: '🇮🇪', region: 'Europe',
    image: 'https://images.unsplash.com/photo-1549918864-48ac978761a4?w=600&q=80',
    tuition: '€10,000 - €25,000/yr',
    approval: '86',
    tags: ['Work rights', 'Post-study visa'],
  },
  {
    id: 'netherlands', name: 'Netherlands', code: 'NL', flag: '🇳🇱', region: 'Europe',
    image: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=600&q=80',
    tuition: '€8,000 - €20,000/yr',
    approval: '84',
    tags: ['Work rights', 'Post-study visa'],
  },
  {
    id: 'singapore', name: 'Singapore', code: 'SG', flag: '🇸🇬', region: 'Asia Pacific',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=80',
    tuition: '$15,000 - $35,000 SGD/yr',
    approval: '94',
    tags: ['Work rights', 'Post-study visa'],
  },
  {
    id: 'japan', name: 'Japan', code: 'JP', flag: '🇯🇵', region: 'Asia Pacific',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80',
    tuition: '¥800,000 - ¥2,000,000/yr',
    approval: '82',
    tags: ['Work rights', 'Post-study visa'],
  },
  {
    id: 'france', name: 'France', code: 'FR', flag: '🇫🇷', region: 'Europe',
    image: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?w=600&q=80',
    tuition: '€2,770 - €10,000/yr',
    approval: '80',
    tags: ['Work rights', 'Post-study visa'],
  },
  {
    id: 'sweden', name: 'Sweden', code: 'SE', flag: '🇸🇪', region: 'Europe',
    image: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=600&q=80',
    tuition: 'SEK 80,000 - 150,000/yr',
    approval: '78',
    tags: ['Work rights', 'Post-study visa'],
  },
  {
    id: 'uae', name: 'UAE', code: 'AE', flag: '🇦🇪', region: 'Asia Pacific',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80',
    tuition: 'AED 40,000 - 80,000/yr',
    approval: '87',
    tags: ['Work rights', 'Post-study visa'],
  },
]

const REGIONS = [
  {
    label: 'Asia Pacific',
    count: '45+',
    bg: '#D1F0E4',
    border: '#A8DFC4',
    titleColor: '#0D5C3A',
    subColor: '#3A8F68',
  },
  {
    label: 'Europe',
    count: '32+',
    bg: '#DBE9FB',
    border: '#B3CFF5',
    titleColor: '#1A3F7A',
    subColor: '#3A6DB5',
  },
  {
    label: 'North America',
    count: '12+',
    bg: '#FEF3D7',
    border: '#F9DFA0',
    titleColor: '#7A4A0A',
    subColor: '#B5730F',
  },
]

export default function Countries() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [region, setRegion] = useState('All Regions')

  const filtered = ALL_COUNTRIES.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase())
    const matchRegion = region === 'All Regions' || c.region === region
    return matchSearch && matchRegion
  })

  return (
    <div style={{ backgroundColor: '#F0F7F4' }} className="min-h-screen pb-12">
      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* ── Header ── */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Explore destinations</h1>
            <p className="text-sm text-gray-500 mt-1">
              Find the perfect country for your education and career journey.
            </p>
          </div>

          {/* Search + Region */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search countries..."
                className="pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg bg-white outline-none w-48 focus:border-green-400"
              />
            </div>
            <div className="relative flex items-center">
              <select
                value={region}
                onChange={e => setRegion(e.target.value)}
                className="appearance-none text-sm border border-gray-200 rounded-lg bg-white pl-3 pr-8 py-2 outline-none cursor-pointer focus:border-green-400"
              >
                <option>All Regions</option>
                <option>Asia Pacific</option>
                <option>Europe</option>
                <option>North America</option>
              </select>
              <ChevronDown size={14} className="absolute right-2.5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* ── Region Cards ── */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {REGIONS.map(r => (
            <div
              key={r.label}
              onClick={() => setRegion(prev => prev === r.label ? 'All Regions' : r.label)}
              className="rounded-2xl p-5 cursor-pointer hover:opacity-90 transition-all duration-200"
              style={{
                backgroundColor: r.bg,
                border: `1px solid ${r.border}`,
              }}
            >
              <div className="font-bold text-lg mb-1" style={{ color: r.titleColor }}>
                {r.label}
              </div>
              <div className="text-sm mb-8" style={{ color: r.subColor }}>
                {r.count} Destinations
              </div>
              <div className="flex justify-end" style={{ color: r.subColor }}>
                <ArrowRight size={16} />
              </div>
            </div>
          ))}
        </div>

        {/* ── Country Cards Grid ── */}
        <div className="grid grid-cols-4 gap-4">
          {filtered.map(c => (
            <div
              key={c.id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-200 group"
            >
              {/* Photo */}
              <div className="h-40 overflow-hidden">
                <img
                  src={c.image}
                  alt={c.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Info */}
              <div className="p-3">

                {/* Code + Name row */}
                <div className="flex items-baseline gap-1.5 mb-1">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    {c.code}
                  </span>
                  <span className="text-base font-bold text-gray-900">{c.name}</span>
                </div>

                {/* Tuition */}
                <p className="text-xs text-gray-500 mb-2 leading-relaxed">
                  Tuition: {c.tuition}
                </p>

                {/* Tag pills */}
                <div className="flex flex-wrap gap-1 mb-1.5">
                  {c.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-xs border border-gray-200 text-gray-600 px-2 py-0.5 rounded-md bg-gray-50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Approval */}
                <div className="text-xs text-gray-500 mb-3">
                  {c.approval}%{' '}
                  <span className="text-gray-400">Approval</span>
                </div>

                {/* Explore link */}
                <button
                  onClick={() => navigate(`/visas?country=${c.name}`)}
                  className="flex items-center gap-1 text-sm font-semibold transition-colors hover:opacity-80"
                  style={{ color: '#0D5C3A' }}
                >
                  Explore <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-4 text-center py-16 text-gray-400 text-sm">
              No countries found matching "{search}"
            </div>
          )}
        </div>
      </div>
    </div>
  )
}