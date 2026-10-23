
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Bell,
  X,
  Settings,
  CheckCheck,
  AlertTriangle,
  Building2,
  Users,
  CircleCheck,
  Award,
  ArrowRight,
} from 'lucide-react'

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    category: 'Reports',
    title: 'Urgent scam report',
    description:
      '3 users reported Lanka Overseas Fakes in the past 24 hours.',
    time: '2h ago',
    label: 'High Priority',
    icon: AlertTriangle,
    iconClass: 'bg-red-100 text-red-700',
    unread: true,
    urgent: true,
    to: '/admin/scam-reports',
  },
  {
    id: 2,
    category: 'Agencies',
    title: 'New agency application',
    description:
      'Global Migration Experts submitted 4/4 verification documents.',
    time: '3h ago',
    label: 'Tier 1 License Review',
    icon: Building2,
    iconClass: 'bg-blue-100 text-blue-700',
    unread: true,
    to: '/admin/agency-verification',
  },
  {
    id: 3,
    category: 'Alerts',
    title: 'User milestone',
    description:
      'The platform passed 1,250 registered students and applicants.',
    time: '5h ago',
    label: '+14% Growth',
    icon: Users,
    iconClass: 'bg-blue-100 text-blue-700',
    unread: true,
    to: '/admin/analytics',
  },
  {
    id: 4,
    category: 'Agencies',
    title: 'Agency approved',
    description:
      'Overseas Education Lanka is now live with a trust score of 92.',
    time: '6h ago',
    label: 'Approved',
    icon: CircleCheck,
    iconClass: 'bg-emerald-100 text-emerald-800',
    unread: true,
    to: '/admin/agencies',
  },
  {
    id: 5,
    category: 'Reports',
    title: 'Scholarship closing',
    description:
      'The Fulbright Award closes in 3 days. 214 applications are in draft state.',
    time: '8h ago',
    label: 'Deadline Alert',
    icon: Award,
    iconClass: 'bg-blue-100 text-blue-700',
    unread: true,
    to: '/admin/scholarships',
  },
]

