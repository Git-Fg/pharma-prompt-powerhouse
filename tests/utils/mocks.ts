import { vi } from 'vitest'

// Mock factories simplifiés pour les tests
export function createMockGuide(overrides = {}) {
  return {
    slug: 'test-guide',
    title: 'Test Guide',
    description: 'A test guide',
    category: 'general',
    difficulty: 'beginner',
    tags: ['test'],
    isFavorite: false,
    isWorkflow: false,
    content: [],
    conceptSlugs: ['test-concept'],
    ...overrides,
  }
}

export function createMockConcept(overrides = {}) {
  return {
    slug: 'test-concept',
    title: 'Test Concept',
    description: 'A test concept',
    category: 'general',
    difficulty: 'beginner',
    tags: ['test'],
    isFavorite: false,
    keyTakeaways: ['Key point 1'],
    content: [],
    ...overrides,
  }
}

export function createMockWorkflow(overrides = {}) {
  return {
    slug: 'test-workflow',
    title: 'Test Workflow',
    description: 'A test workflow',
    category: 'general',
    difficulty: 'beginner',
    tags: ['test'],
    isFavorite: false,
    isWorkflow: true,
    content: [],
    conceptSlugs: ['test-concept'],
    ...overrides,
  }
}

export function createMockExternalTool(overrides = {}) {
  return {
    slug: 'test-tool',
    title: 'Test Tool',
    description: 'A test tool',
    category: 'general',
    difficulty: 'beginner',
    tags: ['test'],
    isFavorite: false,
    url: 'https://example.com',
    content: [],
    ...overrides,
  }
}

// Fonctions utilitaires pour les tests
export function createMockRouter() {
  return {
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }
}

export function createMockTheme(overrides: Partial<{
  theme: string
  setTheme: any
  systemTheme: 'light' | 'dark' | undefined
  themes: string[]
  resolvedTheme: string
}> = {}) {
  return {
    theme: 'light',
    setTheme: vi.fn(),
    systemTheme: 'light' as const,
    themes: ['light', 'dark'],
    resolvedTheme: 'light',
    ...overrides,
  }
}

export function createMockSearchParams(params: Record<string, string> = {}) {
  return new URLSearchParams(params)
}

// Utilitaires pour les tests d'accessibilité
export function expectAccessible(element: HTMLElement) {
  expect(element).toBeInTheDocument()
  expect(element).toBeVisible()
}

export function expectButtonAccessible(button: HTMLElement) {
  expect(button).toBeInTheDocument()
  expect(button).toBeVisible()
  expect(button).toBeEnabled()
  expect(button).toHaveAttribute('type', 'button')
}

export function expectLinkAccessible(link: HTMLElement) {
  expect(link).toBeInTheDocument()
  expect(link).toBeVisible()
  expect(link).toHaveAttribute('href')
  expect(link.getAttribute('href')).not.toBe('#')
}
