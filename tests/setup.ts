import React from 'react'
import { vi } from 'vitest'
import '@testing-library/jest-dom'

// Mock process global for Next.js compatibility
globalThis.process = {
  env: {
    NODE_ENV: 'test',
  },
} as any

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

// Mock common lucide-react icons that are used in tests
vi.mock('lucide-react', () => ({
  // Navigation icons
  Home: () => React.createElement('span', { 'data-testid': 'home-icon' }, '🏠'),
  BookOpen: () => React.createElement('span', { 'data-testid': 'book-icon' }, '📚'),
  Search: () => React.createElement('span', { 'data-testid': 'search-icon' }, '🔍'),
  Lightbulb: () => React.createElement('span', { 'data-testid': 'lightbulb-icon' }, '💡'),
  Wrench: () => React.createElement('span', { 'data-testid': 'wrench-icon' }, '🔧'),
  Brain: () => React.createElement('span', { 'data-testid': 'brain-icon' }, '🧠'),
  Target: () => React.createElement('span', { 'data-testid': 'target-icon' }, '🎯'),
  Shield: () => React.createElement('span', { 'data-testid': 'shield-icon' }, '🛡️'),
  ExternalLink: () => React.createElement('span', { 'data-testid': 'external-link-icon' }, '🔗'),

  // Action icons
  X: () => React.createElement('span', { 'data-testid': 'x-icon' }, '✕'),
  ChevronRight: () => React.createElement('span', { 'data-testid': 'chevron-right-icon' }, '▶'),
  ChevronDown: () => React.createElement('span', { 'data-testid': 'chevron-down-icon' }, '▼'),
  ArrowLeft: () => React.createElement('span', { 'data-testid': 'arrow-left-icon' }, '←'),
  MoreHorizontal: () => React.createElement('span', { 'data-testid': 'more-horizontal-icon' }, '⋯'),

  // Special icons
  Cookie: () => React.createElement('span', { 'data-testid': 'cookie-icon' }, '🍪'),
  XIcon: () => React.createElement('span', { 'data-testid': 'x-icon-component' }, '✕'),
  SearchIcon: () => React.createElement('span', { 'data-testid': 'search-icon-component' }, '🔍'),
  ChevronDownIcon: () => React.createElement('span', { 'data-testid': 'chevron-down-icon-component' }, '▼'),

  // Footer icons
  Github: () => React.createElement('span', { 'data-testid': 'github-icon' }, '📂'),
  Mail: () => React.createElement('span', { 'data-testid': 'mail-icon' }, '✉️'),
  Twitter: () => React.createElement('span', { 'data-testid': 'twitter-icon' }, '🐦'),
  Linkedin: () => React.createElement('span', { 'data-testid': 'linkedin-icon' }, '💼'),

  // Other common icons
  Heart: () => React.createElement('span', { 'data-testid': 'heart-icon' }, '❤️'),
  Users: () => React.createElement('span', { 'data-testid': 'users-icon' }, '👥'),
  FileText: () => React.createElement('span', { 'data-testid': 'file-text-icon' }, '📄'),

  // Additional icons that are missing
  Settings: () => React.createElement('span', { 'data-testid': 'settings-icon' }, '⚙️'),
  CheckIcon: () => React.createElement('span', { 'data-testid': 'check-icon' }, '✓'),
  ArrowRight: () => React.createElement('span', { 'data-testid': 'arrow-right-icon' }, '→'),
  Clock: () => React.createElement('span', { 'data-testid': 'clock-icon' }, '🕐'),

  // Default fallback for any other icon
  default: () => React.createElement('span', { 'data-testid': 'default-icon' }, '🔹'),
}))

// Performance optimization: pre-warm React createElement
const mockLink = React.createElement('a')
