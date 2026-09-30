import { useNavigate, useLocation, Link } from 'react-router-dom'
import { Calendar, Clock, Shield, CheckCircle, Circle, ArrowRight } from 'lucide-react'

/* ══════════════════════════════════════
   STATIC COURSE DATA
   In a real app this would come from route state or an API
══════════════════════════════════════ */
const DEFAULT_COURSE = {
  title:       'Master of Cyber Security',
  university:  'UNSW Sydney',
  country:     'Australia',
  field:       'Cyber Security',
  level:       "Master's",
  duration:    '2 Years (Full-time)',
  tuition:     '$32,000',
  ielts:       'IELTS 6.5',
  intake:      'Feb / Jul Intakes',
  deadline:    'Rolling admissions',
}

const HOW_STEPS = [
  {
    n: 1, active: true,
    title: 'Choose a verified agency',
    desc:  'Select an agency below that specialises in Australian student visas.',
  },
  {
    n: 2, active: false,
    title: 'Submit documentation',
    desc:  'Upload your transcripts and English proficiency results.',
  },
  {
    n: 3, active: false,
    title: 'Receive CoE',
    desc:  'Accept your offer and receive Confirmation of Enrolment.',
  },
]

const FEATURED_AGENCY = {
  initials:  'VG',
  name:      'Visa Global Consultants',
  location:  'Colombo, Sri Lanka',
  trust:     87,
  scores:    [
    { label: 'Gov registration',  value: 95 },
    { label: 'Visa Success Rate', value: 82 },
  ],
  avatarBg:    '#EEF2FF',
  avatarColor: '#3730A3',
}

const OTHER_AGENCIES = [
  { initials: 'OE', name: 'Overseas Education Lanka', location: 'Kandy, Sri Lanka',    trust: 92, avatarBg: '#EBF7F1', avatarColor: '#0D5C3A' },
  { initials: 'GE', name: 'Global Education Services', location: 'Colombo, Sri Lanka', trust: 78, avatarBg: '#F5F3FF', avatarColor: '#7C3AED' },
]

const DOCS = [
  { label: 'Valid Passport',             done: true  },
  { label: 'Academic Transcripts',       done: true  },
  { label: 'IELTS/PTE Results',          done: false },
  { label: 'Statement of Purpose (SOP)', done: false },
  { label: 'Financial Evidence',         done: false },
  { label: 'Health Insurance (OSHC)',    done: false },
]

/* ══════════════════════════════════════
   SCORE BAR
══════════════════════════════════════ */
function ScoreBar({ label, value }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-gray-500">{label}</span>
        <span className="text-xs font-bold text-gray-700">{value}%</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{ width: `${value}%`, backgroundColor: '#0D5C3A' }}
        />
      </div>
    </div>
  )
}

