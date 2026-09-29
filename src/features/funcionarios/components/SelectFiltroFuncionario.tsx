import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

interface SelectFiltroFuncionarioProps {
  departamentoOptions: string[]
}

const departamentoOptions = [
  'Todos os departamentos',
  'Tecnologia da Informação',
  'Recursos Humanos',
  'Financeiro',
  'Comercial',
  'Jurídico',
]

export const SelectFiltroFuncionario = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(departamentoOptions[0])

  const handleSelect = (departamento: string) => {
    setSelectedOption(departamento)
    setIsOpen(false)
  }

  return (
    <div className="relative w-60">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="bg-background flex h-10 w-full cursor-pointer items-center justify-between rounded-lg border border-zinc-200 px-3 text-zinc-700 transition hover:border-zinc-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
      >
        <span className="truncate text-sm">{selectedOption}</span>

        <ChevronDown
          size={16}
          className={`shrink-0 text-zinc-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 z-50 mt-1 w-full rounded-lg border border-zinc-200 bg-white p-1 shadow-lg">
          {departamentoOptions.map((departamento) => {
            const isSelected = selectedOption === departamento

            return (
              <button
                key={departamento}
                type="button"
                onClick={() => handleSelect(departamento)}
                className="flex w-full cursor-pointer items-center justify-between rounded-md px-3 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-100"
              >
                <span className="text-sm">{departamento}</span>

                {isSelected && <span className="text-blue-500">✓</span>}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
