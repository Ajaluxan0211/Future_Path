import { useNavigate, useParams, Link } from 'react-router-dom'
import {
  Phone, Mail, MapPin, Globe, CheckCircle,
  Clock, Star, Shield, AlertTriangle, Map,
  ArrowRight, SlidersHorizontal, Info
} from 'lucide-react'

/* ══════════════════════════════════════
   AGENCY DATA — keyed by id
══════════════════════════════════════ */
const AGENCIES = {
  1: {
    initials: 'VG', name: 'Visa Global Consultants',
    avatarBg: '#EEF2FF', avatarColor: '#3730A3',
    location: 'Colombo, Sri Lanka', est: '2014',
    license: 'VG-20140892', cases: '420+',
    trust: 87, rating: 4.3, reviews: 47,
    tags: ['Student visa', 'Work visa'],
    scores: [
      { label: 'Gov registration',  value: 95 },
      { label: 'User reviews',      value: 86 },
      { label: 'Successful cases',  value: 82 },
      { label: 'Years in operation',value: 80 },
    ],
    cert: 'Fully certified against national foreign employment databases.',
    contact: {
      phone: '+94 11 234 5678',
      email: 'info@visaglobal.lk',
      address: 'Level 5, Unity Plaza, Galle Road, Colombo 04',
      website: 'www.visaglobal.lk',
    },
    services: [
      'Student visa applications',
      'Work visa applications',
      'University admissions',
      'Document preparation',
      'IELTS guidance',
    ],
    hours: {
      weekday: '9:00 AM – 5:00 PM',
      saturday: '9:00 AM – 1:00 PM',
      sunday: 'Closed',
      status: 'Open Now (Local Time GMT+5:30)',
    },
    hq: 'Kollupitiya',
    city: 'Colombo 04',
    clientReviews: [
      {
        initials: 'AK', name: 'Ashan Kumara', bg: '#DBEAFE', color: '#1D4ED8',
        subtitle: 'Melbourne Student Visa subclass 500',
        date: 'March 2024', stars: 5,
        text: 'I used Agency to verify my consultant before paying any fees. The trust score helped me avoid a fraudulent agency. The entire visa submission with Visa Global was transparent and completed in record time.',
        outcome: 'Visa Granted',
      },
      {
        initials: 'NR', name: 'Nimesha R.', bg: '#FEF3C7', color: '#D97706',
        subtitle: 'UK Skilled Worker Program',
        date: 'January 2024', stars: 4,
        text: 'Visa Global handled my Australian student visa with complete transparency. Every document submission was verified and tracked properly through Agency. Clear timeline expectation and no surprise costs.',
        outcome: 'Visa Granted',
      },
      {
        initials: 'SP', name: 'Sachini P.', bg: '#CCFBF1', color: '#0D9488',
        subtitle: 'Canada Study Permit',
        date: 'November 2023', stars: 5,
        text: 'Super responsive team. They guided me through the COE acquisition and biometrics appointments step-by-step. Received visa in 5 weeks without any unnecessary hassle. Highly recommend their services.',
        outcome: 'Visa Granted',
      },
    ],
  },
  2: {
    initials: 'OE', name: 'Overseas Education Lanka',
    avatarBg: '#EBF7F1', avatarColor: '#0D5C3A',
    location: 'Kandy, Sri Lanka', est: '2011',
    license: 'OE-20110456', cases: '680+',
    trust: 92, rating: 4.6, reviews: 83,
    tags: ['Student visa', 'Work visa', 'All visa types'],
    scores: [
      { label: 'Gov registration',  value: 98 },
      { label: 'User reviews',      value: 91 },
      { label: 'Successful cases',  value: 89 },
      { label: 'Years in operation',value: 90 },
    ],
    cert: 'Top-rated agency with government accreditation in Sri Lanka.',
    contact: {
      phone: '+94 81 223 4567',
      email: 'info@overseaslanka.lk',
      address: '12 Peradeniya Road, Kandy 20000',
      website: 'www.overseaslanka.lk',
    },
    services: [
      'Student visa applications',
      'Work visa applications',
      'University admissions',
      'Scholarship guidance',
      'PR pathway consulting',
    ],
    hours: {
      weekday: '8:30 AM – 5:30 PM',
      saturday: '9:00 AM – 2:00 PM',
      sunday: 'Closed',
      status: 'Open Now (Local Time GMT+5:30)',
    },
    hq: 'Kandy',
    city: 'Kandy 20000',
    clientReviews: [
      {
        initials: 'DK', name: 'Dilshan K.', bg: '#DBEAFE', color: '#1D4ED8',
        subtitle: 'Australian Student Visa subclass 500',
        date: 'April 2024', stars: 5,
        text: 'Outstanding service from start to finish. The team at Overseas Education Lanka handled every document with care and kept me informed at every step. Got my visa approved in just 4 weeks.',
        outcome: 'Visa Granted',
      },
      {
        initials: 'PM', name: 'Priya M.', bg: '#F3E8FF', color: '#7C3AED',
        subtitle: 'Canada Student Permit',
        date: 'February 2024', stars: 5,
        text: 'Best agency experience I have ever had. They were upfront about all costs and there were zero hidden fees. My documents were prepared perfectly and submitted on time.',
        outcome: 'Permit Approved',
      },
    ],
  },
  3: {
    initials: 'GE', name: 'Global Education Services',
    avatarBg: '#F5F3FF', avatarColor: '#7C3AED',
    location: 'Colombo, Sri Lanka', est: '2016',
    license: 'GE-20160789', cases: '180+',
    trust: 78, rating: 4.1, reviews: 29,
    tags: ['Student visa', 'Work visa'],
    scores: [
      { label: 'Gov registration',  value: 88 },
      { label: 'User reviews',      value: 79 },
      { label: 'Successful cases',  value: 76 },
      { label: 'Years in operation',value: 70 },
    ],
    cert: 'Registered with Sri Lanka Bureau of Foreign Employment.',
    contact: {
      phone: '+94 11 456 7890',
      email: 'info@globaledu.lk',
      address: '34 Galle Road, Colombo 03',
      website: 'www.globaledu.lk',
    },
    services: [
      'Student visa applications',
      'University admissions',
      'Document preparation',
      'IELTS guidance',
    ],
    hours: {
      weekday: '9:00 AM – 5:00 PM',
      saturday: '10:00 AM – 1:00 PM',
      sunday: 'Closed',
      status: 'Open Now (Local Time GMT+5:30)',
    },
    hq: 'Colombo 03',
    city: 'Colombo 03',
    clientReviews: [
      {
        initials: 'RJ', name: 'Raveena J.', bg: '#FEE2E2', color: '#DC2626',
        subtitle: 'UK Student Visa',
        date: 'March 2024', stars: 4,
        text: 'Good service overall. The team was helpful with document preparation and the visa was approved. Communication could have been better at times but everything worked out in the end.',
        outcome: 'Visa Granted',
      },
    ],
  },
}

