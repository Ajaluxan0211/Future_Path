
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  UserRound,
  Settings,
  ShieldCheck,
  History,
  Bell,
  Moon,
  Keyboard,
  CircleHelp,
  ExternalLink,
  LogOut,
  ChevronDown,
  X,
  Clock,
  Sun,
} from 'lucide-react'

export default function AdminProfileMenu() {
  const [open, setOpen] = useState(false)
  const [showLogout, setShowLogout] = useState(false)

  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem('admin-dark-mode') === 'true'
  )

  const menuRef = useRef(null)
  const navigate = useNavigate()

  // Apply dark mode to the whole application and save preference.
  useEffect(() => {
    document.body.classList.toggle('admin-dark', darkMode)

    localStorage.setItem('admin-dark-mode', String(darkMode))
  }, [darkMode])

  // Close dropdown when clicking outside or pressing Escape.
  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setOpen(false)
      }
    }

    function handleEscape(event) {
      if (event.key === 'Escape') {
        setOpen(false)
        setShowLogout(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  function confirmLogout() {
    setShowLogout(false)
    setOpen(false)

    // If your application uses authentication, clear its actual
    // session/token here before navigating to the login page.

    navigate('/login')
  }

  function menuAction(path) {
    setOpen(false)
    navigate(path)
  }

  const menuItems = [
    {
      label: 'My Profile',
      icon: UserRound,
      path: '/admin/profile',
    },
    {
      label: 'Account Settings',
      icon: Settings,
      path: '/admin/settings',
    },
    {
      label: 'Security & 2FA',
      icon: ShieldCheck,
      path: '/admin/settings',
    },
    {
      label: 'My Activity Log',
      icon: History,
      path: '/admin/audit-logs',
    },
    {
      label: 'Notification Preferences',
      icon: Bell,
      path: '/admin/notifications',
    },
  ]

  const supportItems = [
    {
      label: 'Keyboard Shortcuts',
      icon: Keyboard,
      path: '/admin/settings',
    },
    {
      label: 'Help & Support',
      icon: CircleHelp,
      path: '/admin/settings',
    },
    {
      label: 'View Public Website',
      icon: ExternalLink,
      path: '/',
    },
  ]

  return (
    <>
      <div className="relative" ref={menuRef}>
        {/* Admin profile button */}
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label="Open admin profile menu"
          className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-slate-100"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-800">
            AD
          </span>

          <span className="hidden text-left sm:block">
            <span className="block text-sm font-semibold text-slate-900">
              Admin User
            </span>

            <span className="block text-xs text-slate-500">
              Super Admin
            </span>
          </span>

          <ChevronDown
            size={16}
            className={`hidden text-slate-500 transition sm:block ${
              open ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Profile dropdown */}
        {open && (
          <div className="admin-profile-menu absolute right-0 top-full z-[80] mt-2 flex max-h-[calc(100dvh-110px)] w-[min(350px,calc(100vw-24px))] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
            {/* Profile header */}
            <div className="shrink-0 bg-[#eef3ff] p-4">
              <div className="flex items-center gap-3">
                <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#006747] text-lg font-bold text-white">
                  AD

                  <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-400" />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-slate-900">
                    Admin User
                  </h3>

                  <p className="break-all text-xs text-slate-600">
                    admin@agency.com
                  </p>
                </div>

                <span className="shrink-0 rounded-full bg-blue-100 px-2 py-1 text-[9px] font-bold text-blue-900">
                  SUPER ADMIN
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between gap-2 rounded-lg bg-white/80 px-2.5 py-2 text-[11px]">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <Clock size={14} />
                  Last login: Today, 09:12 AM
                </span>

                <span className="flex shrink-0 items-center gap-1 font-semibold text-emerald-800">
                  <span className="h-2 w-2 rounded-full bg-emerald-700" />
                  Active
                </span>
              </div>
            </div>

            {/* Main menu - scrollable */}
            <div className="min-h-0 flex-1 overflow-y-auto p-2">
              {menuItems.map(({ label, icon: Icon, path }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => menuAction(path)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-slate-800 transition hover:bg-emerald-50"
                >
                  <Icon
                    size={18}
                    className="shrink-0 text-slate-500"
                  />

                  <span>{label}</span>

                  {label === 'Security & 2FA' && (
                    <span className="ml-auto rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-semibold text-emerald-800">
                      ON
                    </span>
                  )}
                </button>
              ))}

              <div className="mx-2 my-2 border-t border-slate-200" />

              {/* Dark mode switch */}
              <button
                type="button"
                role="switch"
                aria-checked={darkMode}
                onClick={() => setDarkMode((value) => !value)}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-slate-800 transition hover:bg-slate-50"
              >
                {darkMode ? (
                  <Sun
                    size={18}
                    className="shrink-0 text-slate-500"
                  />
                ) : (
                  <Moon
                    size={18}
                    className="shrink-0 text-slate-500"
                  />
                )}

                <span>
                  {darkMode ? 'Light Mode' : 'Dark Mode'}
                </span>

                <span
                  className={`ml-auto flex h-5 w-10 shrink-0 items-center rounded-full p-1 transition ${
                    darkMode ? 'bg-emerald-700' : 'bg-blue-100'
                  }`}
                >
                  <span
                    className={`h-3 w-3 rounded-full bg-white shadow transition ${
                      darkMode ? 'translate-x-5' : ''
                    }`}
                  />
                </span>
              </button>

              {supportItems.map(({ label, icon: Icon, path }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => menuAction(path)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-slate-800 transition hover:bg-slate-50"
                >
                  <Icon
                    size={18}
                    className="shrink-0 text-slate-500"
                  />

                  <span>{label}</span>
                </button>
              ))}
            </div>

            {/* Fixed logout section */}
            <div className="shrink-0 border-t border-slate-200 bg-white p-2">
              <button
                type="button"
                onClick={() => {
                  setOpen(false)
                  setShowLogout(true)
                }}
                className="flex w-full items-center gap-3 rounded-xl bg-red-100 px-3 py-2.5 text-sm font-semibold text-red-800 transition hover:bg-red-200"
              >
                <LogOut size={18} />
                Log out
              </button>
            </div>

            {/* Footer */}
            <div className="shrink-0 bg-[#eef3ff] py-2 text-center text-[9px] font-bold tracking-[0.12em] text-slate-700">
              AGENCY ADMIN V2.4.1
            </div>
          </div>
        )}
      </div>

      {/* Logout confirmation modal */}
      {showLogout && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-title"
            className="w-full max-w-[480px] rounded-2xl bg-white p-6 shadow-2xl sm:p-7"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-700">
                <LogOut size={26} />
              </div>

              <div className="min-w-0 flex-1">
                <h2
                  id="logout-title"
                  className="text-lg font-bold text-slate-900"
                >
                  Log out of Agency Admin?
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  You will need to sign in again to access the admin
                  authority dashboard.
                </p>

                <p className="mt-2 text-xs leading-5 text-slate-400">
                  Your current session will end when you confirm logout.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowLogout(false)}
                aria-label="Close logout confirmation"
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowLogout(false)}
                className="rounded-xl bg-[#e9efff] px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-blue-100"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={confirmLogout}
                className="flex items-center gap-2 rounded-xl bg-red-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-800"
              >
                <LogOut size={16} />
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
