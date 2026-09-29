import { useState } from 'react'

export const StatusFiltroFuncionario = () => {
  const status = ['Todos', 'Ativos', 'Desligados']
  const [selectedStatus, setSelectedStatus] = useState(status[0])

  return (
    <div className="flex rounded-md bg-zinc-200">
      {status.map((s) => {
        const isSelected = s === selectedStatus
        return (
          <button
            key={s}
            onClick={() => setSelectedStatus(s)}
            className={`m-0.5 flex-1 cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-75 ${isSelected ? 'bg-background text-zinc-900' : 'text-zinc-700'}`}
          >
            {s}
          </button>
        )
      })}
    </div>
  )
}
