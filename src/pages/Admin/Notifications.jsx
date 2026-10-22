
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Bell,
  CheckCheck,
  Settings,
  AlertTriangle,
  ClipboardList,
  CalendarDays,
  Archive,
  Building2,
  Users,
  ShieldCheck,
  GraduationCap,
  FileText,
  Clock,
  TrendingUp,
  UserPlus,
  ChevronLeft,
  ChevronRight,
  Download,
  X,
  Check,
} from 'lucide-react'

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    group: 'Today',
    category: 'Scam Reports',
    title: 'Urgent Scam Report — Lanka Overseas Fakes',
    description:
      '3 users have reported this agency for fraudulent activities in the last 24 hours. Immediate review required.',
    time: '2 hours ago',
    tags: ['Scam Report', 'Urgent'],
    priority: 'urgent',
    icon: AlertTriangle,
    unread: true,
    action: 'Review Report',
    to: '/admin/scam-reports',
  },
  {
    id: 2,
    group: 'Today',
    category: 'Agency',
    title: 'New Agency Application — Global Migration Experts',
    description:
      'A new agency has submitted its registration documents for verification. 4/4 documents uploaded.',
    time: '3 hours ago',
    tags: ['Agency', 'New'],
    priority: 'normal',
    icon: Building2,
    unread: true,
    action: 'Review',
    to: '/admin/agencies',
  },
  {
    id: 3,
    group: 'Today',
    category: 'User Activity',
    title: 'New User Milestone — 1,250 Users',
    description:
      'The platform has reached 1,250 registered users. A 12% increase from last month.',
    time: '5 hours ago',
    tags: ['System', 'Milestone'],
    priority: 'normal',
    icon: Users,
    unread: true,
  },
  {
    id: 4,
    group: 'Today',
    category: 'Agency',
    title: 'Agency Approved — Overseas Education Lanka',
    description:
      'The agency has been approved and is now live on the platform with a trust score of 92.',
    time: '6 hours ago',
    tags: ['Agency', 'Approved'],
    priority: 'normal',
    icon: ShieldCheck,
    unread: false,
    action: 'View Agency',
    to: '/admin/agencies',
  },
  {
    id: 5,
    group: 'Today',
    category: 'System',
    title: 'Scholarship Deadline Alert — Fulbright Award',
    description:
      'This scholarship closes in 3 days. 1,204 users have saved it.',
    time: '8 hours ago',
    tags: ['Scholarship', 'Alert'],
    priority: 'normal',
    icon: GraduationCap,
    unread: true,
    action: 'View Scholarship',
    to: '/admin/scholarships',
  },
  {
    id: 6,
    group: 'Yesterday',
    category: 'Agency',
    title: 'Document Re-upload Request Sent — PathWay Education Group',
    description:
      'Admin requested missing migration license documentation from PathWay Education Group.',
    time: 'Yesterday, 4:00 PM',
    tags: ['Agency', 'Docs'],
    priority: 'normal',
    icon: FileText,
    unread: false,
    action: 'View Agency',
    to: '/admin/agencies',
  },
  {
    id: 7,
    group: 'Yesterday',
    category: 'Scam Reports',
    title: 'Scam Report Resolved — Quick Visa Lanka',
    description:
      'The report was investigated and marked as unsubstantiated. The agency remains active.',
    time: 'Yesterday, 2:00 PM',
    tags: ['Scam', 'Resolved'],
    priority: 'normal',
    icon: ShieldCheck,
    unread: false,
    action: 'View Report',
    to: '/admin/scam-reports',
  },
  {
    id: 8,
    group: 'Yesterday',
    category: 'System',
    title: 'University Added — Leiden University',
    description:
      'Leiden University Netherlands has been added with 19 courses listed.',
    time: 'Yesterday, 11:00 AM',
    tags: ['University', 'Added'],
    priority: 'normal',
    icon: GraduationCap,
    unread: false,
    action: 'View Universities',
    to: '/admin/universities',
  },
  {
    id: 9,
    group: 'Yesterday',
    category: 'Agency',
    title: 'Agency Verification Overdue — StudyEase Lanka',
    description:
      'The application has been pending for 6 days without admin action.',
    time: 'Yesterday, 9:00 AM',
    tags: ['Agency', 'Overdue'],
    priority: 'normal',
    icon: Clock,
    unread: false,
    action: 'Review',
    to: '/admin/agencies',
  },
  {
    id: 10,
    group: 'Yesterday',
    category: 'System',
    title: 'Analytics Report Ready — September 2024',
    description:
      'The monthly analytics report for September 2024 is ready to download.',
    time: 'Yesterday, 8:00 AM',
    tags: ['Reports'],
    priority: 'normal',
    icon: TrendingUp,
    unread: false,
    action: 'Download',
    to: '/admin/analytics',
  },
  {
    id: 11,
    group: 'This Week',
    category: 'System',
    title: 'New Scholarship Added — Gates Cambridge Scholarship 2026',
    description:
      'A new funding opportunity covering postgraduate studies at Cambridge University.',
    time: '3 days ago',
    tags: ['Scholarship', 'Global'],
    priority: 'normal',
    icon: GraduationCap,
    unread: false,
  },
  {
    id: 12,
    group: 'This Week',
    category: 'User Activity',
    title: 'User Milestone — 2,000 Course Searches this week',
    description:
      'Peak engagement reached in STEM and Hospitality course discovery queries.',
    time: '4 days ago',
    tags: ['User Activity', 'Engagement'],
    priority: 'normal',
    icon: Users,
    unread: false,
  },
  {
    id: 13,
    group: 'This Week',
    category: 'Agency',
    title: 'Agency Suspended — XpressVisa Hub',
    description:
      'Platform access was suspended following a compliance investigation.',
    time: '5 days ago',
    tags: ['Compliance', 'Suspended'],
    priority: 'urgent',
    icon: AlertTriangle,
    unread: false,
    action: 'View Agency',
    to: '/admin/agencies',
  },
  {
    id: 14,
    group: 'This Week',
    category: 'System',
    title: 'System Maintenance Completed — Database indexing',
    description:
      'Routine latency optimizations were completed without system downtime.',
    time: '6 days ago',
    tags: ['System', 'Maintenance'],
    priority: 'normal',
    icon: Settings,
    unread: false,
  },
  {
    id: 15,
    group: 'This Week',
    category: 'User Activity',
    title: 'New Admin User Invited — Kavya Perera',
    description:
      'Role permissions initialized for document analysis and regional embassy communications.',
    time: '6 days ago',
    tags: ['Admin Role', 'Active'],
    priority: 'normal',
    icon: UserPlus,
    unread: false,
  },
]

