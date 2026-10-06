import { httpClient } from '../../lib/api-client'
import type { DepartamentoPaginatedResponse } from './types/departamento-paginated-response'
import type { GetDepartamentosParams } from './types/get-departamentos-params'

export const getDepartamentos = async ({
  departamentoIds,
  query,
  page,
  status,
  limit,
}: GetDepartamentosParams) => {
  const response = await httpClient.get<DepartamentoPaginatedResponse>('/departamentos', {
    params: {
      departamentoIds: departamentoIds?.length ? departamentoIds.join(',') : undefined,
      query,
      page,
      status,
      limit,
    },
  })

  return response.data
}
