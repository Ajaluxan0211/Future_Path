
import { useMemo, useState } from 'react'
import {
  Shield,
  UserRoundCheck,
  Clock,
  UserLock,
  ShieldCheck,
  ClipboardCheck,
  BookOpen,
  Gavel,
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  X,
  Users,
  Pencil,
  Mail,
} from 'lucide-react'

const INITIAL_ADMINS = [
  { id: 1, name: 'Admin User', email: 'admin@agency.com', initials: 'AD', role: 'Super Admin', permissions: 'Full access', lastActive: '30 min ago', status: 'Active', color: 'green' },
  { id: 2, name: 'Raj Jayawardena', email: 'raj@agency.com', initials: 'RJ', role: 'Super Admin', permissions: 'Full access', lastActive: '2 hours ago', status: 'Active', color: 'green' },
  { id: 3, name: 'Kavya Perera', email: 'kavya@agency.com', initials: 'KP', role: 'Agency Verifier', permissions: 'Agency only', lastActive: '1 hour ago', status: 'Active', color: 'rose' },
  { id: 4, name: 'Dev Mendis', email: 'dev@agency.com', initials: 'DM', role: 'Agency Verifier', permissions: 'Agency only', lastActive: '3 hours ago', status: 'Active', color: 'mint' },
  { id: 5, name: 'Sara Fernando', email: 'sara@agency.com', initials: 'SF', role: 'Agency Verifier', permissions: 'Agency only', lastActive: 'Yesterday', status: 'Active', color: 'blue' },
  { id: 6, name: 'Nimal Wickrama', email: 'nimal@agency.com', initials: 'NW', role: 'Scam Investigator', permissions: 'Reports only', lastActive: '4 hours ago', status: 'Active', color: 'coral' },
  { id: 7, name: 'Priya Banda', email: 'priya@agency.com', initials: 'PB', role: 'Scam Investigator', permissions: 'Reports only', lastActive: '2 days ago', status: 'Active', color: 'maroon' },
  { id: 8, name: 'Tom Lanka', email: 'tom@agency.com', initials: 'TL', role: 'Content Moderator', permissions: 'Content only', lastActive: '1 week ago', status: 'Inactive', color: 'blue' },
  { id: 9, name: 'Ex Admin', email: 'ex@agency.com', initials: 'XA', role: 'Agency Verifier', permissions: 'Agency only', lastActive: '3 weeks ago', status: 'Suspended', color: 'blue' },
]

const INITIAL_ROLES = [
  {
    name: 'Super Admin',
    subtitle: 'Tier 0 Authority',
    members: 2,
    description: 'Full platform access. Can manage all features, users, agency policies and root admin accounts.',
    permissions: ['Verify agencies', 'Manage all users', 'Publish/remove content', 'Manage admin accounts', 'View all analytics', 'System settings access'],
    denied: [],
    footer: 'Unrestricted privilege level',
    icon: ShieldCheck,
    theme: 'green',
  },
  {
    name: 'Agency Verifier',
    subtitle: 'Compliance & Onboarding',
    members: 3,
    description: 'Reviews agency registration applications, approves/rejects institutional credentials and compliance documents.',
    permissions: ['Review agency documents', 'Approve or reject agencies', 'View agency profiles', 'Send document requests'],
    denied: ['Manage other admins', 'System settings'],
    footer: 'Application queue access',
    icon: ClipboardCheck,
    theme: 'blue',
  },
  {
    name: 'Scam Investigator',
    subtitle: 'Trust & Safety',
    members: 2,
    description: 'Investigates community scam reports, issues fraud flags and executes enforcement interventions.',
    permissions: ['View scam reports', 'Investigate & resolve reports', 'Suspend agencies', 'Publish platform warnings'],
    denied: ['Approve agencies', 'Manage admin accounts'],
    footer: 'Enforcement authority',
    icon: Gavel,
    theme: 'coral',
  },
  {
    name: 'Content Moderator',
    subtitle: 'Editorial & Catalog',
    members: 2,
    description: 'Manages global courses, university directories, scholarship listings and student success narratives.',
    permissions: ['Add/edit courses', 'Manage universities', 'Manage scholarships', 'Approve success stories'],
    denied: ['Manage users or agencies', 'Access admin accounts'],
    footer: 'CMS publish rights',
    icon: BookOpen,
    theme: 'blue',
  },
]

