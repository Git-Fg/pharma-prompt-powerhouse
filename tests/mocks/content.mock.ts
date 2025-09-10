/**
 * Centralized Content Mock Factories
 *
 * This file provides mock data factories for all content types,
 * ensuring consistency across tests and making maintenance easier.
 *
 * Usage:
 *   import { createMockGuide, createMockConcept, etc. } from '@/tests/mocks/content.mock'
 */

import type {
  BaseConcept,
  BaseExternalTool,
  BaseGuide,
  BaseWorkflow,
  ContentBlock,
  EnrichedConcept,
  EnrichedGuide,
  EnrichedWorkflow,
} from '@/lib/content-schema'

// Base content block factories
export function createMockMarkdownBlock(content: string): ContentBlock {
  return {
    type: 'markdown',
    content,
  }
}

export function createMockAlertBlock(content: string, variant = 'info'): ContentBlock {
  return {
    type: 'alert',
    content,
    variant: variant as any,
  }
}

export function createMockCodeBlock(content: string, language = 'javascript'): ContentBlock {
  return {
    type: 'codeBlock',
    content,
    language,
  }
}

export function createMockCardBlock(title: string, content: string): ContentBlock {
  return {
    type: 'card',
    title,
    content,
  }
}

// Guide mock factory
export function createMockGuide(overrides: Partial<BaseGuide> = {}): BaseGuide {
  return {
    slug: 'test-guide',
    type: 'guide',
    title: 'Test Guide',
    description: 'A test guide for demonstration',
    category: 'testing',
    difficulty: 'beginner',
    tags: ['test', 'guide', 'demonstration'],
    isFavorite: false,
    isWorkflow: false,
    keyTakeaways: ['Key takeaway 1', 'Key takeaway 2'],
    conceptSlugs: ['test-concept'],
    content: [
      createMockMarkdownBlock('# Test Guide\n\nThis is a test guide content.'),
      createMockAlertBlock('This is an important note.'),
    ],
    ...overrides,
  }
}

// Concept mock factory
export function createMockConcept(overrides: Partial<BaseConcept> = {}): BaseConcept {
  return {
    slug: 'test-concept',
    type: 'concept',
    title: 'Test Concept',
    description: 'A test concept for demonstration',
    category: 'methodology',
    difficulty: 'intermediate',
    tags: ['test', 'concept', 'methodology'],
    isFavorite: false,
    keyTakeaways: [
      'Understanding this concept is crucial',
      'Apply it in practical scenarios',
      'Master the fundamentals',
    ],
    content: [
      createMockMarkdownBlock('# Test Concept\n\nThis is a detailed explanation of the test concept.'),
      createMockCardBlock('Simple Analogy', 'Think of this concept like building blocks - each piece builds upon the previous one.'),
      createMockCodeBlock('concept.example()', 'javascript'),
    ],
    ...overrides,
  }
}

// Workflow mock factory
export function createMockWorkflow(overrides: Partial<BaseWorkflow> = {}): BaseWorkflow {
  return {
    slug: 'test-workflow',
    type: 'workflow',
    title: 'Test Workflow',
    description: 'A test workflow for demonstration',
    category: 'test',
    difficulty: 'intermediate',
    tags: ['test', 'workflow'],
    isFavorite: true,
    content: [
      createMockMarkdownBlock('# Test Workflow\n\nThis is a test workflow content.'),
      createMockCodeBlock('console.log("Workflow step")', 'javascript'),
    ],
    keyTakeaways: ['Step 1', 'Step 2', 'Step 3'],
    conceptSlugs: ['workflow-concept'],
    ...overrides,
  }
}

// External Tool mock factory
export function createMockTool(overrides: Partial<BaseExternalTool> = {}): BaseExternalTool {
  return {
    slug: 'test-tool',
    type: 'tool',
    title: 'Test Tool',
    description: 'A test AI tool for demonstration',
    url: 'https://test-tool.example.com',
    category: 'research',
    tags: ['ai', 'research', 'test'],
    isFavorite: false,
    personalReview: 'This is a great tool for research purposes.',
    strongPoints: ['Fast response times', 'Accurate results', 'User-friendly interface'],
    vigilancePoints: ['Limited free tier', 'Requires account creation', 'Privacy concerns'],
    confidenceScore: 4,
    confidenceJustification: 'Based on extensive testing and comparison with similar tools.',
    freeVsPaidOffer: '| Feature | Free | Paid |\\n|---------|------|------|\\n| Basic usage | ✅ | ✅ |\\n| Advanced features | ❌ | ✅ |\\n| API access | ❌ | ✅ |',
    tldr: 'Great for research, but paid version needed for advanced features.',
    use_cases: ['Literature review', 'Data analysis', 'Content generation'],
    capabilities: ['Natural language processing', 'Data visualization', 'Multi-language support'],
    content: [
      createMockMarkdownBlock('# Test Tool Overview\\n\\nThis is a comprehensive overview of the test tool.'),
    ],
    ...overrides,
  }
}

