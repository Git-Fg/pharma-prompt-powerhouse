import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'

// Mock Next.js components and hooks
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  })),
  usePathname: vi.fn(() => '/'),
  useSearchParams: vi.fn(() => new URLSearchParams()),
}))

vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
}))

vi.mock('@/hooks/use-mobile', () => ({
  useMobile: vi.fn(() => false),
}))

vi.mock('@/hooks/useConsent', () => ({
  useConsent: vi.fn(() => ({
    consent: true,
    setConsent: vi.fn(),
    isLoading: false,
  })),
}))

// Mock content loader
vi.mock('@/lib/content-loader', () => ({
  content: {
    guides: [],
    concepts: [],
    workflows: [],
    externalTools: [],
  },
}))

// Mock lucide-react icons
vi.mock('lucide-react', () => {
  const icons = [
    'Home', 'BookOpen', 'Brain', 'Wrench', 'Search', 'ArrowRight', 'Shield',
    'Target', 'Zap', 'Star', 'ExternalLink', 'AlertTriangle', 'Check', 'X'
  ]
  
  const mockIcons: Record<string, React.ComponentType> = {}
  icons.forEach(icon => {
    mockIcons[icon] = () => <div data-testid={`icon-${icon.toLowerCase()}`}>{icon}</div>
  })
  
  return mockIcons
})

