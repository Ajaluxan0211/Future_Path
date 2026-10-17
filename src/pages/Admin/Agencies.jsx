
import { useMemo, useState } from 'react'
import {
  Search,
  Plus,
  Download,
  Building2,
  CalendarClock,
  CircleX,
  ShieldCheck,
  MapPin,
  CheckCircle2,
  AlertCircle,
  FileText,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Flag,
  Eye,
  Phone,
  Globe,
} from 'lucide-react'

const initialAgencies = [
  {
    id: 1,
    name: 'Overseas Education Lanka',
    initials: 'OE',
    license: 'OE-20140892',
    location: 'Colombo, Sri Lanka',
    country: 'Sri Lanka',
    services: ['Student Visa', 'Work Visa'],
    cases: 680,
    status: 'Verified',
    score: 92,
    government: 95,
    reviews: 86,
    complaints: 82,
    experience: 80,
    color: 'green',
  },
  {
    id: 2,
    name: 'Visa Global Consultants',
    initials: 'VG',
    license: 'VG-20140892',
    location: 'Dubai, UAE',
    country: 'UAE',
    services: ['Immigration', 'Business Visas'],
    cases: 420,
    status: 'Verified',
    score: 87,
    government: 90,
    reviews: 88,
    complaints: 84,
    experience: 86,
    color: 'blue',
  },
  {
    id: 3,
    name: 'PathWay Education Group',
    initials: 'PW',
    license: 'PW-20180234',
    location: 'Sydney, Australia',
    country: 'Australia',
    services: ['Student Visa', 'PR Pathway'],
    cases: 320,
    status: 'Verified',
    score: 85,
    government: 88,
    reviews: 84,
    complaints: 85,
    experience: 82,
    color: 'blue',
  },
  {
    id: 4,
    name: 'Global Education Services',
    initials: 'GE',
    license: 'GE-20160789',
    location: 'Colombo, Sri Lanka',
    country: 'Sri Lanka',
    services: ['Student Visa', 'IELTS'],
    cases: 180,
    status: 'Verified',
    score: 78,
    government: 80,
    reviews: 76,
    complaints: 78,
    experience: 77,
    color: 'blue',
  },
  {
    id: 5,
    name: 'StudyMate Lanka',
    initials: 'SM',
    license: 'SM-20200123',
    location: 'Kandy, Sri Lanka',
    country: 'Sri Lanka',
    services: ['Student Visa'],
    cases: 120,
    status: 'Verified',
    score: 72,
    government: 75,
    reviews: 70,
    complaints: 72,
    experience: 70,
    color: 'green',
  },
  {
    id: 6,
    name: 'Global Migrate',
    initials: 'GM',
    license: 'GM-20210456',
    location: 'Gampaha, Sri Lanka',
    country: 'Sri Lanka',
    services: ['Student Visa'],
    cases: 0,
    status: 'Pending',
    score: null,
    note: 'Application submitted. Compliance verification is in progress.',
    color: 'blue',
  },
  {
    id: 7,
    name: 'StudyEase Lanka',
    initials: 'SE',
    license: 'SE-20220789',
    location: 'Colombo, Sri Lanka',
    country: 'Sri Lanka',
    services: ['Student Visa'],
    cases: 0,
    status: 'Pending',
    score: null,
    note: 'Awaiting secondary director ID validation and verification callback.',
    color: 'blue',
  },
  {
    id: 8,
    name: 'Future Pathways Global',
    initials: 'FP',
    license: 'FP-20230012',
    location: 'Matara, Sri Lanka',
    country: 'Sri Lanka',
    services: ['Work Visa'],
    cases: 0,
    status: 'Docs Pending',
    score: null,
    note: 'Missing registered office lease agreement and local tax clearance certificates.',
    color: 'blue',
  },
  {
    id: 9,
    name: 'XpressVisa Hub',
    initials: 'XP',
    license: 'No license registered',
    location: 'Negombo, Sri Lanka',
    country: 'Sri Lanka',
    services: [],
    cases: 0,
    status: 'Flagged',
    score: 0,
    note: 'Three user scam complaints received. Unauthorized student fee collection reported.',
    color: 'red',
  },
]

