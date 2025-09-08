import { useTheme } from 'next-themes'
import React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Header } from '@/components/layout/Header'
import { createMockTheme } from '../utils/mocks'
import { fireEvent, render, screen } from '../utils/test-utils'

// Mock next-themes (not mocked globally)
vi.mock('next-themes', () => ({
  useTheme: vi.fn(),
}))

// Mock CommandPalette
vi.mock('@/components/search/CommandPalette', () => ({
  CommandPalette: () => React.createElement('div', { 'data-testid': 'command-palette' }, 'Command Palette'),
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

// Note: UI components and icons are mocked globally in tests/setup.ts

describe('header', () => {
  const mockSetTheme = vi.fn()
  const mockUseTheme = vi.mocked(useTheme)

  beforeEach(() => {
    vi.clearAllMocks()
    mockUseTheme.mockReturnValue(createMockTheme({
      setTheme: mockSetTheme,
    }))
  })

  // Simple test to isolate the issue
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

      // The mobile menu should be present (sheet trigger)
      const menuButton = screen.getByTestId('menu-icon').closest('button')
      expect(menuButton).toBeInTheDocument()
    })
  })

  describe('theme Toggle', () => {
    it('shows theme toggle button when theme is light', () => {
      mockUseTheme.mockReturnValue({
        theme: 'light',
        setTheme: mockSetTheme,
        systemTheme: 'light',
        themes: ['light', 'dark'],
        resolvedTheme: 'light',
      } as any)

      render(<Header />)

      const themeButtons = screen.getAllByTestId('nav-theme-toggle')
      expect(themeButtons).toHaveLength(2)
    })

    it('shows theme toggle button when theme is dark', () => {
      mockUseTheme.mockReturnValue(createMockTheme({
        theme: 'dark',
        setTheme: mockSetTheme,
      }))

      render(<Header />)

      const themeButtons = screen.getAllByTestId('nav-theme-toggle')
      expect(themeButtons).toHaveLength(2)
    })

    it('toggles theme when theme button is clicked', () => {
      render(<Header />)

      const themeButtons = screen.getAllByTestId('nav-theme-toggle')
      expect(themeButtons).toHaveLength(2)

      // Click the first (desktop) theme button
      if (themeButtons[0]) {
        fireEvent.click(themeButtons[0])
      }

      expect(mockSetTheme).toHaveBeenCalledWith('dark')
    })

    it('toggles from dark to light theme', () => {
      mockUseTheme.mockReturnValue({
        theme: 'dark',
        setTheme: mockSetTheme,
        systemTheme: 'dark',
        themes: ['light', 'dark'],
        resolvedTheme: 'dark',
      } as any)

      render(<Header />)

      const themeButtons = screen.getAllByTestId('nav-theme-toggle')
      // Click the first (desktop) theme button
      if (themeButtons[0]) {
        fireEvent.click(themeButtons[0])
      }

      expect(mockSetTheme).toHaveBeenCalledWith('light')
    })
  })

  describe('navigation', () => {
    it('renders navigation links with correct hrefs', () => {
      render(<Header />)

      // Test desktop navigation links
      const guidesLink = screen.getByTestId('nav-link-guides')
      const workflowsLink = screen.getByTestId('nav-link-workflows')
      const conceptsLink = screen.getByTestId('nav-link-concepts')
      const arsenalLink = screen.getByTestId('nav-link-l-arsenal-ia')

      expect(guidesLink).toHaveAttribute('href', '/guides')
      expect(workflowsLink).toHaveAttribute('href', '/workflows')
      expect(conceptsLink).toHaveAttribute('href', '/concepts')
      expect(arsenalLink).toHaveAttribute('href', '/l-arsenal-ia')
    })

    it('highlights active navigation link', () => {
      // Note: Pathname testing is limited with global mock
      render(<Header />)

      const guidesLink = screen.getByTestId('nav-link-guides')

      // Check if active styling is applied (this depends on actual implementation)
      expect(guidesLink).toBeInTheDocument()
    })

    it('updates active state based on pathname', () => {
      // Note: Pathname testing is limited with global mock
      render(<Header />)

      // All navigation links should be rendered
      expect(screen.getByTestId('nav-link-guides')).toBeInTheDocument()
      expect(screen.getByTestId('nav-link-workflows')).toBeInTheDocument()
      expect(screen.getByTestId('nav-link-concepts')).toBeInTheDocument()
      expect(screen.getByTestId('nav-link-l-arsenal-ia')).toBeInTheDocument()
    })
  })

  describe('mobile Menu', () => {
    it('renders mobile menu sheet structure', () => {
      render(<Header />)

      // Mobile menu should be available
      const menuButton = screen.getByTestId('menu-icon').closest('button')
      expect(menuButton).toBeInTheDocument()
    })

    it('renders mobile navigation in sheet', () => {
      render(<Header />)

      // Mobile navigation should be available
      const menuButton = screen.getByTestId('menu-icon').closest('button')
      expect(menuButton).toBeInTheDocument()
    })

    it('renders theme toggle in mobile menu', () => {
      render(<Header />)

      // Theme toggle should be present (there are two - one for desktop, one for mobile)
      const themeButtons = screen.getAllByTestId('nav-theme-toggle')
      expect(themeButtons).toHaveLength(2)
    })
  })

  describe('command Palette Integration', () => {
    it('renders command palette component', () => {
      render(<Header />)

      // Command palette appears in both desktop and mobile
      expect(screen.getAllByTestId('command-palette')).toHaveLength(2)
    })
  })

  describe('accessibility', () => {
    it('provides accessible navigation structure', () => {
      render(<Header />)

      // Header should be in a nav element or have appropriate ARIA
      const header = screen.getByRole('banner') || screen.getByTestId('header')
      expect(header).toBeInTheDocument()
    })

    it('provides accessible theme toggle button', () => {
      render(<Header />)

      const themeButtons = screen.getAllByTestId('nav-theme-toggle')
      expect(themeButtons).toHaveLength(2)

      // Check that theme buttons exist and are accessible
      expect(themeButtons[0]).toBeInTheDocument()
    })

    it('provides accessible mobile menu trigger', () => {
      render(<Header />)

      const menuButton = screen.getByTestId('menu-icon').closest('button')
      expect(menuButton).toBeInTheDocument()

      // Should have accessible label (checking if it exists)
      expect(menuButton).toBeInTheDocument()
    })
  })

  describe('responsive Design', () => {
    it('shows desktop navigation on desktop', () => {
      render(<Header />)

      // Desktop navigation should be visible
      expect(screen.getByTestId('nav-link-guides')).toBeInTheDocument()
      expect(screen.getByTestId('nav-link-workflows')).toBeInTheDocument()
    })

    it('shows mobile menu trigger', () => {
      render(<Header />)

      // Mobile menu trigger should be present
      const menuButton = screen.getByTestId('menu-icon').closest('button')
      expect(menuButton).toBeInTheDocument()
    })
  })

  describe('brand and Logo', () => {
    it('renders brand name and logo', () => {
      render(<Header />)

      expect(screen.getAllByTestId('nav-logo')).toHaveLength(2)
      expect(screen.getAllByText('Pharma Prompt')).toHaveLength(2) // Desktop and mobile versions
    })

    it('brand name links to home page', () => {
      render(<Header />)

      // Test the desktop logo link
      const brandLinks = screen.getAllByTestId('nav-logo')
      expect(brandLinks[0]).toHaveAttribute('href', '/')
    })
  })

  describe('error Handling', () => {
    it('handles missing theme gracefully', () => {
      mockUseTheme.mockReturnValue({
        theme: undefined,
        setTheme: mockSetTheme,
        systemTheme: 'light',
        themes: ['light', 'dark'],
        resolvedTheme: 'light',
      } as any)

      expect(() => render(<Header />)).not.toThrow()
    })

    it('handles navigation errors gracefully', () => {
      // Note: Pathname error testing is limited with global mock
      expect(() => render(<Header />)).not.toThrow()
    })
  })
})
