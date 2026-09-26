import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Globe, FileText, Check } from 'lucide-react'

/* ══════════════════════════════════════
   DATA
══════════════════════════════════════ */
const VISA_DATA = {
  Australia: {
    'Student visa': {
      fee: 'AUD 710', processing: '4-6 weeks',
      workRights: '48 hrs / fortnight', postStudy: 'Eligible 2-4 yrs', approval: '88%',
      docs: [
        { label: 'Valid passport',                  note: 'Must be valid for at least 6 months from arrival.',                      done: true  },
        { label: 'Confirmation of Enrolment (CoE)', note: 'Issued by an Australian education provider for your chosen course.',    done: true  },
        { label: 'IELTS 6.0+ or equivalent',        note: 'Proof of English proficiency required for most academic streams.',      done: true  },
        { label: 'Financial evidence AUD 21,041',   note: 'Evidence of funds to cover living costs, tuition, and travel.',        done: false },
        { label: 'Health insurance (OSHC)',          note: 'Overseas Student Health Cover for the duration of your stay.',         done: false },
        { label: 'Biometrics',                      note: 'Appointment at a local Australian Visa Application Centre.',           done: false },
        { label: 'Statement of purpose',            note: 'Detailed explanation of your Genuine Temporary Entrant (GTE) status.', done: false },
      ],
    },
    'Work visa': {
      fee: 'AUD 315', processing: '3-4 months',
      workRights: 'Full time', postStudy: 'N/A', approval: '76%',
      docs: [
        { label: 'Valid passport',             note: '6+ months validity required.',              done: true  },
        { label: 'Skills assessment',          note: 'From the relevant assessing body.',         done: true  },
        { label: 'English test (IELTS 6.0+)', note: 'Competent English required.',               done: false },
        { label: 'Employment sponsorship',     note: 'From an approved Australian employer.',     done: false },
        { label: 'Health examination',         note: 'Panel physician approved.',                 done: false },
      ],
    },
    'Visit visa': {
      fee: 'AUD 145', processing: '2-4 weeks',
      workRights: 'Not permitted', postStudy: 'N/A', approval: '91%',
      docs: [
        { label: 'Valid passport',         note: '6+ months validity.',           done: true  },
        { label: 'Bank statements (3 mo)', note: 'Show sufficient funds.',         done: true  },
        { label: 'Travel itinerary',       note: 'Planned dates and activities.',  done: false },
        { label: 'Return flight booking',  note: 'Proof of onward travel.',        done: false },
        { label: 'Accommodation proof',    note: 'Hotel or host invitation.',      done: false },
      ],
    },
  },
  Canada: {
    'Student visa': {
      fee: 'CAD 150', processing: '8-12 weeks',
      workRights: '20 hrs / week', postStudy: 'Up to 3 years', approval: '83%',
      docs: [
        { label: 'Valid passport',          note: 'Must cover entire study period.',         done: true  },
        { label: 'Acceptance letter (DLI)', note: 'From a Designated Learning Institution.', done: true  },
        { label: 'Proof of funds',          note: 'CAD 10,000 min + first year tuition.',   done: false },
        { label: 'IELTS / English test',    note: 'Band 6.0+ required.',                   done: false },
        { label: 'Biometrics',             note: 'At VAC or ASC.',                           done: false },
      ],
    },
    'Work visa': {
      fee: 'CAD 155', processing: '2-5 months',
      workRights: 'Full time', postStudy: 'N/A', approval: '72%',
      docs: [
        { label: 'Job offer letter (LMIA)', note: 'From an approved Canadian employer.', done: true  },
        { label: 'Valid passport',          note: '6+ months validity.',                  done: true  },
        { label: 'Language test results',   note: 'IELTS 5.0+ for most jobs.',           done: false },
        { label: 'Medical clearance',       note: 'If required by IRCC.',                done: false },
      ],
    },
    'Visit visa': {
      fee: 'CAD 100', processing: '2-4 weeks',
      workRights: 'Not permitted', postStudy: 'N/A', approval: '64%',
      docs: [
        { label: 'Valid passport',   note: '6 months beyond intended stay.', done: true  },
        { label: 'Bank statements',  note: 'Show sufficient funds.',          done: false },
        { label: 'Travel itinerary', note: 'Planned activities.',             done: false },
      ],
    },
  },
  'United Kingdom': {
    'Student visa': {
      fee: 'GBP 490', processing: '3 weeks',
      workRights: '20 hrs / week', postStudy: '2 years', approval: '85%',
      docs: [
        { label: 'Valid passport',           note: 'Must be valid during study period.',             done: true  },
        { label: 'CAS number',               note: 'Confirmation of Acceptance for Studies.',        done: true  },
        { label: 'IELTS 6.0+ (B2 English)', note: 'Required for most UK universities.',             done: true  },
        { label: 'Financial evidence',       note: 'GBP 1,334/month for up to 9 months in London.', done: false },
        { label: 'Tuberculosis test',        note: 'If from a listed country.',                      done: false },
        { label: 'Biometrics',              note: 'At a UK Visa Application Centre.',                done: false },
      ],
    },
    'Work visa': {
      fee: 'GBP 610', processing: '3-8 weeks',
      workRights: 'Full time', postStudy: 'N/A', approval: '80%',
      docs: [
        { label: 'Certificate of Sponsorship', note: 'From a licensed UK employer.',   done: true  },
        { label: 'Valid passport',             note: '6+ months validity.',              done: true  },
        { label: 'English proficiency',        note: 'IELTS 6.0+ or equivalent.',       done: false },
        { label: 'Financial evidence',         note: 'GBP 1,270 savings minimum.',      done: false },
      ],
    },
    'Visit visa': {
      fee: 'GBP 115', processing: '3 weeks',
      workRights: 'Not permitted', postStudy: 'N/A', approval: '78%',
      docs: [
        { label: 'Valid passport',  note: 'Must be valid.',              done: true  },
        { label: 'Bank statements', note: 'Demonstrate financial means.', done: false },
        { label: 'Proof of ties',   note: 'Evidence you will return.',    done: false },
      ],
    },
  },
  Germany: {
    'Student visa': {
      fee: 'EUR 75', processing: '4-12 weeks',
      workRights: '20 hrs / week', postStudy: '18 months', approval: '79%',
      docs: [
        { label: 'Valid passport',               note: '6+ months validity.',                     done: true  },
        { label: 'University admission letter',  note: 'From a German Hochschule.',               done: true  },
        { label: 'Blocked account (Sperrkonto)', note: 'EUR 11,208 / year minimum.',             done: false },
        { label: 'Language proficiency',         note: 'German or English depending on course.',  done: false },
        { label: 'Health insurance proof',       note: 'German public or private insurance.',     done: false },
      ],
    },
    'Work visa': {
      fee: 'EUR 75', processing: '4-8 weeks',
      workRights: 'Full time', postStudy: 'N/A', approval: '74%',
      docs: [
        { label: 'Employment contract',       note: 'From a German employer.',          done: true  },
        { label: 'Recognised qualifications', note: 'Credential recognition required.', done: false },
        { label: 'German language skills',    note: 'B1 level recommended.',            done: false },
      ],
    },
    'Visit visa': {
      fee: 'EUR 80', processing: '2-3 weeks',
      workRights: 'Not permitted', postStudy: 'N/A', approval: '83%',
      docs: [
        { label: 'Valid passport',      note: 'Valid 3 months beyond stay.',  done: true  },
        { label: 'Travel insurance',    note: 'EUR 30,000 coverage minimum.', done: false },
        { label: 'Accommodation proof', note: 'Hotel or invitation letter.',   done: false },
      ],
    },
  },
  'New Zealand': {
    'Student visa': {
      fee: 'NZD 375', processing: '4-6 weeks',
      workRights: '20 hrs / week', postStudy: 'Up to 3 years', approval: '90%',
      docs: [
        { label: 'Valid passport',         note: '6+ months validity.',              done: true  },
        { label: 'Offer of place letter',  note: 'From a New Zealand institution.',  done: true  },
        { label: 'Funds evidence',         note: 'NZD 15,000 minimum per year.',     done: false },
        { label: 'English proficiency',    note: 'IELTS 5.5+ required.',            done: false },
        { label: 'Medical / police check', note: 'For stays over 12 months.',       done: false },
      ],
    },
    'Work visa': {
      fee: 'NZD 495', processing: '4-8 weeks',
      workRights: 'Full time', postStudy: 'N/A', approval: '78%',
      docs: [
        { label: 'Job offer letter', note: 'From a New Zealand employer.',  done: true  },
        { label: 'Valid passport',   note: '6+ months validity.',            done: true  },
        { label: 'Skills evidence',  note: 'Qualifications and experience.', done: false },
      ],
    },
    'Visit visa': {
      fee: 'NZD 211', processing: '2-4 weeks',
      workRights: 'Not permitted', postStudy: 'N/A', approval: '88%',
      docs: [
        { label: 'Valid passport',   note: '3 months beyond stay.',  done: true  },
        { label: 'Return ticket',    note: 'Proof of onward travel.', done: false },
        { label: 'Sufficient funds', note: 'NZD 1,000/month min.',   done: false },
      ],
    },
  },
}

