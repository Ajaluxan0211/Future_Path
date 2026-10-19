
import { useState } from 'react'
import {
  Users,
  Search,
  Building2,
  FileText,
  Award,
  ShieldAlert,
  TrendingUp,
  Zap,
  Cloud,
  Database,
  Gauge,
  HardDrive,
  History,
  ArrowRight,
  Globe,
  GraduationCap,
  UserPlus,
  Monitor,
  ChevronDown,
  Download,
  CalendarDays,
  CheckCircle2,
  Clock,
} from 'lucide-react'

const stats = [
  {
    title: 'Page Views',
    value: '12,847',
    change: '+23%',
    icon: Users,
    color: 'green',
  },
  {
    title: 'Searches',
    value: '3,241',
    change: '+18%',
    icon: Search,
    color: 'blue',
  },
  {
    title: 'Agency Contacts',
    value: '847',
    change: '+31%',
    icon: Building2,
    color: 'red',
  },
  {
    title: 'Applications',
    value: '142',
    change: '+8%',
    icon: FileText,
    color: 'blue',
  },
  {
    title: 'Scholarship Views',
    value: '89',
    change: '+44%',
    icon: Award,
    color: 'red',
  },
  {
    title: 'Scam Reports',
    value: '14',
    change: '-3%',
    icon: ShieldAlert,
    color: 'red',
  },
]

const countries = [
  { flag: '🇦🇺', name: 'Australia', value: 450, width: '100%' },
  { flag: '🇨🇦', name: 'Canada', value: 320, width: '71%' },
  { flag: '🇬🇧', name: 'United Kingdom', value: 280, width: '62%' },
  { flag: '🇩🇪', name: 'Germany', value: 190, width: '42%' },
  { flag: '🇺🇸', name: 'United States', value: 150, width: '33%' },
]

const activities = [
  {
    icon: Building2,
    color: 'green',
    title: 'New agency application submitted – Global Migration Experts',
    detail: '2 hours ago · Verified Documentation',
  },
  {
    icon: ShieldAlert,
    color: 'red',
    title: 'Scam report marked under review – XYZ Migration Services',
    detail: '4 hours ago · Urgent Audit',
  },
  {
    icon: GraduationCap,
    color: 'blue',
    title: 'University record updated – University of Melbourne',
    detail: '6 hours ago · Curriculum Sync',
  },
  {
    icon: UserPlus,
    color: 'green',
    title: 'New user registered – student@example.com',
    detail: '8 hours ago · Self Enrollment',
  },
  {
    icon: Monitor,
    color: 'blue',
    title: 'Scholarship published – Australia Government Scholarship',
    detail: '10 hours ago · Global Grant Program',
  },
]

const contentByTab = {
  Courses: [
    ['Computer Science', '1.2K views'],
    ['Business Management', '980 views'],
    ['Nursing', '820 views'],
    ['Engineering', '650 views'],
    ['Information Technology', '610 views'],
  ],
  Universities: [
    ['University of Melbourne', '1.1K views'],
    ['UNSW Sydney', '970 views'],
    ['University of Toronto', '850 views'],
    ['University of Edinburgh', '720 views'],
    ['Monash University', '640 views'],
  ],
  Scholarships: [
    ['Australia Awards', '1.0K views'],
    ['Chevening Scholarship', '920 views'],
    ['Fulbright Program', '790 views'],
    ['Erasmus Mundus', '680 views'],
    ['DAAD Scholarship', '550 views'],
  ],
}

function SectionCard({ children, className = '' }) {
  return (
    <section
      className={`min-w-0 rounded-xl border border-slate-100 bg-white p-5 shadow-sm ${className}`}
    >
      {children}
    </section>
  )
}

