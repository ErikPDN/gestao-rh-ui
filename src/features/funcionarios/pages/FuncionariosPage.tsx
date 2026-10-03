import { useEffect, useState } from 'react'
import { ButtonAddFuncionario } from '../components/ButtonAddFuncionario'
import { FiltrosFuncionario } from '../components/FiltrosFuncionario'
import { TabelaFuncionarios } from '../components/TabelaFuncionarios'
import { useGetFuncionariosQuery } from '../hooks/useGetFuncionariosQuery'
import { FooterPagination } from '../../../components/FooterPagination'
import { useDebounce } from '../hooks/useDebounce'
import type { StatusFuncionario } from '../types/status-funcionario'
import { CadastrarFuncionarioModal } from '../components/CadastrarFuncionarioModal'

const FUNCIONARIOS_PER_PAGE = 20

export default function FuncionariosPage() {
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [statusFuncionario, setStatusFuncionario] = useState<StatusFuncionario | undefined>(
    undefined,
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  const debouncedSearchTerm = useDebounce(searchTerm, 400)

  const {
    data: funcionariosData,
    isLoading,
    isError,
  } = useGetFuncionariosQuery({
    page,
    limit: FUNCIONARIOS_PER_PAGE,
    query: debouncedSearchTerm,
    status: statusFuncionario,
  })

  useEffect(() => {
    setPage(1)
  }, [debouncedSearchTerm, statusFuncionario])

  const totalPages = funcionariosData?.totalPages || 1
  const funcionarios = funcionariosData?.data || []

  return (
    <div className="flex flex-1 flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Funcionários</h1>
          <p className="text-sm text-zinc-500">Cadastro de colaboradores, cargos e remuneração.</p>
        </div>

        <ButtonAddFuncionario onNovoFuncionario={() => setIsModalOpen(true)} />
      </div>

      <FiltrosFuncionario
        onSearch={setSearchTerm}
        onStatusChange={setStatusFuncionario}
        isLoading={isLoading}
      />

      <TabelaFuncionarios isLoading={isLoading} funcionarios={funcionarios} />

      <FooterPagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
        isLoading={isLoading}
      />

      <CadastrarFuncionarioModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
