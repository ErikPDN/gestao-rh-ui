import { Search } from 'lucide-react'
import { useState, type ChangeEvent } from 'react'

interface SearchBarDepartamentosProps {
  onSearch: (searchTerm: string) => void
}

export const SearchBarDepartamentos = ({ onSearch }: SearchBarDepartamentosProps) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    onSearch?.(value)
  }

  return (
    <div className="relative max-w-md">
      <Search
        size={12}
        className="text-zinc absolute top-1/2 left-4 -translate-y-1/2 text-zinc-400"
      />

      <input
        type="text"
        aria-label="Search"
        placeholder="Nome do Gestor ou Departamento"
        value={searchTerm}
        onChange={handleSearchChange}
        className="bg-background w-80 rounded-lg border border-zinc-300 py-2 pr-4 pl-10 text-sm leading-none outline-none"
      />
    </div>
  )
}
