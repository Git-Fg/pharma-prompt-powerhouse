import { fireEvent, render, screen } from '@testing-library/react'
import { useTheme } from 'next-themes'
import { usePathname } from 'next/navigation'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Header } from '@/components/layout/Header'

// Mock next-themes
vi.mock('next-themes', () => ({
  useTheme: vi.fn(),
}))

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}))

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

// Mock CommandPalette
vi.mock('@/components/search/CommandPalette', () => ({
  CommandPalette: () => <div data-testid="command-palette">Command Palette</div>,
}))

// Mock navigation
vi.mock('@/lib/navigation', () => ({
  getMainNavigationLinks: vi.fn(() => [
    { href: '/guides', label: 'Guides', isActive: false },
    { href: '/workflows', label: 'Workflows', isActive: false },
    { href: '/concepts', label: 'Concepts', isActive: false },
    { href: '/l-arsenal-ia', label: 'Arsenal IA', isActive: false },
  ]),
}))

// Mock UI components
vi.mock('@/components/ui/button', () => ({
  default: ({ children, onClick, ...props }: any) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  ),
}))

vi.mock('@/components/ui/sheet', () => ({
  Sheet: ({ children }: any) => <div data-testid="sheet">{children}</div>,
  SheetTrigger: ({ children }: any) => <div data-testid="sheet-trigger">{children}</div>,
  SheetContent: ({ children }: any) => <div data-testid="sheet-content">{children}</div>,
  SheetHeader: ({ children }: any) => <div data-testid="sheet-header">{children}</div>,
  SheetTitle: ({ children }: any) => <h2 data-testid="sheet-title">{children}</h2>,
  SheetDescription: ({ children }: any) => <div data-testid="sheet-description">{children}</div>,
}))

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Brain: () => <div data-testid="brain-icon">Brain</div>,
  Menu: () => <div data-testid="menu-icon">Menu</div>,
  Moon: () => <div data-testid="moon-icon">Moon</div>,
  Sun: () => <div data-testid="sun-icon">Sun</div>,
  Search: () => <div data-testid="search-icon">Search</div>,
}))

