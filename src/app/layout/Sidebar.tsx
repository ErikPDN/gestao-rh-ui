import { SidebarFooter } from '../../components/SidebarFooter'
import { Logomark } from '../../components/Logomark'
import { Menu } from '../../components/Menu'

export default function SidebarLayout() {
  return (
    <aside className="flex h-screen w-64 flex-col border-r border-zinc-300 bg-zinc-100 py-5">
      <Logomark />

      <Menu />

      <SidebarFooter />
    </aside>
  )
}
