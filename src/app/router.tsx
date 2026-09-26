import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from '../features/dashboard/pages/DashboardPage'
import Funcionarios from '../features/funcionarios/pages/FuncionariosPage'
import MainLayout from './layout/Main'
import Departamentos from '../features/departamentos/pages/DepartartamentoPage'
import FuncionarioDetalhe from '../features/funcionarios/pages/FuncionarioDetalhe'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/funcionarios" element={<Funcionarios />} />
          <Route path="/funcionarios/:id" element={<FuncionarioDetalhe />} />
          <Route path="/departamentos" element={<Departamentos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