const FILTERS = [
  'All',
  'Unread',
  'Agency',
  'Scam Reports',
  'System',
  'User Activity',
]

const GROUP_ORDER = ['Today', 'Yesterday', 'This Week']

const TAG_STYLES = {
  Urgent: 'bg-red-100 text-red-700',
  'Scam Report': 'bg-red-100 text-red-700',
  Scam: 'bg-red-100 text-red-700',
  Alert: 'bg-red-100 text-red-700',
  Suspended: 'bg-red-100 text-red-700',
  New: 'bg-emerald-100 text-emerald-700',
  Approved: 'bg-emerald-100 text-emerald-700',
  Resolved: 'bg-emerald-100 text-emerald-700',
  Active: 'bg-emerald-100 text-emerald-700',
  Global: 'bg-emerald-100 text-emerald-700',
  Agency: 'bg-blue-100 text-blue-700',
  System: 'bg-blue-100 text-blue-700',
  Docs: 'bg-blue-100 text-blue-700',
  Scholarship: 'bg-blue-100 text-blue-700',
  University: 'bg-blue-100 text-blue-700',
  Reports: 'bg-blue-100 text-blue-700',
  'User Activity': 'bg-blue-100 text-blue-700',
  Engagement: 'bg-emerald-100 text-emerald-700',
  Milestone: 'bg-emerald-100 text-emerald-700',
  Compliance: 'bg-red-100 text-red-700',
  Maintenance: 'bg-blue-100 text-blue-700',
  'Admin Role': 'bg-blue-100 text-blue-700',
  Added: 'bg-emerald-100 text-emerald-700',
  Overdue: 'bg-red-100 text-red-700',
}

function StatCard({ title, value, subtitle, icon: Icon, color }) {
  const colors = {
    red: 'bg-red-100 text-red-700',
    rose: 'bg-rose-100 text-rose-700',
    green: 'bg-emerald-100 text-emerald-700',
    slate: 'bg-slate-100 text-slate-700',
  }

  return (
    <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-600 sm:text-xs">
          {title}
        </p>

        <span className={`rounded-full p-2 ${colors[color]}`}>
          <Icon size={15} />
        </span>
      </div>

      <div className="mt-3 flex items-end gap-2">
        <span className="text-3xl font-bold leading-none text-slate-900">
          {value}
        </span>
        {subtitle && (
          <span className="mb-0.5 text-[10px] leading-4 text-slate-500">
            {subtitle}
          </span>
        )}
      </div>

      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full"
          style={{
            width: `${Math.min(Number(value) || 35, 100)}%`,
            backgroundColor:
              color === 'red'
                ? '#DC2626'
                : color === 'rose'
                  ? '#9F1239'
                  : color === 'green'
                    ? '#14532D'
                    : '#475569',
          }}
        />
      </div>
    </div>
  )
}

