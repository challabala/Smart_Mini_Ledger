import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App.tsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster
        position="top-right"
        gutter={8}
        containerClassName=""
        toastOptions={{
          duration: 4000,
          style: {
            background: '#ffffff',
            color: '#0F172A',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            boxShadow: '0 4px 16px 0 rgba(0,0,0,0.08), 0 8px 32px 0 rgba(0,0,0,0.05)',
            padding: '12px 16px',
            fontSize: '13px',
            fontWeight: '500',
            maxWidth: '360px',
          },
          success: {
            iconTheme: { primary: '#10B981', secondary: '#ffffff' },
            style: {
              borderLeft: '4px solid #10B981',
            },
          },
          error: {
            iconTheme: { primary: '#EF4444', secondary: '#ffffff' },
            style: {
              borderLeft: '4px solid #EF4444',
            },
          },
          loading: {
            iconTheme: { primary: '#3B82F6', secondary: '#ffffff' },
            style: {
              borderLeft: '4px solid #3B82F6',
            },
          },
        }}
      />
    </QueryClientProvider>
  </StrictMode>,
)
