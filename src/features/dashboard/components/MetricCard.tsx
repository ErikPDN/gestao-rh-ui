import { NavLink } from 'react-router-dom'

interface MetricCardProps {
  label: string
  value: number | string
  helperText?: string
  navlink: string
}

export const MetricCard = ({ label, value, helperText, navlink }: MetricCardProps) => {
  return (
    <NavLink
      to={navlink}
      className="bg-background cursor-pointer rounded-lg border border-zinc-300 p-5"
    >
      <p className="text-sm text-zinc-500">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
      <p className="mt-1 text-xs text-zinc-400">{helperText}</p>
    </NavLink>
  )
}
