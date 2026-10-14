
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from '../components/admin/AdminSidebar'
import AdminTopbar from '../components/admin/AdminTopbar'

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#F0F7F5]">
      <div className="hidden lg:block">
        <AdminSidebar />
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close sidebar"
            onClick={() => setSidebarOpen(false)}
            className="absolute inset-0 bg-black/40"
          />
          <div className="relative h-full w-64">
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="absolute right-2 top-3 z-50 rounded bg-white/10 px-2 py-1 text-white"
            >
              Close
            </button>
            <AdminSidebar />
          </div>
        </div>
      )}

      <div className="min-h-screen lg:pl-56">
        <AdminTopbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="mx-auto w-full max-w-[1800px] p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
