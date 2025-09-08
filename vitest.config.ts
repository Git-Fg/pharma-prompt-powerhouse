import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// Configuration moderne avec Vitest pour co-localisation (2025)
export default defineConfig({
  plugins: [react()],
  test: {
    // Détection automatique des tests co-localisés
    include: [
      'src/**/*.{test,spec}.{ts,tsx}', // Tests co-localisés
    ],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/tmp/**',
      '**/.next/**',
    ],

    // Configuration globale simplifiée
    globals: true,
    environment: 'happy-dom', // Plus léger que jsdom pour les tests unitaires

    // Setup global
    setupFiles: ['./src/test-setup.ts'],

    // Coverage moderne avec V8
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      reportsDirectory: './coverage',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.{test,spec}.{ts,tsx}',
        'src/test-setup.ts',
        'src/**/*.stories.{ts,tsx}',
        '**/*.config.*',
        '**/coverage/**',
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 70,
        statements: 80,
      },
    },

    // Optimisations de performance
    isolate: false,
    pool: 'threads',
    maxConcurrency: 4,
    testTimeout: 10000,

    // Configuration des dépendances
    deps: {
      optimizer: {
        web: {
          include: [
            'sonner',
            '@testing-library/react',
            '@testing-library/user-event',
          ],
        },
      },
    },
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  optimizeDeps: {
    include: [
      'sonner',
      '@testing-library/react',
      '@testing-library/user-event',
      'vitest-axe',
    ],
  },
})
