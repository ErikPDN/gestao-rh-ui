import { MetricCard } from './MetricCard'

export const MetricSection = () => {
  return (
    <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <MetricCard label="Funcionários ativos" value="16" helperText="2 desligados" />
      <MetricCard label="Departamentos ativos" value="4" helperText="de 5 cadastrados" />
      <MetricCard label="Cargos" value="11" helperText="em 4 departamentos" />
      <MetricCard
        label="Folha salarial mensal"
        value="R$ 161.300,00"
        helperText="soma dos salários ativos"
      />
    </div>
  )
}
