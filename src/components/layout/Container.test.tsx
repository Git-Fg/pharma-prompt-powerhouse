import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-react'
import { Container } from './Container'

describe('container component', () => {
  it('should render children with default className', async () => {
    const screen = await render(
      <Container>
        <div>Test Content</div>
      </Container>,
    )

    // Use expect.element for vitest-browser-react assertions
    await expect.element(screen.getByText('Test Content')).toBeVisible()

    // For class testing, use a different approach with query selectors or roles
    const container = screen.container.querySelector('div')
    expect(container).toHaveClass('w-full')
    expect(container).toHaveClass('container-layout-detail')
  })

  it('should merge custom className with default classes', async () => {
    const screen = await render(
      <Container className="custom-class">
        <div>Test Content</div>
      </Container>,
    )

    const container = screen.container.querySelector('div')
    expect(container).toHaveClass('w-full')
    expect(container).toHaveClass('container-layout-detail')
    expect(container).toHaveClass('custom-class')
  })

  it('should forward additional props to the div element', async () => {
    const screen = await render(
      <Container aria-label="Test container">
        <div>Test Content</div>
      </Container>,
    )

    const container = screen.container.querySelector('div[aria-label="Test container"]')
    expect(container).toHaveAttribute('aria-label', 'Test container')
  })

  it('should handle multiple children', async () => {
    const screen = await render(
      <Container>
        <div>First Child</div>
        <div>Second Child</div>
        <div>Third Child</div>
      </Container>,
    )

    await expect.element(screen.getByText('First Child')).toBeVisible()
    await expect.element(screen.getByText('Second Child')).toBeVisible()
    await expect.element(screen.getByText('Third Child')).toBeVisible()
  })

  it('should handle empty children', async () => {
    const screen = await render(<Container>{null}</Container>)

    // Get the rendered container element
    const container = screen.container.firstElementChild as HTMLElement
    expect(container).toHaveClass('container-layout-detail')
  })
})
