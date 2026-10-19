
import { useMemo, useState } from 'react'
import {
  GraduationCap,
  CalendarDays,
  Globe,
  Trophy,
  Search,
  Upload,
  Plus,
  ChevronLeft,
  ChevronRight,
  Star,
  RotateCcw,
  X,
} from 'lucide-react'

const initialUniversities = [
  { id: 1, name: 'UNSW Sydney', location: 'Sydney, NSW', country: 'Australia', flag: '🇦🇺', rank: 19, courses: 48, tuition: '$32,000 AUD', ielts: '6.5+', featured: true, status: 'Active' },
  { id: 2, name: 'University of Toronto', location: 'Toronto, ON', country: 'Canada', flag: '🇨🇦', rank: 21, courses: 36, tuition: 'CAD 28,000', ielts: '6.5+', featured: true, status: 'Active' },
  { id: 3, name: 'University of Melbourne', location: 'Melbourne, VIC', country: 'Australia', flag: '🇦🇺', rank: 33, courses: 52, tuition: '$34,500 AUD', ielts: '6.5+', featured: true, status: 'Active' },
  { id: 4, name: 'University of Edinburgh', location: 'Edinburgh, Scotland', country: 'UK', flag: '🇬🇧', rank: 22, courses: 41, tuition: '£24,000 GBP', ielts: '6.5+', featured: true, status: 'Active' },
  { id: 5, name: 'Monash University', location: 'Clayton, VIC', country: 'Australia', flag: '🇦🇺', rank: 42, courses: 38, tuition: '$31,000 AUD', ielts: '6.0+', featured: false, status: 'Active' },
  { id: 6, name: 'McGill University', location: 'Montreal, QC', country: 'Canada', flag: '🇨🇦', rank: 46, courses: 29, tuition: 'CAD 25,000', ielts: '6.5+', featured: false, status: 'Active' },
  { id: 7, name: 'University of Manchester', location: 'Manchester, UK', country: 'UK', flag: '🇬🇧', rank: 28, courses: 44, tuition: '£19,000 GBP', ielts: '6.0+', featured: true, status: 'Active' },
  { id: 8, name: 'TU Munich', location: 'Munich, Bavaria', country: 'Germany', flag: '🇩🇪', rank: 37, courses: 22, tuition: '€1,500/sem', ielts: 'B2 Level', featured: false, status: 'Active' },
  { id: 9, name: 'University of Auckland', location: 'Auckland', country: 'New Zealand', flag: '🇳🇿', rank: 68, courses: 18, tuition: 'NZD 32,000', ielts: '6.5+', featured: false, status: 'Active' },
  { id: 10, name: 'NUS Singapore', location: 'Kent Ridge, Singapore', country: 'Singapore', flag: '🇸🇬', rank: 8, courses: 31, tuition: 'SGD 20,000', ielts: '6.5+', featured: true, status: 'Active' },
  { id: 11, name: 'Dublin City University', location: 'Glasnevin, Dublin', country: 'Ireland', flag: '🇮🇪', rank: 251, courses: 15, tuition: '€12,000 EUR', ielts: '6.0+', featured: false, status: 'Active' },
  { id: 12, name: 'Leiden University', location: 'South Holland', country: 'Netherlands', flag: '🇳🇱', rank: 128, courses: 19, tuition: '€10,000 EUR', ielts: '6.5+', featured: false, status: 'Draft' },
]

const countries = ['All Countries', ...new Set(initialUniversities.map((u) => u.country))]

function StatCard({ icon: Icon, value, label, note, tone = 'green' }) {
  const tones = {
    green: 'bg-emerald-100 text-emerald-800',
    red: 'bg-red-50 text-red-800',
    blue: 'bg-blue-100 text-blue-800',
    mint: 'bg-green-100 text-green-800',
  }

  return (
    <div className="min-w-0 rounded-xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-2xl font-bold tracking-tight text-emerald-950 sm:text-3xl">{value}</p>
          <p className="mt-1 text-sm font-medium text-slate-800">{label}</p>
        </div>
        <div className={`rounded-xl p-2.5 ${tones[tone]}`}>
          <Icon size={19} />
        </div>
      </div>
      <p className="mt-3 text-xs text-emerald-800">{note}</p>
    </div>
  )
}

