export interface FuncionarioResponse {
  id: string
  cpfCnpj: string
  nome: string
  departamento: string
  departamentoId: string
  cargo: string
  cargoId: string
  salario: number
  dataNascimento: Date
  dataAdmissao: Date
  dataDemissao?: Date
}
