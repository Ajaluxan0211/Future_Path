
import { useMemo, useState } from 'react'
import {
  Users as UsersIcon,
  UserPlus,
  Building2,
  Search,
  X,
  ClipboardList,
  ShieldCheck,
  Mail,
  Ban,
  Eye,
  BookOpen,
  Globe,
  CheckCircle2,
  Clock3,
  Activity,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

const INITIAL_USERS = [
  {
    id: 1,
    name: 'Ashan Kumara',
    email: 'ashan@gmail.com',
    role: 'Student',
    joined: 'Jun 15, 2024',
    lastActive: '2 hours ago',
    status: 'Active',
    verified: true,
    initials: 'AK',
    color: 'bg-blue-100 text-blue-800',
    searches: 12,
    agencies: 3,
    scamFlags: 0,
    events: [
      {
        title: 'Australia universities query',
        detail: 'Filter: Melbourne / Master IT',
        time: '2h ago',
        icon: Search,
      },
      {
        title: 'Viewed "Visa Global Consultants"',
        detail: 'Profile audit & reviews',
        time: '1 day ago',
        icon: Building2,
      },
      {
        title: 'Cyber Security courses browse',
        detail: 'Saved 2 programs',
        time: '3 days ago',
        icon: BookOpen,
      },
      {
        title: 'Account registration complete',
        detail: 'Email verified via OTP',
        time: '15 Jun',
        icon: CheckCircle2,
      },
    ],
  },
  {
    id: 2,
    name: 'Nimesha Rathnayake',
    email: 'nimesha@outlook.com',
    role: 'Student',
    joined: 'May 20, 2024',
    lastActive: 'Yesterday',
    status: 'Active',
    verified: true,
    initials: 'NR',
    color: 'bg-emerald-100 text-emerald-800',
    searches: 8,
    agencies: 1,
    scamFlags: 0,
    events: [],
  },
  {
    id: 3,
    name: 'Visa Global Admin',
    email: 'info@visaglobal.lk',
    role: 'Agency',
    joined: 'Apr 10, 2024',
    lastActive: '1 hour ago',
    status: 'Active',
    verified: true,
    initials: 'VG',
    color: 'bg-emerald-100 text-emerald-800',
    searches: 24,
    agencies: 6,
    scamFlags: 0,
    events: [],
  },
  {
    id: 4,
    name: 'Sachini Perera',
    email: 'sachini@gmail.com',
    role: 'Student',
    joined: 'Mar 05, 2024',
    lastActive: '3 days ago',
    status: 'Active',
    verified: true,
    initials: 'SP',
    color: 'bg-blue-100 text-blue-800',
    searches: 5,
    agencies: 2,
    scamFlags: 0,
    events: [],
  },
  {
    id: 5,
    name: 'Dilshan Kumar',
    email: 'dilshan@yahoo.com',
    role: 'Student',
    joined: 'Feb 18, 2024',
    lastActive: '4 hours ago',
    status: 'Active',
    verified: true,
    initials: 'DK',
    color: 'bg-emerald-100 text-emerald-800',
    searches: 17,
    agencies: 4,
    scamFlags: 0,
    events: [],
  },
  {
    id: 6,
    name: 'OE Lanka Admin',
    email: 'admin@oe-lanka.lk',
    role: 'Agency',
    joined: 'Jan 12, 2024',
    lastActive: '6 hours ago',
    status: 'Active',
    verified: true,
    initials: 'OE',
    color: 'bg-emerald-100 text-emerald-800',
    searches: 19,
    agencies: 5,
    scamFlags: 0,
    events: [],
  },
  {
    id: 7,
    name: 'Priya Mendis',
    email: 'priya@gmail.com',
    role: 'Student',
    joined: 'Dec 03, 2023',
    lastActive: '1 week ago',
    status: 'Suspended',
    verified: false,
    initials: 'PM',
    color: 'bg-red-100 text-red-800',
    searches: 3,
    agencies: 0,
    scamFlags: 2,
    events: [],
  },
  {
    id: 8,
    name: 'Raj Jayawardena',
    email: 'raj@agency.com',
    role: 'Admin',
    joined: 'Nov 01, 2023',
    lastActive: '4 hours ago',
    status: 'Active',
    verified: true,
    initials: 'RJ',
    color: 'bg-blue-100 text-blue-800',
    searches: 7,
    agencies: 0,
    scamFlags: 0,
    events: [],
  },
  {
    id: 9,
    name: 'Unknown User432',
    email: 'user432@tempmail.com',
    role: 'Student',
    joined: 'Oct 15, 2023',
    lastActive: '3 weeks ago',
    status: 'Suspended',
    verified: false,
    initials: 'XU',
    color: 'bg-red-100 text-red-800',
    searches: 1,
    agencies: 0,
    scamFlags: 3,
    events: [],
  },
  {
    id: 10,
    name: 'PathWay Admin',
    email: 'pw@pathway.lk',
    role: 'Agency',
    joined: 'Sep 05, 2023',
    lastActive: '30 min ago',
    status: 'Active',
    verified: true,
    initials: 'PW',
    color: 'bg-emerald-100 text-emerald-800',
    searches: 11,
    agencies: 2,
    scamFlags: 0,
    events: [],
  },
]

const ROLE_FILTERS = ['All Users', 'Student', 'Agency', 'Admin']
const PAGE_SIZE = 10

function StatCard({ icon: Icon, label, value, note, iconClass }) {
  return (
    <div className="min-w-0 rounded-xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className={`rounded-lg p-2.5 ${iconClass}`}>
          <Icon size={21} />
        </div>
        {note && (
          <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-semibold text-emerald-800">
            {note}
          </span>
        )}
      </div>
      <p className="mt-4 text-2xl font-bold tracking-tight text-[#0B603A]">
        {value}
      </p>
      <p className="mt-1 text-sm font-medium text-slate-600">{label}</p>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full w-3/4 rounded-full bg-[#0B7047]" />
      </div>
    </div>
  )
}

function RoleBadge({ role }) {
  const styles = {
    Student: 'bg-blue-100 text-blue-900',
    Agency: 'bg-emerald-100 text-emerald-800',
    Admin: 'bg-indigo-100 text-indigo-900',
  }

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
        styles[role] || 'bg-slate-100 text-slate-700'
      }`}
    >
      {role}
    </span>
  )
}

function StatusBadge({ status }) {
  const active = status === 'Active'

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-medium ${
        active ? 'text-emerald-800' : 'text-red-700'
      }`}
    >
      <span
        className={`h-2 w-2 rounded-full ${
          active ? 'bg-emerald-700' : 'bg-red-600'
        }`}
      />
      {status}
    </span>
  )
}

