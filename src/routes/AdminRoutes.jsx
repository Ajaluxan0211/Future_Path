
import { Routes, Route, Link } from 'react-router-dom'
import AdminLayout from '../layouts/AdminLayout'
import Dashboard from '../pages/admin/Dashboard'

function ComingSoon({ title }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      <p className="mt-2 text-sm text-slate-500">
        This admin page will be developed next.
      </p>
      <Link
        to="/admin"
        className="mt-5 inline-flex rounded-lg bg-[#0B603A] px-4 py-2 text-sm font-semibold text-white hover:bg-[#084A2E]"
      >
        Back to Dashboard
      </Link>
    </div>
  )
}

const pages = [
  ['agency-verification', 'Agency Verification'],
  ['agencies', 'Agencies'],
  ['users', 'Users'],
  ['scam-reports', 'Scam Reports'],
  ['countries', 'Countries'],
  ['visas', 'Visas'],
  ['courses', 'Courses'],
  ['universities', 'Universities'],
  ['scholarships', 'Scholarships'],
  ['stories', 'Success Stories'],
  ['analytics', 'Analytics & Reports'],
  ['notifications', 'Notifications'],
  ['admin-users', 'Admin Users & Roles'],
  ['audit-logs', 'Audit Logs'],
  ['settings', 'Settings'],
]

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />

        {pages.map(([path, title]) => (
          <Route
            key={path}
            path={path}
            element={<ComingSoon title={title} />}
          />
        ))}
      </Route>
    </Routes>
  )
}
