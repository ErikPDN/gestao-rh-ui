import { Layers, LayoutDashboard, User } from 'lucide-react'
import { MenuItem } from './MenuItem'

export const Menu = () => {
  return (
    <nav className="mt-10 px-4">
      <ul className="space-y-1">
        <li>
          <MenuItem
            to="/dashboard"
            icon={<LayoutDashboard className="mb-0.5 h-5 w-5 text-zinc-400" />}
            label="Dashboard"
          />
        </li>
        <li>
          <MenuItem
            to="/funcionarios"
            icon={<User className="mb-0.5 h-5 w-5 text-zinc-400" />}
            label="Funcionários"
          />
        </li>
        <li>
          <MenuItem
            to="/departamentos"
            icon={<Layers className="mb-0.5 h-5 w-5 text-zinc-400" />}
            label="Departamentos"
          />
        </li>
      </ul>
    </nav>
  )
}