const TABS = ['All', 'Unread', 'Alerts', 'Agencies', 'Reports']

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('All')
  const [notifications, setNotifications] = useState(
    INITIAL_NOTIFICATIONS
  )

  const panelRef = useRef(null)
  const bellRef = useRef(null)
  const navigate = useNavigate()

  const unreadCount = notifications.filter(
    (notification) => notification.unread
  ).length

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === 'All') return true
    if (activeTab === 'Unread') return notification.unread
    return notification.category === activeTab
  })

  // Close the panel when clicking outside or pressing Escape.
  useEffect(() => {
    if (!isOpen) return undefined

    const handleOutsideClick = (event) => {
      if (
        panelRef.current?.contains(event.target) ||
        bellRef.current?.contains(event.target)
      ) {
        return
      }

      setIsOpen(false)
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        unread: false,
      }))
    )
  }

  const handleNotificationClick = (notification) => {
    setNotifications((current) =>
      current.map((item) =>
        item.id === notification.id
          ? { ...item, unread: false }
          : item
      )
    )

    setIsOpen(false)
    navigate(notification.to)
  }

  const handleViewAll = () => {
    setIsOpen(false)
    navigate('/admin/notifications')
  }

  const handleSettings = () => {
    setIsOpen(false)
    navigate('/admin/settings')
  }

  return (
    <>
      {/* Notification bell: place inside AdminTopbar */}
      <button
        ref={bellRef}
        type="button"
        aria-label="Open notifications"
        aria-expanded={isOpen}
        aria-controls="admin-notification-panel"
        onClick={() => setIsOpen((current) => !current)}
        className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100 hover:text-[#006747] focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
      >
        <Bell size={21} strokeWidth={1.8} />

        {unreadCount > 0 && (
          <span className="absolute right-0.5 top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full border-2 border-white bg-red-600 px-1 text-[10px] font-bold text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close notification panel"
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[100] cursor-default border-0 bg-slate-900/25"
          />

          {/* Panel */}
          <section
            ref={panelRef}
            id="admin-notification-panel"
            aria-label="Admin notifications"
            className="fixed right-3 top-[84px] z-[101] flex max-h-[calc(100dvh-100px)] w-[calc(100vw-24px)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl sm:right-6 sm:w-[450px] lg:right-8"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900">
                  Notifications
                </h2>

                {unreadCount > 0 && (
                  <span className="rounded-full bg-red-600 px-2.5 py-1 text-[10px] font-bold text-white">
                    {unreadCount} NEW
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={markAllAsRead}
                  disabled={unreadCount === 0}
                  className="whitespace-nowrap text-xs font-semibold text-emerald-950 hover:text-emerald-700 disabled:cursor-not-allowed disabled:text-slate-400"
                >
                  Mark all read
                </button>

                <button
                  type="button"
                  aria-label="Notification settings"
                  onClick={handleSettings}
                  className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                >
                  <Settings size={18} />
                </button>

                <button
                  type="button"
                  aria-label="Close notifications"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-5 overflow-x-auto border-b border-slate-100 px-5 pt-3">
              {TABS.map((tab) => {
                const count =
                  tab === 'Unread'
                    ? unreadCount
                    : notifications.filter(
                        (item) => item.category === tab
                      ).length

                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`relative flex shrink-0 items-center gap-1.5 pb-3 text-xs transition ${
                      activeTab === tab
                        ? 'font-bold text-emerald-950'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    {tab}

                    {tab === 'Unread' && count > 0 && (
                      <span className="rounded-full bg-blue-100 px-1.5 py-0.5 text-[10px] text-blue-800">
                        {count}
                      </span>
                    )}

                    {activeTab === tab && (
                      <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-emerald-950" />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Notification list */}
            <div className="min-h-0 flex-1 overflow-y-auto">
              <div className="flex items-center justify-between bg-slate-50 px-5 py-2.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Today
                </span>

                <span className="text-[10px] text-slate-500">
                  {filteredNotifications.length} notifications
                </span>
              </div>

              {filteredNotifications.length === 0 ? (
                <div className="flex flex-col items-center px-6 py-12 text-center">
                  <div className="mb-3 rounded-full bg-emerald-50 p-4 text-emerald-800">
                    <CheckCheck size={26} />
                  </div>

                  <h3 className="text-sm font-semibold text-slate-800">
                    You&apos;re all caught up
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    There are no notifications in this category.
                  </p>
                </div>
              ) : (
                filteredNotifications.map((notification) => {
                  const Icon = notification.icon

                  return (
                    <article
                      key={notification.id}
                      className={`border-b border-slate-100 last:border-b-0 ${
                        notification.unread
                          ? 'bg-emerald-50/70'
                          : 'bg-white'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          handleNotificationClick(notification)
                        }
                        className="flex w-full items-start gap-3 px-4 py-4 text-left transition hover:bg-emerald-50 sm:px-5"
                      >
                        <span className="flex w-2 shrink-0 justify-center pt-2">
                          {notification.unread && (
                            <span className="h-2 w-2 rounded-full bg-emerald-950" />
                          )}
                        </span>

                        <span
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${notification.iconClass}`}
                        >
                          <Icon size={20} />
                        </span>

                        <span className="min-w-0 flex-1">
                          <span className="flex items-start justify-between gap-2">
                            <span className="text-sm font-bold leading-5 text-slate-900">
                              {notification.title}
                            </span>

                            <span className="shrink-0 pt-0.5 text-[10px] text-slate-500">
                              {notification.time}
                            </span>
                          </span>

                          <span className="mt-1 block text-xs leading-5 text-slate-600">
                            {notification.description}
                          </span>

                          {notification.label && (
                            <span
                              className={`mt-2 inline-flex rounded-full px-2 py-1 text-[10px] font-semibold ${
                                notification.urgent
                                  ? 'bg-red-50 text-red-700'
                                  : 'bg-emerald-100 text-emerald-800'
                              }`}
                            >
                              {notification.label}
                            </span>
                          )}

                          <span className="mt-2 flex items-center justify-end gap-1 text-xs font-semibold text-emerald-950">
                            Review <ArrowRight size={13} />
                          </span>
                        </span>
                      </button>
                    </article>
                  )
                })
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-slate-100 bg-white p-4">
              <button
                type="button"
                onClick={handleViewAll}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-950 bg-[#004b2d] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#063d28]"
              >
                View all notifications
                <ArrowRight size={16} />
              </button>
            </div>
          </section>
        </>
      )}
    </>
  )
}
