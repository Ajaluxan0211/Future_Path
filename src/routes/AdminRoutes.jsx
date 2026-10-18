
import { Routes, Route, Link } from 'react-router-dom'
import AdminLayout from '../layouts/AdminLayout'
import Dashboard from '../pages/Admin/DashBoard'
import AgencyVerification from '../pages/admin/AgencyVerification'
import Agencies from '../pages/admin/Agencies'
import Users from '../pages/admin/Users'
import ScamReports from '../pages/admin/ScamReports'
import Countries from '../pages/admin/Countries'
import Visas from '../pages/admin/Visas'
import Courses from '../pages/admin/Courses'

function ComingSoon({ title }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-8">
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      <p className="mt-2 text-sm text-slate-500">
        This admin page will be developed next.
      </p>
      <Link
        to="/admin"
        className="mt-5 inline-flex rounded-lg bg-[#087653] px-4 py-2 text-sm font-semibold text-white hover:bg-[#065D40]"
      >
        Back to Dashboard
      </Link>
    </section>
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
      <Route element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route
  path="agency-verification"
  element={<AgencyVerification />}
/>
<Route path="agencies" element={<Agencies />} />
 <Route path="users" element={<Users />} />
 <Route path="scam-reports" element={<ScamReports />} />
 <Route path="countries" element={<Countries />} />
 <Route path="visas" element={<Visas/>} />
 <Route path="courses" element={<Courses />} />

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
