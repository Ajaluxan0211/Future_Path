import { Routes, Route } from 'react-router-dom'
import Navbar  from '../components/Navbar'
import Footer  from '../components/Footer'
import Home    from '../pages/Home/Home'

export default function AppRoutes() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}