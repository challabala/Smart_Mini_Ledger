import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-dom') || id.includes('react-router')) return 'vendor';
            if (id.includes('framer-motion') || id.includes('lucide-react') || id.includes('react-hot-toast')) return 'ui';
            if (id.includes('react-query') || id.includes('axios')) return 'data';
            if (id.includes('react-hook-form') || id.includes('zod') || id.includes('hookform')) return 'forms';
          }
        }
      }
    }
  }
})
