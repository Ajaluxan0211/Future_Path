import { useEffect, useMemo, useState } from 'react'
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
  CheckCircle2,
  Clock3,
  Activity,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

const ROLE_FILTERS = ['All Users', 'Student', 'Agency', 'Admin']
const PAGE_SIZE = 10

function StatCard({ icon: Icon, label, value, note, iconClass }) {
  return (
    <div className="min-w-0 rounded-xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className={`rounded-lg p-2.5 ${iconClass}`}><Icon size={21} /></div>
        {note && <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-semibold text-emerald-800">{note}</span>}
      </div>
      <p className="mt-4 text-2xl font-bold tracking-tight text-[#0B603A]">{value}</p>
      <p className="mt-1 text-sm font-medium text-slate-600">{label}</p>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full w-3/4 rounded-full bg-[#0B7047]" /></div>
    </div>
  )
}

function RoleBadge({ role }) {
  const styles = {
    Student: 'bg-blue-100 text-blue-900',
    Agency: 'bg-emerald-100 text-emerald-800',
    Admin: 'bg-indigo-100 text-indigo-900',
  }
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${styles[role] || 'bg-slate-100 text-slate-700'}`}>{role}</span>
}

function StatusBadge({ status }) {
  const active = status === 'Active'
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${active ? 'text-emerald-800' : 'text-red-700'}`}>
      <span className={`h-2 w-2 rounded-full ${active ? 'bg-emerald-700' : 'bg-red-600'}`} />
      {status}
    </span>
  )
}

function getInitials(name = '') {
  return name.split(' ').filter(Boolean).map((part) => part[0]).join('').slice(0, 2).toUpperCase()
}

function formatJoinedDate(dateValue) {
  if (!dateValue) return 'Unknown'
  const date = new Date(dateValue)
  if (Number.isNaN(date.getTime())) return 'Unknown'
  return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
}

