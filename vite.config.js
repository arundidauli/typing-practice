import { readFileSync } from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const rootDir = dirname(fileURLToPath(import.meta.url))
const sourceIndex = resolve(rootDir, 'index.source.html')

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'dev-index-html',
      transformIndexHtml: {
        order: 'pre',
        handler(html, ctx) {
          if (ctx.server) {
            return readFileSync(sourceIndex, 'utf-8')
          }
          return html
        },
      },
    },
  ],
  // Must match the GitHub Pages project path: /<repo-name>/
  base: '/typing-practice/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: { index: sourceIndex },
      output: {
        manualChunks: (id) => {
          if (id.includes('framer-motion')) return 'framer'
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) return 'vendor'
        },
      },
    },
  },
})
