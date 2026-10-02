import { NavLink } from 'react-router-dom'
import { DashboardCard } from './DashboardCard'
import { ActivityItem } from './ActivityItem'
import { DashboardChart } from './DashboardChart'
import type { Admissoes } from '../types/admissoes.interface'
import type { FuncionarioDepartamento } from '../types/funcionario-departamento'
import { DashboardSkeleton } from './DashboardSkeleton'

interface DashboardSectionProps {
  funcionariosPorDepartamento: FuncionarioDepartamento[]
  admissoesRecentes: Admissoes[]
  isLoading?: boolean
}

export const DashboardSection = ({
  admissoesRecentes,
  funcionariosPorDepartamento,
  isLoading,
}: DashboardSectionProps) => {
  return (
    <>
      {!isLoading ? (
        <DashboardSkeleton />
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <DashboardCard title="Funcionários por departamento">
            <DashboardChart funcionarioPorDepartamento={funcionariosPorDepartamento} />
          </DashboardCard>

          <DashboardCard
            title="Adimissões recentes"
            action={
              <NavLink
                to="/funcionarios"
                className="text-accent mr-2 text-xs font-medium hover:underline"
              >
                Ver todos
              </NavLink>
            }
          >
            <ul className="flex flex-col">
              {admissoesRecentes.map((funcionario) => (
                <ActivityItem
                  key={funcionario.funcionarioId}
                  id={funcionario.funcionarioId}
                  nome={funcionario.funcionarioNome}
                  departamento={funcionario.departamentoNome}
                  cargo={funcionario.cargoNome}
                  dataAdmissao={funcionario.dataAdmissao}
                />
              ))}
            </ul>
          </DashboardCard>
        </div>
      )}
    </>
  )
}
