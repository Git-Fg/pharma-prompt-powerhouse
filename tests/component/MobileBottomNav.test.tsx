import { fireEvent, render, screen } from '@testing-library/react'
import { usePathname } from 'next/navigation'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'

// Mock Next.js navigation
const mockPush = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: mockPush,
  })),
  usePathname: vi.fn(() => '/'),
}))

// Mock mobile hook
vi.mock('@/hooks/use-mobile', () => ({
  useIsMobile: vi.fn(() => true),
}))

// Mock navigation
vi.mock('@/lib/navigation', () => ({
  getMobileNavigationLinks: vi.fn(() => [
    { name: 'Accueil', href: '/', isActive: false },
    { name: 'Guides', href: '/guides', isActive: false },
    { name: 'Workflows', href: '/workflows', isActive: false },
    { name: 'Concepts', href: '/concepts', isActive: false },
    { name: 'L\'Arsenal IA', href: '/l-arsenal-ia', isActive: false },
  ]),
}))

// Import the mocked hook
import { useIsMobile } from '@/hooks/use-mobile'

// Note: lucide-react icons are mocked globally in tests/setup.ts

describe('mobileBottomNav', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders all navigation items on mobile', () => {
    render(<MobileBottomNav />)

    expect(screen.getByTestId('home-icon')).toBeInTheDocument()
    expect(screen.getByTestId('book-icon')).toBeInTheDocument()
    expect(screen.getByTestId('search-icon')).toBeInTheDocument()
    expect(screen.getByTestId('lightbulb-icon')).toBeInTheDocument()
    expect(screen.getByTestId('wrench-icon')).toBeInTheDocument()

    expect(screen.getByText('Accueil')).toBeInTheDocument()
    expect(screen.getByText('Guides')).toBeInTheDocument()
    expect(screen.getByText('Recherche')).toBeInTheDocument()
    expect(screen.getByText('Concepts')).toBeInTheDocument()
    expect(screen.getByText('Workflows')).toBeInTheDocument()
  })

  it('does not render on desktop', () => {
    vi.mocked(useIsMobile).mockReturnValue(false)

    const { container } = render(<MobileBottomNav />)
    expect(container.firstChild).toBeNull()
  })

  it('highlights active navigation item', () => {
    vi.mocked(usePathname).mockReturnValue('/guides')

    render(<MobileBottomNav />)

    const guidesButton = screen.getByText('Guides').closest('button')
    expect(guidesButton).toHaveClass('text-primary')
  })

  it('navigates to correct routes when items are clicked', () => {
    render(<MobileBottomNav />)

    fireEvent.click(screen.getByText('Accueil'))
    expect(mockPush).toHaveBeenCalledWith('/')

    fireEvent.click(screen.getByText('Guides'))
    expect(mockPush).toHaveBeenCalledWith('/guides')

    fireEvent.click(screen.getByText('Concepts'))
    expect(mockPush).toHaveBeenCalledWith('/concepts')

    fireEvent.click(screen.getByText('Workflows'))
    expect(mockPush).toHaveBeenCalledWith('/workflows')
  })

  it('opens command palette when search is clicked', () => {
    // Mock the command palette trigger
    const mockOpen = vi.fn()
    Object.defineProperty(window, 'dispatchEvent', {
      value: mockOpen,
      writable: true,
    })

    render(<MobileBottomNav />)

    fireEvent.click(screen.getByText('Recherche'))

    // Should trigger command palette open event
    expect(mockOpen).toHaveBeenCalled()
  })

  it('has proper accessibility attributes', () => {
    render(<MobileBottomNav />)

    const nav = screen.getByRole('navigation')
    expect(nav).toHaveAttribute('aria-label', 'Navigation mobile')

    // Check that all buttons are properly accessible
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(5)

    buttons.forEach((button) => {
      expect(button).toHaveAttribute('aria-label')
    })
  })

  it('applies proper styling for mobile layout', () => {
    render(<MobileBottomNav />)

    const nav = screen.getByRole('navigation')
    expect(nav).toHaveClass('fixed', 'bottom-0', 'left-0', 'right-0')
    expect(nav).toHaveClass('bg-background/95', 'backdrop-blur', 'supports-[backdrop-filter]:bg-background/60')
    expect(nav).toHaveClass('border-t')
  })

  it('handles active state for nested routes', () => {
    vi.mocked(usePathname).mockReturnValue('/guides/specific-guide')

    render(<MobileBottomNav />)

    const guidesButton = screen.getByText('Guides').closest('button')
    expect(guidesButton).toHaveClass('text-primary')
  })

  it('handles route changes correctly', () => {
    const { rerender } = render(<MobileBottomNav />)

    // Initially on home
    let homeButton = screen.getByText('Accueil').closest('button')
    expect(homeButton).toHaveClass('text-primary')

    // Change to concepts route
    vi.mocked(usePathname).mockReturnValue('/concepts')
    rerender(<MobileBottomNav />)

    homeButton = screen.getByText('Accueil').closest('button')
    const conceptsButton = screen.getByText('Concepts').closest('button')

    expect(homeButton).not.toHaveClass('text-primary')
    expect(conceptsButton).toHaveClass('text-primary')
  })

  it('provides safe area padding for devices with notches', () => {
    render(<MobileBottomNav />)

    const nav = screen.getByRole('navigation')
    expect(nav).toHaveClass('safe-area-padding-bottom')
  })
})
