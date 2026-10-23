import { useState } from 'react'
import { Search, ChevronDown } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import NotificationBell from './NotificationBell'

export default function AdminTopbar({ onMenuClick }) {
  const location = useLocation()
  const [search, setSearch] = useState('')

  const currentPage =
    location.pathname === '/admin'
      ? 'Dashboard'
      : location.pathname
          .split('/')
          .filter(Boolean)
          .pop()
          ?.replaceAll('-', ' ')
          .replace(/\b\w/g, (char) => char.toUpperCase()) ||
        'Dashboard'

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <header className="sticky top-0 z-20 flex min-h-[76px] items-center justify-between gap-4 border-b border-slate-200 bg-white px-5 md:px-7">

      {/* LEFT SIDE: Menu, page title and search */}
      <div className="flex min-w-0 items-center gap-4">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Toggle sidebar"
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
        >
          <span className="text-xl">☰</span>
        </button>

        <div className="min-w-[105px]">
          <p className="text-xs text-slate-400">
            FuturePath / Admin
          </p>

          <h2 className="truncate text-sm font-semibold text-slate-900">
            {currentPage}
          </h2>
        </div>

        <label className="hidden w-56 items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 md:flex lg:w-[300px]">
          <Search
            size={18}
            className="shrink-0 text-slate-400"
          />

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search anything..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
        </label>
      </div>

      {/* RIGHT SIDE: Date, notification bell and admin profile */}
      <div className="flex shrink-0 items-center gap-3 md:gap-5">

        {/* Current date */}
        <p className="hidden text-xs text-slate-500 xl:block">
          {today}
        </p>

        {/* Notification bell — click to open the notification panel */}
        <NotificationBell />

        {/* Divider */}
        <div className="hidden h-9 border-l border-slate-200 sm:block" />

        {/* Admin profile */}
        <button
          type="button"
          className="flex items-center gap-2 text-left"
          aria-label="Admin user profile"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#006747] text-sm font-bold text-white">
            AD
          </span>

          <span className="hidden sm:block">
            <span className="block text-sm font-semibold text-slate-900">
              Admin User
            </span>

            <span className="block text-xs text-slate-500">
              Super Admin
            </span>
          </span>

          <ChevronDown
            size={16}
            className="hidden text-slate-500 sm:block"
          />
        </button>
      </div>
    </header>
  )
}