const ROLE_STYLES = {
  'Super Admin': 'bg-blue-100 text-slate-800',
  'Agency Verifier': 'bg-blue-100 text-slate-800',
  'Scam Investigator': 'bg-red-100 text-red-800',
  'Content Moderator': 'bg-blue-100 text-slate-800',
}

const AVATAR_STYLES = {
  green: 'bg-emerald-800 text-white',
  rose: 'bg-rose-200 text-rose-900',
  mint: 'bg-emerald-200 text-emerald-900',
  blue: 'bg-blue-200 text-blue-900',
  coral: 'bg-red-200 text-red-900',
  maroon: 'bg-red-950 text-white',
}

function SummaryCard({ title, value, note, icon: Icon, theme }) {
  const themes = {
    green: 'bg-emerald-100 text-emerald-950',
    blue: 'bg-blue-100 text-emerald-950',
    red: 'bg-red-100 text-red-700',
  }

  return (
    <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-xs font-semibold text-slate-800">{title}</h3>
        <span className={`rounded-lg p-2 ${themes[theme]}`}>
          <Icon size={18} />
        </span>
      </div>

      <p className={`mt-2 text-4xl font-semibold leading-none ${
        theme === 'red' ? 'text-red-800' : 'text-emerald-950'
      }`}>
        {value}
      </p>

      <p className={`mt-3 text-[11px] ${
        theme === 'red' ? 'text-red-700' : 'text-emerald-800'
      }`}>
        <span className="mr-1">●</span>{note}
      </p>
    </div>
  )
}

