import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, ChevronDown, AlertTriangle, ArrowRight, Globe, Mail } from 'lucide-react'

/* ─── DATA ─── */
const STATS = [
  { value: '120+',  label: 'Verified agencies'  },
  { value: '40+',   label: 'Countries'           },
  { value: '3800+', label: 'Universities'        },
  { value: '24k+',  label: 'Users guided'        },
  { value: '180+',  label: 'Scholarships listed' },
]

const COUNTRIES = [
  {
    id: 'australia', code: 'AUSTRALIA', name: 'Australia',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
    tuition: '$22k', suffix: '/yr', tags: ['FULL WORK RIGHTS', '3-5 YRS PSW'],
  },
  {
    id: 'canada', code: 'CANADA', name: 'Canada',
    image: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=600&q=80',
    tuition: '$15k', suffix: '/yr', tags: ['PR PATH', '2 YRS PGWP'],
  },
  {
    id: 'uk', code: 'UNITED KINGDOM', name: 'UK',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80',
    tuition: '£12k', suffix: '/yr', tags: ['PART-TIME WORK', '2 YRS GRADUATE'],
  },
  {
    id: 'germany', code: 'GERMANY', name: 'Germany',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&q=80',
    tuition: 'Zero', suffix: '/Low fee', tags: ['TECH HUBS', '18 MO SEARCH'],
  },
]

const HOW_STEPS = [
  { n: 1, title: 'Select Country',    desc: 'Identify your ideal destination based on policy and preference.'   },
  { n: 2, title: 'Choose Course',     desc: 'Find programs that align with your career and migration pathway.'  },
  { n: 3, title: 'Check Eligibility', desc: 'Use our automated tool to check visa and university requirements.' },
  { n: 4, title: 'Verified Agency',   desc: 'Connect with licensed agents vetted by our integrity team.'        },
  { n: 5, title: 'Apply',             desc: 'Submit your application with confidence and track progress.'        },
]

const SCAM_REPORTS = [
  { name: 'Global Pathways Pvt Ltd',  desc: 'Reported for charging fraudulent visa processing fees.',  status: 'URGENT',       badgeBg: '#DC2626', dot: '#F87171' },
  { name: 'Venture Scholars Network', desc: 'Unverified claims of guaranteed Australian PR.',           status: 'UNDER REVIEW', badgeBg: '#15803D', dot: '#FCD34D' },
  { name: 'Direct Visa Express',      desc: 'Fake scholarship advertisements on social media.',         status: 'URGENT',       badgeBg: '#DC2626', dot: '#F87171' },
]

const QUICK_TAGS = ['Australia', 'Cyber Security', 'Canada PR', "UK Master's", 'Germany Tech']

const SUGGESTIONS = [
  { label: 'Australia',         type: 'Country'    },
  { label: 'Canada',            type: 'Country'    },
  { label: 'United Kingdom',    type: 'Country'    },
  { label: 'Germany',           type: 'Country'    },
  { label: 'Cyber Security',    type: 'Course'     },
  { label: 'Computer Science',  type: 'Course'     },
  { label: 'Nursing',           type: 'Course'     },
  { label: 'Student Visa',      type: 'Visa'       },
  { label: 'Work Visa',         type: 'Visa'       },
  { label: 'UNSW Sydney',       type: 'University' },
  { label: 'Monash University', type: 'University' },
]

