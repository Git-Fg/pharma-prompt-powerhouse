/**
 * Server Component Testing Examples
 * Modern testing patterns for React 19 + Next.js 15
 */

import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderServerComponent, testAccessibility } from '../utils/testing-utils'

// Mock content for testing
const mockWorkflow = {
  id: 'test-workflow',
  slug: 'test-workflow',
  title: 'Test Workflow',
  description: 'A test workflow for demonstration',
  category: 'research',
  tags: ['test', 'demo'],
  isFavorite: false,
  difficulty: 'beginner',
  isWorkflow: true as const,
  content: [],
  concepts: [],
  relatedGuides: [],
  steps: [
    {
      id: 'step-1',
      title: 'First Step',
      content: 'This is the first step',
    },
  ],
  keyTakeaways: ['Key takeaway 1', 'Key takeaway 2'],
  relatedContent: {
    guides: [],
    concepts: [],
    tools: [],
  },
  lastUpdated: '2024-01-01',
}

describe('server Components Testing', () => {
  beforeEach(() => {
    // Reset any global state before each test
    vi.clearAllMocks()
  })

  describe('workflowCard Server Component', () => {
    // Example of testing a Server Component as an async function
    async function WorkflowCardServer() {
      // Simulate Server Component data fetching
      const workflow = await Promise.resolve(mockWorkflow)

      // Import the component dynamically to avoid SSR issues in tests
      const { WorkflowCard } = await import('@/components/shared/WorkflowCard')

      return <WorkflowCard workflow={workflow} />
    }

    it('renders workflow card with correct data', async () => {
      const { getByText, getByRole } = await renderServerComponent(WorkflowCardServer)

      expect(getByText('Test Workflow')).toBeInTheDocument()
      expect(getByText('A test workflow for demonstration')).toBeInTheDocument()
      expect(getByRole('button', { name: /démarrer le workflow/i })).toBeInTheDocument()
    })

    it('meets accessibility standards', async () => {
      const renderResult = await renderServerComponent(WorkflowCardServer)

      await testAccessibility(renderResult, {
        rules: {
          'link-name': { enabled: true },
          'heading-order': { enabled: true },
        },
      })
    })

    it('handles long content gracefully', async () => {
      const longTitleWorkflow = {
        ...mockWorkflow,
        title: 'A very long workflow title that should be properly truncated and handled gracefully in the UI',
        description: 'A very long description that goes on and on and should also be handled properly in terms of layout and readability without breaking the design or causing accessibility issues',
      }

      async function LongContentWorkflowCard() {
        const { WorkflowCard } = await import('@/components/shared/WorkflowCard')
        return <WorkflowCard workflow={longTitleWorkflow} />
      }

      const { container } = await renderServerComponent(LongContentWorkflowCard)

      // Verify text truncation classes are applied
      const titleElement = container.querySelector('.line-clamp-2')
      expect(titleElement).toBeInTheDocument()
    })
  })

  describe('contentRenderer Server Component', () => {
    async function ContentRendererServer() {
      const content = [
        {
          type: 'markdown' as const,
          content: 'This is a test paragraph',
        },
        {
          type: 'codeBlock' as const,
          content: 'console.log("Hello, World!")',
          language: 'javascript',
        },
      ]

      const { ContentRenderer } = await import('@/components/shared/ContentRenderer')
      return <ContentRenderer content={content} />
    }

    it('renders different content types correctly', async () => {
      const { getByText } = await renderServerComponent(ContentRendererServer)

      expect(getByText('This is a test paragraph')).toBeInTheDocument()
      expect(getByText('console.log("Hello, World!")')).toBeInTheDocument()
    })

    it('applies correct semantic markup', async () => {
      const { container } = await renderServerComponent(ContentRendererServer)

      // Check for proper semantic elements
      const markdownContent = container.querySelector('.prose')
      const codeBlock = container.querySelector('pre code')

      expect(markdownContent).toBeInTheDocument()
      expect(codeBlock).toBeInTheDocument()
    })
  })

  describe('performance Testing', () => {
    it('renders components within performance budget', async () => {
      const { measureRenderPerformance } = await import('../utils/testing-utils')

      const performance = measureRenderPerformance(
        () => renderServerComponent(async () => {
          const { WorkflowCard } = await import('@/components/shared/WorkflowCard')
          return <WorkflowCard workflow={mockWorkflow} />
        }),
        5,
      )

      // Expect render time to be under 16ms (60fps budget)
      performance.expectFastRender(16)
    })
  })
})

describe('integration Testing with Multiple Components', () => {
  async function WorkflowPageServer() {
    // Simulate page-level Server Component
    const workflows = await Promise.resolve([mockWorkflow])

    const { StaggeredContainer } = await import('@/components/ui/css-animations')
    const { WorkflowCard } = await import('@/components/shared/WorkflowCard')

    return (
      <div>
        <h1>Workflows</h1>
        <StaggeredContainer>
          {workflows.map(workflow => (
            <WorkflowCard key={workflow.id} workflow={workflow} />
          ))}
        </StaggeredContainer>
      </div>
    )
  }

  it('renders page with multiple components correctly', async () => {
    const { getByRole, getAllByText } = await renderServerComponent(WorkflowPageServer)

    expect(getByRole('heading', { level: 1, name: 'Workflows' })).toBeInTheDocument()
    expect(getAllByText('Test Workflow').length).toBeGreaterThan(0)
  })

  it('maintains accessibility across component composition', async () => {
    const renderResult = await renderServerComponent(WorkflowPageServer)

    await testAccessibility(renderResult, {
      rules: {
        'page-has-heading-one': { enabled: true },
        'region': { enabled: true },
      },
    })
  })
})
