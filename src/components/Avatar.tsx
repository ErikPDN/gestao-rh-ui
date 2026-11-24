interface AvatarProps {
  funcionarioNome?: string
  avatarUrl?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export const Avatar = ({ funcionarioNome, avatarUrl, size = 'md' }: AvatarProps) => {
  funcionarioNome = funcionarioNome?.trim() || 'Sem Nome'

  const iniciais = funcionarioNome
    .split(' ')
    .map((name) => name[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  const sizeClasses = {
    sm: 'w-9 h-9 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base',
    xl: 'w-24 h-24 text-lg',
  }

  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={funcionarioNome}
        className={`rounded-full object-cover ${sizeClasses[size]}`}
      />
    )
  }

  return (
    <div
      className={`flex items-center justify-center rounded-full bg-zinc-900 font-medium text-white ${sizeClasses[size]}`}
    >
      {iniciais}
    </div>
  )
}
