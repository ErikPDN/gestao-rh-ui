import { NavLink, useParams } from 'react-router-dom'
import { BadgeStatusFuncionario } from '../components/BadgeStatusFuncionario'
import { useGetFuncionarioQuery } from '../hooks/useGetFuncionarioQuery'
import { statusToStatusFuncionario } from '../../../lib/utils/status-to-status-funcionario'
import { Dot } from 'lucide-react'
import { Avatar } from '../../../components/Avatar'
import { useState } from 'react'
import { ButtonsEditFuncionario } from '../components/ButtonsEditFuncionario'
import { EditFuncionarioModal } from '../components/EditFuncionarioModal'
import { ConfirmDialog } from '../../../components/ConfirmDialog'
import { useDemitirFuncionarioMutation } from '../hooks/useDemitirFuncionarioMutation'
import { dateFormatter } from '../../../lib/utils/date-formattet'
import { DetalhesFuncionario } from '../components/DetalhesFuncionario'

export default function FuncionarioDetalhePage() {
  const { id: funcionarioId } = useParams()

  const { data: funcionario, isLoading, isError } = useGetFuncionarioQuery(funcionarioId as string)
  const { mutate: demitirFuncionario, isPending: isDemitirLoading } = useDemitirFuncionarioMutation(
    funcionarioId as string,
  )

  const [isModalEditOpen, setIsModalEditOpen] = useState(false)
  const [isModalDemitirOpen, setIsModalDemitirOpen] = useState(false)

  const isFuncionarioAtivo =
    funcionario?.dataDemissao === null || funcionario?.dataDemissao === undefined

  const handleDemitirFuncionario = () => {
    demitirFuncionario(funcionarioId as string, {
      onSuccess: () => {
        setIsModalDemitirOpen(false)
      },
    })
  }

  return (
    <div className="flex flex-1 flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar funcionarioNome={funcionario?.nome || ''} size="lg" />
          <div className="flex flex-col space-y-1.5">
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold">{funcionario?.nome}</h1>
              <span>
                <BadgeStatusFuncionario
                  status={statusToStatusFuncionario(funcionario?.dataDemissao || null)}
                />
              </span>
            </div>

            <div className="flex items-center gap-1">
              <span className="text-sm text-zinc-500">{funcionario?.cargo}</span>
              <Dot size={14} />
              <NavLink to={`/departamentos/${funcionario?.departamentoId}`}>
                <span className="text-accent cursor-pointer text-sm">
                  {funcionario?.departamento}
                </span>
              </NavLink>
            </div>
          </div>
        </div>

        <ButtonsEditFuncionario
          isAtivo={isFuncionarioAtivo}
          onEdit={() => setIsModalEditOpen(true)}
          onDemitir={() => setIsModalDemitirOpen(true)}
          isFuncionarioAtivo={isFuncionarioAtivo}
        />
      </div>

      <DetalhesFuncionario funcionario={funcionario} isLoading={isLoading} isError={isError} />

      <EditFuncionarioModal
        isOpen={isModalEditOpen}
        onClose={() => setIsModalEditOpen(false)}
        funcionarioCpf={funcionario?.cpfCnpj || ''}
        funcionarioNome={funcionario?.nome || ''}
        funcionarioDepartamentoId={funcionario?.departamentoId || ''}
        funcionarioCargoId={funcionario?.cargoId || ''}
        funcionarioSalario={funcionario?.salario || 0}
        funcionarioDataNascimento={funcionario?.dataNascimento}
        funcionarioDataAdmissao={funcionario?.dataAdmissao}
      />

      <ConfirmDialog
        open={isModalDemitirOpen}
        onCancel={() => setIsModalDemitirOpen(false)}
        title={`Demitir ${funcionario?.nome}?`}
        description={`A data de demissão será registrada como ${dateFormatter(new Date())} e o status passará para Desligado.`}
        confirmButtonText="Demitir"
        cancelButtonText="Cancelar"
        onConfirm={handleDemitirFuncionario}
        isLoading={isDemitirLoading}
        variant="secondary"
      />
    </div>
  )
}
