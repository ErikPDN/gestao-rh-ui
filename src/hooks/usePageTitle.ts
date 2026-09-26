import { matchPath, useLocation } from 'react-router-dom'

export const PAGE_TITLES = [
  { path: '/dashboard', title: 'Dashboard' },
  { path: '/funcionarios', title: 'Funcionários' },
  { path: '/funcionarios/:id', title: 'Detalhes do Funcionário' },
  { path: '/departamentos', title: 'Departamentos' },
]

export const usePageTitle = () => {
  const { pathname } = useLocation()
  return PAGE_TITLES.find((page) => matchPath(page.path, pathname))?.title || 'Dashboard'
}
