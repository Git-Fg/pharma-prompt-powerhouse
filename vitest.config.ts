import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
    include: ['tests/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['tests/e2e/**'],
    reporters: 'default',
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