function SectionHeading({ title, subtitle, action }) {
  return (
    <div className="mb-5 flex items-start justify-between gap-3">
      <div>
        <h2 className="text-sm font-bold text-slate-900">{title}</h2>
        {subtitle && (
          <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  )
}

function SmallSelect({ value, onChange, options }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="appearance-none rounded-lg border-0 bg-[#EFF4FF] py-2 pl-3 pr-8 text-xs font-medium text-slate-700 outline-none focus:ring-2 focus:ring-emerald-200"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown
        size={13}
        className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500"
      />
    </div>
  )
}

function UserRegistrationsChart({ period }) {
  const chartData = {
    'Last 7 Days': [12, 18, 15, 29, 25, 33, 28],
    'Last 30 Days': [9, 12, 11, 18, 17, 37, 24, 21, 30, 26, 33, 29],
    'Last 90 Days': [8, 13, 12, 17, 21, 19, 27, 23, 35, 31, 39, 34],
  }

  const values = chartData[period] || chartData['Last 30 Days']
  const width = 440
  const height = 175
  const left = 25
  const right = 8
  const top = 12
  const bottom = 25
  const max = 45

  const points = values
    .map((value, index) => {
      const x = left + (index * (width - left - right)) / (values.length - 1)
      const y = top + ((max - value) / max) * (height - top - bottom)
      return `${x},${y}`
    })
    .join(' ')

  const firstPoint = points.split(' ')[0]
  const lastPoint = points.split(' ').at(-1)
  const area = `${firstPoint} ${points} ${lastPoint.split(',')[0]},${height - bottom} ${left},${height - bottom}`

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full overflow-visible"
        role="img"
        aria-label={`User registrations chart for ${period}`}
      >
        <defs>
          <linearGradient id="registrationFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0B6845" stopOpacity=".22" />
            <stop offset="100%" stopColor="#0B6845" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0, 1, 2, 3].map((line) => {
          const y = top + (line * (height - top - bottom)) / 3
          return (
            <g key={line}>
              <line
                x1={left}
                y1={y}
                x2={width - right}
                y2={y}
                stroke="#D9E5F5"
                strokeDasharray="3 3"
              />
              <text
                x="4"
                y={y + 4}
                fill="#8A96A6"
                fontSize="9"
              >
                {[40, 25, 10, 0][line]}
              </text>
            </g>
          )
        })}

        <polygon points={area} fill="url(#registrationFill)" />
        <polyline
          points={points}
          fill="none"
          stroke="#075B38"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {values.map((value, index) => {
          const x = left + (index * (width - left - right)) / (values.length - 1)
          const y = top + ((max - value) / max) * (height - top - bottom)

          return (
            <circle
              key={`${index}-${value}`}
              cx={x}
              cy={y}
              r={index === 5 ? 4 : 2}
              fill={index === 5 ? '#075B38' : '#ffffff'}
              stroke="#075B38"
              strokeWidth={index === 5 ? 2 : 1}
            />
          )
        })}

        <line
          x1={left}
          y1={height - bottom}
          x2={width - right}
          y2={height - bottom}
          stroke="#CBD5D1"
        />

        {['Mar 26', 'Apr 02', 'Apr 09', 'Apr 16', 'Apr 23'].map((label, index) => (
          <text
            key={label}
            x={left + (index * (width - left - right)) / 4}
            y={height - 4}
            fill={index === 2 ? '#075B38' : '#64748B'}
            fontSize="9"
            fontWeight={index === 2 ? '700' : '400'}
            textAnchor="middle"
          >
            {label}
          </text>
        ))}
      </svg>
    </div>
  )
}

function ApplicationsChart() {
  const bars = [
    { label: 'Pending', value: 12, color: '#FFD8D5' },
    { label: 'Review', value: 8, color: '#CFE0FF' },
    { label: 'Approved', value: 24, color: '#004B2E' },
    { label: 'Rejected', value: 6, color: '#FFD8D5' },
  ]

  return (
    <div className="flex h-[195px] items-end justify-around gap-3 px-1 pb-1 pt-4">
      {bars.map((bar) => (
        <div key={bar.label} className="flex h-full flex-1 flex-col items-center justify-end">
          <span className="mb-2 text-xs font-bold text-slate-800">
            {bar.value}
          </span>
          <div
            className="w-full max-w-12 rounded-t-md"
            style={{
              height: `${(bar.value / 26) * 115}px`,
              backgroundColor: bar.color,
            }}
          />
          <span className="mt-2 text-center text-[10px] text-slate-600">
            {bar.label}
          </span>
        </div>
      ))}
    </div>
  )
}

