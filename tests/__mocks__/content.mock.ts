import type { Guide, Concept, Prompt, Objectif, ExternalTool, Workflow } from '@/lib/content-schema';

export const mockValidGuide: Guide = {
  slug: 'test-guide',
  title: 'Test Guide',
  description: 'This is a description for the test guide.',
  isFavorite: true,
  tags: [],
  content: [{ type: 'markdown', content: 'Some content' }],
  category: 'fondamentaux',
  difficulty: 'débutant',
  conceptSlugs: ['test-concept'],
};

export const mockValidConcept: Concept = {
  slug: 'test-concept',
  title: 'Test Concept',
  description: 'A detailed description of the test concept, long enough to be valid.',
  isFavorite: false,
  tags: [],
  content: [{ type: 'markdown', content: 'More content here.' }],
  category: 'fondamentaux',
  difficulty: 'débutant',
  keyTakeaways: ['Key takeaway 1', 'Key takeaway 2'],
  mainGuideSlug: 'test-guide',
};

export const mockValidPrompt: Prompt = {
    slug: 'test-prompt',
    title: 'Test Prompt',
    description: 'This is a test prompt.',
    isFavorite: true,
    tags: ['testing', 'mock'],
    category: 'fondamentaux',
    difficulty: 'débutant',
    promptContent: 'This is the prompt itself: {{variable}}.',
    content: [{ type: 'markdown', content: 'Explanation of the prompt.' }],
    variables: ['variable'], // Simplified to string array
    conceptSlugs: ['test-concept'],
};

export const mockValidObjectif: Objectif = {
  slug: 'test-objectif',
  title: 'Test Objectif',
  description: 'Description of the test objectif.',
  isFavorite: false,
  tags: [],
  content: [{ type: 'markdown', content: 'Content for the objectif.' }],
  masterPrompt: {
    description: 'A master prompt for testing.',
    prompt: mockValidPrompt,
  },
  beforeAfter: {
    beforePrompt: 'Before prompt',
    afterPrompt: 'After prompt',
  },
  checklist: ['Item 1', 'Item 2'],
  relatedConcepts: ['test-concept'],
  relatedGuides: ['test-guide'],
};

export const mockValidExternalTool: ExternalTool = {
    slug: 'test-tool',
    title: 'Test Tool',
    description: 'A great tool for testing.',
    isFavorite: false,
    tags: ['mock', 'dev'],
    url: 'https://example.com',
    category: 'outils',
};

export const mockValidWorkflow: Workflow = {
    slug: 'test-workflow',
    title: 'Test Workflow',
    description: 'A workflow for testing purposes.',
    isFavorite: false,
    tags: [],
    steps: [
        {
            title: 'Step 1',
            description: 'This is the first step.',
            promptSlug: 'test-prompt',
        },
    ],
};
