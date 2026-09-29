import { StatusFuncionario } from '../../features/funcionarios/types'

export const dateToStatusFuncionario = (date: Date | null): StatusFuncionario => {
  if (!date) {
    return StatusFuncionario.ATIVO
  }

  return StatusFuncionario.DESLIGADO
}
