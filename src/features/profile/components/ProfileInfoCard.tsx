import { Dot } from 'lucide-react'
import { useState } from 'react'
import type z from 'zod'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { getPasswordStrength } from '../../../lib/utils/getPasswordStrength'
import { getErrorMessage } from '../../../lib/utils/get-error-message'
import { updateSenhaSchema, type UpdateSenhaSchema } from '../schemas/update-senha'
import {
  updateFuncionario,
  type UpdateFuncionarioSchema,
} from '../../funcionarios/schemas/update-funcionario'
import { useUpdateSenhaMutation } from '../hooks/useUpdateSenhaMutation'
import { useUpdateFuncionarioMutation } from '../../funcionarios/hooks/useUpdateFuncionarioMutation'

const strenghtSenha = [
  { label: 'Fraca', color: 'bg-red-500' },
  { label: 'Média', color: 'bg-yellow-500' },
  { label: 'Forte', color: 'bg-green-500' },
  { label: 'Muito Forte', color: 'bg-blue-500' },
]

interface ProfileInfoCardProps {
  funcionarioId?: string
  userName?: string
  userEmail?: string
  cargo?: string
  departamento?: string
  isLoadingUser?: boolean
}

export const ProfileInfoCard = ({
  funcionarioId,
  userName,
  userEmail,
  cargo,
  departamento,
  isLoadingUser,
}: ProfileInfoCardProps) => {
  const queryClient = useQueryClient()
  const [alterarSenha, setAlterarSenha] = useState(false)

  const podeEditarNome = !!isLoadingUser || !!funcionarioId

  const {
    handleSubmit: handleSubmitSenha,
    register: registerSenha,
    control,
    reset: resetSenha,
    formState: { errors: errorsSenha },
  } = useForm<UpdateSenhaSchema>({
    resolver: zodResolver(updateSenhaSchema),
  })

  const {
    register: registerFuncionario,
    handleSubmit: handleSubmitFuncionario,
    formState: { errors: errorsFuncionario, isDirty: isDirtyFuncionario },
  } = useForm<z.input<typeof updateFuncionario>, unknown, UpdateFuncionarioSchema>({
    resolver: zodResolver(updateFuncionario),
    values: { nome: userName ?? '' },
  })

  const watchSenha = useWatch({
    control,
    name: 'senhaNova',
    defaultValue: '',
  })

  const { mutate: updateSenha, isPending: isPendingUpdateSenha } = useUpdateSenhaMutation()
  const { mutate: updateFuncionarioMutation, isPending: isPendingUpdateFuncionario } =
    useUpdateFuncionarioMutation(funcionarioId ?? '')

  const strength = getPasswordStrength(watchSenha)
  const level = Math.min(Math.max(strength, 1), 4)
  const { label, color } = strenghtSenha[level - 1]

  const onSubmitSenha = ({ senhaAtual, senhaNova }: UpdateSenhaSchema) => {
    updateSenha({ senhaAtual, senhaNova })
  }

  const onSubmitFuncionario = (data: UpdateFuncionarioSchema) => {
    if (!funcionarioId) return

    updateFuncionarioMutation(data, {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ['auth', 'me'] }),
      onError: (error) =>
        toast.error(
          getErrorMessage(error, 'Não foi possível atualizar o nome. Tente novamente mais tarde.'),
        ),
    })
  }

  const handleCancelarSenha = () => {
    resetSenha()
    setAlterarSenha(false)
  }

  return (
    <section className="bg-background flex flex-col space-y-6 rounded-lg border border-zinc-300 p-5">
      <div className="flex flex-col">
        <h3 className="font-semibold">Informações Pessoais</h3>
        <p className="text-sm text-zinc-500">
          Como você aparece no painel e suas credenciais de acesso.
        </p>
      </div>

      <div className="flex gap-4">
        {podeEditarNome && (
          <form
            className="min-w-0 flex-1"
            onSubmit={handleSubmitFuncionario(onSubmitFuncionario)}
            noValidate
          >
            <div className="flex w-full items-end gap-2">
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <label htmlFor="name" className="text-sm font-medium text-zinc-700">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  maxLength={255}
                  autoComplete="name"
                  placeholder="Ex.: João da Silva"
                  disabled={isLoadingUser || isPendingUpdateFuncionario}
                  className="bg-background w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none disabled:opacity-50"
                  {...registerFuncionario('nome')}
                />
              </div>

              <button
                type="submit"
                disabled={isLoadingUser || !isDirtyFuncionario || isPendingUpdateFuncionario}
                className="cursor-pointer rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isPendingUpdateFuncionario ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
            {errorsFuncionario.nome && (
              <span className="mt-1 block text-sm text-red-500">
                {errorsFuncionario.nome.message}
              </span>
            )}
          </form>
        )}

        <div className="flex max-w-1/2 min-w-0 flex-1 flex-col gap-1">
          <div className="flex items-center gap-0.5">
            <label htmlFor="email" className="text-sm font-medium text-zinc-700">
              Email
            </label>
            <Dot size={12} />
            <span className="text-sm text-zinc-400">não editavel</span>
          </div>

          <input
            type="text"
            id="email"
            maxLength={100}
            placeholder="Ex.: joao@exemplo.com"
            tabIndex={-1}
            className="w-full cursor-default rounded-md border border-zinc-300 bg-zinc-200 px-3 py-2 text-sm text-zinc-500 outline-none"
            readOnly
            value={userEmail ?? ''}
          />
        </div>
      </div>

      {departamento && cargo && (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-0.5">
            <span className="text-sm font-medium text-zinc-700">Permissão</span>
            <Dot size={12} />
            <span className="text-sm text-zinc-400">não editavel</span>
          </div>

          <div className="flex min-h-10 w-fit cursor-default items-center rounded-md border border-zinc-300 bg-zinc-200 px-3 py-2.5 text-zinc-500 outline-none">
            <span className="text-sm font-medium text-zinc-700">{cargo}</span>
            <Dot size={12} />
            <span className="text-sm text-zinc-500">{departamento}</span>
          </div>
        </div>
      )}

      <hr className="border-zinc-300" />

      {alterarSenha ? (
        <form
          onSubmit={handleSubmitSenha(onSubmitSenha)}
          className="flex w-1/2 flex-col space-y-4"
          noValidate
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="senhaAtual" className="text-sm font-medium text-zinc-700">
              Senha Atual
            </label>
            <input
              id="senhaAtual"
              type="password"
              autoComplete="current-password"
              className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none"
              {...registerSenha('senhaAtual')}
            />
            {errorsSenha.senhaAtual && (
              <span className="text-sm text-red-500">{errorsSenha.senhaAtual.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="senhaNova" className="text-sm font-medium text-zinc-700">
              Nova Senha
            </label>
            <input
              id="senhaNova"
              type="password"
              autoComplete="new-password"
              className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none"
              {...registerSenha('senhaNova')}
            />

            {watchSenha && (
              <>
                <div className="mt-2 flex gap-1">
                  {[1, 2, 3, 4].map((n) => (
                    <div
                      key={n}
                      className={`h-1 w-full rounded-full transition-colors duration-200 ${
                        n <= level ? color : 'bg-zinc-300'
                      }`}
                    />
                  ))}
                </div>
                <div className="mt-1 flex justify-between gap-2 text-xs">
                  <span className="text-zinc-400">
                    Mínimo 6 caracteres. Use maiúsculas, números e símbolos para fortalecer.
                  </span>
                  <span className="font-medium whitespace-nowrap text-zinc-700">{label}</span>
                </div>
              </>
            )}

            {errorsSenha.senhaNova && (
              <span className="text-sm text-red-500">{errorsSenha.senhaNova.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="confirmarSenhaNova" className="text-sm font-medium text-zinc-700">
              Confirmar Nova Senha
            </label>
            <input
              id="confirmarSenhaNova"
              type="password"
              autoComplete="new-password"
              className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none"
              {...registerSenha('confirmarSenhaNova')}
            />
            {errorsSenha.confirmarSenhaNova && (
              <span className="text-sm text-red-500">{errorsSenha.confirmarSenhaNova.message}</span>
            )}
          </div>

          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={handleCancelarSenha}
              disabled={isPendingUpdateSenha}
              className="bg-background cursor-pointer rounded-md border border-zinc-200 px-4 py-1.5 text-sm font-medium transition-colors hover:bg-zinc-500/20 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isPendingUpdateSenha}
              className="cursor-pointer rounded-md bg-zinc-900 px-4 py-1.5 text-sm font-medium text-white hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPendingUpdateSenha ? 'Atualizando...' : 'Atualizar Senha'}
            </button>
          </div>
        </form>
      ) : (
        <div className="flex w-full items-end justify-between">
          <div className="flex w-1/2 flex-col gap-1">
            <label htmlFor="senha" className="text-sm font-medium text-zinc-700">
              Senha
            </label>
            <input
              id="senha"
              type="password"
              value="••••••••••••"
              readOnly
              tabIndex={-1}
              className="w-full cursor-default rounded-md border border-zinc-300 bg-zinc-200 px-3 py-2 text-sm text-zinc-500 outline-none"
            />
          </div>

          <button
            type="button"
            onClick={() => setAlterarSenha(true)}
            className="bg-background cursor-pointer rounded-md border border-zinc-200 px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-500/20"
          >
            Alterar Senha
          </button>
        </div>
      )}
    </section>
  )
}
