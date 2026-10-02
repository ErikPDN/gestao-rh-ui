import type { StatusFuncionario } from '../types/status-funcionario'
import { SearchBarFuncionarios } from './SearchBarFuncionarios'
import { StatusFiltroFuncionario } from './StatusFiltroFuncionario'

interface FiltrosFuncionarioProps {
  total?: number
  onSearch?: (searchTerm: string) => void
  onStatusChange?: (status?: StatusFuncionario) => void
}

export const FiltrosFuncionario = ({
  total,
  onSearch,
  onStatusChange,
}: FiltrosFuncionarioProps) => {
  return (
    <div className="flex items-start gap-2">
      <SearchBarFuncionarios onSearch={onSearch} />
      <StatusFiltroFuncionario onStatusChange={onStatusChange} />
    </div>
  )
}
