import { StatusFuncionario } from '../../features/funcionarios/types/status-funcionario'

export const dateToStatusFuncionario = (date: Date | null): StatusFuncionario => {
  if (!date) {
    return StatusFuncionario.ATIVO
  }

  return StatusFuncionario.DESLIGADO
}
