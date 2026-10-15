import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from '../features/dashboard/pages/DashboardPage'
import Funcionarios from '../features/funcionarios/pages/FuncionariosPage'
import MainLayout from './layout/Main'
import Departamentos from '../features/departamentos/pages/DepartartamentoPage'
import FuncionarioDetalhe from '../features/funcionarios/pages/FuncionarioDetalhe'
import Login from '../features/login/pages/LoginPage'
import DepartamentoDetalhe from '../features/departamentos/pages/DepartamentoDetalhePage'
import { ProtectedRoute } from './ProtectedRoute'
import { Role } from '../types/usuario.interface'

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

            <Route element={<ProtectedRoute allowedRoles={[Role.ADMIN, Role.GESTOR, Role.RH]} />}>
              <Route path="/funcionarios" element={<Funcionarios />} />
              <Route path="/departamentos" element={<Departamentos />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={[Role.ADMIN, Role.GESTOR]} />}>
              <Route path="/funcionarios/:id" element={<FuncionarioDetalhe />} />
              <Route path="/departamentos/:id" element={<DepartamentoDetalhe />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
