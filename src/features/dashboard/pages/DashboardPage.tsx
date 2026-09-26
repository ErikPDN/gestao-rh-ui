import { DashboardSection } from '../components/DashboardSection'
import { MetricSection } from '../components/MetricSection'

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-sm text-zinc-500">
        Visão geral do quadro de funcionários e da folha de pagamento
      </p>
      <MetricSection />
      <DashboardSection />
    </div>
  )
}
