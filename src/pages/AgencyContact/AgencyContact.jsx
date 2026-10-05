import { useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Globe, Clock, CheckCircle, ArrowRight } from 'lucide-react'

/* ══ Same agency data ══ */
const AGENCIES = {
  1: {
    initials: 'VG', name: 'Visa Global Consultants',
    avatarBg: '#EEF2FF', avatarColor: '#3730A3',
    location: 'Colombo, Sri Lanka', trust: 87,
    license: 'VG-20140892',
    scores: [
      { label: 'Gov registration',  value: 95 },
      { label: 'User reviews',      value: 86 },
      { label: 'Successful cases',  value: 82 },
      { label: 'Years in operation',value: 80 },
    ],
    responseTime: 'Within 24 hours',
    regarding: 'Master of Cyber Security — UNSW Sydney',
    deadline: 'Feb / Jul Intakes',
  },
  2: {
    initials: 'OE', name: 'Overseas Education Lanka',
    avatarBg: '#EBF7F1', avatarColor: '#0D5C3A',
    location: 'Kandy, Sri Lanka', trust: 92,
    license: 'OE-20110456',
    scores: [
      { label: 'Gov registration',  value: 98 },
      { label: 'User reviews',      value: 91 },
      { label: 'Successful cases',  value: 89 },
      { label: 'Years in operation',value: 90 },
    ],
    responseTime: 'Within 12 hours',
    regarding: 'Master of IT (Cyber Security) — Deakin University',
    deadline: 'Mar / Jul Intakes',
  },
  3: {
    initials: 'GE', name: 'Global Education Services',
    avatarBg: '#F5F3FF', avatarColor: '#7C3AED',
    location: 'Colombo, Sri Lanka', trust: 78,
    license: 'GE-20160789',
    scores: [
      { label: 'Gov registration',  value: 88 },
      { label: 'User reviews',      value: 79 },
      { label: 'Successful cases',  value: 76 },
      { label: 'Years in operation',value: 70 },
    ],
    responseTime: 'Within 24 hours',
    regarding: 'MSc in Applied Computing — University of Toronto',
    deadline: 'Sep / Jan Intakes',
  },
}

const SUBJECTS = [
  'Master of Cyber Security at UNSW',
  'Student visa Australia',
  'Work visa Australia',
  'General enquiry',
]

