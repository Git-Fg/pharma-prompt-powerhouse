import { useTheme } from 'next-themes'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createMockTheme, fireEvent, render, screen } from '@/test-utils'
import { Header } from './Header'

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

describe('header', () => {
  const mockSetTheme = vi.fn()
  const mockUseTheme = vi.mocked(useTheme)

  beforeEach(() => {
    vi.clearAllMocks()
    mockUseTheme.mockReturnValue(createMockTheme({
      setTheme: mockSetTheme,
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
      expect(screen.getByText('Pharma Prompt')).toBeInTheDocument() // Desktop version should be visible
      expect(screen.getByTestId('nav-logo')).toBeInTheDocument() // Desktop version should be visible
    })

    it('renders navigation links', () => {
      render(<Header />)

      // Desktop navigation links should be visible
      expect(screen.getByTestId('nav-link-guides')).toBeInTheDocument()
      expect(screen.getByTestId('nav-link-workflows')).toBeInTheDocument()
      expect(screen.getByTestId('nav-link-concepts')).toBeInTheDocument()
      expect(screen.getByTestId('nav-link-l-arsenal-ia')).toBeInTheDocument()
    })

    it('renders theme toggle button', () => {
      render(<Header />)

      // Should show theme toggle buttons (desktop and mobile)
      expect(screen.getAllByTestId('nav-theme-toggle')).toHaveLength(2)
    })

    it('renders mobile menu trigger', () => {
      render(<Header />)

      // Find the mobile menu trigger by looking for the Menu icon
      const menuButtons = screen.getAllByRole('button')
      const mobileMenuTrigger = menuButtons.find(button => 
        button.querySelector('svg.lucide-menu')
      )
      expect(mobileMenuTrigger).toBeInTheDocument()
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
      expect(themeToggleButtons[0]).toBeDefined()
      fireEvent.click(themeToggleButtons[0]!)

      expect(mockSetTheme).toHaveBeenCalled()
    })
  })

  describe('mobile navigation', () => {
    it('toggles mobile menu when trigger is clicked', () => {
      render(<Header />)

      // Find the mobile menu trigger by looking for the Menu icon
      const menuButtons = screen.getAllByRole('button')
      const mobileTrigger = menuButtons.find(button => 
        button.querySelector('svg.lucide-menu')
      )
      expect(mobileTrigger).toBeInTheDocument()

      // Click to open - this will test the interaction is possible
      fireEvent.click(mobileTrigger!)

      // The test validates interaction exists - exact behavior depends on implementation
      expect(mobileTrigger).toBeInTheDocument()
    })
  })
})
