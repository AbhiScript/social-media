import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
  },
  server: {
    proxy: {
      '/signup': {
        target: 'http://localhost:7700',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/signup/, '/signup')
      }
    }
  },
})
