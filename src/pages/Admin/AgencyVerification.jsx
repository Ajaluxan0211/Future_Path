
import { useMemo, useState } from 'react'
import {
  Search,
  MapPin,
  Building2,
  CheckCircle2,
  Clock3,
  XCircle,
  Eye,
  FileText,
  ShieldCheck,
  X,
  AlertTriangle,
  ChevronDown,
  Filter,
} from 'lucide-react'

const initialAgencies = [
  {
    id: 1,
    owner: 'Robert Vance',
    initials: 'GE',
    name: 'Global Migration Experts',
    license: 'A-001',
    location: 'Colombo, LK',
    services: ['Student Visa'],
    submitted: 'Oct 14, 2026',
    score: 84,
    status: 'Pending',
    documents: [
      'Business Registration',
      'Migration License Certificate',
      'Office Address Proof',
      'Director/Owner Identity (Passport)',
    ],
  },
  {
    id: 2,
    owner: 'Sarah Kim',
    initials: 'SA',
    name: 'Skyline Abroad Consultants',
    license: 'A-002',
    location: 'Kandy, LK',
    services: ['Work Visa', 'Student Visa'],
    submitted: 'Oct 13, 2026',
    score: 91,
    status: 'Pending',
    documents: [
      'Business Registration',
      'Migration License Certificate',
      'Office Address Proof',
      'Director/Owner Identity (Passport)',
    ],
  },
  {
    id: 3,
    owner: 'Michael Lee',
    initials: 'EW',
    name: 'Eastern World Education',
    license: 'A-003',
    location: 'Gampaha, LK',
    services: ['PR Pathway'],
    submitted: 'Oct 12, 2026',
    score: 76,
    status: 'Pending',
    documents: [
      'Business Registration',
      'Migration License Certificate',
      'Office Address Proof',
      'Director/Owner Identity (Passport)',
    ],
  },
  {
    id: 4,
    owner: 'Emily Carter',
    initials: 'FP',
    name: 'Future Path Consultants',
    license: 'A-004',
    location: 'Dubai, UAE',
    services: ['Business Visa', 'Work Visa'],
    submitted: 'Oct 11, 2026',
    score: 88,
    status: 'Approved',
    documents: [
      'Business Registration',
      'Migration License Certificate',
      'Office Address Proof',
      'Director/Owner Identity (Passport)',
    ],
  },
  {
    id: 5,
    owner: 'Daniel Park',
    initials: 'GR',
    name: 'Global Reach Migration',
    license: 'A-005',
    location: 'Sydney, AU',
    services: ['Student Visa'],
    submitted: 'Oct 10, 2026',
    score: 72,
    status: 'Pending',
    documents: [
      'Business Registration',
      'Migration License Certificate',
      'Office Address Proof',
      'Director/Owner Identity (Passport)',
    ],
  },
  {
    id: 6,
    owner: 'Priya Mendis',
    initials: 'VE',
    name: 'Visa Experts Lanka',
    license: 'A-006',
    location: 'Colombo, LK',
    services: ['Student Visa', 'Work Visa'],
    submitted: 'Oct 09, 2026',
    score: 68,
    status: 'Rejected',
    documents: [
      'Business Registration',
      'Migration License Certificate',
      'Office Address Proof',
      'Director/Owner Identity (Passport)',
    ],
  },
  {
    id: 7,
    owner: 'Kevin Das',
    initials: 'MC',
    name: 'Migration Connect',
    license: 'A-007',
    location: 'London, UK',
    services: ['Work Visa', 'PR Pathway'],
    submitted: 'Oct 08, 2026',
    score: 93,
    status: 'Approved',
    documents: [
      'Business Registration',
      'Migration License Certificate',
      'Office Address Proof',
      'Director/Owner Identity (Passport)',
    ],
  },
  {
    id: 8,
    owner: 'Amara Silva',
    initials: 'PE',
    name: 'Pathway Education',
    license: 'A-008',
    location: 'Melbourne, AU',
    services: ['Student Visa'],
    submitted: 'Oct 07, 2026',
    score: 81,
    status: 'Pending',
    documents: [
      'Business Registration',
      'Migration License Certificate',
      'Office Address Proof',
      'Director/Owner Identity (Passport)',
    ],
  },
]

