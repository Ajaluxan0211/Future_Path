import { useEffect, useState } from 'react'

import { Link, useNavigate, useParams } from 'react-router-dom'

import {

  ArrowLeft,

  ArrowRight,

  Building2,

  CheckCircle2,

  Globe,

  MapPin,

  Phone,

  Mail,

  ShieldCheck,

  BriefcaseBusiness,

  ExternalLink,

  LoaderCircle,

  Sparkles,

} from 'lucide-react'
import AgencyReviews from './AgencyReviews'



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

    description: 'Professional guidance for students planning to study overseas.',

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

    description: 'Sample migration consultancy providing general visa guidance.',

    services: ['Work Visa', 'Visitor Visa', 'Migration Guidance'],

    operatingCountries: ['Australia', 'Canada', 'New Zealand'],

    verificationStatus: 'SAMPLE',

    isSample: true,

  },

]



function asArray(value) {

  if (Array.isArray(value)) return value



  if (typeof value === 'string') {

    try {

      const parsed = JSON.parse(value)

      return Array.isArray(parsed) ? parsed : []

    } catch {

      return value.split(',').map(item => item.trim()).filter(Boolean)

    }

  }



  return []

}



function websiteUrl(value) {

  if (!value) return ''

  return /^https?:\/\//i.test(value) ? value : `https://${value}`

}



