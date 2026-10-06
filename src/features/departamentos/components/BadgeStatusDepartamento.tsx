import { StatusDepartamento } from '../types/status-departamento'

interface BadgeStatusDepartamentoProps {
  status: StatusDepartamento
}

export const BadgeStatusDepartamento = ({ status }: BadgeStatusDepartamentoProps) => {
  return (
    <div
      className={`flex items-center justify-center gap-2 rounded-md px-2 py-1 ${status === StatusDepartamento.ATIVO ? 'bg-green-50' : 'bg-zinc-100'}`}
    >
      <span
        className={`h-2 w-2 rounded-full ${status === StatusDepartamento.ATIVO ? 'bg-green-600' : 'bg-zinc-500'}`}
      />
      <span
        className={`text-xs font-medium ${status === StatusDepartamento.ATIVO ? 'text-green-700' : 'text-zinc-500'}`}
      >
        {status}
      </span>
    </div>
  )
}
