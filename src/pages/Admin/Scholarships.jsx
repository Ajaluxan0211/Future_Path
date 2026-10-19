
import { useMemo, useRef, useState } from 'react'
import {
  Award,
  Search,
  Plus,
  Upload,
  Download,
  Clock3,
  Wallet,
  TrendingUp,
  X,
  Check,
  ChevronDown,
  CalendarDays,
  Globe2,
  Pencil,
  Eye,
  GraduationCap,
  CircleDollarSign,
} from 'lucide-react'

const initialScholarships = [
  {
    id: 1,
    title: 'Rhodes Trust Global Leadership',
    provider: 'Rhodes Trust',
    country: 'Global',
    level: "Master's / DPhil",
    funding: '$120,000',
    deadline: '2026-11-15',
    applications: 847,
    status: 'Active',
    fundingType: 'Full Ride',
    field: 'All Disciplines',
    valueAmount: '120000',
    targetCountry: 'Global',
    degreeLevel: "Master's",
    successRate: '12',
    website: 'https://www.rhodeshouse.ox.ac.uk/',
    description: 'A prestigious international scholarship for outstanding students with academic excellence and leadership potential.',
    requirements: "Strong academic record, leadership experience, and eligibility for the selected university.",
  },
  {
    id: 2,
    title: 'Fulbright Graduate Student Award',
    provider: 'U.S. Department of State',
    country: 'United States',
    level: "Master's",
    funding: 'Full Ride',
    deadline: '2026-10-12',
    applications: 1204,
    status: 'Closing Soon',
    fundingType: 'Full Ride',
    field: 'All Disciplines',
    valueAmount: '60000',
    targetCountry: 'United States (USA)',
    degreeLevel: "Master's",
    successRate: '12',
    website: 'https://eca.state.gov/fulbright',
    description: 'Supports graduate students, young professionals, and artists to study and conduct research in the United States.',
    requirements: "A bachelor's degree, strong academic performance, English proficiency, and program-specific eligibility.",
  },
  {
    id: 3,
    title: 'Gates Cambridge Scholarship',
    provider: 'University of Cambridge',
    country: 'United Kingdom',
    level: "Master's / PhD",
    funding: '$85,000',
    deadline: '2027-01-05',
    applications: 923,
    status: 'Active',
    fundingType: 'Full Funding',
    valueAmount: '85000',
    targetCountry: 'United Kingdom',
    degreeLevel: "Master's",
    successRate: '10',
    website: 'https://www.gatescambridge.org/',
    description: 'A postgraduate scholarship supporting exceptional applicants who want to pursue study at the University of Cambridge.',
    requirements: 'Academic excellence, a strong case for the chosen course, leadership potential, and admission eligibility.',
  },
  {
    id: 4,
    title: 'Vanier Canada Graduate Scholarship',
    provider: 'Government of Canada',
    country: 'Canada',
    level: 'PhD',
    funding: '$50,000/yr',
    deadline: '2026-11-01',
    applications: 412,
    status: 'Closing Soon',
    fundingType: 'Full Funding',
    valueAmount: '50000',
    targetCountry: 'Canada',
    degreeLevel: 'PhD',
    successRate: '15',
    website: 'https://vanier.gc.ca/',
    description: 'A graduate scholarship recognizing doctoral students for academic excellence, research potential, and leadership.',
    requirements: 'Eligible doctoral nomination, strong research achievements, and compliance with program requirements.',
  },
  {
    id: 5,
    title: 'Erasmus Mundus Joint Masters',
    provider: 'European Commission',
    country: 'EU / Multi',
    level: "Master's",
    funding: 'Full Funding',
    deadline: '2027-02-14',
    applications: 2341,
    status: 'Active',
    fundingType: 'Full Funding',
    valueAmount: '50000',
    targetCountry: 'EU / Multi',
    degreeLevel: "Master's",
    successRate: '18',
    website: 'https://erasmus-plus.ec.europa.eu/',
    description: 'Joint international master programmes delivered by a consortium of higher education institutions.',
    requirements: 'A relevant undergraduate qualification and compliance with the selected programme requirements.',
  },
  {
    id: 6,
    title: 'Australia Awards Scholarship',
    provider: 'DFAT Australia',
    country: 'Australia',
    level: "Master's / PhD",
    funding: '$60,000/yr',
    deadline: '2027-04-30',
    applications: 389,
    status: 'Active',
    fundingType: 'Full Ride',
    valueAmount: '60000',
    targetCountry: 'Australia',
    degreeLevel: "Master's",
    successRate: '20',
    website: 'https://www.dfat.gov.au/',
    description: 'Scholarships supporting eligible students from participating countries to study at Australian institutions.',
    requirements: 'Citizenship and country-specific eligibility, academic requirements, and relevant application documents.',
  },
  {
    id: 7,
    title: 'Chevening Scholarship UK',
    provider: 'UK Government',
    country: 'United Kingdom',
    level: "Master's",
    funding: 'Full Tuition + Living',
    deadline: '2026-11-07',
    applications: 1876,
    status: 'Closing Soon',
    fundingType: 'Full Ride',
    valueAmount: '40000',
    targetCountry: 'United Kingdom',
    degreeLevel: "Master's",
    successRate: '8',
    website: 'https://www.chevening.org/',
    description: 'A UK government scholarship for future leaders to pursue eligible one-year master programmes.',
    requirements: 'Meet nationality and work experience criteria, qualify for an eligible course, and satisfy application requirements.',
  },
  {
    id: 8,
    title: 'DAAD Scholarship',
    provider: 'German Academic Exchange Service',
    country: 'Germany',
    level: "Master's / PhD",
    funding: '€1,200/month',
    deadline: '2026-10-15',
    applications: 634,
    status: 'Draft',
    fundingType: 'Partial Funding',
    valueAmount: '1200',
    targetCountry: 'Germany',
    degreeLevel: "Master's",
    successRate: '14',
    website: 'https://www.daad.de/',
    description: 'Funding opportunities for international students and researchers at German higher education institutions.',
    requirements: 'Requirements depend on the specific DAAD programme, qualification, and country of application.',
  },
]

