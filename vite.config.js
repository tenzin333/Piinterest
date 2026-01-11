import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/your-repo-name/' : '/', // Adjust base path based on deployment environment
  build: {
    outDir: "dist",
  },
})