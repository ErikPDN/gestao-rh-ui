import z from 'zod'
import { isValidCpf } from '@brazilian-utils/brazilian-utils'

export const cadastrarFuncionarioSchema = z.object({
  cpf: z
    .string()
    .min(11, 'CPF deve ter no mínimo 11 caracteres')
    .refine(isValidCpf, 'CPF inválido'),
  nome: z
    .string()
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .max(255, 'Nome deve ter no máximo 255 caracteres'),
  departamento: z.string().min(1, 'Departamento é obrigatório'),
  cargo: z.string().min(1, 'Cargo é obrigatório'),
  salario: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, 'Salário deve ser um número válido')
    .transform((value) => parseFloat(value)),
  dataAdmissao: z.date().optional(),
  dataNascimento: z.date(),
})

export type CadastrarFuncionarioSchema = z.infer<typeof cadastrarFuncionarioSchema>
