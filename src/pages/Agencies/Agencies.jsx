
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Building2,
  MapPin,
  Globe,
  Phone,
  Search,
  SlidersHorizontal,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  BriefcaseBusiness,
  LoaderCircle,
  RotateCcw,
} from 'lucide-react'

const API_URL = 'http://localhost:5000/api/agency/public'

// Sample agencies are defined here; no separate data file is required.
const SAMPLE_AGENCIES = [
  {
    id: 'sample-1',
    name: 'Overseas Education Lanka',
    address: 'Colombo',
    country: 'Sri Lanka',
    phone: '+94112345678',
    email: 'info@overseaseducation.example',
    website: 'https://example.com',
    description:
      'Specializing in overseas education and student visa guidance.',
    services: ['Student Visa'],
    operatingCountries: ['Australia', 'UK', 'Canada'],
    verificationStatus: 'SAMPLE',
    isSample: true,
  },
  {
    id: 'sample-2',
    name: 'Visa Global Consultants',
    address: 'Colombo',
    country: 'Sri Lanka',
    phone: '+94112345679',
    email: 'info@visaglobal.example',
    website: 'https://example.org',
    description:
      'Providing guidance for overseas education and migration services.',
    services: ['Work Visa', 'Visitor Visa'],
    operatingCountries: ['Australia', 'Canada', 'United Kingdom'],
    verificationStatus: 'SAMPLE',
    isSample: true,
  },
]

function toArray(value) {
  if (Array.isArray(value)) return value

  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return value
        .split(',')
        .map(item => item.trim())
        .filter(Boolean)
    }
  }

  return []
}

function normalizeAgency(agency) {
  return {
    ...agency,
    name: agency.name || agency.companyName || 'Unnamed agency',
    services: toArray(agency.services),
    operatingCountries: toArray(agency.operatingCountries),
    isSample: false,
  }
}

