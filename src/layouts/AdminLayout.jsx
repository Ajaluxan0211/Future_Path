
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from '../components/admin/AdminSidebar'
import AdminTopbar from '../components/admin/AdminTopbar'

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F0F7F4]">
      {/* Desktop sidebar */}
      <div className="hidden h-full shrink-0 lg:flex">
        <AdminSidebar />
      </div>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <button
            type="button"
            aria-label="Close sidebar"
            onClick={() => setSidebarOpen(false)}
            className="absolute inset-0 bg-black/40"
          />
          <div className="relative z-10 h-full">
            <AdminSidebar />
          </div>
        </div>
      )}

      {/* Main area */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <AdminTopbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="admin-main-scroll min-h-0 flex-1 overflow-y-auto">
          <div className="min-h-full p-4 sm:p-5 lg:p-7">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
