import { StatusFuncionario } from '../types'

interface BadgeStatusFuncionarioProps {
  status: StatusFuncionario
}

export const BadgeStatusFuncionario = ({ status }: BadgeStatusFuncionarioProps) => {
  return (
    <div
      className={`flex w-fit items-center justify-center gap-2 rounded-md px-2 py-1 ${status === StatusFuncionario.ATIVO ? 'bg-green-50' : 'bg-zinc-100'}`}
    >
      <span
        className={`h-2 w-2 rounded-full ${status === StatusFuncionario.ATIVO ? 'bg-green-600' : 'bg-zinc-500'}`}
      />
      <span
        className={`text-xs font-medium ${status === StatusFuncionario.ATIVO ? 'text-green-600' : 'text-zinc-500'}`}
      >
        {status}
      </span>
    </div>
  )
}
