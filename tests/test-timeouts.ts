import { vi } from 'vitest'

// Test timeout configuration for slow tests
// This file can be imported in test files that need custom timeouts

export const testTimeouts = {
  // Fast tests (default)
  fast: 5000,
  // Medium tests (components with complex rendering)
  medium: 10000,
  // Slow tests (integration, browser automation)
  slow: 30000,
  // Very slow tests (full page interactions)
  verySlow: 60000,
}

// Helper function to set timeout for specific tests
export function setTestTimeout(timeout: number) {
  return vi.setConfig({ testTimeout: timeout, hookTimeout: timeout })
}

// Test-specific timeout configurations
export const testConfigs = {
  // Navigation tests are typically fast
  navigation: testTimeouts.fast,
  // Unit tests should be fast
  unit: testTimeouts.fast,
  // Component tests with rendering
  component: testTimeouts.medium,
  // Integration tests with browser interactions
  integration: testTimeouts.slow,
  // Tests with clipboard operations (known to be slow)
  clipboard: testTimeouts.verySlow,
}
