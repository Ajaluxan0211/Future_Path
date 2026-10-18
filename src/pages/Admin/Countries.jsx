
import { useMemo, useState } from 'react'
import {
  Globe2,
  Clock3,
  GraduationCap,
  Award,
  Plus,
  Search,
  SlidersHorizontal,
  Eye,
  Pencil,
  X,
  Save,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
} from 'lucide-react'

const initialCountries = [
  { id: 1, flag: '🇦🇺', name: 'Australia', code: 'AU', region: 'Asia Pacific', universities: 142, scholarships: 45, visas: ['Student', 'Work', 'Visit'], status: 'Active', tuitionMin: 22000, tuitionMax: 54000, description: 'Australia offers globally ranked universities, comprehensive post-study work rights, and an exceptional quality of life. Renowned for world-class STEM education, medicine, and business leadership.' },
  { id: 2, flag: '🇨🇦', name: 'Canada', code: 'CA', region: 'North America', universities: 98, scholarships: 32, visas: ['Student', 'Work', 'PR'], status: 'Active', tuitionMin: 15000, tuitionMax: 45000, description: 'Canada offers internationally recognized education, diverse communities, and a wide range of study and career opportunities.' },
  { id: 3, flag: '🇬🇧', name: 'United Kingdom', code: 'GB', region: 'Europe', universities: 115, scholarships: 28, visas: ['Student', 'Work', 'Visit'], status: 'Active', tuitionMin: 14000, tuitionMax: 40000, description: 'The United Kingdom is home to historic universities, internationally recognized degrees, and diverse academic programs.' },
  { id: 4, flag: '🇩🇪', name: 'Germany', code: 'DE', region: 'Europe', universities: 87, scholarships: 24, visas: ['Student', 'Work', 'Visit'], status: 'Active', tuitionMin: 0, tuitionMax: 20000, description: 'Germany is known for engineering, research, technical education, and a wide range of university programs.' },
  { id: 5, flag: '🇳🇿', name: 'New Zealand', code: 'NZ', region: 'Asia Pacific', universities: 43, scholarships: 18, visas: ['Student', 'Work', 'Visit'], status: 'Active', tuitionMin: 18000, tuitionMax: 40000, description: 'New Zealand provides internationally recognized education and a welcoming environment for international students.' },
  { id: 6, flag: '🇮🇪', name: 'Ireland', code: 'IE', region: 'Europe', universities: 31, scholarships: 12, visas: ['Student', 'Work'], status: 'Active', tuitionMin: 12000, tuitionMax: 30000, description: 'Ireland offers internationally recognized degrees and opportunities in technology, business, and research.' },
  { id: 7, flag: '🇺🇸', name: 'USA', code: 'US', region: 'North America', universities: 210, scholarships: 68, visas: ['Student', 'Work', 'Visit'], status: 'Active', tuitionMin: 20000, tuitionMax: 60000, description: 'The United States offers a broad range of universities, research programs, and academic specializations.' },
  { id: 8, flag: '🇸🇬', name: 'Singapore', code: 'SG', region: 'Asia Pacific', universities: 18, scholarships: 8, visas: ['Student', 'Work'], status: 'Active', tuitionMin: 12000, tuitionMax: 35000, description: 'Singapore offers a strong education system and access to a regional technology and business hub.' },
  { id: 9, flag: '🇯🇵', name: 'Japan', code: 'JP', region: 'Asia Pacific', universities: 24, scholarships: 6, visas: ['Student', 'Visit'], status: 'Active', tuitionMin: 7000, tuitionMax: 20000, description: 'Japan combines advanced technology, research, and a wide selection of academic programs.' },
  { id: 10, flag: '🇳🇱', name: 'Netherlands', code: 'NL', region: 'Europe', universities: 28, scholarships: 10, visas: ['Student', 'Work'], status: 'Active', tuitionMin: 10000, tuitionMax: 25000, description: 'The Netherlands offers English-taught programs and internationally connected universities.' },
  { id: 11, flag: '🇫🇷', name: 'France', code: 'FR', region: 'Europe', universities: 56, scholarships: 15, visas: ['Student', 'Work', 'Visit'], status: 'Active', tuitionMin: 3000, tuitionMax: 20000, description: 'France offers a diverse range of academic programs, cultural experiences, and research opportunities.' },
  { id: 12, flag: '🇦🇪', name: 'UAE', code: 'AE', region: 'Middle East', universities: 22, scholarships: 4, visas: ['Work', 'Visit'], status: 'Active', tuitionMin: 10000, tuitionMax: 35000, description: 'The UAE offers international campuses, professional programs, and access to a global business environment.' },
]

const money = (value) => new Intl.NumberFormat('en-US').format(value)

