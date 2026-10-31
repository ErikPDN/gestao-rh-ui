import { useParams } from 'react-router-dom'
import { useGetDepartamentoQuery } from '../hooks/useGetDepartamentoQuery'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { BadgeStatusDepartamento } from '../components/BadgeStatusDepartamento'
import { statusToStatusDepartamento } from '../../../lib/utils/status-to-status-departamento'
import { ButtonsEditDepartamento } from '../components/ButtonsEditDepartamento'
import { ConfirmDialog } from '../../../components/ConfirmDialog'
import { useDesativarDepartamentoMutation } from '../hooks/useDesativarDepartamentoMutation'
import { useAtivarDepartamentoMutation } from '../hooks/useAtivarDepartamentoMutation'
import { EditDepartamentoModal } from '../components/EditDepartamentoModal'
import { ManagerCard } from '../components/ManagerCard'
import { TabsDepartamento } from '../components/TabsDepartamento'
import { TabelaCargos } from '../components/TabelaCargos'
import { TabelaFuncionariosDepartamento } from '../components/TabelaFuncionariosDepartamento'
import { useGetCargosQuery } from '../../funcionarios/hooks/useGetCargosQuery'

export default function DepartamentoDetalhePage() {
  const { id } = useParams()

  const [isModalEditOpen, setIsModalEditOpen] = useState(false)
  const [isModalDesativarOpen, setIsModalDesativarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('cargos')

  const {
    data: departamento,
    isLoading: isDepartamentoLoading,
    isError,
  } = useGetDepartamentoQuery(id as string)
  const { data: cargos, isLoading: isCargosLoading } = useGetCargosQuery(id as string)
  const { mutate: desativarDepartamento, isPending: isDesativarLoading } =
    useDesativarDepartamentoMutation(id as string)
  const { mutate: ativarDepartamento, isPending: isAtivarLoading } = useAtivarDepartamentoMutation(
    id as string,
  )

  const isAtivo = departamento?.ativo === true

  useEffect(() => {
    if (isError) toast.error('Não foi possível carregar os detalhes do departamento.')
  }, [isError])

  const handleDesativarDepartamento = () => {
    desativarDepartamento(id as string, {
      onSuccess: () => setIsModalDesativarOpen(false),
    })
  }

  const handleAtivarDepartamento = () => {
    ativarDepartamento(id as string, {
      onSuccess: () => setIsModalDesativarOpen(false),
    })
  }

  return (
    <div className="flex flex-1 flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold">{departamento?.nome}</h1>
            <span>
              <BadgeStatusDepartamento
                status={statusToStatusDepartamento(departamento?.ativo ?? false)}
              />
            </span>
          </div>

          <p className="text-sm text-gray-600">{departamento?.descricao}</p>
        </div>

        <ButtonsEditDepartamento
          isAtivo={isAtivo}
          onEdit={() => setIsModalEditOpen(true)}
          onDesativar={() => setIsModalDesativarOpen(true)}
        />
      </div>

      <ConfirmDialog
        open={isModalDesativarOpen}
        onCancel={() => setIsModalDesativarOpen(false)}
        title={isAtivo ? 'Desativar departamento?' : 'Ativar departamento?'}
        description={
          isAtivo
            ? 'Tem certeza que deseja desativar este departamento? Esta ação não pode ser desfeita.'
            : 'Tem certeza que deseja ativar este departamento?'
        }
        confirmButtonText={isAtivo ? 'Desativar' : 'Ativar'}
        cancelButtonText="Cancelar"
        onConfirm={isAtivo ? handleDesativarDepartamento : handleAtivarDepartamento}
        isLoading={isDesativarLoading || isAtivarLoading}
        variant={isAtivo ? 'secondary' : 'primary'}
      />

      <EditDepartamentoModal
        isOpen={isModalEditOpen}
        onClose={() => setIsModalEditOpen(false)}
        departamentoNome={departamento?.nome ?? ''}
        departamentoDescricao={departamento?.descricao ?? ''}
      />

      {departamento && (
        <ManagerCard
          departamentoId={departamento.id}
          gestorId={departamento.gestorId}
          gestorNome={departamento.gestorNome}
          gestorAvatarUrl={departamento.gestorAvatarUrl}
          gestorCargo={departamento.gestorCargo}
        />
      )}

      <TabsDepartamento
        tabs={[
          { id: 'cargos', label: 'Cargos' },
          { id: 'colaboradores', label: 'Colaboradores' },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === 'cargos' && <TabelaCargos cargos={cargos ?? []} isLoading={isCargosLoading} />}
      {activeTab === 'colaboradores' && <TabelaFuncionariosDepartamento />}
    </div>
  )
}
