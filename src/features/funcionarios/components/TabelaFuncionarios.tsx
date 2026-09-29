import { formatCurrency } from '../../../lib/utils/currency-formatter'
import { dateToStatusFuncionario } from '../../../lib/utils/date-to-status-funcionario'
import { BadgeStatusFuncionario } from './BadgeStatusFuncionario'

interface TabelaFuncionariosProps {
  isLoading: boolean
}

const mockFuncionarios = [
  {
    nome: 'João Silva',
    cpf: '123.456.789-00',
    cargo: 'Desenvolvedor',
    departamento: 'TI',
    salario: 5000,
    status: 'Ativo',
  },
  {
    nome: 'Maria Souza',
    cpf: '987.654.321-00',
    cargo: 'Analista de Marketing',
    departamento: 'Marketing',
    salario: 4000,
    status: 'Ativo',
  },
  {
    nome: 'Carlos Oliveira',
    cpf: '456.789.123-00',
    cargo: 'Gerente de Vendas',
    departamento: 'Vendas',
    salario: 6000,
    status: 'Desligado',
  },
  {
    nome: 'Ana Santos',
    cpf: '321.654.987-00',
    cargo: 'Assistente Administrativo',
    departamento: 'Administração',
    salario: 3000,
    status: 'Ativo',
  },
  {
    nome: 'Pedro Lima',
    cpf: '789.123.456-00',
    cargo: 'Engenheiro de Produção',
    departamento: 'Produção',
    salario: 5500,
    dataDemissao: new Date('2023-05-15'),
  },
  {
    nome: 'Fernanda Costa',
    cpf: '654.987.321-00',
    cargo: 'Coordenadora de Recursos Humanos',
    departamento: 'Recursos Humanos',
    salario: 4500,
    status: 'Desligado',
  },
  {
    nome: 'Lucas Pereira',
    cpf: '987.321.654-00',
    cargo: 'Analista Financeiro',
    departamento: 'Financeiro',
    salario: 4000,
    status: 'Ativo',
  },
]

export const TabelaFuncionarios = ({ isLoading }: TabelaFuncionariosProps) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-300">
      {isLoading ? (
        <div></div> // TODO: Add loading skeleton
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
            {mockFuncionarios.map((funcionario, index) => (
              <tr
                key={index}
                className="bg-background cursor-pointer transition-colors duration-75 hover:bg-zinc-100"
              >
                <td className="p-3">
                  <span className="text-sm font-medium text-zinc-950">{funcionario.nome}</span>
                </td>
                <td className="p-3">
                  <span className="text-sm text-zinc-500">{funcionario.cpf}</span>
                </td>
                <td className="p-3">
                  <span className="text-sm text-zinc-500">{funcionario.departamento}</span>
                </td>
                <td className="p-3">
                  <span className="text-sm text-zinc-500">{funcionario.cargo}</span>
                </td>
                <td className="justify-end p-3 text-right">
                  <span className="text-sm font-medium text-zinc-950">
                    {formatCurrency(funcionario.salario)}
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
