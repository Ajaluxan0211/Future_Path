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

          {/* Home */}
          <Route
            path="/"
            element={<Home />}
          />

          {/* Countries */}
          <Route
            path="/countries"
            element={<Countries />}
          />

          {/* Visas */}
          <Route
            path="/visas"
            element={<Visas />}
          />

          {/* Courses */}
          <Route
            path="/courses"
            element={<Courses />}
          />

          {/* Course Apply */}
          <Route
            path="/courses/:id/apply"
            element={<CourseApply />}
          />

          {/* Universities */}
          <Route
            path="/universities"
            element={<Universities />}
          />

          {/* Eligibility */}
          <Route
            path="/eligibility"
            element={<EligibilityChecker />}
          />

          {/* Scholarships */}
          <Route
            path="/scholarships"
            element={<Scholarships />}
          />

          {/* Country Comparison */}
          <Route
            path="/compare"
            element={<CountryComparison />}
          />

          <Route
            path="/countrycomparison"
            element={<CountryComparison />}
          />

          {/* ========================= */}
          {/* AGENCY ROUTES */}
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