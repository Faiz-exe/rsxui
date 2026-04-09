import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import stylex from '@stylexjs/unplugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    stylex.vite({
      useCSSLayers: true,
      dev: process.env.NODE_ENV !== 'production',
      runtimeInjection: false,
    }),
    react(),
  ],
})
