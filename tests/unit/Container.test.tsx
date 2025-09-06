import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Container } from '@/components/layout/Container'

describe('container Component', () => {
  it('should render children with default className', () => {
    render(
      <Container>
        <div>Test Content</div>
      </Container>,
    )

    const container = screen.getByText('Test Content').parentElement
    expect(container).toHaveClass('w-full')
    expect(container).toHaveClass('container')
    expect(container).toHaveClass('mx-auto')
    expect(container).toHaveClass('px-4')
  })

  it('should merge custom className with default classes', () => {
    render(
      <Container className="custom-class">
        <div>Test Content</div>
      </Container>,
    )

    const container = screen.getByText('Test Content').parentElement
    expect(container).toHaveClass('w-full')
    expect(container).toHaveClass('container')
    expect(container).toHaveClass('custom-class')
  })

  it('should forward additional props to the div element', () => {
    render(
      <Container data-testid="test-container" aria-label="Test container">
        <div>Test Content</div>
      </Container>,
    )

    const container = screen.getByTestId('test-container')
    expect(container).toHaveAttribute('aria-label', 'Test container')
  })

  it('should handle multiple children', () => {
    render(
      <Container>
        <div>First Child</div>
        <div>Second Child</div>
        <div>Third Child</div>
      </Container>,
    )

    expect(screen.getByText('First Child')).toBeInTheDocument()
    expect(screen.getByText('Second Child')).toBeInTheDocument()
    expect(screen.getByText('Third Child')).toBeInTheDocument()
  })

  it('should handle empty children', () => {
    const { container } = render(<Container>{null}</Container>)
    expect(container.firstChild).toHaveClass('container')
  })
})