/* always-visible comparison cards */
const COMPARE = [
  {
    name: 'Australia',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80',
    minFunds: '$21,041', ielts: '6.0+', stayPeriod: 'Course length', popular: false,
  },
  {
    name: 'Canada',
    image: 'https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=600&q=80',
    minFunds: '$10,000+', ielts: '6.0+', stayPeriod: 'Up to 3 yrs post-grad', popular: true,
  },
  {
    name: 'United Kingdom',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80',
    minFunds: '£12,006+', ielts: '5.5+', stayPeriod: '2 yrs post-grad', popular: false,
  },
]

const COUNTRIES = Object.keys(VISA_DATA)

/* ══════════════════════════════════════
   FOOTER (only on Visas page bottom)
══════════════════════════════════════ */
import { Link } from 'react-router-dom'
import { Globe as GlobeIcon, Mail } from 'lucide-react'

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 pt-14 pb-6 mt-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-4 gap-10 mb-12">
          <div>
            <div className="text-white font-bold text-xl mb-3">Agency</div>
            <p className="text-sm text-gray-500 leading-relaxed mb-5">
              The ultimate destination for Sri Lankans seeking truthful guidance on international opportunities.
            </p>
            <div className="flex gap-3">
              <GlobeIcon size={17} className="text-gray-500 hover:text-white cursor-pointer transition-colors" />
              <Mail size={17} className="text-gray-500 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest font-semibold text-gray-400 mb-5">Navigation</div>
            {[
              { to: '/countries',    label: 'Destinations'     },
              { to: '/universities', label: 'University Finder' },
              { to: '/agencies',     label: 'Verified Agencies' },
              { to: '/scholarships', label: 'Scholarships'      },
            ].map(({ to, label }) => (
              <Link key={label} to={to} className="block text-sm py-1.5 text-gray-400 hover:text-white transition-colors">{label}</Link>
            ))}
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest font-semibold text-gray-400 mb-5">Resources</div>
            {[
              { to: '/visas',       label: 'Visa Guide'        },
              { to: '/eligibility', label: 'IELTS Preparation' },
              { to: '/report',      label: 'Fraud Prevention'  },
              { to: '/',            label: 'Contact Support'   },
            ].map(({ to, label }) => (
              <Link key={label} to={to} className="block text-sm py-1.5 text-gray-400 hover:text-white transition-colors">{label}</Link>
            ))}
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest font-semibold text-gray-400 mb-5">Legal</div>
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(label => (
              <span key={label} className="block text-sm py-1.5 text-gray-400 hover:text-white cursor-pointer transition-colors">{label}</span>
            ))}
          </div>
        </div>
        <div className="border-t border-gray-800 pt-5 flex justify-between items-center">
          <p className="text-xs text-gray-600">© 2024 Agency. All rights reserved. Your expert companion for global mobility.</p>
          <div className="flex gap-6 text-xs text-gray-500">
            {['Privacy Policy', 'Terms of Service', 'Fraud Prevention'].map(l => (
              <span key={l} className="hover:text-white cursor-pointer transition-colors">{l}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ══════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════ */
export default function Visas() {
  const navigate = useNavigate()

  const [country,  setCountry]  = useState('')
  const [visaType, setVisaType] = useState('')
  const [searched, setSearched] = useState(false)
  const [result,   setResult]   = useState(null)

  const previewCountry  = country  || 'Australia'
  const previewVisaType = visaType || 'Student visa'
  const previewData     = VISA_DATA[previewCountry]?.[previewVisaType]
  const visaTypes       = country ? Object.keys(VISA_DATA[country]) : []
  const canSearch       = country !== '' && visaType !== ''
  const displayData     = searched ? result : previewData

  function handleCountryChange(c) {
    setCountry(c)
    setVisaType('')
    setSearched(false)
    setResult(null)
  }

  function handleVisaTypeChange(v) {
    setVisaType(v)
    setSearched(false)
    setResult(null)
  }

  function handleSearch() {
    if (!canSearch) return
    const data = VISA_DATA[country]?.[visaType]
    if (data) {
      setResult({ country, visaType, ...data })
      setSearched(true)
    }
  }

  return (
    <>
      <div style={{ backgroundColor: '#F0F7F4' }} className="min-h-screen">
        <div className="max-w-5xl mx-auto px-6 py-8">

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Find the right visa for your goal
          </h1>

          {/* Filter bar */}
          <div className="bg-white rounded-xl border border-gray-200 flex items-stretch mb-8 overflow-hidden shadow-sm">
            {/* Destination */}
            <div className="flex items-center gap-3 flex-1 px-5 py-4 border-r border-gray-200">
              <GlobeIcon size={18} className="text-gray-400 flex-shrink-0" />
              <div className="flex-1">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Destination</div>
                <select
                  value={country}
                  onChange={e => handleCountryChange(e.target.value)}
                  className="w-full text-sm font-semibold bg-transparent outline-none cursor-pointer appearance-none"
                  style={{ color: country ? '#111827' : '#9CA3AF' }}
                >
                  <option value="" disabled>Select country</option>
                  {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            {/* Visa type */}
            <div className="flex items-center gap-3 flex-1 px-5 py-4" style={{ opacity: country ? 1 : 0.45 }}>
              <FileText size={18} className="text-gray-400 flex-shrink-0" />
              <div className="flex-1">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Visa Type</div>
                <select
                  value={visaType}
                  onChange={e => handleVisaTypeChange(e.target.value)}
                  disabled={!country}
                  className="w-full text-sm font-semibold bg-transparent outline-none cursor-pointer appearance-none disabled:cursor-not-allowed"
                  style={{ color: visaType ? '#111827' : '#9CA3AF' }}
                >
                  <option value="" disabled>Select visa type</option>
                  {visaTypes.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
            </div>

            {/* Search */}
            <button
              onClick={handleSearch}
              disabled={!canSearch}
              className="flex items-center gap-2 px-10 text-white font-bold text-sm flex-shrink-0 transition-all duration-200"
              style={{
                backgroundColor: canSearch ? '#0D5C3A' : '#A8CFC0',
                cursor: canSearch ? 'pointer' : 'not-allowed',
              }}
            >
              <Search size={16} />
              Search
            </button>
          </div>

          {/* Requirements + Key details — always visible, muted until searched */}
          {displayData && (
            <div className="grid grid-cols-5 gap-6 mb-12">

              {/* LEFT checklist */}
              <div className="col-span-3 bg-white rounded-2xl border p-6 transition-all duration-500"
                style={{ borderColor: searched ? '#E5E7EB' : '#F3F4F6' }}>

                <h2 className="text-lg font-bold mb-6 transition-colors duration-500"
                  style={{ color: searched ? '#111827' : '#C4CDD5' }}>
                  {searched
                    ? `${result.country} — ${result.visaType} requirements`
                    : '— — — requirements'
                  }
                </h2>

                <div className="flex flex-col">
                  {displayData.docs.map((doc, i) => (
                    <div key={i} className="flex items-start gap-4 py-4 border-b border-gray-100 last:border-0">
                      {searched && doc.done ? (
                        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ backgroundColor: '#0D5C3A' }}>
                          <Check size={14} color="white" strokeWidth={3} />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{
                            borderColor:     searched ? '#D1D5DB' : '#E9ECEF',
                            backgroundColor: searched ? 'white'   : '#F8F9FA',
                          }}>
                          <span className="text-xs font-bold"
                            style={{ color: searched ? '#9CA3AF' : '#CED4DA' }}>
                            {i + 1}
                          </span>
                        </div>
                      )}
                      <div>
                        <div className="text-sm font-semibold mb-0.5 transition-colors duration-500"
                          style={{ color: searched ? '#111827' : '#ADB5BD' }}>
                          {doc.label}
                        </div>
                        <div className="text-xs leading-relaxed transition-colors duration-500"
                          style={{ color: searched ? '#9CA3AF' : '#CED4DA' }}>
                          {doc.note}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Hint shown before search */}
                {!searched && (
                  <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                    <p className="text-xs text-gray-300">
                      Select destination & visa type, then click{' '}
                      <span className="font-bold" style={{ color: '#0D5C3A' }}>Search</span>
                      {' '}to activate requirements
                    </p>
                  </div>
                )}
              </div>

              {/* RIGHT key details */}
              <div className="col-span-2">
                <div className="bg-white rounded-2xl border p-6 transition-all duration-500"
                  style={{ borderColor: searched ? '#E5E7EB' : '#F3F4F6' }}>
                  <h3 className="text-base font-bold mb-5 transition-colors duration-500"
                    style={{ color: searched ? '#111827' : '#ADB5BD' }}>
                    Key details
                  </h3>

                  {[
                    { label: 'Visa fee',        value: displayData.fee,        type: 'bold'  },
                    { label: 'Processing time', value: displayData.processing, type: 'bold'  },
                    { label: 'Work rights',     value: displayData.workRights, type: 'bold'  },
                    { label: 'Post-study visa', value: displayData.postStudy,  type: 'badge' },
                    { label: 'Approval rate',   value: displayData.approval,   type: 'green' },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center justify-between py-3.5 border-b border-gray-100 last:border-0">
                      <span className="text-sm transition-colors duration-500"
                        style={{ color: searched ? '#6B7280' : '#C4CDD5' }}>
                        {row.label}
                      </span>
                      {searched ? (
                        row.type === 'badge' ? (
                          <span className="text-xs font-bold text-white px-3 py-1 rounded-lg"
                            style={{ backgroundColor: '#0D5C3A' }}>
                            {row.value}
                          </span>
                        ) : row.type === 'green' ? (
                          <span className="text-sm font-bold" style={{ color: '#0D5C3A' }}>{row.value}</span>
                        ) : (
                          <span className="text-sm font-bold text-gray-900">{row.value}</span>
                        )
                      ) : (
                        <span className="text-sm font-bold" style={{ color: '#CED4DA' }}>—</span>
                      )}
                    </div>
                  ))}

                  <button
                    onClick={() => searched && navigate('/eligibility')}
                    className="w-full mt-5 py-3.5 rounded-xl text-white font-bold text-sm transition-all duration-300"
                    style={{
                      backgroundColor: searched ? '#0D5C3A' : '#CED4DA',
                      cursor: searched ? 'pointer' : 'not-allowed',
                    }}>
                    Check my eligibility
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── Side-by-side comparison — ALWAYS visible ── */}
          <div className="pb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Side-by-side comparison</h2>
            <div className="grid grid-cols-3 gap-5">
              {COMPARE.map(c => (
                <div key={c.name} className="bg-white rounded-2xl overflow-hidden transition-shadow hover:shadow-md"
                  style={{ border: c.popular ? '2px solid #0D5C3A' : '1px solid #E5E7EB' }}>
                  {c.popular && (
                    <div className="flex justify-center pt-3">
                      <span className="text-xs font-bold text-white px-4 py-1.5 rounded-full flex items-center gap-1"
                        style={{ backgroundColor: '#0D5C3A' }}>
                        ★ Most popular
                      </span>
                    </div>
                  )}
                  <div className="mx-3 mt-3 rounded-xl overflow-hidden h-44 bg-gray-100">
                    <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5">
                    <div className="text-lg font-bold text-gray-900 mb-4">{c.name}</div>
                    {[
                      { label: 'Min. Funds',  value: c.minFunds,   bold: false },
                      { label: 'IELTS',       value: c.ielts,      bold: false },
                      { label: 'Stay Period', value: c.stayPeriod, bold: true  },
                    ].map((row, i) => (
                      <div key={i} className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0">
                        <span className="text-sm text-gray-500">{row.label}</span>
                        <span className={`text-sm ${row.bold ? 'font-bold text-gray-900' : 'text-gray-700'}`}>
                          {row.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── FOOTER — shown on Visas page ── */}
      
    </>
  )
}