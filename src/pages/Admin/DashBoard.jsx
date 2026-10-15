
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Users, Building2, Clock3, ShieldCheck,
  GraduationCap, FileText, ArrowUpRight,
  ArrowDownRight, CheckCircle2, AlertTriangle,
  ChevronRight, MoreHorizontal, Globe
} from 'lucide-react'
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, AreaChart, Area, BarChart,
  Bar, Cell
} from 'recharts'

const stats = [
  { title: 'Total Users', value: '1,248', change: '+12%', up: true, icon: Users, color: 'green' },
  { title: 'Verified Agencies', value: '86', change: '+8%', up: true, icon: Building2, color: 'teal' },
  { title: 'Pending Applications', value: '12', change: '+4%', up: false, icon: Clock3, color: 'orange' },
  { title: 'Open Scam Reports', value: '8', change: '-15%', up: true, icon: ShieldCheck, color: 'red' },
  { title: 'Listed Universities', value: '320', change: '+6%', up: true, icon: GraduationCap, color: 'blue' },
  { title: 'Active Scholarships', value: '156', change: '+20%', up: true, icon: FileText, color: 'purple' },
]

const registrations = [
  { day: 'Mar 24', users: 7 }, { day: 'Mar 26', users: 11 },
  { day: 'Mar 28', users: 7 }, { day: 'Mar 30', users: 13 },
  { day: 'Apr 1', users: 15 }, { day: 'Apr 3', users: 20 },
  { day: 'Apr 5', users: 16 }, { day: 'Apr 7', users: 22 },
  { day: 'Apr 9', users: 30 }, { day: 'Apr 11', users: 31 },
  { day: 'Apr 13', users: 19 }, { day: 'Apr 15', users: 14 },
  { day: 'Apr 17', users: 19 }, { day: 'Apr 19', users: 16 },
  { day: 'Apr 21', users: 22 }, { day: 'Apr 23', users: 30 },
]

const applicationStats = [
  { name: 'Pending', count: 12, color: '#F59E0B' },
  { name: 'Under Review', count: 8, color: '#3B82F6' },
  { name: 'Approved', count: 24, color: '#16A34A' },
  { name: 'Rejected', count: 6, color: '#EF4444' },
]

const applications = [
  { id: 'A-001', name: 'Global Migration Experts', owner: 'Robert Vance', date: 'Apr 22, 2024', status: 'Pending' },
  { id: 'A-002', name: 'Study Abroad Partners', owner: 'Sarah Kim', date: 'Apr 21, 2024', status: 'Under Review' },
  { id: 'A-003', name: 'EduWorld Consultants', owner: 'Michael Lee', date: 'Apr 20, 2024', status: 'Pending' },
  { id: 'A-004', name: 'Future Pathways', owner: 'Emily Carter', date: 'Apr 19, 2024', status: 'Approved' },
  { id: 'A-005', name: 'Global Reach Education', owner: 'Daniel Park', date: 'Apr 18, 2024', status: 'Under Review' },
]

const reports = [
  { id: 'R-001', entity: 'XYZ Migration Services', category: 'Fake Agency', date: 'Apr 22, 2024', status: 'New' },
  { id: 'R-002', entity: 'Global Study Hub', category: 'Payment Scam', date: 'Apr 21, 2024', status: 'Under Review' },
  { id: 'R-003', entity: 'Abroad Success Ltd', category: 'Fraudulent Offer', date: 'Apr 20, 2024', status: 'New' },
  { id: 'R-004', entity: 'Elite Education', category: 'Fake Agency', date: 'Apr 19, 2024', status: 'Investigating' },
  { id: 'R-005', entity: 'Study Free Abroad', category: 'Other', date: 'Apr 18, 2024', status: 'Closed' },
]

const activities = [
  { text: 'New agency application submitted', detail: 'Global Migration Experts', time: '2 hours ago', icon: Building2 },
  { text: 'Scam report marked under review', detail: 'XYZ Migration Services', time: '4 hours ago', icon: ShieldCheck },
  { text: 'University record updated', detail: 'University of Melbourne', time: '6 hours ago', icon: GraduationCap },
  { text: 'New user registered', detail: 'student@example.com', time: '8 hours ago', icon: Users },
  { text: 'Scholarship published', detail: 'Australia Government Scholarship', time: '10 hours ago', icon: FileText },
]

const countries = [
  { name: 'Australia', flag: '🇦🇺', users: 450 },
  { name: 'Canada', flag: '🇨🇦', users: 320 },
  { name: 'United Kingdom', flag: '🇬🇧', users: 280 },
  { name: 'Germany', flag: '🇩🇪', users: 190 },
  { name: 'USA', flag: '🇺🇸', users: 150 },
]

const popularContent = {
  Courses: ['Computer Science', 'Business Management', 'Nursing', 'Engineering', 'Information Technology'],
  Universities: ['University of Melbourne', 'University of Toronto', 'University of Oxford', 'Deakin University', 'University of Alberta'],
  Scholarships: ['Australia Awards', 'Chevening Scholarship', 'Commonwealth Scholarships', 'DAAD Scholarships', 'Global Excellence Award'],
}