/* ══════════════════════════════════════
   COMPONENT
══════════════════════════════════════ */
export default function CourseApply() {
  const navigate = useNavigate()
  const location = useLocation()

  // Accept course data passed via navigation state, else use default
  const course = location.state?.course || DEFAULT_COURSE

  return (
    <div style={{ backgroundColor: '#F0F7F4' }} className="min-h-screen pb-16">

      {/* ── Breadcrumb ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-8 py-3 flex items-center gap-2 text-sm text-gray-400">
          <Link to="/courses" className="hover:text-gray-600 transition-colors">Courses</Link>
          <span className="text-gray-300">›</span>
          <span className="hover:text-gray-600 cursor-pointer transition-colors">{course.title}</span>
          <span className="text-gray-300">›</span>
          <span className="font-semibold text-gray-900">Apply</span>
        </div>
      </div>

      {/* ── Page header ── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-8 py-7 flex items-start justify-between gap-6">

          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1.5">
              Apply for {course.title}
            </h1>
            <p className="text-sm text-gray-500 mb-4">
              {course.university}
              <span className="mx-2 text-gray-300">•</span>
              {course.country}
              <span className="mx-2 text-gray-300">•</span>
              <span className="font-bold text-gray-900">{course.tuition}/yr</span>
            </p>

            {/* Info pills */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-gray-100 text-gray-700">
                <Clock size={12} /> {course.duration.split(' ').slice(0,2).join(' ')}
              </span>
              <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-gray-100 text-gray-700">
                <Shield size={12} /> {course.ielts}
              </span>
              <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-gray-100 text-gray-700">
                <Calendar size={12} /> {course.intake}
              </span>
            </div>
          </div>

          {/* Deadline card */}
          <div className="flex items-center gap-3 px-5 py-4 rounded-2xl flex-shrink-0"
            style={{ backgroundColor: '#EBF7F1', border: '1px solid #A8DFC4' }}>
            <Calendar size={20} style={{ color: '#0D5C3A' }} />
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-0.5">
                Application Deadline
              </div>
              <div className="text-sm font-bold" style={{ color: '#0D5C3A' }}>
                {course.deadline}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="max-w-6xl mx-auto px-8 py-8 flex gap-8">

        {/* LEFT */}
        <div className="flex-1 min-w-0">

          {/* How to apply */}
          <h2 className="text-lg font-bold text-gray-900 mb-5">How to apply</h2>
          <div className="relative mb-8">
            {/* Connecting line */}
            <div className="absolute left-[17px] top-8 bottom-8 w-px bg-gray-200" />

            <div className="flex flex-col gap-6">
              {HOW_STEPS.map(step => (
                <div key={step.n} className="flex gap-4 relative">
                  {/* Circle */}
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 z-10"
                    style={{
                      backgroundColor: step.active ? '#0D5C3A' : 'white',
                      color:           step.active ? 'white'   : '#9CA3AF',
                      border:          step.active ? 'none'    : '2px solid #E5E7EB',
                    }}
                  >
                    {step.n}
                  </div>
                  <div className="pt-1.5">
                    <div
                      className="text-sm font-bold mb-1"
                      style={{ color: step.active ? '#111827' : '#9CA3AF' }}
                    >
                      {step.title}
                    </div>
                    <div className="text-sm" style={{ color: step.active ? '#6B7280' : '#D1D5DB' }}>
                      {step.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Verified agencies */}
          <h2 className="text-base font-bold text-gray-900 mb-4">
            Verified agencies for this course
          </h2>

          {/* Featured agency */}
          <div className="bg-white rounded-2xl mb-3 overflow-hidden"
            style={{ border: '2px solid #0D5C3A' }}>
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start gap-4 mb-5">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-base flex-shrink-0"
                  style={{ backgroundColor: FEATURED_AGENCY.avatarBg, color: FEATURED_AGENCY.avatarColor }}
                >
                  {FEATURED_AGENCY.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-base font-bold text-gray-900">{FEATURED_AGENCY.name}</h3>
                    <span className="flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full flex-shrink-0"
                      style={{ backgroundColor: '#EBF7F1', color: '#0D5C3A', border: '1px solid #A8DFC4' }}>
                      ☆ Recommended
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-xs text-gray-400">📍 {FEATURED_AGENCY.location}</span>
                  </div>
                </div>
              </div>

              {/* Trust + score bars */}
              <div className="flex gap-8">
                <div className="text-center flex-shrink-0">
                  <div className="text-3xl font-bold" style={{ color: '#0D5C3A' }}>
                    {FEATURED_AGENCY.trust}
                  </div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mt-0.5">
                    Trust Score
                  </div>
                </div>
                <div className="flex-1 flex flex-col gap-3 justify-center">
                  {FEATURED_AGENCY.scores.map(s => (
                    <ScoreBar key={s.label} label={s.label} value={s.value} />
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-5">
                <button
                  onClick={() => navigate('/agencies')}
                  className="flex-1 py-3 rounded-xl font-bold text-sm border-2 border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  View profile
                </button>
                <button
                  onClick={() => navigate('/agencies')}
                  className="flex-1 py-3 rounded-xl font-bold text-sm text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#0D5C3A' }}
                >
                  Contact agency
                </button>
              </div>
            </div>
          </div>

          {/* Other agencies */}
          {OTHER_AGENCIES.map(a => (
            <div key={a.name}
              className="bg-white rounded-2xl border border-gray-200 px-5 py-4 mb-3 flex items-center gap-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                style={{ backgroundColor: a.avatarBg, color: a.avatarColor }}
              >
                {a.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-gray-900">{a.name}</span>
                  <span className="text-xs font-bold" style={{ color: '#0D5C3A' }}>{a.trust}</span>
                  <span className="text-xs" style={{ color: '#0D5C3A' }}>✓</span>
                </div>
                <div className="text-xs text-gray-400 mt-0.5">📍 {a.location}</div>
              </div>
              <button
                onClick={() => navigate('/agencies')}
                className="text-sm font-bold px-5 py-2 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors flex-shrink-0"
              >
                Apply
              </button>
            </div>
          ))}
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="w-80 flex-shrink-0">
          <div className="sticky top-6 flex flex-col gap-5">

            {/* Course Summary */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-4 mb-4">
                Course Summary
              </h3>
              {[
                { label: 'University',       value: course.university,                  bold: true  },
                { label: 'Country',          value: course.country,                     bold: true  },
                { label: 'Course',           value: course.field,                       bold: true  },
                { label: 'Level',            value: course.level,                       bold: true  },
                { label: 'Duration',         value: course.duration,                    bold: false },
                { label: 'Estimated Tuition',value: `${course.tuition} /yr`,           bold: true, green: true },
                { label: 'English requirement', value: course.ielts,                   bold: true  },
              ].map((row, i) => (
                <div key={i}
                  className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                  <span className="text-sm text-gray-500">{row.label}</span>
                  <span
                    className={`text-sm ${row.bold ? 'font-bold' : ''}`}
                    style={{ color: row.green ? '#0D5C3A' : '#111827' }}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Check eligibility */}
            <div className="rounded-2xl p-5" style={{ backgroundColor: '#EBF7F1', border: '1px solid #A8DFC4' }}>
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'white' }}>
                  <CheckCircle size={18} style={{ color: '#0D5C3A' }} />
                </div>
                <p className="text-sm leading-relaxed" style={{ color: '#0D5C3A', fontWeight: 600 }}>
                  Ensure you meet the academic entry requirements before applying.
                </p>
              </div>
              <button
                onClick={() => navigate('/eligibility')}
                className="w-full py-3 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#0D5C3A' }}
              >
                Check eligibility <ArrowRight size={15} />
              </button>
            </div>

            {/* Required Documents */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Required Documents</h3>
              <div className="flex flex-col gap-3 mb-4">
                {DOCS.map(doc => (
                  <div key={doc.label} className="flex items-center gap-3">
                    {doc.done ? (
                      <CheckCircle size={18} style={{ color: '#0D5C3A' }} className="flex-shrink-0" />
                    ) : (
                      <Circle size={18} className="text-gray-300 flex-shrink-0" />
                    )}
                    <span className="text-sm text-gray-700">{doc.label}</span>
                  </div>
                ))}
              </div>
              <button
                className="flex items-center gap-1.5 text-sm font-bold hover:opacity-80 transition-opacity"
                style={{ color: '#0D5C3A' }}
              >
                View full checklist <ArrowRight size={14} />
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}