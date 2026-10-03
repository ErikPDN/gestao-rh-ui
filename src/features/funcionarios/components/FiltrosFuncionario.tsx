import type { StatusFuncionario } from '../types/status-funcionario'
import { SearchBarFuncionarios } from './SearchBarFuncionarios'
import { StatusFiltroFuncionario } from './StatusFiltroFuncionario'

interface FiltrosFuncionarioProps {
  onSearch?: (searchTerm: string) => void
  onStatusChange?: (status?: StatusFuncionario) => void
  isLoading?: boolean
}

export const FiltrosFuncionario = ({
  onSearch,
  onStatusChange,
  isLoading,
}: FiltrosFuncionarioProps) => {
  return (
    <div className={`${isLoading ? 'hidden' : 'flex items-start gap-2'}`}>
      <SearchBarFuncionarios onSearch={onSearch} />
      <StatusFiltroFuncionario onStatusChange={onStatusChange} />
    </div>
  )
}
