import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves at https://<user>.github.io/college-finder/
export default defineConfig({
  plugins: [react()],
  base: '/college-finder/',
})
