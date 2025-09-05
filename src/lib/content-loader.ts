import type {
  BaseConcept,
  BaseExternalTool,
  BaseGuide,
  BaseWorkflow,
  EnrichedConcept,
  EnrichedGuide,
  EnrichedWorkflow,
} from './content-schema'
import { allConcepts } from '@/content/concepts'
import { allExternalTools } from '@/content/external-tools'
import { allGuides } from '@/content/guides'
import { allWorkflows } from '@/content/workflows'

type BaseContentItem = BaseGuide | BaseWorkflow

export function loadContent() {
  const concepts: BaseConcept[] = allConcepts
  const guides: BaseGuide[] = allGuides
  const workflows: BaseWorkflow[] = allWorkflows
  const externalTools: BaseExternalTool[] = allExternalTools

  // --- PASSE 1: INDEXATION (Complexité O(N)) ---
  // Crée des dictionnaires rapides pour un accès instantané par slug.
  const conceptMap = new Map<string, BaseConcept>(concepts.map(c => [c.slug, c]))
  const guideMap = new Map<string, BaseGuide>(guides.map(g => [g.slug, g]))
  const workflowMap = new Map<string, BaseWorkflow>(workflows.map(w => [w.slug, w]))
  
  // Préparez un objet pour stocker les relations inverses (back-relations)
  const backRelations = {
    concepts: new Map<string, { guides: BaseGuide[], workflows: BaseWorkflow[] }>(),
  }

  // Initialisez la map des back-relations pour chaque concept
  conceptMap.forEach(concept => {
    backRelations.concepts.set(concept.slug, { guides: [], workflows: [] })
  })

  const allContent: BaseContentItem[] = [...guides, ...workflows]

  // --- PASSE 2: ENRICHISSEMENT, VALIDATION & BACK-RELATIONS (Complexité O(N)) ---

  // Enrichir les workflows
  const enrichedWorkflows: EnrichedWorkflow[] = workflows.map((workflow) => {
    // 1. Validation d'intégrité & enrichissement des concepts liés
    const conceptsForWorkflow = workflow.conceptSlugs?.map(slug => {
      const concept = conceptMap.get(slug)
      if (!concept) {
        // Le lien est brisé : faire échouer le build immédiatement !
        throw new Error(`Erreur d'intégrité : Le workflow "${workflow.slug}" référence un concept inexistant "${slug}".`)
      }
      // 2. Création de la back-relation
      backRelations.concepts.get(slug)!.workflows.push(workflow)
      return concept
    }) || []

    const relatedWorkflows: EnrichedWorkflow['relatedWorkflows'] = []

    // Find related workflows based on shared concepts
    if (workflow.conceptSlugs) {
      const relatedContent = allContent.filter(item =>
        item.slug !== workflow.slug
        && item.conceptSlugs?.some(slug => workflow.conceptSlugs!.includes(slug)),
      )

      relatedContent.forEach((item) => {
        if (workflowMap.has(item.slug) && !relatedWorkflows.some(w => w.slug === item.slug)) {
          const { content: _content, concepts: _concepts, relatedWorkflows: _rw, ...workflowWithoutContent } = item as EnrichedWorkflow
          relatedWorkflows.push(workflowWithoutContent)
        }
      })
    }

    return {
      ...workflow,
      concepts: conceptsForWorkflow,
      relatedWorkflows: relatedWorkflows.slice(0, 3),
    }
  })

  // Enrichir les guides
  const enrichedGuides: EnrichedGuide[] = guides.map((guide) => {
    // 1. Validation d'intégrité & enrichissement des concepts liés
    const conceptsForGuide = guide.conceptSlugs?.map(slug => {
      const concept = conceptMap.get(slug)
      if (!concept) {
        // Le lien est brisé : faire échouer le build immédiatement !
        throw new Error(`Erreur d'intégrité : Le guide "${guide.slug}" référence un concept inexistant "${slug}".`)
      }
      // 2. Création de la back-relation
      backRelations.concepts.get(slug)!.guides.push(guide)
      return concept
    }) || []

    const relatedGuides: EnrichedGuide['relatedGuides'] = []

    if (guide.conceptSlugs) {
      const relatedContent = allContent.filter(item =>
        item.slug !== guide.slug
        && item.conceptSlugs?.some(slug => guide.conceptSlugs!.includes(slug)),
      )

      relatedContent.forEach((item) => {
        if (guideMap.has(item.slug) && !relatedGuides.some(g => g.slug === item.slug)) {
          const { content: _content, concepts: _concepts, relatedGuides: _rg, ...guideWithoutContent } = item as EnrichedGuide
          relatedGuides.push(guideWithoutContent)
        }
      })
    }

    return {
      ...guide,
      concepts: conceptsForGuide,
      relatedGuides: relatedGuides.slice(0, 3),
    }
  })

  const enrichedConcepts: EnrichedConcept[] = concepts

  return {
    guides: enrichedGuides,
    workflows: enrichedWorkflows,
    concepts: enrichedConcepts,
    externalTools,
  }
}

export const content = loadContent()

export const getGuideBySlug = (slug: string) => content.guides.find(g => g.slug === slug)
export const getWorkflowBySlug = (slug: string) => content.workflows.find(w => w.slug === slug)
export const getConceptBySlug = (slug: string) => content.concepts.find(c => c.slug === slug)
export const getExternalToolBySlug = (slug: string) => content.externalTools.find(t => t.slug === slug)