const inputClass =
  'w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100'

export default function Countries() {
  const [countries, setCountries] = useState(initialCountries)
  const [search, setSearch] = useState('')
  const [region, setRegion] = useState('All Regions')
  const [status, setStatus] = useState('All Status')
  const [sort, setSort] = useState('Name A-Z')
  const [selected, setSelected] = useState(initialCountries[0])
  const [panelOpen, setPanelOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('Overview')
  const [page, setPage] = useState(1)
  const [notice, setNotice] = useState('')
  const [form, setForm] = useState(initialCountries[0])

  const filteredCountries = useMemo(() => {
    const result = countries.filter((country) => {
      const matchesSearch =
        `${country.name} ${country.code} ${country.region}`
          .toLowerCase()
          .includes(search.toLowerCase())

      return (
        matchesSearch &&
        (region === 'All Regions' || country.region === region) &&
        (status === 'All Status' || country.status === status)
      )
    })

    result.sort((a, b) => {
      if (sort === 'Name Z-A') return b.name.localeCompare(a.name)
      if (sort === 'Universities: High-Low') return b.universities - a.universities
      if (sort === 'Scholarships: High-Low') return b.scholarships - a.scholarships
      return a.name.localeCompare(b.name)
    })

    return result
  }, [countries, search, region, status, sort])

  const pageSize = 12
  const totalPages = Math.max(1, Math.ceil(filteredCountries.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const visibleCountries = filteredCountries.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  )

  function openEditor(country) {
    setSelected(country)
    setForm({ ...country, visas: [...country.visas] })
    setActiveTab('Overview')
    setNotice('')
    setPanelOpen(true)
  }

  function saveCountry(event) {
    event.preventDefault()

    if (!form.name.trim() || !form.code.trim()) {
      setNotice('Country name and country code are required.')
      return
    }

    const updated = {
      ...form,
      name: form.name.trim(),
      code: form.code.trim().toUpperCase(),
      tuitionMin: Number(form.tuitionMin) || 0,
      tuitionMax: Number(form.tuitionMax) || 0,
    }

    setCountries((previous) => {
      const exists = previous.some((country) => country.id === updated.id)

      if (exists) {
        return previous.map((country) =>
          country.id === updated.id ? updated : country,
        )
      }

      return [...previous, updated]
    })

    setSelected(updated)
    setForm(updated)
    setNotice('Country details saved in this session.')
  }

  function addCountry() {
    const newCountry = {
      id: Date.now(),
      flag: '🌍',
      name: '',
      code: '',
      region: 'Asia Pacific',
      universities: 0,
      scholarships: 0,
      visas: ['Student'],
      status: 'Pending Review',
      tuitionMin: 0,
      tuitionMax: 0,
      description: '',
    }

    setSelected(newCountry)
    setForm(newCountry)
    setActiveTab('Overview')
    setNotice('')
    setPanelOpen(true)
  }

  function toggleVisa(visa) {
    setForm((previous) => ({
      ...previous,
      visas: previous.visas.includes(visa)
        ? previous.visas.filter((item) => item !== visa)
        : [...previous.visas, visa],
    }))
  }

  const stats = [
    {
      label: 'ACTIVE COUNTRIES',
      value: `${countries.filter((c) => c.status === 'Active').length}+`,
      note: 'Countries available',
      icon: Globe2,
      iconStyle: 'bg-emerald-100 text-emerald-800',
      valueStyle: 'text-emerald-800',
    },
    {
      label: 'PENDING REVIEW',
      value: countries.filter((c) => c.status === 'Pending Review').length + 8,
      note: 'Requires compliance audit',
      icon: Clock3,
      iconStyle: 'bg-red-100 text-red-700',
      valueStyle: 'text-red-900',
    },
    {
      label: 'UNIVERSITIES LISTED',
      value: countries.reduce((sum, c) => sum + c.universities, 0),
      note: 'University listings',
      icon: GraduationCap,
      iconStyle: 'bg-blue-100 text-blue-800',
      valueStyle: 'text-slate-900',
    },
    {
      label: 'SCHOLARSHIPS AVAILABLE',
      value: countries.reduce((sum, c) => sum + c.scholarships, 0),
      note: 'Scholarship listings',
      icon: Award,
      iconStyle: 'bg-emerald-100 text-emerald-800',
      valueStyle: 'text-emerald-800',
    },
  ]

  return (
    <div className="min-w-0 text-slate-900">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
            <Globe2 size={22} />
          </span>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Countries</h1>
            <p className="mt-1 text-sm text-slate-600">
              Manage destination countries, visa data, and content for each country.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={addCountry}
          className="inline-flex items-center gap-2 rounded-xl bg-[#075C3B] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#06482F]"
        >
          <Plus size={17} /> Add Country
        </button>
      </div>

      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon

          return (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-[11px] font-bold tracking-wider text-slate-600">
                  {item.label}
                </p>
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.iconStyle}`}>
                  <Icon size={20} />
                </span>
              </div>
              <p className={`mt-1 text-3xl font-bold ${item.valueStyle}`}>
                {item.value}
              </p>
              <p className="mt-2 flex items-center gap-1 text-xs text-slate-600">
                {item.label === 'ACTIVE COUNTRIES' && <TrendingUp size={13} className="text-emerald-700" />}
                {item.note}
              </p>
            </div>
          )
        })}
      </div>

      <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-100 bg-white p-3 lg:flex-row lg:items-center">
          <label className="relative min-w-0 flex-1">
            <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value)
                setPage(1)
              }}
              placeholder="Search country name, code, or keyword..."
              className={`${inputClass} pl-9`}
            />
          </label>

          <select
            value={region}
            onChange={(event) => {
              setRegion(event.target.value)
              setPage(1)
            }}
            className={`${inputClass} lg:w-40`}
          >
            <option>All Regions</option>
            <option>Asia Pacific</option>
            <option>North America</option>
            <option>Europe</option>
            <option>Middle East</option>
          </select>

          <select
            value={status}
            onChange={(event) => {
              setStatus(event.target.value)
              setPage(1)
            }}
            className={`${inputClass} lg:w-36`}
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Pending Review</option>
            <option>Inactive</option>
          </select>

          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className={`${inputClass} lg:w-48`}
          >
            <option>Name A-Z</option>
            <option>Name Z-A</option>
            <option>Universities: High-Low</option>
            <option>Scholarships: High-Low</option>
          </select>

          <button
            type="button"
            title="Reset filters"
            onClick={() => {
              setSearch('')
              setRegion('All Regions')
              setStatus('All Status')
              setSort('Name A-Z')
              setPage(1)
            }}
            className="flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-700 hover:bg-emerald-50"
          >
            <SlidersHorizontal size={18} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="bg-indigo-50/80 text-[10px] font-bold uppercase tracking-wider text-slate-700">
              <tr>
                <th className="px-4 py-3">Flag &amp; Country</th>
                <th className="px-3 py-3">Region</th>
                <th className="px-3 py-3">Universities</th>
                <th className="px-3 py-3">Scholarships</th>
                <th className="px-3 py-3">Visa Types</th>
                <th className="px-3 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {visibleCountries.map((country) => (
                <tr key={country.id} className="transition hover:bg-emerald-50/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        aria-label={`Select ${country.name}`}
                        className="accent-emerald-800"
                      />
                      <span className="text-xl">{country.flag}</span>
                      <div>
                        <p className="font-semibold text-slate-900">{country.name}</p>
                        <p className="mt-0.5 text-xs text-slate-500">
                          {country.code} • {country.region}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-slate-700">{country.region}</td>
                  <td className="px-3 py-3 font-medium">{country.universities} <span className="text-xs text-slate-500">unis</span></td>
                  <td className="px-3 py-3 font-semibold text-emerald-800">{country.scholarships} <span className="text-xs font-normal text-slate-500">prog</span></td>
                  <td className="px-3 py-3">
                    <div className="flex flex-wrap gap-1">
                      {country.visas.map((visa) => (
                        <span key={visa} className="rounded-full bg-blue-50 px-2 py-1 text-[10px] font-medium text-blue-900">
                          {visa}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${country.status === 'Active' ? 'bg-emerald-200 text-emerald-900' : 'bg-amber-100 text-amber-900'}`}>
                      ● {country.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => openEditor(country)}
                        className="font-semibold text-emerald-900 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        title={`View ${country.name}`}
                        onClick={() => openEditor(country)}
                        className="text-slate-700 hover:text-emerald-800"
                      >
                        <Eye size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {visibleCountries.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-slate-500">
                    No countries match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 px-4 py-3 text-xs text-slate-600">
          <p>
            Showing {filteredCountries.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, filteredCountries.length)} of {filteredCountries.length} countries
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="rounded-lg p-2 hover:bg-slate-100 disabled:opacity-30"
            >
              <ChevronLeft size={17} />
            </button>
            <span className="rounded-lg bg-[#064B31] px-3 py-2 font-semibold text-white">
              {currentPage}
            </span>
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="rounded-lg p-2 hover:bg-slate-100 disabled:opacity-30"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </section>

      {panelOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <button
            type="button"
            aria-label="Close country editor"
            onClick={() => setPanelOpen(false)}
            className="absolute inset-0 bg-slate-950/30"
          />

          <aside className="relative z-10 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-100 bg-white px-5 py-4">
              <div>
                <h2 className="text-lg font-bold text-slate-950">
                  {countries.some((c) => c.id === selected.id) ? 'Edit Country' : 'Add Country'}
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  {form.name || 'New destination'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPanelOpen(false)}
                className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex gap-5 overflow-x-auto border-b border-slate-100 px-5">
              {['Overview', 'Universities', 'Scholarships', 'Visas', 'SEO'].map((tab) => (
                <button
                  type="button"
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`shrink-0 border-b-2 py-3 text-xs font-medium ${activeTab === tab ? 'border-emerald-800 text-emerald-900' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <form onSubmit={saveCountry} className="flex-1 space-y-5 overflow-y-auto p-5">
              {activeTab === 'Overview' && (
                <>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{form.flag}</span>
                    <div>
                      <p className="font-semibold">{form.name || 'New country'}</p>
                      <span className="text-xs text-slate-500">{form.code || 'Country code'} · {form.status}</span>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-600">Country name</label>
                    <input required className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Country name" />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-600">Country code</label>
                      <input required maxLength={3} className={inputClass} value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} placeholder="AU" />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-600">Flag emoji</label>
                      <input className={inputClass} value={form.flag} onChange={(e) => setForm({ ...form, flag: e.target.value })} placeholder="🇦🇺" />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-600">Region</label>
                    <select className={inputClass} value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })}>
                      {['Asia Pacific', 'North America', 'Europe', 'Middle East', 'Africa', 'South America'].map((item) => <option key={item}>{item}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-600">Status</label>
                    <select className={inputClass} value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                      {['Active', 'Pending Review', 'Inactive'].map((item) => <option key={item}>{item}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-600">Country description</label>
                    <textarea rows={5} className={inputClass} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Write a country overview..." />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-600">Min annual tuition (AUD $)</label>
                      <input type="number" min="0" className={inputClass} value={form.tuitionMin} onChange={(e) => setForm({ ...form, tuitionMin: e.target.value })} />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-600">Max annual tuition (AUD $)</label>
                      <input type="number" min="0" className={inputClass} value={form.tuitionMax} onChange={(e) => setForm({ ...form, tuitionMax: e.target.value })} />
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'Universities' && (
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-600">Number of universities</label>
                  <input type="number" min="0" className={inputClass} value={form.universities} onChange={(e) => setForm({ ...form, universities: Number(e.target.value) })} />
                  <p className="mt-2 text-xs text-slate-500">This is a country-level count for the dashboard. Connect your university records to manage individual institutions.</p>
                </div>
              )}

              {activeTab === 'Scholarships' && (
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-600">Available scholarship programs</label>
                  <input type="number" min="0" className={inputClass} value={form.scholarships} onChange={(e) => setForm({ ...form, scholarships: Number(e.target.value) })} />
                  <p className="mt-2 text-xs text-slate-500">This count can be linked to scholarship records in your database later.</p>
                </div>
              )}

              {activeTab === 'Visas' && (
                <div>
                  <p className="mb-3 text-xs font-semibold text-slate-600">Available visa types</p>
                  <div className="space-y-3">
                    {['Student', 'Work', 'Visit', 'PR'].map((visa) => (
                      <label key={visa} className="flex items-center gap-3 text-sm text-slate-700">
                        <input type="checkbox" checked={form.visas.includes(visa)} onChange={() => toggleVisa(visa)} className="accent-emerald-800" />
                        {visa} Visa
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'SEO' && (
                <div className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-600">SEO title</label>
                    <input className={inputClass} value={form.seoTitle || ''} onChange={(e) => setForm({ ...form, seoTitle: e.target.value })} placeholder={`${form.name || 'Country'} study and visa guide`} />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-600">SEO description</label>
                    <textarea rows={4} className={inputClass} value={form.seoDescription || ''} onChange={(e) => setForm({ ...form, seoDescription: e.target.value })} placeholder="Short search engine description..." />
                  </div>
                </div>
              )}

              {notice && (
                <p className={`rounded-lg p-3 text-sm ${notice.startsWith('Country') ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-800'}`}>
                  {notice}
                </p>
              )}

              <div className="flex items-center justify-between gap-3 pt-2">
                <p className="text-[11px] text-slate-500">Changes are local until connected to your backend.</p>
                <button type="submit" className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#064B31] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#043D28]">
                  <Save size={16} /> Save Changes
                </button>
              </div>
            </form>

            <div className="flex gap-3 border-t border-slate-100 p-4">
              <button type="button" onClick={() => setPanelOpen(false)} className="flex-1 rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-200">
                Discard
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}
