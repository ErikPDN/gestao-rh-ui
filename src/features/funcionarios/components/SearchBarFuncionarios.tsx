import { Search } from 'lucide-react'
import { useState, type ChangeEvent } from 'react'

interface SearchBarFuncionariosProps {
  onSearch?: (searchTerm: string) => void
}

export const SearchBarFuncionarios = ({ onSearch }: SearchBarFuncionariosProps) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    onSearch?.(value)
  }

  return (
    <div className="relative max-w-md">
      <Search className="absolute top-1/2 left-4 h-3 w-3 -translate-y-1/2 text-zinc-400" />
      <input
        type="text"
        aria-label="Search"
        placeholder="Nome ou CPF"
        value={searchTerm}
        onChange={handleSearchChange}
        className="bg-background w-80 rounded-lg border border-zinc-300 py-2 pr-4 pl-10 text-sm leading-none outline-none"
      />
    </div>
  )
}
