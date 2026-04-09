import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import stylex from '@stylexjs/unplugin'

export default defineConfig({
  plugins: [
    stylex.vite({
      useCSSLayers: true,
      dev: false,
      runtimeInjection: false,
    }),
    react(),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/lib/index.ts'),
      formats: ['es'],
      fileName: () => 'index.js',
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        '@stylexjs/stylex',
      ],
    },
    outDir: 'dist',
    emptyOutDir: true,
    cssCodeSplit: false,
    cssFileName: 'style',
    sourcemap: true,
    minify: false,
    copyPublicDir: false,
  },
})
