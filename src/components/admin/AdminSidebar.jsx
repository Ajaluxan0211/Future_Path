
import { NavLink } from 'react-router-dom'
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
  ChartNoAxesCombined,
  Bell,
  UserCog,
  ClipboardList,
  Settings,
  LogOut,
  PanelLeftClose,
} from 'lucide-react'

const menuItems = [
  { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { label: 'Agency Verification', path: '/admin/agency-verification', icon: FileCheck, badge: '12' },
  { label: 'Agencies', path: '/admin/agencies', icon: Building2 },
  { label: 'Users', path: '/admin/users', icon: Users },
  { label: 'Scam Reports', path: '/admin/scam-reports', icon: ShieldAlert, badge: '8' },
  { label: 'Countries', path: '/admin/countries', icon: Globe },
  { label: 'Visas', path: '/admin/visas', icon: FileText },
  { label: 'Courses', path: '/admin/courses', icon: BookOpen },
  { label: 'Universities', path: '/admin/universities', icon: GraduationCap },
  { label: 'Scholarships', path: '/admin/scholarships', icon: Award },
  { label: 'Success Stories', path: '/admin/stories', icon: HeartHandshake },
  { label: 'Analytics & Reports', path: '/admin/analytics', icon: ChartNoAxesCombined },
  { label: 'Notifications', path: '/admin/notifications', icon: Bell, badge: '5' },
  { label: 'Admin Users & Roles', path: '/admin/admin-users', icon: UserCog },
  { label: 'Audit Logs', path: '/admin/audit-logs', icon: ClipboardList },
  { label: 'Settings', path: '/admin/settings', icon: Settings },
]

export default function AdminSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-56 flex-col bg-[#003F2D] text-white">
      <div className="border-b border-white/10 px-6 py-5">
        <NavLink to="/admin" className="text-2xl font-bold tracking-tight">
          Agency
        </NavLink>
        <p className="mt-1 text-sm text-emerald-200">Admin Dashboard</p>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-4">
        {menuItems.map(({ label, path, icon: Icon, badge }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/admin'}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] transition ${
                isActive
                  ? 'bg-emerald-700 font-semibold text-white shadow-sm'
                  : 'text-emerald-50 hover:bg-white/10'
              }`
            }
          >
            <Icon size={18} className="shrink-0" />
            <span className="min-w-0 flex-1">{label}</span>
            {badge && (
              <span className="rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold">
                {badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-white/10 p-3">
        <div className="mb-3 flex items-center gap-3 px-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-700 font-semibold">
            AD
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold">Admin User</p>
            <p className="text-xs text-emerald-200">Super Admin</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            window.location.href = '/admin/login'
          }}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-emerald-100 hover:bg-white/10"
        >
          <LogOut size={17} />
          Logout
        </button>
      </div>
    </aside>
  )
}
