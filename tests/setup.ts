import React from 'react'
import { vi } from 'vitest'
import '@testing-library/jest-dom'
// Import vitest-browser-react types and setup
import 'vitest-browser-react'

// Test setup file for Vitest Browser Mode
// Global test configuration for modern browser testing

// Mock ResizeObserver for components that use it (like cmdk)
globalThis.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock scrollIntoView for components that use it
Element.prototype.scrollIntoView = vi.fn()

// Mock next/navigation for component tests
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),

  useSearchParams: () => new URLSearchParams(),

  usePathname: () => '/',
  redirect: vi.fn(),
  notFound: vi.fn(),
}))

// Mock next/link for component tests
vi.mock('next/link', () => ({
  __esModule: true,

  default: ({ children, href, ...props }: any) => {
    return React.createElement('a', { href, ...props }, children)
  },
}))

// Mock Sonner toast notifications
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    warning: vi.fn(),
  },
  Toaster: () => null,
}))