function RoleCard({ role, onEdit }) {
  const Icon = role.icon

  const iconTheme = role.theme === 'green'
    ? 'bg-emerald-900 text-white'
    : role.theme === 'coral'
      ? 'bg-red-100 text-red-800'
      : 'bg-blue-100 text-emerald-950'

  return (
    <article className="flex min-h-[215px] flex-col rounded-xl bg-[#F3F6FF] p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${iconTheme}`}>
            <Icon size={17} />
          </span>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">{role.name}</h3>
            <p className="mt-1 text-[11px] text-slate-500">{role.subtitle}</p>
          </div>
        </div>

        <span className="shrink-0 rounded-full bg-blue-100 px-2.5 py-1 text-[10px] text-slate-700">
          {role.members} members
        </span>
      </div>

      <p className="mt-4 text-xs leading-5 text-slate-700">
        {role.description}
      </p>

      <div className="mt-3 grid grid-cols-1 gap-x-3 gap-y-2 sm:grid-cols-2">
        {role.permissions.map((permission) => (
          <p key={permission} className="flex items-start gap-1.5 text-[10px] leading-4 text-emerald-800">
            <CheckCircle2 size={12} className="mt-0.5 shrink-0" />
            {permission}
          </p>
        ))}

        {role.denied.map((permission) => (
          <p key={permission} className="flex items-start gap-1.5 text-[10px] leading-4 text-red-700">
            <XCircle size={12} className="mt-0.5 shrink-0" />
            {permission}
          </p>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between gap-2 pt-4">
        <span className="text-[10px] text-slate-500">{role.footer}</span>
        <button
          type="button"
          onClick={() => onEdit(role)}
          className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-950 hover:text-emerald-700"
        >
          Edit Role <ChevronRight size={14} />
        </button>
      </div>
    </article>
  )
}

function AdminModal({ mode, admin, onClose, onSave }) {
  const [name, setName] = useState(admin?.name || '')
  const [email, setEmail] = useState(admin?.email || '')
  const [role, setRole] = useState(admin?.role || 'Agency Verifier')

  if (!mode) return null

  const isRole = mode === 'role'
  const isEdit = mode === 'edit'

  function submit(event) {
    event.preventDefault()
    onSave({ name, email, role })
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">
            {isRole ? 'Add Role' : isEdit ? 'Edit Admin' : 'Invite Admin'}
          </h2>
          <button type="button" onClick={onClose} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={submit} className="space-y-4">
          {!isRole && (
            <>
              <label className="block text-sm font-medium text-slate-700">
                Full name
                <input
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-emerald-800"
                  placeholder="Enter admin name"
                />
              </label>

              <label className="block text-sm font-medium text-slate-700">
                Email address
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-emerald-800"
                  placeholder="admin@example.com"
                />
              </label>
            </>
          )}

          <label className="block text-sm font-medium text-slate-700">
            {isRole ? 'Role name' : 'Admin role'}
            <select
              value={role}
              onChange={(event) => setRole(event.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-emerald-800"
            >
              <option>Super Admin</option>
              <option>Agency Verifier</option>
              <option>Scam Investigator</option>
              <option>Content Moderator</option>
            </select>
          </label>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              Cancel
            </button>
            <button type="submit" className="rounded-lg bg-[#075A37] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#06472D]">
              {isRole ? 'Save Role' : isEdit ? 'Save Changes' : 'Send Invitation'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function AdminUsersRoles() {
  const [admins, setAdmins] = useState(INITIAL_ADMINS)
  const [roles, setRoles] = useState(INITIAL_ROLES)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState([])
  const [modal, setModal] = useState(null)
  const [notice, setNotice] = useState('')

  const activeCount = admins.filter((admin) => admin.status === 'Active').length
  const suspendedCount = admins.filter((admin) => admin.status === 'Suspended').length
  const pendingCount = admins.filter((admin) => admin.status === 'Pending').length

  const filteredAdmins = useMemo(() => {
    const query = search.toLowerCase().trim()

    if (!query) return admins

    return admins.filter((admin) =>
      [admin.name, admin.email, admin.role, admin.status]
        .some((value) => value.toLowerCase().includes(query)),
    )
  }, [admins, search])

  function showNotice(message) {
    setNotice(message)
    window.setTimeout(() => setNotice(''), 3000)
  }

  function toggleSelected(id) {
    setSelected((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    )
  }

  function toggleAll() {
    setSelected((current) =>
      current.length === filteredAdmins.length
        ? []
        : filteredAdmins.map((admin) => admin.id),
    )
  }

  function saveModal(values) {
    if (modal?.mode === 'edit') {
      setAdmins((current) =>
        current.map((admin) =>
          admin.id === modal.admin.id
            ? { ...admin, name: values.name, email: values.email, role: values.role }
            : admin,
        ),
      )
      showNotice('Admin details updated.')
    } else if (modal?.mode === 'invite') {
      const initials = values.name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()

      setAdmins((current) => [
        ...current,
        {
          id: Math.max(0, ...current.map((admin) => admin.id)) + 1,
          name: values.name,
          email: values.email,
          initials,
          role: values.role,
          permissions: values.role === 'Super Admin' ? 'Full access' : values.role === 'Agency Verifier' ? 'Agency only' : values.role === 'Scam Investigator' ? 'Reports only' : 'Content only',
          lastActive: 'Invitation sent',
          status: 'Pending',
          color: 'mint',
        },
      ])
      showNotice('Invitation added to the demo list.')
    } else {
      const roleName = values.role
      setRoles((current) => [
        ...current,
        {
          name: roleName,
          subtitle: 'Custom permissions',
          members: 0,
          description: 'Custom administrator role. Configure permissions according to your platform requirements.',
          permissions: ['View assigned sections'],
          denied: ['Access restricted sections'],
          footer: 'Custom access level',
          icon: Shield,
          theme: 'blue',
        },
      ])
      showNotice('Demo role added.')
    }

    setModal(null)
  }

  function changeStatus(admin, status) {
    setAdmins((current) =>
      current.map((item) => item.id === admin.id ? { ...item, status } : item),
    )
    showNotice(`${admin.name}: ${status.toLowerCase()}.`)
  }

  return (
    <div className="min-h-full bg-[#EEF3FF] p-4 text-slate-800 sm:p-5 lg:p-6">
      {/* Page heading */}
      <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-start gap-3">
          <span className="rounded-xl bg-white p-3 text-emerald-950 shadow-sm">
            <ShieldCheck size={22} />
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900">
                Admin Users &amp; Roles
              </h1>
              <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-emerald-800">
                Governed
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-600">
              Manage administrator accounts, security protocols, permissions and access control for the platform.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setModal({ mode: 'invite' })}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#075A37] px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#06472D]"
        >
          <Plus size={15} /> Invite Admin
        </button>
      </div>

      {/* Summary cards */}
      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Total Admins"
          value={admins.length}
          note={`${admins.filter((admin) => admin.role === 'Super Admin').length} Super Admins`}
          icon={Shield}
          theme="green"
        />
        <SummaryCard
          title="Active Admins"
          value={activeCount}
          note="Online now: 3"
          icon={UserRoundCheck}
          theme="blue"
        />
        <SummaryCard
          title="Pending Invitation"
          value={pendingCount}
          note="Awaiting acceptance"
          icon={Clock}
          theme="red"
        />
        <SummaryCard
          title="Suspended Admins"
          value={suspendedCount}
          note="Access revoked"
          icon={UserLock}
          theme="red"
        />
      </div>

      {/* Roles and permissions */}
      <section className="mb-5 rounded-xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5">
        <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Roles &amp; Permissions
            </h2>
            <p className="mt-1 text-xs text-slate-600">
              Define what each admin role can access and modify on the platform.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setModal({ mode: 'role' })}
            className="inline-flex items-center justify-center gap-2 self-start rounded-lg bg-[#EEF3FF] px-3 py-2.5 text-xs font-semibold text-emerald-950 hover:bg-blue-100 sm:self-auto"
          >
            <ShieldCheck size={14} /> + Add Role
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {roles.map((role, index) => (
            <RoleCard
              key={`${role.name}-${index}`}
              role={role}
              onEdit={(selectedRole) =>
                showNotice(`Selected role: ${selectedRole.name}. Connect role editing to your permissions API.`)
              }
            />
          ))}
        </div>
      </section>

      {/* Admin accounts table */}
      <section className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
        <div className="flex flex-col justify-between gap-3 p-4 sm:flex-row sm:items-center sm:p-5">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">Admin Accounts</h2>
            <span className="rounded-full bg-blue-100 px-2.5 py-1 text-[10px] text-slate-700">
              {admins.length} Registrations
            </span>
          </div>

          <div className="relative w-full sm:max-w-xs">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search admin..."
              className="w-full rounded-lg border border-slate-100 bg-[#F7F9FF] py-2.5 pl-9 pr-3 text-xs outline-none focus:border-emerald-800"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-left">
            <thead>
              <tr className="bg-[#EEF3FF] text-[10px] font-bold uppercase tracking-wide text-slate-800">
                <th className="w-10 px-4 py-3">
                  <input
                    type="checkbox"
                    aria-label="Select all admins"
                    checked={filteredAdmins.length > 0 && selected.length === filteredAdmins.length}
                    onChange={toggleAll}
                    className="accent-emerald-900"
                  />
                </th>
                <th className="px-3 py-3">Admin User</th>
                <th className="px-3 py-3">Role</th>
                <th className="px-3 py-3">Permissions</th>
                <th className="px-3 py-3">Last Active</th>
                <th className="px-3 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredAdmins.map((admin) => (
                <tr key={admin.id} className="text-xs hover:bg-slate-50/70">
                  <td className="px-4 py-3.5">
                    <input
                      type="checkbox"
                      aria-label={`Select ${admin.name}`}
                      checked={selected.includes(admin.id)}
                      onChange={() => toggleSelected(admin.id)}
                      className="accent-emerald-900"
                    />
                  </td>

                  <td className="px-3 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${AVATAR_STYLES[admin.color] || AVATAR_STYLES.green}`}>
                        {admin.initials}
                      </span>
                      <div>
                        <p className="font-semibold text-slate-900">{admin.name}</p>
                        <p className="mt-0.5 text-[10px] text-slate-500">{admin.email}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-3 py-3.5">
                    <span className={`inline-flex rounded-full px-2 py-1 text-[10px] ${ROLE_STYLES[admin.role] || 'bg-slate-100 text-slate-700'}`}>
                      {admin.role}
                    </span>
                  </td>

                  <td className="px-3 py-3.5 text-slate-600">{admin.permissions}</td>
                  <td className="px-3 py-3.5 whitespace-nowrap text-slate-600">{admin.lastActive}</td>

                  <td className="px-3 py-3.5">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] ${
                      admin.status === 'Active'
                        ? 'bg-emerald-200 text-emerald-900'
                        : admin.status === 'Suspended'
                          ? 'bg-red-100 text-red-800'
                          : admin.status === 'Pending'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-blue-100 text-slate-700'
                    }`}>
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {admin.status}
                    </span>
                  </td>

                  <td className="px-4 py-3.5">
                    <div className="flex items-center justify-end gap-2 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => setModal({ mode: 'edit', admin })}
                        className="font-semibold text-emerald-950 hover:text-emerald-700"
                      >
                        Edit
                      </button>

                      {admin.status === 'Suspended' ? (
                        <button
                          type="button"
                          onClick={() => changeStatus(admin, 'Active')}
                          className="border-l border-slate-200 pl-2 font-semibold text-emerald-800 hover:text-emerald-600"
                        >
                          Restore
                        </button>
                      ) : admin.status === 'Pending' ? (
                        <button
                          type="button"
                          onClick={() => changeStatus(admin, 'Active')}
                          className="border-l border-slate-200 pl-2 font-semibold text-emerald-800 hover:text-emerald-600"
                        >
                          Activate
                        </button>
                      ) : admin.id !== 1 ? (
                        <button
                          type="button"
                          onClick={() => changeStatus(admin, 'Suspended')}
                          className="border-l border-slate-200 pl-2 font-semibold text-red-700 hover:text-red-500"
                        >
                          Revoke
                        </button>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}

              {filteredAdmins.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-sm text-slate-500">
                    No admin accounts match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col justify-between gap-3 bg-[#F7F9FF] px-4 py-3 sm:flex-row sm:items-center">
          <p className="text-[10px] text-slate-600">
            Showing {filteredAdmins.length ? 1 : 0}–{filteredAdmins.length} of {filteredAdmins.length} admins
            {selected.length > 0 && ` · ${selected.length} selected`}
          </p>

          <div className="flex items-center justify-end gap-2 text-xs">
            <button type="button" disabled className="rounded p-1 text-slate-400 disabled:opacity-50" aria-label="Previous page">
              <ChevronLeft size={16} />
            </button>
            <span className="rounded-md bg-[#075A37] px-2.5 py-1.5 font-semibold text-white">1</span>
            <button type="button" disabled className="rounded p-1 text-slate-400 disabled:opacity-50" aria-label="Next page">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {notice && (
        <div className="fixed bottom-5 right-5 z-[110] flex max-w-sm items-center gap-2 rounded-xl bg-emerald-950 px-4 py-3 text-sm text-white shadow-xl">
          <CheckCircle2 size={17} />
          {notice}
          <button type="button" onClick={() => setNotice('')} className="ml-2" aria-label="Close message">
            <X size={15} />
          </button>
        </div>
      )}

      <AdminModal
        mode={modal?.mode}
        admin={modal?.admin}
        onClose={() => setModal(null)}
        onSave={saveModal}
      />
    </div>
  )
}
