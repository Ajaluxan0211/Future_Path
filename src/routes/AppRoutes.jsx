import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Home from '../pages/Home/Home'

// Page imports:
import CourseApply from '../pages/Courses/CourseApply'
import Countries from '../pages/Countries/Countries'
import Visas from '../pages/Visas/Visas'
import Courses from '../pages/Courses/Courses'
import Universities from '../pages/Universities/Universities'
import EligibilityChecker from '../pages/EligibilityChecker/EligibilityChecker'

// Only these 3 pages show the footer
const FOOTER_ROUTES = ['/', '/countries', '/visas']

export default function AppRoutes() {
  const { pathname } = useLocation()
  const showFooter = FOOTER_ROUTES.includes(pathname)

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/countries" element={<Countries />} /> 
          <Route path="/visas" element={<Visas />} /> 
          <Route path="/courses" element={<Courses />} /> 
          <Route path="/courses/:id/apply" element={<CourseApply />} />
          <Route path="/universities" element={<Universities />} /> 
          <Route path="/eligibility" element={<EligibilityChecker />} /> 
        </Routes>
      </main>

      {/* Footer shows ONLY on: Home (/), Countries (/countries), Visas (/visas) */}
      {showFooter && <Footer />}
    </div>
  )
}