export default function Universities() {
  const [universities, setUniversities] = useState(initialUniversities)
  const [search, setSearch] = useState('')
  const [country, setCountry] = useState('All Countries')
  const [ranking, setRanking] = useState('All Rankings')
  const [status, setStatus] = useState('All Status')
  const [sortBy, setSortBy] = useState('QS Rank')
  const [selected, setSelected] = useState([])
  const [editing, setEditing] = useState(null)
  const [showAdd, setShowAdd] = useState(false)
  const [notice, setNotice] = useState('')

  const filtered = useMemo(() => {
    const result = universities.filter((u) => {
      const matchesSearch =
        `${u.name} ${u.location} ${u.country}`.toLowerCase().includes(search.toLowerCase())
      const matchesCountry = country === 'All Countries' || u.country === country
      const matchesStatus = status === 'All Status' || u.status === status
      const matchesRanking =
        ranking === 'All Rankings' ||
        (ranking === 'Top 50' && u.rank <= 50) ||
        (ranking === 'Top 100' && u.rank <= 100) ||
        (ranking === 'Top 200' && u.rank <= 200)

      return matchesSearch && matchesCountry && matchesStatus && matchesRanking
    })

    return result.sort((a, b) => {
      if (sortBy === 'Name A-Z') return a.name.localeCompare(b.name)
      if (sortBy === 'Courses') return b.courses - a.courses
      return a.rank - b.rank
    })
  }, [universities, search, country, ranking, status, sortBy])

  const toggleSelected = (id) => {
    setSelected((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
  }

  const toggleAll = () => {
    setSelected(
      selected.length === filtered.length ? [] : filtered.map((university) => university.id),
    )
  }

  const saveUniversity = (event) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const data = Object.fromEntries(form.entries())

    if (editing) {
      setUniversities((current) =>
        current.map((u) =>
          u.id === editing.id
            ? {
                ...u,
                name: data.name.trim(),
                country: data.country,
                location: data.location.trim(),
                rank: Number(data.rank) || u.rank,
                courses: Number(data.courses) || 0,
                tuition: data.tuition.trim(),
                ielts: data.ielts.trim(),
                status: data.status,
                featured: form.get('featured') === 'on',
              }
            : u,
        ),
      )
      setNotice('University changes saved successfully.')
    } else {
      const flagByCountry = {
        Australia: '🇦🇺',
        Canada: '🇨🇦',
        UK: '🇬🇧',
        Germany: '🇩🇪',
        'New Zealand': '🇳🇿',
        Singapore: '🇸🇬',
        Ireland: '🇮🇪',
        Netherlands: '🇳🇱',
      }

      setUniversities((current) => [
        ...current,
        {
          id: Math.max(0, ...current.map((u) => u.id)) + 1,
          name: data.name.trim(),
          location: data.location.trim(),
          country: data.country,
          flag: flagByCountry[data.country] || '🌍',
          rank: Number(data.rank) || 999,
          courses: Number(data.courses) || 0,
          tuition: data.tuition.trim(),
          ielts: data.ielts.trim(),
          featured: form.get('featured') === 'on',
          status: data.status,
        },
      ])
      setNotice('University added successfully.')
    }

    setEditing(null)
    setShowAdd(false)
  }

  const exportCsv = () => {
    const rows = [
      ['University', 'Country', 'QS Rank', 'Courses', 'Tuition', 'IELTS', 'Featured', 'Status'],
      ...filtered.map((u) => [
        u.name,
        u.country,
        u.rank,
        u.courses,
        u.tuition,
        u.ielts,
        u.featured ? 'Yes' : 'No',
        u.status,
      ]),
    ]

    const csv = rows
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n')

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'universities.csv'
    link.click()
    URL.revokeObjectURL(url)
  }

  const resetFilters = () => {
    setSearch('')
    setCountry('All Countries')
    setRanking('All Rankings')
    setStatus('All Status')
    setSortBy('QS Rank')
  }

  return (
    <div className="min-w-0 space-y-5">
      {notice && (
        <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          {notice}
          <button onClick={() => setNotice('')} aria-label="Dismiss notification">
            <X size={17} />
          </button>
        </div>
      )}

      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-emerald-100 p-3 text-emerald-900">
            <GraduationCap size={23} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-950 sm:text-2xl">University Management</h1>
            <p className="mt-1 text-sm text-slate-600">
              Manage all partner universities, rankings and course data globally.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={exportCsv}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            <Upload size={16} /> Import CSV
          </button>
          <button
            onClick={() => {
              setEditing(null)
              setShowAdd(true)
            }}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#075B3A] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#06492F]"
          >
            <Plus size={17} /> Add University
          </button>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={GraduationCap} value="3,800+" label="Total Universities" note="↗ +14.2% vs previous year" />
        <StatCard icon={CalendarDays} value="24" label="Added This Month" note="6 pending verification" tone="red" />
        <StatCard icon={Globe} value="48" label="Countries Covered" note="3 new regions opened Q4" tone="blue" />
        <StatCard icon={Trophy} value="QS #8" label="Best Ranked (NUS)" note="82 Top 100 institutions" tone="mint" />
      </section>

      <section className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
        <div className="flex flex-col gap-2 lg:flex-row">
          <div className="relative min-w-0 flex-1">
            <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search university name or city..."
              className="w-full rounded-lg border border-transparent bg-[#EEF3FF] py-2.5 pl-10 pr-3 text-sm outline-none focus:border-emerald-300"
            />
          </div>

          <select value={country} onChange={(e) => setCountry(e.target.value)} className="rounded-lg bg-[#EEF3FF] px-3 py-2.5 text-sm outline-none">
            {countries.map((item) => <option key={item}>{item}</option>)}
          </select>

          <select value={ranking} onChange={(e) => setRanking(e.target.value)} className="rounded-lg bg-[#EEF3FF] px-3 py-2.5 text-sm outline-none">
            {['All Rankings', 'Top 50', 'Top 100', 'Top 200'].map((item) => <option key={item}>{item}</option>)}
          </select>

          <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-lg bg-[#EEF3FF] px-3 py-2.5 text-sm outline-none">
            {['All Status', 'Active', 'Draft'].map((item) => <option key={item}>{item}</option>)}
          </select>

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="rounded-lg bg-[#EEF3FF] px-3 py-2.5 text-sm outline-none">
            {['QS Rank', 'Name A-Z', 'Courses'].map((item) => <option key={item}>{item}</option>)}
          </select>

          <button onClick={resetFilters} title="Reset filters" className="rounded-lg bg-[#EEF3FF] p-2.5 text-slate-700 hover:bg-blue-100">
            <RotateCcw size={17} />
          </button>
        </div>
      </section>

      <section className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] border-collapse text-left">
            <thead className="bg-[#EEF3FF] text-[11px] uppercase tracking-wide text-slate-700">
              <tr>
                <th className="w-12 px-4 py-4">
                  <input type="checkbox" aria-label="Select all universities" checked={filtered.length > 0 && selected.length === filtered.length} onChange={toggleAll} />
                </th>
                <th className="px-3 py-4 font-semibold">University</th>
                <th className="px-3 py-4 font-semibold">Country</th>
                <th className="px-3 py-4 font-semibold">QS Rank</th>
                <th className="px-3 py-4 font-semibold">Courses</th>
                <th className="px-3 py-4 font-semibold">Tuition From</th>
                <th className="px-3 py-4 font-semibold">IELTS</th>
                <th className="px-3 py-4 font-semibold">Featured</th>
                <th className="px-3 py-4 font-semibold">Status</th>
                <th className="px-3 py-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-50">
              {filtered.map((u, index) => (
                <tr key={u.id} className="transition hover:bg-emerald-50/40">
                  <td className="px-4 py-4">
                    <input type="checkbox" aria-label={`Select ${u.name}`} checked={selected.includes(u.id)} onChange={() => toggleSelected(u.id)} />
                  </td>
                  <td className="px-3 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg font-bold text-emerald-900 sm:flex ${index % 2 ? 'bg-blue-100' : 'bg-emerald-100'}`}>
                        {u.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{u.name}</p>
                        <p className="mt-1 text-xs text-slate-500">{u.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-4 text-sm text-slate-800">
                    <span className="mr-1.5">{u.flag}</span>{u.country}
                  </td>
                  <td className="px-3 py-4">
                    <span className={`rounded-full px-2 py-1 text-xs font-semibold ${u.rank <= 50 ? 'bg-blue-100 text-slate-800' : 'bg-slate-100 text-slate-700'}`}>
                      #{u.rank}
                    </span>
                  </td>
                  <td className="px-3 py-4 text-sm text-slate-700">{u.courses} courses</td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-emerald-950">{u.tuition}</td>
                  <td className="px-3 py-4 text-sm text-slate-800">{u.ielts}</td>
                  <td className="px-3 py-4">
                    <button
                      onClick={() => setUniversities((current) => current.map((item) => item.id === u.id ? { ...item, featured: !item.featured } : item))}
                      title={u.featured ? 'Remove featured status' : 'Feature university'}
                      className={`text-xl ${u.featured ? 'text-amber-500' : 'text-blue-200 hover:text-amber-500'}`}
                    >
                      {u.featured ? '☆' : '☆'}
                    </button>
                  </td>
                  <td className="px-3 py-4">
                    <span className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase ${u.status === 'Active' ? 'bg-emerald-200 text-emerald-900' : 'bg-red-100 text-red-800'}`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="px-3 py-4">
                    <button
                      onClick={() => {
                        setEditing(u)
                        setShowAdd(true)
                      }}
                      className="rounded-lg px-2 py-1 text-sm font-semibold text-emerald-800 hover:bg-emerald-50"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="10" className="px-4 py-12 text-center text-sm text-slate-500">
                    No universities match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <footer className="flex flex-col gap-3 border-t border-slate-100 bg-[#F7F9FF] px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-700">
            Showing {filtered.length ? 1 : 0}–{filtered.length} of {universities.length.toLocaleString()} universities
            {selected.length > 0 && ` · ${selected.length} selected`}
          </p>
          <div className="flex items-center gap-2">
            <button disabled className="rounded-lg p-2 text-slate-400 disabled:opacity-50"><ChevronLeft size={16} /></button>
            <button className="rounded-lg bg-[#075B3A] px-3 py-2 text-sm font-semibold text-white">1</button>
            <button className="rounded-lg bg-[#EEF3FF] px-3 py-2 text-sm text-slate-700">2</button>
            <button className="rounded-lg bg-[#EEF3FF] px-3 py-2 text-sm text-slate-700">3</button>
            <span className="px-1 text-slate-500">...</span>
            <button className="rounded-lg bg-[#EEF3FF] px-3 py-2 text-sm text-slate-700">317</button>
            <button className="rounded-lg bg-[#EEF3FF] p-2 text-slate-700"><ChevronRight size={16} /></button>
          </div>
        </footer>
      </section>

      {selected.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3">
          <p className="text-sm font-medium text-emerald-900">{selected.length} university/universities selected</p>
          <button
            onClick={() => {
              setUniversities((current) => current.map((u) => selected.includes(u.id) ? { ...u, status: 'Draft' } : u))
              setSelected([])
              setNotice('Selected universities have been moved to Draft status.')
            }}
            className="rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-100"
          >
            Move selected to Draft
          </button>
        </div>
      )}

      {showAdd && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <button aria-label="Close university editor" onClick={() => { setShowAdd(false); setEditing(null) }} className="absolute inset-0 bg-slate-950/30" />
          <div className="relative flex h-full w-full max-w-xl flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <h2 className="text-lg font-bold text-slate-950">{editing ? 'Edit University' : 'Add University'}</h2>
                <p className="mt-1 text-sm text-slate-500">Update university and ranking information</p>
              </div>
              <button onClick={() => { setShowAdd(false); setEditing(null) }} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><X size={19} /></button>
            </div>

            <form onSubmit={saveUniversity} className="flex min-h-0 flex-1 flex-col">
              <div className="flex-1 space-y-5 overflow-y-auto p-6">
                <label className="block text-sm font-medium text-slate-700">
                  University Name *
                  <input name="name" required defaultValue={editing?.name || ''} className="mt-2 w-full rounded-xl border border-slate-200 bg-[#EEF3FF] px-4 py-3 outline-none focus:border-emerald-500" placeholder="e.g. UNSW Sydney" />
                </label>

                <label className="block text-sm font-medium text-slate-700">
                  Country *
                  <select name="country" defaultValue={editing?.country || 'Australia'} className="mt-2 w-full rounded-xl border border-slate-200 bg-[#EEF3FF] px-4 py-3 outline-none focus:border-emerald-500">
                    {countries.filter((item) => item !== 'All Countries').map((item) => <option key={item}>{item}</option>)}
                    {!countries.includes(editing?.country) && editing?.country && <option>{editing.country}</option>}
                  </select>
                </label>

                <label className="block text-sm font-medium text-slate-700">
                  City / Location
                  <input name="location" defaultValue={editing?.location || ''} className="mt-2 w-full rounded-xl border border-slate-200 bg-[#EEF3FF] px-4 py-3 outline-none focus:border-emerald-500" placeholder="e.g. Sydney, NSW" />
                </label>

                <div className="grid grid-cols-2 gap-4">
                  <label className="block text-sm font-medium text-slate-700">
                    QS Rank
                    <input name="rank" type="number" min="1" defaultValue={editing?.rank ?? ''} className="mt-2 w-full rounded-xl border border-slate-200 bg-[#EEF3FF] px-4 py-3 outline-none focus:border-emerald-500" />
                  </label>
                  <label className="block text-sm font-medium text-slate-700">
                    Number of Courses
                    <input name="courses" type="number" min="0" defaultValue={editing?.courses ?? ''} className="mt-2 w-full rounded-xl border border-slate-200 bg-[#EEF3FF] px-4 py-3 outline-none focus:border-emerald-500" />
                  </label>
                </div>

                <label className="block text-sm font-medium text-slate-700">
                  Tuition From
                  <input name="tuition" defaultValue={editing?.tuition || ''} className="mt-2 w-full rounded-xl border border-slate-200 bg-[#EEF3FF] px-4 py-3 outline-none focus:border-emerald-500" placeholder="e.g. AUD 32,000" />
                </label>

                <label className="block text-sm font-medium text-slate-700">
                  IELTS Requirement
                  <input name="ielts" defaultValue={editing?.ielts || ''} className="mt-2 w-full rounded-xl border border-slate-200 bg-[#EEF3FF] px-4 py-3 outline-none focus:border-emerald-500" placeholder="e.g. 6.5+" />
                </label>

                <label className="block text-sm font-medium text-slate-700">
                  Status
                  <select name="status" defaultValue={editing?.status || 'Active'} className="mt-2 w-full rounded-xl border border-slate-200 bg-[#EEF3FF] px-4 py-3 outline-none focus:border-emerald-500">
                    <option>Active</option>
                    <option>Draft</option>
                  </select>
                </label>

                <label className="flex items-center justify-between rounded-xl bg-[#EEF3FF] p-4">
                  <span>
                    <span className="block text-sm font-semibold text-slate-800">Featured University</span>
                    <span className="mt-1 block text-xs text-slate-500">Highlight this university on public pages</span>
                  </span>
                  <input name="featured" type="checkbox" defaultChecked={editing?.featured ?? false} className="h-4 w-4 accent-emerald-700" />
                </label>
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-100 p-5">
                <button type="button" onClick={() => { setShowAdd(false); setEditing(null) }} className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                  Discard
                </button>
                <button type="submit" className="rounded-xl bg-[#075B3A] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#06492F]">
                  ✓ Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
