import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from '../features/dashboard/pages/DashboardPage'
import Funcionarios from '../features/funcionarios/pages/FuncionariosPage'
import Profile from '../features/profile/pages/ProfilePage'
import MainLayout from './layout/Main'
import Departamentos from '../features/departamentos/pages/DepartartamentoPage'
import FuncionarioDetalhe from '../features/funcionarios/pages/FuncionarioDetalhePage'
import Login from '../features/login/pages/LoginPage'
import DepartamentoDetalhe from '../features/departamentos/pages/DepartamentoDetalhePage'
import { ProtectedRoute } from './ProtectedRoute'
import { DETAIL_ACCESS_ROLES, LIST_ACCESS_ROLES } from '../constants/access'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/login" element={<Login />} />

        {/* Rotas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/me" element={<Profile />} />

            <Route element={<ProtectedRoute allowedRoles={LIST_ACCESS_ROLES} />}>
              <Route path="/funcionarios" element={<Funcionarios />} />
              <Route path="/departamentos" element={<Departamentos />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={DETAIL_ACCESS_ROLES} />}>
              <Route path="/funcionarios/:id" element={<FuncionarioDetalhe />} />
              <Route path="/departamentos/:id" element={<DepartamentoDetalhe />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
