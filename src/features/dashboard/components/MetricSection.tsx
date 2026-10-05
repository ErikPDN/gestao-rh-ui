import { formatCurrency } from '../../../lib/utils/currency-formatter'
import { MetricCard } from './MetricCard'
import { MetricSkeletonLayout } from './MetricSkeletonLayout'

interface MetricSectionProps {
  funcionariosAtivos: number
  departamentosAtivos: number
  funcionariosDesligados: number
  departamentosCadastrados: number
  cargosAtivos: number
  folhaSalarialMensal: number
  isLoading: boolean
}

export const MetricSection = ({
  funcionariosAtivos,
  departamentosAtivos,
  funcionariosDesligados,
  departamentosCadastrados,
  cargosAtivos,
  folhaSalarialMensal,
  isLoading,
}: MetricSectionProps) => {
  return (
    <>
      {isLoading ? (
        <MetricSkeletonLayout />
      ) : (
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            label="Funcionários ativos"
            value={funcionariosAtivos}
            helperText={`${funcionariosDesligados} desligados`}
            navlink="/funcionarios"
          />
          <MetricCard
            label="Departamentos ativos"
            value={departamentosAtivos}
            helperText={`de ${departamentosCadastrados} cadastrados`}
            navlink="/departamentos"
          />
          <MetricCard
            label="Cargos"
            value={cargosAtivos}
            helperText={`em ${departamentosAtivos} departamentos`}
            navlink="/departamentos"
          />
          <MetricCard
            label="Folha salarial mensal"
            value={formatCurrency(folhaSalarialMensal)}
            helperText="soma dos salários ativos"
            navlink="/funcionarios"
          />
        </div>
      )}
    </>
  )
}
