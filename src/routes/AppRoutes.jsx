import { Routes, Route } from 'react-router-dom'
import Navbar              from '../components/Navbar'
import Footer              from '../components/Footer'
import Home               from '../pages/Home/Home'
import Explore            from '../pages/Explore/Explore'
import Countries          from '../pages/Countries/Countries'


function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Pages — includes Navbar & Footer */}
      <Route path="/"                       element={<PublicLayout><Home /></PublicLayout>}               />
      <Route path="/explore"                element={<PublicLayout><Explore /></PublicLayout>}            />
      <Route path="/countries"              element={<PublicLayout><Countries /></PublicLayout>}          />
     
      
    </Routes>
  )
}