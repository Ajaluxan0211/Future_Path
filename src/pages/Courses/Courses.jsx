import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../../components/Footer'
import {
  Search, Clock, Shield, Calendar,
  ArrowRight, X, TrendingUp,
  Calculator, Award, CheckSquare, Building
} from 'lucide-react'

/* ══════════════════════════════════════
   COURSE DATA
══════════════════════════════════════ */
const ALL_COURSES = [
  {
    id: 1,
    title: 'Master of Cyber Security',
    university: 'UNSW Sydney', country: 'Australia', field: 'Cyber Security', level: "Master's",
    duration: '2 Years Duration', ielts: 'IELTS 6.5+', intake: 'Feb / July Intakes',
    fee: '$32,000', feeUnit: '/ year', approval: '92% approval rate',
    bestMatch: true, icon: '🛡️', iconBg: '#E8F5EE',
    buttons: ['Entry Requirements', 'Scholarships'],
  },
  {
    id: 2,
    title: 'Master of IT (Cyber Security)',
    university: 'Deakin University', country: 'Australia', field: 'Cyber Security', level: "Master's",
    duration: '2 Years Duration', ielts: 'IELTS 6.0+', intake: 'PR Pathway',
    fee: '$28,500', feeUnit: '/ year', approval: '88% approval rate',
    bestMatch: false, icon: '🔐', iconBg: '#FFF7ED',
    buttons: ['Details'],
  },
  {
    id: 3,
    title: 'Postgraduate Diploma in Cybersecurity',
    university: 'Swinburne University', country: 'Australia', field: 'Cyber Security', level: 'Postgraduate',
    duration: '1.5 Years Duration', ielts: 'IELTS 6.0+', intake: 'Internship Included',
    fee: '$26,000', feeUnit: '/ total', approval: '85% approval rate',
    bestMatch: false, icon: '🎓', iconBg: '#1F2937', iconLight: true,
    buttons: [],
  },
  {
    id: 4,
    title: 'MSc in Applied Computing (CS)',
    university: 'University of Toronto', country: 'Canada', field: 'Computer Science', level: 'MSc',
    duration: '2 Years Duration', ielts: 'IELTS 7.0+', intake: 'Sep / Jan Intakes',
    fee: 'CAD 28,000', feeUnit: '/ year', approval: '83% approval rate',
    bestMatch: false, icon: '💻', iconBg: '#EEF2FF',
    buttons: [],
  },
  {
    id: 5,
    title: 'MSc Cyber Security',
    university: "King's College London", country: 'United Kingdom', field: 'Cyber Security', level: 'MSc',
    duration: '1 Year Duration', ielts: 'IELTS 7.0+', intake: 'Sep Intake',
    fee: '£21,000', feeUnit: '/ year', approval: '83% approval rate',
    bestMatch: false, icon: '🔴', iconBg: '#1F2937', iconLight: true,
    buttons: [],
  },
  {
    id: 6,
    title: 'Master in Informatics (Cyber)',
    university: 'TU Munich', country: 'Germany', field: 'Cyber Security', level: "Master's",
    duration: '2 Years Duration', ielts: 'German A2/B1', intake: 'Apr / Oct Intakes',
    fee: '€1,500', feeUnit: '/ sem.', approval: '79% approval rate',
    bestMatch: false, icon: '🔷', iconBg: '#E8F4FF',
    buttons: [],
  },
  {
    id: 7,
    title: 'PhD in Computer Science',
    university: 'University of Melbourne', country: 'Australia', field: 'Computer Science', level: 'PhD',
    duration: '3–4 Years', ielts: 'IELTS 6.5+', intake: 'Feb / Jul Intakes',
    fee: '$31,000', feeUnit: '/ year', approval: '87% approval rate',
    bestMatch: false, icon: '🔬', iconBg: '#F0FDF4',
    buttons: ['Entry Requirements'],
  },
  {
    id: 8,
    title: 'Bachelor of Nursing',
    university: 'University of Queensland', country: 'Australia', field: 'Nursing', level: "Bachelor's",
    duration: '3 Years Duration', ielts: 'IELTS 7.0+', intake: 'Feb Intake',
    fee: '$38,000', feeUnit: '/ year', approval: '90% approval rate',
    bestMatch: false, icon: '🏥', iconBg: '#FFF1F2',
    buttons: ['Entry Requirements', 'Scholarships'],
  },
  {
    id: 9,
    title: 'MSc Data Science & AI',
    university: 'University of Edinburgh', country: 'United Kingdom', field: 'Data Science', level: 'MSc',
    duration: '1 Year Duration', ielts: 'IELTS 6.5+', intake: 'Sep Intake',
    fee: '£24,000', feeUnit: '/ year', approval: '84% approval rate',
    bestMatch: false, icon: '📊', iconBg: '#F5F3FF',
    buttons: ['Details'],
  },
  {
    id: 10,
    title: 'Bachelor of Engineering (Honours)',
    university: 'Monash University', country: 'Australia', field: 'Engineering', level: "Bachelor's",
    duration: '4 Years Duration', ielts: 'IELTS 6.0+', intake: 'Feb / Jul Intakes',
    fee: '$34,000', feeUnit: '/ year', approval: '89% approval rate',
    bestMatch: false, icon: '⚙️', iconBg: '#FFFBEB',
    buttons: ['Entry Requirements'],
  },
  {
    id: 11,
    title: 'MBA Business Management',
    university: 'Schulich School of Business', country: 'Canada', field: 'Business Management', level: 'MBA',
    duration: '2 Years Duration', ielts: 'IELTS 6.5+', intake: 'Sep Intake',
    fee: 'CAD 42,000', feeUnit: '/ year', approval: '81% approval rate',
    bestMatch: false, icon: '📈', iconBg: '#F0FDF4',
    buttons: ['Details'],
  },
  {
    id: 12,
    title: 'Diploma of Information Technology',
    university: 'TAFE NSW', country: 'Australia', field: 'Computer Science', level: 'Diploma',
    duration: '1 Year Duration', ielts: 'IELTS 5.5+', intake: 'Feb / Jul / Nov',
    fee: '$12,000', feeUnit: '/ year', approval: '94% approval rate',
    bestMatch: false, icon: '💡', iconBg: '#FFFBEB',
    buttons: [],
  },
]