function NotificationItem({ item, onDismiss, onMarkRead }) {
  const Icon = item.icon
  const urgent = item.priority === 'urgent'

  return (
    <article
      className={`group flex gap-3 px-4 py-4 transition-colors sm:px-5 ${
        item.unread ? 'bg-emerald-50/70' : 'bg-white'
      }`}
    >
      <div
        className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
          urgent
            ? 'bg-red-100 text-red-600'
            : item.category === 'User Activity'
              ? 'bg-blue-100 text-blue-700'
              : 'bg-emerald-100 text-emerald-700'
        }`}
      >
        <Icon size={17} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
          <div className="flex min-w-0 items-start gap-2">
            {item.unread && (
              <span
                className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-red-500"
                title="Unread"
              />
            )}

            <h3
              className={`text-sm leading-5 ${
                item.unread
                  ? 'font-semibold text-slate-900'
                  : 'font-medium text-slate-800'
              }`}
            >
              {item.title}
            </h3>
          </div>

          <span className="shrink-0 text-[10px] text-slate-400 sm:text-xs">
            {item.time}
          </span>
        </div>

        <p className="mt-1 text-xs leading-5 text-slate-600 sm:text-sm">
          {item.description}
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className={`rounded-full px-2 py-1 text-[10px] font-medium ${
                TAG_STYLES[tag] || 'bg-slate-100 text-slate-600'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-end gap-2">
          {item.unread && (
            <button
              type="button"
              onClick={() => onMarkRead(item.id)}
              className="rounded-md px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100"
            >
              Mark read
            </button>
          )}

          {item.action && item.to && (
            <Link
              to={item.to}
              className={`inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                urgent
                  ? 'bg-red-700 text-white hover:bg-red-800'
                  : 'bg-emerald-900 text-white hover:bg-emerald-800'
              }`}
            >
              {item.action}
              {item.action === 'Download' ? (
                <Download size={12} />
              ) : (
                <ChevronRight size={13} />
              )}
            </Link>
          )}

          <button
            type="button"
            onClick={() => onDismiss(item.id)}
            aria-label={`Dismiss ${item.title}`}
            title="Dismiss notification"
            className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </article>
  )
}

