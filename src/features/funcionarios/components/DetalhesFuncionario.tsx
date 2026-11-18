import { useGetCargoQuery } from '../hooks/useGetCargoQuery'
import type { FuncionarioResponse } from '../types/funcionario-response'
import { DadosFuncionarioCard } from './DadosFuncionarioCard'
import { RemuneracaoFuncionarioCard } from './RemuneracaoFuncionarioCard'

interface DetalhesFuncionarioProps {
  funcionario?: FuncionarioResponse
  isLoading: boolean
  isError: boolean
}

export const DetalhesFuncionario = ({ funcionario }: DetalhesFuncionarioProps) => {
  // TODO: Criar skeletons e estado de erro usando isLoading/isError (props) e isLoading do cargo
  const { data: cargo } = useGetCargoQuery(funcionario?.departamentoId, funcionario?.cargoId)

  return (
    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-2">
      <RemuneracaoFuncionarioCard
        funcionarioSalario={funcionario?.salario}
        cargoSalarioBase={cargo?.salarioBase}
        cargoSalarioTeto={cargo?.salarioTeto}
      />
      <DadosFuncionarioCard
        funcionarioCpf={funcionario?.cpfCnpj}
        funcionarioNascimento={funcionario?.dataNascimento}
        funcionarioNivel={cargo?.nivel}
        funcionarioDataAdmissao={funcionario?.dataAdmissao}
        funcionarioDataDemissao={funcionario?.dataDemissao}
      />
    </div>
  )
}
