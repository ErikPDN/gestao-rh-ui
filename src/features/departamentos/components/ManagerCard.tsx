import { useEffect, useState } from 'react'
import { Avatar } from '../../../components/Avatar'
import { Controller, useForm } from 'react-hook-form'
import {
  updateDepartamentoSchema,
  type UpdateDepartamentoSchema,
} from '../schemas/update-departamento'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { SelectGestor } from './SelectGestor'
import { useGetFuncionariosQuery } from '../../funcionarios/hooks/useGetFuncionariosQuery'
import { useUpdateDepartamentoMutation } from '../hooks/useUpdateDepartamentoMutation'

interface ManagerCardProps {
  departamentoId: string
  gestorId?: string
  gestorNome?: string
  gestorAvatarUrl?: string
  gestorCargo?: string
}

export const ManagerCard = ({
  departamentoId,
  gestorId,
  gestorNome,
  gestorAvatarUrl,
  gestorCargo,
}: ManagerCardProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<z.input<typeof updateDepartamentoSchema>, unknown, UpdateDepartamentoSchema>({
    resolver: zodResolver(updateDepartamentoSchema),
    defaultValues: { gestorId },
  })

  useEffect(() => {
    reset({ gestorId })
  }, [gestorId, reset])

  const { data: funcionarios, isLoading: isLoadingGestores } = useGetFuncionariosQuery({
    departamentoId,
    page: 1,
    query: '',
    limit: 100,
  })

  const { mutate: updateDepartamento, isPending } = useUpdateDepartamentoMutation(departamentoId)

  const gestorOptions = (funcionarios?.data ?? []).map((funcionario) => ({
    id: funcionario.id,
    nome: funcionario.nome,
    cargo: funcionario.cargo,
  }))

  const handleCancel = () => {
    reset({ gestorId })
    setIsEditing(false)
  }

  const onSubmit = (data: UpdateDepartamentoSchema) => {
    updateDepartamento(data, { onSuccess: () => setIsEditing(false) })
  }

  return (
    <div className="flex min-h-18 w-full items-center space-x-10 rounded-lg border border-gray-200 bg-white px-6 py-4">
      <span className="text-xs font-semibold text-gray-500">Gestor</span>

      {isEditing ? (
        <Controller
          control={control}
          name="gestorId"
          render={({ field }) => (
            <SelectGestor
              id="gestorId"
              options={gestorOptions}
              value={field.value}
              onChange={field.onChange}
              placeholder={isLoadingGestores ? 'Carregando gestores...' : 'Selecione um gestor'}
              disabled={isLoadingGestores || isPending}
              error={errors.gestorId?.message}
            />
          )}
        />
      ) : (
        <div className="flex items-center justify-center gap-2">
          {gestorNome && (
            <Avatar funcionarioNome={gestorNome} avatarUrl={gestorAvatarUrl} size="sm" />
          )}
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-800">
              {gestorNome || 'Sem gestor'}
            </span>
            {gestorCargo && <span className="text-xs text-gray-500">{gestorCargo}</span>}
          </div>
        </div>
      )}

      <div className="flex flex-1 items-center justify-end gap-2">
        {isEditing ? (
          <>
            <button
              type="button"
              onClick={handleCancel}
              disabled={isPending}
              className="cursor-pointer rounded-md border border-gray-200 bg-white px-4 py-1.5 text-xs font-medium text-gray-800 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={isPending}
              className="cursor-pointer rounded-md bg-zinc-900 px-4 py-1.5 text-xs font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Salvar
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="cursor-pointer rounded-md border border-gray-200 bg-white px-4 py-1.5 text-xs font-semibold text-gray-800 hover:bg-gray-100"
          >
            {gestorNome ? 'Alterar Gestor' : 'Definir Gestor'}
          </button>
        )}
      </div>
    </div>
  )
}
