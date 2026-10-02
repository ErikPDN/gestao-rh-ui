import { SearchBarFuncionarios } from './SearchBarFuncionarios'
import { SelectFiltroFuncionario } from './SelectFiltroFuncionario'
import { StatusFiltroFuncionario } from './StatusFiltroFuncionario'

interface FiltrosFuncionarioProps {
  total?: number
  onSearch?: (searchTerm: string) => void
}

export const FiltrosFuncionario = ({ total, onSearch }: FiltrosFuncionarioProps) => {
  return (
    <div className="flex items-start gap-2">
      <SearchBarFuncionarios onSearch={onSearch} />
      <SelectFiltroFuncionario />
      <StatusFiltroFuncionario />
    </div>
  )
}
