import { Routes, Route } from 'react-router-dom'
import Navbar              from '../components/Navbar'
import Home               from '../pages/Home/Home'
import Explore            from '../pages/Explore/Explore'
import Countries          from '../pages/Countries/Countries'
import Visas              from '../pages/Visas/Visas'
import EligibilityChecker from '../pages/EligibilityChecker/EligibilityChecker'


function WithNav({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">{children}</main>
    </div>
  )
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Pages with Navbar */}
      <Route path="/"                       element={<WithNav><Home /></WithNav>}               />
      <Route path="/explore"                element={<WithNav><Explore /></WithNav>}            />
      <Route path="/countries"              element={<WithNav><Countries /></WithNav>}          />
      <Route path="/visas"                  element={<WithNav><Visas /></WithNav>}              />
      <Route path="/eligibility"            element={<WithNav><EligibilityChecker /></WithNav>} />

    </Routes>
  )
}