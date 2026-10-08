import type { StatusDepartamento } from './status-departamento'

export interface GetDepartamentosParams {
  departamentoIds?: string[]
  query?: string
  page?: number
  status?: StatusDepartamento
  limit?: number
}