export default function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('All Users')
  const [statusFilter, setStatusFilter] = useState('All Status')
  const [selectedIds, setSelectedIds] = useState([])
  const [activeUser, setActiveUser] = useState(null)
  const [page, setPage] = useState(1)
  const [notice, setNotice] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function fetchUsers() {
      try {
        setLoading(true)
        setLoadError('')
        const response = await fetch('http://localhost:5000/api/admin/users', {
          method: 'GET',
          credentials: 'include',
          signal: controller.signal,
        })
        const data = await response.json()
        if (!response.ok || !data.success) {
          throw new Error(data.message || 'Could not load registered users.')
        }
        setUsers(Array.isArray(data.users) ? data.users : [])
      } catch (error) {
        if (error.name !== 'AbortError') {
          setLoadError(error.message || 'Could not connect to the backend.')
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    fetchUsers()
    return () => controller.abort()
  }, [])

  const filteredUsers = useMemo(() => {
    const term = search.trim().toLowerCase()
    return users.filter((user) => {
      const matchesSearch = !term || user.name.toLowerCase().includes(term) || user.email.toLowerCase().includes(term)
      const matchesRole = roleFilter === 'All Users' || user.role === roleFilter
      const matchesStatus = statusFilter === 'All Status' || user.status === statusFilter
      return matchesSearch && matchesRole && matchesStatus
    })
  }, [users, search, roleFilter, statusFilter])

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE))
  const visibleUsers = filteredUsers.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const activeCount = users.filter((user) => user.status === 'Active').length
  const agencyCount = users.filter((user) => user.role === 'Agency').length
  const newUsersCount = users.filter((user) => {
    if (!user.createdAt) return false
    const joinedDate = new Date(user.createdAt)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    return !Number.isNaN(joinedDate.getTime()) && joinedDate >= sevenDaysAgo
  }).length

  const allVisibleSelected = visibleUsers.length > 0 && visibleUsers.every((user) => selectedIds.includes(user.id))

  function toggleUser(id) {
    setSelectedIds((current) => current.includes(id) ? current.filter((selectedId) => selectedId !== id) : [...current, id])
  }

  function toggleVisibleUsers() {
    if (allVisibleSelected) {
      setSelectedIds((current) => current.filter((id) => !visibleUsers.some((user) => user.id === id)))
    } else {
      setSelectedIds((current) => [...new Set([...current, ...visibleUsers.map((user) => user.id)])])
    }
  }

  function suspendSelected() {
    if (!selectedIds.length) {
      setNotice('Select at least one user first.')
      return
    }
    setNotice('Suspension is not saved to the database yet. Add a backend status field and protected API to persist this action.')
  }

  function exportSelected() {
    const rows = users.filter((user) => selectedIds.length ? selectedIds.includes(user.id) : filteredUsers.some((item) => item.id === user.id))
    if (!rows.length) {
      setNotice('No users available to export.')
      return
    }
    const csvCell = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`
    const csv = [
      ['Name', 'Email', 'Role', 'Joined', 'Last Active', 'Status'].join(','),
      ...rows.map((user) => [user.name, user.email, user.role, user.joined, user.lastActive, user.status].map(csvCell).join(',')),
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

  return (
    <div className="min-w-0 space-y-6 text-slate-900">
      <header>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Users</h1>
          <span className="rounded-full bg-emerald-200 px-3 py-1 text-xs font-semibold text-emerald-900">{users.length.toLocaleString()} Total</span>
        </div>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">Manage, verify, and inspect student, agency, and institutional administrator accounts.</p>
      </header>

      {loading && <p className="text-sm text-slate-600">Loading registered users...</p>}
      {loadError && <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">{loadError}</div>}
      {notice && (
        <div role="status" className="flex items-start justify-between gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          <span>{notice}</span>
          <button type="button" onClick={() => setNotice('')} aria-label="Dismiss notification" className="shrink-0 rounded p-0.5 hover:bg-emerald-100"><X size={16} /></button>
        </div>
      )}

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={UsersIcon} label="Total Users" value={users.length.toLocaleString()} note="Registered accounts" iconClass="bg-emerald-100 text-emerald-800" />
        <StatCard icon={UserPlus} label="New This Week" value={newUsersCount} note="Recent signups" iconClass="bg-blue-100 text-blue-800" />
        <StatCard icon={Building2} label="Agency Accounts" value={agencyCount} note="Registered" iconClass="bg-indigo-100 text-indigo-800" />
        <StatCard icon={ShieldCheck} label="Active Accounts" value={activeCount} note="Current status" iconClass="bg-emerald-100 text-emerald-800" />
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-wrap gap-2">
            {ROLE_FILTERS.map((role) => {
              const count = role === 'All Users' ? users.length : users.filter((user) => user.role === role).length
              return (
                <button key={role} type="button" onClick={() => { setRoleFilter(role); setPage(1) }} className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${roleFilter === role ? 'border-[#064E32] bg-[#064E32] text-white' : 'border-slate-200 bg-white text-slate-700 hover:bg-emerald-50'}`}>
                  {role === 'All Users' ? role : `${role}s`} ({count})
                </button>
              )
            })}
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <label className="relative min-w-0 flex-1 sm:min-w-56">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input type="search" value={search} onChange={(event) => { setSearch(event.target.value); setPage(1) }} placeholder="Search by name or email..." className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100" />
            </label>
            <select value={statusFilter} onChange={(event) => { setStatusFilter(event.target.value); setPage(1) }} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-emerald-700" aria-label="Filter by account status">
              <option>All Status</option><option>Active</option><option>Suspended</option>
            </select>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" onClick={suspendSelected} className="inline-flex items-center gap-2 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100"><Ban size={15} />Suspend Selected ({selectedIds.length})</button>
          <button type="button" onClick={exportSelected} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">Export {selectedIds.length ? 'Selected' : 'Filtered'}</button>
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] border-collapse text-left">
            <thead className="bg-[#EEF3FF] text-xs uppercase tracking-wider text-slate-700">
              <tr>
                <th className="w-12 px-5 py-4"><input type="checkbox" checked={allVisibleSelected} onChange={toggleVisibleUsers} aria-label="Select visible users" className="h-4 w-4 accent-[#0B603A]" /></th>
                <th className="px-4 py-4 font-bold">User</th><th className="px-4 py-4 font-bold">Role</th><th className="px-4 py-4 font-bold">Joined Date</th><th className="px-4 py-4 font-bold">Last Active</th><th className="px-4 py-4 font-bold">Status</th><th className="px-4 py-4 font-bold">Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {visibleUsers.map((user) => (
                <tr key={user.id} className={`transition hover:bg-emerald-50/60 ${selectedIds.includes(user.id) ? 'bg-emerald-50' : 'bg-white'}`}>
                  <td className="px-5 py-4"><input type="checkbox" checked={selectedIds.includes(user.id)} onChange={() => toggleUser(user.id)} aria-label={`Select ${user.name}`} className="h-4 w-4 accent-[#0B603A]" /></td>
                  <td className="px-4 py-4"><div className="flex items-center gap-3"><div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${user.color || 'bg-blue-100 text-blue-800'}`}>{user.initials || getInitials(user.name)}</div><div className="min-w-0"><p className="whitespace-nowrap text-sm font-semibold text-slate-900">{user.name}</p><p className="mt-0.5 text-xs text-slate-500">{user.email}</p></div></div></td>
                  <td className="px-4 py-4"><RoleBadge role={user.role} /></td>
                  <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600">{user.joined || formatJoinedDate(user.createdAt)}</td>
                  <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600">{user.lastActive || 'Not available'}</td>
                  <td className="px-4 py-4"><StatusBadge status={user.status || 'Active'} /></td>
                  <td className="px-4 py-4"><button type="button" onClick={() => setActiveUser(user)} className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#075D3A] underline-offset-4 hover:underline"><Eye size={15} />Inspect</button></td>
                </tr>
              ))}
              {!loading && !loadError && visibleUsers.length === 0 && <tr><td colSpan={7} className="px-6 py-16 text-center text-sm text-slate-500"><UsersIcon className="mx-auto mb-3 text-slate-300" size={32} />No users match your search or filters.</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col gap-3 border-t border-slate-100 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-600">Showing <span className="font-semibold text-slate-900">{filteredUsers.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filteredUsers.length)}</span> of <span className="font-semibold">{filteredUsers.length}</span> users</p>
          <div className="flex items-center gap-2">
            <button type="button" disabled={page === 1} onClick={() => setPage((current) => Math.max(1, current - 1))} className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40" aria-label="Previous page"><ChevronLeft size={17} /></button>
            <span className="rounded-lg bg-[#064E32] px-3.5 py-2 text-sm font-semibold text-white">{page}</span>
            <button type="button" disabled={page >= totalPages} onClick={() => setPage((current) => Math.min(totalPages, current + 1))} className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40" aria-label="Next page"><ChevronRight size={17} /></button>
          </div>
        </div>
      </section>

      {activeUser && (
        <div className="fixed inset-0 z-50">
          <button type="button" aria-label="Close user profile audit" onClick={() => setActiveUser(null)} className="absolute inset-0 bg-slate-950/30" />
          <aside className="absolute inset-y-0 right-0 flex w-full max-w-[460px] flex-col bg-white shadow-2xl">
            <header className="flex items-start justify-between border-b border-slate-100 bg-[#F8FAFF] px-5 py-5">
              <div className="flex items-center gap-3"><ClipboardList size={20} className="text-[#075D3A]" /><div><h2 className="text-lg font-bold text-slate-900">User Profile Audit</h2><p className="mt-0.5 text-xs text-slate-500">Account activity and security</p></div></div>
              <button type="button" onClick={() => setActiveUser(null)} aria-label="Close" className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-200"><X size={19} /></button>
            </header>
            <div className="flex-1 space-y-5 overflow-y-auto p-5">
              <section className="rounded-2xl bg-[#FAFCFF] p-5 text-center">
                <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold ring-4 ring-white ${activeUser.color || 'bg-blue-100 text-blue-800'}`}>{activeUser.initials || getInitials(activeUser.name)}</div>
                <h3 className="mt-3 text-lg font-bold text-slate-900">{activeUser.name}</h3><p className="mt-1 break-all text-sm text-slate-600">{activeUser.email}</p>
                <div className="mt-3 flex flex-wrap items-center justify-center gap-2"><RoleBadge role={activeUser.role} /><span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-900"><Clock3 size={13} />Verification not configured</span></div>
              </section>
              <section className="grid grid-cols-3 gap-2.5">
                {[{ value: activeUser.searches ?? 0, label: 'Searches' }, { value: activeUser.agencies ?? 0, label: 'Agencies' }, { value: activeUser.scamFlags ?? 0, label: 'Scam Flags' }].map((metric) => <div key={metric.label} className="rounded-xl bg-[#EEF3FF] px-2 py-4 text-center"><p className="text-2xl font-bold text-slate-900">{metric.value}</p><p className="mt-1 text-xs text-slate-600">{metric.label}</p></div>)}
              </section>
              <section><div className="mb-3 flex items-center justify-between gap-2"><h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">Recent Platform Events</h3><span className="text-xs font-semibold text-slate-500">Not connected</span></div><div className="rounded-xl bg-[#F7F9FD] px-4 py-8 text-center"><Activity className="mx-auto mb-2 text-slate-400" size={25} /><p className="text-sm font-medium text-slate-700">No activity log available</p><p className="mt-1 text-xs text-slate-500">Activity history requires an audit-log table in the backend.</p></div></section>
              <section className="space-y-3 rounded-xl bg-[#F3F7FF] p-4">
                <div className="flex items-center justify-between gap-3 text-xs"><span className="text-slate-600">Account Security State</span><span className="text-right font-semibold text-emerald-800">{activeUser.status || 'Active'}</span></div>
                <div className="flex items-center justify-between gap-3 text-xs"><span className="text-slate-600">Email Verification</span><span className="font-medium text-slate-800">Not configured</span></div>
                <div className="flex items-center justify-between gap-3 text-xs"><span className="text-slate-600">Account Role</span><span className="font-medium text-slate-800">{activeUser.role}</span></div>
                <div className="flex items-center justify-between gap-3 text-xs"><span className="text-slate-600">Registered</span><span className="text-right font-medium text-slate-800">{activeUser.joined || formatJoinedDate(activeUser.createdAt)}</span></div>
              </section>
            </div>
            <footer className="grid grid-cols-2 gap-2 border-t border-slate-100 bg-white p-4">
              <a href={`mailto:${activeUser.email}`} className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-2 py-3 text-xs font-semibold text-slate-700 hover:bg-slate-50"><Mail size={14} />Email</a>
              <button type="button" onClick={() => { setNotice('Suspension is only a UI feature right now. A backend status field and API are needed to save it.'); setActiveUser(null) }} className="inline-flex items-center justify-center gap-1 rounded-lg bg-[#064E32] px-2 py-3 text-xs font-semibold text-white hover:bg-[#043D27]"><ClipboardList size={14} />Full Audit</button>
            </footer>
          </aside>
        </div>
      )}
    </div>
  )
}
