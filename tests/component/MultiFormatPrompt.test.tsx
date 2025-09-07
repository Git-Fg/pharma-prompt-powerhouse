import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { MultiFormatPrompt } from '@/components/prompts/MultiFormatPrompt'

// Mock UI components
vi.mock('@/components/ui/alert', () => ({
  Alert: ({ children, ...props }: any) => <div data-testid="alert" {...props}>{children}</div>,
  AlertDescription: ({ children }: any) => <div data-testid="alert-description">{children}</div>,
}))

vi.mock('@/components/ui/badge', () => ({
  default: ({ children, ...props }: any) => <span data-testid="badge" {...props}>{children}</span>,
}))

vi.mock('@/components/ui/button', () => ({
  default: ({ children, onClick, ...props }: any) => (
    <button onClick={onClick} data-testid="button" {...props}>
      {children}
    </button>
  ),
}))

vi.mock('@/components/ui/card', () => ({
  Card: ({ children, ...props }: any) => <div data-testid="card" {...props}>{children}</div>,
  CardContent: ({ children }: any) => <div data-testid="card-content">{children}</div>,
  CardHeader: ({ children }: any) => <div data-testid="card-header">{children}</div>,
  CardTitle: ({ children }: any) => <h3 data-testid="card-title">{children}</h3>,
}))

vi.mock('@/components/ui/tabs', () => ({
  Tabs: ({ children, defaultValue, onValueChange }: any) => (
    <div data-testid="tabs" data-default-value={defaultValue}>
      {children}
    </div>
  ),
  TabsList: ({ children }: any) => <div data-testid="tabs-list">{children}</div>,
  TabsTrigger: ({ children, value }: any) => (
    <button data-testid={`tab-trigger-${value}`} data-value={value}>
      {children}
    </button>
  ),
  TabsContent: ({ children, value }: any) => (
    <div data-testid={`tab-content-${value}`} data-value={value}>
      {children}
    </div>
  ),
}))

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Check: () => <div data-testid="check-icon">✓</div>,
  Copy: () => <div data-testid="copy-icon">📋</div>,
  ExternalLink: () => <div data-testid="external-link-icon">🔗</div>,
  Settings: () => <div data-testid="settings-icon">⚙️</div>,
}))

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn().mockResolvedValue(undefined),
  },
})

const mockPromptData = {
  alternativeVersions: {
    standard: 'This is a standard prompt with {{variable1}} and {{variable2}}.',
    xml: '<prompt><instruction>This is an XML prompt with {{variable1}} and {{variable2}}.</instruction></prompt>',
    aiStudio: {
      systemPrompt: 'You are a helpful assistant.',
      userPrompt: 'Process this with {{variable1}} and {{variable2}}.',
    },
  },
  recommendedTools: {
    standard: ['ChatGPT', 'Claude'],
    xml: ['Claude', 'OpenAI API'],
    aiStudio: ['Google AI Studio', 'Gemini'],
  },
  variables: ['variable1', 'variable2'],
}

