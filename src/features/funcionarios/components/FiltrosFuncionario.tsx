import { SearchBarFuncionarios } from './SearchBarFuncionarios'
import { SelectFiltroFuncionario } from './SelectFiltroFuncionario'
import { StatusFiltroFuncionario } from './StatusFiltroFuncionario'

export const FiltrosFuncionario = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <SearchBarFuncionarios />
        <SelectFiltroFuncionario />
        <StatusFiltroFuncionario />
      </div>

      <span className="text-xs font-medium text-zinc-400">30 de 30 funcionários</span>
    </div>
  )
}