const colorStyles = {
  green: 'bg-emerald-100 text-emerald-800',
  blue: 'bg-blue-100 text-blue-800',
  red: 'bg-red-100 text-red-800',
}

function SummaryCard({ icon: Icon, iconClass, value, label, trend, trendClass }) {
  return (
    <div className="min-w-0 rounded-xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-center justify-between gap-2">
        <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${iconClass}`}>
          <Icon size={18} />
        </div>
        <span className={`text-[10px] font-semibold sm:text-xs ${trendClass}`}>
          {trend}
        </span>
      </div>
      <p className="mt-3 text-2xl font-bold tracking-tight text-[#0B603A]">
        {value}
      </p>
      <p className="mt-1 text-xs text-slate-500 sm:text-sm">{label}</p>
    </div>
  )
}

function ScoreRow({ label, value }) {
  return (
    <div className="flex items-center gap-2 text-[11px]">
      <span className="w-[66px] shrink-0 text-slate-700">{label}</span>
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-blue-100">
        <div
          className="h-full rounded-full bg-[#087653]"
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="w-6 text-right text-slate-600">{value}</span>
    </div>
  )
}

function StatusBadge({ status }) {
  const styles = {
    Verified: 'bg-emerald-100 text-emerald-800',
    Pending: 'bg-blue-100 text-blue-900',
    'Docs Pending': 'bg-blue-100 text-slate-800',
    Flagged: 'bg-red-700 text-white',
    Rejected: 'bg-red-100 text-red-800',
  }

  return (
    <span
      className={`inline-flex rounded-full px-2 py-1 text-[10px] font-bold ${styles[status] || 'bg-slate-100 text-slate-700'}`}
    >
      {status.toUpperCase()}
    </span>
  )
}

export default function Agencies() {
  const [agencies, setAgencies] = useState(initialAgencies)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All Status')
  const [serviceFilter, setServiceFilter] = useState('All Services')
  const [countryFilter, setCountryFilter] = useState('All Countries')
  const [sortBy, setSortBy] = useState('Trust Score')
  const [page, setPage] = useState(1)
  const [notice, setNotice] = useState('')
  const [selectedAgency, setSelectedAgency] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newAgency, setNewAgency] = useState({
    name: '',
    license: '',
    location: '',
  })

  const pageSize = 9

  const filteredAgencies = useMemo(() => {
    const query = search.trim().toLowerCase()

    const results = agencies.filter((agency) => {
      const matchesSearch =
        !query ||
        agency.name.toLowerCase().includes(query) ||
        agency.license.toLowerCase().includes(query) ||
        agency.location.toLowerCase().includes(query)

      const matchesStatus =
        statusFilter === 'All Status' || agency.status === statusFilter

      const matchesService =
        serviceFilter === 'All Services' ||
        agency.services.some((service) => service === serviceFilter)

      const matchesCountry =
        countryFilter === 'All Countries' || agency.country === countryFilter

      return matchesSearch && matchesStatus && matchesService && matchesCountry
    })

    return [...results].sort((a, b) => {
      if (sortBy === 'Trust Score') {
        return (b.score ?? -1) - (a.score ?? -1)
      }
      if (sortBy === 'Name') {
        return a.name.localeCompare(b.name)
      }
      if (sortBy === 'Cases') {
        return b.cases - a.cases
      }
      return a.id - b.id
    })
  }, [agencies, search, statusFilter, serviceFilter, countryFilter, sortBy])

  const totalPages = Math.max(1, Math.ceil(filteredAgencies.length / pageSize))
  const safePage = Math.min(page, totalPages)
  const visibleAgencies = filteredAgencies.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize,
  )

  const verifiedCount = agencies.filter((a) => a.status === 'Verified').length
  const pendingCount = agencies.filter(
    (a) => a.status === 'Pending' || a.status === 'Docs Pending',
  ).length
  const rejectedCount = agencies.filter(
    (a) => a.status === 'Rejected' || a.status === 'Flagged',
  ).length

  function updateFilter(setter, value) {
    setter(value)
    setPage(1)
  }

  function handleAddAgency(event) {
    event.preventDefault()

    const name = newAgency.name.trim()
    const license = newAgency.license.trim()
    const location = newAgency.location.trim()

    if (!name || !license || !location) {
      setNotice('Please complete all fields before adding an agency.')
      return
    }

    const agency = {
      id: Date.now(),
      name,
      initials: name
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0])
        .join('')
        .toUpperCase(),
      license,
      location,
      country: location.toLowerCase().includes('uae')
        ? 'UAE'
        : location.toLowerCase().includes('australia')
          ? 'Australia'
          : 'Sri Lanka',
      services: ['Student Visa'],
      cases: 0,
      status: 'Pending',
      score: null,
      note: 'New agency added and awaiting verification.',
      color: 'blue',
    }

    setAgencies((current) => [agency, ...current])
    setNewAgency({ name: '', license: '', location: '' })
    setShowAddForm(false)
    setNotice('Agency added to this page as pending verification.')
    setPage(1)
  }

  function exportAgencies() {
    const headings = ['Name', 'License', 'Location', 'Services', 'Status', 'Trust Score']
    const rows = filteredAgencies.map((agency) => [
      agency.name,
      agency.license,
      agency.location,
      agency.services.join('; '),
      agency.status,
      agency.score ?? 'Not assessed',
    ])

    const csv = [headings, ...rows]
      .map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(','),
      )
      .join('\r\n')

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'agencies.csv'
    link.click()
    URL.revokeObjectURL(url)
  }

  function handleAgencyAction(action, agency) {
    if (action === 'Flag') {
      setAgencies((current) =>
        current.map((item) =>
          item.id === agency.id ? { ...item, status: 'Flagged' } : item,
        ),
      )
      setNotice(`${agency.name} was flagged in the current page data.`)
      return
    }

    if (action === 'Approve') {
      setAgencies((current) =>
        current.map((item) =>
          item.id === agency.id ? { ...item, status: 'Verified' } : item,
        ),
      )
      setNotice(`${agency.name} is marked verified in the current page data.`)
      return
    }

    setSelectedAgency(agency)
  }

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-5 text-slate-900">
      {/* Page heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
            All Agencies
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Manage and monitor all verified and pending agencies on the platform.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setNotice('')
            setShowAddForm(true)
          }}
          className="inline-flex min-h-10 items-center justify-center gap-2 self-start rounded-lg bg-[#0B603A] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#084A2E]"
        >
          <Plus size={17} />
          Add Agency
        </button>
      </div>

      {notice && (
        <div
          role="status"
          className="flex items-start justify-between gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-[#0B603A]"
        >
          <span>{notice}</span>
          <button
            type="button"
            aria-label="Dismiss notification"
            onClick={() => setNotice('')}
          >
            <CircleX size={17} />
          </button>
        </div>
      )}

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          icon={Building2}
          iconClass="bg-emerald-100 text-emerald-800"
          value={verifiedCount}
          label="Total Verified"
          trend="↑ Verified"
          trendClass="text-emerald-800"
        />
        <SummaryCard
          icon={CalendarClock}
          iconClass="bg-blue-100 text-blue-800"
          value={pendingCount}
          label="Pending Approval"
          trend="Needs review"
          trendClass="text-emerald-800"
        />
        <SummaryCard
          icon={CircleX}
          iconClass="bg-red-100 text-red-700"
          value={rejectedCount}
          label="Flagged / Rejected"
          trend="Requires attention"
          trendClass="text-red-700"
        />
        <SummaryCard
          icon={ShieldCheck}
          iconClass="bg-blue-100 text-blue-800"
          value={
            agencies.filter((a) => a.score !== null).length
              ? Math.round(
                  agencies
                    .filter((a) => a.score !== null)
                    .reduce((sum, a) => sum + a.score, 0) /
                    agencies.filter((a) => a.score !== null).length,
                )
              : '—'
          }
          label="Average Trust Score"
          trend="Across assessed agencies"
          trendClass="text-emerald-800"
        />
      </div>

      {/* Search and filters */}
      <div className="space-y-3">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-[minmax(220px,1.7fr)_repeat(4,minmax(130px,1fr))]">
          <div className="relative min-w-0">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            />
            <input
              value={search}
              onChange={(event) => updateFilter(setSearch, event.target.value)}
              placeholder="Filter by agency name, license..."
              aria-label="Search agencies"
              className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm outline-none transition placeholder:text-slate-500 focus:border-[#087653] focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          <div className="relative">
            <select
              value={statusFilter}
              onChange={(event) =>
                updateFilter(setStatusFilter, event.target.value)
              }
              aria-label="Filter by status"
              className="h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 pr-8 text-sm outline-none focus:border-[#087653]"
            >
              <option>All Status</option>
              <option>Verified</option>
              <option>Pending</option>
              <option>Docs Pending</option>
              <option>Flagged</option>
              <option>Rejected</option>
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
            />
          </div>

          <div className="relative">
            <select
              value={serviceFilter}
              onChange={(event) =>
                updateFilter(setServiceFilter, event.target.value)
              }
              aria-label="Filter by service"
              className="h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 pr-8 text-sm outline-none focus:border-[#087653]"
            >
              <option>All Services</option>
              <option>Student Visa</option>
              <option>Work Visa</option>
              <option>Immigration</option>
              <option>Business Visas</option>
              <option>PR Pathway</option>
              <option>IELTS</option>
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
            />
          </div>

          <div className="relative">
            <select
              value={countryFilter}
              onChange={(event) =>
                updateFilter(setCountryFilter, event.target.value)
              }
              aria-label="Filter by country"
              className="h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 pr-8 text-sm outline-none focus:border-[#087653]"
            >
              <option>All Countries</option>
              <option>Sri Lanka</option>
              <option>UAE</option>
              <option>Australia</option>
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
            />
          </div>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(event) => updateFilter(setSortBy, event.target.value)}
              aria-label="Sort agencies"
              className="h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 pr-8 text-sm outline-none focus:border-[#087653]"
            >
              <option>Trust Score</option>
              <option>Name</option>
              <option>Cases</option>
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={exportAgencies}
          className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          <Download size={15} />
          Export CSV
        </button>
      </div>

      {/* Agency cards */}
      {visibleAgencies.length > 0 ? (
        <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 2xl:grid-cols-3">
          {visibleAgencies.map((agency) => {
            const isVerified = agency.status === 'Verified'
            const isFlagged = agency.status === 'Flagged'

            return (
              <article
                key={agency.id}
                className="flex min-w-0 flex-col rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-4"
              >
                {/* Card header */}
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${colorStyles[agency.color]}`}
                  >
                    {agency.initials}
                  </div>

                  <div className="text-right">
                    <p
                      className={`text-xl font-bold leading-6 ${
                        isFlagged ? 'text-red-700' : 'text-[#0B603A]'
                      }`}
                    >
                      {agency.score === null ? '—' : agency.score}
                      {agency.score !== null && (
                        <span className="text-[10px] font-normal text-slate-500">
                          /100
                        </span>
                      )}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      {agency.score === null
                        ? agency.status === 'Docs Pending'
                          ? 'Documentation Hold'
                          : 'Pending Assessment'
                        : 'Trust Score'}
                    </p>
                  </div>
                </div>

                {/* Agency information */}
                <h2 className="mt-3 text-sm font-semibold leading-5 text-slate-900">
                  {agency.name}
                </h2>
                <p
                  className={`mt-0.5 break-words text-[11px] ${
                    agency.license === 'No license registered'
                      ? 'font-medium text-red-700'
                      : 'text-slate-500'
                  }`}
                >
                  License #{agency.license}
                </p>
                <p className="mt-1 flex items-start gap-1 text-[11px] text-slate-600">
                  <MapPin size={13} className="mt-0.5 shrink-0" />
                  {agency.location}
                </p>

                {/* Trust score breakdown or status note */}
                {agency.score !== null && !isFlagged ? (
                  <div className="mt-3 space-y-2 rounded-lg bg-[#F5F8FF] p-3">
                    <ScoreRow label="Gov Reg" value={agency.government} />
                    <ScoreRow label="Reviews" value={agency.reviews} />
                    <ScoreRow label="Cases" value={agency.complaints} />
                    <ScoreRow label="Years" value={agency.experience} />
                  </div>
                ) : (
                  <div
                    className={`mt-3 flex min-h-[94px] items-start gap-2 rounded-lg p-3 text-[11px] leading-5 ${
                      isFlagged
                        ? 'bg-red-50 text-red-800'
                        : 'bg-blue-50 text-slate-800'
                    }`}
                  >
                    {isFlagged ? (
                      <AlertCircle size={14} className="mt-0.5 shrink-0" />
                    ) : (
                      <FileText size={14} className="mt-0.5 shrink-0" />
                    )}
                    <span>
                      {agency.note || 'Awaiting agency assessment.'}
                    </span>
                  </div>
                )}

                {/* Services and status */}
                <div className="mt-3 flex flex-wrap items-center gap-1.5">
                  {agency.services.map((service) => (
                    <span
                      key={service}
                      className="rounded-full bg-blue-100 px-2 py-1 text-[10px] font-medium text-blue-900"
                    >
                      {service}
                    </span>
                  ))}
                  {agency.cases > 0 && (
                    <span className="rounded-full bg-blue-100 px-2 py-1 text-[10px] text-blue-900">
                      {agency.cases}+ cases
                    </span>
                  )}
                  <StatusBadge status={agency.status} />
                </div>

                {/* Actions */}
                <div className="mt-auto grid grid-cols-2 gap-2 pt-4">
                  {isVerified ? (
                    <>
                      <button
                        type="button"
                        onClick={() => handleAgencyAction('View Profile', agency)}
                        className="inline-flex min-h-8 items-center justify-center gap-1 rounded-lg bg-blue-100 px-2 py-2 text-[11px] font-medium text-slate-800 transition hover:bg-blue-200"
                      >
                        <Eye size={13} />
                        View Profile
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAgencyAction('Contact', agency)}
                        className="inline-flex min-h-8 items-center justify-center gap-1 rounded-lg bg-[#0B603A] px-2 py-2 text-[11px] font-semibold text-white transition hover:bg-[#084A2E]"
                      >
                        <Phone size={13} />
                        Contact
                      </button>
                    </>
                  ) : isFlagged ? (
                    <>
                      <button
                        type="button"
                        onClick={() => handleAgencyAction('Investigate', agency)}
                        className="min-h-8 rounded-lg bg-red-100 px-2 py-2 text-[11px] font-semibold text-red-800 hover:bg-red-200"
                      >
                        Investigate
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAgencyAction('Suspend', agency)}
                        className="min-h-8 rounded-lg bg-red-700 px-2 py-2 text-[11px] font-semibold text-white hover:bg-red-800"
                      >
                        Suspend
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => handleAgencyAction('Review Docs', agency)}
                        className="inline-flex min-h-8 items-center justify-center gap-1 rounded-lg bg-[#0B603A] px-2 py-2 text-[11px] font-semibold text-white hover:bg-[#084A2E]"
                      >
                        <FileText size={13} />
                        Review Docs
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAgencyAction('Flag', agency)}
                        className="min-h-8 rounded-lg bg-red-100 px-2 py-2 text-[11px] font-semibold text-red-800 hover:bg-red-200"
                      >
                        Flag
                      </button>
                    </>
                  )}
                </div>

                {!isVerified && !isFlagged && (
                  <button
                    type="button"
                    onClick={() => handleAgencyAction('Approve', agency)}
                    className="mt-2 inline-flex min-h-8 items-center justify-center gap-1 rounded-lg border border-emerald-200 px-3 py-2 text-[11px] font-semibold text-[#0B603A] hover:bg-emerald-50"
                  >
                    <CheckCircle2 size={13} />
                    Approve Agency
                  </button>
                )}
              </article>
            )
          })}
        </div>
      ) : (
        <div className="rounded-xl border border-slate-200 bg-white px-5 py-12 text-center">
          <Building2 className="mx-auto text-slate-400" size={32} />
          <h2 className="mt-3 text-base font-semibold">No agencies found</h2>
          <p className="mt-1 text-sm text-slate-500">
            Try changing your search or filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearch('')
              setStatusFilter('All Status')
              setServiceFilter('All Services')
              setCountryFilter('All Countries')
              setSortBy('Trust Score')
              setPage(1)
            }}
            className="mt-4 text-sm font-semibold text-[#087653] hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Pagination */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-100 bg-white p-4 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <p>
          Showing{' '}
          <span className="font-semibold text-slate-900">
            {filteredAgencies.length === 0
              ? 0
              : (safePage - 1) * pageSize + 1}
            {'–'}
            {Math.min(safePage * pageSize, filteredAgencies.length)}
          </span>{' '}
          of{' '}
          <span className="font-semibold text-slate-900">
            {filteredAgencies.length}
          </span>{' '}
          agencies
        </p>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            disabled={safePage <= 1}
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            className="inline-flex h-8 items-center gap-1 rounded-lg bg-slate-50 px-3 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft size={14} />
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1)
            .filter(
              (number) =>
                number === 1 ||
                number === totalPages ||
                Math.abs(number - safePage) <= 1,
            )
            .map((number, index, visiblePages) => (
              <span key={number} className="contents">
                {index > 0 && visiblePages[index - 1] !== number - 1 && (
                  <span className="px-1">…</span>
                )}
                <button
                  type="button"
                  onClick={() => setPage(number)}
                  aria-current={safePage === number ? 'page' : undefined}
                  className={`h-8 min-w-8 rounded-lg px-2 font-semibold ${
                    safePage === number
                      ? 'bg-[#0B603A] text-white'
                      : 'bg-blue-50 text-slate-800 hover:bg-blue-100'
                  }`}
                >
                  {number}
                </button>
              </span>
            ))}

          <button
            type="button"
            disabled={safePage >= totalPages}
            onClick={() =>
              setPage((current) => Math.min(totalPages, current + 1))
            }
            className="inline-flex h-8 items-center gap-1 rounded-lg bg-blue-50 px-3 hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Add agency modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/40 p-4">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-agency-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
          >
            <h2 id="add-agency-title" className="text-lg font-bold">
              Add Agency
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Add an agency to the list for verification.
            </p>

            <form onSubmit={handleAddAgency} className="mt-5 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Agency name
                </label>
                <input
                  required
                  value={newAgency.name}
                  onChange={(event) =>
                    setNewAgency({ ...newAgency, name: event.target.value })
                  }
                  className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-[#087653]"
                  placeholder="Enter agency name"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  License number
                </label>
                <input
                  required
                  value={newAgency.license}
                  onChange={(event) =>
                    setNewAgency({ ...newAgency, license: event.target.value })
                  }
                  className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-[#087653]"
                  placeholder="Enter license number"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Location
                </label>
                <input
                  required
                  value={newAgency.location}
                  onChange={(event) =>
                    setNewAgency({ ...newAgency, location: event.target.value })
                  }
                  className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-[#087653]"
                  placeholder="e.g. Colombo, Sri Lanka"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[#0B603A] px-4 py-2 text-sm font-semibold text-white hover:bg-[#084A2E]"
                >
                  Add Agency
                </button>
              </div>
            </form>
          </section>
        </div>
      )}

      {/* Agency details modal */}
      {selectedAgency && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/40 p-4">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="agency-detail-title"
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#087653]">
                  Agency details
                </p>
                <h2
                  id="agency-detail-title"
                  className="mt-1 text-lg font-bold"
                >
                  {selectedAgency.name}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAgency(null)}
                aria-label="Close agency details"
                className="rounded-lg p-1 text-slate-500 hover:bg-slate-100"
              >
                <CircleX size={20} />
              </button>
            </div>

            <div className="mt-5 space-y-3 text-sm">
              <p>
                <span className="text-slate-500">License: </span>
                {selectedAgency.license}
              </p>
              <p className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 text-[#087653]" />
                {selectedAgency.location}
              </p>
              <p className="flex items-start gap-2">
                <Globe size={16} className="mt-0.5 text-[#087653]" />
                {selectedAgency.services.join(', ') || 'No services listed'}
              </p>
              <p>
                <span className="text-slate-500">Trust score: </span>
                {selectedAgency.score === null
                  ? 'Not assessed'
                  : `${selectedAgency.score}/100`}
              </p>
              <p>
                <span className="text-slate-500">Status: </span>
                <StatusBadge status={selectedAgency.status} />
              </p>
            </div>

            <button
              type="button"
              onClick={() => setSelectedAgency(null)}
              className="mt-6 w-full rounded-lg bg-[#0B603A] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#084A2E]"
            >
              Close
            </button>
          </section>
        </div>
      )}
    </div>
  )
}
