import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    // Configuration moderne pour Browser Mode uniquement (2025)
    globals: true, // Globales pour describe/it/expect disponibles partout

    // Browser Mode avec Playwright - Plus de jsdom nécessaire
    browser: {
      enabled: true,
      provider: 'playwright',
      name: 'chromium',
      headless: true,
      // Optimisations pour CI/CD
      screenshotFailures: false,
      viewport: { width: 1280, height: 720 },
    },

    // Coverage avec V8 (le plus rapide en 2025)
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      reportsDirectory: './coverage',
      exclude: [
        'node_modules/',
        'tests/',
        '**/*.config.*',
        '**/coverage/**',
        'src/lib/test-utils.ts', // Utilitaires de test exclus
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 70,
        statements: 80,
      },
    },

    // Configuration des fichiers de test
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/tmp/**'],

    // Optimisations de performance pour Browser Mode
    isolate: false, // Plus rapide avec browser mode
    pool: 'forks', // Meilleur pour browser mode
    poolOptions: {
      forks: {
        singleFork: true, // Un seul processus pour tous les tests
      },
    },
    maxConcurrency: 1, // Sequential pour browser mode
    timeout: 10000, // Plus de temps pour browser mode
    hookTimeout: 20000,

    // Options spécifiques pour éviter les erreurs de dépendances
    deps: {
      optimizer: {
        web: {
          include: ['sonner', '@testing-library/react', '@testing-library/user-event'],
        },
      },
    },

    // Configuration pour éviter les problèmes de mock hoisting
    unstubEnvs: true,
    unstubGlobals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Optimisation pour Vite en mode test
  optimizeDeps: {
    include: ['sonner', '@testing-library/react', '@testing-library/user-event', 'vitest-axe'],
  },
})
