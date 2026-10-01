import { SearchBarFuncionarios } from './SearchBarFuncionarios'
import { SelectFiltroFuncionario } from './SelectFiltroFuncionario'
import { StatusFiltroFuncionario } from './StatusFiltroFuncionario'

interface FiltrosFuncionarioProps {
  total?: number
}

export const FiltrosFuncionario = ({ total }: FiltrosFuncionarioProps) => {
  return (
    <div className="flex items-start gap-2">
      <SearchBarFuncionarios />
      <SelectFiltroFuncionario />
      <StatusFiltroFuncionario />
    </div>
  )
}