// Specialized mock factories for specific test cases
export function createMinimalGuide(): BaseGuide {
  return createMockGuide({
    slug: 'minimal-guide',
    title: 'Minimal Guide',
    description: 'A minimal guide',
    category: 'basic',
    tags: ['minimal'],
    keyTakeaways: [],
    conceptSlugs: [],
    content: [],
  })
}

export function createGuideWithoutTakeaways(): BaseGuide {
  return createMockGuide({
    keyTakeaways: undefined,
  })
}

export function createMinimalConcept(): BaseConcept {
  return createMockConcept({
    slug: 'minimal-concept',
    title: 'Minimal Concept',
    description: 'A minimal concept',
    category: 'basic',
    tags: ['minimal'],
    keyTakeaways: [],
    content: [],
  })
}

export function createConceptWithoutTakeaways(): BaseConcept {
  return createMockConcept({
    keyTakeaways: undefined,
  })
}

export function createMinimalTool(): BaseExternalTool {
  return createMockTool({
    slug: 'minimal-tool',
    title: 'Minimal Tool',
    description: 'A minimal tool',
    url: 'https://minimal.example.com',
    category: 'basic',
    tags: ['minimal'],
    personalReview: undefined,
    strongPoints: [],
    vigilancePoints: [],
    confidenceScore: 3,
    confidenceJustification: 'Basic confidence',
    freeVsPaidOffer: '',
    tldr: undefined,
    use_cases: [],
    capabilities: [],
    content: [],
  })
}

export function createToolWithoutConfidence(): BaseExternalTool {
  return createMockTool({
    confidenceScore: undefined,
    confidenceJustification: undefined,
  })
}

export function createWorkflowWithoutConcepts(): BaseWorkflow {
  return createMockWorkflow({
    conceptSlugs: [],
  })
}

// Enriched mock factories for testing content-loader functionality
export function createMockEnrichedGuide(overrides: Partial<EnrichedGuide> = {}): EnrichedGuide {
  const baseGuide = createMockGuide()
  return {
    ...baseGuide,
    concepts: [],
    relatedItems: [
      {
        slug: 'related-concept',
        title: 'Related Concept',
        description: 'A related concept for testing',
        type: 'concept',
        score: 0.8,
      },
      {
        slug: 'related-workflow',
        title: 'Related Workflow',
        description: 'A related workflow for testing',
        type: 'workflow',
        score: 0.6,
      },
    ],
    ...overrides,
  }
}

export function createMockEnrichedWorkflow(overrides: Partial<EnrichedWorkflow> = {}): EnrichedWorkflow {
  const baseWorkflow = createMockWorkflow()
  return {
    ...baseWorkflow,
    concepts: [
      {
        slug: 'workflow-concept',
        type: 'concept',
        title: 'Workflow Concept',
        description: 'A concept related to this workflow',
        category: 'methodology',
        difficulty: 'intermediate',
        tags: ['workflow', 'concept'],
        isFavorite: false,
        keyTakeaways: ['Important concept', 'Key workflow principle'],
        content: [],
      },
    ],
    relatedItems: [
      {
        slug: 'related-guide',
        title: 'Related Guide',
        description: 'A related guide for testing',
        type: 'guide',
        score: 0.7,
      },
      {
        slug: 'related-tool',
        title: 'Related Tool',
        description: 'A related tool for testing',
        type: 'tool',
        score: 0.5,
      },
    ],
    ...overrides,
  }
}

export function createMockEnrichedConcept(overrides: Partial<EnrichedConcept> = {}): EnrichedConcept {
  const baseConcept = createMockConcept()
  return {
    ...baseConcept,
    relatedItems: [
      {
        slug: 'related-guide',
        title: 'Related Guide',
        description: 'A related guide for testing',
        type: 'guide',
        score: 0.9,
      },
      {
        slug: 'related-workflow',
        title: 'Related Workflow',
        description: 'A related workflow for testing',
        type: 'workflow',
        score: 0.7,
      },
      {
        slug: 'another-concept',
        title: 'Another Concept',
        description: 'Another related concept for testing',
        type: 'concept',
        score: 0.6,
      },
    ],
    ...overrides,
  }
}

// Collections of mocks for comprehensive testing
export const mockGuides = [
  createMockGuide(),
  createMinimalGuide(),
  createGuideWithoutTakeaways(),
]

export const mockConcepts = [
  createMockConcept(),
  createMinimalConcept(),
  createConceptWithoutTakeaways(),
]

export const mockWorkflows = [
  createMockWorkflow(),
  createWorkflowWithoutConcepts(),
]

export const mockTools = [
  createMockTool(),
  createMinimalTool(),
  createToolWithoutConfidence(),
]

// Default exports for convenience
export default {
  guides: mockGuides,
  concepts: mockConcepts,
  workflows: mockWorkflows,
  tools: mockTools,
}
