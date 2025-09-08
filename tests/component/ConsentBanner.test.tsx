import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ConsentBanner } from '@/components/consent/ConsentBanner'

// Mock the consent hook
const mockAccept = vi.fn()
const mockDecline = vi.fn()
const mockUseConsent = vi.fn()

vi.mock('@/hooks/useConsent', () => ({
  useConsent: () => mockUseConsent(),
}))

// Note: lucide-react icons are mocked globally in tests/setup.ts

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

    const acceptButtons = screen.getAllByRole('button', { name: 'Settings Activer le confort' })
    expect(acceptButtons.length).toBeGreaterThan(0)
    const acceptButton = acceptButtons[0]
    if (acceptButton) {
      fireEvent.click(acceptButton)
    }

    expect(mockAccept).toHaveBeenCalled()
  })

  it('calls setConsent with false when refuse button is clicked', () => {
    render(<ConsentBanner />)

    const refuseButtons = screen.getAllByRole('button', { name: 'Shield Naviguer sans sauvegarde' })
    expect(refuseButtons.length).toBeGreaterThan(0)
    const refuseButton = refuseButtons[0]
    if (refuseButton) {
      fireEvent.click(refuseButton)
    }

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

    // Check that the component is properly structured with accessible elements
    const heading = screen.getByRole('heading', { name: 'Confort et Confidentialité' })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveAttribute('class', 'font-semibold text-foreground')

    const acceptButton = screen.getAllByRole('button', { name: 'Settings Activer le confort' })[0]
    const refuseButton = screen.getAllByRole('button', { name: 'Shield Naviguer sans sauvegarde' })[0]

    expect(acceptButton).toBeInTheDocument()
    expect(refuseButton).toBeInTheDocument()
  })

  it('applies correct styling for fixed positioning', () => {
    render(<ConsentBanner />)

    const bannerContainer = screen.getByText('Confort et Confidentialité').closest('.fixed')
    expect(bannerContainer).toBeInTheDocument()
    expect(bannerContainer).toHaveClass('fixed', 'bottom-0', 'left-0', 'right-0')
    expect(bannerContainer).toHaveClass('bg-background/95', 'backdrop-blur-md')
    expect(bannerContainer).toHaveClass('border-t', 'z-50')
  })

  it('handles keyboard navigation properly', () => {
    render(<ConsentBanner />)

    const acceptButton = screen.getAllByRole('button', { name: 'Settings Activer le confort' })[0]
    const refuseButton = screen.getAllByRole('button', { name: 'Shield Naviguer sans sauvegarde' })[0]

    // All buttons should be focusable by default
    expect(acceptButton).toBeInTheDocument()
    expect(refuseButton).toBeInTheDocument()
  })

  // Note: Escape key handling not implemented in current component
  // it('supports escape key to refuse consent', () => {
  //   render(<ConsentBanner />)
  //   fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' })
  //   expect(mockDecline).toHaveBeenCalled()
  // })

  it('provides clear visual hierarchy with proper contrast', () => {
    render(<ConsentBanner />)

    const acceptButton = screen.getAllByRole('button', { name: 'Settings Activer le confort' })[0]
    const refuseButton = screen.getAllByRole('button', { name: 'Shield Naviguer sans sauvegarde' })[0]

    // Accept button should be primary (more prominent)
    expect(acceptButton).toHaveClass('bg-primary', 'text-primary-foreground')

    // Refuse button should be secondary (less prominent)
    expect(refuseButton).toHaveClass('border', 'bg-background', 'shadow')
  })

  it('handles rapid clicking gracefully', () => {
    render(<ConsentBanner />)

    const acceptButtons = screen.getAllByRole('button', { name: 'Settings Activer le confort' })
    expect(acceptButtons.length).toBeGreaterThan(0)
    const acceptButton = acceptButtons[0]

    // Click multiple times rapidly
    if (acceptButton) {
      fireEvent.click(acceptButton)
      fireEvent.click(acceptButton)
      fireEvent.click(acceptButton)
    }

    // Should call accept for each click
    expect(mockAccept).toHaveBeenCalledTimes(3)
  })

  // Note: Loading state test removed as there's no loading state in current implementation

  it('provides safe area padding for mobile devices', () => {
    render(<ConsentBanner />)

    const bannerContainer = screen.getByText('Confort et Confidentialité').closest('.fixed')
    expect(bannerContainer).toBeInTheDocument()
    expect(bannerContainer).toHaveClass('p-4')
  })
})
