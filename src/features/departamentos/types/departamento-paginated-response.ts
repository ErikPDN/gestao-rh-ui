import type { DepartamentoResponse } from './departamento-response'

export interface DepartamentoPaginatedResponse {
  data: DepartamentoResponse[]
  page: number
  limit: number
  total: number
  totalPages: number
}
