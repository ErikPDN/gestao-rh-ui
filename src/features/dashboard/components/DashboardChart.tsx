import { NavLink } from 'react-router-dom'

interface DepartmentData {
  name: string
  value: number
}

const data: DepartmentData[] = [
  { name: 'Tecnologia da Informação', value: 6 },
  { name: 'Comercial', value: 4 },
  { name: 'Recursos Humanos', value: 3 },
  { name: 'Financeiro', value: 3 },
]

export const DashboardChart = () => {
  const max = Math.max(...data.map((d) => d.value))

  return (
    <div className="flex flex-col gap-1">
      {data.map((dept) => (
        <NavLink
          key={dept.name}
          to={`/departamentos/${encodeURIComponent(dept.name)}`}
          className="flex items-center gap-3 rounded-md p-2 transition-colors hover:bg-gray-200"
        >
          <span className="w-36 shrink-0 text-xs text-zinc-800">{dept.name}</span>
          <div className="h-4 flex-1 rounded bg-zinc-100">
            <div
              className="h-4 rounded bg-blue-600"
              style={{ width: `${(dept.value / max) * 100}%` }}
            />
          </div>
          <span className="w-6 shrink-0 text-right text-xs text-zinc-800">{dept.value}</span>
        </NavLink>
      ))}
    </div>
  )
}
