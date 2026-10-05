import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

interface SelectOption {
  id: string
  nome: string
}

interface SelectFieldProps {
  id: string
  label: string
  options: SelectOption[]
  value: string
  onChange: (id: string) => void
  placeholder: string
  disabled?: boolean
  error?: string
}

export const SelectField = ({
  id,
  label,
  options,
  value,
  onChange,
  placeholder,
  disabled,
  error,
}: SelectFieldProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const selected = options.find((option) => option.id === value)

  const handleSelect = (optionId: string) => {
    onChange(optionId)
    setIsOpen(false)
  }

  return (
    <div className="relative w-full">
      <label htmlFor={id} className="text-sm font-medium text-zinc-700">
        {label}
      </label>
      <button
        type="button"
        id={id}
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className="bg-background flex h-10 w-full cursor-pointer items-center justify-between rounded-lg border border-zinc-200 px-3 text-zinc-700 transition hover:border-zinc-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span className={`truncate text-sm ${selected ? '' : 'text-zinc-400'}`}>
          {selected?.nome ?? placeholder}
        </span>
        <ChevronDown
          size={16}
          className={`shrink-0 text-zinc-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div className="bg-background absolute top-full left-0 z-50 mt-1 w-full rounded-lg border border-zinc-200 p-1 shadow-lg">
          {options.length === 0 && <p className="px-3 py-2 text-sm text-zinc-400">Sem opções</p>}
          {options.map((option) => (
            <button
              type="button"
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className="flex w-full cursor-pointer items-center justify-between rounded-md px-3 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-100"
            >
              <span className="text-sm">{option.nome}</span>
              {option.id === value && <span className="text-blue-500">✓</span>}
            </button>
          ))}
        </div>
      )}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  )
}