const tabs = ['All', 'Active', 'Closing Soon', 'Expired', 'Drafts']

const emptyScholarship = {
  title: '',
  provider: '',
  country: 'Australia',
  level: "Master's",
  funding: '',
  deadline: '',
  applications: 0,
  status: 'Draft',
  fundingType: 'Full Funding',
  field: 'All Disciplines',
  valueAmount: '',
  targetCountry: 'Australia',
  degreeLevel: "Master's",
  successRate: '12',
  website: '',
  description: '',
  requirements: '',
}

const inputClass =
  'w-full rounded-xl border border-slate-200 bg-[#eff4ff] px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100'

function formatDate(date) {
  if (!date) return 'Not set'

  return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  })
}

function getStatus(item) {
  if (item.status === 'Draft') return 'Draft'
  if (item.status === 'Expired') return 'Expired'

  if (item.deadline) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const deadline = new Date(`${item.deadline}T00:00:00`)

    if (deadline < today) return 'Expired'

    const daysLeft = Math.ceil(
      (deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    )

    if (daysLeft <= 30) return 'Closing Soon'
  }

  return item.status === 'Closing Soon' ? 'Active' : item.status
}

function StatusBadge({ status }) {
  const styles = {
    Active: 'bg-emerald-100 text-emerald-800',
    'Closing Soon': 'bg-red-100 text-red-700',
    Expired: 'bg-slate-200 text-slate-600',
    Draft: 'bg-blue-100 text-blue-700',
  }

  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold ${
        styles[status] || styles.Draft
      }`}
    >
      {status === 'Closing Soon' && <Clock3 size={11} className="mr-1" />}
      {status}
    </span>
  )
}

function MetricCard({ icon: Icon, label, value, note, tone = 'green' }) {
  const tones = {
    green: 'bg-emerald-100 text-emerald-800',
    red: 'bg-red-100 text-red-800',
    blue: 'bg-blue-100 text-blue-800',
    mint: 'bg-emerald-100 text-emerald-800',
  }

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-semibold text-slate-600">{label}</p>
        <span className={`rounded-xl p-2 ${tones[tone]}`}>
          <Icon size={18} />
        </span>
      </div>
      <p className="mt-3 text-3xl font-bold tracking-tight text-emerald-950">
        {value}
      </p>
      <p className="mt-2 text-[11px] text-slate-500">{note}</p>
    </div>
  )
}

export default function Scholarships() {
  const [scholarships, setScholarships] = useState(initialScholarships)
  const [activeTab, setActiveTab] = useState('All')
  const [search, setSearch] = useState('')
  const [countryFilter, setCountryFilter] = useState('All Countries')
  const [levelFilter, setLevelFilter] = useState('All Levels')
  const [fundingFilter, setFundingFilter] = useState('All Funding')
  const [statusFilter, setStatusFilter] = useState('All Statuses')
  const [sortBy, setSortBy] = useState('deadline')
  const [selectedIds, setSelectedIds] = useState([])
  const [editing, setEditing] = useState(null)
  const [isAdding, setIsAdding] = useState(false)
  const [activeDetailTab, setActiveDetailTab] = useState('Details')
  const [notice, setNotice] = useState('')
  const importRef = useRef(null)

  const countries = useMemo(
    () => [...new Set(scholarships.map((item) => item.country))].sort(),
    [scholarships],
  )

  const filtered = useMemo(() => {
    let list = scholarships.map((item) => ({
      ...item,
      displayStatus: getStatus(item),
    }))

    if (activeTab !== 'All') {
      const target = activeTab === 'Drafts' ? 'Draft' : activeTab
      list = list.filter((item) => item.displayStatus === target)
    }

    if (countryFilter !== 'All Countries') {
      list = list.filter((item) => item.country === countryFilter)
    }

    if (levelFilter !== 'All Levels') {
      list = list.filter((item) => item.level.includes(levelFilter))
    }

    if (fundingFilter !== 'All Funding') {
      list = list.filter((item) => item.fundingType === fundingFilter)
    }

    if (statusFilter !== 'All Statuses') {
      list = list.filter((item) => item.displayStatus === statusFilter)
    }

    const query = search.trim().toLowerCase()

    if (query) {
      list = list.filter((item) =>
        [
          item.title,
          item.provider,
          item.country,
          item.level,
          item.fundingType,
        ].some((value) => String(value).toLowerCase().includes(query)),
      )
    }

    list.sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title)
      if (sortBy === 'applications') return b.applications - a.applications

      return (a.deadline || '9999-12-31').localeCompare(
        b.deadline || '9999-12-31',
      )
    })

    return list
  }, [
    scholarships,
    activeTab,
    search,
    countryFilter,
    levelFilter,
    fundingFilter,
    statusFilter,
    sortBy,
  ])

  const activeCount = scholarships.filter(
    (item) => getStatus(item) === 'Active',
  ).length

  const closingCount = scholarships.filter(
    (item) => getStatus(item) === 'Closing Soon',
  ).length

  const expiredCount = scholarships.filter(
    (item) => getStatus(item) === 'Expired',
  ).length

  const totalFunding = scholarships.reduce(
    (sum, item) => sum + (Number(item.valueAmount) || 0),
    0,
  )

  function showNotice(message) {
    setNotice(message)
    window.setTimeout(() => setNotice(''), 3000)
  }

  function toggleSelected(id) {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((selectedId) => selectedId !== id)
        : [...current, id],
    )
  }

  function toggleAll() {
    const visibleIds = filtered.map((item) => item.id)
    const allVisibleSelected =
      visibleIds.length > 0 &&
      visibleIds.every((id) => selectedIds.includes(id))

    setSelectedIds((current) =>
      allVisibleSelected
        ? current.filter((id) => !visibleIds.includes(id))
        : [...new Set([...current, ...visibleIds])],
    )
  }

  function saveScholarship(event) {
    event.preventDefault()

    if (!editing?.title?.trim() || !editing?.provider?.trim()) {
      showNotice('Please enter a scholarship title and provider.')
      return
    }

    if (isAdding) {
      const newItem = {
        ...editing,
        id: Date.now(),
        applications: 0,
        status: editing.status || 'Draft',
      }

      setScholarships((current) => [newItem, ...current])
      setActiveTab('All')
      setIsAdding(false)
      showNotice('Scholarship added successfully.')
    } else {
      setScholarships((current) =>
        current.map((item) =>
          item.id === editing.id ? { ...editing } : item,
        ),
      )
      showNotice('Scholarship changes saved successfully.')
    }

    setEditing(null)
  }

  function updateField(field, value) {
    setEditing((current) => ({ ...current, [field]: value }))
  }

  function exportCSV() {
    const headers = [
      'Scholarship',
      'Provider',
      'Country',
      'Level',
      'Funding',
      'Deadline',
      'Applications',
      'Status',
    ]

    const rows = filtered.map((item) => [
      item.title,
      item.provider,
      item.country,
      item.level,
      item.funding,
      item.deadline,
      item.applications,
      item.displayStatus || getStatus(item),
    ])

    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map((value) => `"${String(value ?? '').replaceAll('"', '""')}"`)
          .join(','),
      )
      .join('\n')

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
    link.download = 'agency-scholarships.csv'
    link.click()

    URL.revokeObjectURL(url)
    showNotice('Scholarship CSV exported.')
  }

  function importCSV(event) {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()

    reader.onload = () => {
      const lines = String(reader.result || '')
        .split(/\r?\n/)
        .filter((line) => line.trim())

      if (lines.length < 2) {
        showNotice('The CSV file does not contain scholarship rows.')
        return
      }

      const parseRow = (line) =>
        line.split(',').map((cell) =>
          cell.trim().replace(/^"|"$/g, '').replaceAll('""', '"'),
        )

      const headers = parseRow(lines[0]).map((header) =>
        header.toLowerCase().trim(),
      )

      const imported = lines.slice(1).map((line, index) => {
        const values = parseRow(line)
        const row = Object.fromEntries(
          headers.map((header, i) => [header, values[i] || '']),
        )

        return {
          ...emptyScholarship,
          id: Date.now() + index,
          title: row.title || row.scholarship || row.name || 'Imported Scholarship',
          provider: row.provider || row.organization || 'Imported Provider',
          country: row.country || 'Global',
          targetCountry: row.country || 'Global',
          level: row.level || "Master's",
          funding: row.funding || row.value || '',
          deadline: row.deadline || '',
          applications: Number(row.applications) || 0,
          status: row.status || 'Draft',
          fundingType: row['funding type'] || row.fundingtype || 'Full Funding',
        }
      })

      setScholarships((current) => [...imported, ...current])
      setActiveTab('All')
      showNotice(`${imported.length} scholarship row(s) imported.`)
      event.target.value = ''
    }

    reader.readAsText(file)
  }

  function updateSelectedStatus(status) {
    if (!selectedIds.length) {
      showNotice('Select at least one scholarship first.')
      return
    }

    setScholarships((current) =>
      current.map((item) =>
        selectedIds.includes(item.id) ? { ...item, status } : item,
      ),
    )

    setSelectedIds([])
    showNotice(`Selected scholarships updated to ${status}.`)
  }

  function openAddPanel() {
    setIsAdding(true)
    setEditing({ ...emptyScholarship })
    setActiveDetailTab('Details')
  }

  return (
    <div className="min-h-screen bg-[#f3f6ff] px-4 py-5 text-slate-900 sm:px-6 lg:px-7">
      {notice && (
        <div className="fixed right-5 top-5 z-[100] flex items-center gap-2 rounded-xl bg-emerald-950 px-4 py-3 text-sm font-medium text-white shadow-xl">
          <Check size={17} />
          {notice}
        </div>
      )}

      <div className="mx-auto max-w-[1600px]">
        {/* Page heading */}
        <div className="mb-5 flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-[#dce8f0] p-3 text-emerald-950">
              <Award size={23} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight">
                  Scholarship Management
                </h1>
                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-semibold text-emerald-800">
                  {activeCount} Active
                </span>
              </div>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600">
                Manage all global scholarships, funding values, applicant
                pipelines, and crucial admission deadlines.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={exportCSV}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold hover:bg-slate-50"
            >
              <Download size={16} />
              Export CSV
            </button>

            <button
              type="button"
              onClick={() => importRef.current?.click()}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold hover:bg-slate-50"
            >
              <Upload size={16} />
              Import CSV
            </button>

            <input
              ref={importRef}
              type="file"
              accept=".csv,text/csv"
              className="hidden"
              onChange={importCSV}
            />

            <button
              type="button"
              onClick={openAddPanel}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-950 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-900"
            >
              <Plus size={17} />
              Add Scholarship
            </button>
          </div>
        </div>

        {/* Summary cards */}
        <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            icon={Award}
            label="Active Scholarships"
            value={activeCount}
            note="+20% vs last month"
            tone="green"
          />
          <MetricCard
            icon={Clock3}
            label="Closing This Month"
            value={closingCount}
            note="Review upcoming deadlines"
            tone="red"
          />
          <MetricCard
            icon={Wallet}
            label="Total Funding Value"
            value={
              totalFunding >= 1000000
                ? `$${(totalFunding / 1000000).toFixed(1)}M`
                : `$${totalFunding.toLocaleString()}`
            }
            note="Sum of entered funding amounts"
            tone="blue"
          />
          <MetricCard
            icon={TrendingUp}
            label="Avg Success Rate"
            value={`${
              scholarships.length
                ? Math.round(
                    scholarships.reduce(
                      (sum, item) => sum + (Number(item.successRate) || 0),
                      0,
                    ) / scholarships.length,
                  )
                : 0
            }%`}
            note="Based on entered scholarship data"
            tone="mint"
          />
        </div>

        {/* Filters */}
        <div className="mb-4 rounded-2xl border border-slate-100 bg-white p-3 shadow-sm">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-[minmax(220px,1.5fr)_repeat(4,minmax(120px,1fr))]">
            <div className="relative">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search scholarship..."
                className={`${inputClass} pl-9`}
              />
            </div>

            <select
              value={countryFilter}
              onChange={(event) => setCountryFilter(event.target.value)}
              className={inputClass}
            >
              <option>All Countries</option>
              {countries.map((country) => (
                <option key={country}>{country}</option>
              ))}
            </select>

            <select
              value={levelFilter}
              onChange={(event) => setLevelFilter(event.target.value)}
              className={inputClass}
            >
              <option>All Levels</option>
              <option>Master</option>
              <option>PhD</option>
              <option>Bachelor</option>
            </select>

            <select
              value={fundingFilter}
              onChange={(event) => setFundingFilter(event.target.value)}
              className={inputClass}
            >
              <option>All Funding</option>
              <option>Full Ride</option>
              <option>Full Funding</option>
              <option>Partial Funding</option>
            </select>

            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className={inputClass}
            >
              <option value="deadline">Sort: Deadline</option>
              <option value="title">Sort: Name A–Z</option>
              <option value="applications">Sort: Applications</option>
            </select>
          </div>
        </div>

        {/* Status tabs */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {tabs.map((tab) => {
            const count =
              tab === 'All'
                ? scholarships.length
                : scholarships.filter((item) => {
                    const status = getStatus(item)
                    return status === (tab === 'Drafts' ? 'Draft' : tab)
                  }).length

            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  activeTab === tab
                    ? 'border-emerald-950 bg-emerald-950 text-white'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-emerald-300'
                }`}
              >
                {tab} ({count})
              </button>
            )
          })}
        </div>

        {/* Selected actions */}
        {selectedIds.length > 0 && (
          <div className="mb-4 flex flex-wrap items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50 p-3">
            <span className="text-sm font-semibold text-emerald-950">
              {selectedIds.length} selected
            </span>
            <button
              type="button"
              onClick={() => updateSelectedStatus('Active')}
              className="rounded-lg bg-white px-3 py-2 text-xs font-semibold text-emerald-800"
            >
              Mark Active
            </button>
            <button
              type="button"
              onClick={() => updateSelectedStatus('Draft')}
              className="rounded-lg bg-white px-3 py-2 text-xs font-semibold text-slate-700"
            >
              Move to Draft
            </button>
            <button
              type="button"
              onClick={() => setSelectedIds([])}
              className="ml-auto text-xs font-medium text-slate-600 hover:text-slate-900"
            >
              Clear selection
            </button>
          </div>
        )}

        {/* Scholarship table */}
        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] border-collapse text-left">
              <thead>
                <tr className="bg-[#edf2ff] text-[11px] uppercase tracking-wide text-slate-700">
                  <th className="w-12 px-4 py-4">
                    <input
                      type="checkbox"
                      aria-label="Select all visible scholarships"
                      checked={
                        filtered.length > 0 &&
                        filtered.every((item) => selectedIds.includes(item.id))
                      }
                      onChange={toggleAll}
                      className="h-4 w-4 accent-emerald-800"
                    />
                  </th>
                  <th className="px-4 py-4">Scholarship</th>
                  <th className="px-4 py-4">Provider / Source</th>
                  <th className="px-4 py-4">Country</th>
                  <th className="px-4 py-4">Level</th>
                  <th className="px-4 py-4">Value</th>
                  <th className="px-4 py-4">Deadline</th>
                  <th className="px-4 py-4">Applications</th>
                  <th className="px-4 py-4">Status</th>
                  <th className="px-4 py-4">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filtered.map((item) => (
                  <tr
                    key={item.id}
                    className={`transition hover:bg-emerald-50/40 ${
                      selectedIds.includes(item.id) ? 'bg-emerald-50' : ''
                    }`}
                  >
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        aria-label={`Select ${item.title}`}
                        checked={selectedIds.includes(item.id)}
                        onChange={() => toggleSelected(item.id)}
                        className="h-4 w-4 accent-emerald-800"
                      />
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex min-w-[190px] items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-900">
                          <GraduationCap size={17} />
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {item.title}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {item.field || 'All Disciplines'}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4 text-sm text-slate-600">
                      {item.provider}
                    </td>

                    <td className="px-4 py-4">
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-2 py-1 text-xs text-slate-700">
                        <Globe2 size={13} />
                        {item.country}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-sm text-slate-700">
                      {item.level}
                    </td>

                    <td className="px-4 py-4 text-sm font-semibold text-emerald-950">
                      {item.funding || 'Not specified'}
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1.5 whitespace-nowrap text-xs text-slate-600">
                        <CalendarDays size={13} />
                        {formatDate(item.deadline)}
                      </div>
                    </td>

                    <td className="px-4 py-4 text-sm font-medium text-slate-700">
                      {Number(item.applications || 0).toLocaleString()}
                    </td>

                    <td className="px-4 py-4">
                      <StatusBadge status={getStatus(item)} />
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          title="Edit scholarship"
                          onClick={() => {
                            setIsAdding(false)
                            setEditing({ ...item })
                            setActiveDetailTab('Details')
                          }}
                          className="rounded-lg p-2 text-slate-600 hover:bg-emerald-100 hover:text-emerald-900"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          type="button"
                          title="View scholarship details"
                          onClick={() => {
                            setIsAdding(false)
                            setEditing({ ...item })
                            setActiveDetailTab('Details')
                          }}
                          className="rounded-lg p-2 text-slate-600 hover:bg-blue-50 hover:text-blue-800"
                        >
                          <Eye size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={10}
                      className="px-4 py-16 text-center text-sm text-slate-500"
                    >
                      No scholarships match your search or filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-2 border-t border-slate-100 bg-white px-4 py-4 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between">
            <span>
              Showing {filtered.length} of {scholarships.length} scholarships
            </span>
            <span className="text-slate-400">
              Scholarship data is currently stored in this page's React state.
            </span>
          </div>
        </div>
      </div>

      {/* Edit / Add Scholarship drawer */}
      {editing && (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label="Close scholarship editor"
            onClick={() => {
              setEditing(null)
              setIsAdding(false)
            }}
            className="absolute inset-0 bg-slate-950/30 backdrop-blur-[1px]"
          />

          <aside className="absolute right-0 top-0 flex h-full w-full max-w-[470px] flex-col bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-100 bg-[#f5f7ff] px-5 py-5">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {isAdding ? 'Add Scholarship' : 'Edit Scholarship'}
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  {editing.title || 'Enter scholarship information'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEditing(null)
                  setIsAdding(false)
                }}
                className="rounded-full p-2 text-slate-500 hover:bg-slate-200"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex gap-5 border-b border-slate-100 px-5">
              {['Details', 'Eligibility', 'Timeline', 'Media'].map((tab) => (
                <button
                  type="button"
                  key={tab}
                  onClick={() => setActiveDetailTab(tab)}
                  className={`border-b-2 py-3 text-xs font-semibold ${
                    activeDetailTab === tab
                      ? 'border-emerald-900 text-emerald-950'
                      : 'border-transparent text-slate-500'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <form
              onSubmit={saveScholarship}
              className="flex min-h-0 flex-1 flex-col"
            >
              <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
                {activeDetailTab === 'Details' && (
                  <>
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-semibold text-slate-700">
                        Scholarship Title *
                      </span>
                      <input
                        required
                        value={editing.title}
                        onChange={(event) =>
                          updateField('title', event.target.value)
                        }
                        className={inputClass}
                        placeholder="Enter scholarship title"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-1.5 block text-xs font-semibold text-slate-700">
                        Provider / Organization *
                      </span>
                      <input
                        required
                        value={editing.provider}
                        onChange={(event) =>
                          updateField('provider', event.target.value)
                        }
                        className={inputClass}
                        placeholder="Enter provider"
                      />
                    </label>

                    <div className="grid grid-cols-2 gap-3">
                      <label>
                        <span className="mb-1.5 block text-xs font-semibold text-slate-700">
                          Target Country
                        </span>
                        <select
                          value={editing.targetCountry || editing.country}
                          onChange={(event) => {
                            updateField('targetCountry', event.target.value)
                            updateField('country', event.target.value)
                          }}
                          className={inputClass}
                        >
                          {[
                            'Australia',
                            'Canada',
                            'United Kingdom',
                            'United States (USA)',
                            'Germany',
                            'Global',
                            'EU / Multi',
                            'Ireland',
                            'New Zealand',
                          ].map((country) => (
                            <option key={country}>{country}</option>
                          ))}
                        </select>
                      </label>

                      <label>
                        <span className="mb-1.5 block text-xs font-semibold text-slate-700">
                          Funding Type
                        </span>
                        <select
                          value={editing.fundingType}
                          onChange={(event) =>
                            updateField('fundingType', event.target.value)
                          }
                          className={inputClass}
                        >
                          <option>Full Ride</option>
                          <option>Full Funding</option>
                          <option>Partial Funding</option>
                          <option>Tuition Waiver</option>
                          <option>Monthly Stipend</option>
                        </select>
                      </label>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <label>
                        <span className="mb-1.5 block text-xs font-semibold text-slate-700">
                          Value Amount
                        </span>
                        <input
                          type="number"
                          min="0"
                          value={editing.valueAmount}
                          onChange={(event) => {
                            updateField('valueAmount', event.target.value)
                            updateField(
                              'funding',
                              event.target.value
                                ? `$${Number(event.target.value).toLocaleString()}`
                                : '',
                            )
                          }}
                          className={inputClass}
                          placeholder="60000"
                        />
                      </label>

                      <label>
                        <span className="mb-1.5 block text-xs font-semibold text-slate-700">
                          Degree Level
                        </span>
                        <select
                          value={editing.degreeLevel || editing.level}
                          onChange={(event) => {
                            updateField('degreeLevel', event.target.value)
                            updateField('level', event.target.value)
                          }}
                          className={inputClass}
                        >
                          <option>Bachelor's</option>
                          <option>Master's</option>
                          <option>PhD</option>
                          <option>Master's / PhD</option>
                          <option>All Levels</option>
                        </select>
                      </label>
                    </div>

                    <label className="block">
                      <span className="mb-1.5 block text-xs font-semibold text-slate-700">
                        Field of Study
                      </span>
                      <select
                        value={editing.field}
                        onChange={(event) =>
                          updateField('field', event.target.value)
                        }
                        className={inputClass}
                      >
                        <option>All Disciplines</option>
                        <option>Computer Science</option>
                        <option>Engineering</option>
                        <option>Business</option>
                        <option>Medicine</option>
                        <option>Arts and Humanities</option>
                        <option>Science and Research</option>
                      </select>
                    </label>

                    <label className="block">
                      <span className="mb-1.5 block text-xs font-semibold text-slate-700">
                        Official Website
                      </span>
                      <input
                        type="url"
                        value={editing.website}
                        onChange={(event) =>
                          updateField('website', event.target.value)
                        }
                        className={inputClass}
                        placeholder="https://example.org"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-1.5 block text-xs font-semibold text-slate-700">
                        Brief Description
                      </span>
                      <textarea
                        rows={4}
                        value={editing.description}
                        onChange={(event) =>
                          updateField('description', event.target.value)
                        }
                        className={inputClass}
                        placeholder="Describe the scholarship..."
                      />
                    </label>
                  </>
                )}

                {activeDetailTab === 'Eligibility' && (
                  <>
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-semibold text-slate-700">
                        Requirements Summary
                      </span>
                      <textarea
                        rows={6}
                        value={editing.requirements}
                        onChange={(event) =>
                          updateField('requirements', event.target.value)
                        }
                        className={inputClass}
                        placeholder="Enter eligibility requirements..."
                      />
                    </label>

                    <label className="block">
                      <span className="mb-1.5 block text-xs font-semibold text-slate-700">
                        Success Rate (%)
                      </span>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={editing.successRate}
                        onChange={(event) =>
                          updateField('successRate', event.target.value)
                        }
                        className={inputClass}
                      />
                    </label>
                  </>
                )}

                {activeDetailTab === 'Timeline' && (
                  <>
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-semibold text-slate-700">
                        Application Deadline
                      </span>
                      <input
                        type="date"
                        value={editing.deadline}
                        onChange={(event) =>
                          updateField('deadline', event.target.value)
                        }
                        className={inputClass}
                      />
                    </label>

                    <label className="block">
                      <span className="mb-1.5 block text-xs font-semibold text-slate-700">
                        Applications Received
                      </span>
                      <input
                        type="number"
                        min="0"
                        value={editing.applications}
                        onChange={(event) =>
                          updateField(
                            'applications',
                            Number(event.target.value),
                          )
                        }
                        className={inputClass}
                      />
                    </label>
                  </>
                )}

                {activeDetailTab === 'Media' && (
                  <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5 text-sm text-slate-600">
                    <CircleDollarSign
                      size={24}
                      className="mb-3 text-emerald-800"
                    />
                    This version does not upload scholarship images or media.
                    Use the official website field to link to the scholarship
                    provider.
                  </div>
                )}

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-slate-700">
                    Publish Status
                  </span>
                  <select
                    value={editing.status}
                    onChange={(event) =>
                      updateField('status', event.target.value)
                    }
                    className={inputClass}
                  >
                    <option>Active</option>
                    <option>Closing Soon</option>
                    <option>Expired</option>
                    <option>Draft</option>
                  </select>
                </label>
              </div>

              <div className="flex gap-2 border-t border-slate-100 bg-white p-4">
                <button
                  type="button"
                  onClick={() => {
                    setEditing(null)
                    setIsAdding(false)
                  }}
                  className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Discard
                </button>

                <button
                  type="submit"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-950 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-900"
                >
                  <Check size={16} />
                  Save Changes
                </button>
              </div>
            </form>
          </aside>
        </div>
      )}
    </div>
  )
}
