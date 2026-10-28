
import { Routes, Route, useLocation } from 'react-router-dom'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'

import Home from '../pages/Home/Home'
import Countries from '../pages/Countries/Countries'
import Visas from '../pages/Visas/Visas'
import Courses from '../pages/Courses/Courses'
import CourseApply from '../pages/Courses/CourseApply'
import Universities from '../pages/Universities/Universities'
import EligibilityChecker from '../pages/EligibilityChecker/EligibilityChecker'
import Scholarships from '../pages/Scholarships/Scholarships'
import CountryComparison from '../pages/CountryComparison/CountryComparison'
import Agencies from '../pages/Agencies/Agencies'
import AgencyProfile from '../pages/AgencyProfile/AgencyProfile'
import AgencyContact from '../pages/AgencyContact/AgencyContact'
import ScholarshipDetail from '../pages/ScholarshipDetail/ScholarshipDetail'
import ScholarshipApply from '../pages/ScholarshipApply/ScholarshipApply'
import ReportScam from '../pages/ReportScam/ReportScam'
import Storie from '../pages/Storie/Storie'

import Login from '../pages/Auth/Login'
import SignUp from '../pages/Auth/SignUp'
import StudentRegister from '../pages/Auth/StudentRegister'
import AgencyRegister from '../pages/Auth/AgencyRegister'
import AdminRegister from '../pages/Auth/AdminRegister'
import AgencyApplicationStatus from '../pages/Agencies/AgencyApplicationStatus'

import AdminRoutes from './AdminRoutes'

const FOOTER_ROUTES = [
  '/',
  '/countries',
  '/visas',
  '/report',
  '/report-scam',
  '/stories',
]

export default function AppRoutes() {
  const { pathname } = useLocation()

  const isAdminRoute = pathname.startsWith('/admin')
  const showFooter = FOOTER_ROUTES.includes(pathname)

  return (
    <div className="min-h-screen w-full">
      <ScrollToTop />

      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* Home and public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/countries" element={<Countries />} />
        <Route path="/visas" element={<Visas />} />

        {/* Courses */}
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id/apply" element={<CourseApply />} />

        {/* Universities */}
        <Route path="/universities" element={<Universities />} />
        <Route path="/universities/:id" element={<Universities />} />

        {/* Eligibility */}
        <Route path="/eligibility" element={<EligibilityChecker />} />

        {/* Scholarships */}
        <Route path="/scholarships" element={<Scholarships />} />
        <Route
          path="/scholarships/:id/apply"
          element={<ScholarshipApply />}
        />
        <Route
          path="/scholarships/:id"
          element={<ScholarshipDetail />}
        />

        {/* Agency directory, profile, and contact */}
        <Route path="/agencies" element={<Agencies />} />
        <Route path="/agencies/:id" element={<AgencyProfile />} />
        <Route
          path="/agencies/:id/contact"
          element={<AgencyContact />}
        />

        {/* Scam reports */}
        <Route path="/report" element={<ReportScam />} />
        <Route path="/report-scam" element={<ReportScam />} />

        {/* Stories */}
        <Route path="/stories" element={<Storie />} />
        <Route path="/storie" element={<Storie />} />

        {/* Country comparison */}
        <Route path="/compare" element={<CountryComparison />} />
        <Route
          path="/countrycomparison"
          element={<CountryComparison />}
        />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route
          path="/register/student"
          element={<StudentRegister />}
        />
        <Route
          path="/register/agency"
          element={<AgencyRegister />}
        />
        <Route path="/admin-register" element={<AdminRegister />} />

        {/* Agency application status */}
        <Route
          path="/agency/application-status"
          element={<AgencyApplicationStatus />}
        />

        {/* Admin dashboard */}
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>

      {!isAdminRoute && showFooter && <Footer />}
    </div>
  )
}
