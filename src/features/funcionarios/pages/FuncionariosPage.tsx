import { useState } from 'react'
import { ButtonAddFuncionario } from '../components/ButtonAddFuncionario'
import { FiltrosFuncionario } from '../components/FiltrosFuncionario'
import { TabelaFuncionarios } from '../components/TabelaFuncionarios'
import { useGetFuncionariosQuery } from '../hooks/useGetFuncionariosQuery'

export default function FuncionariosPage() {
  const [page, setPage] = useState(1)
  const [funcionarioIds, setFuncionarioIds] = useState<string[]>([])

  const {
    data: funcionarios,
    isLoading,
    isError,
  } = useGetFuncionariosQuery({ page, limit: 20, funcionarioIds })

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
    </div>
  )
}
