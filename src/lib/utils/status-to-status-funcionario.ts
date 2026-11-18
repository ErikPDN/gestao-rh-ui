import { StatusFuncionario } from '../../features/funcionarios/types/status-funcionario'

export const statusToStatusFuncionario = (dataDemissao: Date | null | undefined) => {
  if (dataDemissao) {
    return StatusFuncionario.DESLIGADO
  }
  return StatusFuncionario.ATIVO
}