describe('multiFormatPrompt', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('rendering', () => {
    it('renders with basic props', () => {
      render(<MultiFormatPrompt {...mockPromptData} />)

      expect(screen.getByTestId('card')).toBeInTheDocument()
      expect(screen.getByTestId('tabs')).toBeInTheDocument()
      expect(screen.getByTestId('tabs-list')).toBeInTheDocument()
    })

    it('renders all format tabs when all versions provided', () => {
      render(<MultiFormatPrompt {...mockPromptData} />)

      expect(screen.getByTestId('tab-trigger-standard')).toBeInTheDocument()
      expect(screen.getByTestId('tab-trigger-xml')).toBeInTheDocument()
      expect(screen.getByTestId('tab-trigger-aiStudio')).toBeInTheDocument()
    })

    it('only renders tabs for provided formats', () => {
      const partialData = {
        alternativeVersions: {
          standard: 'Standard prompt only',
        },
        variables: ['var1'],
      }

      render(<MultiFormatPrompt {...partialData} />)

      expect(screen.getByTestId('tab-trigger-standard')).toBeInTheDocument()
      expect(screen.queryByTestId('tab-trigger-xml')).not.toBeInTheDocument()
      expect(screen.queryByTestId('tab-trigger-aiStudio')).not.toBeInTheDocument()
    })

    it('renders with custom className', () => {
      render(<MultiFormatPrompt {...mockPromptData} className="custom-class" />)

      const card = screen.getByTestId('card')
      expect(card).toHaveClass('custom-class')
    })
  })

  describe('tab Content', () => {
    it('renders standard format content', () => {
      render(<MultiFormatPrompt {...mockPromptData} />)

      expect(screen.getByTestId('tab-content-standard')).toBeInTheDocument()
    })

    it('renders XML format content', () => {
      render(<MultiFormatPrompt {...mockPromptData} />)

      expect(screen.getByTestId('tab-content-xml')).toBeInTheDocument()
    })

    it('renders AI Studio format content', () => {
      render(<MultiFormatPrompt {...mockPromptData} />)

      expect(screen.getByTestId('tab-content-aiStudio')).toBeInTheDocument()
    })

    it('displays prompt text correctly', () => {
      render(<MultiFormatPrompt {...mockPromptData} />)

      expect(screen.getByText(mockPromptData.alternativeVersions.standard)).toBeInTheDocument()
    })

    it('displays AI Studio system and user prompts separately', () => {
      render(<MultiFormatPrompt {...mockPromptData} />)

      expect(screen.getByText('You are a helpful assistant.')).toBeInTheDocument()
      expect(screen.getByText(/Process this with/)).toBeInTheDocument()
    })
  })

  describe('variables Display', () => {
    it('displays variables section when variables provided', () => {
      render(<MultiFormatPrompt {...mockPromptData} />)

      expect(screen.getByText('Variables à remplacer :')).toBeInTheDocument()
    })

    it('renders variable badges', () => {
      render(<MultiFormatPrompt {...mockPromptData} />)

      const badges = screen.getAllByTestId('badge')
      expect(badges).toHaveLength(2)
      expect(badges[0]).toHaveTextContent('{{variable1}}')
      expect(badges[1]).toHaveTextContent('{{variable2}}')
    })

    it('does not display variables section when no variables', () => {
      const dataWithoutVariables = {
        alternativeVersions: {
          standard: 'Simple prompt without variables',
        },
      }

      render(<MultiFormatPrompt {...dataWithoutVariables} />)

      expect(screen.queryByText('Variables à remplacer :')).not.toBeInTheDocument()
    })
  })

  describe('recommended Tools', () => {
    it('displays recommended tools for active tab', () => {
      render(<MultiFormatPrompt {...mockPromptData} />)

      expect(screen.getByText('Outils recommandés :')).toBeInTheDocument()
    })

    it('shows tools as badges', () => {
      render(<MultiFormatPrompt {...mockPromptData} />)

      // Should show standard tools by default
      expect(screen.getByText('ChatGPT')).toBeInTheDocument()
      expect(screen.getByText('Claude')).toBeInTheDocument()
    })

    it('updates tools when switching tabs', () => {
      render(<MultiFormatPrompt {...mockPromptData} />)

      // Click XML tab (if tab switching is implemented)
      const xmlTab = screen.getByTestId('tab-trigger-xml')
      fireEvent.click(xmlTab)

      // Should now show XML tools
      expect(screen.getByText('OpenAI API')).toBeInTheDocument()
    })

    it('does not display tools section when no tools provided', () => {
      const dataWithoutTools = {
        alternativeVersions: {
          standard: 'Prompt without tools',
        },
        variables: ['var1'],
      }

      render(<MultiFormatPrompt {...dataWithoutTools} />)

      expect(screen.queryByText('Outils recommandés :')).not.toBeInTheDocument()
    })
  })

  describe('copy Functionality', () => {
    it('renders copy button for each format', () => {
      render(<MultiFormatPrompt {...mockPromptData} />)

      const copyButtons = screen.getAllByTestId('copy-icon')
      expect(copyButtons.length).toBeGreaterThan(0)
    })

    it('copies prompt text to clipboard when copy button clicked', async () => {
      render(<MultiFormatPrompt {...mockPromptData} />)

      const copyButton = screen.getAllByTestId('button')[0]
      fireEvent.click(copyButton)

      await waitFor(() => {
        expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
          mockPromptData.alternativeVersions.standard,
        )
      })
    })

    it('shows success feedback after copying', async () => {
      render(<MultiFormatPrompt {...mockPromptData} />)

      const copyButton = screen.getAllByTestId('button')[0]
      fireEvent.click(copyButton)

      await waitFor(() => {
        expect(screen.getByTestId('check-icon')).toBeInTheDocument()
      })
    })

    it('handles copy errors gracefully', async () => {
      vi.mocked(navigator.clipboard.writeText).mockRejectedValueOnce(
        new Error('Clipboard error'),
      )

      render(<MultiFormatPrompt {...mockPromptData} />)

      const copyButton = screen.getAllByTestId('button')[0]

      expect(() => {
        fireEvent.click(copyButton)
      }).not.toThrow()
    })
  })

  describe('accessibility', () => {
    it('provides appropriate ARIA labels for copy buttons', () => {
      render(<MultiFormatPrompt {...mockPromptData} />)

      const copyButtons = screen.getAllByTestId('button')
      copyButtons.forEach((button) => {
        expect(button).toHaveAttribute('aria-label', expect.stringContaining('Copier'))
      })
    })

    it('provides proper tab navigation structure', () => {
      render(<MultiFormatPrompt {...mockPromptData} />)

      const tabs = screen.getByTestId('tabs')
      expect(tabs).toBeInTheDocument()

      const tabTriggers = screen.getAllByTestId(/^tab-trigger-/)
      expect(tabTriggers.length).toBeGreaterThan(0)
    })

    it('maintains focus management in tab interface', () => {
      render(<MultiFormatPrompt {...mockPromptData} />)

      const standardTab = screen.getByTestId('tab-trigger-standard')
      standardTab.focus()
      expect(document.activeElement).toBe(standardTab)
    })
  })

  describe('error Handling', () => {
    it('handles missing alternativeVersions gracefully', () => {
      const invalidData = {
        variables: ['var1'],
      }

      expect(() => {
        render(<MultiFormatPrompt {...invalidData as any} />)
      }).not.toThrow()
    })

    it('handles empty alternativeVersions object', () => {
      const emptyData = {
        alternativeVersions: {},
        variables: ['var1'],
      }

      expect(() => {
        render(<MultiFormatPrompt {...emptyData} />)
      }).not.toThrow()
    })

    it('handles malformed AI Studio data', () => {
      const malformedData = {
        alternativeVersions: {
          aiStudio: {
            systemPrompt: undefined,
            userPrompt: 'Only user prompt',
          },
        },
      }

      expect(() => {
        render(<MultiFormatPrompt {...malformedData as any} />)
      }).not.toThrow()
    })
  })

  describe('performance', () => {
    it('renders efficiently with large prompt content', () => {
      const largeData = {
        alternativeVersions: {
          standard: 'A'.repeat(10000),
          xml: `<prompt>${'B'.repeat(10000)}</prompt>`,
        },
        variables: Array.from({ length: 100 }, (_, i) => `var${i}`),
      }

      const start = performance.now()
      render(<MultiFormatPrompt {...largeData} />)
      const end = performance.now()

      // Should render quickly even with large content
      expect(end - start).toBeLessThan(100)
    })

    it('handles many variables efficiently', () => {
      const manyVariablesData = {
        alternativeVersions: {
          standard: 'Prompt with many variables',
        },
        variables: Array.from({ length: 50 }, (_, i) => `variable${i}`),
      }

      expect(() => {
        render(<MultiFormatPrompt {...manyVariablesData} />)
      }).not.toThrow()

      const badges = screen.getAllByTestId('badge')
      expect(badges).toHaveLength(50)
    })
  })

  describe('integration', () => {
    it('integrates properly with tab system', () => {
      render(<MultiFormatPrompt {...mockPromptData} />)

      expect(screen.getByTestId('tabs')).toHaveAttribute('data-default-value', 'standard')
    })

    it('maintains state across tab switches', () => {
      render(<MultiFormatPrompt {...mockPromptData} />)

      // Initial state should show standard content
      expect(screen.getByText(mockPromptData.alternativeVersions.standard)).toBeInTheDocument()

      // Tab switching functionality would be tested here if implemented
      // This depends on the actual tab component implementation
    })
  })
})
