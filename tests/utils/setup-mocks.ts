import { vi } from 'vitest'

// Mocks pour les hooks Next.js
export const mockNextNavigation = () => {
  vi.mock('next/navigation', () => ({
    useRouter: () => createMockRouter(),
    useSearchParams: () => createMockSearchParams(),
    usePathname: () => '/',
    redirect: vi.fn(),
    notFound: vi.fn()
  }))
}

export const mockNextLink = () => {
  vi.mock('next/link', () => ({
    __esModule: true,
    default: ({ children, href, ...props }: any) => 
      require('react').createElement('a', { href, ...props }, children)
  }))
}

export const mockNextThemes = () => {
  vi.mock('next-themes', () => ({
    useTheme: () => createMockTheme()
  }))
}

// Mocks pour les composants UI
export const mockUIComponents = () => {
  vi.mock('@/components/ui/button', () => ({
    default: ({ children, onClick, ...props }: any) => 
      require('react').createElement('button', { type: 'button', onClick, ...props }, children)
  }))
  
  vi.mock('@/components/ui/card', () => ({
    Card: ({ children, ...props }: any) => 
      require('react').createElement('div', { 'data-testid': 'card', ...props }, children),
    CardHeader: ({ children, ...props }: any) => 
      require('react').createElement('div', { 'data-testid': 'card-header', ...props }, children),
    CardContent: ({ children, ...props }: any) => 
      require('react').createElement('div', { 'data-testid': 'card-content', ...props }, children),
    CardTitle: ({ children, ...props }: any) => 
      require('react').createElement('h3', { 'data-testid': 'card-title', ...props }, children),
    CardDescription: ({ children, ...props }: any) => 
      require('react').createElement('p', { 'data-testid': 'card-description', ...props }, children)
  }))
}

// Mocks pour les composants partagés
export const mockSharedComponents = () => {
  vi.mock('@/components/shared/ContentRenderer', () => ({
    ContentRenderer: ({ item }: any) => 
      require('react').createElement('div', { 'data-testid': 'content-renderer' }, item?.title || 'Content')
  }))
  
  vi.mock('@/components/shared/KeyTakeaways', () => ({
    KeyTakeaways: ({ takeaways }: any) => 
      require('react').createElement('div', { 'data-testid': 'key-takeaways' }, 
        takeaways?.map((takeaway: string, i: number) => 
          require('react').createElement('div', { key: i }, takeaway)
        )
      )
  }))
}

// Mocks pour les icônes
export const mockIcons = () => {
  vi.mock('lucide-react', () => ({
    Home: () => require('react').createElement('span', { 'data-testid': 'home-icon' }),
    BookOpen: () => require('react').createElement('span', { 'data-testid': 'book-icon' }),
    Search: () => require('react').createElement('span', { 'data-testid': 'search-icon' }),
    Menu: () => require('react').createElement('span', { 'data-testid': 'menu-icon' }),
    Moon: () => require('react').createElement('span', { 'data-testid': 'moon-icon' }),
    Sun: () => require('react').createElement('span', { 'data-testid': 'sun-icon' }),
    // Ajouter d'autres icônes au besoin
  }))
}

// Mocks pour les notifications
export const mockToasts = () => {
  vi.mock('sonner', () => ({
    toast: {
      success: vi.fn(),
      error: vi.fn(),
      info: vi.fn(),
      warning: vi.fn()
    },
    Toaster: () => null
  }))
}

// Setup global pour tous les mocks
export const setupGlobalMocks = () => {
  // Mock ResizeObserver
  global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn()
  }))
  
  // Mock scrollIntoView
  Element.prototype.scrollIntoView = vi.fn()
  
  // Mock process
  global.process = { env: { NODE_ENV: 'test' } } as any
  
  // Appeler tous les mocks
  mockNextNavigation()
  mockNextLink()
  mockNextThemes()
  mockUIComponents()
  mockSharedComponents()
  mockIcons()
  mockToasts()
}

// Importer les fonctions utilitaires
import { createMockRouter, createMockTheme, createMockSearchParams } from './mocks'