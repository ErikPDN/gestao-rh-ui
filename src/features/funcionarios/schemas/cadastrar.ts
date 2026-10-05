import z from 'zod'
import { isValidCpf } from '@brazilian-utils/brazilian-utils'

export const cadastrarFuncionarioSchema = z.object({
  cpfCnpj: z
    .string()
    .min(11, 'CPF deve ter no mínimo 11 caracteres')
    .refine(isValidCpf, 'CPF inválido'),
  nome: z
    .string()
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .max(255, 'Nome deve ter no máximo 255 caracteres'),
  departamentoId: z.uuidv4('Departamento é obrigatório'),
  cargoId: z.uuidv4('Cargo é obrigatório'),
  salario: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, 'Salário deve ser um número válido')
    .transform((value) => parseFloat(value)),
  dataAdmissao: z.date().optional(),
  dataNascimento: z.date(),
})

export type CadastrarFuncionarioSchema = z.infer<typeof cadastrarFuncionarioSchema>