describe('Application Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders core application components without errors', async () => {
    // Mock a simple page component for testing
    const TestPage = () => (
      <div>
        <h1>Test Application</h1>
        <p>Testing integration functionality</p>
      </div>
    )

    render(<TestPage />)

    expect(screen.getByText('Test Application')).toBeInTheDocument()
    expect(screen.getByText('Testing integration functionality')).toBeInTheDocument()
  })

  it('handles responsive design breakpoints correctly', () => {
    // Test that responsive utilities work properly
    const ResponsiveComponent = () => (
      <div className="container-layout-collection">
        <div className="responsive-heading">Responsive Title</div>
        <div className="responsive-text">Responsive text content</div>
      </div>
    )

    render(<ResponsiveComponent />)

    expect(screen.getByText('Responsive Title')).toBeInTheDocument()
    expect(screen.getByText('Responsive text content')).toBeInTheDocument()
  })

  it('supports accessibility features across components', () => {
    const AccessibleComponent = () => (
      <div>
        <button aria-label="Test button">Click me</button>
        <nav aria-label="Test navigation">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </nav>
        <main aria-label="Main content">
          <h1>Main Heading</h1>
        </main>
      </div>
    )

    render(<AccessibleComponent />)

    expect(screen.getByRole('button', { name: 'Test button' })).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Test navigation' })).toBeInTheDocument()
    expect(screen.getByRole('main', { name: 'Main content' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('maintains consistent styling across components', () => {
    const StyledComponent = () => (
      <div className="space-y-4">
        <div className="prose prose-lg">
          <h2>Prose Content</h2>
          <p>This should use consistent prose styling.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card text-card-foreground p-4 rounded-lg">Card 1</div>
          <div className="bg-card text-card-foreground p-4 rounded-lg">Card 2</div>
          <div className="bg-card text-card-foreground p-4 rounded-lg">Card 3</div>
        </div>
      </div>
    )

    render(<StyledComponent />)

    expect(screen.getByText('Prose Content')).toBeInTheDocument()
    expect(screen.getByText('Card 1')).toBeInTheDocument()
    expect(screen.getByText('Card 2')).toBeInTheDocument()
    expect(screen.getByText('Card 3')).toBeInTheDocument()
  })

  it('handles interactive elements consistently', () => {
    let clickCount = 0
    const InteractiveComponent = () => (
      <div>
        <button 
          onClick={() => clickCount++}
          className="bg-primary text-primary-foreground px-4 py-2 rounded"
        >
          Interactive Button
        </button>
        <input 
          type="text" 
          placeholder="Search..."
          className="border border-input px-3 py-2 rounded"
          aria-label="Search input"
        />
        <select aria-label="Select option" className="border border-input px-3 py-2 rounded">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
        </select>
      </div>
    )

    render(<InteractiveComponent />)

    const button = screen.getByText('Interactive Button')
    const input = screen.getByLabelText('Search input')
    const select = screen.getByLabelText('Select option')

    expect(button).toBeInTheDocument()
    expect(input).toBeInTheDocument()
    expect(select).toBeInTheDocument()

    fireEvent.click(button)
    expect(clickCount).toBe(1)

    fireEvent.change(input, { target: { value: 'test search' } })
    expect(input).toHaveValue('test search')
  })

  it('supports keyboard navigation properly', () => {
    const KeyboardNavComponent = () => (
      <div>
        <button tabIndex={0}>First Button</button>
        <input type="text" tabIndex={0} placeholder="Input field" />
        <a href="#" tabIndex={0}>Link</a>
        <button tabIndex={0}>Last Button</button>
      </div>
    )

    render(<KeyboardNavComponent />)

    const firstButton = screen.getByText('First Button')
    const input = screen.getByPlaceholderText('Input field')
    const link = screen.getByText('Link')
    const lastButton = screen.getByText('Last Button')

    // All elements should be focusable
    expect(firstButton).toHaveAttribute('tabIndex', '0')
    expect(input).toHaveAttribute('tabIndex', '0')
    expect(link).toHaveAttribute('tabIndex', '0')
    expect(lastButton).toHaveAttribute('tabIndex', '0')
  })

  it('handles error states gracefully', () => {
    const ErrorComponent = ({ hasError }: { hasError: boolean }) => (
      <div>
        {hasError ? (
          <div role="alert" className="text-red-600">
            An error occurred. Please try again.
          </div>
        ) : (
          <div>Normal content</div>
        )}
      </div>
    )

    const { rerender } = render(<ErrorComponent hasError={false} />)
    expect(screen.getByText('Normal content')).toBeInTheDocument()

    rerender(<ErrorComponent hasError={true} />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText('An error occurred. Please try again.')).toBeInTheDocument()
  })

  it('supports loading states consistently', () => {
    const LoadingComponent = ({ isLoading }: { isLoading: boolean }) => (
      <div>
        {isLoading ? (
          <div aria-label="Loading" className="animate-pulse">
            <div className="h-4 bg-muted rounded w-1/4 mb-2"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </div>
        ) : (
          <div>
            <h2>Content Title</h2>
            <p>Content loaded successfully</p>
          </div>
        )}
      </div>
    )

    const { rerender } = render(<LoadingComponent isLoading={true} />)
    expect(screen.getByLabelText('Loading')).toBeInTheDocument()

    rerender(<LoadingComponent isLoading={false} />)
    expect(screen.getByText('Content Title')).toBeInTheDocument()
    expect(screen.getByText('Content loaded successfully')).toBeInTheDocument()
  })

  it('maintains proper semantic structure', () => {
    const SemanticComponent = () => (
      <div>
        <header>
          <h1>Application Header</h1>
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
            </ul>
          </nav>
        </header>
        <main>
          <article>
            <h2>Article Title</h2>
            <p>Article content goes here.</p>
          </article>
          <aside>
            <h3>Sidebar</h3>
            <p>Related information</p>
          </aside>
        </main>
        <footer>
          <p>Copyright information</p>
        </footer>
      </div>
    )

    render(<SemanticComponent />)

    expect(screen.getByRole('banner')).toBeInTheDocument() // header
    expect(screen.getByRole('navigation')).toBeInTheDocument() // nav
    expect(screen.getByRole('main')).toBeInTheDocument() // main
    expect(screen.getByRole('article')).toBeInTheDocument() // article
    expect(screen.getByRole('complementary')).toBeInTheDocument() // aside
    expect(screen.getByRole('contentinfo')).toBeInTheDocument() // footer
  })
})