export default function Agencies() {
  const [databaseAgencies, setDatabaseAgencies] = useState([])
  const [searchName, setSearchName] = useState('')
  const [region, setRegion] = useState('All Regions')
  const [visaType, setVisaType] = useState('All Visa Types')
  const [appliedFilters, setAppliedFilters] = useState({
    searchName: '',
    region: 'All Regions',
    visaType: 'All Visa Types',
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadAgencies() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(API_URL, {
          signal: controller.signal,
        })

        const result = await response.json()

        if (!response.ok || result.success === false) {
          throw new Error(
            result.message || 'Unable to load approved agencies.'
          )
        }

        const agencies = Array.isArray(result)
          ? result
          : result.agencies || result.data || []

        // Only show approved database agencies.
        const approved = agencies
          .filter(
            agency =>
              String(agency.verificationStatus).toUpperCase() === 'APPROVED'
          )
          .map(normalizeAgency)

        setDatabaseAgencies(approved)
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Agency loading error:', err)
          setError(
            'We could not load approved agencies from the server. Sample agencies are still available.'
          )
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadAgencies()

    return () => controller.abort()
  }, [])

  // Use database IDs for real agencies and separate IDs for sample agencies.
  const allAgencies = useMemo(
    () => [...SAMPLE_AGENCIES, ...databaseAgencies],
    [databaseAgencies]
  )

  const regions = useMemo(() => {
    const values = allAgencies
      .map(agency => agency.country || 'Other')
      .filter(Boolean)

    return ['All Regions', ...new Set(values)]
  }, [allAgencies])

  const visaTypes = useMemo(() => {
    const values = allAgencies.flatMap(agency => agency.services || [])
    return ['All Visa Types', ...new Set(values)]
  }, [allAgencies])

  const filteredAgencies = useMemo(() => {
    const search = appliedFilters.searchName.trim().toLowerCase()

    return allAgencies.filter(agency => {
      const nameMatches = (agency.name || '')
        .toLowerCase()
        .includes(search)

      const regionMatches =
        appliedFilters.region === 'All Regions' ||
        (agency.country || '').toLowerCase() ===
          appliedFilters.region.toLowerCase()

      const visaMatches =
        appliedFilters.visaType === 'All Visa Types' ||
        (agency.services || []).some(
          service =>
            service.toLowerCase() ===
            appliedFilters.visaType.toLowerCase()
        )

      return nameMatches && regionMatches && visaMatches
    })
  }, [allAgencies, appliedFilters])

  function applyFilters(event) {
    event.preventDefault()

    setAppliedFilters({
      searchName,
      region,
      visaType,
    })
  }

  function resetFilters() {
    setSearchName('')
    setRegion('All Regions')
    setVisaType('All Visa Types')

    setAppliedFilters({
      searchName: '',
      region: 'All Regions',
      visaType: 'All Visa Types',
    })
  }

  return (
    <main className="min-h-screen bg-[#f1f7f4] text-slate-900">
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-700">
        <div className="pointer-events-none absolute -right-20 -top-32 h-96 w-96 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-white/10 px-4 py-2 text-sm font-medium text-emerald-100">
            <ShieldCheck size={17} />
            FuturePath Verified Directory
          </div>

          <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Find the right agency for your future.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-emerald-100 sm:text-lg">
            Explore agency services, compare operating countries, and find
            contact details before starting your overseas journey.
          </p>

          <div className="mt-7 flex flex-wrap gap-3 text-sm text-white">
            <span className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
              <CheckCircle2 size={16} />
              Admin-approved listings
            </span>
            <span className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
              <BriefcaseBusiness size={16} />
              Compare visa services
            </span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
        {/* Filters */}
        <form
          onSubmit={applyFilters}
          className="grid gap-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7 lg:grid-cols-[1.2fr_1fr_1fr_auto] lg:items-end"
        >
          <div>
            <label
              htmlFor="agency-search"
              className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500"
            >
              Search by name
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 focus-within:border-emerald-600 focus-within:ring-4 focus-within:ring-emerald-50">
              <Search size={18} className="shrink-0 text-slate-400" />
              <input
                id="agency-search"
                value={searchName}
                onChange={event => setSearchName(event.target.value)}
                placeholder="Agency name..."
                className="min-w-0 w-full py-3 outline-none"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="agency-region"
              className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500"
            >
              Service region
            </label>

            <select
              id="agency-region"
              value={region}
              onChange={event => setRegion(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 outline-none focus:border-emerald-600"
            >
              {regions.map(item => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="agency-visa"
              className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500"
            >
              Visa type
            </label>

            <select
              id="agency-visa"
              value={visaType}
              onChange={event => setVisaType(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 outline-none focus:border-emerald-600"
            >
              {visaTypes.map(item => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-800 px-5 py-3 font-semibold text-white transition hover:bg-emerald-900"
            >
              <SlidersHorizontal size={17} />
              Apply Filters
            </button>

            <button
              type="button"
              onClick={resetFilters}
              title="Reset filters"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-3 py-3 text-slate-600 transition hover:bg-slate-50"
            >
              <RotateCcw size={17} />
            </button>
          </div>
        </form>

        {/* Directory and information panel */}
        <div className="mt-8 grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <section>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-2xl font-bold">Agencies</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Browse listings and open each agency's individual profile.
                </p>
              </div>

              <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
                {filteredAgencies.length}{' '}
                {filteredAgencies.length === 1 ? 'agency' : 'agencies'} found
              </span>
            </div>

            {loading && (
              <div className="mb-4 flex items-center gap-2 rounded-xl bg-white p-4 text-sm text-slate-600">
                <LoaderCircle size={18} className="animate-spin" />
                Loading approved agencies...
              </div>
            )}

            {error && (
              <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
                {error}
              </div>
            )}

            <div className="space-y-5">
              {filteredAgencies.map(agency => {
                const address = [
                  agency.address,
                  agency.city,
                  agency.country,
                ]
                  .filter(Boolean)
                  .filter(
                    (value, index, array) => array.indexOf(value) === index
                  )
                  .join(', ')

                const services = agency.services || []
                const countries = agency.operatingCountries || []

                return (
                  <article
                    key={String(agency.id)}
                    className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg"
                  >
                    <div className="p-5 sm:p-7">
                      <div className="flex items-start gap-4">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-800">
                          <Building2 size={30} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <h3 className="break-words text-xl font-bold sm:text-2xl">
                              {agency.name}
                            </h3>

                            <span
                              className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${
                                agency.isSample
                                  ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                                  : 'border-green-200 bg-green-50 text-green-800'
                              }`}
                            >
                              <ShieldCheck size={14} />
                              {agency.isSample ? 'Sample' : 'Verified'}
                            </span>
                          </div>

                          <p className="mt-2 flex items-start gap-2 text-sm text-slate-500">
                            <MapPin size={17} className="mt-0.5 shrink-0" />
                            {address || 'Location not provided'}
                          </p>

                          {services.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-2">
                              {services.map(service => (
                                <span
                                  key={service}
                                  className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800"
                                >
                                  {service}
                                </span>
                              ))}
                            </div>
                          )}

                          {agency.description && (
                            <p className="mt-4 text-sm leading-7 text-slate-600">
                              {agency.description}
                            </p>
                          )}

                          {countries.length > 0 && (
                            <div className="mt-5">
                              <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                                <Globe size={15} />
                                Operating countries
                              </p>

                              <div className="flex flex-wrap gap-2">
                                {countries.map(country => (
                                  <span
                                    key={country}
                                    className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700"
                                  >
                                    {country}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {(agency.phone || agency.website) && (
                            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600">
                              {agency.phone && (
                                <a
                                  href={`tel:${agency.phone}`}
                                  className="inline-flex items-center gap-2 hover:text-emerald-800"
                                >
                                  <Phone size={15} />
                                  {agency.phone}
                                </a>
                              )}

                              {agency.website && (
                                <a
                                  href={
                                    /^https?:\/\//i.test(agency.website)
                                      ? agency.website
                                      : `https://${agency.website}`
                                  }
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 break-all text-emerald-800 hover:underline"
                                >
                                  <Globe size={15} />
                                  Website
                                </a>
                              )}
                            </div>
                          )}

                          <div className="mt-6 flex flex-wrap gap-3 border-t border-slate-100 pt-5">
                            <Link
                              to={`/agencies/${encodeURIComponent(String(agency.id))}`}
                              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 font-medium text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50"
                            >
                              View Profile
                              <ArrowRight size={16} />
                            </Link>

                            <Link
                              to={`/agencies/${encodeURIComponent(String(agency.id))}/contact`}
                              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-800 px-5 py-3 font-semibold text-white transition hover:bg-emerald-900"
                            >
                              Contact Now
                              <ArrowRight size={16} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>

            {!loading && filteredAgencies.length === 0 && (
              <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
                <Search size={38} className="mx-auto text-slate-300" />
                <h3 className="mt-4 text-xl font-bold">No agencies found</h3>
                <p className="mt-2 text-sm text-slate-500">
                  Try a different name, region, or visa type.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-5 rounded-xl bg-emerald-800 px-5 py-3 font-semibold text-white hover:bg-emerald-900"
                >
                  Reset filters
                </button>
              </div>
            )}
          </section>

          {/* Verification information */}
          <aside className="space-y-5 lg:sticky lg:top-24">
            <section className="rounded-3xl bg-gradient-to-br from-emerald-950 to-emerald-800 p-6 text-white shadow-lg">
              <ShieldCheck size={27} />
              <h2 className="mt-4 text-xl font-bold">
                How verification works
              </h2>

              <p className="mt-3 text-sm leading-6 text-emerald-100">
                Database agencies appear after an administrator approves their
                application. Sample entries are provided for demonstration.
              </p>

              <div className="mt-6 space-y-5">
                {[
                  {
                    title: 'Identity verification',
                    text: 'Submitted registration documents are reviewed.',
                  },
                  {
                    title: 'Approval status',
                    text: 'Real agencies appear after administrator approval.',
                  },
                  {
                    title: 'Compare services',
                    text: 'Review available services and operating countries.',
                  },
                  {
                    title: 'Fee transparency',
                    text: 'Ask agencies for clear details about service fees.',
                  },
                ].map((item, index) => (
                  <div key={item.title} className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-emerald-100">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-emerald-50 p-3 text-emerald-800">
                  <BriefcaseBusiness size={22} />
                </div>
                <h3 className="font-bold">Find your service</h3>
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Filter agencies by visa type and country to find services that
                match your plans.
              </p>

              <button
                onClick={resetFilters}
                className="mt-4 inline-flex items-center gap-2 font-semibold text-emerald-800 hover:text-emerald-950"
              >
                Clear all filters
                <ArrowRight size={16} />
              </button>
            </section>
          </aside>
        </div>
      </div>
    </main>
  )
}