export default function AgencyProfile() {

  const { id } = useParams()

  const navigate = useNavigate()



  const [agency, setAgency] = useState(null)

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState('')

  const [activeService, setActiveService] = useState('')



  useEffect(() => {

    const controller = new AbortController()



    async function loadAgency() {

      setLoading(true)

      setError('')

      setAgency(null)



      // Load sample agency directly, without requesting the backend.

      const sample = SAMPLE_AGENCIES.find(

        item => String(item.id) === String(id)

      )



      if (sample) {

        setAgency(sample)

        setLoading(false)

        return

      }



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



  if (loading) {

    return (

      <div className="flex min-h-[60vh] items-center justify-center bg-[#f3f8f5]">

        <LoaderCircle className="animate-spin text-emerald-800" size={32} />

        <span className="ml-3 text-gray-600">Loading agency profile...</span>

      </div>

    )

  }



  if (!agency) {

    return (

      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-[#f3f8f5] px-5 text-center">

        <Building2 size={42} className="text-gray-400" />

        <h1 className="mt-4 text-2xl font-bold">Agency unavailable</h1>

        <p className="mt-2 text-gray-500">{error}</p>

        <Link

          to="/agencies"

          className="mt-5 rounded-xl bg-emerald-800 px-5 py-3 font-semibold text-white"

        >

          Back to agencies

        </Link>

      </div>

    )

  }



  const name = agency.name || agency.companyName || 'Agency'

  const address = [agency.address, agency.city, agency.country]

    .filter(Boolean)

    .filter((value, index, array) => array.indexOf(value) === index)

    .join(', ')

  const services = asArray(agency.services)

  const countries = asArray(agency.operatingCountries)

  const website = websiteUrl(agency.website)

  const initials = name

    .split(/\s+/)

    .filter(Boolean)

    .slice(0, 2)

    .map(word => word[0].toUpperCase())

    .join('')



  return (

    <div className="min-h-screen overflow-hidden bg-[#f3f8f5] text-gray-900">

      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">

        <div className="absolute -left-40 top-52 h-96 w-96 rounded-full bg-emerald-200/30 blur-3xl" />

        <div className="absolute -right-32 top-96 h-[30rem] w-[30rem] rounded-full bg-teal-200/25 blur-3xl" />

      </div>



      <div className="relative z-10 border-b border-gray-200 bg-white/90 backdrop-blur">

        <div className="mx-auto flex max-w-7xl items-center gap-2 px-5 py-4 text-sm sm:px-8">

          <Link to="/agencies" className="text-gray-500 hover:text-emerald-800">

            Agencies

          </Link>

          <span className="text-gray-300">/</span>

          <span className="truncate font-semibold">{name}</span>

        </div>

      </div>



      <main className="relative z-10 mx-auto max-w-7xl px-5 py-8 sm:px-8">

        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-emerald-800 to-emerald-600 text-white shadow-xl">

          <div className="pointer-events-none absolute -right-12 -top-20 h-72 w-72 rounded-full border border-white/15" />

          <div className="pointer-events-none absolute -bottom-32 right-1/4 h-64 w-64 rounded-full bg-lime-200/10 blur-3xl" />



          <div className="relative p-6 sm:p-10 lg:p-12">

            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-200">

              <Sparkles size={15} />

              FuturePath Agency Directory

            </div>



            <div className="mt-7 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

              <div className="flex min-w-0 items-start gap-5">

                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-2xl font-bold backdrop-blur sm:h-24 sm:w-24">

                  {initials || <Building2 size={32} />}

                </div>



                <div className="min-w-0">

                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold">

                    <CheckCircle2 size={14} />

                    {agency.isSample ? 'Sample listing' : 'Verified and approved'}

                  </span>



                  <h1 className="mt-4 break-words text-3xl font-bold sm:text-4xl lg:text-5xl">

                    {name}

                  </h1>



                  <p className="mt-3 flex items-start gap-2 text-sm text-emerald-50 sm:text-base">

                    <MapPin size={18} className="mt-0.5 shrink-0" />

                    {address || 'Location not provided'}

                  </p>



                  {agency.description && (

                    <p className="mt-4 max-w-2xl text-sm leading-7 text-emerald-50/90">

                      {agency.description}

                    </p>

                  )}



                  <div className="mt-5 flex flex-wrap gap-2">

                    {services.map(service => (

                      <button

                        key={service}

                        type="button"

                        onClick={() =>

                          setActiveService(activeService === service ? '' : service)

                        }

                        className={`rounded-full border px-4 py-2 text-sm font-medium transition ${activeService === service

                            ? 'border-white bg-white text-emerald-900'

                            : 'border-white/25 bg-white/10 text-white hover:bg-white/20'

                          }`}

                      >

                        {service}

                      </button>

                    ))}

                  </div>



                  {activeService && (

                    <p className="mt-3 text-sm text-emerald-100">

                      Selected service: {activeService}

                    </p>

                  )}

                </div>

              </div>



              <div className="flex w-full flex-col gap-3 lg:w-60 lg:shrink-0">

                <button

                  onClick={() => navigate(`/agencies/${agency.id}/contact`)}

                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 font-bold text-emerald-900 transition hover:-translate-y-0.5 hover:bg-emerald-50"

                >

                  Contact this agency

                  <ArrowRight size={17} />

                </button>



                {agency.phone && (

                  <a

                    href={`tel:${agency.phone}`}

                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 py-3.5 font-semibold text-white transition hover:bg-white/20"

                  >

                    <Phone size={16} />

                    Call agency

                  </a>

                )}



                {website && (

                  <a

                    href={website}

                    target="\_blank"

                    rel="noopener noreferrer"

                    className="inline-flex items-center justify-center gap-2 py-2 text-sm text-emerald-50 hover:text-white"

                  >

                    Visit website

                    <ExternalLink size={14} />

                  </a>

                )}

              </div>

            </div>



            <div className="mt-9 grid grid-cols-1 gap-3 border-t border-white/15 pt-6 sm:grid-cols-3">

              {[

                { icon: ShieldCheck, label: 'Listing status', value: agency.isSample ? 'Sample data' : 'Admin approved' },

                { icon: BriefcaseBusiness, label: 'Services offered', value: `${services.length} services` },

                { icon: Globe, label: 'Operating countries', value: `${countries.length} countries` },

              ].map(item => {

                const Icon = item.icon

                return (

                  <div key={item.label} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">

                    <div className="rounded-xl bg-white/15 p-3">

                      <Icon size={21} />

                    </div>

                    <div>

                      <p className="text-xs text-emerald-100">{item.label}</p>

                      <p className="mt-1 font-bold">{item.value}</p>

                    </div>

                  </div>

                )

              })}

            </div>

          </div>

        </section>



        <div className="mt-7 grid grid-cols-1 items-start gap-6 lg:grid-cols-3">

          <div className="space-y-6 lg:col-span-2">

            <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

              <div className="mb-6 flex items-center gap-3">

                <div className="rounded-xl bg-emerald-50 p-3 text-emerald-800">

                  <BriefcaseBusiness size={22} />

                </div>

                <div>

                  <h2 className="text-xl font-bold">Services offered</h2>

                  <p className="mt-1 text-sm text-gray-500">

                    Select a service to start an enquiry.

                  </p>

                </div>

              </div>



              <div className="grid gap-3 sm:grid-cols-2">

                {services.map(service => (

                  <button

                    key={service}

                    onClick={() => setActiveService(service)}

                    className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-md ${activeService === service

                        ? 'border-emerald-400 bg-emerald-50'

                        : 'border-gray-100 bg-gray-50 hover:border-emerald-200'

                      }`}

                  >

                    <CheckCircle2 size={20} className="shrink-0 text-emerald-700" />

                    <span className="flex-1 text-sm font-semibold">{service}</span>

                    <ArrowRight size={15} className="text-gray-400" />

                  </button>

                ))}

              </div>



              {activeService && (

                <div className="mt-5 flex flex-col justify-between gap-3 rounded-2xl bg-emerald-50 p-4 sm:flex-row sm:items-center">

                  <p className="text-sm text-emerald-950">

                    Ask about <strong>{activeService}</strong>.

                  </p>

                  <button

                    onClick={() =>

                      navigate(`/agencies/${agency.id}/contact?service=${encodeURIComponent(activeService)}`)

                    }

                    className="rounded-xl bg-emerald-800 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-900"

                  >

                    Enquire now

                  </button>

                </div>

              )}

            </section>



            <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

              <div className="mb-6 flex items-center gap-3">

                <div className="rounded-xl bg-sky-50 p-3 text-sky-800">

                  <Globe size={22} />

                </div>

                <div>

                  <h2 className="text-xl font-bold">Operating countries</h2>

                  <p className="mt-1 text-sm text-gray-500">

                    Countries served by this agency.

                  </p>

                </div>

              </div>



              <div className="flex flex-wrap gap-3">

                {countries.length ? countries.map(country => (

                  <span key={country} className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700">

                    <Globe size={14} className="mr-2 inline text-emerald-700" />

                    {country}

                  </span>

                )) : (

                  <p className="text-sm text-gray-500">No countries listed.</p>

                )}

              </div>

            </section>

          </div>



          <aside className="space-y-5 lg:sticky lg:top-6">

            <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

              <div className="bg-gradient-to-br from-emerald-950 to-emerald-700 p-6 text-white">

                <p className="text-xs font-bold uppercase tracking-widest text-emerald-200">

                  Get in touch

                </p>

                <h2 className="mt-3 text-2xl font-bold">Contact this agency</h2>

                <p className="mt-2 text-sm leading-6 text-emerald-100">

                  Ask questions about the agency's services and requirements.

                </p>

              </div>



              <div className="space-y-5 p-6">

                <div className="flex gap-3">

                  <MapPin size={19} className="mt-1 shrink-0 text-emerald-800" />

                  <div>

                    <p className="text-xs text-gray-500">Location</p>

                    <p className="mt-1 text-sm font-medium">{address || 'Not provided'}</p>

                  </div>

                </div>



                {agency.phone && (

                  <div className="flex gap-3">

                    <Phone size={19} className="mt-1 shrink-0 text-emerald-800" />

                    <div>

                      <p className="text-xs text-gray-500">Phone</p>

                      <a href={`tel:${agency.phone}`} className="mt-1 block text-sm font-medium hover:text-emerald-800">

                        {agency.phone}

                      </a>

                    </div>

                  </div>

                )}



                {agency.email && (

                  <div className="flex gap-3">

                    <Mail size={19} className="mt-1 shrink-0 text-emerald-800" />

                    <div className="min-w-0">

                      <p className="text-xs text-gray-500">Email</p>

                      <p className="mt-1 break-all text-sm font-medium">{agency.email}</p>

                    </div>

                  </div>

                )}



                {website && (

                  <div className="flex gap-3">

                    <Globe size={19} className="mt-1 shrink-0 text-emerald-800" />

                    <div className="min-w-0">

                      <p className="text-xs text-gray-500">Website</p>

                      <a href={website} target="\_blank" rel="noopener noreferrer" className="mt-1 break-all text-sm font-medium text-emerald-800 underline">

                        {agency.website}

                      </a>

                    </div>

                  </div>

                )}



                <button

                  onClick={() => navigate(`/agencies/${agency.id}/contact`)}

                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-800 px-5 py-3.5 font-semibold text-white transition hover:bg-emerald-900"

                >

                  Contact agency

                  <ArrowRight size={16} />

                </button>

              </div>

            </section>



            <section className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-5">

              <ShieldCheck size={23} className="text-emerald-800" />

              <h3 className="mt-3 font-bold text-emerald-950">Make an informed choice</h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">

                Confirm services, fees, and application requirements directly before paying.

              </p>

            </section>



            <Link

              to="/agencies"

              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 font-semibold text-gray-700 hover:border-emerald-300 hover:text-emerald-800"

            >

              <ArrowLeft size={16} />

              All agencies

            </Link>

          </aside>

        </div>



        <AgencyReviews
          agencyId={agency.id}
          isSample={Boolean(agency.isSample)}
        />

        <footer className="mt-10 flex flex-col gap-2 border-t border-gray-200 py-6 text-xs text-gray-500 sm:flex-row sm:justify-between">

          <span>© {new Date().getFullYear()} FuturePath</span>

          <span>Explore opportunities. Make informed decisions.</span>

        </footer>

      </main>

    </div>

  )

}
