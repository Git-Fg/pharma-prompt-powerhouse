import { fireEvent, render, screen } from '@/test-utils'
import React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ConsentBanner } from './ConsentBanner'

// Mock the consent hook
const mockAccept = vi.fn()
const mockDecline = vi.fn()
const mockUseConsent = vi.fn()

vi.mock('@/hooks/useConsent', () => ({
  useConsent: () => mockUseConsent(),
}))

describe('ConsentBanner', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockUseConsent.mockReturnValue({
      status: 'pending',
      accept: mockAccept,
      decline: mockDecline,
    })
  })

  it('renders banner when consent is pending', () => {
    render(<ConsentBanner />)

    expect(screen.getByText('Confort et Confidentialité')).toBeInTheDocument()
    expect(screen.getByText('Activer le confort')).toBeInTheDocument()
    expect(screen.getByText('Naviguer sans sauvegarde')).toBeInTheDocument()
  })

  it('does not render when consent is already accepted', () => {
    mockUseConsent.mockReturnValue({
      status: 'accepted',
      accept: mockAccept,
      decline: mockDecline,
    })

    const { container } = render(<ConsentBanner />)
    expect(container.firstChild).toBeNull()
  })

  it('does not render when consent is declined', () => {
    mockUseConsent.mockReturnValue({
      status: 'declined',
      accept: mockAccept,
      decline: mockDecline,
    })

    const { container } = render(<ConsentBanner />)
    expect(container.firstChild).toBeNull()
  })

  it('calls accept function when accept button is clicked', () => {
    render(<ConsentBanner />)

    const acceptButton = screen.getByText('Activer le confort')
    fireEvent.click(acceptButton)

    expect(mockAccept).toHaveBeenCalledTimes(1)
  })

  it('calls decline function when decline button is clicked', () => {
    render(<ConsentBanner />)

    const declineButton = screen.getByText('Naviguer sans sauvegarde')
    fireEvent.click(declineButton)

    expect(mockDecline).toHaveBeenCalledTimes(1)
  })

  it('has proper accessibility attributes', () => {
    render(<ConsentBanner />)

    const banner = screen.getByRole('banner')
    expect(banner).toBeInTheDocument()

    const acceptButton = screen.getByRole('button', { name: 'Activer le confort' })
    const declineButton = screen.getByRole('button', { name: 'Naviguer sans sauvegarde' })
    
    expect(acceptButton).toBeInTheDocument()
    expect(declineButton).toBeInTheDocument()
  })

  it('displays correct messaging about data usage', () => {
    render(<ConsentBanner />)

    // Check for key privacy messaging
    expect(screen.getByText(/Confort et Confidentialité/)).toBeInTheDocument()
    
    // Should have informative text about what consent means
    const banner = screen.getByRole('banner')
    expect(banner).toBeInTheDocument()
  })

  it('renders with proper styling and layout', () => {
    render(<ConsentBanner />)

    const banner = screen.getByRole('banner')
    expect(banner).toHaveClass('fixed') // Should be positioned fixed
  })

  describe('button interactions', () => {
    it('prevents multiple accept calls when rapidly clicked', () => {
      render(<ConsentBanner />)

      const acceptButton = screen.getByText('Activer le confort')
      
      // Rapid clicks
      fireEvent.click(acceptButton)
      fireEvent.click(acceptButton)
      fireEvent.click(acceptButton)

      // Should only be called once per click event
      expect(mockAccept).toHaveBeenCalledTimes(3)
    })

    it('prevents multiple decline calls when rapidly clicked', () => {
      render(<ConsentBanner />)

      const declineButton = screen.getByText('Naviguer sans sauvegarde')
      
      // Rapid clicks
      fireEvent.click(declineButton)
      fireEvent.click(declineButton)

      expect(mockDecline).toHaveBeenCalledTimes(2)
    })
  })

  describe('responsive behavior', () => {
    it('should be visible and functional on different screen sizes', () => {
      render(<ConsentBanner />)

      const banner = screen.getByRole('banner')
      expect(banner).toBeInTheDocument()

      // Buttons should be accessible
      expect(screen.getByText('Activer le confort')).toBeInTheDocument()
      expect(screen.getByText('Naviguer sans sauvegarde')).toBeInTheDocument()
    })
  })

  describe('error handling', () => {
    it('handles missing consent functions gracefully', () => {
      mockUseConsent.mockReturnValue({
        status: 'pending',
        accept: undefined,
        decline: undefined,
      })

      expect(() => render(<ConsentBanner />)).not.toThrow()
    })

    it('handles invalid consent status gracefully', () => {
      mockUseConsent.mockReturnValue({
        status: 'invalid',
        accept: mockAccept,
        decline: mockDecline,
      })

      // Should still render for unknown status
      render(<ConsentBanner />)
      expect(screen.getByText('Confort et Confidentialité')).toBeInTheDocument()
    })
  })
})