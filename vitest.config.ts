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
      'next/navigation',
      'next/link',
      'lucide-react',
    ],
  },
  test: {
    globals: true,
    environment: 'jsdom', // Fallback for pure unit tests
    setupFiles: './tests/setup.ts',
    include: ['tests/**/*.{test,spec}.{ts,tsx}'],
    reporters: 'default',

    // Performance optimizations
    pool: 'forks', // Use process pool for better isolation
    poolOptions: {
      forks: {
        singleFork: true, // Use single fork for faster startup
      },
    },
    maxConcurrency: 4, // Run more tests in parallel
    isolate: false, // Disable isolation for speed (use carefully)
    testTimeout: 10000, // 10 seconds default timeout
    hookTimeout: 10000, // 10 seconds hook timeout

    // ✅ Optimized Browser Mode Configuration (2025)
    browser: {
      enabled: true,
      provider: 'playwright',
      headless: true,
      instances: [
        {
          browser: 'chromium',
        },
      ],
      // Faster browser settings
      isolate: false, // Reuse browser instances between tests
      screenshotFailures: false, // Disable screenshots for speed
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
