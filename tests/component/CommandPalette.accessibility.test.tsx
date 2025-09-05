import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { CommandPalette } from '@/components/search/CommandPalette'
import { testAccessibility, testKeyboardNavigation } from '../utils/accessibility'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}))

// Mock content loader
vi.mock('@/lib/content-loader', () => ({
  content: {
    guides: [
      { slug: 'guide-1', title: 'Guide de test 1' },
      { slug: 'guide-2', title: 'Guide de test 2' },
    ],
    concepts: [
      { slug: 'concept-1', title: 'Concept de test 1' },
    ],
    workflows: [
      { slug: 'workflow-1', title: 'Workflow de test 1' },
    ],
    externalTools: [
      { slug: 'tool-1', title: 'Outil de test 1' },
    ],
  },
}))

describe('CommandPalette Accessibility', () => {
  it('should pass accessibility audit', async () => {
    const user = userEvent.setup()
    const renderResult = render(<CommandPalette />)
    
    // Open the command palette
    const trigger = screen.getByRole('button', { name: /rechercher/i })
    await user.click(trigger)
    
    // Wait for dialog to be fully rendered
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })
    
    // Test accessibility
    await testAccessibility(renderResult, {
      rules: {
        // Dialog should have proper labeling
        'dialog-title': { enabled: true },
        'aria-dialog-name': { enabled: true },
      }
    })
  })

  it('should have proper keyboard navigation', async () => {
    const user = userEvent.setup()
    render(<CommandPalette />)
    
    // Test keyboard shortcut
    await user.keyboard('{Meta>}k{/Meta}')
    
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })
    
    const dialog = screen.getByRole('dialog')
    const keyboardNav = testKeyboardNavigation(dialog)
    
    expect(keyboardNav.focusableCount).toBeGreaterThan(0)
    expect(keyboardNav.hasProperTabOrder()).toBe(true)
  })

  it('should have proper ARIA attributes', async () => {
    const user = userEvent.setup()
    render(<CommandPalette />)
    
    // Open dialog
    const trigger = screen.getByRole('button', { name: /rechercher/i })
    await user.click(trigger)
    
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })
    
    // Check for dialog title and description
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-labelledby')
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-describedby')
    
    // Check for live region
    const liveRegion = screen.getByText(/résultats disponibles/i)
    expect(liveRegion).toHaveAttribute('aria-live', 'polite')
    expect(liveRegion).toHaveAttribute('aria-atomic', 'true')
  })

  it('should announce search results', async () => {
    const user = userEvent.setup()
    render(<CommandPalette />)
    
    // Open dialog
    const trigger = screen.getByRole('button', { name: /rechercher/i })
    await user.click(trigger)
    
    await waitFor(() => {
      const liveRegion = screen.getByText(/résultats disponibles/i)
      expect(liveRegion).toBeInTheDocument()
    })
  })

  it('should support escape key to close', async () => {
    const user = userEvent.setup()
    render(<CommandPalette />)
    
    // Open dialog
    const trigger = screen.getByRole('button', { name: /rechercher/i })
    await user.click(trigger)
    
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })
    
    // Close with escape
    await user.keyboard('{Escape}')
    
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })
})