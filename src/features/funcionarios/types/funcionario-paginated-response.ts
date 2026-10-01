import type { FuncionarioResponse } from './funcionario-response'

export interface FuncionarioPaginatedResponse {
  data: FuncionarioResponse[]
  page: number
  limit: number
  total: number
  totalPages: number
}
