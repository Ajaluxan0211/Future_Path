
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  Globe,
  MapPin,
  Phone,
  Mail,
  Send,
  LoaderCircle,
} from 'lucide-react'

const API_URL = 'http://localhost:5000/api/agency/public'

const SAMPLE_AGENCIES = [
  {
    id: 'sample-1',
    name: 'Overseas Education Lanka',
    address: 'Colombo',
    country: 'Sri Lanka',
    phone: '+94112345678',
    email: 'info@overseaseducation.example',
    website: 'https://example.com',
    description: 'Overseas education and student visa guidance.',
    services: ['Student Visa', 'University Applications'],
    operatingCountries: ['Australia', 'United Kingdom', 'Canada'],
    verificationStatus: 'SAMPLE',
    isSample: true,
  },
  {
    id: 'sample-2',
    name: 'Global Migration Consultants',
    address: 'Kandy',
    country: 'Sri Lanka',
    phone: '+94812234567',
    email: 'info@globalmigration.example',
    website: 'https://example.org',
    description: 'Sample migration and visa guidance services.',
    services: ['Work Visa', 'Visitor Visa', 'Migration Guidance'],
    operatingCountries: ['Australia', 'Canada', 'New Zealand'],
    verificationStatus: 'SAMPLE',
    isSample: true,
  },
]

