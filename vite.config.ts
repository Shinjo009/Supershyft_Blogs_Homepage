import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2022',
    cssMinify: true,
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          const norm = id.replace(/\\/g, '/')
          if (!norm.includes('node_modules')) return undefined
          if (norm.includes('@tanstack/react-query')) return 'vendor-rq'
          if (norm.includes('node_modules/react-dom')) return 'vendor-react'
          if (norm.includes('node_modules/react/')) return 'vendor-react'
          return undefined
        },
      },
    },
  },
})
