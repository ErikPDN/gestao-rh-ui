import { httpClient } from '../../lib/api-client'
import type { FuncionarioPaginatedResponse } from './types/funcionario-paginated-response'
import type { StatusFuncionario } from './types/status-funcionario'

export interface GetFuncionariosParams {
  funcionarioIds?: string[]
  query?: string
  page?: number
  status?: StatusFuncionario
  limit?: number
}

export const getFuncionarios = async ({
  funcionarioIds,
  query,
  page,
  status,
  limit,
}: GetFuncionariosParams = {}) => {
  const response = await httpClient.get<FuncionarioPaginatedResponse>('/funcionarios', {
    params: {
      funcionarioIds: funcionarioIds?.length ? funcionarioIds.join(',') : undefined,
      query,
      page,
      status,
      limit,
    },
  })

  return response.data
}
