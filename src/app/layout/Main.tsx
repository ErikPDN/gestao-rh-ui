import SidebarLayout from './Sidebar'

interface MainLayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="bg-background flex h-screen overflow-hidden">
      <SidebarLayout />

      <main className="flex-1 overflow-y-auto p-6">{children}</main>
    </div>
  )
}