const statusStyles = {
  Pending: 'bg-amber-50 text-amber-700',
  Approved: 'bg-emerald-50 text-emerald-700',
  Rejected: 'bg-red-50 text-red-700',
  'Documents Requested': 'bg-blue-50 text-blue-700',
}

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
        statusStyles[status] || 'bg-slate-100 text-slate-600'
      }`}
    >
      {status === 'Approved' ? (
        <CheckCircle2 size={13} />
      ) : status === 'Rejected' ? (
        <XCircle size={13} />
      ) : (
        <Clock3 size={13} />
      )}
      {status}
    </span>
  )
}

function StatCard({ title, value, subtitle, icon: Icon, iconClass }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            {value}
          </p>
          <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
        </div>

        <div className={`rounded-xl p-3 ${iconClass}`}>
          <Icon size={22} />
        </div>
      </div>
    </div>
  )
}

export default function AgencyVerification() {
  const [agencies, setAgencies] = useState(initialAgencies)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All Statuses')
  const [selectedIds, setSelectedIds] = useState([])
  const [selectedAgencyId, setSelectedAgencyId] = useState(null)
  const [reviewNotes, setReviewNotes] = useState('')
  const [notice, setNotice] = useState('')
  const [page, setPage] = useState(1)
  const pageSize = 8

  const selectedAgency = agencies.find(
    (agency) => agency.id === selectedAgencyId
  )

  const stats = useMemo(
    () => ({
      pending: agencies.filter((a) => a.status === 'Pending').length,
      approved: agencies.filter((a) => a.status === 'Approved').length,
      rejected: agencies.filter((a) => a.status === 'Rejected').length,
      total: agencies.length,
    }),
    [agencies]
  )

  const filteredAgencies = useMemo(() => {
    const term = search.trim().toLowerCase()

    return agencies.filter((agency) => {
      const matchesSearch =
        !term ||
        agency.name.toLowerCase().includes(term) ||
        agency.owner.toLowerCase().includes(term) ||
        agency.location.toLowerCase().includes(term) ||
        agency.license.toLowerCase().includes(term)

      const matchesStatus =
        statusFilter === 'All Statuses' || agency.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [agencies, search, statusFilter])

  const totalPages = Math.max(1, Math.ceil(filteredAgencies.length / pageSize))
  const visibleAgencies = filteredAgencies.slice(
    (page - 1) * pageSize,
    page * pageSize
  )

  function updateStatus(id, status, message) {
    setAgencies((current) =>
      current.map((agency) =>
        agency.id === id ? { ...agency, status } : agency
      )
    )

    setNotice(message)
    setSelectedAgencyId(null)
    setReviewNotes('')
  }

  function toggleSelected(id) {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((selectedId) => selectedId !== id)
        : [...current, id]
    )
  }

  function toggleAllVisible() {
    const visibleIds = visibleAgencies.map((agency) => agency.id)
    const allSelected = visibleIds.every((id) => selectedIds.includes(id))

    setSelectedIds((current) =>
      allSelected
        ? current.filter((id) => !visibleIds.includes(id))
        : [...new Set([...current, ...visibleIds])]
    )
  }

  function bulkUpdate(status) {
    if (selectedIds.length === 0) {
      setNotice('Select at least one agency first.')
      return
    }

    setAgencies((current) =>
      current.map((agency) =>
        selectedIds.includes(agency.id) ? { ...agency, status } : agency
      )
    )

    setNotice(`${selectedIds.length} agency application(s) marked ${status.toLowerCase()}.`)
    setSelectedIds([])
  }

  function handleSearch(value) {
    setSearch(value)
    setPage(1)
  }

  function handleStatusChange(value) {
    setStatusFilter(value)
    setPage(1)
  }

  return (
    <div className="min-h-full text-slate-900">
      {/* Page heading */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs text-slate-500">
            <span>Agency</span>
            <span>/</span>
            <span>Admin</span>
            <span>/</span>
            <span className="font-medium text-[#0B603A]">
              Agency Verification
            </span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Agency Verification
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Review and approve agency applications before they go live on the platform.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setSearch('')
              setStatusFilter('All Statuses')
              setPage(1)
            }}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <Filter size={16} />
            Reset filters
          </button>
        </div>
      </div>

      {notice && (
        <div
          role="status"
          className="mb-5 flex items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
        >
          <span>{notice}</span>
          <button
            type="button"
            onClick={() => setNotice('')}
            aria-label="Dismiss message"
          >
            <X size={17} />
          </button>
        </div>
      )}

      {/* Statistics */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Applications"
          value={stats.total}
          subtitle="All agency applications"
          icon={Building2}
          iconClass="bg-emerald-50 text-[#0B603A]"
        />
        <StatCard
          title="Pending Review"
          value={stats.pending}
          subtitle="Awaiting verification"
          icon={Clock3}
          iconClass="bg-amber-50 text-amber-600"
        />
        <StatCard
          title="Approved Agencies"
          value={stats.approved}
          subtitle="Approved for publication"
          icon={CheckCircle2}
          iconClass="bg-emerald-50 text-emerald-700"
        />
        <StatCard
          title="Rejected Applications"
          value={stats.rejected}
          subtitle="Not approved"
          icon={XCircle}
          iconClass="bg-red-50 text-red-600"
        />
      </div>

      {/* Search and filters */}
      <section className="mb-5 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row">
          <label className="relative min-w-0 flex-1">
            <span className="sr-only">Search agencies</span>
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={search}
              onChange={(event) => handleSearch(event.target.value)}
              placeholder="Search agency name, owner, license, city..."
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#0B603A] focus:ring-2 focus:ring-emerald-100"
            />
          </label>

          <div className="relative lg:w-56">
            <label className="sr-only" htmlFor="agency-status-filter">
              Filter by status
            </label>
            <select
              id="agency-status-filter"
              value={statusFilter}
              onChange={(event) => handleStatusChange(event.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm text-slate-700 outline-none focus:border-[#0B603A] focus:ring-2 focus:ring-emerald-100"
            >
              <option>All Statuses</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
              <option>Documents Requested</option>
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>
        </div>

        {selectedIds.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-4">
            <span className="text-sm text-slate-600">
              {selectedIds.length} selected
            </span>
            <button
              type="button"
              onClick={() => bulkUpdate('Approved')}
              className="rounded-lg bg-[#0B603A] px-3 py-2 text-xs font-semibold text-white hover:bg-[#084A2E]"
            >
              Approve selected
            </button>
            <button
              type="button"
              onClick={() => bulkUpdate('Rejected')}
              className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-50"
            >
              Reject selected
            </button>
          </div>
        )}
      </section>

      {/* Applications table */}
      <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <h2 className="font-semibold text-slate-900">
              Agency Applications
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Review submitted agency credentials and application status.
            </p>
          </div>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-[#0B603A]">
            {filteredAgencies.length} results
          </span>
        </div>

        {visibleAgencies.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <Search className="mx-auto mb-3 text-slate-300" size={30} />
            <p className="font-medium text-slate-700">
              No agency applications found
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Try changing your search or status filter.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="w-12 px-5 py-4">
                    <input
                      type="checkbox"
                      aria-label="Select all visible agencies"
                      checked={
                        visibleAgencies.length > 0 &&
                        visibleAgencies.every((agency) =>
                          selectedIds.includes(agency.id)
                        )
                      }
                      onChange={toggleAllVisible}
                      className="h-4 w-4 accent-[#0B603A]"
                    />
                  </th>
                  <th className="px-4 py-4">Agency / Owner</th>
                  <th className="px-4 py-4">Location</th>
                  <th className="px-4 py-4">Services</th>
                  <th className="px-4 py-4">Submitted</th>
                  <th className="px-4 py-4">Status</th>
                  <th className="px-5 py-4 text-right">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {visibleAgencies.map((agency) => (
                  <tr
                    key={agency.id}
                    className="transition hover:bg-emerald-50/40"
                  >
                    <td className="px-5 py-4">
                      <input
                        type="checkbox"
                        aria-label={`Select ${agency.name}`}
                        checked={selectedIds.includes(agency.id)}
                        onChange={() => toggleSelected(agency.id)}
                        className="h-4 w-4 accent-[#0B603A]"
                      />
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-xs font-bold text-[#0B603A]">
                          {agency.initials}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">
                            {agency.name}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            Owner: {agency.owner} · {agency.license}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4 text-slate-600">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin size={14} className="shrink-0 text-slate-400" />
                        {agency.location}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex max-w-48 flex-wrap gap-1.5">
                        {agency.services.map((service) => (
                          <span
                            key={service}
                            className="rounded-full bg-blue-50 px-2 py-1 text-[11px] font-medium text-blue-700"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-xs text-slate-500">
                      {agency.submitted}
                    </td>

                    <td className="px-4 py-4">
                      <StatusBadge status={agency.status} />
                    </td>

                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedAgencyId(agency.id)
                          setReviewNotes('')
                          setNotice('')
                        }}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-[#0B603A] hover:text-[#0B603A]"
                      >
                        <Eye size={14} />
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            Showing{' '}
            {filteredAgencies.length === 0
              ? 0
              : (page - 1) * pageSize + 1}
            {'–'}
            {Math.min(page * pageSize, filteredAgencies.length)} of{' '}
            {filteredAgencies.length} applications
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((current) => current - 1)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>
            <span className="px-2 text-xs text-slate-500">
              Page {page} of {totalPages}
            </span>
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => setPage((current) => current + 1)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </section>

      {/* Review side panel */}
      {selectedAgency && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <button
            type="button"
            aria-label="Close review panel"
            onClick={() => setSelectedAgencyId(null)}
            className="absolute inset-0 bg-slate-950/35"
          />

          <aside className="relative z-10 flex h-full w-full max-w-xl flex-col bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-100 px-5 py-5 sm:px-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Review Application
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  {selectedAgency.name}
                </p>
              </div>
              <button
                type="button"
                aria-label="Close panel"
                onClick={() => setSelectedAgencyId(null)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="flex items-center gap-3 bg-slate-50 px-5 py-5 sm:px-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 font-bold text-[#0B603A]">
                  {selectedAgency.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-slate-900">
                    {selectedAgency.name}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    License: {selectedAgency.license} • {selectedAgency.location}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Owner: {selectedAgency.owner}
                  </p>
                </div>
                <div className="shrink-0 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-[#0B603A]">
                  Est. {selectedAgency.score} / 100
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold text-slate-900">
                    Submitted Documents ({selectedAgency.documents.length}/4)
                  </h3>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                    <ShieldCheck size={14} />
                    Review required
                  </span>
                </div>

                <div className="space-y-3">
                  {selectedAgency.documents.map((document) => (
                    <div
                      key={document}
                      className="flex items-center gap-3 rounded-xl bg-slate-50 p-4"
                    >
                      <FileText
                        size={20}
                        className="shrink-0 text-[#0B603A]"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-slate-800">
                          {document}
                        </p>
                        <p className="mt-1 text-xs text-emerald-700">
                          Sample document record
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setNotice(
                            'No actual uploaded file is connected to this demo document yet.'
                          )
                        }
                        className="text-xs font-semibold text-[#0B603A] hover:underline"
                      >
                        View
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <label
                    htmlFor="review-notes"
                    className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500"
                  >
                    Reviewer Notes & Feedback
                  </label>
                  <textarea
                    id="review-notes"
                    value={reviewNotes}
                    onChange={(event) => setReviewNotes(event.target.value)}
                    placeholder="Add internal audit notes or verification remarks..."
                    rows={4}
                    className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none placeholder:text-slate-400 focus:border-[#0B603A] focus:ring-2 focus:ring-emerald-100"
                  />
                </div>

                <div className="mt-5 rounded-xl border border-amber-100 bg-amber-50 p-3">
                  <div className="flex gap-2">
                    <AlertTriangle
                      size={17}
                      className="mt-0.5 shrink-0 text-amber-600"
                    />
                    <p className="text-xs leading-5 text-amber-800">
                      This is a frontend demonstration. Review decisions are
                      stored only in the current page state and will reset when
                      you reload the page. Connect your backend before using
                      this for real agency approvals.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2 border-t border-slate-100 p-4 sm:grid-cols-3 sm:p-5">
              <button
                type="button"
                onClick={() =>
                  updateStatus(
                    selectedAgency.id,
                    'Rejected',
                    `${selectedAgency.name} was marked as rejected in this demo.`
                  )
                }
                className="rounded-xl bg-red-50 px-3 py-3 text-sm font-semibold text-red-700 hover:bg-red-100"
              >
                Reject
              </button>

              <button
                type="button"
                onClick={() =>
                  updateStatus(
                    selectedAgency.id,
                    'Documents Requested',
                    `Additional documents requested from ${selectedAgency.name}.`
                  )
                }
                className="rounded-xl bg-slate-100 px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-200"
              >
                Request Docs
              </button>

              <button
                type="button"
                onClick={() =>
                  updateStatus(
                    selectedAgency.id,
                    'Approved',
                    `${selectedAgency.name} was approved in this demo.`
                  )
                }
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#0B603A] px-3 py-3 text-sm font-semibold text-white hover:bg-[#084A2E]"
              >
                Approve <CheckCircle2 size={16} />
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}