/* ─── COMPONENT ─── */
export default function Home() {
  const navigate = useNavigate()
  const [query,   setQuery]   = useState('')
  const [typeVal, setTypeVal] = useState('')
  const [level,   setLevel]   = useState('')
  const [sugOpen, setSugOpen] = useState(false)
  const searchRef = useRef(null)

  const filtered = query.length > 1
    ? SUGGESTIONS.filter(s => s.label.toLowerCase().includes(query.toLowerCase())).slice(0, 5)
    : []

  function handleSearch() {
    if (!query.trim()) return
    navigate(`/courses?q=${encodeURIComponent(query)}`)
    setSugOpen(false)
  }

  return (
    <div className="bg-white">

      {/* ── HERO ── */}
      <section style={{ backgroundColor: '#E8F5EE' }} className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center text-xs font-medium px-4 py-1.5 rounded-full mb-7 border"
            style={{ backgroundColor: '#C6E8D6', color: '#0D5C3A', borderColor: '#A8D5BC' }}>
            Sri Lanka's trusted migration guidance platform
          </div>

          <h1 className="text-5xl font-bold leading-tight tracking-tight mb-5" style={{ color: '#0D2B1F' }}>
            Study, work, or travel abroad — the right way
          </h1>

          <p className="text-gray-500 text-base leading-relaxed mb-10 max-w-lg mx-auto">
            Find verified information on visas, universities, and agencies all in one place.
            Your journey to global mobility starts with truth.
          </p>

          {/* Search */}
          <div className="relative max-w-2xl mx-auto" ref={searchRef}>
            <div className="flex items-center bg-white border border-gray-200 rounded-xl shadow-md overflow-visible">
              <div className="pl-4 pr-2 flex-shrink-0">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                value={query}
                onChange={e => { setQuery(e.target.value); setSugOpen(true) }}
                onFocus={() => setSugOpen(true)}
                onBlur={() => setTimeout(() => setSugOpen(false), 150)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
                placeholder="Search country, university, or course..."
                className="flex-1 py-3.5 text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent"
              />
              <div className="hidden sm:flex items-center border-l border-gray-200">
                <div className="relative flex items-center">
                  <select value={typeVal} onChange={e => setTypeVal(e.target.value)}
                    className="appearance-none text-sm text-gray-500 bg-transparent outline-none pl-4 pr-7 py-3.5 cursor-pointer">
                    <option value="">Type</option>
                    <option>Country</option>
                    <option>University</option>
                    <option>Course</option>
                    <option>Visa</option>
                  </select>
                  <ChevronDown size={13} className="absolute right-1.5 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div className="hidden sm:flex items-center border-l border-gray-200">
                <div className="relative flex items-center">
                  <select value={level} onChange={e => setLevel(e.target.value)}
                    className="appearance-none text-sm text-gray-500 bg-transparent outline-none pl-4 pr-7 py-3.5 cursor-pointer">
                    <option value="">Level</option>
                    <option>Diploma</option>
                    <option>Bachelor's</option>
                    <option>Master's</option>
                    <option>PhD</option>
                  </select>
                  <ChevronDown size={13} className="absolute right-1.5 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <button onClick={handleSearch}
                className="m-1.5 text-white text-sm font-semibold px-6 py-2.5 rounded-lg hover:opacity-90 flex-shrink-0"
                style={{ backgroundColor: '#0D5C3A' }}>
                Search
              </button>
            </div>

            {sugOpen && filtered.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-gray-100 rounded-xl shadow-lg z-40 overflow-hidden">
                {filtered.map(s => (
                  <button key={s.label} onMouseDown={() => { setQuery(s.label); setSugOpen(false) }}
                    className="w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-gray-50 transition-colors">
                    <span className="text-gray-800">{s.label}</span>
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{s.type}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick tags */}
          <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
            <span className="text-xs text-gray-500 font-semibold tracking-wide">QUICK TAGS:</span>
            {QUICK_TAGS.map(tag => (
              <button key={tag}
                onClick={() => { setQuery(tag); navigate(`/courses?q=${encodeURIComponent(tag)}`) }}
                className="text-xs px-3 py-1.5 rounded-full border border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-white transition-all bg-white">
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto grid grid-cols-5 divide-x divide-gray-200">
          {STATS.map(s => (
            <div key={s.label} className="py-7 text-center">
              <div className="text-2xl font-bold mb-1" style={{ color: '#0D5C3A' }}>{s.value}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── COUNTRIES ── */}
      <section className="py-14 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Choose your country</h2>
          <div className="flex items-end justify-between mt-1 mb-6">
            <p className="text-sm text-gray-500">Explore opportunities based on your budget and career goals.</p>
            <Link to="/countries" className="text-sm flex items-center gap-1 flex-shrink-0 ml-4" style={{ color: '#0D5C3A' }}>
              View all destinations <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {COUNTRIES.map(c => (
              <div key={c.id} onClick={() => navigate(`/visas?country=${c.name}`)}
                className="border border-gray-200 rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-200 bg-white group">
                <div className="relative h-44 overflow-hidden">
                  <img src={c.image} alt={c.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute top-2 left-2">
                    <span className="bg-black/40 backdrop-blur-sm text-white text-xs font-semibold px-2 py-0.5 rounded-md tracking-wide">
                      {c.code}
                    </span>
                  </div>
                </div>
                <div className="p-3">
                  <div className="text-lg font-bold text-gray-900 mb-2">
                    {c.tuition}<span className="text-sm font-normal text-gray-500">{c.suffix}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {c.tags.map(tag => (
                      <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md font-medium">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-16 px-6 border-y border-gray-200" style={{ backgroundColor: '#F7FAF8' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">Get started in 5 steps</h2>
          <div className="relative flex items-start justify-between">
            <div className="absolute top-5 left-[calc(10%+22px)] right-[calc(10%+22px)] h-px bg-gray-300 z-0" />
            {HOW_STEPS.map(s => (
              <div key={s.n} className="flex-1 flex flex-col items-center relative z-10 px-2">
                <div className="w-11 h-11 rounded-full text-white flex items-center justify-center font-bold text-base mb-4 shadow-md"
                  style={{ backgroundColor: '#0D5C3A' }}>
                  {s.n}
                </div>
                <div className="text-sm font-semibold text-gray-900 text-center mb-1.5">{s.title}</div>
                <div className="text-xs text-gray-500 text-center leading-relaxed">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCAM REPORTS ── */}
      <section className="py-14 px-6 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <AlertTriangle size={18} className="text-red-500" />
            <h2 className="text-xl font-bold text-red-500">Recent Scam Reports</h2>
          </div>
          <p className="text-sm text-gray-500 mb-8 leading-relaxed">
            We monitor and flag suspicious activity to protect our community. Check before you commit.
          </p>
          <div className="flex flex-col gap-3 mb-8">
            {SCAM_REPORTS.map(r => (
              <div key={r.name}
                className="bg-white border border-gray-200 rounded-xl px-5 py-4 flex items-center gap-4 text-left hover:border-gray-300 transition-colors">
                <div className="w-8 h-8 rounded-full border-2 border-gray-100 flex items-center justify-center flex-shrink-0 bg-gray-50">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: r.dot }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-gray-900">{r.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{r.desc}</div>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-md flex-shrink-0 text-white"
                  style={{ backgroundColor: r.badgeBg }}>
                  {r.status}
                </span>
              </div>
            ))}
          </div>
          <Link to="/report"
            className="inline-block border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-medium px-6 py-2.5 rounded-lg transition-colors">
            View all reports
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FOOTER — only here, nowhere else
      ══════════════════════════════════════ */}
   

    </div>
  )
}