import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves from /<repo-name>/, so we set base accordingly.
// Override with VITE_BASE env var for other deploy targets.
const base = process.env.VITE_BASE ?? '/wedding/'

export default defineConfig({
  base,
  plugins: [react()],
})
