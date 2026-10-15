
import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  FileCheck,
  Building2,
  Users,
  ShieldAlert,
  Globe,
  FileText,
  BookOpen,
  GraduationCap,
  Award,
  HeartHandshake,
  BarChart3,
  Bell,
  UserCog,
  ClipboardList,
  Settings,
  LogOut,
} from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/admin', icon: LayoutDashboard, end: true },
  { label: 'Agency Verification', path: '/admin/agency-verification', icon: FileCheck, badge: 12 },
  { label: 'Agencies', path: '/admin/agencies', icon: Building2 },
  { label: 'Users', path: '/admin/users', icon: Users },
  { label: 'Scam Reports', path: '/admin/scam-reports', icon: ShieldAlert, badge: 8 },
  { label: 'Countries', path: '/admin/countries', icon: Globe },
  { label: 'Visas', path: '/admin/visas', icon: FileText },
  { label: 'Courses', path: '/admin/courses', icon: BookOpen },
  { label: 'Universities', path: '/admin/universities', icon: GraduationCap },
  { label: 'Scholarships', path: '/admin/scholarships', icon: Award },
  { label: 'Success Stories', path: '/admin/stories', icon: HeartHandshake },
  { label: 'Analytics & Reports', path: '/admin/analytics', icon: BarChart3 },
  { label: 'Notifications', path: '/admin/notifications', icon: Bell },
  { label: 'Admin Users & Roles', path: '/admin/admin-users', icon: UserCog },
  { label: 'Audit Logs', path: '/admin/audit-logs', icon: ClipboardList },
  { label: 'Settings', path: '/admin/settings', icon: Settings },
]

export default function AdminSidebar() {
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    navigate('/login', { replace: true })
  }

  return (
    <aside className="flex h-full min-h-0 w-[260px] shrink-0 flex-col overflow-hidden bg-[#004B38] text-white">

      {/* Header */}
      <div className="shrink-0 border-b border-white/10 bg-[#004B38] px-6 py-5">
        <h1 className="text-2xl font-bold tracking-tight">
          Agency
        </h1>
        <p className="mt-1 text-sm text-emerald-200">
          Admin Dashboard
        </p>
      </div>

      {/* Scrollable menu */}
      <nav
        aria-label="Admin navigation"
        className="
          admin-sidebar-scroll
          min-h-0 flex-1 overflow-x-hidden overflow-y-auto
          bg-[#004B38] px-2 py-3
          [scrollbar-width:thin]
          [scrollbar-color:rgba(255,255,255,0.35)_#004B38]
          [&::-webkit-scrollbar]:w-1.5
          [&::-webkit-scrollbar-track]:bg-[#004B38]
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-white/30
          [&::-webkit-scrollbar-thumb:hover]:bg-white/50
        "
      >
        <div className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `flex min-h-[46px] w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors duration-150 ${
                    isActive
                      ? 'bg-[#078566] text-white'
                      : 'text-white/95 hover:bg-white/10'
                  }`
                }
              >
                <Icon
                  size={21}
                  strokeWidth={1.9}
                  className="shrink-0"
                />

                <span className="min-w-0 flex-1 leading-5">
                  {item.label}
                </span>

                {item.badge !== undefined && (
                  <span className="flex h-6 min-w-6 shrink-0 items-center justify-center rounded-full bg-rose-500 px-2 text-xs font-bold text-white">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            )
          })}
        </div>
      </nav>

      {/* Fixed bottom section */}
      <div className="relative z-10 shrink-0 border-t border-white/10 bg-[#004B38] px-3 py-4">
        <div className="flex items-center gap-3 px-2">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#078566] text-lg font-bold text-white">
            AD
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">
              Admin User
            </p>
            <p className="text-sm text-emerald-200">
              Super Admin
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="mt-3 flex w-full items-center gap-3 rounded-lg px-3 py-3 text-white transition-colors hover:bg-white/10"
        >
          <LogOut size={21} strokeWidth={1.9} />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  )
}
