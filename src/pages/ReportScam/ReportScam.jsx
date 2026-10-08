import { useState } from 'react'
import {
  AlertTriangle,
  FileText,
  MapPin,
  XCircle,
  Globe,
  Clock,
  Send,
  ShieldAlert,
} from 'lucide-react'

const COMPLAINT_TYPES = [
  'Select a category',
  'Fake visa promise',
  'Fraudulent payment request',
  'Fake documents',
  'Unlicensed agency',
  'Misleading information',
  'Poor service',
  'Other',
]

const COMMUNITY_ALERTS = [
  {
    name: 'Universal Path Ltd.',
    status: 'URGENT',
    statusBg: '#FEE2E2',
    statusColor: '#B91C1C',
    description:
      'Reporting massive upfront fees for "guaranteed" Work Visas in Canada. Multiple victims reported ghosting.',
    location: 'Dubai, UAE',
    time: '2 hours ago',
  },
  {
    name: 'Visa Express Hub',
    status: 'INVESTIGATING',
    statusBg: '#D1FAE5',
    statusColor: '#047857',
    description:
      'Inconsistency in document requirements and requests for personal banking passwords via WhatsApp.',
    location: 'Mumbai, India',
    time: '5 hours ago',
  },
  {
    name: 'EuroMigration Pros',
    status: 'URGENT',
    statusBg: '#FEE2E2',
    statusColor: '#B91C1C',
    description:
      'Fake government endorsement seals used in brochures. Report of identity theft via "intake forms".',
    location: 'Lagos, Nigeria',
    time: '1 day ago',
  },
]

