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
  conceptMap.forEach((concept) => {
    backRelations.concepts.set(concept.slug, { guides: [], workflows: [] })
  })

  // Créer un index concept -> contenus pour optimiser la recherche de contenus liés (O(N) au lieu de O(N²))
  const conceptToContentMap = new Map<string, BaseContentItem[]>()
  const allContent: BaseContentItem[] = [...guides, ...workflows]

  // Indexer tous les contenus par leurs concepts (une seule passe O(N))
  allContent.forEach((item) => {
    item.conceptSlugs?.forEach((conceptSlug) => {
      if (!conceptToContentMap.has(conceptSlug)) {
        conceptToContentMap.set(conceptSlug, [])
      }
      conceptToContentMap.get(conceptSlug)!.push(item)
    })
  })

  // --- PASSE 2: ENRICHISSEMENT, VALIDATION & BACK-RELATIONS (Complexité O(N)) ---

  // Enrichir les workflows
  const enrichedWorkflows: EnrichedWorkflow[] = workflows.map((workflow) => {
    // 1. Validation d'intégrité & enrichissement des concepts liés
    const conceptsForWorkflow = workflow.conceptSlugs?.map((slug) => {
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

    // Optimisé: Trouver les workflows liés en utilisant l'index des concepts (O(N) au lieu de O(N²))
    if (workflow.conceptSlugs) {
      const relatedContentSet = new Set<BaseContentItem>()

      // Pour chaque concept de ce workflow, récupérer tous les contenus liés
      workflow.conceptSlugs.forEach((conceptSlug) => {
        const relatedContent = conceptToContentMap.get(conceptSlug) || []
        relatedContent.forEach((item) => {
          if (item.slug !== workflow.slug) {
            relatedContentSet.add(item)
          }
        })
      })

      // Filtrer uniquement les workflows et éviter les doublons
      relatedContentSet.forEach((item) => {
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
    const conceptsForGuide = guide.conceptSlugs?.map((slug) => {
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

    // Optimisé: Trouver les guides liés en utilisant l'index des concepts (O(N) au lieu de O(N²))
    if (guide.conceptSlugs) {
      const relatedContentSet = new Set<BaseContentItem>()

      // Pour chaque concept de ce guide, récupérer tous les contenus liés
      guide.conceptSlugs.forEach((conceptSlug) => {
        const relatedContent = conceptToContentMap.get(conceptSlug) || []
        relatedContent.forEach((item) => {
          if (item.slug !== guide.slug) {
            relatedContentSet.add(item)
          }
        })
      })

      // Filtrer uniquement les guides et éviter les doublons
      relatedContentSet.forEach((item) => {
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
