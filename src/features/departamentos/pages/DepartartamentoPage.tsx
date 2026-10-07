import { useEffect, useState } from 'react'
import { FooterPagination } from '../../../components/FooterPagination'
import { ButtonAddDepartamento } from '../components/ButtonAddDepartamento'
import { FiltrosDepartamento } from '../components/FiltrosDepartamento'
import { TabelaDepartamentos } from '../components/TabelaDepartamentos'
import type { StatusDepartamento } from '../types/status-departamento'
import { useDebounce } from '../../../hooks/useDebounce'
import { useGetDepartamentosQuery } from '../hooks/useGetDepartamentosQuery'

export default function DepartartamentoPage() {
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [statusDepartamento, setStatusDepartamento] = useState<StatusDepartamento | undefined>(
    undefined,
  )

  const [isModalOpen, setIsModalOpen] = useState(false)
  const debouncedSearchTerm = useDebounce(searchTerm, 400)

  const {
    data: departamentosData,
    isLoading,
    isError,
  } = useGetDepartamentosQuery({
    page,
    limit: 20,
    query: debouncedSearchTerm,
    status: statusDepartamento,
  })

  useEffect(() => {
    setPage(1)
  }, [debouncedSearchTerm, statusDepartamento])

  const totalPages = departamentosData?.totalPages || 1
  const departamentos = departamentosData?.data || []

  return (
    <div className="flex flex-1 flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Departamentos</h1>
          <p className="text-sm text-zinc-500">
            Estrutura organizacional, gestores e cargos de cada área.
          </p>
        </div>

        <ButtonAddDepartamento onNovoDepartamentoClick={() => {}} />
      </div>

      <FiltrosDepartamento
        isLoading={isLoading}
        onSearch={setSearchTerm}
        onStatusChange={setStatusDepartamento}
      />

      <TabelaDepartamentos isLoading={isLoading} departamentos={departamentos} />

      <FooterPagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
        isLoading={isLoading}
      />
    </div>
  )
}
