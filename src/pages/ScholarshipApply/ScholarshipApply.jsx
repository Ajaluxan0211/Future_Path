import { useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import {
  Calendar, Check, ArrowRight, Building2, FileText,
  ShieldCheck, ExternalLink, Download
} from 'lucide-react'

/* ══════════════════════════════════════
   SCHOLARSHIP APPLICATION DATA — keyed by id
══════════════════════════════════════ */
const APPLY_DATA = {
  2: {
    title: 'Fulbright Graduate Student Award',
    provider: 'U.S. Department of State',
    fundingType: 'Full Ride',
    level: "Master's",
    tags: ['Tuition + stipend', '1-2 years', "Master's"],
    deadline: 'Oct 12, 2025',
    portalName: 'Fulbright portal',
    journey: [
      { title: 'Choose how you\'ll apply',        desc: 'Apply independently or get free guidance from a verified agency.' },
      { title: 'Prepare your documents',          desc: 'Transcripts, statement of purpose, and reference letters.' },
      { title: 'Submit through Fulbright portal', desc: 'Complete your application via the official online system.' },
      { title: 'National interview',              desc: 'Attend interview with your home country Fulbright commission.' },
    ],
    documents: [
      "Bachelor's degree transcript",
      'Statement of purpose',
      '3 reference letters',
      'English test scores',
      'Research/study proposal',
    ],
    summary: [
      { label: 'Provider',     value: 'U.S. Dept. of State', type: 'bold'  },
      { label: 'Value',        value: 'Tuition + stipend',   type: 'badge' },
      { label: 'Duration',     value: '1-2 years',           type: 'bold'  },
      { label: 'Degree level', value: "Master's",            type: 'bold'  },
      { label: 'Deadline',     value: 'Oct 12, 2025',        type: 'amber' },
    ],
  },
}

const AGENCIES = [
  { initials: 'GE', name: 'Global Education Services', location: 'Colombo, Sri Lanka', score: 78,  avatarBg: '#F5F3FF', avatarColor: '#7C3AED' },
  { initials: 'OE', name: 'Overseas Education Lanka',  location: 'Kandy, Sri Lanka',    score: 92,  avatarBg: '#ECFDF5', avatarColor: '#047857' },
]

/* ══════════════════════════════════════
   COMPONENT
══════════════════════════════════════ */
export default function ScholarshipApply() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [selectedOption, setSelectedOption] = useState('agency') // 'agency' | 'independent'

  const data = APPLY_DATA[id] || APPLY_DATA[2] // fallback to Fulbright sample

  if (!data) {
    return (
      <div style={{ backgroundColor: '#F0F7F4' }} className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-bold text-gray-700 mb-2">Application page not found</h2>
          <Link to="/scholarships" className="text-sm font-semibold" style={{ color: '#0D5C3A' }}>
            ← Back to all scholarships
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: '#F0F7F4' }} className="min-h-screen">

      {/* ── Breadcrumb ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-8 py-3 flex items-center gap-2 text-sm">
          <Link to="/scholarships" className="text-gray-400 hover:text-gray-600 transition-colors">
            Scholarships
          </Link>
          <span className="text-gray-300">›</span>
          <Link to={`/scholarships/${id}`} className="text-gray-400 hover:text-gray-600 transition-colors">
            {data.title}
          </Link>
          <span className="text-gray-300">›</span>
          <span className="font-semibold text-gray-900">Apply</span>
        </div>
      </div>

      {/* ── Header ── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-8 py-7 flex items-start justify-between gap-6">

          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1.5">
              Apply for {data.title}
            </h1>
            <p className="text-sm text-gray-500 mb-4">
              {data.provider} <span className="mx-1.5">•</span> {data.fundingType} <span className="mx-1.5">•</span> {data.level}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-3 py-1.5 rounded-full"
                style={{ backgroundColor: '#ECFDF5', color: '#047857' }}>
                {data.tags[0]}
              </span>
              {data.tags.slice(1).map(t => (
                <span key={t} className="text-xs font-bold px-3 py-1.5 rounded-full bg-gray-100 text-gray-600">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Deadline card */}
          <div className="rounded-2xl p-4 flex items-center gap-3 flex-shrink-0"
            style={{ backgroundColor: '#FEF3E2', border: '1px solid #FCE3B8' }}>
            <Calendar size={22} style={{ color: '#C2680C' }} />
            <div>
              <div className="text-xs font-bold uppercase tracking-wide text-gray-400">
                Application deadline
              </div>
              <div className="text-sm font-bold" style={{ color: '#C2680C' }}>
                {data.deadline}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="max-w-6xl mx-auto px-8 py-7">
        <div className="grid grid-cols-5 gap-6">

          {/* LEFT */}
          <div className="col-span-3 flex flex-col gap-6">

            {/* Journey timeline */}
            <div className="bg-white rounded-2xl border border-gray-200 p-7">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Your application journey</h2>

              <div className="relative">
                <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gray-200" />
                <div className="flex flex-col gap-7">
                  {data.journey.map((step, i) => {
                    const isActive = i === 0
                    return (
                      <div key={i} className="flex gap-4 relative">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 z-10"
                          style={{
                            backgroundColor: isActive ? '#0D5C3A' : '#fff',
                            color: isActive ? '#fff' : '#9CA3AF',
                            border: isActive ? 'none' : '2px solid #E5E7EB',
                          }}
                        >
                          {i + 1}
                        </div>
                        <div className="pb-1">
                          <div className="text-base font-bold mb-1"
                            style={{ color: isActive ? '#111827' : '#9CA3AF' }}>
                            {step.title}
                          </div>
                          <div className="text-sm leading-relaxed"
                            style={{ color: isActive ? '#6B7280' : '#D1D5DB' }}>
                            {step.desc}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Choose how to apply */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">How would you like to apply?</h2>
              <p className="text-sm text-gray-400 mb-4">Choose the option that works best for you.</p>

              <div className="grid grid-cols-2 gap-4">

                {/* Option 1 — Agency */}
                <div
                  onClick={() => setSelectedOption('agency')}
                  className="bg-white rounded-2xl p-6 relative cursor-pointer transition-all duration-200"
                  style={{ border: selectedOption === 'agency' ? '2px solid #0D5C3A' : '1px solid #E5E7EB' }}
                >
                  {/* Recommended badge */}
                  <div className="absolute top-0 right-0">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-white px-3 py-1.5 rounded-bl-xl rounded-tr-2xl"
                      style={{ backgroundColor: '#0D5C3A' }}>
                      ★ Recommended
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: '#EBF7F1' }}>
                    <Building2 size={22} style={{ color: '#0D5C3A' }} />
                  </div>

                  <h3 className="text-base font-bold text-gray-900 mb-2">
                    Apply with agency guidance
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed mb-4">
                    Free support from a verified agency specialising in U.S. scholarships.
                  </p>

                  <div className="flex flex-col gap-2.5 mb-5">
                    {['Document review', 'Application strategy', 'Interview prep'].map(item => (
                      <div key={item} className="flex items-center gap-2.5">
                        <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: '#ECFDF5' }}>
                          <Check size={10} strokeWidth={3} style={{ color: '#047857' }} />
                        </div>
                        <span className="text-sm text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={(e) => { e.stopPropagation(); navigate('/agencies') }}
                    className="w-full py-3 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: '#0D5C3A' }}
                  >
                    Choose this option <ArrowRight size={15} />
                  </button>
                </div>

                {/* Option 2 — Independent */}
                <div
                  onClick={() => setSelectedOption('independent')}
                  className="bg-white rounded-2xl p-6 cursor-pointer transition-all duration-200"
                  style={{ border: selectedOption === 'independent' ? '2px solid #0D5C3A' : '1px solid #E5E7EB' }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gray-50">
                    <FileText size={22} className="text-gray-400" />
                  </div>

                  <h3 className="text-base font-bold text-gray-900 mb-2">
                    Apply independently
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed mb-4">
                    Submit your application directly through the {data.portalName}.
                  </p>

                  <div className="flex flex-col gap-2.5 mb-5">
                    {['Self-guided process', 'No agency support', 'Direct submission'].map(item => (
                      <div key={item} className="flex items-center gap-2.5">
                        <div className="w-4 h-4 rounded-full border-2 border-gray-200 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    className="w-full py-3 rounded-xl font-bold text-sm border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    Go to {data.portalName} <ExternalLink size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Recommended agencies */}
            <div>
              <h2 className="text-base font-bold text-gray-900 mb-3">
                Recommended agencies for U.S. scholarships
              </h2>
              <div className="flex flex-col gap-3">
                {AGENCIES.map(a => (
                  <div key={a.name}
                    className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4"
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                      style={{ backgroundColor: a.avatarBg, color: a.avatarColor }}
                    >
                      {a.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-gray-900">{a.name}</div>
                      <div className="text-xs text-gray-400">{a.location}</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-xs text-gray-400">Trust Score</div>
                      <div className="text-sm font-bold" style={{ color: '#0D5C3A' }}>{a.score}%</div>
                    </div>
                    <button
                      onClick={() => navigate('/agencies')}
                      className="flex items-center gap-1 text-sm font-bold flex-shrink-0 hover:opacity-80 transition-opacity"
                      style={{ color: '#0D5C3A' }}
                    >
                      Contact <ArrowRight size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="col-span-2">
            <div className="sticky top-6 flex flex-col gap-5">

              {/* Scholarship summary */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="text-base font-bold text-gray-900 pb-4 mb-1 border-b border-gray-100">
                  Scholarship summary
                </div>
                {data.summary.map((row, i) => (
                  <div key={i}
                    className="flex items-center justify-between py-3.5 border-b border-gray-50 last:border-0"
                  >
                    <span className="text-sm text-gray-500">{row.label}</span>
                    {row.type === 'badge' ? (
                      <span className="text-xs font-bold px-2.5 py-1 rounded-md"
                        style={{ backgroundColor: '#ECFDF5', color: '#047857' }}>
                        {row.value}
                      </span>
                    ) : row.type === 'amber' ? (
                      <span className="text-sm font-bold" style={{ color: '#C2680C' }}>{row.value}</span>
                    ) : (
                      <span className="text-sm font-bold text-gray-900">{row.value}</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Confirm eligibility */}
              <div className="rounded-2xl p-5" style={{ backgroundColor: '#EBF7F1', border: '1px solid #C6E8D6' }}>
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck size={17} style={{ color: '#0D5C3A' }} />
                  <span className="text-sm font-bold" style={{ color: '#0D5C3A' }}>
                    Confirm your eligibility
                  </span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  Make sure you meet citizenship and academic requirements first.
                </p>
                <button
                  onClick={() => navigate('/eligibility')}
                  className="w-full bg-white font-bold text-sm py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
                  style={{ color: '#0D5C3A' }}
                >
                  Check eligibility →
                </button>
              </div>

              {/* Documents needed */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="text-base font-bold text-gray-900 mb-4">
                  Documents you'll need
                </div>
                <div className="flex flex-col gap-3 mb-4">
                  {data.documents.map(doc => (
                    <div key={doc} className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full border-2 border-gray-200 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{doc}</span>
                    </div>
                  ))}
                </div>
                <button
                  className="flex items-center gap-1.5 text-sm font-bold transition-colors hover:opacity-80"
                  style={{ color: '#0D5C3A' }}
                >
                  Download document checklist <Download size={14} />
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}