import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

/**
 * Configuration Vitest moderne avec Projects (2025)
 * Architecture modulaire optimisant chaque type de test dans son environnement idéal
 */
export default defineConfig({
  plugins: [react()],
  test: {
    // 🚀 Architecture Projects - Convention basée sur les extensions de fichiers
    projects: [
      // 🟢 Tests Unitaires (Node.js) - Logique pure, ultra-rapide
      {
        test: {
          name: 'unit',
          include: ['src/**/*.test.ts'], // Convention: .test.ts pour logique pure
          environment: 'node', // Environnement natif Node.js pour performance maximale
          globals: true, // Nécessaire pour les globals Vitest comme expect, describe, it
          setupFiles: ['./tests/setup-unit.ts'],
        },
        resolve: {
          alias: {
            '@': path.resolve(__dirname, './src'),
          },
        },
      },

      // 🔵 Tests de Composants (jsdom) - Rendu React optimisé
      {
        test: {
          name: 'component',
          include: ['src/**/*.test.tsx'], // Convention: .test.tsx pour composants React
          environment: 'jsdom', // DOM simulé rapide et fiable
          globals: true, // Nécessaire pour les globals Vitest comme expect, describe, it
          setupFiles: ['./tests/setup.ts'],
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
      },

      // 🟣 Tests d'Intégration (Browser) - Comportement réel utilisateur
      {
        test: {
          name: 'integration',
          include: ['src/**/*.integration.test.tsx'], // Convention: .integration.test.tsx pour flux complets
          browser: {
            enabled: true,
            instances: [
              {
                browser: 'chromium',
                name: 'chromium',
              },
            ],
            provider: 'playwright',
            headless: true,
          },
          globals: true, // Nécessaire pour les globals Vitest comme expect, describe, it
          setupFiles: ['./tests/setup.ts'],
          testTimeout: 15000, // Plus de temps pour les tests browser
        },
        resolve: {
          alias: {
            '@': path.resolve(__dirname, './src'),
          },
        },
      },
    ],

    // 📊 Configuration Coverage Globale
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json'],
      reportsDirectory: './coverage',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.{test,spec}.{ts,tsx}',
        'src/**/*.integration.test.tsx',
        'tests/**',
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
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
