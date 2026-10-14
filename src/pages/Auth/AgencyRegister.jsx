
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Building2, Check } from 'lucide-react'

const COUNTRIES = [
  'Australia',
  'Canada',
  'UK',
  'Germany',
  'NZ',
  'USA',
]

const INITIAL_FORM = {
  companyName: '',
  ownerName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  website: '',
  services: ['Student Visa', 'Work Visa'],
  countries: ['Australia', 'Canada', 'UK'],
}

const INPUT_CLASS =
  'mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-[#0B603A] focus:ring-2 focus:ring-[#0B603A]/10'

const LABEL_CLASS =
  'block text-xs font-bold uppercase tracking-wide text-gray-400'

export default function AgencyRegister() {
  const navigate = useNavigate()

  const [step, setStep] = useState(1)
  const [form, setForm] = useState(INITIAL_FORM)
  const [documents, setDocuments] = useState({
    businessRegistration: null,
    ownerIdentity: null,
    businessLicense: null,
  })
  const [error, setError] = useState('')

  function updateField(event) {
    const { name, value } = event.target

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }))

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

  function continueToDocuments(event) {
    event.preventDefault()

    if (
      !form.companyName.trim() ||
      !form.ownerName.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.address.trim() ||
      !form.city.trim()
    ) {
      setError('Please complete all required fields.')
      return
    }

    if (form.services.length === 0) {
      setError('Please select at least one service offered.')
      return
    }

    if (form.countries.length === 0) {
      setError('Please select at least one operating country.')
      return
    }

    setError('')
    setStep(2)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function continueToReview(event) {
    event.preventDefault()

    if (
      !documents.businessRegistration ||
      !documents.ownerIdentity
    ) {
      setError(
        'Please upload your business registration document and owner identity document.'
      )
      return
    }

    setError('')
    setStep(3)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function submitRegistration(event) {
    event.preventDefault()

    // This is a frontend demonstration. Connect your backend
    // to securely upload files and save the registration.
    setError(
      'The form is ready, but account submission requires a backend and secure document storage.'
    )
  }

  function handleFileChange(event, key) {
    const file = event.target.files?.[0]

    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      setError('Each document must be smaller than 5 MB.')
      event.target.value = ''
      return
    }

    setDocuments((previous) => ({
      ...previous,
      [key]: file,
    }))

    setError('')
  }

  return (
    <div className="min-h-screen bg-[#F0F8F5] px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-2xl rounded-2xl border border-gray-200 bg-white px-5 py-8 shadow-sm sm:px-11 sm:py-10">
        {/* Page heading */}
        <div className="text-center">
          <Building2
            size={42}
            strokeWidth={1.7}
            className="mx-auto mb-2 text-[#648A91]"
          />

          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
            Register your agency
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Join 120+ verified agencies on Agency's trusted platform.
          </p>
        </div>

        {/* Three-step progress indicator */}
        <div className="mx-auto mb-9 mt-7 flex max-w-md items-start">
          {[
            { number: 1, label: 'Agency Info' },
            { number: 2, label: 'Documents' },
            { number: 3, label: 'Review' },
          ].map((item, index) => (
            <div
              key={item.number}
              className="relative flex flex-1 flex-col items-center"
            >
              {index < 2 && (
                <div
                  className={`absolute left-1/2 top-4 h-0.5 w-full ${
                    step > item.number
                      ? 'bg-[#0B603A]'
                      : 'bg-gray-200'
                  }`}
                />
              )}

              <div
                className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-bold ${
                  step >= item.number
                    ? 'border-[#0B603A] bg-[#0B603A] text-white'
                    : 'border-gray-300 bg-white text-gray-400'
                }`}
              >
                {step > item.number ? (
                  <Check size={18} />
                ) : (
                  item.number
                )}
              </div>

              <span
                className={`mt-2 text-xs ${
                  step === item.number
                    ? 'font-semibold text-[#085C38]'
                    : 'text-gray-400'
                }`}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Step 1: Agency information */}
        {step === 1 && (
          <form onSubmit={continueToDocuments} noValidate>
            <div>
              <label className={LABEL_CLASS} htmlFor="companyName">
                Agency / Company Name <span className="text-red-500">*</span>
              </label>
              <input
                id="companyName"
                name="companyName"
                value={form.companyName}
                onChange={updateField}
                placeholder="Global Migration Experts (Pvt) Ltd"
                className={INPUT_CLASS}
                required
              />
            </div>

            <div className="mt-4">
              <label className={LABEL_CLASS} htmlFor="ownerName">
                Owner / Director Name <span className="text-red-500">*</span>
              </label>
              <input
                id="ownerName"
                name="ownerName"
                value={form.ownerName}
                onChange={updateField}
                placeholder="Robert Vance"
                className={INPUT_CLASS}
                required
              />
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className={LABEL_CLASS} htmlFor="email">
                  Business Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={updateField}
                  placeholder="contact@agency.com"
                  className={INPUT_CLASS}
                  required
                />
              </div>

              <div>
                <label className={LABEL_CLASS} htmlFor="phone">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={updateField}
                  placeholder="+94 77 123 4567"
                  className={INPUT_CLASS}
                  required
                />
              </div>
            </div>

            <div className="mt-4">
              <label className={LABEL_CLASS} htmlFor="address">
                Office Address <span className="text-red-500">*</span>
              </label>
              <input
                id="address"
                name="address"
                value={form.address}
                onChange={updateField}
                placeholder="No. 12, Main Street"
                className={INPUT_CLASS}
                required
              />
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className={LABEL_CLASS} htmlFor="city">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  id="city"
                  name="city"
                  value={form.city}
                  onChange={updateField}
                  placeholder="Jaffna"
                  className={INPUT_CLASS}
                  required
                />
              </div>

              <div>
                <label className={LABEL_CLASS} htmlFor="website">
                  Website (Optional)
                </label>
                <input
                  id="website"
                  name="website"
                  type="url"
                  value={form.website}
                  onChange={updateField}
                  placeholder="https://www.youragency.com"
                  className={INPUT_CLASS}
                />
              </div>
            </div>

            {/* Services */}
            <fieldset className="mt-6">
              <legend className={LABEL_CLASS}>
                Services Offered
              </legend>

              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-3">
                {['Student Visa', 'Work Visa', 'Visitor Visa'].map(
                  (service) => (
                    <label
                      key={service}
                      className="flex cursor-pointer items-center gap-2 text-sm text-gray-800"
                    >
                      <input
                        type="checkbox"
                        checked={form.services.includes(service)}
                        onChange={() => toggleService(service)}
                        className="h-4 w-4 accent-[#0B603A]"
                      />
                      {service}
                    </label>
                  )
                )}
              </div>
            </fieldset>

            {/* Operating countries */}
            <fieldset className="mt-6">
              <legend className={LABEL_CLASS}>
                Operating Countries
              </legend>

              <div className="mt-3 flex flex-wrap gap-2">
                {COUNTRIES.map((country) => {
                  const selected = form.countries.includes(country)

                  return (
                    <button
                      key={country}
                      type="button"
                      onClick={() => toggleCountry(country)}
                      aria-pressed={selected}
                      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                        selected
                          ? 'border-[#0B603A] bg-[#EAF6EF] text-[#085C38]'
                          : 'border-gray-200 bg-white text-gray-500 hover:border-[#0B603A]'
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
              <p role="alert" className="mt-4 text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B603A] px-4 py-3.5 text-sm font-bold text-white transition hover:bg-[#084B2D]"
            >
              Continue to Upload Documents <span>→</span>
            </button>
          </form>
        )}

        {/* Step 2: Documents */}
        {step === 2 && (
          <form onSubmit={continueToReview} noValidate>
            <h2 className="text-lg font-bold text-gray-900">
              Upload agency documents
            </h2>

            <p className="mb-6 mt-2 text-sm text-gray-500">
              Upload clear documents for verification. PDF, JPG, and PNG
              files up to 5 MB each.
            </p>

            {[
              {
                key: 'businessRegistration',
                label: 'Business Registration Document',
                required: true,
              },
              {
                key: 'ownerIdentity',
                label: 'Owner / Director Identity Document',
                required: true,
              },
              {
                key: 'businessLicense',
                label: 'Business License (Optional)',
                required: false,
              },
            ].map((document) => (
              <div
                key={document.key}
                className="mb-5 rounded-xl border border-gray-200 p-4"
              >
                <label
                  className="block text-sm font-semibold text-gray-800"
                  htmlFor={document.key}
                >
                  {document.label}
                  {document.required && (
                    <span className="text-red-500"> *</span>
                  )}
                </label>

                <input
                  id={document.key}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  required={document.required}
                  onChange={(event) =>
                    handleFileChange(event, document.key)
                  }
                  className="mt-3 block w-full text-sm text-gray-500 file:mr-3 file:rounded-lg file:border-0 file:bg-[#EAF6EF] file:px-4 file:py-2 file:font-semibold file:text-[#085C38] hover:file:bg-green-100"
                />

                {documents[document.key] && (
                  <p className="mt-2 break-all text-xs text-green-700">
                    Selected: {documents[document.key].name}
                  </p>
                )}
              </div>
            ))}

            {error && (
              <p role="alert" className="mb-4 text-sm text-red-600">
                {error}
              </p>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setStep(1)
                  setError('')
                }}
                className="w-1/3 rounded-xl border border-gray-300 px-4 py-3 font-semibold text-gray-700 hover:bg-gray-50"
              >
                Back
              </button>

              <button
                type="submit"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#0B603A] px-4 py-3 font-bold text-white hover:bg-[#084B2D]"
              >
                Continue to Review →
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <form onSubmit={submitRegistration}>
            <h2 className="text-lg font-bold text-gray-900">
              Review your registration
            </h2>

            <p className="mb-5 mt-2 text-sm text-gray-500">
              Check your details before submitting your agency
              registration for verification.
            </p>

            <div className="space-y-3 rounded-xl bg-gray-50 p-4 text-sm">
              {[
                ['Company', form.companyName],
                ['Owner / Director', form.ownerName],
                ['Business Email', form.email],
                ['Phone', form.phone],
                ['Office Address', form.address],
                ['City', form.city],
                ['Website', form.website || 'Not provided'],
                ['Services', form.services.join(', ')],
                ['Countries', form.countries.join(', ')],
                [
                  'Business Registration',
                  documents.businessRegistration?.name,
                ],
                ['Owner Identity', documents.ownerIdentity?.name],
                [
                  'Business License',
                  documents.businessLicense?.name || 'Not provided',
                ],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex flex-col gap-1 sm:flex-row sm:justify-between"
                >
                  <span className="text-gray-500">{label}</span>
                  <span className="break-all font-medium text-gray-900 sm:max-w-[65%] sm:text-right">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {error && (
              <p role="alert" className="mt-4 text-sm text-red-600">
                {error}
              </p>
            )}

            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setStep(2)
                  setError('')
                }}
                className="w-1/3 rounded-xl border border-gray-300 px-4 py-3 font-semibold text-gray-700 hover:bg-gray-50"
              >
                Back
              </button>

              <button
                type="submit"
                className="flex-1 rounded-xl bg-[#0B603A] px-4 py-3 font-bold text-white hover:bg-[#084B2D]"
              >
                Submit for Verification
              </button>
            </div>
          </form>
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
