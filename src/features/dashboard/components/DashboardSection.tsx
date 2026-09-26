import { NavLink } from 'react-router-dom'
import { DashboardCard } from './DashboardCard'
import { ActivityItem } from './ActivityItem'
import type { Funcionario } from '../../../types/funcionario.interface'
import { DashboardChart } from './DashboardChart'

const recentHires: Funcionario[] = [
  {
    id: '1',
    nome: 'João Silva',
    departamento: 'TI',
    cargo: 'Desenvolvedor',
    dataAdmissao: new Date('2023-01-15'),
    salario: 5000,
    avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: '2',
    nome: 'Maria Souza',
    departamento: 'RH',
    cargo: 'Analista de RH',
    dataAdmissao: new Date('2023-02-10'),
    salario: 4000,
    avatarUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: '3',
    nome: 'Carlos Oliveira',
    departamento: 'Financeiro',
    cargo: 'Contador',
    dataAdmissao: new Date('2023-03-05'),
    salario: 4500,
    avatarUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
  {
    id: '4',
    nome: 'Ana Lima',
    departamento: 'Marketing',
    cargo: 'Coordenadora de Marketing',
    dataAdmissao: new Date('2023-04-20'),
    salario: 5500,
    avatarUrl: 'https://randomuser.me/api/portraits/women/4.jpg',
  },
  {
    id: '5',
    nome: 'Pedro Santos',
    departamento: 'Vendas',
    cargo: 'Representante de Vendas',
    dataAdmissao: new Date('2023-05-12'),
    salario: 4800,
  },
]

export const DashboardSection = () => {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
      <DashboardCard title="Funcionários por departamento">
        <DashboardChart />
      </DashboardCard>

      <DashboardCard
        title="Adimissões recentes"
        action={
          <NavLink
            to="/funcionarios"
            className="text-accent mr-2 text-xs font-medium hover:underline"
          >
            Ver todos
          </NavLink>
        }
      >
        <ul className="flex flex-col">
          {recentHires.map((hire) => (
            <ActivityItem
              key={hire.id}
              id={hire.id}
              nome={hire.nome}
              departamento={hire.departamento}
              cargo={hire.cargo}
              dataAdmissao={hire.dataAdmissao}
              avatarUrl={hire.avatarUrl}
            />
          ))}
        </ul>
      </DashboardCard>
    </div>
  )
}
