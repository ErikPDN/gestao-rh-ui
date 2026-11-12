import { NivelCargo } from '../../funcionarios/types/nivel-cargo'

interface NivelCargoSelectorProps {
  value?: NivelCargo
  onChange: (nivel?: NivelCargo) => void
}

const NIVEIS: { label: string; value?: NivelCargo }[] = [
  { label: 'Nenhum', value: undefined },
  { label: 'Trainee', value: NivelCargo.TRAINEE },
  { label: 'Júnior', value: NivelCargo.JUNIOR },
  { label: 'Pleno', value: NivelCargo.PLENO },
  { label: 'Sênior', value: NivelCargo.SENIOR },
  { label: 'Especialista', value: NivelCargo.ESPECIALISTA },
]

export const NivelCargoSelector = ({ value, onChange }: NivelCargoSelectorProps) => {
  return (
    <div role="radiogroup" aria-labelledby="nivel-label">
      {NIVEIS.map(({ label, value: nivel }) => {
        const isSelected = value === nivel
        return (
          <button
            type="button"
            role="radio"
            aria-checked={isSelected}
            key={label}
            onClick={() => onChange(nivel)}
            className={`m-0.5 cursor-pointer rounded-md border border-zinc-300 px-3 py-1.5 text-sm font-medium transition-colors duration-75 ${isSelected ? 'bg-zinc-800 text-white' : 'bg-background text-zinc-500'}`}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