export default function Notifications() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS)
  const [activeFilter, setActiveFilter] = useState('All')
  const [page, setPage] = useState(1)

  const unreadCount = notifications.filter((item) => item.unread).length
  const urgentCount = notifications.filter(
    (item) => item.priority === 'urgent',
  ).length

  const filteredNotifications = useMemo(() => {
    if (activeFilter === 'All') return notifications
    if (activeFilter === 'Unread') {
      return notifications.filter((item) => item.unread)
    }

    return notifications.filter((item) => item.category === activeFilter)
  }, [notifications, activeFilter])

  const groupedNotifications = GROUP_ORDER.map((group) => ({
    group,
    items: filteredNotifications.filter((item) => item.group === group),
  })).filter((group) => group.items.length > 0)

  function markAllRead() {
    setNotifications((current) =>
      current.map((item) => ({ ...item, unread: false })),
    )
  }

  function markRead(id) {
    setNotifications((current) =>
      current.map((item) =>
        item.id === id ? { ...item, unread: false } : item,
      ),
    )
  }

  function dismissNotification(id) {
    setNotifications((current) =>
      current.filter((item) => item.id !== id),
    )
  }

  function changeFilter(filter) {
    setActiveFilter(filter)
    setPage(1)
  }

  return (
    <div className="min-h-full bg-[#EEF3FF] p-4 text-slate-800 sm:p-5 lg:p-6">
      {/* PAGE TITLE */}
      <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-[#DCE8F1] p-3 text-emerald-950">
            <Bell size={21} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Notifications
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Stay updated on platform activities, alerts and pending actions.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={markAllRead}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
          >
            <CheckCheck size={15} />
            Mark All Read
          </button>

          <Link
            to="/admin/settings"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
          >
            <Settings size={15} />
            Settings
          </Link>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Unread Urgent"
          value={urgentCount}
          subtitle="Critical action needed"
          icon={AlertTriangle}
          color="red"
        />

        <StatCard
          title="Pending Actions"
          value={notifications.filter((item) => item.action).length}
          subtitle="Review queue"
          icon={ClipboardList}
          color="rose"
        />

        <StatCard
          title="Total Today"
          value={notifications.filter((item) => item.group === 'Today').length}
          subtitle="Today's notifications"
          icon={CalendarDays}
          color="green"
        />

        <StatCard
          title="All Notifications"
          value={notifications.length}
          subtitle={`${unreadCount} unread`}
          icon={Archive}
          color="slate"
        />
      </div>

      {/* FILTERS */}
      <div className="mb-4 flex flex-col justify-between gap-3 xl:flex-row xl:items-center">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((filter) => {
            const count =
              filter === 'All'
                ? notifications.length
                : filter === 'Unread'
                  ? unreadCount
                  : notifications.filter(
                      (item) => item.category === filter,
                    ).length

            return (
              <button
                key={filter}
                type="button"
                onClick={() => changeFilter(filter)}
                className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors ${
                  activeFilter === filter
                    ? 'border-emerald-950 bg-emerald-950 text-white'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                {filter === 'Unread' && (
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                )}
                {filter}
                <span
                  className={`rounded px-1.5 py-0.5 text-[10px] ${
                    activeFilter === filter
                      ? 'bg-white/15 text-white'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        <button
          type="button"
          onClick={markAllRead}
          className="inline-flex items-center gap-2 self-start text-xs font-semibold text-emerald-800 hover:text-emerald-950 xl:self-auto"
        >
          <Check size={14} />
          Mark all as read
        </button>
      </div>

      {/* NOTIFICATION GROUPS */}
      <div className="space-y-4">
        {groupedNotifications.map(({ group, items }) => (
          <section
            key={group}
            className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm"
          >
            <div className="flex items-center justify-between gap-3 border-b border-slate-100 bg-white px-4 py-3 sm:px-5">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-800">
                  {group}
                </h2>

                <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-medium text-emerald-800">
                  {group === 'Today'
                    ? `${items.length} new updates`
                    : group === 'Yesterday'
                      ? `${items.length} archived updates`
                      : `${items.length} past activities`}
                </span>
              </div>

              <span className="hidden text-[10px] text-slate-400 sm:inline">
                {group === 'Today'
                  ? 'Today'
                  : group === 'Yesterday'
                    ? 'Previous day'
                    : 'Earlier this week'}
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {items.map((item) => (
                <NotificationItem
                  key={item.id}
                  item={item}
                  onDismiss={dismissNotification}
                  onMarkRead={markRead}
                />
              ))}
            </div>
          </section>
        ))}

        {filteredNotifications.length === 0 && (
          <div className="rounded-xl border border-slate-200 bg-white px-5 py-14 text-center">
            <Bell className="mx-auto mb-3 text-slate-300" size={32} />
            <h3 className="font-semibold text-slate-800">
              No notifications found
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              There are no notifications in this category.
            </p>
          </div>
        )}
      </div>

      {/* PAGINATION */}
      <div className="mt-4 flex flex-col justify-between gap-3 rounded-xl border border-slate-100 bg-white px-4 py-3 sm:flex-row sm:items-center">
        <p className="text-xs text-slate-500">
          Showing{' '}
          <span className="font-semibold text-slate-800">
            {filteredNotifications.length > 0 ? 1 : 0}–
            {filteredNotifications.length}
          </span>{' '}
          of{' '}
          <span className="font-semibold text-slate-800">
            {filteredNotifications.length}
          </span>{' '}
          notifications
        </p>

        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={page === 1}
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            className="rounded-md border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Previous page"
          >
            <ChevronLeft size={15} />
          </button>

          {[1, 2, 3].map((number) => (
            <button
              key={number}
              type="button"
              onClick={() => setPage(number)}
              className={`h-8 min-w-8 rounded-md px-2 text-xs font-semibold ${
                page === number
                  ? 'bg-emerald-950 text-white'
                  : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              {number}
            </button>
          ))}

          <span className="px-1 text-slate-400">…</span>

          <button
            type="button"
            onClick={() => setPage(19)}
            className={`h-8 min-w-8 rounded-md px-2 text-xs font-semibold ${
              page === 19
                ? 'bg-emerald-950 text-white'
                : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            19
          </button>

          <button
            type="button"
            onClick={() => setPage((current) => current + 1)}
            className="rounded-md border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
            aria-label="Next page"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      <p className="mt-3 text-[10px] text-slate-400">
        Demo notification data. Connect this page to your backend to display
        actual notifications.
      </p>
    </div>
  )
}
