import { useMemo, useState } from 'react'
import {
  Activity,
  Search,
  Download,
  Bell,
  ShieldCheck,
  Database,
  Users,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  LockKeyhole,
  FileText,
  CalendarDays,
  ChevronDown,
  X,
  Copy,
  Flag,
  MapPin,
  Clock,
  TrendingUp,
  UserCog,
  RefreshCw,
  Trash2,
  Mail,
} from 'lucide-react'

const initialLogs = [
  {
    id: 'EVT-2026-102301',
    time: '09:42 AM',
    date: '2026-10-23',
    admin: 'Admin User',
    initials: 'AD',
    role: 'Super Admin',
    action: 'Approved agency',
    resource: 'Overseas Education Lanka',
    resourceId: 'AGY-0092',
    severity: 'Info',
    icon: CheckCircle2,
    iconColor: 'text-emerald-700',
    description:
      'The verification specialist evaluated registration documents and activated the official agency profile.',
    ip: '192.168.1.24',
    location: 'Colombo, Sri Lanka',
    device: 'Chrome 126 / Windows 11',
    module: 'Agencies',
    session: 'sess_89f02c91a0',
    before: {
      status: '"Pending"',
      trust_score: '—',
      public_visibility: 'false',
    },
    after: {
      status: '"Approved"',
      trust_score: '92',
      public_visibility: 'true',
    },
  },
  {
    id: 'EVT-2026-102300',
    time: '09:15 AM',
    date: '2026-10-23',
    admin: 'Kavya Perera',
    initials: 'KP',
    role: 'Agency Verifier',
    action: 'Rejected agency',
    resource: 'Global Migration Experts',
    resourceId: 'AGY-0104',
    severity: 'Warning',
    icon: XCircle,
    iconColor: 'text-red-600',
    description:
      'The agency registration was rejected after the submitted documents failed verification.',
    ip: '192.168.1.32',
    location: 'Kandy, Sri Lanka',
    device: 'Chrome / Windows 11',
    module: 'Agencies',
    session: 'sess_72b19c40',
    before: { status: '"Under Review"', verification: 'pending' },
    after: { status: '"Rejected"', verification: 'failed' },
  },
  {
    id: 'EVT-2026-102299',
    time: '08:58 AM',
    date: '2026-10-23',
    admin: 'Nimal Wickrama',
    initials: 'NW',
    role: 'Scam Investigator',
    action: 'Published scam warning',
    resource: 'Lanka Overseas Fakes',
    resourceId: 'RPT-0231',
    severity: 'Warning',
    icon: AlertTriangle,
    iconColor: 'text-amber-700',
    description:
      'A public warning was published after a scam report was reviewed by the investigation team.',
    ip: '192.168.1.42',
    location: 'Colombo, Sri Lanka',
    device: 'Firefox / Windows 11',
    module: 'Scam Reports',
    session: 'sess_42cd8a10',
    before: { status: '"Under Investigation"', public_warning: 'false' },
    after: { status: '"Published"', public_warning: 'true' },
  },
  {
    id: 'EVT-2026-102298',
    time: '08:30 AM',
    date: '2026-10-23',
    admin: 'Unknown',
    initials: 'UN',
    role: 'Unauthenticated',
    action: 'Failed login attempt ×5',
    resource: 'admin@futurepath.lk',
    resourceId: 'AUTH-0042',
    severity: 'Critical',
    icon: LockKeyhole,
    iconColor: 'text-red-600',
    description:
      'Five unsuccessful login attempts were detected for an administrator account.',
    ip: '103.21.44.8',
    location: 'Unknown location',
    device: 'Unknown browser',
    module: 'Authentication',
    session: 'unverified',
    before: { failed_attempts: '0', account_locked: 'false' },
    after: { failed_attempts: '5', account_locked: 'true' },
  },
  {
    id: 'EVT-2026-102297',
    time: '08:12 AM',
    date: '2026-10-23',
    admin: 'Raj Jayawardena',
    initials: 'RJ',
    role: 'Super Admin',
    action: 'Changed admin role',
    resource: 'Tom Lanka — Moderator',
    resourceId: 'USR-0451',
    severity: 'Info',
    icon: UserCog,
    iconColor: 'text-emerald-700',
    description: 'An administrator role was updated.',
    ip: '192.168.1.24',
    location: 'Colombo, Sri Lanka',
    device: 'Chrome / Windows 11',
    module: 'Admin Users',
    session: 'sess_11ab73',
    before: { role: '"Content Moderator"' },
    after: { role: '"Agency Verifier"' },
  },
  {
    id: 'EVT-2026-102296',
    time: '07:55 AM',
    date: '2026-10-23',
    admin: 'Tom Lanka',
    initials: 'TL',
    role: 'Content Moderator',
    action: 'Updated visa fee',
    resource: 'Australia Student Visa',
    resourceId: 'VISA-0081',
    severity: 'Info',
    icon: FileText,
    iconColor: 'text-emerald-700',
    description: 'Visa fee information was updated.',
    ip: '192.168.1.50',
    location: 'Galle, Sri Lanka',
    device: 'Chrome / Windows 11',
    module: 'Visas',
    session: 'sess_66bc12',
    before: { application_fee: 'AUD 710' },
    after: { application_fee: 'AUD 720' },
  },
  {
    id: 'EVT-2026-102295',
    time: '07:40 AM',
    date: '2026-10-23',
    admin: 'Admin User',
    initials: 'AD',
    role: 'Super Admin',
    action: 'Exported user data (CSV)',
    resource: '1,248 records',
    resourceId: 'EXPORT-0192',
    severity: 'Info',
    icon: Download,
    iconColor: 'text-emerald-700',
    description: 'A CSV export was requested by an administrator.',
    ip: '192.168.1.24',
    location: 'Colombo, Sri Lanka',
    device: 'Chrome / Windows 11',
    module: 'Users',
    session: 'sess_89f02c91a0',
    before: { export_status: '—' },
    after: { export_status: '"Completed"' },
  },
  {
    id: 'EVT-2026-102294',
    time: '06:22 PM',
    date: '2026-10-22',
    admin: 'Dev Mendis',
    initials: 'DM',
    role: 'Agency Verifier',
    action: 'Requested documents',
    resource: 'PathWay Education Group',
    resourceId: 'AGY-0118',
    severity: 'Info',
    icon: Mail,
    iconColor: 'text-emerald-700',
    description: 'Additional verification documents were requested.',
    ip: '192.168.1.35',
    location: 'Jaffna, Sri Lanka',
    device: 'Chrome / Windows 11',
    module: 'Agencies',
    session: 'sess_04ad83',
    before: { documents_requested: '0' },
    after: { documents_requested: '1' },
  },
  {
    id: 'EVT-2026-102293',
    time: '04:10 PM',
    date: '2026-10-22',
    admin: 'Sara Fernando',
    initials: 'SF',
    role: 'Super Admin',
    action: 'Suspended agency',
    resource: 'XpressVisa Hub',
    resourceId: 'AGY-0160',
    severity: 'Critical',
    icon: LockKeyhole,
    iconColor: 'text-red-600',
    description: 'An agency profile was suspended following a compliance review.',
    ip: '192.168.1.24',
    location: 'Colombo, Sri Lanka',
    device: 'Chrome / Windows 11',
    module: 'Agencies',
    session: 'sess_0abf91',
    before: { status: '"Active"' },
    after: { status: '"Suspended"' },
  },
  {
    id: 'EVT-2026-102292',
    time: '02:05 PM',
    date: '2026-10-22',
    admin: 'Admin User',
    initials: 'AD',
    role: 'Super Admin',
    action: 'Deleted scholarship',
    resource: 'Expired Scholarship Listing',
    resourceId: 'SCH-0042',
    severity: 'Critical',
    icon: Trash2,
    iconColor: 'text-red-600',
    description: 'A scholarship listing was removed from the platform.',
    ip: '192.168.1.24',
    location: 'Colombo, Sri Lanka',
    device: 'Chrome / Windows 11',
    module: 'Scholarships',
    session: 'sess_89f02c91a0',
    before: { status: '"Published"' },
    after: { status: '"Deleted"' },
  },
]

