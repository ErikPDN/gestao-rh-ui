import type { StatusFuncionario } from './status-funcionario'

export interface GetFuncionariosParams {
  departamentoId?: string
  funcionarioIds?: string[]
  query?: string
  page?: number
  status?: StatusFuncionario
  limit?: number
}
