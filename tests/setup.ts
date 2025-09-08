import React from 'react'
import { vi } from 'vitest'
import '@testing-library/jest-dom'

// Test setup file for Vitest Browser Mode
// Optimized for performance with minimal global setup

// Cache mock functions to avoid recreation
function createMockFunctions() {
  return {
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
    redirect: vi.fn(),
    notFound: vi.fn(),
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    warning: vi.fn(),
  }
}

// Create cached mocks
const mocks = createMockFunctions()

// Mock ResizeObserver for components that use it (like cmdk)
globalThis.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: mocks.observe,
  unobserve: mocks.unobserve,
  disconnect: mocks.disconnect,
}))

// Mock scrollIntoView for components that use it
Element.prototype.scrollIntoView = vi.fn()

// Mock next/navigation for component tests - cached for performance
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mocks.push,
    replace: mocks.replace,
    back: mocks.back,
    forward: mocks.forward,
    refresh: mocks.refresh,
    prefetch: mocks.prefetch,
  }),

  useSearchParams: () => new URLSearchParams(),

  usePathname: () => '/',
  redirect: mocks.redirect,
  notFound: mocks.notFound,
}))

// Mock next/link for component tests - optimized with createElement
vi.mock('next/link', () => ({
  __esModule: true,
  default: React.createElement('a'),
}))

// Mock Sonner toast notifications - cached
vi.mock('sonner', () => ({
  toast: {
    success: mocks.success,
    error: mocks.error,
    info: mocks.info,
    warning: mocks.warning,
  },
  Toaster: () => null,
}))

// Performance optimization: pre-warm React createElement
const mockLink = React.createElement('a')
