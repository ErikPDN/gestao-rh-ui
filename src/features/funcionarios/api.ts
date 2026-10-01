import { httpClient } from '../../lib/api-client'
import type { FuncionarioPaginatedResponse } from './types/funcionario-paginated-response'

export interface GetFuncionariosParams {
  funcionarioIds?: string[]
  page?: number
  limit?: number
}

export const getFuncionarios = async ({
  funcionarioIds,
  page,
  limit,
}: GetFuncionariosParams = {}) => {
  const response = await httpClient.get<FuncionarioPaginatedResponse>('/funcionarios', {
    params: {
      funcionarioIds: funcionarioIds?.length ? funcionarioIds.join(',') : undefined,
      page,
      limit,
    },
  })

  return response.data
}
