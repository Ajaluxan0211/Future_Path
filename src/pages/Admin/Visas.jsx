
import { useMemo, useState } from 'react'
import {
  FileText,
  AlertTriangle,
  TrendingUp,
  Clock,
  Search,
  Download,
  Plus,
  Pencil,
  X,
  Check,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

const initialVisas = [
  { id: 1, name: 'Student Visa', subclass: 'Subclass 500', country: 'Australia', flag: '🇦🇺', category: 'Student', fee: 710, currency: 'AUD', min: 4, max: 6, approval: 88, sync: 'Mar 2026', status: 'Active', rights: '48 hrs/fortnight', postStudy: '2–4 years' },
  { id: 2, name: 'Study Permit (SDS/Non-SDS)', subclass: 'Study Permit', country: 'Canada', flag: '🇨🇦', category: 'Student', fee: 150, currency: 'CAD', min: 8, max: 12, approval: 83, sync: 'Feb 2026', status: 'Active', rights: '24 hrs/week', postStudy: 'Up to 3 years' },
  { id: 3, name: 'Student Route (Tier 4)', subclass: 'Student Route', country: 'United Kingdom', flag: '🇬🇧', category: 'Student', fee: 490, currency: 'GBP', min: 3, max: 3, approval: 85, sync: 'Mar 2026', status: 'Active', rights: '20 hrs/week', postStudy: '2 years' },
  { id: 4, name: 'National Visa for Study (D)', subclass: 'Type D', country: 'Germany', flag: '🇩🇪', category: 'Student', fee: 75, currency: 'EUR', min: 4, max: 12, approval: 79, sync: 'Jan 2026', status: 'Active', rights: '20 hrs/week', postStudy: '18 months' },
  { id: 5, name: 'Temporary Skill Shortage (482)', subclass: 'Subclass 482', country: 'Australia', flag: '🇦🇺', category: 'Work', fee: 315, currency: 'AUD', min: 12, max: 16, approval: 76, sync: 'Feb 2026', status: 'Active', rights: 'Full-time', postStudy: 'N/A' },
  { id: 6, name: 'Employer-Specific Work Permit', subclass: 'Work Permit', country: 'Canada', flag: '🇨🇦', category: 'Work', fee: 155, currency: 'CAD', min: 5, max: 10, approval: 72, sync: 'Jan 2026', status: 'Active', rights: 'Full-time', postStudy: 'N/A' },
  { id: 7, name: 'Skilled Worker Visa', subclass: 'Skilled Worker', country: 'United Kingdom', flag: '🇬🇧', category: 'Work', fee: 610, currency: 'GBP', min: 3, max: 8, approval: 80, sync: 'Mar 2026', status: 'Active', rights: 'Full-time', postStudy: 'N/A' },
  { id: 8, name: 'Visitor Visa (Subclass 600)', subclass: 'Subclass 600', country: 'Australia', flag: '🇦🇺', category: 'Visit', fee: 145, currency: 'AUD', min: 2, max: 4, approval: 91, sync: 'Mar 2026', status: 'Active', rights: 'Not permitted', postStudy: 'N/A' },
  { id: 9, name: 'Temporary Resident Visa (V-1)', subclass: 'Visitor Visa', country: 'Canada', flag: '🇨🇦', category: 'Visit', fee: 100, currency: 'CAD', min: 2, max: 8, approval: 64, sync: 'Jan 2026', status: 'Active', rights: 'Not permitted', postStudy: 'N/A' },
  { id: 10, name: 'Standard Visitor Visa', subclass: 'Visitor Visa', country: 'United Kingdom', flag: '🇬🇧', category: 'Visit', fee: 115, currency: 'GBP', min: 3, max: 3, approval: 78, sync: 'Mar 2026', status: 'Active', rights: 'Not permitted', postStudy: 'N/A' },
  { id: 11, name: 'Fee Paying Student Visa', subclass: 'Student Visa', country: 'New Zealand', flag: '🇳🇿', category: 'Student', fee: 375, currency: 'NZD', min: 4, max: 6, approval: 90, sync: 'Mar 2026', status: 'Active', rights: '20 hrs/week', postStudy: '1–3 years' },
  { id: 12, name: 'Study Visa (Stamp 2)', subclass: 'Stamp 2', country: 'Ireland', flag: '🇮🇪', category: 'Student', fee: 60, currency: 'EUR', min: 2, max: 8, approval: 82, sync: 'Feb 2026', status: 'Active', rights: '20 hrs/week', postStudy: 'Varies' },
  { id: 13, name: 'EU Blue Card (Work)', subclass: 'EU Blue Card', country: 'Germany', flag: '🇩🇪', category: 'Work', fee: 75, currency: 'EUR', min: 4, max: 8, approval: 74, sync: 'Jan 2026', status: 'Active', rights: 'Full-time', postStudy: 'N/A' },
  { id: 14, name: "Student's Pass (STP - ICA)", subclass: 'Student Pass', country: 'Singapore', flag: '🇸🇬', category: 'Student', fee: 30, currency: 'SGD', min: 4, max: 4, approval: 87, sync: 'Dec 2025', status: 'Active', rights: 'Limited', postStudy: 'Varies' },
  { id: 15, name: 'Green Visa for Investors', subclass: 'Investor Visa', country: 'UAE', flag: '🇦🇪', category: 'Business', fee: 370, currency: 'AED', min: 2, max: 3, approval: 92, sync: 'Mar 2026', status: 'Active', rights: 'As permitted', postStudy: 'N/A' },
]

const inputClass = 'w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-[#087653] focus:ring-2 focus:ring-[#087653]/10'
const labelClass = 'mb-1.5 block text-xs font-semibold text-slate-600'

function StatCard({ icon: Icon, label, value, note, iconColor = 'bg-emerald-100 text-[#087653]' }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-start justify-between gap-2">
        <div className={`rounded-xl p-2.5 ${iconColor}`}>
          <Icon size={19} />
        </div>
        <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-[#087653]">{note}</span>
      </div>
      <p className="mt-3 text-2xl font-bold tracking-tight text-[#075b3b] sm:text-3xl">{value}</p>
      <p className="mt-1 text-xs text-slate-500">{label}</p>
    </div>
  )
}

export default function Visas() {
  const [visas, setVisas] = useState(initialVisas)
  const [search, setSearch] = useState('')
  const [countryFilter, setCountryFilter] = useState('All Countries')
  const [categoryFilter, setCategoryFilter] = useState('All Categories')
  const [statusFilter, setStatusFilter] = useState('All Statuses')
  const [selectedVisa, setSelectedVisa] = useState(null)
  const [page, setPage] = useState(1)
  const [savedMessage, setSavedMessage] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)

  const filteredVisas = useMemo(() => {
    return visas.filter((visa) => {
      const matchesSearch = `${visa.name} ${visa.country} ${visa.subclass}`.toLowerCase().includes(search.toLowerCase())
      const matchesCountry = countryFilter === 'All Countries' || visa.country === countryFilter
      const matchesCategory = categoryFilter === 'All Categories' || visa.category === categoryFilter
      const matchesStatus = statusFilter === 'All Statuses' || visa.status === statusFilter
      return matchesSearch && matchesCountry && matchesCategory && matchesStatus
    })
  }, [visas, search, countryFilter, categoryFilter, statusFilter])

  const pageSize = 15
  const totalPages = Math.max(1, Math.ceil(filteredVisas.length / pageSize))
  const visibleVisas = filteredVisas.slice((page - 1) * pageSize, page * pageSize)

  function updateSelected(field, value) {
    setSelectedVisa((current) => ({ ...current, [field]: value }))
  }

  function saveVisa() {
    if (!selectedVisa?.name.trim() || !selectedVisa?.country) {
      setSavedMessage('Please complete the visa name and country.')
      return
    }

    setVisas((current) => {
      const exists = current.some((visa) => visa.id === selectedVisa.id)
      return exists
        ? current.map((visa) => visa.id === selectedVisa.id ? selectedVisa : visa)
        : [{ ...selectedVisa, id: Date.now(), flag: '🌐', currency: selectedVisa.currency || 'USD', status: selectedVisa.status || 'Active' }, ...current]
    })
    setSavedMessage('Visa details saved successfully.')
    setSelectedVisa(null)
    setShowAddForm(false)
  }

  function exportData() {
    const header = ['Visa Name', 'Country', 'Category', 'Fee', 'Currency', 'Processing Min (weeks)', 'Processing Max (weeks)', 'Approval Rate', 'Status']
    const rows = filteredVisas.map((v) => [v.name, v.country, v.category, v.fee, v.currency, v.min, v.max, v.approval, v.status])
    const csv = [header, ...rows].map((row) => row.map((value) => `"${String(value ?? '').replaceAll('"', '""')}"`).join(',')).join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }))
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'visa-management.csv'
    anchor.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-full text-slate-900">
      <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <div className="flex items-center gap-3">
            <span className="rounded-xl bg-white p-2.5 text-[#087653] shadow-sm"><FileText size={21} /></span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight">Visa Management</h1>
                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-[#087653]">{visas.length} active registries</span>
              </div>
              <p className="mt-1 text-sm text-slate-600">Manage visa types, statutory requirements, consular fees, and processing benchmarks globally.</p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={exportData} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold hover:bg-slate-50">
            <Download size={16} /> Export Data
          </button>
          <button onClick={() => { setSelectedVisa({ id: null, name: '', subclass: '', country: 'Australia', flag: '🌐', category: 'Student', fee: 0, currency: 'AUD', min: 2, max: 6, approval: 80, sync: 'Not synced', status: 'Active', rights: '', postStudy: '' }); setShowAddForm(true); setSavedMessage('') }} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#087653] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#065d40]">
            <Plus size={17} /> Add Visa Type
          </button>
        </div>
      </div>

      <div className="mb-5 grid grid-cols-2 gap-3 xl:grid-cols-4">
        <StatCard icon={FileText} label="Total Visa Types" value="120" note="↗ 8 additions this quarter" />
        <StatCard icon={AlertTriangle} label="Pending Updates" value="18" note="6 fee revisions awaiting sync" iconColor="bg-red-100 text-red-700" />
        <StatCard icon={TrendingUp} label="Avg Approval Rate" value="88%" note="Global index" iconColor="bg-blue-100 text-blue-700" />
        <StatCard icon={Clock} label="Avg Processing" value="4.2 wks" note="−4 days vs standard SLA" iconColor="bg-indigo-100 text-indigo-700" />
      </div>

      {savedMessage && (
        <div className="mb-4 flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-[#075b3b]" role="status">
          {savedMessage}
          <button onClick={() => setSavedMessage('')} aria-label="Dismiss message"><X size={16} /></button>
        </div>
      )}

      <div className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-[minmax(220px,1fr)_auto_auto_auto]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
          <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1) }} placeholder="Search visa type or country..." className={`${inputClass} pl-10`} />
        </div>
        <select value={countryFilter} onChange={(e) => { setCountryFilter(e.target.value); setPage(1) }} className={inputClass}>
          <option>All Countries</option>
          {[...new Set(visas.map((v) => v.country))].sort().map((country) => <option key={country}>{country}</option>)}
        </select>
        <select value={categoryFilter} onChange={(e) => { setCategoryFilter(e.target.value); setPage(1) }} className={inputClass}>
          <option>All Categories</option>
          {['Student', 'Work', 'Visit', 'Business'].map((category) => <option key={category}>{category}</option>)}
        </select>
        <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1) }} className={inputClass}>
          <option>All Statuses</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] border-collapse text-left text-xs">
            <thead className="bg-[#eef3ff] text-[10px] uppercase tracking-wider text-slate-700">
              <tr>
                <th className="px-3 py-4 font-bold">Visa Type</th>
                <th className="px-3 py-4 font-bold">Country</th>
                <th className="px-3 py-4 font-bold">Category</th>
                <th className="px-3 py-4 font-bold">Gov. Fee</th>
                <th className="px-3 py-4 font-bold">Processing</th>
                <th className="px-3 py-4 font-bold">Approval</th>
                <th className="px-3 py-4 font-bold">Last Sync</th>
                <th className="px-3 py-4 font-bold">Status</th>
                <th className="px-3 py-4 font-bold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {visibleVisas.map((visa) => (
                <tr key={visa.id} className="transition hover:bg-emerald-50/40">
                  <td className="px-3 py-3.5">
                    <p className="max-w-48 font-semibold text-slate-900">{visa.name}</p>
                    <p className="mt-1 text-[10px] text-slate-500">{visa.subclass}</p>
                  </td>
                  <td className="px-3 py-3.5"><span className="mr-1.5">{visa.flag}</span>{visa.country}</td>
                  <td className="px-3 py-3.5"><span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${visa.category === 'Student' ? 'bg-emerald-100 text-emerald-800' : visa.category === 'Work' ? 'bg-blue-100 text-blue-800' : visa.category === 'Business' ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-700'}`}>{visa.category}</span></td>
                  <td className="px-3 py-3.5 font-medium">{visa.currency} {visa.fee}</td>
                  <td className="px-3 py-3.5">{visa.min === visa.max ? `${visa.min} wks` : `${visa.min}–${visa.max} wks`}</td>
                  <td className="px-3 py-3.5">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{visa.approval}%</span>
                      <div className="h-1.5 w-10 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-[#087653]" style={{ width: `${visa.approval}%` }} /></div>
                    </div>
                  </td>
                  <td className="px-3 py-3.5 text-slate-500">{visa.sync}</td>
                  <td className="px-3 py-3.5"><span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-semibold text-emerald-800">● {visa.status}</span></td>
                  <td className="px-3 py-3.5"><button onClick={() => { setSelectedVisa({ ...visa }); setShowAddForm(false); setSavedMessage('') }} className="rounded-lg p-2 text-[#087653] hover:bg-emerald-50" aria-label={`Edit ${visa.name}`}><Pencil size={15} /></button></td>
                </tr>
              ))}
              {visibleVisas.length === 0 && <tr><td colSpan={9} className="px-4 py-12 text-center text-sm text-slate-500">No visa types match your filters.</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col gap-3 border-t border-slate-100 px-4 py-3 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>Showing {filteredVisas.length ? (page - 1) * pageSize + 1 : 0}–{Math.min(page * pageSize, filteredVisas.length)} of {filteredVisas.length} visa types</span>
          <div className="flex items-center gap-2">
            <button disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))} className="rounded-lg border border-slate-200 px-3 py-2 disabled:opacity-40"><ChevronLeft size={14} /></button>
            <span className="rounded-lg bg-[#075b3b] px-3 py-2 font-semibold text-white">{page}</span>
            <button disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))} className="rounded-lg border border-slate-200 px-3 py-2 disabled:opacity-40"><ChevronRight size={14} /></button>
          </div>
        </div>
      </div>

      {selectedVisa && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/30" onMouseDown={(e) => { if (e.target === e.currentTarget) { setSelectedVisa(null); setShowAddForm(false) } }}>
          <aside className="flex h-full w-full max-w-md flex-col overflow-y-auto bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-[#f3f6ff] px-5 py-4">
              <div>
                <h2 className="font-bold text-slate-900">{showAddForm ? 'Add Visa Type' : 'Edit Visa Type'}</h2>
                <p className="mt-1 text-xs text-slate-500">{selectedVisa.category} Visa · {selectedVisa.country}</p>
              </div>
              <button onClick={() => { setSelectedVisa(null); setShowAddForm(false) }} aria-label="Close panel" className="rounded-lg p-2 hover:bg-white"><X size={18} /></button>
            </div>

            <div className="flex-1 space-y-4 p-5">
              <div>
                <label className={labelClass}>Visa Name & Subclass</label>
                <input className={inputClass} value={selectedVisa.name} onChange={(e) => updateSelected('name', e.target.value)} placeholder="Visa name" />
                <input className={`${inputClass} mt-2`} value={selectedVisa.subclass} onChange={(e) => updateSelected('subclass', e.target.value)} placeholder="Subclass" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div><label className={labelClass}>Country</label><select className={inputClass} value={selectedVisa.country} onChange={(e) => updateSelected('country', e.target.value)}>{['Australia', 'Canada', 'United Kingdom', 'Germany', 'New Zealand', 'Ireland', 'Singapore', 'UAE'].map((c) => <option key={c}>{c}</option>)}</select></div>
                <div><label className={labelClass}>Category</label><select className={inputClass} value={selectedVisa.category} onChange={(e) => updateSelected('category', e.target.value)}>{['Student', 'Work', 'Visit', 'Business'].map((c) => <option key={c}>{c}</option>)}</select></div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div><label className={labelClass}>Application Fee</label><input type="number" min="0" className={inputClass} value={selectedVisa.fee} onChange={(e) => updateSelected('fee', Number(e.target.value))} /></div>
                <div><label className={labelClass}>Currency</label><select className={inputClass} value={selectedVisa.currency} onChange={(e) => updateSelected('currency', e.target.value)}>{['AUD', 'CAD', 'GBP', 'EUR', 'NZD', 'SGD', 'AED', 'USD'].map((c) => <option key={c}>{c}</option>)}</select></div>
              </div>

              <div>
                <label className={labelClass}>Processing SLA Window (weeks)</label>
                <div className="grid grid-cols-2 gap-3">
                  <input aria-label="Minimum processing weeks" type="number" min="1" className={inputClass} value={selectedVisa.min} onChange={(e) => updateSelected('min', Number(e.target.value))} />
                  <input aria-label="Maximum processing weeks" type="number" min={selectedVisa.min} className={inputClass} value={selectedVisa.max} onChange={(e) => updateSelected('max', Number(e.target.value))} />
                </div>
              </div>

              <div><label className={labelClass}>Benchmark Approval Rate (%)</label><input type="number" min="0" max="100" className={inputClass} value={selectedVisa.approval} onChange={(e) => updateSelected('approval', Math.min(100, Math.max(0, Number(e.target.value))))} /></div>
              <div><label className={labelClass}>Work Rights</label><input className={inputClass} value={selectedVisa.rights || ''} onChange={(e) => updateSelected('rights', e.target.value)} /></div>
              <div><label className={labelClass}>Post-Study Work</label><input className={inputClass} value={selectedVisa.postStudy || ''} onChange={(e) => updateSelected('postStudy', e.target.value)} /></div>

              <div><label className={labelClass}>Status</label><select className={inputClass} value={selectedVisa.status} onChange={(e) => updateSelected('status', e.target.value)}><option>Active</option><option>Inactive</option></select></div>

              <div className="rounded-xl bg-blue-50 p-3 text-xs leading-5 text-blue-900">
                Verify visa fees, work rights, processing times, and statutory requirements with the relevant official immigration website before publishing changes.
              </div>
            </div>

            <div className="sticky bottom-0 flex gap-2 border-t border-slate-100 bg-white p-4">
              <button onClick={() => { setSelectedVisa(null); setShowAddForm(false) }} className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">Discard</button>
              <button onClick={saveVisa} className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#075b3b] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#06482f]"><Check size={16} /> Save Changes</button>
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}
