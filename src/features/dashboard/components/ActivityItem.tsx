import { NavLink } from 'react-router-dom'
import { Avatar } from '../../../components/Avatar'

interface ActivityItemProps {
  id: string
  nome: string
  departamento: string
  cargo: string
  dataAdmissao: Date
  avatarUrl?: string
}

export const ActivityItem = ({
  id,
  nome,
  departamento,
  cargo,
  dataAdmissao,
  avatarUrl,
}: ActivityItemProps) => {
  return (
    <NavLink
      to={`/funcionarios/${id}`}
      className="flex items-center gap-2 rounded-md p-2 transition-colors hover:bg-gray-200"
    >
      <Avatar funcionarioNome={nome} avatarUrl={avatarUrl} size="sm" />
      <div className="ml-1 flex flex-col">
        <span className="text-sm font-medium text-zinc-800">{nome}</span>
        <span className="text-xs text-zinc-500">
          {departamento} - {cargo}
        </span>
      </div>

      <div className="ml-auto text-xs">{dataAdmissao.toLocaleDateString('pt-BR')}</div>
    </NavLink>
  )
}
