import { Routes, Route, useLocation } from 'react-router-dom'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import Home from '../pages/Home/Home'

import CourseApply from '../pages/Courses/CourseApply'
import Countries from '../pages/Countries/Countries'
import Visas from '../pages/Visas/Visas'
import Courses from '../pages/Courses/Courses'
import Universities from '../pages/Universities/Universities'
import EligibilityChecker from '../pages/EligibilityChecker/EligibilityChecker'
import Scholarships from '../pages/Scholarships/Scholarships'
import CountryComparison from '../pages/CountryComparison/CountryComparison'

import Agencies from '../pages/Agencies/Agencies'
import AgencyProfile from '../pages/AgencyProfile/AgencyProfile'
import AgencyContact from '../pages/AgencyContact/AgencyContact'

import ScholarshipDetail from '../pages/ScholarshipDetail/ScholarshipDetail'
import ScholarshipApply from '../pages/ScholarshipApply/ScholarshipApply'

// Only these pages show the footer
const FOOTER_ROUTES = [
  '/',
  '/countries',
  '/visas',
]

export default function AppRoutes() {
  const { pathname } = useLocation()

  const showFooter = FOOTER_ROUTES.includes(pathname)

  return (
    <div className="min-h-screen flex flex-col bg-white">

      <Navbar />

      <main className="flex-1">
        <Routes>

          {/* ========================= */}
          {/* HOME */}
          {/* ========================= */}

          <Route
            path="/"
            element={<Home />}
          />


          {/* ========================= */}
          {/* COUNTRIES */}
          {/* ========================= */}

          <Route
            path="/countries"
            element={<Countries />}
          />


          {/* ========================= */}
          {/* VISAS */}
          {/* ========================= */}

          <Route
            path="/visas"
            element={<Visas />}
          />


          {/* ========================= */}
          {/* COURSES */}
          {/* ========================= */}

          <Route
            path="/courses"
            element={<Courses />}
          />

          <Route
            path="/courses/:id/apply"
            element={<CourseApply />}
          />


          {/* ========================= */}
          {/* UNIVERSITIES */}
          {/* ========================= */}

          <Route
            path="/universities"
            element={<Universities />}
          />


          {/* ========================= */}
          {/* ELIGIBILITY */}
          {/* ========================= */}

          <Route
            path="/eligibility"
            element={<EligibilityChecker />}
          />


          {/* ========================= */}
          {/* SCHOLARSHIPS */}
          {/* ========================= */}

          {/* Scholarships */}
<Route
  path="/scholarships"
  element={<Scholarships />}
/>

{/* Scholarship Detail */}
<Route
  path="/scholarships/:id"
  element={<ScholarshipDetail />}
/>

{/* Scholarship Apply */}
<Route
  path="/scholarships/:id/apply"
  element={<ScholarshipApply />}
/>


          {/* ========================= */}
          {/* COUNTRY COMPARISON */}
          {/* ========================= */}

          <Route
            path="/compare"
            element={<CountryComparison />}
          />

          <Route
            path="/countrycomparison"
            element={<CountryComparison />}
          />


          {/* ========================= */}
          {/* AGENCIES */}
          {/* ========================= */}

          {/* Agency Directory */}
          <Route
            path="/agencies"
            element={<Agencies />}
          />

          {/* Agency Profile */}
          <Route
            path="/agencies/:id"
            element={<AgencyProfile />}
          />

          {/* Agency Contact */}
          <Route
            path="/agencies/:id/contact"
            element={<AgencyContact />}
          />

        </Routes>
      </main>

      {/* Footer only on Home, Countries and Visas */}
      {showFooter && <Footer />}

    </div>
  )
}