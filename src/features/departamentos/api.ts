import { httpClient } from '../../lib/api-client'
import type { CadastrarDepartamentoFormSchema } from './schemas/cadastrar-departamento'
import type { DepartamentoPaginatedResponse } from './types/departamento-paginated-response'
import type { DepartamentoResponse } from './types/departamento-response'
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

export const getDepartamento = async (departamentoId: string) => {
  const response = await httpClient.get<DepartamentoResponse>(`/departamentos/${departamentoId}`)

  return response.data
}

export const cadastrarDepartamento = async (data: CadastrarDepartamentoFormSchema) => {
  const response = await httpClient.post('/departamentos', data)

  return response.data
}

export const desativarDepartamento = async (departamentoId: string) => {
  const response = await httpClient.post(`/departamentos/${departamentoId}/desativar`)

  return response.data
}

export const ativarDepartamento = async (departamentoId: string) => {
  const response = await httpClient.post(`/departamentos/${departamentoId}/reativar`)

  return response.data
}

export const updateDepartamento = async (
  departamentoId: string,
  data: Partial<CadastrarDepartamentoFormSchema>,
) => {
  const response = await httpClient.patch<DepartamentoResponse>(
    `/departamentos/${departamentoId}`,
    data,
  )

  return response.data
}
