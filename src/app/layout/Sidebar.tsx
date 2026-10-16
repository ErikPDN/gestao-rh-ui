import { SidebarFooter } from '../../components/SidebarFooter'
import { Logomark } from '../../components/Logomark'
import { Menu } from '../../components/Menu'
import { ConfirmDialog } from '../../components/ConfirmDialog'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLogoutMutation } from '../../features/login/hooks/useLogoutMutation'

export default function SidebarLayout() {
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false)
  const navigate = useNavigate()
  const { mutate: logout, isPending } = useLogoutMutation()

  const handleLogout = () => {
    logout()
    setIsLogoutDialogOpen(false)
    navigate('/login', { replace: true })
  }

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-zinc-300 bg-zinc-100 py-5">
      <Logomark />

      <Menu />

      <SidebarFooter onLogout={() => setIsLogoutDialogOpen(true)} />

      <ConfirmDialog
        open={isLogoutDialogOpen}
        onCancel={() => setIsLogoutDialogOpen(false)}
        title="Sair do sistema"
        description="Tem certeza que deseja sair do sistema?"
        confirmButtonText="Sair"
        cancelButtonText="Cancelar"
        onConfirm={handleLogout}
        isLoading={isPending}
        variant="secondary"
      />
    </aside>
  )
}
