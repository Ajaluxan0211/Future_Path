
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Building2,
  Check,
  FileText,
  FileUp,
  CircleCheck,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react'

const countries = ['Australia', 'Canada', 'UK', 'Germany', 'NZ', 'USA']
const services = ['Student Visa', 'Work Visa', 'Visitor Visa']

const documents = [
  {
    id: 'businessRegistration',
    title: 'Business Registration Certificate',
    description: 'Required · PDF or image · max 10MB',
    required: true,
  },
  {
    id: 'migrationLicense',
    title: 'Migration License',
    description: 'Government-issued immigration authority license',
    required: true,
  },
  {
    id: 'governmentCertificate',
    title: 'Government Registration Certificate',
    description: 'National or state authority certificate',
    required: true,
  },
  {
    id: 'officePhoto',
    title: 'Office Photo',
    description: 'Shows physical office',
    required: false,
  },
]

const inputClass =
  'mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-[#0B603A]'

const labelClass =
  'block text-xs font-bold uppercase tracking-wide text-gray-400'

export default function AgencyRegister() {
  const [step, setStep] = useState(1)
  const [error, setError] = useState('')
  const [uploadedFiles, setUploadedFiles] = useState({})
  const [form, setForm] = useState({
    companyName: '',
    ownerName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    website: '',
    services: ['Student Visa', 'Work Visa'],
    countries: ['Australia', 'Canada', 'UK'],
  })

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
    setError('')
  }

  function toggleService(service) {
    setForm((previous) => ({
      ...previous,
      services: previous.services.includes(service)
        ? previous.services.filter((item) => item !== service)
        : [...previous.services, service],
    }))
  }

  function toggleCountry(country) {
    setForm((previous) => ({
      ...previous,
      countries: previous.countries.includes(country)
        ? previous.countries.filter((item) => item !== country)
        : [...previous.countries, country],
    }))
  }

  function nextStep(event) {
    event.preventDefault()

    const requiredFields = [
      form.companyName,
      form.ownerName,
      form.email,
      form.phone,
      form.address,
      form.city,
    ]

    if (requiredFields.some((field) => !field.trim())) {
      setError('Please complete all required fields.')
      return
    }

    if (!form.services.length || !form.countries.length) {
      setError('Select at least one service and one operating country.')
      return
    }

    setError('')
    setStep(2)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function uploadDocument(event, id) {
    const file = event.target.files?.[0]
    if (!file) return

    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/webp',
    ]

    if (!allowedTypes.includes(file.type)) {
      setError('Upload a PDF, JPG, PNG, or WebP file.')
      event.target.value = ''
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('The maximum file size is 10MB.')
      event.target.value = ''
      return
    }

    setUploadedFiles((previous) => ({ ...previous, [id]: file }))
    setError('')
  }

  function submitDocuments(event) {
    event.preventDefault()

    const missing = documents.find(
      (document) => document.required && !uploadedFiles[document.id]
    )

    if (missing) {
      setError(`Please upload ${missing.title}.`)
      return
    }

    setError(
      'Required documents selected successfully. Connect your backend to submit the application for verification.'
    )
  }

  return (
    <div className="min-h-screen bg-[#F0F8F5] px-4 py-10 sm:py-12">
      <div className="mx-auto max-w-[620px] rounded-2xl border border-gray-200 bg-white px-5 py-8 shadow-sm sm:px-11 sm:py-10">

        {/* PAGE 1: AGENCY INFORMATION */}
        {step === 1 && (
          <>
            <div className="text-center">
              <Building2 className="mx-auto mb-2 h-10 w-10 text-[#648A91]" />
              <h1 className="text-2xl font-extrabold text-gray-900">
                Register your agency
              </h1>
              <p className="mt-2 text-sm text-gray-400">
                Join 120+ verified agencies on Agency's trusted platform.
              </p>
            </div>

            <Progress step={step} />

            <form onSubmit={nextStep} noValidate className="space-y-4">
              <div>
                <label className={labelClass} htmlFor="companyName">
                  Agency / Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="companyName"
                  name="companyName"
                  value={form.companyName}
                  onChange={updateField}
                  placeholder="Global Migration Experts Pty Ltd"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="ownerName">
                  Owner / Director Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="ownerName"
                  name="ownerName"
                  value={form.ownerName}
                  onChange={updateField}
                  placeholder="Robert Vance"
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor="email">
                    Business Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={updateField}
                    placeholder="contact@agency.com"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass} htmlFor="phone">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={updateField}
                    placeholder="+61 2 9123 4567"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass} htmlFor="address">
                  Office Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="address"
                  name="address"
                  value={form.address}
                  onChange={updateField}
                  placeholder="Level 12, 340 George Street"
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor="city">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="city"
                    name="city"
                    value={form.city}
                    onChange={updateField}
                    placeholder="Sydney"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass} htmlFor="website">
                    Website (Optional)
                  </label>
                  <input
                    id="website"
                    name="website"
                    type="url"
                    value={form.website}
                    onChange={updateField}
                    placeholder="https://www.youragency.com"
                    className={inputClass}
                  />
                </div>
              </div>

              <fieldset className="pt-1">
                <legend className={labelClass}>Services Offered</legend>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-3">
                  {services.map((service) => (
                    <label
                      key={service}
                      className="flex items-center gap-2 text-sm text-gray-800"
                    >
                      <input
                        type="checkbox"
                        checked={form.services.includes(service)}
                        onChange={() => toggleService(service)}
                        className="h-4 w-4 accent-[#0B603A]"
                      />
                      {service}
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="pt-1">
                <legend className={labelClass}>Operating Countries</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {countries.map((country) => {
                    const selected = form.countries.includes(country)
                    return (
                      <button
                        key={country}
                        type="button"
                        onClick={() => toggleCountry(country)}
                        className={`rounded-full border px-3 py-1.5 text-xs ${
                          selected
                            ? 'border-[#0B603A] bg-[#EAF6EF] text-[#085C38]'
                            : 'border-gray-200 text-gray-500'
                        }`}
                      >
                        {selected ? '✓ ' : '+ '}
                        {country}
                      </button>
                    )
                  })}
                </div>
              </fieldset>

              {error && (
                <p className="text-sm text-red-600" role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B603A] px-4 py-3.5 text-sm font-bold text-white hover:bg-[#084B2D]"
              >
                Continue to Upload Documents <ArrowRight size={18} />
              </button>
            </form>
          </>
        )}

        {/* PAGE 2: EXACT DOCUMENT UPLOAD SECTION */}
        {step === 2 && (
          <>
            <div className="text-center">
              <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
                Upload Documents
              </h1>
              <p className="mt-2 text-sm text-gray-400">
                Required for agency verification. Reviewed within 48 hours.
              </p>
            </div>

            <Progress step={step} />

            <form onSubmit={submitDocuments}>
              <div className="space-y-3">
                {documents.map((document) => {
                  const file = uploadedFiles[document.id]

                  return (
                    <div
                      key={document.id}
                      className={`flex min-h-[84px] items-center gap-3 rounded-xl border px-3.5 py-3.5 sm:px-4 ${
                        file
                          ? 'border-[#0B603A] bg-emerald-50/70'
                          : 'border-gray-200 bg-white'
                      }`}
                    >
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                          file
                            ? 'bg-white text-[#0B603A] ring-1 ring-emerald-100'
                            : 'bg-gray-50 text-gray-400'
                        }`}
                      >
                        {file ? <FileText size={21} /> : <FileUp size={21} />}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold leading-5 text-gray-900">
                          {document.title}{' '}
                          {document.required ? (
                            <span className="text-red-500">*</span>
                          ) : (
                            <span className="font-normal text-gray-400">
                              (optional)
                            </span>
                          )}
                        </p>
                        <p className="mt-1 break-words text-xs leading-4 text-gray-500">
                          {file ? file.name : document.description}
                        </p>
                      </div>

                      {file ? (
                        <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-[#0B603A]">
                          <CircleCheck size={16} />
                          <span className="hidden sm:inline">Uploaded</span>
                        </span>
                      ) : (
                        <label
                          htmlFor={`upload-${document.id}`}
                          className="shrink-0 cursor-pointer rounded-lg border-2 border-[#0B603A] px-3 py-1.5 text-xs font-bold text-[#085C38] hover:bg-[#EAF6EF] sm:px-4 sm:py-2 sm:text-sm"
                        >
                          Upload
                        </label>
                      )}

                      <input
                        id={`upload-${document.id}`}
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png,.webp"
                        onChange={(event) => uploadDocument(event, document.id)}
                        className="sr-only"
                      />
                    </div>
                  )
                })}
              </div>

              <div className="mt-6 flex gap-3 rounded-xl border border-orange-200 bg-orange-50 p-4">
                <AlertTriangle
                  size={21}
                  className="mt-0.5 shrink-0 text-amber-500"
                />
                <p className="text-xs leading-5 text-orange-800 sm:text-sm">
                  Your documents are reviewed by our integrity team within
                  24–48 business hours. You'll receive a confirmation email
                  once approved.
                </p>
              </div>

              {error && (
                <p
                  role="alert"
                  className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-red-600 bg-red-600 px-4 py-3.5 text-sm font-bold text-white transition hover:bg-red-700"
              >
                Submit for Verification <ArrowRight size={18} />
              </button>

              <button
                type="button"
                onClick={() => {
                  setStep(1)
                  setError('')
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className="mt-3 w-full py-2 text-sm font-semibold text-gray-500 hover:text-[#0B603A]"
              >
                ← Back to Agency Info
              </button>
            </form>
          </>
        )}

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-[#085C38] hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}

function Progress({ step }) {
  const items = [
    { number: 1, label: 'Agency Info' },
    { number: 2, label: 'Documents' },
    { number: 3, label: 'Review' },
  ]

  return (
    <div className="mx-auto mb-9 mt-7 flex max-w-md items-start">
      {items.map((item, index) => {
        const completed = step > item.number
        const active = step === item.number

        return (
          <div
            key={item.number}
            className="relative flex flex-1 flex-col items-center"
          >
            {index < items.length - 1 && (
              <div
                className={`absolute left-1/2 top-4 h-0.5 w-full ${
                  completed ? 'bg-[#0B603A]' : 'bg-gray-200'
                }`}
              />
            )}

            <div
              className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-bold ${
                active || completed
                  ? 'border-[#0B603A] bg-[#0B603A] text-white'
                  : 'border-gray-300 bg-white text-gray-400'
              }`}
            >
              {completed ? <Check size={18} /> : item.number}
            </div>

            <span
              className={`mt-2 text-xs ${
                active || completed
                  ? 'font-semibold text-[#085C38]'
                  : 'text-gray-400'
              }`}
            >
              {item.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
