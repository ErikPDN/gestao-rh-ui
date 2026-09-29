import { Search } from 'lucide-react'
import { useState, type ChangeEvent } from 'react'

export const SearchBarFuncionarios = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
  }

  return (
    <div className="relative ml-auto max-w-md">
      <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-zinc-400" />
      <input
        type="text"
        aria-label="Search"
        placeholder="Buscar funcionários..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="bg-background w-80 rounded-lg border border-zinc-300 py-2 pr-4 pl-10 text-sm outline-none"
      />
    </div>
  )
}
