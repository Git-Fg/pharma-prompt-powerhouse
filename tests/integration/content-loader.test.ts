import { describe, it, expect, beforeAll } from 'vitest'
import { 
  loadContent,
  getGuideBySlug,
  getWorkflowBySlug,
  getConceptBySlug,
  getPromptBySlug,
  getExternalToolBySlug,
  content
} from '@/lib/content-loader'
import type { EnrichedGuide, EnrichedConcept } from '@/lib/content-schema'

describe('Content Loader Integration', () => {
  let loadedContent: ReturnType<typeof loadContent>

  beforeAll(() => {
    loadedContent = loadContent()
  })

  describe('Content Loading', () => {
    it('should load all content collections', () => {
      expect(loadedContent.guides).toBeDefined()
      expect(loadedContent.concepts).toBeDefined()
      expect(loadedContent.prompts).toBeDefined()
      expect(loadedContent.externalTools).toBeDefined()
      expect(loadedContent.objectifs).toBeDefined()
    })

    it('should load guides as arrays', () => {
      expect(Array.isArray(loadedContent.guides)).toBe(true)
      expect(Array.isArray(loadedContent.concepts)).toBe(true)
      expect(Array.isArray(loadedContent.prompts)).toBe(true)
      expect(Array.isArray(loadedContent.externalTools)).toBe(true)
      expect(Array.isArray(loadedContent.objectifs)).toBe(true)
    })

    it('should have content items with required properties', () => {
      if (loadedContent.guides.length > 0) {
        const guide = loadedContent.guides[0]
        expect(guide.slug).toBeDefined()
        expect(guide.title).toBeDefined()
        expect(guide.description).toBeDefined()
        expect(guide.content).toBeDefined()
      }

      if (loadedContent.concepts.length > 0) {
        const concept = loadedContent.concepts[0]
        expect(concept.slug).toBeDefined()
        expect(concept.title).toBeDefined()
        expect(concept.description).toBeDefined()
        expect(concept.category).toBeDefined()
        expect(concept.difficulty).toBeDefined()
      }
    })
  })

  describe('Content Enrichment', () => {
    it('should enrich guides with related concepts', () => {
      const guidesWithConcepts = loadedContent.guides.filter(guide => 
        guide.conceptSlugs && guide.conceptSlugs.length > 0
      )

      if (guidesWithConcepts.length > 0) {
        const enrichedGuide = guidesWithConcepts[0] as EnrichedGuide
        expect(enrichedGuide.concepts).toBeDefined()
        expect(Array.isArray(enrichedGuide.concepts)).toBe(true)
        
        if (enrichedGuide.concepts.length > 0) {
          expect(enrichedGuide.concepts[0].slug).toBeDefined()
          expect(enrichedGuide.concepts[0].title).toBeDefined()
        }
      }
    })

    it('should enrich guides with related guides and prompts', () => {
      const guidesWithConcepts = loadedContent.guides.filter(guide => 
        guide.conceptSlugs && guide.conceptSlugs.length > 0
      )

      if (guidesWithConcepts.length > 0) {
        const enrichedGuide = guidesWithConcepts[0] as EnrichedGuide
        expect(enrichedGuide.relatedGuides).toBeDefined()
        expect(enrichedGuide.relatedPrompts).toBeDefined()
        expect(Array.isArray(enrichedGuide.relatedGuides)).toBe(true)
        expect(Array.isArray(enrichedGuide.relatedPrompts)).toBe(true)
      }
    })

    it('should enrich concepts with linked main guides', () => {
      const conceptsWithMainGuide = loadedContent.concepts.filter(concept =>
        concept.mainGuideSlug
      )

      if (conceptsWithMainGuide.length > 0) {
        const enrichedConcept = conceptsWithMainGuide[0] as EnrichedConcept
        expect(enrichedConcept.guide).toBeDefined()
        if (enrichedConcept.guide) {
          expect(enrichedConcept.guide.slug).toBeDefined()
          expect(enrichedConcept.guide.title).toBeDefined()
        }
      }
    })

    it('should not include self-references in related content', () => {
      const guidesWithConcepts = loadedContent.guides.filter(guide => 
        guide.conceptSlugs && guide.conceptSlugs.length > 0
      )

      guidesWithConcepts.forEach(guide => {
        const enrichedGuide = guide as EnrichedGuide
        
        // Check related guides don't include self
        if (enrichedGuide.relatedGuides) {
          expect(enrichedGuide.relatedGuides.some(relatedGuide => 
            relatedGuide.slug === guide.slug
          )).toBe(false)
        }
        
        // Check related prompts don't include guide slug (if it were a prompt)
        if (enrichedGuide.relatedPrompts) {
          expect(enrichedGuide.relatedPrompts.some(relatedPrompt => 
            relatedPrompt.slug === guide.slug
          )).toBe(false)
        }
      })
    })
  })

  describe('Accessor Functions', () => {
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

      const firstPrompt = loadedContent.prompts[0]
      if (firstPrompt) {
        const foundPrompt = getPromptBySlug(firstPrompt.slug)
        expect(foundPrompt).toEqual(firstPrompt)
      }

      const firstTool = loadedContent.externalTools[0]
      if (firstTool) {
        const foundTool = getExternalToolBySlug(firstTool.slug)
        expect(foundTool).toEqual(firstTool)
      }

      // Test workflow accessor if we have workflows
      if (loadedContent.workflows && loadedContent.workflows.length > 0) {
        const firstWorkflow = loadedContent.workflows[0]
        const foundWorkflow = getWorkflowBySlug(firstWorkflow.slug)
        expect(foundWorkflow).toEqual(firstWorkflow)
      }
    })

    it('should return undefined for non-existent slugs', () => {
      expect(getGuideBySlug('non-existent-guide')).toBeUndefined()
      expect(getConceptBySlug('non-existent-concept')).toBeUndefined()
      expect(getPromptBySlug('non-existent-prompt')).toBeUndefined()
      expect(getExternalToolBySlug('non-existent-tool')).toBeUndefined()
      expect(getWorkflowBySlug('non-existent-workflow')).toBeUndefined()
    })
  })

  describe('Content Relationships', () => {
    it('should maintain referential integrity in concept relationships', () => {
      const guidesWithConcepts = loadedContent.guides.filter(guide => 
        guide.conceptSlugs && guide.conceptSlugs.length > 0
      )

      guidesWithConcepts.forEach(guide => {
        guide.conceptSlugs?.forEach(conceptSlug => {
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
      expect(content.prompts).toHaveLength(loadedContent.prompts.length)
      expect(content.externalTools).toHaveLength(loadedContent.externalTools.length)
      expect(content.objectifs).toHaveLength(loadedContent.objectifs.length)
    })
  })

  describe('Performance Characteristics', () => {
    it('should use efficient data structures for lookups', () => {
      // Test that accessor functions are reasonably fast (O(n) is acceptable for content size)
      const start = performance.now()
      
      // Perform multiple lookups
      for (let i = 0; i < 100; i++) {
        if (loadedContent.guides.length > 0) {
          getGuideBySlug(loadedContent.guides[0].slug)
        }
        if (loadedContent.concepts.length > 0) {
          getConceptBySlug(loadedContent.concepts[0].slug)
        }
      }
      
      const end = performance.now()
      const duration = end - start
      
      // Should complete 200 lookups in under 50ms on reasonable hardware
      expect(duration).toBeLessThan(50)
    })
  })
})