
import { useMemo, useState } from 'react'
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Search,
  Download,
  CheckCheck,
  Filter,
  MapPin,
  FileText,
  Image,
  Globe,
  Share2,
  Mail,
  Ban,
  Eye,
  ChevronLeft,
  ChevronRight,
  X,
  Plus,
} from 'lucide-react'

const initialReports = [
  {
    id: 1,
    agency: 'Lanka Overseas Fakes',
    status: 'New',
    category: 'Fake Agency',
    priority: 'High',
    reporter: 'Anonymous',
    location: 'Colombo, LK',
    time: '2 hours ago',
    description:
      'Charging massive upfront fees for guaranteed Work Visas. Multiple victims reported being ghosted after payment.',
    evidence: ['Payment Receipt', 'Victim Screenshots'],
    similar: '3 other reports on same agency',
  },
  {
    id: 2,
    agency: 'FastVisa Express',
    status: 'New',
    category: 'Identity Theft',
    priority: 'High',
    reporter: 'Client #8241',
    location: 'Gampaha, LK',
    time: '5 hours ago',
    description:
      'Requesting personal banking passwords via WhatsApp during visa consultation.',
    evidence: ['WhatsApp Screenshots'],
    similar: '2 similar reports pending review',
  },
  {
    id: 3,
    agency: 'Global Path Consultants',
    status: 'Investigating',
    category: 'Fraudulent Offer',
    priority: 'Medium',
    reporter: 'Verified User',
    location: 'Kandy, LK',
    time: '1 day ago',
    description:
      'False PR guarantee claims published on website and social media.',
    evidence: ['Website Screenshots', 'Social Media Posts'],
    similar: '',
  },
  {
    id: 4,
    agency: 'Visa Express Hub',
    status: 'Investigating',
    category: 'Payment Scam',
    priority: 'Medium',
    reporter: 'Student Applicant',
    location: 'Mumbai, India',
    time: '2 days ago',
    description: 'Collected documents and disappeared. No refund or response.',
    evidence: ['Email Records', 'Bank Transfer Proof'],
    similar: '',
  },
  {
    id: 5,
    agency: 'EuroPath Solutions',
    status: 'Under Review',
    category: 'Fake Agency',
    priority: 'Low',
    reporter: 'Anonymous',
    location: 'Dubai, UAE',
    time: '3 days ago',
    description: 'Operating without a valid migration license. Cannot verify registration.',
    evidence: ['License Verification Failed'],
    similar: '',
  },
  {
    id: 6,
    agency: 'Universal Path Ltd.',
    status: 'Under Review',
    category: 'Payment Scam',
    priority: 'Low',
    reporter: 'Client #4092',
    location: 'Lagos, Nigeria',
    time: '4 days ago',
    description: 'Requesting crypto payments only. No official invoices provided.',
    evidence: ['Crypto Transaction Records'],
    similar: '',
  },
  {
    id: 7,
    agency: 'Quick Visa Lanka',
    status: 'Resolved',
    category: 'Fake Agency',
    priority: 'Low',
    reporter: 'Client #1940',
    location: 'Colombo, LK',
    time: '1 week ago',
    description: 'Agency verification completed following the complaint.',
    evidence: ['Agency Verification Records'],
    resolution: 'Agency verified and complaint found unsubstantiated.',
    similar: '',
  },
  {
    id: 8,
    agency: 'StudyPath Global',
    status: 'Resolved',
    category: 'Payment Scam',
    priority: 'High',
    reporter: 'Verified Student',
    location: 'Gampaha, LK',
    time: '2 weeks ago',
    description: 'Investigation completed and enforcement action recorded.',
    evidence: ['Student Complaint Records'],
    resolution: 'Agency suspended and users notified.',
    similar: '',
  },
]

const statusStyles = {
  New: 'bg-red-100 text-red-800',
  Investigating: 'bg-blue-100 text-blue-800',
  'Under Review': 'bg-slate-100 text-slate-700',
  Resolved: 'bg-emerald-100 text-emerald-800',
}