export default function AgencyContact() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [agency, setAgency] = useState(null)
  const [loading, setLoading] = useState(Boolean(id))
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: searchParams.get('service')
      ? `Enquiry about ${searchParams.get('service')}`
      : '',
    message: '',
  })

  useEffect(() => {
    const controller = new AbortController()

    async function loadAgency() {
      setError('')
      setAgency(null)

      if (!id) {
        setAgency(SAMPLE_AGENCIES[0])
        setLoading(false)
        return
      }

      const sample = SAMPLE_AGENCIES.find(
        item => String(item.id) === String(id)
      )

      if (sample) {
        setAgency(sample)
        setLoading(false)
        return
      }

      setLoading(true)

      try {
        const response = await fetch(API_URL, {
          signal: controller.signal,
        })
        const result = await response.json()

        if (!response.ok || result.success === false) {
          throw new Error(result.message || 'Unable to load agencies.')
        }

        const agencies = Array.isArray(result)
          ? result
          : result.agencies || result.data || []

        const found = agencies.find(
          item =>
            String(item.id) === String(id) &&
            item.verificationStatus === 'APPROVED'
        )

        if (!found) {
          setError('This agency could not be found or is not approved.')
          return
        }

        setAgency(found)
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error(err)
          setError('Unable to load agency details. Please try again.')
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadAgency()
    return () => controller.abort()
  }, [id])

  function handleChange(event) {
    setForm(previous => ({
      ...previous,
      [event.target.name]: event.target.value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setNotice('')

    if (!agency) return

    if (agency.isSample) {
      setNotice(
        'This is a sample agency. Your test enquiry has not been sent or saved.'
      )
      return
    }

    if (!agency.email) {
      setError(
        'This agency has not provided an email address. Please contact it by phone if available.'
      )
      return
    }

    const subject = encodeURIComponent(
      form.subject || `Enquiry for ${agency.name}`
    )
    const body = encodeURIComponent(
      `Agency: ${agency.name}\n` +
      `Name: ${form.name}\n` +
      `Email: ${form.email}\n` +
      `Phone: ${form.phone || 'Not provided'}\n\n` +
      `Message:\n${form.message}`
    )

    window.location.href =
      `mailto:${agency.email}?subject=${subject}&body=${body}`
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#f3f8f5]">
        <LoaderCircle size={30} className="animate-spin text-emerald-800" />
        <span className="ml-3 text-gray-600">Loading contact details...</span>
      </div>
    )
  }

  if (!agency) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-[#f3f8f5] px-5 text-center">
        <Building2 size={42} className="text-gray-400" />
        <h1 className="mt-4 text-2xl font-bold">Agency not found</h1>
        <p className="mt-2 text-gray-500">
          {error || 'This agency is unavailable.'}
        </p>
        <Link
          to="/agencies"
          className="mt-5 rounded-xl bg-emerald-800 px-5 py-3 font-semibold text-white"
        >
          Back to agencies
        </Link>
      </div>
    )
  }

  const location = [agency.address, agency.city, agency.country]
    .filter(Boolean)
    .filter((value, index, array) => array.indexOf(value) === index)
    .join(', ')

  const website = agency.website
    ? /^https?:\/\//i.test(agency.website)
      ? agency.website
      : `https://${agency.website}`
    : ''

  return (
    <div className="min-h-screen bg-[#f3f8f5] text-gray-900">
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-4">
          <Link
            to={id ? `/agencies/${agency.id}` : '/agencies'}
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-800"
          >
            <ArrowLeft size={16} />
            {id ? `Back to ${agency.name}` : 'All agencies'}
          </Link>
        </div>
      </div>

      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-800 to-emerald-600 px-5 py-12 text-white sm:py-16">
        <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full border border-white/15" />
        <div className="relative mx-auto max-w-6xl">
          <div className="flex items-center gap-2 text-sm font-semibold text-emerald-200">
            <CheckCircle2 size={16} />
            {agency.isSample ? 'Sample agency contact' : 'Approved agency contact'}
          </div>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl">
            Contact {agency.name}
          </h1>
          <p className="mt-3 flex items-start gap-2 text-sm text-emerald-50 sm:text-base">
            <MapPin size={18} className="mt-0.5 shrink-0" />
            {location || 'Location not provided'}
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-emerald-50/90">
            Ask about services, application requirements, fees, and the next
            steps for your overseas plans.
          </p>
        </div>
      </section>

      <main className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-6 px-5 py-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold">Send an enquiry</h2>
          <p className="mt-2 text-sm text-gray-500">
            Contact <strong className="text-gray-800">{agency.name}</strong>.
          </p>

          {agency.isSample && (
            <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
              This is a demonstration agency. Test messages will not be sent
              to a real business.
            </div>
          )}

          {error && (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          {notice && (
            <div className="mt-5 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
              {notice}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="mb-2 block text-sm font-semibold">
                  Your name *
                </label>
                <input
                  id="contact-name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your name"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-50"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="mb-2 block text-sm font-semibold">
                  Email address *
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-50"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-phone" className="mb-2 block text-sm font-semibold">
                Phone number
              </label>
              <input
                id="contact-phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+94..."
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-50"
              />
            </div>

            <div>
              <label htmlFor="contact-subject" className="mb-2 block text-sm font-semibold">
                Subject
              </label>
              <input
                id="contact-subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Student visa enquiry"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-50"
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="mb-2 block text-sm font-semibold">
                Your message *
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder={`Hello ${agency.name}, I would like to know more about your services...`}
                className="w-full resize-y rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-50"
              />
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-800 px-5 py-3.5 font-semibold text-white transition hover:bg-emerald-900 sm:w-auto"
            >
              <Send size={17} />
              {agency.isSample ? 'Test enquiry form' : 'Prepare email'}
            </button>

            <p className="text-xs leading-5 text-gray-400">
              Real agency enquiries open your email application. This form does
              not save enquiries to the database.
            </p>
          </form>
        </section>

        <aside className="space-y-5">
          <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-800">
                <Building2 size={26} />
              </div>
              <div className="min-w-0">
                <h2 className="break-words font-bold">{agency.name}</h2>
                <p className="mt-1 text-xs text-gray-500">
                  {agency.isSample ? 'Example listing' : 'Approved agency'}
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-5 border-t border-gray-100 pt-5">
              <div className="flex gap-3">
                <MapPin size={18} className="mt-1 shrink-0 text-emerald-800" />
                <div>
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="mt-1 text-sm leading-6">{location || 'Not provided'}</p>
                </div>
              </div>

              {agency.phone && (
                <div className="flex gap-3">
                  <Phone size={18} className="mt-1 shrink-0 text-emerald-800" />
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <a href={`tel:${agency.phone}`} className="mt-1 block text-sm hover:text-emerald-800">
                      {agency.phone}
                    </a>
                  </div>
                </div>
              )}

              {agency.email && (
                <div className="flex gap-3">
                  <Mail size={18} className="mt-1 shrink-0 text-emerald-800" />
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="mt-1 break-all text-sm">{agency.email}</p>
                  </div>
                </div>
              )}

              {website && (
                <div className="flex gap-3">
                  <Globe size={18} className="mt-1 shrink-0 text-emerald-800" />
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">Website</p>
                    <a
                      href={website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block break-all text-sm text-emerald-800 underline"
                    >
                      {agency.website}
                    </a>
                  </div>
                </div>
              )}
            </div>

            <Link
              to={id ? `/agencies/${agency.id}` : '/agencies'}
              className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold hover:border-emerald-300 hover:bg-emerald-50"
            >
              <ArrowLeft size={16} />
              {id ? 'View agency profile' : 'Browse agencies'}
            </Link>
          </section>

          <section className="rounded-3xl bg-emerald-950 p-6 text-white">
            <CheckCircle2 size={24} className="text-emerald-300" />
            <h3 className="mt-4 font-bold">Make an informed choice</h3>
            <p className="mt-2 text-sm leading-6 text-emerald-100">
              Confirm services, fees, and application requirements directly
              before making payments.
            </p>
          </section>
        </aside>
      </main>
    </div>
  )
}
