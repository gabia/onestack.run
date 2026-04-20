import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '',
  resolve: {
    preserveSymlinks: true,
    alias: {
      '@components': process.env.VITE_COMPONENTS_DIR 
        ? path.resolve(process.env.VITE_COMPONENTS_DIR)
        : path.resolve(__dirname, 'components')
    }
  },
  build: {
    outDir: 'dist',
  },
})