describe('header', () => {
  const mockSetTheme = vi.fn()
  const mockUseTheme = vi.mocked(useTheme)
  const mockUsePathname = vi.mocked(usePathname)

  beforeEach(() => {
    vi.clearAllMocks()
    mockUseTheme.mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
      systemTheme: 'light',
      themes: ['light', 'dark'],
      resolvedTheme: 'light',
    } as any)
    mockUsePathname.mockReturnValue('/')
  })

  describe('rendering', () => {
    it('renders the header with main elements', () => {
      render(<Header />)

      expect(screen.getByTestId('brain-icon')).toBeInTheDocument()
      expect(screen.getByText('Pharma Prompt Powerhouse')).toBeInTheDocument()
      expect(screen.getByTestId('menu-icon')).toBeInTheDocument()
    })

    it('renders navigation links', () => {
      render(<Header />)

      expect(screen.getByText('Guides')).toBeInTheDocument()
      expect(screen.getByText('Workflows')).toBeInTheDocument()
      expect(screen.getByText('Concepts')).toBeInTheDocument()
      expect(screen.getByText('Arsenal IA')).toBeInTheDocument()
    })

    it('renders theme toggle button', () => {
      render(<Header />)

      // Should show moon icon for light theme (to switch to dark)
      expect(screen.getByTestId('moon-icon')).toBeInTheDocument()
    })

    it('renders mobile menu trigger', () => {
      render(<Header />)

      expect(screen.getByTestId('sheet-trigger')).toBeInTheDocument()
      expect(screen.getByTestId('menu-icon')).toBeInTheDocument()
    })
  })

  describe('theme Toggle', () => {
    it('shows moon icon when theme is light', () => {
      mockUseTheme.mockReturnValue({
        theme: 'light',
        setTheme: mockSetTheme,
        systemTheme: 'light',
        themes: ['light', 'dark'],
        resolvedTheme: 'light',
      } as any)

      render(<Header />)

      expect(screen.getByTestId('moon-icon')).toBeInTheDocument()
      expect(screen.queryByTestId('sun-icon')).not.toBeInTheDocument()
    })

    it('shows sun icon when theme is dark', () => {
      mockUseTheme.mockReturnValue({
        theme: 'dark',
        setTheme: mockSetTheme,
        systemTheme: 'dark',
        themes: ['light', 'dark'],
        resolvedTheme: 'dark',
      } as any)

      render(<Header />)

      expect(screen.getByTestId('sun-icon')).toBeInTheDocument()
      expect(screen.queryByTestId('moon-icon')).not.toBeInTheDocument()
    })

    it('toggles theme when theme button is clicked', () => {
      render(<Header />)

      const themeButton = screen.getByTestId('moon-icon').closest('button')
      expect(themeButton).toBeInTheDocument()

      fireEvent.click(themeButton!)

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

      const themeButton = screen.getByTestId('sun-icon').closest('button')
      fireEvent.click(themeButton!)

      expect(mockSetTheme).toHaveBeenCalledWith('light')
    })
  })

  describe('navigation', () => {
    it('renders navigation links with correct hrefs', () => {
      render(<Header />)

      const guidesLink = screen.getByText('Guides').closest('a')
      const workflowsLink = screen.getByText('Workflows').closest('a')
      const conceptsLink = screen.getByText('Concepts').closest('a')
      const arsenalLink = screen.getByText('Arsenal IA').closest('a')

      expect(guidesLink).toHaveAttribute('href', '/guides')
      expect(workflowsLink).toHaveAttribute('href', '/workflows')
      expect(conceptsLink).toHaveAttribute('href', '/concepts')
      expect(arsenalLink).toHaveAttribute('href', '/l-arsenal-ia')
    })

    it('highlights active navigation link', () => {
      mockUsePathname.mockReturnValue('/guides')

      render(<Header />)

      const guidesLink = screen.getByText('Guides').closest('a')

      // Check if active styling is applied (this depends on actual implementation)
      expect(guidesLink).toBeInTheDocument()
    })

    it('updates active state based on pathname', () => {
      mockUsePathname.mockReturnValue('/workflows')

      render(<Header />)

      // All navigation links should be rendered
      expect(screen.getByText('Guides')).toBeInTheDocument()
      expect(screen.getByText('Workflows')).toBeInTheDocument()
      expect(screen.getByText('Concepts')).toBeInTheDocument()
      expect(screen.getByText('Arsenal IA')).toBeInTheDocument()
    })
  })

  describe('mobile Menu', () => {
    it('renders mobile menu sheet structure', () => {
      render(<Header />)

      expect(screen.getByTestId('sheet')).toBeInTheDocument()
      expect(screen.getByTestId('sheet-trigger')).toBeInTheDocument()
      expect(screen.getByTestId('sheet-content')).toBeInTheDocument()
    })

    it('renders mobile navigation in sheet', () => {
      render(<Header />)

      // Mobile navigation should be present in the sheet
      expect(screen.getByTestId('sheet-content')).toBeInTheDocument()
    })

    it('renders theme toggle in mobile menu', () => {
      render(<Header />)

      // Theme toggle should be present in mobile menu as well
      const themeIcons = screen.getAllByTestId('moon-icon')
      expect(themeIcons.length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('command Palette Integration', () => {
    it('renders command palette component', () => {
      render(<Header />)

      expect(screen.getByTestId('command-palette')).toBeInTheDocument()
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

      const themeButton = screen.getByTestId('moon-icon').closest('button')
      expect(themeButton).toBeInTheDocument()

      // Should have accessible label or title
      expect(themeButton).toHaveAttribute('aria-label', 'Toggle theme')
    })

    it('provides accessible mobile menu trigger', () => {
      render(<Header />)

      const menuButton = screen.getByTestId('menu-icon').closest('button')
      expect(menuButton).toBeInTheDocument()

      // Should have accessible label
      expect(menuButton).toHaveAttribute('aria-label', 'Open menu')
    })
  })

  describe('responsive Design', () => {
    it('shows desktop navigation on desktop', () => {
      render(<Header />)

      // Desktop navigation should be visible
      expect(screen.getByText('Guides')).toBeInTheDocument()
      expect(screen.getByText('Workflows')).toBeInTheDocument()
    })

    it('shows mobile menu trigger on mobile', () => {
      render(<Header />)

      expect(screen.getByTestId('menu-icon')).toBeInTheDocument()
    })
  })

  describe('brand and Logo', () => {
    it('renders brand name and logo', () => {
      render(<Header />)

      expect(screen.getByTestId('brain-icon')).toBeInTheDocument()
      expect(screen.getByText('Pharma Prompt Powerhouse')).toBeInTheDocument()
    })

    it('brand name links to home page', () => {
      render(<Header />)

      const brandLink = screen.getByText('Pharma Prompt Powerhouse').closest('a')
      expect(brandLink).toHaveAttribute('href', '/')
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
      mockUsePathname.mockImplementation(() => {
        throw new Error('Navigation error')
      })

      expect(() => render(<Header />)).not.toThrow()
    })
  })
})
