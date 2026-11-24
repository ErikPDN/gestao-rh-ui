import z from 'zod'

export const updateSenhaSchema = z
  .object({
    senhaAtual: z.string().min(1, 'Informe a senha atual').max(255, 'No máximo 255 caracteres'),
    senhaNova: z
      .string()
      .min(6, 'A nova senha deve ter no mínimo 6 caracteres')
      .max(255, 'No máximo 255 caracteres'),
    confirmarSenhaNova: z.string().min(1, 'Confirme a nova senha'),
  })
  .refine((data) => data.senhaNova === data.confirmarSenhaNova, {
    message: 'A nova senha e a confirmação devem ser iguais',
    path: ['confirmarSenhaNova'],
  })

export type UpdateSenhaSchema = z.infer<typeof updateSenhaSchema>

export type UpdateSenhaPayload = Pick<UpdateSenhaSchema, 'senhaAtual' | 'senhaNova'>
