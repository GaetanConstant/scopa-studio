import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: '/scopa-studio/', // Mettre cette ligne pour GitHub Pages
  base: '/', // Mettre cette ligne pour Vercel ou déploiement racine
})
