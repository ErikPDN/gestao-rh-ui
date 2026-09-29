import { DashboardSection } from '../components/DashboardSection'
import { MetricSection } from '../components/MetricSection'
import { useGetDashboard } from '../hooks'

export default function DashboardPage() {
  const { data: dashboardData, isLoading, isError } = useGetDashboard() // TODO: Add toast notification

  return (
    <div className="flex flex-1 flex-col">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-sm text-zinc-500">
        Visão geral do quadro de funcionários e da folha de pagamento
      </p>
      <MetricSection
        isLoading={isLoading}
        funcionariosAtivos={dashboardData?.funcionariosAtivos ?? 0}
        departamentosAtivos={dashboardData?.departamentosAtivos ?? 0}
        funcionariosDesligados={dashboardData?.funcionariosDesligados ?? 0}
        departamentosCadastrados={dashboardData?.departamentosCadastrados ?? 0}
        cargosAtivos={dashboardData?.cargosAtivos ?? 0}
        folhaSalarialMensal={dashboardData?.folhaSalarialMensal ?? 0}
      />
      <DashboardSection
        admissoesRecentes={dashboardData?.admissoesRecentes ?? []}
        funcionariosPorDepartamento={dashboardData?.funcionariosPorDepartamento ?? []}
      />
    </div>
  )
}
