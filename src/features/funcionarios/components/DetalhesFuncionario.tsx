import type { FuncionarioResponse } from '../types/funcionario-response'
import { DadosFuncionarioCard } from './DadosFuncionarioCard'
import { RemuneracaoFuncionarioCard } from './RemuneracaoFuncionarioCard'

interface DetalhesFuncionarioProps {
  funcionario?: FuncionarioResponse
  isLoading: boolean
  isError: boolean
}

export const DetalhesFuncionario = ({
  funcionario,
  isLoading,
  isError,
}: DetalhesFuncionarioProps) => {
  return (
    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-2">
      <RemuneracaoFuncionarioCard
        funcionarioSalario={funcionario?.salario}
        funcionarioDepartamentoId={funcionario?.departamentoId}
        funcionarioCargoId={funcionario?.cargoId}
      />
      <DadosFuncionarioCard />
    </div>
  )
}
