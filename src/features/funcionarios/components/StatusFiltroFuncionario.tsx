import { useState } from 'react'
import { StatusFuncionario } from '../types/status-funcionario'

interface StatusFiltroFuncionarioProps {
  onStatusChange?: (status?: StatusFuncionario) => void
}

const OPCOES: { label: string; value?: StatusFuncionario }[] = [
  { label: 'Todos', value: undefined },
  { label: 'Ativos', value: StatusFuncionario.ATIVO },
  { label: 'Desligados', value: StatusFuncionario.DESLIGADO },
]

export const StatusFiltroFuncionario = ({ onStatusChange }: StatusFiltroFuncionarioProps) => {
  const [selectedLabel, setSelectedLabel] = useState(OPCOES[0].label)

  return (
    <div className="flex rounded-md bg-zinc-200">
      {OPCOES.map(({ label, value }) => {
        const isSelected = selectedLabel === label
        return (
          <button
            key={label}
            onClick={() => {
              setSelectedLabel(label)
              onStatusChange?.(value)
            }}
            className={`m-0.5 flex-1 cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-75 ${isSelected ? 'bg-background text-zinc-900' : 'text-zinc-700'}`}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
