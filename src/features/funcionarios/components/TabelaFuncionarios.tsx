import { formatCPF } from '../../../lib/utils/cpf-formatter'
import { formatCurrency } from '../../../lib/utils/currency-formatter'
import { dateToStatusFuncionario } from '../../../lib/utils/date-to-status-funcionario'
import type { FuncionarioResponse } from '../types/funcionario-response'
import { BadgeStatusFuncionario } from './BadgeStatusFuncionario'
import { TabelaFuncionariosSkeleton } from './TabelaFuncionariosSkeleton'

interface TabelaFuncionariosProps {
  isLoading: boolean
  funcionarios?: FuncionarioResponse[]
}

export const TabelaFuncionarios = ({ isLoading, funcionarios }: TabelaFuncionariosProps) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-300">
      {isLoading ? (
        <TabelaFuncionariosSkeleton />
      ) : (
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-zinc-300 bg-zinc-100">
              <th className="p-3 text-xs font-medium text-zinc-500">Nome</th>
              <th className="p-3 text-xs font-medium text-zinc-500">CPF</th>
              <th className="p-3 text-xs font-medium text-zinc-500">Departamento</th>
              <th className="p-3 text-xs font-medium text-zinc-500">Cargo</th>
              <th className="p-3 text-right text-xs font-medium text-zinc-500">Salário</th>
              <th className="p-3 text-xs font-medium text-zinc-500">Status</th>
            </tr>
          </thead>
          <tbody>
            {funcionarios?.map((funcionario, index) => (
              <tr
                key={index}
                className="bg-background cursor-pointer transition-colors duration-75 hover:bg-zinc-100"
              >
                <td className="p-3">
                  <span className="text-sm font-medium text-zinc-950">{funcionario.nome}</span>
                </td>
                <td className="p-3">
                  <span className="font-mono text-sm text-zinc-500">
                    {formatCPF(funcionario.cpfCnpj)}
                  </span>
                </td>
                <td className="p-3">
                  <span className="text-sm text-zinc-500">{funcionario.departamento}</span>
                </td>
                <td className="p-3">
                  <span className="text-sm text-zinc-500">{funcionario.cargo}</span>
                </td>
                <td className="justify-end p-3 text-right">
                  <span className="font-mono text-sm font-medium text-zinc-950">
                    {formatCurrency(Number(funcionario.salario))}
                  </span>
                </td>
                <td className="p-3">
                  <BadgeStatusFuncionario
                    status={dateToStatusFuncionario(funcionario.dataDemissao || null)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
