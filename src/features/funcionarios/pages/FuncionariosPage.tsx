import { useState } from 'react'
import { ButtonAddFuncionario } from '../components/ButtonAddFuncionario'
import { FiltrosFuncionario } from '../components/FiltrosFuncionario'
import { TabelaFuncionarios } from '../components/TabelaFuncionarios'
import { useGetFuncionariosQuery } from '../hooks/useGetFuncionariosQuery'
import { FooterPagination } from '../../../components/FooterPagination'

const FUNCIONARIOS_PER_PAGE = 20

export default function FuncionariosPage() {
  const [page, setPage] = useState(1)

  const [funcionarioIds, setFuncionarioIds] = useState<string[]>([])

  const {
    data: funcionariosData,
    isLoading,
    isError,
  } = useGetFuncionariosQuery({ page, limit: FUNCIONARIOS_PER_PAGE, funcionarioIds })

  const totalFuncionarios = funcionariosData?.total || 0
  const totalPages = funcionariosData?.totalPages || 1
  const funcionarios = funcionariosData?.data || []

  return (
    <div className="flex flex-1 flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Funcionários</h1>
          <p className="text-sm text-zinc-500">Cadastro de colaboradores, cargos e remuneração.</p>
        </div>

        <ButtonAddFuncionario onNovoFuncionario={() => {}} />
      </div>

      {/* TODO: fazer debounce */}
      <FiltrosFuncionario />

      <TabelaFuncionarios isLoading={isLoading} funcionarios={funcionarios} />

      <FooterPagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
        isLoading={isLoading}
      />
    </div>
  )
}
