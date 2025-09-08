import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ConsentBanner } from '@/components/consent/ConsentBanner'

// Mock the consent hook
const mockAccept = vi.fn()
const mockDecline = vi.fn()
const mockUseConsent = vi.fn()

vi.mock('@/hooks/useConsent', () => ({
  useConsent: () => mockUseConsent(),
}))

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Cookie: () => <div data-testid="cookie-icon">Cookie</div>,
  Shield: () => <div data-testid="shield-icon">Shield</div>,
  Settings: () => <div data-testid="settings-icon">Settings</div>,
}))

describe('consentBanner', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockUseConsent.mockReturnValue({
      status: 'pending',
      accept: mockAccept,
      decline: mockDecline,
    })
  })

  it('renders banner when consent is null', () => {
    render(<ConsentBanner />)

    expect(screen.getByText('Confort et Confidentialité')).toBeInTheDocument()
    expect(screen.getByText('Activer le confort')).toBeInTheDocument()
    expect(screen.getByText('Naviguer sans sauvegarde')).toBeInTheDocument()
    expect(screen.getByTestId('shield-icon')).toBeInTheDocument()
    expect(screen.getByTestId('settings-icon')).toBeInTheDocument()
  })

  it('does not render when consent is already given', () => {
    mockUseConsent.mockReturnValue({
      status: 'accepted',
      accept: mockAccept,
      decline: mockDecline,
    })

    const { container } = render(<ConsentBanner />)
    expect(container.firstChild).toBeNull()
  })

  it('does not render when consent is refused', () => {
    mockUseConsent.mockReturnValue({
      status: 'declined',
      accept: mockAccept,
      decline: mockDecline,
    })

    const { container } = render(<ConsentBanner />)
    expect(container.firstChild).toBeNull()
  })

  it('calls setConsent with true when accept button is clicked', () => {
    render(<ConsentBanner />)

    const acceptButton = screen.getByText('Activer le confort')
    fireEvent.click(acceptButton)

    expect(mockAccept).toHaveBeenCalled()
  })

  it('calls setConsent with false when refuse button is clicked', () => {
    render(<ConsentBanner />)

    const refuseButton = screen.getByText('Naviguer sans sauvegarde')
    fireEvent.click(refuseButton)

    expect(mockDecline).toHaveBeenCalled()
  })

  // Note: There's no close button in the current implementation

  // Note: There's no loading state in the current implementation

  it('displays consent description correctly', () => {
    render(<ConsentBanner />)

    expect(screen.getByText(/Nous souhaitons sauvegarder vos préférences/)).toBeInTheDocument()
    expect(screen.getByText(/Aucune donnée personnelle ou de santé n'est collectée/)).toBeInTheDocument()
    expect(screen.getByText(/Vous gardez le contrôle total/)).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    render(<ConsentBanner />)

    const banner = screen.getByRole('banner')
    expect(banner).toHaveAttribute('aria-label', 'Consentement aux cookies')

    const acceptButton = screen.getByRole('button', { name: 'Accepter' })
    const refuseButton = screen.getByRole('button', { name: 'Refuser' })
    const closeButton = screen.getByRole('button', { name: 'Fermer le bandeau de consentement' })

    expect(acceptButton).toBeInTheDocument()
    expect(refuseButton).toBeInTheDocument()
    expect(closeButton).toBeInTheDocument()
  })

  it('applies correct styling for fixed positioning', () => {
    render(<ConsentBanner />)

    const banner = screen.getByRole('banner')
    expect(banner).toHaveClass('fixed', 'bottom-0', 'left-0', 'right-0')
    expect(banner).toHaveClass('bg-background/95', 'backdrop-blur')
    expect(banner).toHaveClass('border-t', 'shadow-lg')
  })

  it('handles keyboard navigation properly', () => {
    render(<ConsentBanner />)

    const acceptButton = screen.getByText('Accepter')
    const refuseButton = screen.getByText('Refuser')
    const closeButton = screen.getByTestId('close-icon').closest('button')

    // All buttons should be focusable
    expect(acceptButton).toHaveAttribute('tabIndex', '0')
    expect(refuseButton).toHaveAttribute('tabIndex', '0')
    expect(closeButton).toHaveAttribute('tabIndex', '0')
  })

  it('supports escape key to refuse consent', () => {
    render(<ConsentBanner />)

    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' })

    expect(mockDecline).toHaveBeenCalled()
  })

  it('provides clear visual hierarchy with proper contrast', () => {
    render(<ConsentBanner />)

    const acceptButton = screen.getByText('Activer le confort')
    const refuseButton = screen.getByText('Naviguer sans sauvegarde')

    // Accept button should be primary (more prominent)
    expect(acceptButton).toHaveClass('bg-primary', 'text-primary-foreground')

    // Refuse button should be secondary (less prominent)
    expect(refuseButton).toHaveClass('border-input', 'bg-background')
  })

  it('handles rapid clicking gracefully', () => {
    render(<ConsentBanner />)

    const acceptButton = screen.getByText('Activer le confort')

    // Click multiple times rapidly
    fireEvent.click(acceptButton)
    fireEvent.click(acceptButton)
    fireEvent.click(acceptButton)

    // Should call accept for each click
    expect(mockAccept).toHaveBeenCalledTimes(3)
  })

  // Note: Loading state test removed as there's no loading state in current implementation

  it('provides safe area padding for mobile devices', () => {
    render(<ConsentBanner />)

    const banner = screen.getByRole('banner')
    expect(banner).toHaveClass('safe-area-padding-bottom')
  })
})