export default function Users() {
  const [users, setUsers] = useState(INITIAL_USERS)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('All Users')
  const [statusFilter, setStatusFilter] = useState('All Status')
  const [selectedIds, setSelectedIds] = useState([1])
  const [activeUser, setActiveUser] = useState(null)
  const [page, setPage] = useState(1)
  const [notice, setNotice] = useState('')

  const filteredUsers = useMemo(() => {
    const term = search.trim().toLowerCase()

    return users.filter((user) => {
      const matchesSearch =
        !term ||
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)

      const matchesRole =
        roleFilter === 'All Users' || user.role === roleFilter

      const matchesStatus =
        statusFilter === 'All Status' || user.status === statusFilter

      return matchesSearch && matchesRole && matchesStatus
    })
  }, [users, search, roleFilter, statusFilter])

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE))
  const visibleUsers = filteredUsers.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  )

  const activeCount = users.filter((user) => user.status === 'Active').length
  const agencyCount = users.filter((user) => user.role === 'Agency').length
  const newUsersCount = users.filter((user) =>
    ['Ashan Kumara', 'Nimesha Rathnayake'].includes(user.name),
  ).length

  const allVisibleSelected =
    visibleUsers.length > 0 &&
    visibleUsers.every((user) => selectedIds.includes(user.id))

  function toggleUser(id) {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((selectedId) => selectedId !== id)
        : [...current, id],
    )
  }

  function toggleVisibleUsers() {
    if (allVisibleSelected) {
      setSelectedIds((current) =>
        current.filter((id) => !visibleUsers.some((user) => user.id === id)),
      )
    } else {
      setSelectedIds((current) => [
        ...new Set([...current, ...visibleUsers.map((user) => user.id)]),
      ])
    }
  }

  function toggleSuspension(user) {
    const nextStatus = user.status === 'Active' ? 'Suspended' : 'Active'

    setUsers((current) =>
      current.map((item) =>
        item.id === user.id ? { ...item, status: nextStatus } : item,
      ),
    )

    if (activeUser?.id === user.id) {
      setActiveUser({ ...user, status: nextStatus })
    }

    setNotice(`${user.name} marked as ${nextStatus.toLowerCase()}.`)
  }

  function suspendSelected() {
    if (selectedIds.length === 0) {
      setNotice('Select at least one user first.')
      return
    }

    setUsers((current) =>
      current.map((user) =>
        selectedIds.includes(user.id)
          ? { ...user, status: 'Suspended' }
          : user,
      ),
    )

    setActiveUser((current) =>
      current && selectedIds.includes(current.id)
        ? { ...current, status: 'Suspended' }
        : current,
    )

    setNotice(`${selectedIds.length} selected user(s) suspended.`)
  }

  function exportSelected() {
    const rows = users.filter((user) =>
      selectedIds.length
        ? selectedIds.includes(user.id)
        : filteredUsers.some((item) => item.id === user.id),
    )

    if (rows.length === 0) {
      setNotice('No users available to export.')
      return
    }

    const csvCell = (value) =>
      `"${String(value).replaceAll('"', '""')}"`

    const csv = [
      ['Name', 'Email', 'Role', 'Joined', 'Last Active', 'Status'].join(','),
      ...rows.map((user) =>
        [
          user.name,
          user.email,
          user.role,
          user.joined,
          user.lastActive,
          user.status,
        ]
          .map(csvCell)
          .join(','),
      ),
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'agency-users.csv'
    anchor.click()
    URL.revokeObjectURL(url)
    setNotice(`${rows.length} user(s) exported.`)
  }

  function openUser(user) {
    setActiveUser(user)
  }

  return (
    <div className="min-w-0 space-y-6 text-slate-900">
      {/* Page heading */}
      <header>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Users
          </h1>
          <span className="rounded-full bg-emerald-200 px-3 py-1 text-xs font-semibold text-emerald-900">
            {users.length.toLocaleString()} Total
          </span>
        </div>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
          Manage, verify, and inspect student, agency, and institutional
          administrator accounts.
        </p>
      </header>

      {/* Statistics */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={UsersIcon}
          label="Total Users"
          value={users.length.toLocaleString()}
          note="+12% mo/mo"
          iconClass="bg-emerald-100 text-emerald-800"
        />
        <StatCard
          icon={UserPlus}
          label="New This Week"
          value={newUsersCount}
          note="Recent signups"
          iconClass="bg-blue-100 text-blue-800"
        />
        <StatCard
          icon={Building2}
          label="Agency Accounts"
          value={agencyCount}
          note="Registered"
          iconClass="bg-indigo-100 text-indigo-800"
        />
        <StatCard
          icon={ShieldCheck}
          label="Active Accounts"
          value={activeCount}
          note="Current status"
          iconClass="bg-emerald-100 text-emerald-800"
        />
      </section>

      {notice && (
        <div
          role="status"
          className="flex items-start justify-between gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900"
        >
          <span>{notice}</span>
          <button
            type="button"
            onClick={() => setNotice('')}
            aria-label="Dismiss notification"
            className="shrink-0 rounded p-0.5 hover:bg-emerald-100"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Filters and actions */}
      <section className="space-y-4">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-wrap gap-2">
            {ROLE_FILTERS.map((role) => {
              const count =
                role === 'All Users'
                  ? users.length
                  : users.filter((user) => user.role === role).length

              return (
                <button
                  key={role}
                  type="button"
                  onClick={() => {
                    setRoleFilter(role)
                    setPage(1)
                  }}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    roleFilter === role
                      ? 'border-[#064E32] bg-[#064E32] text-white'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-emerald-50'
                  }`}
                >
                  {role === 'All Users' ? role : `${role}s`} ({count})
                </button>
              )
            })}
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <label className="relative min-w-0 flex-1 sm:min-w-56">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <input
                type="search"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value)
                  setPage(1)
                }}
                placeholder="Search by name or email..."
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
              />
            </label>

            <select
              value={statusFilter}
              onChange={(event) => {
                setStatusFilter(event.target.value)
                setPage(1)
              }}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-emerald-700"
              aria-label="Filter by account status"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Suspended</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={suspendSelected}
            className="inline-flex items-center gap-2 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100"
          >
            <Ban size={15} />
            Suspend Selected ({selectedIds.length})
          </button>
          <button
            type="button"
            onClick={exportSelected}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Export {selectedIds.length ? 'Selected' : 'Filtered'}
          </button>
        </div>
      </section>

      {/* Users table */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] border-collapse text-left">
            <thead className="bg-[#EEF3FF] text-xs uppercase tracking-wider text-slate-700">
              <tr>
                <th className="w-12 px-5 py-4">
                  <input
                    type="checkbox"
                    checked={allVisibleSelected}
                    onChange={toggleVisibleUsers}
                    aria-label="Select visible users"
                    className="h-4 w-4 accent-[#0B603A]"
                  />
                </th>
                <th className="px-4 py-4 font-bold">User</th>
                <th className="px-4 py-4 font-bold">Role</th>
                <th className="px-4 py-4 font-bold">Joined Date</th>
                <th className="px-4 py-4 font-bold">Last Active</th>
                <th className="px-4 py-4 font-bold">Status</th>
                <th className="px-4 py-4 font-bold">Audit</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {visibleUsers.map((user) => (
                <tr
                  key={user.id}
                  className={`transition hover:bg-emerald-50/60 ${
                    selectedIds.includes(user.id) ? 'bg-emerald-50' : 'bg-white'
                  }`}
                >
                  <td className="px-5 py-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(user.id)}
                      onChange={() => toggleUser(user.id)}
                      aria-label={`Select ${user.name}`}
                      className="h-4 w-4 accent-[#0B603A]"
                    />
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${user.color}`}
                      >
                        {user.initials}
                      </div>
                      <div className="min-w-0">
                        <p className="whitespace-nowrap text-sm font-semibold text-slate-900">
                          {user.name}
                        </p>
                        <p className="mt-0.5 text-xs text-slate-500">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <RoleBadge role={user.role} />
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600">
                    {user.joined}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600">
                    {user.lastActive}
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge status={user.status} />
                  </td>
                  <td className="px-4 py-4">
                    <button
                      type="button"
                      onClick={() => openUser(user)}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#075D3A] underline-offset-4 hover:underline"
                    >
                      <Eye size={15} />
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}

              {visibleUsers.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-16 text-center text-sm text-slate-500"
                  >
                    <UsersIcon className="mx-auto mb-3 text-slate-300" size={32} />
                    No users match your search or filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col gap-3 border-t border-slate-100 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-600">
            Showing{' '}
            <span className="font-semibold text-slate-900">
              {filteredUsers.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–
              {Math.min(page * PAGE_SIZE, filteredUsers.length)}
            </span>{' '}
            of <span className="font-semibold">{filteredUsers.length}</span>{' '}
            users
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={page === 1}
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Previous page"
            >
              <ChevronLeft size={17} />
            </button>

            <span className="rounded-lg bg-[#064E32] px-3.5 py-2 text-sm font-semibold text-white">
              {page}
            </span>

            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() =>
                setPage((current) => Math.min(totalPages, current + 1))
              }
              className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Next page"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </section>

      {/* Right-side User Profile Audit drawer */}
      {activeUser && (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label="Close user profile audit"
            onClick={() => setActiveUser(null)}
            className="absolute inset-0 bg-slate-950/30"
          />

          <aside className="absolute inset-y-0 right-0 flex w-full max-w-[460px] flex-col bg-white shadow-2xl">
            <header className="flex items-start justify-between border-b border-slate-100 bg-[#F8FAFF] px-5 py-5">
              <div className="flex items-center gap-3">
                <ClipboardList size={20} className="text-[#075D3A]" />
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    User Profile Audit
                  </h2>
                  <p className="mt-0.5 text-xs text-slate-500">
                    Account activity and security
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveUser(null)}
                aria-label="Close"
                className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-200"
              >
                <X size={19} />
              </button>
            </header>

            <div className="flex-1 space-y-5 overflow-y-auto p-5">
              {/* Profile */}
              <section className="rounded-2xl bg-[#FAFCFF] p-5 text-center">
                <div
                  className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold ring-4 ring-white ${activeUser.color}`}
                >
                  {activeUser.initials}
                </div>
                <h3 className="mt-3 text-lg font-bold text-slate-900">
                  {activeUser.name}
                </h3>
                <p className="mt-1 break-all text-sm text-slate-600">
                  {activeUser.email}
                </p>
                <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                  <RoleBadge role={activeUser.role} />
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                      activeUser.verified
                        ? 'bg-emerald-200 text-emerald-900'
                        : 'bg-amber-100 text-amber-900'
                    }`}
                  >
                    {activeUser.verified ? (
                      <CheckCircle2 size={13} />
                    ) : (
                      <Clock3 size={13} />
                    )}
                    {activeUser.verified ? 'Verified' : 'Unverified'}
                  </span>
                </div>
              </section>

              {/* User metrics */}
              <section className="grid grid-cols-3 gap-2.5">
                {[
                  { value: activeUser.searches, label: 'Searches' },
                  { value: activeUser.agencies, label: 'Agencies' },
                  { value: activeUser.scamFlags, label: 'Scam Flags' },
                ].map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-xl bg-[#EEF3FF] px-2 py-4 text-center"
                  >
                    <p className="text-2xl font-bold text-slate-900">
                      {metric.value}
                    </p>
                    <p className="mt-1 text-xs text-slate-600">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </section>

              {/* Recent events */}
              <section>
                <div className="mb-3 flex items-center justify-between gap-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Recent Platform Events
                  </h3>
                  <span className="text-xs font-semibold text-emerald-800">
                    Sample Feed
                  </span>
                </div>

                {activeUser.events.length ? (
                  <div className="space-y-2.5">
                    {activeUser.events.map((event) => {
                      const EventIcon = event.icon

                      return (
                        <div
                          key={event.title}
                          className="flex items-start gap-3 rounded-xl bg-[#F7F9FD] p-3"
                        >
                          <span className="mt-0.5 rounded-full bg-blue-100 p-2 text-blue-800">
                            <EventIcon size={15} />
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold leading-5 text-slate-900">
                              {event.title}
                            </p>
                            <p className="mt-0.5 text-xs leading-5 text-slate-600">
                              {event.detail}
                            </p>
                          </div>
                          <span className="shrink-0 text-[11px] text-slate-500">
                            {event.time}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="rounded-xl bg-[#F7F9FD] px-4 py-8 text-center">
                    <Activity className="mx-auto mb-2 text-slate-400" size={25} />
                    <p className="text-sm font-medium text-slate-700">
                      No sample activity available
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Real events can be loaded from your backend audit log.
                    </p>
                  </div>
                )}
              </section>

              {/* Security information */}
              <section className="space-y-3 rounded-xl bg-[#F3F7FF] p-4">
                <div className="flex items-center justify-between gap-3 text-xs">
                  <span className="text-slate-600">Account Security State</span>
                  <span className="text-right font-semibold text-emerald-800">
                    {activeUser.status === 'Active'
                      ? 'Active'
                      : 'Suspended'}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3 text-xs">
                  <span className="text-slate-600">Email Verification</span>
                  <span className="font-medium text-slate-800">
                    {activeUser.verified ? 'Verified' : 'Not verified'}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3 text-xs">
                  <span className="text-slate-600">Account Role</span>
                  <span className="font-medium text-slate-800">
                    {activeUser.role}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3 text-xs">
                  <span className="text-slate-600">Registered</span>
                  <span className="text-right font-medium text-slate-800">
                    {activeUser.joined}
                  </span>
                </div>
              </section>
            </div>

            {/* Drawer actions */}
            <footer className="grid grid-cols-3 gap-2 border-t border-slate-100 bg-white p-4">
              <a
                href={`mailto:${activeUser.email}`}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-2 py-3 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                <Mail size={14} />
                Email
              </a>

              <button
                type="button"
                onClick={() => toggleSuspension(activeUser)}
                className={`inline-flex items-center justify-center gap-1.5 rounded-lg px-2 py-3 text-xs font-semibold ${
                  activeUser.status === 'Active'
                    ? 'bg-red-100 text-red-800 hover:bg-red-200'
                    : 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200'
                }`}
              >
                {activeUser.status === 'Active' ? (
                  <Ban size={14} />
                ) : (
                  <CheckCircle2 size={14} />
                )}
                {activeUser.status === 'Active' ? 'Suspend' : 'Activate'}
              </button>

              <button
                type="button"
                onClick={() => {
                  setNotice(`Audit profile opened for ${activeUser.name}.`)
                  setActiveUser(null)
                }}
                className="inline-flex items-center justify-center gap-1 rounded-lg bg-[#064E32] px-2 py-3 text-xs font-semibold text-white hover:bg-[#043D27]"
              >
                <ClipboardList size={14} />
                Full Audit
              </button>
            </footer>
          </aside>
        </div>
      )}
    </div>
  )
}
