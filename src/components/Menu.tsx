import { Layers, LayoutDashboard, User } from 'lucide-react'
import { MenuItem } from './MenuItem'
import { useAuth } from '../hooks/useAuth'
import { LIST_ACCESS_ROLES } from '../constants/access'
import type { Role } from '../types/usuario.interface'

interface MenuItemConfig {
  to: string
  label: string
  icon: React.ReactNode
  allowedRoles?: Role[]
}

const menuItems: MenuItemConfig[] = [
  {
    to: '/dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard className="mb-0.5 h-5 w-5 text-zinc-400" />,
  },
  {
    to: '/funcionarios',
    label: 'Funcionários',
    icon: <User className="mb-0.5 h-5 w-5 text-zinc-400" />,
    allowedRoles: LIST_ACCESS_ROLES,
  },
  {
    to: '/departamentos',
    label: 'Departamentos',
    icon: <Layers className="mb-0.5 h-5 w-5 text-zinc-400" />,
    allowedRoles: LIST_ACCESS_ROLES,
  },
]

export const Menu = () => {
  const { hasAnyRole } = useAuth()

  const visibleItems = menuItems.filter(
    (item) => !item.allowedRoles || hasAnyRole(item.allowedRoles),
  )

  return (
    <nav className="mt-10 px-4">
      <ul className="space-y-1">
        {visibleItems.map((item) => (
          <li key={item.to}>
            <MenuItem to={item.to} icon={item.icon} label={item.label} />
          </li>
        ))}
      </ul>
    </nav>
  )
}
