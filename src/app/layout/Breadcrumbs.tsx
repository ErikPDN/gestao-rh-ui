import type { ComponentType } from 'react'
import { useGetDepartamentoQuery } from '../../features/departamentos/hooks/useGetDepartamentoQuery'

export type Crumb = { label: string; to?: string } | { Component: ComponentType<{ id: string }> }

const NomeDepartamento = ({ id }: { id: string }) => {
  const { data: departamento } = useGetDepartamentoQuery(id)
  return <>{departamento?.nome ?? '...'}</>
}

export const ROUTES: { path: string; crumbs: Crumb[] }[] = [
  { path: '/dashboard', crumbs: [{ label: 'Dashboard' }] },
  { path: '/funcionarios', crumbs: [{ label: 'Funcionários' }] },
  {
    path: '/funcionarios/:id',
    // TODO: trocar por um componente com o nome do funcionário quando a página de detalhe existir
    crumbs: [{ label: 'Funcionários', to: '/funcionarios' }, { label: 'Detalhes' }],
  },
  { path: '/departamentos', crumbs: [{ label: 'Departamentos' }] },
  {
    path: '/departamentos/:id',
    crumbs: [{ label: 'Departamentos', to: '/departamentos' }, { Component: NomeDepartamento }],
  },
]
