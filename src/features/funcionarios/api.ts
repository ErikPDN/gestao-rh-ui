import { httpClient } from '../../lib/api-client'
import type { CadastrarFuncionarioSchema } from './schemas/cadastrar'
import type { CargoResponse } from './types/cargo-response'
import type { DepartamentoPaginatedResponse } from './types/departamento-paginated-response'
import type { FuncionarioPaginatedResponse } from './types/funcionario-paginated-response'
import type { FuncionarioResponse } from './types/funcionario-response'
import type { GetFuncionariosParams } from './types/get-funcionarios-params'

export const getFuncionarios = async ({
  departamentoId,
  funcionarioIds,
  query,
  page,
  status,
  limit,
}: GetFuncionariosParams = {}) => {
  const response = await httpClient.get<FuncionarioPaginatedResponse>('/funcionarios', {
    params: {
      departamentoId,
      funcionarioIds: funcionarioIds?.length ? funcionarioIds.join(',') : undefined,
      query,
      page,
      status,
      limit,
    },
  })

  return response.data
}

export const getDepartamentos = async () => {
  const response = await httpClient.get<DepartamentoPaginatedResponse>('/departamentos')

  return response.data
}

export const getFuncionario = async (funcionarioId: string) => {
  const response = await httpClient.get<FuncionarioResponse>(`/funcionarios/${funcionarioId}`)

  return response.data
}

export const getCargosByDepartamento = async (departamentoId: string) => {
  const response = await httpClient.get<CargoResponse[]>(`/departamentos/${departamentoId}/cargos`)

  return response.data
}

export const cadastrarFuncionario = async (data: CadastrarFuncionarioSchema) => {
  const response = await httpClient.post<FuncionarioResponse>('/funcionarios', data)

  return response.data
}

export const updateFuncionario = async (
  funcionarioId: string,
  data: Partial<CadastrarFuncionarioSchema>,
) => {
  const response = await httpClient.patch<FuncionarioResponse>(
    `/funcionarios/${funcionarioId}`,
    data,
  )

  return response.data
}
