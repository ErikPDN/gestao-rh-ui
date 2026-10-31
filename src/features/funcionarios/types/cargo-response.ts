import type { NivelCargo } from './nivel-cargo'

export interface CargoResponse {
  id: string
  nome: string
  departamentoId: string
  salarioBase: number
  salarioTeto: number
  nivel?: NivelCargo
  totalFuncionarios?: number
  createdAt: Date
  updatedAt: Date
  ativo: boolean
}
