import { matchPath, useLocation } from 'react-router-dom'
import { ROUTES } from '../app/layout/Breadcrumbs'

export function useBreadcrumbs() {
  const { pathname } = useLocation()
  for (const r of ROUTES) {
    const m = matchPath(r.path, pathname)
    if (m) return { crumbs: r.crumbs, id: m.params.id }
  }
  return { crumbs: [{ label: 'Dashboard' }], id: undefined }
}
