import { NavLink } from 'react-router-dom'
import type { FuncionarioDepartamento } from '../types'

interface DashboardChartProps {
  funcionarioPorDepartamento: FuncionarioDepartamento[]
}

export const DashboardChart = ({ funcionarioPorDepartamento }: DashboardChartProps) => {
  const max = Math.max(...funcionarioPorDepartamento.map((d) => d.quantidadeFuncionarios))

  return (
    <div className="flex flex-col gap-1">
      {funcionarioPorDepartamento.map((dept) => (
        <NavLink
          key={dept.departamentoNome}
          to={`/departamentos/${encodeURIComponent(dept.departamentoNome)}`}
          className="flex items-center gap-3 rounded-md p-2 transition-colors hover:bg-gray-200"
        >
          <span className="w-36 shrink-0 text-xs text-zinc-800">{dept.departamentoNome}</span>
          <div className="h-4 flex-1 rounded bg-zinc-100">
            <div
              className="h-4 rounded bg-blue-600"
              style={{ width: `${(dept.quantidadeFuncionarios / max) * 100}%` }}
            />
          </div>
          <span className="w-6 shrink-0 text-right text-xs text-zinc-800">
            {dept.quantidadeFuncionarios}
          </span>
        </NavLink>
      ))}
    </div>
  )
}
