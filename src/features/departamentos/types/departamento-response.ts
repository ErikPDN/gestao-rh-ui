export interface DepartamentoResponse {
  id: string
  nome: string
  descricao?: string
  gestorId?: string
  gestorNome?: string
  gestorCargo?: string
  gestorAvatarUrl?: string
  totalCargos?: number
  totalFuncionarios?: number
  createdAt: string
  updatedAt: string
  ativo: boolean
}
