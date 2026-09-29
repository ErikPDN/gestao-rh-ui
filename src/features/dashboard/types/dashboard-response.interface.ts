import type { Admissoes } from './admissoes.interface'
import type { FuncionarioDepartamento } from './funcionario-departamento'

export interface DashboardResponse {
  funcionariosAtivos: number
  funcionariosDesligados: number
  departamentosAtivos: number
  departamentosCadastrados: number
  cargosAtivos: number
  folhaSalarialMensal: number
  funcionariosPorDepartamento: FuncionarioDepartamento[]
  admissoesRecentes: Admissoes[]
}
