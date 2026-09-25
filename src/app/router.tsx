import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from '../features/dashboard/pages/DashboardPage'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}
