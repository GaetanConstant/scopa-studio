import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    rollupOptions: {
      // Deux pages independantes : le site vitrine a la racine, et l'intranet
      // locataires. Vite ecrit intranet/index.html, que GitHub Pages sert
      // directement sur /intranet — pas besoin de routeur ni de 404.html.
      input: {
        main: resolve(__dirname, 'index.html'),
        intranet: resolve(__dirname, 'intranet/index.html'),
      },
    },
  },
})