function Panel({ title, children, action }) {
  return (
    <section className="min-w-0 rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h2 className="text-sm font-bold text-slate-900">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  )
}

function StatusBadge({ status }) {
  const styles = {
    Pending: 'bg-amber-50 text-amber-700',
    'Under Review': 'bg-blue-50 text-blue-700',
    Approved: 'bg-emerald-100 text-emerald-800',
    Rejected: 'bg-red-50 text-red-700',
    New: 'bg-red-50 text-red-700',
    Investigating: 'bg-orange-50 text-orange-700',
    Closed: 'bg-emerald-50 text-emerald-700',
  }

  return (
    <span className={`inline-flex whitespace-nowrap rounded-md px-2 py-1 text-[10px] font-medium ${styles[status] || 'bg-slate-100 text-slate-600'}`}>
      {status}
    </span>
  )
}

function TableLink({ to, children }) {
  return (
    <Link to={to} className="text-xs font-semibold text-[#08764A] hover:underline">
      {children}
    </Link>
  )
}

export default function Dashboard() {
  const [period, setPeriod] = useState('30')
  const [popularTab, setPopularTab] = useState('Courses')

  const linkAction = (to) => (
    <TableLink to={to}>View All</TableLink>
  )

  return (
    <div className="space-y-4">
      {/* Page heading */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
            Welcome back, Admin!
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Here's what's happening on your platform today.
          </p>
        </div>
        <p className="text-xs text-slate-500">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
          })}
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        {stats.map((item) => {
          const Icon = item.icon
          const colorClasses = {
            green: 'bg-emerald-50 text-emerald-600',
            teal: 'bg-teal-50 text-teal-600',
            orange: 'bg-orange-50 text-orange-600',
            red: 'bg-red-50 text-red-600',
            blue: 'bg-blue-50 text-blue-600',
            purple: 'bg-purple-50 text-purple-600',
          }

          return (
            <div key={item.title} className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between gap-2">
                <div className={`rounded-lg p-2.5 ${colorClasses[item.color]}`}>
                  <Icon size={22} />
                </div>
                <span className={`flex items-center gap-0.5 text-xs font-semibold ${item.up ? 'text-emerald-600' : 'text-red-600'}`}>
                  {item.up ? <ArrowUpRight size={15} /> : <ArrowDownRight size={15} />}
                  {item.change}
                </span>
              </div>
              <p className="mt-3 text-2xl font-bold text-slate-900">{item.value}</p>
              <p className="mt-1 text-xs text-slate-500">{item.title}</p>
              <p className="mt-2 text-[10px] text-slate-400">vs last month</p>
            </div>
          )
        })}
      </div>

      {/* Charts and quick actions */}
      <div className="grid grid-cols-1 gap-4 2xl:grid-cols-[1.25fr_1.1fr_0.8fr]">
        <Panel
          title="User Registrations"
          action={
            <select value={period} onChange={(e) => setPeriod(e.target.value)} className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs outline-none">
              <option value="7">Last 7 Days</option>
              <option value="30">Last 30 Days</option>
              <option value="90">Last 90 Days</option>
            </select>
          }
        >
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={registrations}>
                <defs>
                  <linearGradient id="registrationFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#16A34A" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#16A34A" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#E8EEF0" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} width={25} />
                <Tooltip />
                <Area type="monotone" dataKey="users" stroke="#07804A" strokeWidth={2.5} fill="url(#registrationFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel
          title="Agency Applications"
          action={<span className="text-[10px] text-slate-400">By status</span>}
        >
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={applicationStats}>
                <CartesianGrid stroke="#E8EEF0" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} width={25} />
                <Tooltip />
                <Bar dataKey="count" radius={[3, 3, 0, 0]}>
                  {applicationStats.map((item) => (
                    <Cell key={item.name} fill={item.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Quick Actions">
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Verify Agencies', to: '/admin/agency-verification', icon: Building2, style: 'bg-emerald-50 text-emerald-800' },
              { label: 'Review Reports', to: '/admin/scam-reports', icon: ShieldCheck, style: 'bg-red-50 text-red-700' },
              { label: 'Add University', to: '/admin/universities', icon: GraduationCap, style: 'bg-blue-50 text-blue-700' },
              { label: 'Add Scholarship', to: '/admin/scholarships', icon: FileText, style: 'bg-purple-50 text-purple-700' },
            ].map(({ label, to, icon: Icon, style }) => (
              <Link key={label} to={to} className={`flex min-h-14 items-center gap-2 rounded-lg p-3 text-xs font-semibold transition hover:brightness-95 ${style}`}>
                <Icon size={19} className="shrink-0" />
                {label}
              </Link>
            ))}
          </div>
        </Panel>
      </div>

      {/* Recent tables and alerts */}
      <div className="grid grid-cols-1 gap-4 2xl:grid-cols-[1.15fr_1.05fr_0.72fr]">
        <Panel title="Recent Agency Applications" action={linkAction('/admin/agency-verification')}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-[11px]">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  {['ID', 'Agency Name', 'Owner', 'Date', 'Status'].map((heading) => (
                    <th key={heading} className="px-2 py-2 font-semibold">{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50">
                    <td className="px-2 py-3 font-semibold">{app.id}</td>
                    <td className="px-2 py-3 text-slate-700">{app.name}</td>
                    <td className="px-2 py-3 text-slate-500">{app.owner}</td>
                    <td className="whitespace-nowrap px-2 py-3 text-slate-500">{app.date}</td>
                    <td className="px-2 py-3"><StatusBadge status={app.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel title="Recent Scam Reports" action={linkAction('/admin/scam-reports')}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] text-left text-[11px]">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  {['ID', 'Reported Entity', 'Category', 'Date', 'Status'].map((heading) => (
                    <th key={heading} className="px-2 py-2 font-semibold">{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {reports.map((report) => (
                  <tr key={report.id} className="hover:bg-slate-50">
                    <td className="px-2 py-3 font-semibold">{report.id}</td>
                    <td className="px-2 py-3 text-slate-700">{report.entity}</td>
                    <td className="px-2 py-3 text-slate-500">{report.category}</td>
                    <td className="whitespace-nowrap px-2 py-3 text-slate-500">{report.date}</td>
                    <td className="px-2 py-3"><StatusBadge status={report.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel title="Tasks & Alerts" action={linkAction('/admin/notifications')}>
          <div className="divide-y divide-slate-100">
            {[
              { title: 'Agency applications pending review', count: '12', icon: Clock3, color: 'text-orange-600 bg-orange-50', to: '/admin/agency-verification' },
              { title: 'New scam reports to investigate', count: '8', icon: ShieldCheck, color: 'text-red-600 bg-red-50', to: '/admin/scam-reports' },
              { title: 'Documents require re-check', count: '3', icon: FileText, color: 'text-blue-600 bg-blue-50', to: '/admin/agency-verification' },
              { title: 'Scholarships closing soon', count: '5', icon: AlertTriangle, color: 'text-purple-600 bg-purple-50', to: '/admin/scholarships' },
            ].map(({ title, count, icon: Icon, color, to }) => (
              <Link to={to} key={title} className="flex items-center gap-2 py-3 hover:bg-slate-50">
                <span className={`rounded-lg p-2 ${color}`}><Icon size={17} /></span>
                <span className="flex-1 text-xs leading-5 text-slate-600">{count} {title}</span>
                <ChevronRight size={15} className="text-slate-400" />
              </Link>
            ))}
          </div>
        </Panel>
      </div>

      {/* Activity, countries and popular content */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.35fr_0.9fr_0.85fr]">
        <Panel title="Recent Activity" action={linkAction('/admin/audit-logs')}>
          <div className="space-y-4">
            {activities.map(({ text, detail, time, icon: Icon }) => (
              <div key={text} className="flex items-start gap-3">
                <div className="rounded-full bg-emerald-50 p-2 text-emerald-700">
                  <Icon size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-slate-700">{text}</p>
                  <p className="mt-0.5 truncate text-[11px] text-slate-500">{detail}</p>
                </div>
                <span className="whitespace-nowrap text-[10px] text-slate-400">{time}</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Top Countries (User Interest)">
          <div className="space-y-4">
            {countries.map((country) => (
              <div key={country.name} className="flex items-center gap-2">
                <span className="text-xl">{country.flag}</span>
                <span className="w-24 truncate text-xs text-slate-600">{country.name}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-800 to-emerald-500"
                    style={{ width: `${(country.users / 450) * 100}%` }}
                  />
                </div>
                <span className="w-8 text-right text-[10px] text-slate-500">{country.users}</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Popular Content">
          <div className="mb-3 flex gap-1 border-b border-slate-100">
            {Object.keys(popularContent).map((tab) => (
              <button
                type="button"
                key={tab}
                onClick={() => setPopularTab(tab)}
                className={`flex-1 border-b-2 px-1 py-2 text-[10px] font-medium ${
                  popularTab === tab
                    ? 'border-emerald-700 text-emerald-800'
                    : 'border-transparent text-slate-500'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <ol className="space-y-3">
            {popularContent[popularTab].map((title, index) => (
              <li key={title} className="flex items-center gap-2 text-xs">
                <span className="flex h-5 w-5 items-center justify-center rounded bg-slate-100 text-[10px] text-slate-600">{index + 1}</span>
                <span className="min-w-0 flex-1 truncate text-slate-700">{title}</span>
                <span className="text-[10px] text-slate-400">{[ '1.2K', '980', '820', '650', '610' ][index]} views</span>
              </li>
            ))}
          </ol>
        </Panel>
      </div>

      <p className="flex items-center justify-center gap-2 pb-2 text-[10px] text-slate-400">
        <CheckCircle2 size={13} /> Agency Admin Dashboard · Demo data for UI development
      </p>
    </div>
  )
}
