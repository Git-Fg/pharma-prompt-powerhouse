import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ContentCard } from '@/components/shared/ContentCard'

describe('ContentCard', () => {
  it('should render with concept variant', () => {
    render(
      <ContentCard
        title="Test Concept"
        description="Test description"
        category="Test Category" 
        variant="concept"
      />
    )
    
    expect(screen.getByText('Test Concept')).toBeInTheDocument()
    expect(screen.getByText('Test description')).toBeInTheDocument()
    expect(screen.getByText('Test Category')).toBeInTheDocument()
    expect(screen.getByText('Disponible')).toBeInTheDocument()
  })

  it('should render with features list', () => {
    const features = ['Feature 1', 'Feature 2']
    
    render(
      <ContentCard
        title="Test Tool"
        description="Test description"
        variant="tool"
        features={features}
      />
    )
    
    expect(screen.getByText('Fonctionnalités :')).toBeInTheDocument()
    expect(screen.getByText('Feature 1')).toBeInTheDocument()
    expect(screen.getByText('Feature 2')).toBeInTheDocument()
  })

  it('should render with call-to-action button when href provided', () => {
    render(
      <ContentCard
        title="Test Guide"
        description="Test description" 
        variant="guide"
        href="/test-link"
      />
    )
    
    const button = screen.getByText('Voir plus')
    expect(button).toBeInTheDocument()
    expect(button.closest('a')).toHaveAttribute('href', '/test-link')
  })

  it('should render different status badges', () => {
    const { rerender } = render(
      <ContentCard
        title="Test"
        description="Test"
        status="coming-soon"
      />
    )
    
    expect(screen.getByText('Bientôt disponible')).toBeInTheDocument()
    
    rerender(
      <ContentCard
        title="Test"
        description="Test"
        status="development"
      />
    )
    
    expect(screen.getByText('En développement')).toBeInTheDocument()
  })
})