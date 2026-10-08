import z from 'zod'

export const cadastrarDepartamentoSchema = z.object({
  nome: z
    .string()
    .min(1, { message: 'O nome do departamento é obrigatório' })
    .max(255, { message: 'O nome do departamento deve ter no máximo 255 caracteres' }),
  gestorId: z.uuidv4('O Id do gestor deve ser valido').optional(),
  descricao: z
    .string()
    .max(255, { message: 'A descrição do departamento deve ter no máximo 255 caracteres' })
    .optional(),
})

export type CadastrarDepartamentoFormSchema = z.infer<typeof cadastrarDepartamentoSchema>
