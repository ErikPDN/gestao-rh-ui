import { Outlet } from 'react-router-dom'
import SidebarLayout from './Sidebar'

export default function MainLayout() {
  return (
    <div className="bg-background flex h-screen overflow-hidden">
      <SidebarLayout />

      <main className="mx-14 my-6 flex-1 overflow-y-auto py-6">
        <Outlet />
      </main>
    </div>
  )
}
