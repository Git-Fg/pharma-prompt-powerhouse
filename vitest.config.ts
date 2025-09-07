import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@testing-library/react',
      '@testing-library/jest-dom',
      'sonner',
    ],
  },
  test: {
    globals: true,
    environment: 'jsdom', // Fallback for pure unit tests
    setupFiles: './tests/setup.ts',
    include: ['tests/**/*.{test,spec}.{ts,tsx}'],
    reporters: 'default',

    // ✅ Modern Browser Mode Configuration (2025)
    browser: {
      enabled: true,
      provider: 'playwright',
      headless: true,
      instances: [
        {
          browser: 'chromium',
        },
      ],
      // Ensure DOM testing library works in browser mode
      isolate: true,
    },

    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'coverage/**',
        'dist/**',
        '**/[.]**',
        '**/*.d.ts',
        '**/node_modules/**',
        'tests/**',
        '**/*.config.*',
        '**/content/**', // Content files are validated by TypeScript + satisfies
        '**/types/**', // Type definitions don't need testing
      ],
    },
    watch: false,
  },
  resolve: {
    alias: {
      '@': new URL('./src', import.meta.url).pathname,
    },
  },
})