const COUNTRIES = ['All Countries', 'Australia', 'Canada', 'United Kingdom', 'Germany', 'New Zealand']
const LEVELS = ['All Levels', "Bachelor's", "Master's", 'MSc', 'PhD', 'MBA', 'Postgraduate', 'Diploma']
const FIELDS = ['All Fields', 'Cyber Security', 'Computer Science', 'Data Science', 'Business Management', 'Nursing', 'Engineering']

const CAREER_OUTCOMES = [
  { role: 'SECURITY ANALYST', salary: '$85,000' },
  { role: 'SOC ANALYST', salary: '$78,000' },
  { role: 'PEN TESTER', salary: '$95,000' },
  { role: 'SECURITY ENGINEER', salary: '$110,000' },
]

const QUICK_LINKS = [
  { label: 'Cost Calculator', icon: Calculator, to: '/calculator' },
  { label: 'Scholarship Finder', icon: Award, to: '/scholarships' },
  { label: 'Eligibility Checker', icon: CheckSquare, to: '/eligibility' },
  { label: 'Verified Agencies', icon: Building, to: '/agencies' },
]

/* ══════════════════════════════════════
   COMPONENT
══════════════════════════════════════ */
export default function Courses() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [country, setCountry] = useState('All Countries')
  const [level, setLevel] = useState('All Levels')
  const [field, setField] = useState('All Fields')
  const [sortBy, setSortBy] = useState('fee')
  const [hoveredId, setHoveredId] = useState(null)

  const activeFilters = [
    country !== 'All Countries' && { key: 'country', label: country },
    level !== 'All Levels' && { key: 'level', label: level },
    field !== 'All Fields' && { key: 'field', label: field },
  ].filter(Boolean)

  function removeFilter(key) {
    if (key === 'country') setCountry('All Countries')
    if (key === 'level') setLevel('All Levels')
    if (key === 'field') setField('All Fields')
  }

  // Helper function to navigate to application page with formatted payload
  const handleApplyClick = (course) => {
    navigate(`/courses/${course.id}/apply`, {
      state: {
        course: {
          title: course.title,
          university: course.university,
          country: course.country,
          field: course.field,
          level: course.level,
          duration: course.duration,
          tuition: course.fee,
          ielts: course.ielts,
          intake: course.intake || 'Rolling admissions',
          deadline: 'Rolling admissions'
        }
      }
    })
  }

  let filtered = ALL_COURSES.filter(c => {
    const matchSearch = search === '' || c.title.toLowerCase().includes(search.toLowerCase()) || c.university.toLowerCase().includes(search.toLowerCase())
    const matchCountry = country === 'All Countries' || c.country === country
    const matchLevel = level === 'All Levels' || c.level === level
    const matchField = field === 'All Fields' || c.field === field
    return matchSearch && matchCountry && matchLevel && matchField
  })

  if (sortBy === 'fee') {
    filtered = [...filtered].sort((a, b) => {
      const numA = parseFloat(a.fee.replace(/[^0-9.]/g, ''))
      const numB = parseFloat(b.fee.replace(/[^0-9.]/g, ''))
      return numA - numB
    })
  }
  if (sortBy === 'ielts') {
    filtered = [...filtered].sort((a, b) => {
      const numA = parseFloat(a.ielts.replace(/[^0-9.]/g, '')) || 0
      const numB = parseFloat(b.ielts.replace(/[^0-9.]/g, '')) || 0
      return numA - numB
    })
  }

  // Always put bestMatch first
  filtered = [
    ...filtered.filter(c => c.bestMatch),
    ...filtered.filter(c => !c.bestMatch),
  ]

  return (
    <div style={{ backgroundColor: '#F0F7F4' }} className="min-h-screen">

      {/* ── HEADER + FILTERS ── */}
      <div className="bg-white px-8 pt-7 pb-0 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 mb-0.5">Find the right course</h1>
        <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-5">
          Search 12+ courses across top universities worldwide
        </p>

        {/* Filter row */}
        <div className="flex items-center gap-3 mb-3 flex-wrap">
          {/* Search */}
          <div className="relative flex-1 min-w-[260px]">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search university or course..."
              className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-white outline-none focus:border-green-700 transition-colors"
            />
          </div>

          {/* Country */}
          <div className="relative">
            <select value={country} onChange={e => setCountry(e.target.value)}
              className="appearance-none text-sm border border-gray-200 rounded-lg bg-white pl-3 pr-7 py-2.5 outline-none cursor-pointer">
              {COUNTRIES.map(c => <option key={c}>{c}</option>)}
            </select>
            <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">▾</span>
          </div>

          {/* Level */}
          <div className="relative">
            <select value={level} onChange={e => setLevel(e.target.value)}
              className="appearance-none text-sm border border-gray-200 rounded-lg bg-white pl-3 pr-7 py-2.5 outline-none cursor-pointer">
              {LEVELS.map(l => <option key={l}>{l}</option>)}
            </select>
            <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">▾</span>
          </div>

          {/* Field */}
          <div className="relative">
            <select value={field} onChange={e => setField(e.target.value)}
              className="appearance-none text-sm border border-gray-200 rounded-lg bg-white pl-3 pr-7 py-2.5 outline-none cursor-pointer">
              {FIELDS.map(f => <option key={f}>{f}</option>)}
            </select>
            <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">▾</span>
          </div>

          {/* Search btn */}
          <button
            className="flex items-center justify-center w-10 h-10 rounded-lg text-white flex-shrink-0 hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#0D5C3A' }}
          >
            <Search size={16} />
          </button>
        </div>

        {/* Active chips */}
        {activeFilters.length > 0 && (
          <div className="flex items-center gap-2 pb-3 flex-wrap">
            {activeFilters.map(f => (
              <span key={f.key}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                style={{ backgroundColor: '#EBF7F1', color: '#0D5C3A' }}>
                {f.label}
                <button onClick={() => removeFilter(f.key)} className="hover:opacity-70">
                  <X size={11} strokeWidth={3} />
                </button>
              </span>
            ))}
            <button
              onClick={() => { setCountry('All Countries'); setLevel('All Levels'); setField('All Fields') }}
              className="text-xs text-gray-400 hover:text-gray-600 underline transition-colors">
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* ── MAIN ── */}
      <div className="max-w-7xl mx-auto px-8 py-6 flex gap-6">

        {/* LEFT: results */}
        <div className="flex-1 min-w-0">

          {/* Results header */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-500">
              Showing <span className="font-bold text-gray-900">{filtered.length}</span> course options
            </p>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Sort by:</span>
              <button onClick={() => setSortBy('fee')}
                className="text-xs font-bold transition-colors"
                style={{ color: sortBy === 'fee' ? '#0D5C3A' : '#9CA3AF', textDecoration: sortBy === 'fee' ? 'underline' : 'none' }}>
                Fee
              </button>
              <button onClick={() => setSortBy('ielts')}
                className="text-xs font-bold transition-colors"
                style={{ color: sortBy === 'ielts' ? '#0D5C3A' : '#9CA3AF', textDecoration: sortBy === 'ielts' ? 'underline' : 'none' }}>
                IELTS
              </button>
            </div>
          </div>

          {/* Cards */}
          <div className="flex flex-col gap-4">
            {filtered.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center">
                <div className="text-4xl mb-3">🔍</div>
                <div className="text-gray-900 font-semibold mb-1">No courses found</div>
                <div className="text-sm text-gray-400 mb-4">Try adjusting your filters</div>
                <button
                  onClick={() => { setSearch(''); setCountry('All Countries'); setLevel('All Levels'); setField('All Fields') }}
                  className="text-sm font-semibold px-5 py-2 rounded-lg text-white"
                  style={{ backgroundColor: '#0D5C3A' }}>
                  Clear filters
                </button>
              </div>
            ) : (
              filtered.map(c => {
                const isHovered = hoveredId === c.id
                const isBest = c.bestMatch

                return (
                  <div
                    key={c.id}
                    onMouseEnter={() => setHoveredId(c.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className="bg-white rounded-2xl overflow-visible relative transition-all duration-200"
                    style={{
                      border: isBest
                        ? '2px solid #0D5C3A'
                        : isHovered
                          ? '1.5px solid #0D5C3A'
                          : '1px solid #E5E7EB',
                      boxShadow: isHovered
                        ? '0 8px 24px rgba(13, 92, 58, 0.12)'
                        : '0 1px 3px rgba(0,0,0,0.05)',
                      transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                    }}
                  >
                    {/* BEST MATCH badge */}
                    {isBest && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
                        <span
                          className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-1 rounded-full text-white whitespace-nowrap"
                          style={{ backgroundColor: '#0D5C3A' }}
                        >
                          ☆ BEST MATCH
                        </span>
                      </div>
                    )}

                    <div className={`p-5 ${isBest ? 'pt-6' : ''}`}>
                      <div className="flex items-start gap-4">

                        {/* Icon */}
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 border border-gray-100"
                          style={{ backgroundColor: c.iconBg }}
                        >
                          {c.icon}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-1">
                            <div>
                              <h3 className="text-base font-bold text-gray-900 leading-snug">{c.title}</h3>
                              <p className="text-sm text-gray-500 mt-0.5">{c.university} • {c.country}</p>
                            </div>
                            <div className="text-right flex-shrink-0 ml-6">
                              <div className="text-base font-bold text-gray-900">
                                {c.fee}
                                <span className="text-xs font-normal text-gray-400 ml-1">{c.feeUnit}</span>
                              </div>
                              <div className="text-xs font-semibold mt-0.5" style={{ color: '#0D5C3A' }}>
                                {c.approval}
                              </div>
                            </div>
                          </div>

                          {/* Meta */}
                          <div className="flex items-center gap-5 mt-3 mb-4 flex-wrap">
                            <span className="flex items-center gap-1.5 text-xs text-gray-400">
                              <Clock size={13} /> {c.duration}
                            </span>
                            <span className="flex items-center gap-1.5 text-xs text-gray-400">
                              <Shield size={13} /> {c.ielts}
                            </span>
                            {c.intake && (
                              <span className="flex items-center gap-1.5 text-xs text-gray-400">
                                <Calendar size={13} /> {c.intake}
                              </span>
                            )}
                          </div>

                          {/* Buttons */}
                          <div className="flex items-center gap-2 flex-wrap">
                            {c.buttons.map(btn => (
                              <button key={btn}
                                className="text-xs font-semibold px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
                                {btn}
                              </button>
                            ))}
                            <button
                              onClick={() => handleApplyClick(c)}
                              className="text-xs font-bold px-5 py-2 rounded-lg text-white transition-all hover:opacity-90 ml-auto cursor-pointer"
                              style={{ backgroundColor: '#0D5C3A' }}
                            >
                              Apply now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="w-64 flex-shrink-0 flex flex-col gap-4">

          {/* Career Outcomes */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={15} style={{ color: '#0D5C3A' }} />
              <span className="text-sm font-bold text-gray-900">Career Outcomes</span>
            </div>
            <div className="flex flex-col gap-3">
              {CAREER_OUTCOMES.map(c => (
                <div key={c.role}>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-0.5">{c.role}</div>
                  <div className="text-sm font-bold text-gray-900">{c.salary}</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-4 leading-relaxed">
              Salaries are estimated average graduate earnings in AUD/year for Australia.
            </p>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <div className="text-sm font-bold text-gray-900 mb-3">Quick Links</div>
            {QUICK_LINKS.map(({ label, icon: Icon, to }) => (
              <button key={label} onClick={() => navigate(to)}
                className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0 group w-full text-left hover:bg-gray-50 rounded-lg px-1 transition-colors">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#F0F7F4' }}>
                  <Icon size={13} style={{ color: '#0D5C3A' }} />
                </div>
                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors flex-1">{label}</span>
                <ArrowRight size={13} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="rounded-2xl p-5 text-center" style={{ backgroundColor: '#0D5C3A' }}>
            <div className="text-white font-bold text-sm mb-2 leading-snug">
              Not sure which course suits you?
            </div>
            <div className="text-xs mb-4 leading-relaxed" style={{ color: '#A8DFC4' }}>
              Get a personalized roadmap based on your profile and career goals.
            </div>
            <button
              onClick={() => handleApplyClick(ALL_COURSES[0])}
              className="w-full text-xs font-bold py-2.5 px-4 rounded-lg bg-white transition-opacity hover:opacity-90 cursor-pointer"
              style={{ color: '#0D5C3A' }}
            >
              Get Guidance
            </button>
          </div>

        </div>
      </div>
      <Footer/>
    </div>
    
  )
}