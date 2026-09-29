import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

export default function MainLayout() {
  return (
    <div className="bg-background flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />

        <main className="scrollbar-hidden mx-14 my-6 flex-1 overflow-y-auto py-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
