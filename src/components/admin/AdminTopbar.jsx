
import { useState } from 'react'
import { Search, Bell, Menu, ChevronDown } from 'lucide-react'
import { useLocation } from 'react-router-dom'

const pageNames = {
  '/admin': 'Dashboard',
  '/admin/agency-verification': 'Agency Verification',
  '/admin/agencies': 'Agencies',
  '/admin/users': 'Users',
  '/admin/scam-reports': 'Scam Reports',
  '/admin/countries': 'Countries',
  '/admin/visas': 'Visas',
  '/admin/courses': 'Courses',
  '/admin/universities': 'Universities',
  '/admin/scholarships': 'Scholarships',
  '/admin/stories': 'Success Stories',
  '/admin/analytics': 'Analytics & Reports',
  '/admin/notifications': 'Notifications',
  '/admin/admin-users': 'Admin Users & Roles',
  '/admin/audit-logs': 'Audit Logs',
  '/admin/settings': 'Settings',
}

export default function AdminTopbar({ onMenuClick }) {
  const { pathname } = useLocation()
  const [search, setSearch] = useState('')
  const [showProfile, setShowProfile] = useState(false)

  const pageTitle = pageNames[pathname] || 'Admin Dashboard'

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 md:px-6">
      <div className="flex min-w-0 items-center gap-4">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu size={21} />
        </button>

        <div className="hidden min-w-0 sm:block">
          <p className="text-xs text-slate-400">Agency / Admin</p>
          <h1 className="truncate text-sm font-semibold text-slate-800">
            {pageTitle}
          </h1>
        </div>

        <form
          className="flex w-44 items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 md:w-72"
          onSubmit={(event) => {
            event.preventDefault()
            if (search.trim()) {
              window.alert(`Search is ready to connect: ${search}`)
            }
          }}
        >
          <Search size={16} className="shrink-0 text-slate-400" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search anything..."
            className="w-full bg-transparent text-xs outline-none placeholder:text-slate-400"
            aria-label="Search"
          />
        </form>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <button
          type="button"
          onClick={() => window.location.href = '/admin/notifications'}
          className="relative rounded-lg p-2 text-slate-600 hover:bg-slate-100"
          aria-label="Notifications"
        >
          <Bell size={20} />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="relative border-l border-slate-200 pl-3">
          <button
            type="button"
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2 rounded-lg p-1 hover:bg-slate-50"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#075C3B] text-sm font-bold text-white">
              AD
            </span>
            <span className="hidden text-left sm:block">
              <span className="block text-xs font-semibold text-slate-800">
                Admin User
              </span>
              <span className="block text-[11px] text-slate-500">
                Super Admin
              </span>
            </span>
            <ChevronDown size={14} className="hidden text-slate-500 sm:block" />
          </button>

          {showProfile && (
            <div className="absolute right-0 top-12 w-40 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
              <button
                type="button"
                onClick={() => window.location.href = '/admin/settings'}
                className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-50"
              >
                Settings
              </button>
              <button
                type="button"
                onClick={() => window.location.href = '/admin/login'}
                className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
