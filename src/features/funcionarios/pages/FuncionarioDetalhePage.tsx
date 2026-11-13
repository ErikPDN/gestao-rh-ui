import { NavLink, useParams } from 'react-router-dom'
import { BadgeStatusFuncionario } from '../components/BadgeStatusFuncionario'
import { useGetFuncionarioQuery } from '../hooks/useGetFuncionarioQuery'
import { statusToStatusFuncionario } from '../../../lib/utils/status-to-status-funcionario'
import { Dot } from 'lucide-react'
import { Avatar } from '../../../components/Avatar'

export default function FuncionarioDetalhePage() {
  const { id: funcionarioId } = useParams()

  const { data: funcionario, isLoading, isError } = useGetFuncionarioQuery(funcionarioId as string)

  return (
    <div className="flex flex-1 flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar funcionarioNome={funcionario?.nome || ''} size="lg" />
          <div className="flex flex-col space-y-1.5">
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold">{funcionario?.nome}</h1>
              <span>
                <BadgeStatusFuncionario
                  status={statusToStatusFuncionario(funcionario?.dataDemissao || null)}
                />
              </span>
            </div>

            <div className="flex items-center gap-1">
              <span className="text-sm text-zinc-500">{funcionario?.cargo}</span>
              <Dot size={14} />
              <NavLink to={`/departamentos/${funcionario?.departamentoId}`}>
                <span className="text-accent cursor-pointer text-sm">
                  {funcionario?.departamento}
                </span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
