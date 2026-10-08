export interface DepartamentoResponse {
  id: string
  nome: string
  descricao?: string
  gestorId?: string
  gestorNome?: string
  totalCargos?: number
  totalFuncionarios?: number
  createdAt: string
  updatedAt: string
  ativo: boolean
}
