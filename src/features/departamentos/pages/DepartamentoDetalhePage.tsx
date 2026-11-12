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
import { CadastrarCargoModal } from '../components/CadastrarCargoModal'
import type { CargoResponse } from '../../funcionarios/types/cargo-response'
import { EditCargoModal } from '../components/EditCargoModal'
import { useDesativarCargoMutation } from '../hooks/useDesativarCargoMutation'
import { useGetFuncionariosQuery } from '../../funcionarios/hooks/useGetFuncionariosQuery'
import { CadastrarFuncionarioModal } from '../../funcionarios/components/CadastrarFuncionarioModal'

export default function DepartamentoDetalhePage() {
  const { id } = useParams()

  const [isModalEditOpen, setIsModalEditOpen] = useState(false)
  const [isModalEditCargoOpen, setIsModalEditCargoOpen] = useState(false)
  const [cargoEmEdicao, setCargoEmEdicao] = useState<CargoResponse | null>(null)
  const [isModalDesativarOpen, setIsModalDesativarOpen] = useState(false)
  const [isModalDesativarCargoOpen, setIsModalDesativarCargoOpen] = useState(false)
  const [isModalNovoCargoOpen, setIsModalNovoCargoOpen] = useState(false)
  const [isModalNovoFuncionarioOpen, setIsModalNovoFuncionarioOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('cargos')

  const {
    data: departamento,
    isLoading: isDepartamentoLoading,
    isError,
  } = useGetDepartamentoQuery(id as string)
  const { data: cargos, isLoading: isCargosLoading } = useGetCargosQuery(id as string)
  const { data: funcionarios, isLoading: isFuncionariosLoading } = useGetFuncionariosQuery({
    departamentoId: id as string,
    limit: 100,
  })
  const { mutate: desativarDepartamento, isPending: isDesativarLoading } =
    useDesativarDepartamentoMutation(id as string)
  const { mutate: ativarDepartamento, isPending: isAtivarLoading } = useAtivarDepartamentoMutation(
    id as string,
  )
  const { mutate: desativarCargo, isPending: isDesativarCargoLoading } = useDesativarCargoMutation(
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

  const handleOpenEditCargo = (cargo: CargoResponse) => {
    setCargoEmEdicao(cargo)
    setIsModalEditCargoOpen(true)
  }

  const handleAtivarDepartamento = () => {
    ativarDepartamento(id as string, {
      onSuccess: () => setIsModalDesativarOpen(false),
    })
  }

  const handleOpenDesativarCargo = (cargo: CargoResponse) => {
    setCargoEmEdicao(cargo)
    setIsModalDesativarCargoOpen(true)
  }

  const handleDesativarCargo = () => {
    desativarCargo(cargoEmEdicao?.id as string, {
      onSuccess: () => {
        setIsModalDesativarCargoOpen(false)
        setCargoEmEdicao(null)
      },
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
        onOpenModalNovoCargo={() => setIsModalNovoCargoOpen(true)}
        onOpenModalNovoFuncionario={() => setIsModalNovoFuncionarioOpen(true)}
        totalCargos={departamento?.totalCargos ?? cargos?.length ?? 0}
        totalColaboradores={departamento?.totalFuncionarios ?? funcionarios?.total ?? 0}
      />

      <CadastrarCargoModal
        isOpen={isModalNovoCargoOpen}
        departamentoId={id as string}
        onClose={() => setIsModalNovoCargoOpen(false)}
      />

      <CadastrarFuncionarioModal
        isOpen={isModalNovoFuncionarioOpen}
        onClose={() => setIsModalNovoFuncionarioOpen(false)}
      />

      {activeTab === 'cargos' && (
        <TabelaCargos
          cargos={cargos ?? []}
          isLoading={isCargosLoading}
          onEditCargo={handleOpenEditCargo}
          onDesativarCargo={handleOpenDesativarCargo}
        />
      )}

      <EditCargoModal
        cargo={cargoEmEdicao}
        onClose={() => setIsModalEditCargoOpen(false)}
        isOpen={isModalEditCargoOpen}
      />

      {activeTab === 'colaboradores' && (
        <TabelaFuncionariosDepartamento
          funcionarios={funcionarios?.data ?? []}
          isLoading={isFuncionariosLoading}
        />
      )}

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

      <ConfirmDialog
        open={isModalDesativarCargoOpen}
        onCancel={() => setIsModalDesativarCargoOpen(false)}
        title="Desativar cargo?"
        description="Tem certeza que deseja desativar este cargo? Esta ação não pode ser desfeita."
        confirmButtonText="Desativar"
        cancelButtonText="Cancelar"
        onConfirm={handleDesativarCargo}
        isLoading={isDesativarCargoLoading}
        variant="secondary"
      />
    </div>
  )
}
