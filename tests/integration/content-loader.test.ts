import type { EnrichedGuide } from '@/lib/content-schema'
import { beforeAll, describe, expect, it } from 'vitest'
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
        expect(workflow.problem).toBeDefined()
        expect(workflow.finalPrompt).toBeDefined()
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

    it('should enrich guides with related guides', () => {
      const guidesWithConcepts = loadedContent.guides.filter(guide =>
        guide.conceptSlugs && guide.conceptSlugs.length > 0,
      )

      if (guidesWithConcepts.length > 0) {
        const enrichedGuide = guidesWithConcepts[0] as EnrichedGuide
        expect(enrichedGuide.relatedGuides).toBeDefined()
        expect(Array.isArray(enrichedGuide.relatedGuides)).toBe(true)
      }
    })

    it('should enrich workflows with related workflows', () => {
      const workflowsWithConcepts = loadedContent.workflows.filter(workflow =>
        workflow.conceptSlugs && workflow.conceptSlugs.length > 0,
      )

      if (workflowsWithConcepts.length > 0) {
        const enrichedWorkflow = workflowsWithConcepts[0]!
        expect(enrichedWorkflow.relatedWorkflows).toBeDefined()
        expect(Array.isArray(enrichedWorkflow.relatedWorkflows)).toBe(true)
      }
    })

    it('should not include self-references in related content', () => {
      const guidesWithConcepts = loadedContent.guides.filter(guide =>
        guide.conceptSlugs && guide.conceptSlugs.length > 0,
      )

      guidesWithConcepts.forEach((guide) => {
        const enrichedGuide = guide as EnrichedGuide

        // Check related guides don't include self
        if (enrichedGuide.relatedGuides) {
          expect(enrichedGuide.relatedGuides.some(relatedGuide =>
            relatedGuide.slug === guide.slug,
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
})
