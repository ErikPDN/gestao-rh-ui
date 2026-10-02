import { httpClient } from '../../lib/api-client'
import type { FuncionarioPaginatedResponse } from './types/funcionario-paginated-response'

export interface GetFuncionariosParams {
  funcionarioIds?: string[]
  query?: string
  page?: number
  limit?: number
}

export const getFuncionarios = async ({
  funcionarioIds,
  query,
  page,
  limit,
}: GetFuncionariosParams = {}) => {
  const response = await httpClient.get<FuncionarioPaginatedResponse>('/funcionarios', {
    params: {
      funcionarioIds: funcionarioIds?.length ? funcionarioIds.join(',') : undefined,
      query,
      page,
      limit,
    },
  })

  return response.data
}
