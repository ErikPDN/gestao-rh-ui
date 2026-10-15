import { QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode } from 'react'
import { queryClient } from '../lib/query-client'
import AuthProvider from './AuthProvider'

interface ProvidersProps {
  children: ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  )
}