function ScoreBar({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-xs text-gray-500 w-28 flex-shrink-0">{label}</span>
      <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${value}%`, backgroundColor: '#0D5C3A' }} />
      </div>
      <span className="text-xs font-bold text-gray-600 w-8 text-right">{value}%</span>
    </div>
  )
}

export default function AgencyContact() {
  const navigate  = useNavigate()
  const { id }    = useParams()
  const agency    = AGENCIES[id] || AGENCIES[Number(id)] || AGENCIES[1]

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '',
    phone: '', subject: '', ielts: '', message: '', agree: false,
  })
  const [submitted, setSubmitted] = useState(false)
  const [error,     setError]     = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.firstName || !form.lastName || !form.email || !form.message) {
      setError('Please fill in all required fields.')
      return
    }
    if (!form.agree) {
      setError('Please agree to be contacted by this agency.')
      return
    }
    setError('')
    setSubmitted(true)
  }

  /* ── Success screen ── */
  if (submitted) {
    return (
      <div style={{ backgroundColor: '#F0F7F4' }} className="min-h-screen flex items-center justify-center px-6">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-10 max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ backgroundColor: '#EBF7F1' }}>
            <CheckCircle size={40} style={{ color: '#0D5C3A' }} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Message sent!</h1>
          <p className="text-sm text-gray-400 leading-relaxed mb-6">
            <strong>{agency.name}</strong> will respond within 24 hours to <strong>{form.email || 'your email'}</strong>.
          </p>
          <div className="rounded-xl p-4 mb-6 text-left" style={{ backgroundColor: '#F0F7F4' }}>
            {[
              { label: 'Agency',         value: agency.name              },
              { label: 'Response time',  value: agency.responseTime, green: true },
            ].map(row => (
              <div key={row.label} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <span className="text-xs text-gray-500">{row.label}</span>
                <span className={`text-xs font-bold ${row.green ? '' : 'text-gray-900'}`}
                  style={{ color: row.green ? '#0D5C3A' : undefined }}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <button onClick={() => navigate('/')}
              className="w-full py-3.5 rounded-xl text-white font-bold text-sm hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#0D5C3A' }}>
              Go to homepage
            </button>
            <button onClick={() => navigate('/courses')}
              className="w-full py-3 rounded-xl font-bold text-sm border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
              Browse more courses
            </button>
            <button onClick={() => navigate('/')}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
              Back to home
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: '#F0F7F4' }} className="min-h-screen pb-16">

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-8 py-3 flex items-center gap-2 text-sm text-gray-400">
          <Link to="/courses" className="hover:text-gray-600">Courses</Link>
          <span className="text-gray-300">›</span>
          <Link to={`/agencies/${id}`} className="hover:text-gray-600">{agency.name}</Link>
          <span className="text-gray-300">›</span>
          <span className="font-semibold text-gray-900">Contact</span>
        </div>
      </div>

      {/* Page header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Contact {agency.name}</h1>
          <p className="text-sm text-gray-400">{agency.location} · License #{agency.license}</p>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-5xl mx-auto px-8 py-8 flex gap-8">

        {/* LEFT — Form */}
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <h2 className="text-base font-bold text-gray-900 mb-1">Send a message</h2>
            <p className="text-sm text-gray-400 mb-6">The agency will respond within 24 hours.</p>

            {error && (
              <div className="mb-5 px-4 py-3 rounded-xl text-sm"
                style={{ backgroundColor: '#FEF2F2', color: '#DC2626' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              {/* Name row */}
              <div className="grid grid-cols-2 gap-4">
                {['firstName', 'lastName'].map((field, i) => (
                  <div key={field}>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1.5">
                      {i === 0 ? 'First name' : 'Last name'} <span className="text-red-400">*</span>
                    </label>
                    <input value={form[field]}
                      onChange={e => setForm({ ...form, [field]: e.target.value })}
                      placeholder={i === 0 ? 'Ashan' : 'Kumara'}
                      className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-green-700 transition-colors" />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1.5">
                  Email address <span className="text-red-400">*</span>
                </label>
                <input type="email" value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-green-700 transition-colors" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1.5">
                  Phone number
                </label>
                <input value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  placeholder="+94 77 123 4567"
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-green-700 transition-colors" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1.5">
                  Applying for
                </label>
                <div className="relative">
                  <select value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}
                    className="w-full appearance-none px-3 py-2.5 text-sm border border-gray-200 rounded-lg outline-none cursor-pointer focus:border-green-700 transition-colors">
                    <option value="">Select topic...</option>
                    {SUBJECTS.map(s => <option key={s}>{s}</option>)}
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs">▾</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1.5">
                  Your IELTS score <span className="text-gray-300">(optional)</span>
                </label>
                <input value={form.ielts}
                  onChange={e => setForm({ ...form, ielts: e.target.value })}
                  placeholder="e.g. 6.5"
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-green-700 transition-colors" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1.5">
                  Message <span className="text-red-400">*</span>
                </label>
                <textarea rows={5} value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell the agency about your situation, questions, and timeline..."
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg outline-none resize-none focus:border-green-700 transition-colors" />
              </div>

              {/* Checkbox */}
              <label className="flex items-start gap-3 cursor-pointer">
                <div
                  onClick={() => setForm({ ...form, agree: !form.agree })}
                  className="w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors"
                  style={{
                    borderColor: form.agree ? '#0D5C3A' : '#D1D5DB',
                    backgroundColor: form.agree ? '#0D5C3A' : 'white',
                  }}>
                  {form.agree && <CheckCircle size={10} color="white" />}
                </div>
                <span className="text-xs text-gray-500 leading-relaxed">
                  I agree to be contacted by this agency regarding my application.
                </span>
              </label>

              <button type="submit"
                className="w-full py-3.5 rounded-xl text-white font-bold text-sm hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#0D5C3A' }}>
                Send message
              </button>

              <p className="text-xs text-gray-300 text-center">
                🔒 Your details are kept private and only shared with this verified agency.
              </p>
            </form>
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-72 flex-shrink-0 flex flex-col gap-4">

          {/* Agency summary */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                  style={{ backgroundColor: agency.avatarBg, color: agency.avatarColor }}>
                  {agency.initials}
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900">{agency.name}</div>
                  <div className="text-xs text-gray-400">{agency.location}</div>
                </div>
              </div>
              <span className="text-xl font-bold" style={{ color: '#0D5C3A' }}>{agency.trust}</span>
            </div>
            <div className="flex flex-col gap-2.5 mb-4">
              {agency.scores.map(s => <ScoreBar key={s.label} label={s.label} value={s.value} />)}
            </div>
            <button onClick={() => navigate(`/agencies/${id}`)}
              className="text-xs font-bold flex items-center justify-center gap-1 w-full hover:opacity-80 transition-opacity"
              style={{ color: '#0D5C3A' }}>
              View full profile <ArrowRight size={12} />
            </button>
          </div>

          {/* Response time */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-1">
              <Clock size={15} style={{ color: '#0D5C3A' }} />
              <span className="text-xs text-gray-400">Typical response</span>
            </div>
            <div className="text-sm font-bold text-gray-900 mb-1">{agency.responseTime}</div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-xs" style={{ color: '#0D5C3A' }}>Online now</span>
            </div>
          </div>

          {/* What happens next */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <h3 className="text-sm font-bold text-gray-900 mb-4">What happens next</h3>
            <div className="flex flex-col gap-3">
              {[
                'Agency reviews your message',
                `They contact you within ${agency.responseTime.toLowerCase()}`,
                'Begin your application process',
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                    style={{ backgroundColor: '#0D5C3A' }}>
                    {i + 1}
                  </div>
                  <span className="text-xs text-gray-600 leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}