function TrafficSources() {
  return (
    <div className="flex flex-col items-center">
      <div
        className="relative h-28 w-28 rounded-full"
        style={{
          background:
            'conic-gradient(#004B2E 0% 42%, #147650 42% 73%, #9BECC5 73% 91%, #8B3535 91% 100%)',
        }}
      >
        <div className="absolute inset-5 flex flex-col items-center justify-center rounded-full bg-white">
          <span className="text-sm font-bold text-slate-900">100%</span>
          <span className="text-[9px] text-slate-500">Breakdown</span>
        </div>
      </div>

      <div className="mt-5 grid w-full grid-cols-2 gap-x-2 gap-y-3 text-[10px] text-slate-600">
        {[
          ['#004B2E', 'Direct', '42%'],
          ['#147650', 'Search', '31%'],
          ['#9BECC5', 'Referral', '18%'],
          ['#8B3535', 'Social', '9%'],
        ].map(([color, label, value]) => (
          <div key={label} className="flex items-start gap-2">
            <span
              className="mt-1 h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span>
              {label}
              <strong className="block text-slate-800">{value}</strong>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function AnalyticsReports() {
  const [period, setPeriod] = useState('Last 30 Days')
  const [contentTab, setContentTab] = useState('Courses')

  const handleExport = () => {
    const rows = [
      ['Metric', 'Value'],
      ...stats.map((stat) => [stat.title, stat.value]),
      ['Top country', 'Australia'],
      ['Top country searches', '450'],
    ]

    const csv = rows
      .map((row) =>
        row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(',')
      )
      .join('\n')

    const url = URL.createObjectURL(
      new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    )
    const link = document.createElement('a')
    link.href = url
    link.download = 'agency-analytics-report.csv'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-full bg-[#EEF4FF] px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px] space-y-5">

        {/* Page heading */}
        <SectionCard className="!p-5">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex min-w-0 items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#9CF0C8] text-[#004B2E]">
                <TrendingUp size={22} />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl font-bold text-[#063D2A]">
                    Analytics &amp; Reports
                  </h1>
                  <span className="rounded-full bg-[#CFF8E5] px-2.5 py-1 text-[10px] font-medium text-[#087449]">
                    Live Telemetry
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-600">
                  Platform-wide insights, user behavior and performance metrics.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <SmallSelect
                value={period}
                onChange={setPeriod}
                options={['Last 7 Days', 'Last 30 Days', 'Last 90 Days']}
              />
              <button
                type="button"
                onClick={handleExport}
                className="inline-flex items-center gap-2 rounded-lg bg-[#075B38] px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#06482E]"
              >
                <Download size={15} />
                Export Report
              </button>
            </div>
          </div>
        </SectionCard>

        {/* Summary statistics */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
          {stats.map((stat) => {
            const Icon = stat.icon
            const isRed = stat.color === 'red'
            const isBlue = stat.color === 'blue'

            return (
              <SectionCard key={stat.title} className="!p-4">
                <div className="flex items-start justify-between gap-2">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      isRed
                        ? 'bg-[#FFDAD7] text-[#8A2929]'
                        : isBlue
                          ? 'bg-[#D6E5FF] text-[#174A92]'
                          : 'bg-[#BDF4D8] text-[#075B38]'
                    }`}
                  >
                    <Icon size={18} />
                  </div>
                  <span
                    className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
                      stat.change.startsWith('-')
                        ? 'bg-red-100 text-red-700'
                        : 'bg-[#D7F8E8] text-[#087449]'
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>

                <p className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-slate-500">{stat.title}</p>
              </SectionCard>
            )
          })}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.35fr_1fr]">
          <SectionCard>
            <SectionHeading
              title="User Registrations"
              subtitle="Daily trajectory and growth cadence"
              action={
                <SmallSelect
                  value={period}
                  onChange={setPeriod}
                  options={['Last 7 Days', 'Last 30 Days', 'Last 90 Days']}
                />
              }
            />
            <UserRegistrationsChart period={period} />
          </SectionCard>

          <SectionCard>
            <SectionHeading
              title="Agency Applications"
              subtitle="Lifecycle pipeline distribution"
              action={
                <span className="pt-1 text-[10px] text-slate-500">
                  By status
                </span>
              }
            />
            <ApplicationsChart />
          </SectionCard>
        </div>

        {/* Countries, traffic and popular content */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-[1.25fr_.75fr_1fr]">
          <SectionCard>
            <SectionHeading
              title="Top Countries (User Interest)"
              subtitle="Destinations by active query volume"
              action={
                <span className="whitespace-nowrap rounded-full bg-[#D7F8E8] px-2.5 py-1 text-[10px] font-semibold text-[#075B38]">
                  {period}
                </span>
              }
            />

            <div className="space-y-3">
              {countries.map((country) => (
                <div key={country.name}>
                  <div className="mb-1 flex items-center justify-between gap-2 text-xs">
                    <span className="font-semibold text-slate-800">
                      {country.flag} {country.name}
                    </span>
                    <span className="font-bold text-[#06482E]">
                      {country.value}
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-[#DCE8FF]">
                    <div
                      className="h-full rounded-full bg-[#075B38]"
                      style={{ width: country.width }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard>
            <SectionHeading
              title="Traffic Sources"
              action={<Globe size={16} className="text-slate-500" />}
            />
            <TrafficSources />
          </SectionCard>

          <SectionCard>
            <SectionHeading
              title="Popular Content"
              action={
                <span className="text-[10px] text-slate-500">Engagement</span>
              }
            />

            <div className="mb-4 flex rounded-lg bg-[#EFF4FF] p-1">
              {Object.keys(contentByTab).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setContentTab(tab)}
                  className={`flex-1 rounded-md px-2 py-2 text-[10px] font-medium transition ${
                    contentTab === tab
                      ? 'bg-[#06482E] text-white shadow-sm'
                      : 'text-slate-600 hover:bg-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {contentByTab[contentTab].map(([name, views], index) => (
                <div
                  key={name}
                  className="flex items-center justify-between gap-2 text-xs"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#DCE8FF] text-[10px] font-semibold text-[#06482E]">
                      {index + 1}
                    </span>
                    <span className="truncate font-semibold text-slate-800">
                      {name}
                    </span>
                  </div>
                  <span className="shrink-0 font-semibold text-[#06482E]">
                    {views}
                  </span>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* Activity and system health */}
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <SectionCard>
            <SectionHeading
              title="Recent Activity"
              action={
                <button
                  type="button"
                  onClick={() => window.alert('Recent activity list shown above.')}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#06482E] hover:underline"
                >
                  View All <ArrowRight size={14} />
                </button>
              }
            />

            <div className="space-y-5">
              {activities.map((activity) => {
                const Icon = activity.icon

                return (
                  <div key={activity.title} className="flex min-w-0 items-start gap-3">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                        activity.color === 'red'
                          ? 'bg-[#FFDAD7] text-[#8A2929]'
                          : activity.color === 'blue'
                            ? 'bg-[#D6E5FF] text-[#174A92]'
                            : 'bg-[#BDF4D8] text-[#075B38]'
                      }`}
                    >
                      <Icon size={17} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-semibold text-slate-800">
                        {activity.title}
                      </p>
                      <p className="mt-1 text-[10px] text-slate-500">
                        {activity.detail}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </SectionCard>

          <SectionCard>
            <SectionHeading
              title="System Health"
              action={
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D7F8E8] px-2.5 py-1 text-[10px] font-semibold text-[#087449]">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                  All systems operational
                </span>
              }
            />

            <div className="space-y-5">
              {[
                {
                  icon: Cloud,
                  title: 'Server Uptime',
                  value: '99.9%',
                  width: '99.9%',
                  detail: 'Target threshold: > 99.5%',
                  color: '#075B38',
                },
                {
                  icon: Database,
                  title: 'Database Load',
                  value: '34%',
                  width: '34%',
                  detail: 'Cluster primary node active',
                  color: '#2563EB',
                },
                {
                  icon: Gauge,
                  title: 'API Response',
                  value: '98% (<120ms)',
                  width: '98%',
                  detail: 'Edge CDN caching nominal',
                  color: '#075B38',
                },
                {
                  icon: HardDrive,
                  title: 'Storage Used',
                  value: '67% (1.4 TB / 2.0 TB)',
                  width: '67%',
                  detail: 'Next auto-scale tier available',
                  color: '#8A2929',
                },
              ].map((item) => {
                const Icon = item.icon

                return (
                  <div key={item.title}>
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <Icon size={15} style={{ color: item.color }} />
                        <span className="text-xs font-semibold text-slate-800">
                          {item.title}
                        </span>
                      </div>
                      <span
                        className="text-xs font-bold"
                        style={{ color: item.color }}
                      >
                        {item.value}
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-[#DCE8FF]">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: item.width,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                    <p className="mt-1.5 text-[10px] text-slate-500">
                      {item.detail}
                    </p>
                  </div>
                )
              })}
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  )
}
