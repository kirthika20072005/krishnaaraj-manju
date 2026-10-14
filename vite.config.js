import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Deploy target is Vercel (root domain), so base stays '/'.
  // Only switch to './' if you move to GitHub Pages project pages
  // (https://<user>.github.io/<repo>/), where assets live under a subpath.
  base: '/',
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
  },
})
