
import { Routes, Route, useLocation } from 'react-router-dom'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

// Main pages
import Home from '../pages/Home/Home'
import Countries from '../pages/Countries/Countries'
import Visas from '../pages/Visas/Visas'
import Courses from '../pages/Courses/Courses'
import Universities from '../pages/Universities/Universities'

// Course pages
import CourseApply from '../pages/Courses/CourseApply'

// Other pages
import EligibilityChecker from '../pages/EligibilityChecker/EligibilityChecker'
import Scholarships from '../pages/Scholarships/Scholarships'
import CountryComparison from '../pages/CountryComparison/CountryComparison'

// Agency pages
import Agencies from '../pages/Agencies/Agencies'
import AgencyProfile from '../pages/AgencyProfile/AgencyProfile'
import AgencyContact from '../pages/AgencyContact/AgencyContact'

// Scholarship pages
import ScholarshipDetail from '../pages/ScholarshipDetail/ScholarshipDetail'
import ScholarshipApply from '../pages/ScholarshipApply/ScholarshipApply'

// Stories and scam reporting
import ReportScam from '../pages/ReportScam/ReportScam'
import Storie from '../pages/Storie/Storie'
import SignUp from '../pages/Auth/Signup'
import StudentRegister from '../pages/Auth/StudentRegister'

// Pages that display the footer
const FOOTER_ROUTES = [
  '/',
  '/countries',
  '/visas',
  '/stories',
  '/storie',
  '/report',
  '/report-scam',
]

export default function AppRoutes() {
  const { pathname } = useLocation()

  const showFooter = FOOTER_ROUTES.includes(pathname)

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Countries and visas */}
          <Route path="/countries" element={<Countries />} />
          <Route path="/visas" element={<Visas />} />

          {/* Courses */}
          <Route path="/courses" element={<Courses />} />
          <Route
            path="/courses/:id/apply"
            element={<CourseApply />}
          />

          {/* Universities */}
          <Route
            path="/universities"
            element={<Universities />}
          />
          <Route
            path="/universities/:id"
            element={<Universities />}
          />

          {/* Eligibility checker */}
          <Route
            path="/eligibility"
            element={<EligibilityChecker />}
          />

          {/* Scholarships */}
          <Route
            path="/scholarships"
            element={<Scholarships />}
          />
          <Route
            path="/scholarships/:id/apply"
            element={<ScholarshipApply />}
          />
          <Route
            path="/scholarships/:id"
            element={<ScholarshipDetail />}
          />

          {/* Country comparison */}
          <Route
            path="/compare"
            element={<CountryComparison />}
          />
          <Route
            path="/countrycomparison"
            element={<CountryComparison />}
          />

          {/* Agencies */}
          <Route path="/agencies" element={<Agencies />} />
          <Route
            path="/agencies/:id/contact"
            element={<AgencyContact />}
          />
          <Route
            path="/agencies/:id"
            element={<AgencyProfile />}
          />

          {/* Scam reporting */}
          <Route path="/report" element={<ReportScam />} />
          <Route
            path="/report-scam"
            element={<ReportScam />}
          />

          {/* Stories */}
          <Route path="/stories" element={<Storie />} />

          {/* Keep the old URL working */}
          <Route path="/storie" element={<Storie />} />
          <Route path="/register" element={<SignUp />} />
          <Route
  path="/register/student"
  element={<StudentRegister />}
/>
          

          {/* Login and registration routes can be added here
              when their page components are available. */}
        </Routes>
      </main>

      {showFooter && <Footer />}
    </div>
  )
}
