import { StatusDepartamento } from '../../features/departamentos/types/status-departamento'

export const statusToStatusDepartamento = (booleanStatus: boolean) => {
  if (!booleanStatus) {
    return StatusDepartamento.INATIVO
  }
  return StatusDepartamento.ATIVO
}
