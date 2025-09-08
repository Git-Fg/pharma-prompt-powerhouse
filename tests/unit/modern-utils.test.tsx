/**
 * Test moderne avec les nouveaux utilitaires
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderWithUserEvent, TestDataFactory, AccessibilityTestUtils } from '../utils/modern-test-utils'

// Test simple d'un composant React basique
function TestButton({ onClick, children }: { onClick?: () => void; children: React.ReactNode }) {
  return (
    <button 
      type="button" 
      onClick={onClick}
      data-testid="test-button"
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      {children}
    </button>
  )
}

describe('Modern Test Utils Validation', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render with user-event configured', async () => {
    const handleClick = vi.fn()
    const { user } = renderWithUserEvent(
      <TestButton onClick={handleClick}>Test Button</TestButton>
    )
    
    const button = document.querySelector('[data-testid="test-button"]') as HTMLElement
    expect(button).toBeInTheDocument()
    expect(button).toBeVisible()
    
    await user.click(button)
    expect(handleClick).toHaveBeenCalledOnce()
  })
  
  it('should validate button accessibility', () => {
    renderWithUserEvent(<TestButton>Accessible Button</TestButton>)
    
    const button = document.querySelector('[data-testid="test-button"]') as HTMLElement
    AccessibilityTestUtils.expectAccessibleButton(button)
  })
  
  it('should create test data with factory', () => {
    const guide = TestDataFactory.guide({
      title: 'Custom Guide',
      difficulty: 'advanced'
    })
    
    expect(guide.title).toBe('Custom Guide')
    expect(guide.difficulty).toBe('advanced')
    expect(guide.slug).toBe('test-guide')
    expect(guide.tags).toEqual(['test'])
  })
  
  it('should handle modern browser environment', () => {
    // Vérifier que nous sommes bien dans un environnement navigateur
    expect(typeof window).toBe('object')
    expect(typeof document).toBe('object')
    expect(typeof ResizeObserver).toBe('function')
  })
})