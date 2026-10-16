import { QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode } from 'react'
import { queryClient } from '../lib/query-client'
import AuthProvider from './AuthProvider'
import { Toaster } from 'sonner'

interface ProvidersProps {
  children: ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {children}
        <Toaster
          theme="light"
          position="top-right"
          toastOptions={{
            classNames: {
              toast: 'bg-background!',
              title: 'text-sm! font-medium!',
              error: 'border-2! border-red-500/30! [&>div>svg]:text-red-400!',
              success: 'border-2! border-green-500/30! [&>div>svg]:text-green-400!',
            },
          }}
        />
      </AuthProvider>
    </QueryClientProvider>
  )
}
