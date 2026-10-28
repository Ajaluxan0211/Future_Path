import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Building2, FileText, FileUp, CircleCheck, AlertTriangle, ArrowRight } from 'lucide-react'

const API = 'http://localhost:5000/api'
const countries = ['Australia', 'Canada', 'UK', 'Germany', 'NZ', 'USA']
const services = ['Student Visa', 'Work Visa', 'Visitor Visa']
const documents = [
  { id: 'businessRegistration', title: 'Business Registration Certificate', required: true, description: 'PDF or image, maximum 10MB' },
  { id: 'migrationLicense', title: 'Migration License', required: true, description: 'Government-issued immigration authority license' },
  { id: 'governmentCertificate', title: 'Government Registration Certificate', required: true, description: 'National or state authority certificate' },
  { id: 'officePhoto', title: 'Office Photo', required: false, description: 'Shows your physical office' },
]
const inputClass = 'mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#0B603A]'
const labelClass = 'block text-xs font-bold uppercase tracking-wide text-gray-500'

export default function AgencyRegister() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState({})
  const [form, setForm] = useState({ companyName: '', ownerName: '', email: '', password: '', phone: '', address: '', city: '', website: '', services: ['Student Visa', 'Work Visa'], countries: ['Australia', 'Canada', 'UK'] })

  const updateField = (event) => setForm((old) => ({ ...old, [event.target.name]: event.target.value }))
  const toggle = (field, value) => setForm((old) => ({ ...old, [field]: old[field].includes(value) ? old[field].filter((x) => x !== value) : [...old[field], value] }))

  function nextStep(event) {
    event.preventDefault()
    if (!form.companyName.trim() || !form.ownerName.trim() || !form.email.trim() || !form.password || !form.phone.trim() || !form.address.trim() || !form.city.trim()) return setError('Complete all required fields, including your account password.')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return setError('Enter a valid business email.')
    if (form.password.length < 8) return setError('Password must contain at least 8 characters.')
    if (!form.services.length || !form.countries.length) return setError('Select at least one service and one operating country.')
    setError(''); setStep(2); window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function uploadDocument(event, id) {
    const file = event.target.files?.[0]
    if (!file) return
    if (!['application/pdf', 'image/jpeg', 'image/png', 'image/webp'].includes(file.type)) { setError('Upload a PDF, JPG, PNG, or WebP file.'); event.target.value = ''; return }
    if (file.size > 10 * 1024 * 1024) { setError('Each file must be 10MB or smaller.'); event.target.value = ''; return }
    setUploadedFiles((old) => ({ ...old, [id]: file })); setError('')
  }

  async function submitDocuments(event) {
    event.preventDefault(); setError('')
    const missing = documents.find((doc) => doc.required && !uploadedFiles[doc.id])
    if (missing) return setError(`Please upload ${missing.title}.`)
    const body = new FormData()
    body.append('companyName', form.companyName.trim())
    body.append('ownerName', form.ownerName.trim())
    body.append('email', form.email.trim().toLowerCase())
    body.append('password', form.password)
    body.append('phone', form.phone.trim())
    body.append('address', form.address.trim())
    body.append('city', form.city.trim())
    body.append('website', form.website.trim())
    body.append('country', 'Sri Lanka')
    body.append('services', JSON.stringify(form.services))
    body.append('operatingCountries', JSON.stringify(form.countries))
    documents.forEach((doc) => { if (uploadedFiles[doc.id]) body.append(doc.id, uploadedFiles[doc.id]) })
    setBusy(true)
    try {
      const response = await fetch(`${API}/agency/register`, { method: 'POST', body, credentials: 'include' })
      const data = await response.json()
      if (!response.ok || !data.success) throw new Error(data.message || 'Application submission failed.')
      window.alert('Agency account created and application submitted successfully. Your application is pending admin verification.')
      navigate('/agency/application-status')
    } catch (err) { setError(err.message || 'Could not connect to the backend. Make sure it is running on port 5000.') }
    finally { setBusy(false) }
  }

  return <div className="min-h-screen bg-[#F0F8F5] px-4 py-10"><div className="mx-auto max-w-[620px] rounded-2xl border border-gray-200 bg-white px-5 py-8 shadow-sm sm:px-11">
    {step === 1 ? <>
      <div className="text-center"><Building2 className="mx-auto mb-2 h-10 w-10 text-[#648A91]"/><h1 className="text-2xl font-extrabold text-gray-900">Register your agency</h1><p className="mt-2 text-sm text-gray-500">Create your agency account and submit it for verification.</p></div>
      <Progress step={step}/>
      <form onSubmit={nextStep} className="space-y-4">
        <Field label="Agency / Company Name *" name="companyName" value={form.companyName} onChange={updateField} placeholder="Your agency name"/>
        <Field label="Owner / Director Name *" name="ownerName" value={form.ownerName} onChange={updateField} placeholder="Full name"/>
        <Field label="Business Email *" name="email" type="email" value={form.email} onChange={updateField} placeholder="contact@agency.com"/>
        <Field label="Account Password * (minimum 8 characters)" name="password" type="password" value={form.password} onChange={updateField} placeholder="Create a secure password"/>
        <Field label="Phone Number *" name="phone" value={form.phone} onChange={updateField} placeholder="+94..."/>
        <Field label="Office Address *" name="address" value={form.address} onChange={updateField} placeholder="Office address"/>
        <div className="grid gap-3 sm:grid-cols-2"><Field label="City *" name="city" value={form.city} onChange={updateField} placeholder="Jaffna"/><Field label="Website (optional)" name="website" type="url" value={form.website} onChange={updateField} placeholder="https://..."/></div>
        <fieldset><legend className={labelClass}>Services offered *</legend><div className="mt-3 flex flex-wrap gap-4">{services.map((s) => <label key={s} className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.services.includes(s)} onChange={() => toggle('services', s)} className="accent-[#0B603A]"/>{s}</label>)}</div></fieldset>
        <fieldset><legend className={labelClass}>Operating countries *</legend><div className="mt-3 flex flex-wrap gap-2">{countries.map((c) => <button type="button" key={c} onClick={() => toggle('countries', c)} className={`rounded-full border px-3 py-2 text-sm ${form.countries.includes(c) ? 'border-[#0B603A] bg-emerald-50 text-green-800' : 'border-gray-200 text-gray-600'}`}>{form.countries.includes(c) ? '✓ ' : '+ '}{c}</button>)}</div></fieldset>
        {error && <Error>{error}</Error>}<button className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B603A] px-4 py-3.5 font-bold text-white">Continue to Upload Documents <ArrowRight size={18}/></button>
      </form>
    </> : <>
      <div className="text-center"><h1 className="text-2xl font-extrabold">Upload Documents</h1><p className="mt-2 text-sm text-gray-500">Required for agency verification. Each file must be 10MB or smaller.</p></div><Progress step={step}/>
      <form onSubmit={submitDocuments}><div className="space-y-3">{documents.map((doc) => { const file = uploadedFiles[doc.id]; return <div key={doc.id} className={`flex items-center gap-3 rounded-xl border p-4 ${file ? 'border-green-700 bg-emerald-50' : 'border-gray-200'}`}><div className="rounded-lg bg-white p-3 text-green-800">{file ? <FileText/> : <FileUp/>}</div><div className="min-w-0 flex-1"><p className="text-sm font-bold">{doc.title} {doc.required ? <span className="text-red-500">*</span> : <span className="font-normal text-gray-500">(optional)</span>}</p><p className="mt-1 break-all text-xs text-gray-500">{file ? file.name : doc.description}</p></div><label className="cursor-pointer rounded-lg border border-green-800 px-3 py-2 text-sm font-bold text-green-800">{file ? 'Change' : 'Upload'}<input type="file" accept=".pdf,.jpg,.jpeg,.png,.webp" className="sr-only" onChange={(e) => uploadDocument(e, doc.id)}/></label>{file && <CircleCheck className="shrink-0 text-green-700" size={18}/>}</div>})}</div>
        <div className="mt-6 flex gap-3 rounded-xl border border-orange-200 bg-orange-50 p-4"><AlertTriangle className="shrink-0 text-orange-600"/><p className="text-sm text-orange-800">Your application will remain pending until an administrator checks your details and documents.</p></div>
        {error && <Error>{error}</Error>}<button disabled={busy} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3.5 font-bold text-white disabled:opacity-60">{busy ? 'Submitting...' : 'Submit for Verification'} <ArrowRight size={18}/></button><button type="button" onClick={() => {setStep(1);setError('')}} className="mt-3 w-full py-2 text-sm text-gray-600">← Back to Agency Info</button>
      </form>
    </>}
    <p className="mt-6 text-center text-sm text-gray-500">Already have an account? <Link to="/login" className="font-semibold text-green-800">Log in</Link></p>
  </div></div>
}
function Field({label, ...props}) { return <div><label className={labelClass} htmlFor={props.name}>{label}</label><input id={props.name} required={label.includes('*')} className={inputClass} {...props}/></div> }
function Error({children}) { return <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{children}</p> }
function Progress({step}) { return <div className="my-8 flex justify-center gap-12 text-sm">{['Agency Info','Documents'].map((label,i)=><div key={label} className={step===i+1?'font-bold text-green-800':'text-gray-400'}>{i+1}. {label}</div>)}</div> }
