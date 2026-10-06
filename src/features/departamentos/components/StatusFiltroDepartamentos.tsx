import { useState } from 'react'
import { StatusDepartamento } from '../types/status-departamento'

interface StatusFiltroDepartamentoProps {
  onStatusChange: (status?: string) => void
}

const OPCOES: { label: string; value?: StatusDepartamento }[] = [
  { label: 'Todos', value: undefined },
  { label: 'Ativos', value: StatusDepartamento.ATIVO },
  { label: 'Inativos', value: StatusDepartamento.INATIVO },
]

export const StatusFiltroDepartamento = ({ onStatusChange }: StatusFiltroDepartamentoProps) => {
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
              onStatusChange(value)
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
