/**
 * Tests simplifiés pour Card - Co-localisés (2025)
 * Tests d'intégration des composants UI de base
 */

import { describe, expect, it, renderWithUser, screen } from '@/test-utils'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card'

describe('Card Components', () => {
  it('renders card with basic content', () => {
    renderWithUser(
      <Card>
        <CardHeader>
          <CardTitle>Test Title</CardTitle>
          <CardDescription>Test Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card content here</p>
        </CardContent>
      </Card>,
    )

    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
    expect(screen.getByText('Card content here')).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    renderWithUser(
      <Card data-testid="test-card">
        <CardContent>Content</CardContent>
      </Card>,
    )

    const card = screen.getByTestId('test-card')
    expect(card).toHaveClass('rounded-lg', 'border')
  })

  it('supports children composition', () => {
    renderWithUser(
      <Card>
        <CardHeader>
          <CardTitle>Title only</CardTitle>
        </CardHeader>
        <CardContent>
          Just content
        </CardContent>
      </Card>,
    )

    expect(screen.getByText('Title only')).toBeInTheDocument()
    expect(screen.getByText('Just content')).toBeInTheDocument()
  })
})
