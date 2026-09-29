import { type ReactNode } from 'react'

interface DashboardCardProps {
  title: string
  action?: ReactNode
  children: ReactNode
}

export const DashboardCard = ({ title, action, children }: DashboardCardProps) => {
  return (
    <div className="bg-background rounded-lg border border-zinc-300 p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold">{title}</h3>
        {action ?? <span className="text-xs text-zinc-400">{action}</span>}
      </div>
      {children}
    </div>
  )
}