const categoryOptions = [
  'All Categories',
  'Fake Agency',
  'Identity Theft',
  'Fraudulent Offer',
  'Payment Scam',
]

function SummaryCard({ icon: Icon, value, label, note, iconClass, noteClass }) {
  return (
    <div className="min-w-0 rounded-xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-start justify-between gap-2">
        <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${iconClass}`}>
          <Icon size={19} />
        </div>
        <span className={`rounded-full px-2 py-1 text-[10px] font-medium ${noteClass}`}>
          {note}
        </span>
      </div>
      <p className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
        {value}
      </p>
      <p className="mt-1 text-sm font-medium text-slate-700">{label}</p>
    </div>
  )
}

function EvidenceItem({ name }) {
  let Icon = FileText

  if (name.toLowerCase().includes('screenshot')) Icon = Image
  if (name.toLowerCase().includes('website')) Icon = Globe
  if (name.toLowerCase().includes('social')) Icon = Share2
  if (name.toLowerCase().includes('email')) Icon = Mail

  return (
    <span className="inline-flex items-center gap-1.5 rounded-md bg-blue-50 px-2 py-1 text-[10px] font-medium text-slate-700">
      <Icon size={11} />
      {name}
    </span>
  )
}

export default function ScamReports() {
  const [reports, setReports] = useState(initialReports)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All Status')
  const [categoryFilter, setCategoryFilter] = useState('All Categories')
  const [priorityFilter, setPriorityFilter] = useState('All Priorities')
  const [timeFilter, setTimeFilter] = useState('All Time')
  const [activeTab, setActiveTab] = useState('All')
  const [page, setPage] = useState(1)
  const [selectedReport, setSelectedReport] = useState(null)
  const [caseNote, setCaseNote] = useState('')
  const [notice, setNotice] = useState('')
  const [showNote, setShowNote] = useState(false)

  const updateReport = (id, updates) => {
    setReports((current) =>
      current.map((report) =>
        report.id === id ? { ...report, ...updates } : report
      )
    )
    setSelectedReport((current) =>
      current?.id === id ? { ...current, ...updates } : current
    )
  }

  const filteredReports = useMemo(() => {
    const query = search.trim().toLowerCase()

    return reports.filter((report) => {
      const matchesSearch =
        !query ||
        report.agency.toLowerCase().includes(query) ||
        report.description.toLowerCase().includes(query) ||
        report.reporter.toLowerCase().includes(query) ||
        report.location.toLowerCase().includes(query)

      const matchesStatus =
        statusFilter === 'All Status' || report.status === statusFilter

      const matchesCategory =
        categoryFilter === 'All Categories' ||
        report.category === categoryFilter

      const matchesPriority =
        priorityFilter === 'All Priorities' ||
        report.priority === priorityFilter

      const matchesTab =
        activeTab === 'All' ||
        (activeTab === 'New' && report.status === 'New') ||
        (activeTab === 'Investigating' && report.status === 'Investigating') ||
        (activeTab === 'Resolved' && report.status === 'Resolved')

      const matchesTime =
        timeFilter === 'All Time' ||
        (timeFilter === 'Last 24 Hours' && [1, 2].includes(report.id)) ||
        (timeFilter === 'Last 7 Days' && report.id <= 6)

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCategory &&
        matchesPriority &&
        matchesTab &&
        matchesTime
      )
    })
  }, [
    reports,
    search,
    statusFilter,
    categoryFilter,
    priorityFilter,
    timeFilter,
    activeTab,
  ])

  const pageSize = 8
  const totalPages = Math.max(1, Math.ceil(filteredReports.length / pageSize))
  const visibleReports = filteredReports.slice(
    (page - 1) * pageSize,
    page * pageSize
  )

  const newCount = reports.filter((r) => r.status === 'New').length
  const investigatingCount = reports.filter(
    (r) => r.status === 'Investigating'
  ).length
  const resolvedCount = reports.filter((r) => r.status === 'Resolved').length

  const showMessage = (message) => {
    setNotice(message)
    window.setTimeout(() => setNotice(''), 3500)
  }

  const handleExport = () => {
    const headers = [
      'Agency',
      'Status',
      'Category',
      'Priority',
      'Reporter',
      'Location',
      'Description',
    ]

    const rows = filteredReports.map((r) => [
      r.agency,
      r.status,
      r.category,
      r.priority,
      r.reporter,
      r.location,
      r.description,
    ])

    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map((value) => `"${String(value ?? '').replace(/"/g, '""')}"`)
          .join(',')
      )
      .join('\n')

    const url = URL.createObjectURL(
      new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    )
    const link = document.createElement('a')
    link.href = url
    link.download = 'agency-scam-reports.csv'
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleResolve = (report) => {
    updateReport(report.id, {
      status: 'Resolved',
      resolution: 'Resolution recorded by the administrator.',
    })
    showMessage(`${report.agency} marked as resolved.`)
  }

  const handleReview = (report) => {
    updateReport(report.id, { status: 'Investigating' })
    showMessage(`${report.agency} moved to investigation.`)
  }

  const markAllReviewed = () => {
    setReports((current) =>
      current.map((report) =>
        report.status === 'New'
          ? { ...report, status: 'Investigating' }
          : report
      )
    )
    showMessage('All new reports marked as investigating.')
  }

  const resetFilters = () => {
    setSearch('')
    setStatusFilter('All Status')
    setCategoryFilter('All Categories')
    setPriorityFilter('All Priorities')
    setTimeFilter('All Time')
    setActiveTab('All')
    setPage(1)
  }

  const changeFilter = (setter, value) => {
    setter(value)
    setPage(1)
  }

  return (
    <div className="min-w-0 space-y-5 pb-5 text-slate-900">
      {notice && (
        <div className="fixed right-5 top-20 z-50 flex max-w-sm items-center gap-2 rounded-xl border border-emerald-200 bg-white px-4 py-3 text-sm font-medium text-emerald-800 shadow-lg">
          <CheckCircle2 size={18} />
          {notice}
          <button
            type="button"
            onClick={() => setNotice('')}
            className="ml-2"
            aria-label="Dismiss notification"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Page heading */}
      <section className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
            <AlertTriangle size={22} />
          </div>
          <div>
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
                Scam Reports
              </h1>
            </div>
            <p className="text-sm text-slate-600">
              Investigate and act on community-reported fraudulent agencies.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleExport}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
          >
            <Download size={16} />
            Export Reports
          </button>
          <button
            type="button"
            onClick={markAllReviewed}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-100 px-4 py-2.5 text-sm font-semibold text-red-800 hover:bg-red-200"
          >
            <CheckCheck size={16} />
            Mark All Reviewed
          </button>
        </div>
      </section>

      {/* Summary cards */}
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          icon={AlertTriangle}
          value={reports.filter((r) => r.priority === 'High' && r.status !== 'Resolved').length}
          label="Urgent Reports"
          note="↓ High Risk"
          iconClass="bg-red-100 text-red-600"
          noteClass="bg-red-50 text-red-600"
        />
        <SummaryCard
          icon={Clock}
          value={investigatingCount}
          label="Under Investigation"
          note="+3 this week"
          iconClass="bg-blue-100 text-blue-700"
          noteClass="bg-blue-50 text-blue-700"
        />
        <SummaryCard
          icon={CheckCircle2}
          value={resolvedCount}
          label="Resolved"
          note="+12 this month"
          iconClass="bg-emerald-100 text-emerald-700"
          noteClass="bg-emerald-50 text-emerald-700"
        />
        <SummaryCard
          icon={ShieldCheck}
          value={reports.length}
          label="Total Reports"
          note="All time"
          iconClass="bg-blue-100 text-slate-700"
          noteClass="bg-blue-50 text-slate-700"
        />
      </section>

      {/* Filters */}
      <section className="space-y-3">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-12">
          <label className="relative block xl:col-span-4">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            />
            <input
              value={search}
              onChange={(e) => changeFilter(setSearch, e.target.value)}
              placeholder="Search reported agency, keyword or location..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-sm outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
            />
          </label>

          <select
            value={statusFilter}
            onChange={(e) => changeFilter(setStatusFilter, e.target.value)}
            className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-700 xl:col-span-2"
          >
            {['All Status', 'New', 'Investigating', 'Under Review', 'Resolved'].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => changeFilter(setCategoryFilter, e.target.value)}
            className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-700 xl:col-span-2"
          >
            {categoryOptions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <select
            value={timeFilter}
            onChange={(e) => changeFilter(setTimeFilter, e.target.value)}
            className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-700 xl:col-span-2"
          >
            {['All Time', 'Last 24 Hours', 'Last 7 Days'].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => changeFilter(setPriorityFilter, e.target.value)}
            className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-700 xl:col-span-2"
          >
            {['All Priorities', 'High', 'Medium', 'Low'].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-2">
            {[
              ['All', reports.length],
              ['New', newCount],
              ['Investigating', investigatingCount],
              ['Resolved', resolvedCount],
            ].map(([tab, count]) => (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  setActiveTab(tab)
                  setPage(1)
                }}
                className={`rounded-full border px-3.5 py-2 text-xs font-semibold transition ${
                  activeTab === tab
                    ? 'border-[#075B3C] bg-[#075B3C] text-white'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-emerald-50'
                }`}
              >
                {tab} ({count})
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center justify-center gap-2 self-start rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 sm:self-auto"
          >
            <Filter size={14} />
            Reset Filters
          </button>
        </div>
      </section>

      {/* Report cards */}
      <section className="space-y-3">
        {visibleReports.map((report) => (
          <article
            key={report.id}
            className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition hover:border-slate-200 sm:p-5"
          >
            <div className="flex flex-col justify-between gap-4 xl:flex-row">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`h-2 w-2 shrink-0 rounded-full ${
                      report.status === 'Resolved'
                        ? 'bg-emerald-600'
                        : report.priority === 'High'
                          ? 'bg-red-600'
                          : report.status === 'Investigating'
                            ? 'bg-blue-600'
                            : 'bg-slate-500'
                    }`}
                  />
                  <h2 className="text-base font-bold sm:text-lg">
                    {report.agency}
                  </h2>
                  <span
                    className={`rounded-full px-2 py-1 text-[9px] font-bold uppercase tracking-wide ${
                      statusStyles[report.status]
                    }`}
                  >
                    {report.status === 'New' && report.priority === 'High'
                      ? 'Urgent'
                      : report.status}
                  </span>
                  <span className="rounded-full bg-blue-50 px-2 py-1 text-[10px] font-medium text-slate-700">
                    {report.category}
                  </span>
                </div>

                <p className="ml-4 mt-2 text-[11px] text-slate-500">
                  Reported by: {report.reporter} • {report.location} • {report.time}
                </p>

                <p className="mt-3 text-sm leading-6 text-slate-800">
                  {report.description}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-medium text-slate-600">
                    Evidence:
                  </span>
                  {report.evidence.map((item) => (
                    <EvidenceItem key={item} name={item} />
                  ))}
                </div>

                {report.similar && report.status !== 'Resolved' && (
                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-slate-50 px-2.5 py-1.5 text-[10px] font-medium text-red-900">
                    <AlertTriangle size={12} />
                    {report.similar}
                  </div>
                )}

                {report.resolution && report.status === 'Resolved' && (
                  <div className="mt-3 flex items-start gap-2 rounded-lg bg-emerald-50 px-3 py-2.5 text-xs leading-5 text-emerald-900">
                    <CheckCircle2 size={15} className="mt-0.5 shrink-0" />
                    <span>Resolution: {report.resolution}</span>
                  </div>
                )}
              </div>

              <div className="flex shrink-0 flex-wrap items-start gap-2 xl:max-w-[390px] xl:justify-end">
                {report.status === 'New' && (
                  <button
                    type="button"
                    onClick={() => handleReview(report)}
                    className="rounded-lg bg-blue-100 px-3 py-2 text-xs font-semibold text-blue-950 hover:bg-blue-200"
                  >
                    Mark Investigating
                  </button>
                )}

                {report.status !== 'Resolved' && (
                  <>
                    {report.status === 'New' && (
                      <button
                        type="button"
                        onClick={() =>
                          showMessage(`Warning draft prepared for ${report.agency}.`)
                        }
                        className="rounded-lg bg-red-100 px-3 py-2 text-xs font-semibold text-red-800 hover:bg-red-200"
                      >
                        Publish Warning
                      </button>
                    )}

                    {report.status !== 'New' && (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedReport(report)
                          setCaseNote('')
                          setShowNote(true)
                        }}
                        className="rounded-lg bg-blue-100 px-3 py-2 text-xs font-semibold text-blue-950 hover:bg-blue-200"
                      >
                        Add Case Note
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => handleResolve(report)}
                      className="rounded-lg bg-emerald-200 px-3 py-2 text-xs font-semibold text-emerald-950 hover:bg-emerald-300"
                    >
                      Resolve
                    </button>
                  </>
                )}

                <button
                  type="button"
                  onClick={() => setSelectedReport(report)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-blue-100"
                >
                  {report.status === 'Resolved' ? 'View Details' : 'View Agency'}
                  <Eye size={13} />
                </button>
              </div>
            </div>
          </article>
        ))}

        {visibleReports.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center">
            <Search className="mx-auto text-slate-400" size={30} />
            <h3 className="mt-3 font-semibold text-slate-800">No reports found</h3>
            <p className="mt-1 text-sm text-slate-500">
              Try changing your search or filters.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-4 rounded-lg bg-[#075B3C] px-4 py-2 text-sm font-semibold text-white hover:bg-[#06482F]"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      {/* Pagination */}
      <footer className="flex flex-col justify-between gap-3 rounded-xl border border-slate-100 bg-white px-4 py-3 text-xs text-slate-600 sm:flex-row sm:items-center">
        <p>
          Showing{' '}
          <span className="font-semibold text-slate-900">
            {filteredReports.length === 0 ? 0 : (page - 1) * pageSize + 1}
            {'–'}
            {Math.min(page * pageSize, filteredReports.length)}
          </span>{' '}
          of <span className="font-semibold text-slate-900">{filteredReports.length}</span> reports
        </p>

        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="rounded-lg p-2 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Previous page"
          >
            <ChevronLeft size={16} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              type="button"
              onClick={() => setPage(number)}
              className={`h-8 min-w-8 rounded-lg px-2 font-semibold ${
                page === number
                  ? 'bg-[#075B3C] text-white'
                  : 'bg-blue-50 text-slate-700 hover:bg-blue-100'
              }`}
            >
              {number}
            </button>
          ))}

          <button
            type="button"
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="rounded-lg p-2 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Next page"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </footer>

      {/* Report details drawer */}
      {selectedReport && !showNote && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/30">
          <button
            type="button"
            aria-label="Close report details"
            onClick={() => setSelectedReport(null)}
            className="absolute inset-0 cursor-default"
          />

          <aside className="relative z-10 flex h-full w-full max-w-lg flex-col bg-white shadow-2xl">
            <header className="flex items-center justify-between border-b border-slate-100 px-5 py-5">
              <div>
                <h2 className="text-lg font-bold">Report Details</h2>
                <p className="mt-1 text-xs text-slate-500">
                  Report #{selectedReport.id} · {selectedReport.status}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedReport(null)}
                className="rounded-lg p-2 hover:bg-slate-100"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </header>

            <div className="flex-1 space-y-5 overflow-y-auto p-5">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Reported agency
                </p>
                <h3 className="mt-2 text-xl font-bold">{selectedReport.agency}</h3>
                <p className="mt-2 text-sm text-slate-600">
                  {selectedReport.category}
                </p>
                <span className={`mt-3 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[selectedReport.status]}`}>
                  {selectedReport.status}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-semibold">Complaint description</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {selectedReport.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-slate-100 p-3">
                  <p className="text-xs text-slate-500">Reporter</p>
                  <p className="mt-1 text-sm font-semibold">{selectedReport.reporter}</p>
                </div>
                <div className="rounded-xl border border-slate-100 p-3">
                  <p className="text-xs text-slate-500">Priority</p>
                  <p className="mt-1 text-sm font-semibold">{selectedReport.priority}</p>
                </div>
                <div className="rounded-xl border border-slate-100 p-3">
                  <p className="text-xs text-slate-500">Location</p>
                  <p className="mt-1 flex items-center gap-1 text-sm font-semibold">
                    <MapPin size={13} /> {selectedReport.location}
                  </p>
                </div>
                <div className="rounded-xl border border-slate-100 p-3">
                  <p className="text-xs text-slate-500">Submitted</p>
                  <p className="mt-1 text-sm font-semibold">{selectedReport.time}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold">Submitted evidence</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedReport.evidence.map((item) => (
                    <EvidenceItem key={item} name={item} />
                  ))}
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  Demo evidence labels only. Connect your file storage to view uploaded evidence.
                </p>
              </div>

              {selectedReport.resolution && (
                <div className="rounded-xl bg-emerald-50 p-4 text-sm text-emerald-900">
                  <strong>Resolution</strong>
                  <p className="mt-1">{selectedReport.resolution}</p>
                </div>
              )}
            </div>

            <footer className="flex flex-wrap gap-2 border-t border-slate-100 p-4">
              {selectedReport.status !== 'Resolved' && (
                <>
                  <button
                    type="button"
                    onClick={() => handleReview(selectedReport)}
                    className="flex-1 rounded-lg bg-blue-100 px-3 py-2.5 text-sm font-semibold text-blue-950 hover:bg-blue-200"
                  >
                    Investigate
                  </button>
                  <button
                    type="button"
                    onClick={() => handleResolve(selectedReport)}
                    className="flex-1 rounded-lg bg-[#075B3C] px-3 py-2.5 text-sm font-semibold text-white hover:bg-[#06482F]"
                  >
                    Resolve Report
                  </button>
                </>
              )}
            </footer>
          </aside>
        </div>
      )}

      {/* Case note modal */}
      {showNote && selectedReport && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-2xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold">Add Case Note</h2>
                <p className="mt-1 text-sm text-slate-500">
                  {selectedReport.agency}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowNote(false)}
                className="rounded-lg p-2 hover:bg-slate-100"
                aria-label="Close note form"
              >
                <X size={18} />
              </button>
            </div>

            <label className="mt-5 block text-sm font-medium text-slate-700">
              Investigation notes
              <textarea
                value={caseNote}
                onChange={(e) => setCaseNote(e.target.value)}
                rows={5}
                placeholder="Record findings, actions taken, or follow-up requirements..."
                className="mt-2 w-full resize-y rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
              />
            </label>

            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowNote(false)}
                className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!caseNote.trim()}
                onClick={() => {
                  updateReport(selectedReport.id, {
                    caseNote: caseNote.trim(),
                  })
                  setShowNote(false)
                  showMessage('Case note saved in this session.')
                }}
                className="rounded-lg bg-[#075B3C] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#06482F] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
