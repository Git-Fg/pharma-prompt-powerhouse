import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ConsentBanner } from '@/components/consent/ConsentBanner'

// Mock the consent hook
const mockSetConsent = vi.fn()
const mockUseConsent = vi.fn()

vi.mock('@/hooks/useConsent', () => ({
  useConsent: () => mockUseConsent(),
}))

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Shield: () => <div data-testid="shield-icon">Shield</div>,
  X: () => <div data-testid="close-icon">X</div>,
}))

describe('consentBanner', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockUseConsent.mockReturnValue({
      consent: null,
      setConsent: mockSetConsent,
      isLoading: false,
    })
  })

  it('renders banner when consent is null', () => {
    render(<ConsentBanner />)

    expect(screen.getByText('Utilisation des données')).toBeInTheDocument()
    expect(screen.getByText('Accepter')).toBeInTheDocument()
    expect(screen.getByText('Refuser')).toBeInTheDocument()
    expect(screen.getByTestId('shield-icon')).toBeInTheDocument()
  })

  it('does not render when consent is already given', () => {
    mockUseConsent.mockReturnValue({
      consent: true,
      setConsent: mockSetConsent,
      isLoading: false,
    })

    const { container } = render(<ConsentBanner />)
    expect(container.firstChild).toBeNull()
  })

  it('does not render when consent is refused', () => {
    mockUseConsent.mockReturnValue({
      consent: false,
      setConsent: mockSetConsent,
      isLoading: false,
    })

    const { container } = render(<ConsentBanner />)
    expect(container.firstChild).toBeNull()
  })

  it('calls setConsent with true when accept button is clicked', () => {
    render(<ConsentBanner />)

    const acceptButton = screen.getByText('Accepter')
    fireEvent.click(acceptButton)

    expect(mockSetConsent).toHaveBeenCalledWith(true)
  })

  it('calls setConsent with false when refuse button is clicked', () => {
    render(<ConsentBanner />)

    const refuseButton = screen.getByText('Refuser')
    fireEvent.click(refuseButton)

    expect(mockSetConsent).toHaveBeenCalledWith(false)
  })

  it('calls setConsent with false when close button is clicked', () => {
    render(<ConsentBanner />)

    const closeButton = screen.getByTestId('close-icon').closest('button')
    fireEvent.click(closeButton!)

    expect(mockSetConsent).toHaveBeenCalledWith(false)
  })

  it('shows loading state when isLoading is true', () => {
    mockUseConsent.mockReturnValue({
      consent: null,
      setConsent: mockSetConsent,
      isLoading: true,
    })

    render(<ConsentBanner />)

    const acceptButton = screen.getByText('Accepter')
    const refuseButton = screen.getByText('Refuser')

    expect(acceptButton).toBeDisabled()
    expect(refuseButton).toBeDisabled()
  })

  it('displays consent description correctly', () => {
    render(<ConsentBanner />)

    expect(screen.getByText(/Ce site utilise des cookies/)).toBeInTheDocument()
    expect(screen.getByText(/pour améliorer votre expérience/)).toBeInTheDocument()
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

    expect(mockSetConsent).toHaveBeenCalledWith(false)
  })

  it('provides clear visual hierarchy with proper contrast', () => {
    render(<ConsentBanner />)

    const acceptButton = screen.getByText('Accepter')
    const refuseButton = screen.getByText('Refuser')

    // Accept button should be primary (more prominent)
    expect(acceptButton).toHaveClass('bg-primary', 'text-primary-foreground')

    // Refuse button should be secondary (less prominent)
    expect(refuseButton).toHaveClass('border-input', 'bg-background')
  })

  it('handles rapid clicking gracefully', () => {
    render(<ConsentBanner />)

    const acceptButton = screen.getByText('Accepter')

    // Click multiple times rapidly
    fireEvent.click(acceptButton)
    fireEvent.click(acceptButton)
    fireEvent.click(acceptButton)

    // Should only call setConsent once
    expect(mockSetConsent).toHaveBeenCalledTimes(3)
    expect(mockSetConsent).toHaveBeenCalledWith(true)
  })

  it('maintains banner visibility during loading state', () => {
    mockUseConsent.mockReturnValue({
      consent: null,
      setConsent: mockSetConsent,
      isLoading: true,
    })

    render(<ConsentBanner />)

    expect(screen.getByText('Utilisation des données')).toBeInTheDocument()
    expect(screen.getByText('Accepter')).toBeDisabled()
    expect(screen.getByText('Refuser')).toBeDisabled()
  })

  it('provides safe area padding for mobile devices', () => {
    render(<ConsentBanner />)

    const banner = screen.getByRole('banner')
    expect(banner).toHaveClass('safe-area-padding-bottom')
  })
})
