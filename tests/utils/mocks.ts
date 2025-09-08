import { vi } from 'vitest'

// Mock factories simplifiés pour les tests
export const createMockGuide = (overrides = {}) => ({
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
  ...overrides
})

export const createMockConcept = (overrides = {}) => ({
  slug: 'test-concept',
  title: 'Test Concept',
  description: 'A test concept',
  category: 'general',
  difficulty: 'beginner',
  tags: ['test'],
  isFavorite: false,
  keyTakeaways: ['Key point 1'],
  content: [],
  ...overrides
})

export const createMockWorkflow = (overrides = {}) => ({
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
  ...overrides
})

export const createMockExternalTool = (overrides = {}) => ({
  slug: 'test-tool',
  title: 'Test Tool',
  description: 'A test tool',
  category: 'general',
  difficulty: 'beginner',
  tags: ['test'],
  isFavorite: false,
  url: 'https://example.com',
  content: [],
  ...overrides
})

// Fonctions utilitaires pour les tests
export const createMockRouter = () => ({
  push: vi.fn(),
  replace: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
  refresh: vi.fn(),
  prefetch: vi.fn()
})

export const createMockTheme = () => ({
  theme: 'light',
  setTheme: vi.fn(),
  systemTheme: 'light',
  themes: ['light', 'dark'],
  resolvedTheme: 'light'
})

export const createMockSearchParams = (params: Record<string, string> = {}) => 
  new URLSearchParams(params)

// Utilitaires pour les tests d'accessibilité
export const expectAccessible = (element: HTMLElement) => {
  expect(element).toBeInTheDocument()
  expect(element).toBeVisible()
}

export const expectButtonAccessible = (button: HTMLElement) => {
  expect(button).toBeInTheDocument()
  expect(button).toBeVisible()
  expect(button).toBeEnabled()
  expect(button).toHaveAttribute('type', 'button')
}

export const expectLinkAccessible = (link: HTMLElement) => {
  expect(link).toBeInTheDocument()
  expect(link).toBeVisible()
  expect(link).toHaveAttribute('href')
  expect(link.getAttribute('href')).not.toBe('#')
}