import type { ComponentType } from 'react'
import { useGetDepartamentoQuery } from '../../features/departamentos/hooks/useGetDepartamentoQuery'
import { useGetFuncionarioQuery } from '../../features/funcionarios/hooks/useGetFuncionarioQuery'

export type Crumb = { label: string; to?: string } | { Component: ComponentType<{ id: string }> }

const NomeDepartamento = ({ id }: { id: string }) => {
  const { data: departamento } = useGetDepartamentoQuery(id)
  return <>{departamento?.nome ?? '...'}</>
}

const NomeFuncionario = ({ id }: { id: string }) => {
  const { data: funcionario } = useGetFuncionarioQuery(id)
  return <>{funcionario?.nome ?? '...'}</>
}

export const ROUTES: { path: string; crumbs: Crumb[] }[] = [
  { path: '/dashboard', crumbs: [{ label: 'Dashboard' }] },
  { path: '/funcionarios', crumbs: [{ label: 'Funcionários' }] },
  {
    path: '/funcionarios/:id',
    crumbs: [{ label: 'Funcionários', to: '/funcionarios' }, { Component: NomeFuncionario }],
  },
  { path: '/departamentos', crumbs: [{ label: 'Departamentos' }] },
  {
    path: '/departamentos/:id',
    crumbs: [{ label: 'Departamentos', to: '/departamentos' }, { Component: NomeDepartamento }],
  },
]
