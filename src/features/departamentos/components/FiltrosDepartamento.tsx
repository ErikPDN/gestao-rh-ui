import type { StatusDepartamento } from '../types/status-departamento'
import { SearchBarDepartamentos } from './SearchBarDepartamentos'
import { StatusFiltroDepartamento } from './StatusFiltroDepartamentos'

interface FiltrosDepartamentoProps {
  onSearch: (searchTerm: string) => void
  onStatusChange?: (status?: StatusDepartamento) => void
  isLoading?: boolean
}

export const FiltrosDepartamento = ({
  onSearch,
  onStatusChange,
  isLoading,
}: FiltrosDepartamentoProps) => {
  return (
    <div className={`${isLoading ? 'hidden' : 'flex items-start gap-2'}`}>
      <SearchBarDepartamentos onSearch={onSearch} />
      <StatusFiltroDepartamento onStatusChange={onStatusChange} />
    </div>
  )
}
