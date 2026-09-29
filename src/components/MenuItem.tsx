import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

interface MenuItemProps {
  to: string
  icon: ReactNode
  label: string
}

export const MenuItem = ({ to, icon, label }: MenuItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-200 ${
          isActive ? 'bg-zinc-200 text-zinc-900' : ''
        }`
      }
    >
      {icon}
      {label}
    </NavLink>
  )
}
