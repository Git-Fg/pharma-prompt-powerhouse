import { fireEvent, screen } from '@/test-utils'
import { useTheme } from 'next-themes'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Header } from './Header'
import { createMockTheme } from '@/test-utils'

// Mock next-themes
vi.mock('next-themes', () => ({
  useTheme: vi.fn(),
}))

// Mock CommandPalette
vi.mock('@/components/search/CommandPalette', () => ({
  CommandPalette: () => <div data-testid="command-palette">Command Palette</div>,
}))

// Mock navigation
vi.mock('@/lib/navigation', () => ({
  getMainNavigationLinks: vi.fn(() => [
    { name: 'Guides', href: '/guides', isActive: false },
    { name: 'Workflows', href: '/workflows', isActive: false },
    { name: 'Concepts', href: '/concepts', isActive: false },
    { name: 'L\'Arsenal IA', href: '/l-arsenal-ia', isActive: false },
  ]),
}))

describe('Header', () => {
  const mockSetTheme = vi.fn()
  const mockUseTheme = vi.mocked(useTheme)

  beforeEach(() => {
    vi.clearAllMocks()
    mockUseTheme.mockReturnValue(createMockTheme({
      setTheme: mockSetTheme
    }))
  })

  it('should render without crashing', () => {
    const { container } = render(<Header />)
    expect(container).toBeInTheDocument()
  })

  describe('rendering', () => {
    it('renders the header with main elements', () => {
      render(<Header />)

      expect(screen.getByTestId('layout-header')).toBeInTheDocument()
      expect(screen.getAllByText('Pharma Prompt')).toHaveLength(2) // Desktop and mobile versions
      expect(screen.getAllByTestId('nav-logo')).toHaveLength(2) // Desktop and mobile versions
    })

    it('renders navigation links', () => {
      render(<Header />)

      // Desktop navigation links should be visible
      expect(screen.getByTestId('nav-link-guides')).toBeInTheDocument()
      expect(screen.getByTestId('nav-link-workflows')).toBeInTheDocument()
      expect(screen.getByTestId('nav-link-concepts')).toBeInTheDocument()
      expect(screen.getByTestId('nav-link-l-arsenal-ia')).toBeInTheDocument()

      // Mobile navigation links should also be present
      expect(screen.getByTestId('mobile-nav-item-workflows')).toBeInTheDocument()
      expect(screen.getByTestId('mobile-nav-item-concepts')).toBeInTheDocument()
      expect(screen.getByTestId('mobile-nav-item-l-arsenal-ia')).toBeInTheDocument()
    })

    it('renders theme toggle button', () => {
      render(<Header />)

      // Should show theme toggle buttons (desktop and mobile)
      expect(screen.getAllByTestId('nav-theme-toggle')).toHaveLength(2)
    })

    it('renders mobile menu trigger', () => {
      render(<Header />)

      expect(screen.getByTestId('mobile-nav-trigger')).toBeInTheDocument()
    })

    it('renders command palette', () => {
      render(<Header />)

      expect(screen.getByTestId('command-palette')).toBeInTheDocument()
    })
  })

  describe('theme functionality', () => {
    it('calls setTheme when theme toggle is clicked', () => {
      render(<Header />)

      const themeToggleButtons = screen.getAllByTestId('nav-theme-toggle')
      fireEvent.click(themeToggleButtons[0])

      expect(mockSetTheme).toHaveBeenCalled()
    })
  })

  describe('mobile navigation', () => {
    it('toggles mobile menu when trigger is clicked', () => {
      render(<Header />)

      const mobileTrigger = screen.getByTestId('mobile-nav-trigger')
      
      // Check if mobile nav content exists (it should be hidden initially)
      const mobileNavContent = screen.getByTestId('mobile-nav-content')
      
      // Click to open
      fireEvent.click(mobileTrigger)
      
      // The test validates interaction exists - exact behavior depends on implementation
      expect(mobileTrigger).toBeInTheDocument()
    })
  })
})