const severityStyles = {
  Info: 'bg-blue-50 text-blue-700',
  Warning: 'bg-amber-50 text-amber-700',
  Critical: 'bg-red-50 text-red-700',
}

const avatarColors = [
  'bg-emerald-100 text-emerald-800',
  'bg-blue-100 text-blue-800',
  'bg-violet-100 text-violet-800',
  'bg-rose-100 text-rose-800',
]

function MetricCard({ title, value, note, icon: Icon, tone, trend }) {
  const tones = {
    green: 'bg-emerald-100 text-emerald-800',
    blue: 'bg-blue-100 text-blue-800',
    red: 'bg-red-100 text-red-700',
    amber: 'bg-amber-100 text-amber-800',
  }

  return (
    <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${tones[tone]}`}>
          <Icon size={18} />
        </div>
        {trend && (
          <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
            <TrendingUp size={13} /> {trend}
          </span>
        )}
      </div>
      <p className="mt-3 text-2xl font-bold tracking-tight text-slate-900">{value}</p>
      <p className="mt-1 text-sm font-medium text-slate-600">{title}</p>
      <p className="mt-1 text-xs text-slate-400">{note}</p>
    </div>
  )
}

function FieldLabel({ children }) {
  return (
    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
      {children}
    </p>
  )
}

export default function AuditLogs() {
  const [logs] = useState(initialLogs)
  const [selectedLog, setSelectedLog] = useState(initialLogs[0])
  const [search, setSearch] = useState('')
  const [adminFilter, setAdminFilter] = useState('All')
  const [severityFilter, setSeverityFilter] = useState('All')
  const [dateFilter, setDateFilter] = useState('all')
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [liveTail, setLiveTail] = useState(false)
  const [notice, setNotice] = useState('')

  const filteredLogs = useMemo(() => {
    const query = search.toLowerCase().trim()

    return logs.filter((log) => {
      const matchesSearch =
        !query ||
        [
          log.id,
          log.admin,
          log.action,
          log.resource,
          log.resourceId,
          log.ip,
          log.module,
        ].some((value) => value.toLowerCase().includes(query))

      const matchesAdmin = adminFilter === 'All' || log.admin === adminFilter
      const matchesSeverity =
        severityFilter === 'All' || log.severity === severityFilter

      const matchesDate =
        dateFilter === 'all' ||
        (dateFilter === 'today' && log.date === '2026-10-23') ||
        (dateFilter === 'yesterday' && log.date === '2026-10-22')

      return matchesSearch && matchesAdmin && matchesSeverity && matchesDate
    })
  }, [logs, search, adminFilter, severityFilter, dateFilter])

  const counts = useMemo(
    () => ({
      info: logs.filter((log) => log.severity === 'Info').length,
      warning: logs.filter((log) => log.severity === 'Warning').length,
      critical: logs.filter((log) => log.severity === 'Critical').length,
    }),
    [logs],
  )

  const handleExport = () => {
    const columns = [
      'Event ID',
      'Date',
      'Time',
      'Admin',
      'Role',
      'Action',
      'Resource',
      'Resource ID',
      'Severity',
      'IP Address',
      'Module',
    ]

    const escapeCsv = (value) =>
      `"${String(value ?? '').replace(/"/g, '""')}"`

    const rows = filteredLogs.map((log) => [
      log.id,
      log.date,
      log.time,
      log.admin,
      log.role,
      log.action,
      log.resource,
      log.resourceId,
      log.severity,
      log.ip,
      log.module,
    ])

    const csv = [columns, ...rows].map((row) => row.map(escapeCsv).join(',')).join('\r\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')

    anchor.href = url
    anchor.download = 'futurepath-audit-logs.csv'
    anchor.click()
    URL.revokeObjectURL(url)
    setNotice('CSV export generated from the currently displayed sample records.')
  }

  const handleCopyId = async () => {
    if (!selectedLog) return

    try {
      await navigator.clipboard.writeText(selectedLog.id)
      setNotice('Event ID copied.')
    } catch {
      setNotice(`Event ID: ${selectedLog.id}`)
    }
  }

  const handleReview = () => {
    setNotice(`Review flagged for ${selectedLog.id}. Connect this action to your backend to persist it.`)
  }

  return (
    <div className="min-h-screen bg-[#eef3ff] text-slate-800">
      {/* Main page content only. Your existing admin sidebar and topbar stay in the parent layout. */}
      <main className="mx-auto max-w-[1600px] px-4 py-5 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
              <Activity size={22} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                  Audit Logs
                </h1>
                <span className="rounded-full bg-emerald-200 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-900">
                  Immutable Record
                </span>
              </div>
              <p className="mt-1 max-w-2xl text-sm text-slate-500">
                Review administrative actions, security events, and changes across the platform.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setLiveTail((active) => !active)}
              className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold shadow-sm transition ${
                liveTail
                  ? 'border-emerald-700 bg-emerald-800 text-white'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${liveTail ? 'bg-emerald-200' : 'bg-emerald-600'}`} />
              {liveTail ? 'Live Tail On' : 'Live Tail'}
            </button>

            <button
              type="button"
              onClick={handleExport}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <Download size={16} />
              Export CSV
            </button>
          </div>
        </div>

        {notice && (
          <div className="mb-4 flex items-start justify-between gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
            <span>{notice}</span>
            <button
              type="button"
              onClick={() => setNotice('')}
              aria-label="Dismiss message"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {liveTail && (
          <div className="mb-4 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            <RefreshCw size={15} />
            Live Tail is enabled in the UI. Connect a server event stream to receive real-time audit records.
          </div>
        )}

        {/* Summary cards */}
        <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            title="Events Today"
            value="1,284"
            note="Administrative and system events"
            icon={Database}
            tone="green"
            trend="+12% vs yesterday"
          />
          <MetricCard
            title="Admin Actions"
            value="342"
            note="7 active admins"
            icon={Users}
            tone="blue"
          />
          <MetricCard
            title="Warnings"
            value={counts.warning}
            note="Sample warning events"
            icon={Bell}
            tone="amber"
          />
          <MetricCard
            title="Critical Events"
            value={counts.critical}
            note="Requires attention"
            icon={AlertTriangle}
            tone="red"
          />
        </section>

        {/* Filters */}
        <section className="mb-5 rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-[minmax(220px,1fr)_180px_170px_160px_auto]">
            <label className="relative block">
              <span className="sr-only">Search audit logs</span>
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search action, user, IP address or ID..."
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-100"
              />
            </label>

            <label className="relative">
              <span className="sr-only">Filter by administrator</span>
              <select
                value={adminFilter}
                onChange={(event) => setAdminFilter(event.target.value)}
                className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 pr-8 text-sm outline-none focus:border-emerald-600"
              >
                <option value="All">Admin: All</option>
                {[...new Set(logs.map((log) => log.admin))].map((admin) => (
                  <option key={admin} value={admin}>
                    {admin}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </label>

            <label className="relative">
              <span className="sr-only">Filter by date</span>
              <CalendarDays size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <select
                value={dateFilter}
                onChange={(event) => setDateFilter(event.target.value)}
                className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-7 text-sm outline-none focus:border-emerald-600"
              >
                <option value="all">All dates</option>
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
              </select>
            </label>

            <label className="relative">
              <span className="sr-only">Filter by severity</span>
              <select
                value={severityFilter}
                onChange={(event) => setSeverityFilter(event.target.value)}
                className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 pr-8 text-sm outline-none focus:border-emerald-600"
              >
                <option value="All">Severity: All</option>
                <option value="Info">Info</option>
                <option value="Warning">Warning</option>
                <option value="Critical">Critical</option>
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </label>

            <button
              type="button"
              onClick={() => {
                setSearch('')
                setAdminFilter('All')
                setSeverityFilter('All')
                setDateFilter('all')
              }}
              className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Reset
            </button>
          </div>

          {/* Severity pills */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {[
              { label: 'All', value: 'All', count: logs.length },
              { label: 'Info', value: 'Info', count: counts.info },
              { label: 'Warning', value: 'Warning', count: counts.warning },
              { label: 'Critical', value: 'Critical', count: counts.critical },
            ].map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setSeverityFilter(item.value)}
                className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
                  severityFilter === item.value
                    ? 'border-emerald-800 bg-emerald-800 text-white'
                    : 'border-slate-100 bg-slate-50 text-slate-600 hover:border-emerald-200 hover:bg-emerald-50'
                }`}
              >
                {item.label !== 'All' && (
                  <span
                    className={`h-2 w-2 rounded-full ${
                      item.value === 'Info'
                        ? 'bg-emerald-500'
                        : item.value === 'Warning'
                          ? 'bg-amber-500'
                          : 'bg-red-500'
                    }`}
                  />
                )}
                {item.label}
                <span className={severityFilter === item.value ? 'text-emerald-100' : 'text-slate-400'}>
                  {item.count}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Audit table */}
        <section className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
          <div className="flex flex-col gap-2 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-semibold text-slate-900">Event History</h2>
              <p className="mt-0.5 text-xs text-slate-500">
                Select any event to inspect its recorded details.
              </p>
            </div>
            <span className="text-xs text-slate-500">
              {filteredLogs.length} matching records
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-left">
              <thead>
                <tr className="bg-[#e7efff] text-[10px] uppercase tracking-wider text-slate-600">
                  <th className="px-5 py-3 font-bold">Timestamp</th>
                  <th className="px-4 py-3 font-bold">Administrator</th>
                  <th className="px-4 py-3 font-bold">Action</th>
                  <th className="px-4 py-3 font-bold">Resource</th>
                  <th className="px-4 py-3 font-bold">Severity</th>
                  <th className="px-5 py-3 text-right font-bold">Details</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredLogs.map((log, index) => {
                  const Icon = log.icon
                  const isSelected = selectedLog?.id === log.id

                  return (
                    <tr
                      key={log.id}
                      className={`transition-colors hover:bg-emerald-50/60 ${
                        isSelected
                          ? 'bg-[#eaf1ff]'
                          : log.severity === 'Critical'
                            ? 'bg-red-50/40'
                            : index % 2 === 1
                              ? 'bg-white'
                              : 'bg-white'
                      }`}
                    >
                      <td className="whitespace-nowrap px-5 py-4 text-xs text-slate-500">
                        <div className={log.severity === 'Critical' ? 'font-semibold text-red-600' : ''}>
                          {log.time}
                        </div>
                        <div className="mt-1 text-[10px] text-slate-400">
                          {log.date}
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2.5">
                          <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${avatarColors[index % avatarColors.length]}`}>
                            {log.initials}
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-slate-800">
                              {log.admin}
                            </p>
                            <p className="mt-0.5 text-[10px] text-slate-500">
                              {log.role}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex items-start gap-2">
                          <Icon size={15} className={`mt-0.5 shrink-0 ${log.iconColor}`} />
                          <span className={`max-w-[190px] text-xs font-medium ${
                            log.severity === 'Critical' ? 'text-red-700' : 'text-slate-700'
                          }`}>
                            {log.action}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <p className="max-w-[200px] truncate text-xs text-slate-700">
                          {log.resource}
                        </p>
                        <p className="mt-1 font-mono text-[10px] text-slate-400">
                          {log.resourceId}
                        </p>
                      </td>

                      <td className="px-4 py-4">
                        <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${severityStyles[log.severity]}`}>
                          {log.severity}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-right">
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation()
                            setSelectedLog(log)
                            setDetailsOpen(true)
                          }}
                          className="rounded-md px-3 py-1.5 text-xs font-semibold text-emerald-800 hover:bg-emerald-100"
                        >
                          View details
                        </button>
                      </td>
                    </tr>
                  )
                })}

                {filteredLogs.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-14 text-center">
                      <Search size={24} className="mx-auto text-slate-300" />
                      <p className="mt-3 text-sm font-semibold text-slate-700">
                        No audit events found
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Try changing your search or filter selections.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-2 border-t border-slate-100 bg-slate-50 px-5 py-3 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <span>
              Showing {filteredLogs.length ? 1 : 0}–{filteredLogs.length} of {filteredLogs.length} displayed sample events
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-emerald-700" />
              Audit records shown here are demonstration data
            </span>
          </div>
        </section>

        {/* Audit retention note */}
        <div className="mt-4 flex items-start gap-2 px-1 text-xs leading-5 text-slate-500">
          <ShieldCheck size={15} className="mt-0.5 shrink-0 text-emerald-700" />
          <p>
            <strong className="font-semibold text-slate-600">Audit integrity:</strong>{' '}
            this page currently displays sample records. Immutable storage, cryptographic
            verification, retention policies, and actual administrator events must be
            implemented and enforced by the backend.
          </p>
        </div>
      </main>

      {/* Event details drawer */}
      {detailsOpen && selectedLog && (
        <>
          <button
            type="button"
            aria-label="Close event details"
            onClick={() => setDetailsOpen(false)}
            className="fixed inset-0 z-[60] bg-slate-900/20"
          />

          <aside className="fixed bottom-0 right-0 top-0 z-[70] flex w-full max-w-[480px] flex-col border-l border-slate-200 bg-white shadow-2xl">
            {/* Drawer header */}
            <div className="flex items-center justify-between gap-3 border-b border-slate-100 bg-[#e6efff] px-5 py-5">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Event Details</h2>
                <p className="mt-1 font-mono text-xs text-slate-500">
                  {selectedLog.id}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setDetailsOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-600 transition hover:bg-slate-100"
                aria-label="Close details panel"
              >
                <X size={18} />
              </button>
            </div>

            {/* Drawer content */}
            <div className="flex-1 space-y-5 overflow-y-auto p-5">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${severityStyles[selectedLog.severity]}`}>
                    {selectedLog.severity}
                  </span>
                  <span className="text-xs text-slate-500">
                    {selectedLog.date} · {selectedLog.time}
                  </span>
                </div>

                <h3 className="mt-3 text-xl font-bold leading-snug text-slate-900">
                  {selectedLog.action}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {selectedLog.description}
                </p>
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-5 rounded-xl bg-[#eef3ff] p-4">
                <div>
                  <FieldLabel>Administrator</FieldLabel>
                  <p className="text-sm font-semibold text-slate-900">{selectedLog.admin}</p>
                </div>
                <div>
                  <FieldLabel>Role</FieldLabel>
                  <p className="text-sm font-semibold text-slate-900">{selectedLog.role}</p>
                </div>
                <div>
                  <FieldLabel>IP Address</FieldLabel>
                  <p className="break-all font-mono text-xs text-slate-700">{selectedLog.ip}</p>
                </div>
                <div>
                  <FieldLabel>Location</FieldLabel>
                  <p className="text-sm font-semibold text-slate-900">{selectedLog.location}</p>
                </div>
                <div>
                  <FieldLabel>Device / Agent</FieldLabel>
                  <p className="text-xs leading-5 text-slate-700">{selectedLog.device}</p>
                </div>
                <div>
                  <FieldLabel>Module</FieldLabel>
                  <p className="text-sm font-semibold text-slate-900">{selectedLog.module}</p>
                </div>
                <div>
                  <FieldLabel>Resource ID</FieldLabel>
                  <p className="break-all font-mono text-xs text-slate-700">{selectedLog.resourceId}</p>
                </div>
                <div>
                  <FieldLabel>Session ID</FieldLabel>
                  <p className="break-all font-mono text-xs text-slate-700">{selectedLog.session}</p>
                </div>
              </div>

              <div>
                <h4 className="mb-3 text-sm font-bold text-slate-900">Attribute Changes</h4>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-xl bg-red-50 p-4">
                    <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase text-red-700">
                      <XCircle size={14} />
                      Before
                    </div>
                    <div className="space-y-3">
                      {Object.entries(selectedLog.before).map(([key, value]) => (
                        <div key={key}>
                          <p className="font-mono text-[10px] text-slate-500">{key}:</p>
                          <p className="break-words font-mono text-xs font-semibold text-red-700">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl bg-emerald-50 p-4">
                    <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase text-emerald-800">
                      <CheckCircle2 size={14} />
                      After
                    </div>
                    <div className="space-y-3">
                      {Object.entries(selectedLog.after).map(([key, value]) => (
                        <div key={key}>
                          <p className="font-mono text-[10px] text-slate-500">{key}:</p>
                          <p className="break-words font-mono text-xs font-semibold text-emerald-800">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Location panel */}
              <div>
                <h4 className="mb-3 text-sm font-bold text-slate-900">
                  <MapPin size={14} className="mr-1 inline text-emerald-700" />
                  Access Location Verification
                </h4>
                <div className="relative flex min-h-[120px] items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-br from-teal-100 via-blue-100 to-emerald-100 p-4">
                  <div className="absolute inset-0 opacity-40">
                    <div className="absolute left-[10%] top-[20%] h-px w-[80%] rotate-12 bg-teal-500" />
                    <div className="absolute left-[5%] top-[55%] h-px w-[90%] -rotate-12 bg-teal-500" />
                    <div className="absolute left-[30%] top-0 h-full w-px rotate-12 bg-teal-500" />
                    <div className="absolute left-[70%] top-0 h-full w-px -rotate-12 bg-teal-500" />
                  </div>
                  <div className="relative rounded-full border border-white bg-white/95 px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm">
                    <MapPin size={14} className="mr-1 inline text-emerald-700" />
                    {selectedLog.location}
                  </div>
                </div>
                <p className="mt-2 text-[11px] text-slate-400">
                  Illustrative location only; actual IP geolocation requires a trusted backend service.
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50 p-3 text-xs text-slate-600">
                <Clock size={15} className="shrink-0 text-slate-400" />
                Event timestamp: {selectedLog.date} at {selectedLog.time}
              </div>
            </div>

            {/* Drawer footer */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 bg-white p-4">
              <button
                type="button"
                onClick={handleCopyId}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <Copy size={14} />
                Copy ID
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleReview}
                  className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100"
                >
                  <Flag size={13} />
                  Flag for Review
                </button>
                <button
                  type="button"
                  onClick={() => setDetailsOpen(false)}
                  className="rounded-lg bg-[#0B603A] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#084B2D]"
                >
                  Close
                </button>
              </div>
            </div>
          </aside>
        </>
      )}
    </div>
  )
}
