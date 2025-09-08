import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    // Vitest détecte automatiquement :
    // - React via le plugin
    // - TypeScript via tsconfig.json
    // - L'environnement approprié
    globals: true, // Pas besoin d'importer describe/it/expect
    
    // Coverage avec V8 (le plus rapide en 2025)
    coverage: {
      provider: 'v8',
      reporter: ['text'],
      exclude: [
        'node_modules/',
        'tests/',
        '**/*.config.*',
        '**/coverage/**'
      ]
    },
    
    // Configuration automatique pour browser mode
    browser: {
      enabled: true,
      provider: 'playwright',
      instances: [{ browser: 'chromium' }]
    },
    
    // Configuration simplifiée pour les tests
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.{test,spec}.{ts,tsx}'],
    
    // Optimisations de performance
    isolate: true,
    threads: true,
    maxConcurrency: 4,
    timeout: 5000,
    hookTimeout: 10000
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
