import { describe, it, expect } from 'vitest'
import { 
  contentBlockSchema,
  promptSchema,
  externalToolSchema,
  objectifSchema
} from '@/lib/content-schema'

describe('Content Schema Edge Cases', () => {
  describe('contentBlockSchema', () => {
    it('should validate markdown blocks correctly', () => {
      const validMarkdown = {
        type: 'markdown' as const,
        content: '# Hello World\n\nThis is markdown content.'
      }
      
      expect(() => contentBlockSchema.parse(validMarkdown)).not.toThrow()
    })

    it('should reject markdown blocks with missing content', () => {
      const invalidMarkdown = {
        type: 'markdown' as const,
        // content is missing
      }
      
      expect(() => contentBlockSchema.parse(invalidMarkdown)).toThrow()
    })

    it('should validate alert blocks with all variants', () => {
      const variants = ['default', 'destructive'] as const
      
      variants.forEach(variant => {
        const validAlert = {
          type: 'alert' as const,
          variant,
          title: 'Test Alert',
          content: 'Alert content'
        }
        
        expect(() => contentBlockSchema.parse(validAlert)).not.toThrow()
      })
    })

    it('should validate code blocks with optional fields', () => {
      const minimalCode = {
        type: 'codeBlock' as const,
        language: 'typescript',
        content: 'const hello = "world";'
      }
      
      const fullCode = {
        type: 'codeBlock' as const,
        language: 'javascript',
        filename: 'example.js',
        showLineNumbers: true,
        content: 'console.log("Hello, World!");'
      }
      
      expect(() => contentBlockSchema.parse(minimalCode)).not.toThrow()
      expect(() => contentBlockSchema.parse(fullCode)).not.toThrow()
    })

    it('should handle tabs block with nested content blocks', () => {
      const tabsBlock = {
        type: 'tabs' as const,
        defaultValue: 'tab1',
        tabs: [
          {
            value: 'tab1',
            title: 'First Tab',
            content: [
              {
                type: 'markdown' as const,
                content: 'Content in first tab'
              }
            ]
          },
          {
            value: 'tab2',
            title: 'Second Tab',
            content: [
              {
                type: 'alert' as const,
                content: 'Alert in second tab'
              }
            ]
          }
        ]
      }
      
      expect(() => contentBlockSchema.parse(tabsBlock)).not.toThrow()
    })
  })

  describe('baseContentSchema validations', () => {
    it('should validate URL format in external tools', () => {
      const validTool = {
        slug: 'test-tool',
        title: 'Test Tool',
        description: 'A test tool',
        url: 'https://example.com',
        category: 'AI Tools',
        tags: [],
        isFavorite: false,
        content: []
      }
      
      expect(() => externalToolSchema.parse(validTool)).not.toThrow()
    })

    it('should reject invalid URLs in external tools', () => {
      const invalidTool = {
        slug: 'test-tool',
        title: 'Test Tool',
        description: 'A test tool',
        url: 'not-a-valid-url',
        category: 'AI Tools',
        tags: [],
        isFavorite: false,
        content: []
      }
      
      expect(() => externalToolSchema.parse(invalidTool)).toThrow()
    })
  })

  describe('objectif schema validation', () => {
    it('should require at least one checklist item', () => {
      const validObjectif = {
        slug: 'test-objectif',
        title: 'Test Objective',
        description: 'Test description',
        tags: [],
        isFavorite: false,
        masterPrompt: {
          description: 'Test prompt',
          prompt: { test: 'value' }
        },
        beforeAfter: {
          beforePrompt: 'Before',
          afterPrompt: 'After'
        },
        checklist: ['At least one item'],
        relatedConcepts: [],
        relatedGuides: []
      }
      
      expect(() => objectifSchema.parse(validObjectif)).not.toThrow()
    })

    it('should reject objectif with empty checklist', () => {
      const invalidObjectif = {
        slug: 'test-objectif',
        title: 'Test Objective',
        description: 'Test description',
        tags: [],
        isFavorite: false,
        masterPrompt: {
          description: 'Test prompt',
          prompt: { test: 'value' }
        },
        beforeAfter: {
          beforePrompt: 'Before',
          afterPrompt: 'After'
        },
        checklist: [], // Empty checklist should fail
        relatedConcepts: [],
        relatedGuides: []
      }
      
      expect(() => objectifSchema.parse(invalidObjectif)).toThrow()
    })
  })

  describe('prompt schema alternatives', () => {
    it('should validate alternative versions structure', () => {
      const promptWithAlternatives = {
        slug: 'test-prompt',
        title: 'Test Prompt',
        description: 'Test description',
        category: 'Test Category', // Required for prompt
        difficulty: 'beginner', // Required for prompt
        systemPromptContent: 'System prompt',
        variables: ['variable1', 'variable2'],
        targetTool: 'chatgpt',
        alternativeVersions: {
          standard: 'Standard version',
          xml: 'XML version',
          aiStudio: {
            systemPrompt: 'AI Studio system prompt',
            userPrompt: 'AI Studio user prompt'
          }
        },
        recommendedTools: {
          standard: ['chatgpt', 'claude'],
          xml: ['claude'],
          aiStudio: ['gemini']
        },
        tags: [],
        isFavorite: false,
        content: []
      }
      
      expect(() => promptSchema.parse(promptWithAlternatives)).not.toThrow()
    })
  })
})