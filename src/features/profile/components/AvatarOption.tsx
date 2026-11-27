import type { ReactNode } from 'react'

interface AvatarOptionProps {
  icon: ReactNode
  label: string
  onClick: () => void
  disabled?: boolean
}

export const AvatarOption = ({ icon, label, onClick, disabled }: AvatarOptionProps) => {
  return (
    <button
      type="button"
      className="text-muted-foreground hover:bg-muted hover:text-foreground flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-sm transition-colors duration-150 disabled:opacity-50"
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
      {label}
    </button>
  )
}
