import type { ContentBlock, EnrichedGuide } from '@/lib/content-schema'
import { beforeAll, describe, expect, it } from 'vitest'

// Types pour les données de test
interface PrerequisiteItem {
  slug?: string
  type: 'concept' | 'guide' | 'workflow' | 'external-tool'
  title?: string
}

interface TabItem {
  value: string
  title: string
  content: ContentBlock[]
}

interface AccordionItem {
  title: string
  content: ContentBlock[]
}
import {
  content,
  getConceptBySlug,
  getExternalToolBySlug,
  getGuideBySlug,
  getWorkflowBySlug,
  loadContent,
} from '@/lib/content-loader'

describe('content Loader Integration', () => {
  let loadedContent: ReturnType<typeof loadContent>

  beforeAll(() => {
    loadedContent = loadContent()
  })

  describe('content Loading', () => {
    it('should load all content collections', () => {
      expect(loadedContent.guides).toBeDefined()
      expect(loadedContent.concepts).toBeDefined()
      expect(loadedContent.workflows).toBeDefined()
      expect(loadedContent.externalTools).toBeDefined()
    })

    it('should load content as arrays', () => {
      expect(Array.isArray(loadedContent.guides)).toBe(true)
      expect(Array.isArray(loadedContent.concepts)).toBe(true)
      expect(Array.isArray(loadedContent.workflows)).toBe(true)
      expect(Array.isArray(loadedContent.externalTools)).toBe(true)
    })

    it('should have content items with required properties', () => {
      if (loadedContent.guides.length > 0) {
        const guide = loadedContent.guides[0]!
        expect(guide.slug).toBeDefined()
        expect(guide.title).toBeDefined()
        expect(guide.description).toBeDefined()
        expect(guide.content).toBeDefined()
      }

      if (loadedContent.concepts.length > 0) {
        const concept = loadedContent.concepts[0]!
        expect(concept.slug).toBeDefined()
        expect(concept.title).toBeDefined()
        expect(concept.description).toBeDefined()
        expect(concept.category).toBeDefined()
        expect(concept.difficulty).toBeDefined()
      }

      if (loadedContent.workflows.length > 0) {
        const workflow = loadedContent.workflows[0]!
        expect(workflow.slug).toBeDefined()
        expect(workflow.title).toBeDefined()
        expect(workflow.description).toBeDefined()
        expect(workflow.content).toBeDefined()
        expect(workflow.keyTakeaways).toBeDefined()
      }
    })
  })

  describe('content Enrichment', () => {
    it('should enrich guides with related concepts', () => {
      const guidesWithConcepts = loadedContent.guides.filter(guide =>
        guide.conceptSlugs && guide.conceptSlugs.length > 0,
      )

      if (guidesWithConcepts.length > 0) {
        const enrichedGuide = guidesWithConcepts[0] as EnrichedGuide
        expect(enrichedGuide.concepts).toBeDefined()
        expect(Array.isArray(enrichedGuide.concepts)).toBe(true)

        if (enrichedGuide.concepts.length > 0) {
          expect(enrichedGuide.concepts[0]!.slug).toBeDefined()
          expect(enrichedGuide.concepts[0]!.title).toBeDefined()
        }
      }
    })

    it('should enrich guides with related items', () => {
      const guidesWithConcepts = loadedContent.guides.filter(guide =>
        guide.conceptSlugs && guide.conceptSlugs.length > 0,
      )

      if (guidesWithConcepts.length > 0) {
        const enrichedGuide = guidesWithConcepts[0] as EnrichedGuide
        expect(enrichedGuide.relatedItems).toBeDefined()
        expect(Array.isArray(enrichedGuide.relatedItems)).toBe(true)
      }
    })

    it('should enrich workflows with related items', () => {
      const workflowsWithConcepts = loadedContent.workflows.filter(workflow =>
        workflow.conceptSlugs && workflow.conceptSlugs.length > 0,
      )

      if (workflowsWithConcepts.length > 0) {
        const enrichedWorkflow = workflowsWithConcepts[0]!
        expect(enrichedWorkflow.relatedItems).toBeDefined()
        expect(Array.isArray(enrichedWorkflow.relatedItems)).toBe(true)
      }
    })

    it('should not include self-references in related content', () => {
      const guidesWithConcepts = loadedContent.guides.filter(guide =>
        guide.conceptSlugs && guide.conceptSlugs.length > 0,
      )

      guidesWithConcepts.forEach((guide) => {
        const enrichedGuide = guide as EnrichedGuide

        // Check related items don't include self
        if (enrichedGuide.relatedItems) {
          expect(enrichedGuide.relatedItems.some(relatedItem =>
            relatedItem.slug === guide.slug,
          )).toBe(false)
        }
      })
    })
  })

  describe('accessor Functions', () => {
    it('should find content by slug correctly', () => {
      const firstGuide = loadedContent.guides[0]
      if (firstGuide) {
        const foundGuide = getGuideBySlug(firstGuide.slug)
        expect(foundGuide).toEqual(firstGuide)
      }

      const firstConcept = loadedContent.concepts[0]
      if (firstConcept) {
        const foundConcept = getConceptBySlug(firstConcept.slug)
        expect(foundConcept).toEqual(firstConcept)
      }

      const firstWorkflow = loadedContent.workflows[0]
      if (firstWorkflow) {
        const foundWorkflow = getWorkflowBySlug(firstWorkflow.slug)
        expect(foundWorkflow).toEqual(firstWorkflow)
      }

      const firstTool = loadedContent.externalTools[0]
      if (firstTool) {
        const foundTool = getExternalToolBySlug(firstTool.slug)
        expect(foundTool).toEqual(firstTool)
      }
    })

    it('should return undefined for non-existent slugs', () => {
      expect(getGuideBySlug('non-existent-guide')).toBeUndefined()
      expect(getConceptBySlug('non-existent-concept')).toBeUndefined()
      expect(getWorkflowBySlug('non-existent-workflow')).toBeUndefined()
      expect(getExternalToolBySlug('non-existent-tool')).toBeUndefined()
    })
  })

  describe('content Relationships', () => {
    it('should maintain referential integrity in concept relationships', () => {
      const guidesWithConcepts = loadedContent.guides.filter(guide =>
        guide.conceptSlugs && guide.conceptSlugs.length > 0,
      )

      guidesWithConcepts.forEach((guide) => {
        guide.conceptSlugs?.forEach((conceptSlug) => {
          const concept = getConceptBySlug(conceptSlug)
          expect(concept).toBeDefined()
          expect(concept?.slug).toBe(conceptSlug)
        })
      })
    })

    it('should maintain consistent data between static content and loaded content', () => {
      // The content export should be the same as calling loadContent()
      expect(content.guides).toHaveLength(loadedContent.guides.length)
      expect(content.concepts).toHaveLength(loadedContent.concepts.length)
      expect(content.workflows).toHaveLength(loadedContent.workflows.length)
      expect(content.externalTools).toHaveLength(loadedContent.externalTools.length)
    })
  })

  describe('performance Characteristics', () => {
    it('should use efficient data structures for lookups', () => {
      // Test that accessor functions are reasonably fast (O(n) is acceptable for content size)
      const start = performance.now()

      // Perform multiple lookups
      for (let i = 0; i < 100; i++) {
        if (loadedContent.guides.length > 0) {
          getGuideBySlug(loadedContent.guides[0]!.slug)
        }
        if (loadedContent.concepts.length > 0) {
          getConceptBySlug(loadedContent.concepts[0]!.slug)
        }
        if (loadedContent.workflows.length > 0) {
          getWorkflowBySlug(loadedContent.workflows[0]!.slug)
        }
      }

      const end = performance.now()
      const duration = end - start

      // Should complete 200 lookups in under 50ms on reasonable hardware
      expect(duration).toBeLessThan(50)
    })

    it('should load content efficiently (optimized from O(N²) to O(N))', () => {
      // Test that content loading is reasonably fast
      const start = performance.now()

      // Load content multiple times to test performance
      for (let i = 0; i < 10; i++) {
        loadContent()
      }

      const end = performance.now()
      const duration = end - start

      // Should complete 10 content loads in under 100ms on reasonable hardware
      // This verifies that the O(N²) → O(N) optimization is working
      expect(duration).toBeLessThan(100)
    })
  })

  describe('content block integrity validation', () => {
    // Helper function to recursively traverse content blocks and validate references
    function validateContentBlockIntegrity(
      blocks: ContentBlock[] | undefined,
      parentContext: { type: string, slug: string },
      errors: string[] = [],
    ): string[] {
      if (!blocks) {
        return errors
      }

      // Ensure blocks is an array before iterating
      if (!Array.isArray(blocks)) {
        errors.push(`Erreur d'intégrité : Le ${parentContext.type} '${parentContext.slug}' a un contenu non-tableau`)
        return errors
      }

      for (const block of blocks) {
        switch (block.type) {
          case 'toolRecommendation': {
            const tool = getExternalToolBySlug(block.slug)
            if (!tool) {
              errors.push(`Erreur d'intégrité : Le ${parentContext.type} '${parentContext.slug}' référence un outil inexistant '${block.slug}'`)
            }
            break
          }

          case 'guideRecommendation': {
            const guide = getGuideBySlug(block.slug)
            if (!guide) {
              errors.push(`Erreur d'intégrité : Le ${parentContext.type} '${parentContext.slug}' référence un guide inexistant '${block.slug}'`)
            }
            break
          }

          case 'conceptRecommendation': {
            const concept = getConceptBySlug(block.slug)
            if (!concept) {
              errors.push(`Erreur d'intégrité : Le ${parentContext.type} '${parentContext.slug}' référence un concept inexistant '${block.slug}'`)
            }
            break
          }

          case 'prerequisites':
            block.items.forEach((item: PrerequisiteItem) => {
              if (item.slug) {
                let found = false
                switch (item.type) {
                  case 'concept':
                    found = !!getConceptBySlug(item.slug)
                    break
                  case 'guide':
                    found = !!getGuideBySlug(item.slug)
                    break
                  case 'workflow':
                    found = !!getWorkflowBySlug(item.slug)
                    break
                  case 'external-tool':
                    found = !!getExternalToolBySlug(item.slug)
                    break
                }
                if (!found) {
                  errors.push(`Erreur d'intégrité : Le ${parentContext.type} '${parentContext.slug}' référence un prérequis ${item.type} inexistant '${item.slug}'`)
                }
              }
            })
            break

          case 'tabs':
            block.tabs.forEach((tab: TabItem) => {
              validateContentBlockIntegrity(tab.content, parentContext, errors)
            })
            break

          case 'accordion':
            block.items.forEach((item: AccordionItem) => {
              validateContentBlockIntegrity(item.content, parentContext, errors)
            })
            break
        }
      }
      return errors
    }

    it('should validate all content block references in guides', () => {
      const allErrors: string[] = []

      loadedContent.guides.forEach((guide) => {
        const errors = validateContentBlockIntegrity(guide.content, { type: 'guide', slug: guide.slug })
        allErrors.push(...errors)
      })

      expect(allErrors).toHaveLength(0)
      if (allErrors.length > 0) {
        console.error(`\n${allErrors.join('\n')}`)
      }
    })

    it('should validate all content block references in workflows', () => {
      const allErrors: string[] = []

      loadedContent.workflows.forEach((workflow) => {
        const errors = validateContentBlockIntegrity(workflow.content, { type: 'workflow', slug: workflow.slug })
        allErrors.push(...errors)
      })

      expect(allErrors).toHaveLength(0)
      if (allErrors.length > 0) {
        console.error(`\n${allErrors.join('\n')}`)
      }
    })

    it('should validate all content block references in concepts', () => {
      const allErrors: string[] = []

      loadedContent.concepts.forEach((concept) => {
        const errors = validateContentBlockIntegrity(concept.content, { type: 'concept', slug: concept.slug })
        allErrors.push(...errors)
      })

      expect(allErrors).toHaveLength(0)
      if (allErrors.length > 0) {
        console.error(`\n${allErrors.join('\n')}`)
      }
    })

    it('should validate all content block references in external tools', () => {
      const allErrors: string[] = []

      loadedContent.externalTools.forEach((tool) => {
        const errors = validateContentBlockIntegrity(tool.content, { type: 'outil', slug: tool.slug })
        allErrors.push(...errors)
      })

      expect(allErrors).toHaveLength(0)
      if (allErrors.length > 0) {
        console.error(`\n${allErrors.join('\n')}`)
      }
    })

    it('should detect broken references with test data', () => {
      // Create a test content block with broken references
      const brokenBlocks: ContentBlock[] = [
        { type: 'toolRecommendation', slug: 'non-existent-tool', reason: 'Test' },
        { type: 'guideRecommendation', slug: 'non-existent-guide', reason: 'Test' },
        { type: 'conceptRecommendation', slug: 'non-existent-concept', reason: 'Test' },
      ]

      const errors = validateContentBlockIntegrity(brokenBlocks, { type: 'test', slug: 'test-content' })

      expect(errors).toHaveLength(3)
      expect(errors[0]).toContain('référence un outil inexistant')
      expect(errors[1]).toContain('référence un guide inexistant')
      expect(errors[2]).toContain('référence un concept inexistant')
    })
  })
})