export default function ReportScam() {
  const [agencyName, setAgencyName] = useState('')
  const [location, setLocation] = useState('')
  const [complaintType, setComplaintType] = useState('Select a category')
  const [description, setDescription] = useState('')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!agencyName || !location || complaintType === 'Select a category' || !description) {
      alert('Please complete all required fields.')
      return
    }

    alert('Your report has been submitted successfully.')

    setAgencyName('')
    setLocation('')
    setComplaintType('Select a category')
    setDescription('')
    setFullName('')
    setEmail('')
  }

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: '#F0F7F4' }}
    >

      {/* =====================================================
          RED HEADER
      ===================================================== */}
      <section
        className="w-full"
        style={{
          background: 'linear-gradient(90deg, #C91414 0%, #981B1B 100%)',
        }}
      >
        <div className="max-w-5xl mx-auto px-6 py-8">

          <div className="flex items-center gap-5">

            {/* Icon */}
            <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center flex-shrink-0">
              <AlertTriangle
                size={30}
                strokeWidth={2.5}
                style={{ color: '#C91414' }}
              />
            </div>

            {/* Heading */}
            <div>
              <h1 className="text-3xl font-bold text-white leading-tight">
                Report a Scam & Fraudulent Agency
              </h1>

              <p className="text-sm text-white/90 mt-2">
                Help us protect the migration community by reporting suspicious behavior.
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}
      <main className="max-w-5xl mx-auto px-6 py-8">

        <div className="flex gap-6 items-start">

          {/* =================================================
              LEFT - REPORT FORM
          ================================================= */}
          <div className="flex-1">

            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7"
            >

              {/* Form heading */}
              <div className="flex items-center gap-3 mb-6">

                <FileText
                  size={21}
                  style={{ color: '#0D8060' }}
                />

                <h2 className="text-lg font-bold text-gray-900">
                  Incident Details
                </h2>

              </div>


              {/* ============================================
                  AGENCY NAME + LOCATION
              ============================================ */}
              <div className="grid grid-cols-2 gap-4 mb-5">

                {/* Agency Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wide text-gray-700 mb-2">
                    Agency Name
                  </label>

                  <input
                    type="text"
                    value={agencyName}
                    onChange={(e) => setAgencyName(e.target.value)}
                    placeholder="e.g. Global Visa Partners"
                    className="w-full px-3 py-2.5 text-sm rounded-lg border border-gray-200 outline-none transition-colors focus:border-green-700"
                    style={{ backgroundColor: '#F0F7F4' }}
                  />
                </div>


                {/* Location */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wide text-gray-700 mb-2">
                    Location
                  </label>

                  <div className="relative">

                    <MapPin
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="City or Country"
                      className="w-full pl-10 pr-3 py-2.5 text-sm rounded-lg border border-gray-200 outline-none transition-colors focus:border-green-700"
                      style={{ backgroundColor: '#F0F7F4' }}
                    />

                  </div>
                </div>

              </div>


              {/* ============================================
                  COMPLAINT TYPE
              ============================================ */}
              <div className="mb-5">

                <label className="block text-xs font-bold uppercase tracking-wide text-gray-700 mb-2">
                  Complaint Type
                </label>

                <select
                  value={complaintType}
                  onChange={(e) => setComplaintType(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm rounded-lg border border-gray-200 outline-none cursor-pointer focus:border-green-700"
                  style={{ backgroundColor: '#F0F7F4' }}
                >
                  {COMPLAINT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>

              </div>


              {/* ============================================
                  DESCRIPTION
              ============================================ */}
              <div className="mb-5">

                <label className="block text-xs font-bold uppercase tracking-wide text-gray-700 mb-2">
                  Detailed Description
                </label>

                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Please provide specific details about the interaction, dates, and amounts requested..."
                  rows={7}
                  className="w-full px-3 py-3 text-sm rounded-lg border border-gray-200 outline-none resize-none focus:border-green-700"
                  style={{ backgroundColor: '#F0F7F4' }}
                />

              </div>


              {/* ============================================
                  CONTACT INFORMATION
              ============================================ */}
              <div
                className="rounded-lg p-4 mb-5"
                style={{ backgroundColor: '#E7EFEA' }}
              >

                <div className="flex items-center gap-2 mb-2">

                  <ShieldAlert
                    size={15}
                    style={{ color: '#374151' }}
                  />

                  <h3 className="text-sm font-bold text-gray-900">
                    Contact Information
                    <span className="font-normal text-gray-500">
                      {' '} (Optional)
                    </span>
                  </h3>

                </div>

                <p className="text-xs text-gray-500 leading-relaxed mb-4">
                  Leave your details if you'd like our investigations team to
                  follow up with you. Your identity will remain confidential.
                </p>


                <div className="grid grid-cols-2 gap-4">

                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full px-3 py-2.5 text-sm rounded-lg border border-gray-200 outline-none focus:border-green-700"
                  />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="w-full px-3 py-2.5 text-sm rounded-lg border border-gray-200 outline-none focus:border-green-700"
                  />

                </div>

              </div>


              {/* ============================================
                  SUBMIT BUTTON
              ============================================ */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 text-white font-bold text-sm py-3 rounded-lg transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#C91414' }}
              >
                <Send size={16} />
                Submit Official Report
              </button>


              {/* Disclaimer */}
              <p className="text-xs text-gray-400 text-center mt-3">
                By submitting, you agree that the information provided is accurate
                to the best of your knowledge.
              </p>

            </form>

          </div>


          {/* =================================================
              RIGHT SIDEBAR
          ================================================= */}
          <div className="w-72 flex-shrink-0 flex flex-col gap-4">


            {/* ==============================================
                WHAT TO WATCH OUT FOR
            ============================================== */}
            <div
              className="rounded-2xl p-6"
              style={{
                backgroundColor: '#520000',
                borderLeft: '3px solid #E31B23',
              }}
            >

              <div className="flex items-center gap-3 mb-5">

                <AlertTriangle
                  size={20}
                  style={{ color: '#EF4444' }}
                />

                <h2 className="text-lg font-bold text-white">
                  What to watch out for
                </h2>

              </div>


              {/* Warning 1 */}
              <div className="flex gap-3 mb-5">

                <XCircle
                  size={18}
                  className="flex-shrink-0"
                  style={{ color: '#EF4444' }}
                />

                <div>
                  <h3 className="text-sm font-bold text-white mb-1">
                    Guaranteed Visas
                  </h3>

                  <p className="text-xs text-white/80 leading-relaxed">
                    No agency can "guarantee" a visa. Only government embassies
                    make final decisions.
                  </p>
                </div>

              </div>


              {/* Warning 2 */}
              <div className="flex gap-3 mb-5">

                <XCircle
                  size={18}
                  className="flex-shrink-0"
                  style={{ color: '#EF4444' }}
                />

                <div>
                  <h3 className="text-sm font-bold text-white mb-1">
                    Cash-Only or Crypto Payments
                  </h3>

                  <p className="text-xs text-white/80 leading-relaxed">
                    Legitimate agencies use traceable bank accounts and provide
                    official invoices.
                  </p>
                </div>

              </div>


              {/* Warning 3 */}
              <div className="flex gap-3">

                <XCircle
                  size={18}
                  className="flex-shrink-0"
                  style={{ color: '#EF4444' }}
                />

                <div>
                  <h3 className="text-sm font-bold text-white mb-1">
                    Urgent Action Required
                  </h3>

                  <p className="text-xs text-white/80 leading-relaxed">
                    Scammers use artificial time pressure to prevent you from
                    doing proper research.
                  </p>
                </div>

              </div>

            </div>


            {/* ==============================================
                COMMUNITY ALERTS
            ============================================== */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">

              {/* Header */}
              <div
                className="px-5 py-4 border-b border-gray-200"
                style={{ backgroundColor: '#F0F7F4' }}
              >

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-2.5">

                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: '#E5F3EC' }}
                    >
                      <Globe
                        size={15}
                        style={{ color: '#0D8060' }}
                      />
                    </div>

                    <h2 className="text-lg font-bold text-gray-900">
                      Community Alerts
                    </h2>

                  </div>

                  <div className="text-right">

                    <div className="text-xs font-bold text-gray-800">
                      LIVE
                    </div>

                    <div className="text-xs font-bold text-gray-800">
                      FEED
                    </div>

                  </div>

                </div>

              </div>


              {/* Alert list */}
              {COMMUNITY_ALERTS.map((alert, index) => (

                <div
                  key={alert.name}
                  className={`px-5 py-4 ${
                    index !== COMMUNITY_ALERTS.length - 1
                      ? 'border-b border-gray-200'
                      : ''
                  }`}
                >

                  <div className="flex items-center justify-between gap-2 mb-2">

                    <h3 className="text-sm font-bold text-gray-900">
                      {alert.name}
                    </h3>

                    <span
                      className="text-xs font-bold px-2 py-1 rounded"
                      style={{
                        backgroundColor: alert.statusBg,
                        color: alert.statusColor,
                      }}
                    >
                      {alert.status}
                    </span>

                  </div>

                  <p className="text-xs text-gray-500 leading-relaxed mb-3">
                    {alert.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-gray-400">

                    <div className="flex items-center gap-1">
                      <MapPin size={11} />
                      {alert.location}
                    </div>

                    <div className="flex items-center gap-1">
                      <Clock size={11} />
                      {alert.time}
                    </div>

                  </div>

                </div>

              ))}


              {/* View all */}
              <div className="px-5 py-4 text-center">

                <button
                  className="text-sm font-bold hover:opacity-80 transition-opacity"
                  style={{ color: '#0D5C3A' }}
                >
                  View All Scam Reports
                </button>

              </div>

            </div>


            {/* ==============================================
                BOTTOM COMMUNITY CARD
            ============================================== */}
            <div
              className="rounded-2xl p-6 text-center"
              style={{
                background:
                  'linear-gradient(135deg, #073B32 0%, #0D8060 100%)',
              }}
            >

              <h3 className="text-base font-bold text-white leading-relaxed">
                Join 10,000+ users protecting the migration community.
              </h3>

            </div>

          </div>

        </div>

      </main>

    </div>
  )
}