function Stars({ count, total = 5 }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: total }).map((_, i) => (
        <Star key={i} size={14}
          fill={i < count ? '#F59E0B' : 'none'}
          style={{ color: '#F59E0B' }} />
      ))}
    </div>
  )
}

function ScoreBar({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-xs text-gray-500 w-32 flex-shrink-0">{label}</span>
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${value}%`, backgroundColor: '#0D5C3A' }} />
      </div>
      <span className="text-xs font-bold text-gray-700 w-8 text-right">{value}%</span>
    </div>
  )
}

export default function AgencyProfile() {
  const navigate = useNavigate()
  const { id }   = useParams()
  const agency   = AGENCIES[id] || AGENCIES[Number(id)] || AGENCIES[1]

  return (
    <div className="bg-white min-h-screen flex flex-col">

      {/* ── Breadcrumb ── */}
      <div className="border-b border-gray-100 px-8 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-sm text-gray-400">
          <Link to="/agencies" className="hover:text-gray-600 transition-colors">Agencies</Link>
          <span className="text-gray-300">›</span>
          <span className="font-semibold text-gray-900">{agency.name}</span>
        </div>
      </div>

      {/* ── Agency header ── */}
      <div className="border-b border-gray-100 px-8 py-7">
        <div className="max-w-6xl mx-auto flex items-start justify-between gap-6">
          <div className="flex items-start gap-5">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-xl flex-shrink-0"
              style={{ backgroundColor: agency.avatarBg, color: agency.avatarColor }}>
              {agency.initials}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold text-gray-900">{agency.name}</h1>
                <span className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: '#EBF7F1', color: '#0D5C3A', border: '1px solid #A8DFC4' }}>
                  <CheckCircle size={12} /> Gov Approved
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-3">
                {agency.location}
                <span className="mx-2 text-gray-300">·</span>
                Est. {agency.est}
                <span className="mx-2 text-gray-300">·</span>
                License #{agency.license}
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: '#EBF7F1', color: '#0D5C3A', border: '1px solid #A8DFC4' }}>
                  <Shield size={11} /> Verified Agency
                </span>
                {agency.tags.map(tag => (
                  <span key={tag} className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">
                    {tag}
                  </span>
                ))}
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">
                  {agency.cases} cases
                </span>
              </div>
            </div>
          </div>

          {/* Trust score */}
          <div className="text-right flex-shrink-0">
            <div className="flex items-baseline gap-1 justify-end">
              <span className="text-5xl font-bold text-gray-900">{agency.trust}</span>
              <span className="text-lg text-gray-400">/ 100</span>
            </div>
            <p className="text-xs text-gray-400 mb-2">Trust Score Metric</p>
            <div className="flex items-center justify-end gap-2">
              <Stars count={Math.round(agency.rating)} />
              <span className="text-sm text-gray-600">{agency.rating} ({agency.reviews} reviews)</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="flex-1" style={{ backgroundColor: '#F8FAFA' }}>
        <div className="max-w-6xl mx-auto px-8 py-8 grid grid-cols-12 gap-6">

          {/* LEFT sidebar */}
          <div className="col-span-3 flex flex-col gap-4">

            {/* Trust breakdown */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-gray-900">Trust score breakdown</h3>
                <Info size={14} className="text-gray-400" />
              </div>
              <div className="flex flex-col gap-3">
                {agency.scores.map(s => <ScoreBar key={s.label} label={s.label} value={s.value} />)}
              </div>
              <div className="mt-4 p-3 rounded-xl flex items-start gap-2"
                style={{ backgroundColor: '#EBF7F1' }}>
                <Shield size={14} style={{ color: '#0D5C3A' }} className="flex-shrink-0 mt-0.5" />
                <p className="text-xs text-gray-600 leading-relaxed">{agency.cert}</p>
              </div>
            </div>

            {/* Contact info */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-4">Contact information</h3>
              <div className="flex flex-col gap-3">
                {[
                  { icon: Phone,  text: agency.contact.phone   },
                  { icon: Mail,   text: agency.contact.email   },
                  { icon: MapPin, text: agency.contact.address },
                  { icon: Globe,  text: agency.contact.website },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-start gap-2.5">
                    <Icon size={14} className="text-gray-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 leading-relaxed">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-4">Services offered</h3>
              <div className="flex flex-col gap-2.5">
                {agency.services.map(s => (
                  <div key={s} className="flex items-center gap-2.5">
                    <CheckCircle size={15} style={{ color: '#0D5C3A' }} />
                    <span className="text-sm font-semibold text-gray-800">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* MIDDLE — reviews */}
          <div className="col-span-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Client reviews</h2>
                <p className="text-xs text-gray-400 mt-0.5">Authentic feedback from verified candidates</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-gray-700">{agency.rating} overall</span>
                <Stars count={Math.round(agency.rating)} />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {agency.clientReviews.map((r, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                        style={{ backgroundColor: r.bg, color: r.color }}>
                        {r.initials}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-gray-900">{r.name}</div>
                        <div className="text-xs text-gray-400">{r.subtitle}</div>
                        <Stars count={r.stars} />
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">{r.date}</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{r.text}</p>
                  <div className="flex items-center justify-between px-4 py-2.5 rounded-xl border border-gray-100"
                    style={{ backgroundColor: '#F9FAFB' }}>
                    <span className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: '#0D5C3A' }}>
                      <CheckCircle size={13} /> Verified review
                    </span>
                    <span className="text-xs text-gray-500">Outcome: {r.outcome}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Consumer protection */}
            <div className="mt-4 bg-white rounded-2xl border border-gray-200 p-5 flex items-start gap-3">
              <Shield size={18} className="text-gray-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-bold text-gray-900 mb-1">Consumer Protection Promise</div>
                <div className="text-xs text-gray-500 leading-relaxed">
                  All client reviews are matched against national identity records to prevent spam or unverified assertions.
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT sidebar */}
          <div className="col-span-3 flex flex-col gap-4">

            {/* Apply through */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-2">Apply through this agency</h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-4">
                Track your documentation and guarantee milestone payments safely via the Agency platform.
              </p>
              <button onClick={() => navigate(`/agencies/${id}/contact`)}
                className="w-full py-3 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 hover:opacity-90 transition-opacity mb-2"
                style={{ backgroundColor: '#0D5C3A' }}>
                <ArrowRight size={15} /> Contact agency
              </button>
              <button
                className="w-full py-3 rounded-xl font-bold text-sm border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <SlidersHorizontal size={14} /> View full checklist
              </button>
            </div>

            {/* Working hours */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={15} className="text-gray-500" />
                <h3 className="text-sm font-bold text-gray-900">Working hours</h3>
              </div>
              <div className="flex flex-col gap-2.5">
                {[
                  { day: 'Mon – Fri', hours: agency.hours.weekday  },
                  { day: 'Saturday',  hours: agency.hours.saturday },
                  { day: 'Sunday',    hours: agency.hours.sunday, grey: true },
                ].map(row => (
                  <div key={row.day} className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{row.day}</span>
                    <span className={`text-xs font-semibold ${row.grey ? 'text-gray-400' : 'text-gray-800'}`}>
                      {row.hours}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1.5 mt-3">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-xs" style={{ color: '#0D5C3A' }}>{agency.hours.status}</span>
              </div>
            </div>

            {/* Headquarters */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-gray-900">Headquarters</h3>
                <span className="text-xs text-gray-500">{agency.hq}</span>
              </div>
              {/* Map placeholder */}
              <div className="rounded-xl overflow-hidden h-28 flex items-center justify-center mb-2"
                style={{ backgroundColor: '#E8F4F8', border: '1px solid #D1E9F0' }}>
                <div className="flex flex-col items-center text-gray-400">
                  <Map size={28} className="mb-1" />
                  <span className="text-xs">{agency.city}</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 text-center">{agency.city}</p>
            </div>

            {/* Report link */}
            <button className="flex items-center justify-center gap-1.5 text-xs text-red-500 hover:text-red-600 transition-colors">
              <AlertTriangle size={13} />
              Report this agency to regulators
            </button>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-8 py-5 flex items-center justify-between">
          <p className="text-xs text-gray-500">© 2024 Agency. All rights reserved. Your trusted migration partner.</p>
          <div className="flex items-center gap-6 text-xs text-gray-500">
            {['Privacy Policy', 'Terms of Service', 'Legal', 'Contact Support'].map(l => (
              <span key={l} className="hover:text-gray-700 cursor-pointer transition-colors">{l}</span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}