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
import { normalizeSlug } from './utils'

// Imports conditionnels pour Node.js uniquement (build time)
/* eslint-disable ts/no-require-imports */
// eslint-disable-next-line ts/no-explicit-any -- Modules Node.js conditionnels importés uniquement côté serveur, typés correctement lors de l'importation réel
let createHash: any, readFileSync: any, writeFileSync: any, existsSync: any, mkdirSync: any, path: any

if (typeof window === 'undefined') {
  // Server-side only
  const crypto = require('node:crypto')
  const fs = require('node:fs')
  path = require('node:path')

  createHash = crypto.createHash
  readFileSync = fs.readFileSync
  writeFileSync = fs.writeFileSync
  existsSync = fs.existsSync
  mkdirSync = fs.mkdirSync
}
/* eslint-enable ts/no-require-imports */

// Interface pour un contenu lié avec score
interface RelatedItem {
  slug: string
  title: string
  description: string
  type: 'guide' | 'workflow' | 'concept' | 'tool'
  score: number
}

// Interface pour les types de base enrichis
type BaseContentItem = BaseGuide | BaseWorkflow | BaseConcept | BaseExternalTool

// Cache configuration - only available server-side
function getCacheConfig() {
  if (typeof window !== 'undefined')
    return null

  return {
    CACHE_DIR: path?.join(process.cwd(), '.content-cache'),
    get MANIFEST_PATH() {
      return path?.join(this.CACHE_DIR, 'cache-manifest.json')
    },
    get CONTENT_CACHE_PATH() {
      return path?.join(this.CACHE_DIR, 'content.json')
    },
  }
}

// --- CACHE UTILITY FUNCTIONS ---

/**
 * Calcule le hash SHA256 d'un contenu
 */
function calculateHash(content: string): string {
  if (typeof window !== 'undefined' || !createHash)
    return ''
  return createHash('sha256').update(content).digest('hex')
}

/**
 * Interface pour notre manifeste de cache
 */
interface CacheManifest {
  global?: {
    hash: string
    timestamp: number
  }
}

/**
 * S'assure que le répertoire de cache existe
 */
function ensureCacheDir(): boolean {
  const config = getCacheConfig()
  if (!config || !mkdirSync || !existsSync)
    return false

  if (!existsSync(config.CACHE_DIR)) {
    mkdirSync(config.CACHE_DIR, { recursive: true })
  }
  return true
}

interface ContentData {
  guides: EnrichedGuide[]
  workflows: EnrichedWorkflow[]
  concepts: EnrichedConcept[]
  externalTools: BaseExternalTool[]
}

export function loadContent(): ContentData {
  const config = getCacheConfig()

  // S'assurer que le répertoire de cache existe (server-side only)
  const cacheEnabled = ensureCacheDir()

  // --- LOGIQUE DE CACHE INCRÉMENTAL (Server-side only) ---
  if (cacheEnabled && config && readFileSync && existsSync && writeFileSync) {
    let cachedManifest: CacheManifest = {}
    try {
      if (existsSync(config.MANIFEST_PATH)) {
        cachedManifest = JSON.parse(readFileSync(config.MANIFEST_PATH, 'utf-8'))
      }
    }
    catch {
      console.warn('⚠️ Could not read cache manifest, rebuilding content from scratch.')
      cachedManifest = {}
    }

    // Calculer le hash global de tout le contenu pour détecter les changements
    const allContentString = JSON.stringify({
      concepts: allConcepts,
      guides: allGuides,
      workflows: allWorkflows,
      externalTools: allExternalTools,
    })
    const globalHash = calculateHash(allContentString)

    // Vérifier si le cache est valide
    if (cachedManifest.global?.hash === globalHash && existsSync(config.CONTENT_CACHE_PATH)) {
      // eslint-disable-next-line no-console
      console.log('✅ Content cache hit! Loading content from cache.')
      try {
        const cachedContent = JSON.parse(readFileSync(config.CONTENT_CACHE_PATH, 'utf-8')) as ContentData
        return cachedContent
      }
      catch {
        console.warn('⚠️ Cache file corrupted, rebuilding content.')
      }
    }

    // eslint-disable-next-line no-console
    console.log('🔥 Content cache miss or outdated. Rebuilding content...')
  }

  // --- LOGIQUE EXISTANTE OPTIMISÉE (O(N)) ---
  const concepts: BaseConcept[] = allConcepts
  const guides: BaseGuide[] = allGuides
  const workflows: BaseWorkflow[] = allWorkflows
  const externalTools: BaseExternalTool[] = allExternalTools

  // --- PASSE 1: INDEXATION (Complexité O(N)) ---
  // Crée des dictionnaires rapides pour un accès instantané par slug.
  const conceptMap = new Map<string, BaseConcept>(concepts.map(c => [c.slug, c]))

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

    // Utiliser le nouveau système unifié de recommandation
    const allContent: BaseContentItem[] = [...guides, ...workflows, ...concepts, ...externalTools]
    const relatedItems = findRelatedItems(workflow, allContent, 3)

    return {
      ...workflow,
      concepts: conceptsForWorkflow,
      relatedItems,
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

    // Utiliser le nouveau système unifié de recommandation
    const allContent: BaseContentItem[] = [...guides, ...workflows, ...concepts, ...externalTools]
    const relatedItems = findRelatedItems(guide, allContent, 3)

    return {
      ...guide,
      concepts: conceptsForGuide,
      relatedItems,
    }
  })

  // Enrichir les concepts
  const enrichedConcepts: EnrichedConcept[] = concepts.map((concept) => {
    // Utiliser le nouveau système unifié de recommandation
    const allContent: BaseContentItem[] = [...guides, ...workflows, ...concepts, ...externalTools]
    const relatedItems = findRelatedItems(concept, allContent, 4) // 4 pour les concepts pour montrer plus de diversité

    return {
      ...concept,
      relatedItems,
    }
  })

  const finalContentObject = {
    guides: enrichedGuides,
    workflows: enrichedWorkflows,
    concepts: enrichedConcepts,
    externalTools,
  }

  // --- ÉCRITURE DU NOUVEAU CACHE (Server-side only) ---
  if (cacheEnabled && config && writeFileSync) {
    try {
      const allContentString = JSON.stringify({
        concepts: allConcepts,
        guides: allGuides,
        workflows: allWorkflows,
        externalTools: allExternalTools,
      })
      const globalHash = calculateHash(allContentString)

      writeFileSync(config.CONTENT_CACHE_PATH, JSON.stringify(finalContentObject, null, 2))
      const newManifest: CacheManifest = {
        global: {
          hash: globalHash,
          timestamp: Date.now(),
        },
      }
      writeFileSync(config.MANIFEST_PATH, JSON.stringify(newManifest, null, 2))
      // eslint-disable-next-line no-console
      console.log('✅ Content cache updated successfully.')
    }
    catch {
      console.warn('⚠️ Could not write to cache, continuing without cache.')
    }
  }

  return finalContentObject
}

// --- FONCTION UNIFIÉE DE CALCUL DE SIMILARITÉ ---

/**
 * Calcule le score de similarité entre deux contenus
 * Combine les tags (40%) et les concepts partagés (60%)
 */
function calculateSimilarity(itemA: BaseContentItem, itemB: BaseContentItem): number {
  let score = 0

  // Similarité basée sur les tags (40% du poids)
  const tagSimilarity = calculateTagSimilarity(itemA.tags || [], itemB.tags || [])
  score += tagSimilarity * 0.4

  // Similarité basée sur les concepts partagés (60% du poids)
  const conceptSimilarity = calculateConceptSimilarity(itemA.conceptSlugs || [], itemB.conceptSlugs || [])
  score += conceptSimilarity * 0.6

  return score
}

/**
 * Calcule la similarité Jaccard entre deux listes de tags
 */
function calculateTagSimilarity(tags1: string[], tags2: string[]): number {
  if (!tags1.length || !tags2.length)
    return 0

  const intersection = tags1.filter(tag => tags2.includes(tag))
  const union = [...new Set([...tags1, ...tags2])]

  return intersection.length / union.length
}

/**
 * Calcule la similarité Jaccard entre deux listes de concepts
 */
function calculateConceptSimilarity(concepts1: string[], concepts2: string[]): number {
  if (!concepts1.length || !concepts2.length)
    return 0

  const intersection = concepts1.filter(concept => concepts2.includes(concept))
  const union = [...new Set([...concepts1, ...concepts2])]

  return intersection.length / union.length
}

/**
 * Trouve les contenus les plus similaires pour un item donné
 */
function findRelatedItems(
  currentItem: BaseContentItem,
  allItems: BaseContentItem[],
  maxItems: number = 3,
): RelatedItem[] {
  const scoredItems = allItems
    .filter(item => item.slug !== currentItem.slug)
    .map(item => ({
      slug: item.slug,
      title: item.title,
      description: item.description,
      type: getContentType(item),
      score: calculateSimilarity(currentItem, item),
    }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxItems)

  return scoredItems
}

/**
 * Détermine le type d'un contenu
 */
function getContentType(item: BaseContentItem): 'guide' | 'workflow' | 'concept' | 'tool' {
  if ('url' in item)
    return 'tool'
  if ('keyTakeaways' in item && 'category' in item && !('estimatedTime' in item))
    return 'concept'
  if ('estimatedTime' in item) {
    return 'isWorkflow' in item && item.isWorkflow ? 'workflow' : 'guide'
  }
  return 'guide' // fallback
}

export const content = loadContent()

export function getGuideBySlug(slug: string): EnrichedGuide | undefined {
  return content.guides.find((g: EnrichedGuide) => g.slug === slug)
}

export function getWorkflowBySlug(slug: string): EnrichedWorkflow | undefined {
  return content.workflows.find((w: EnrichedWorkflow) => w.slug === slug)
}

export function getConceptBySlug(slug: string): EnrichedConcept | undefined {
  // Essaie d'abord avec le slug exact, puis avec la normalisation
  return content.concepts.find((c: EnrichedConcept) => c.slug === slug || normalizeSlug(c.slug) === slug)
}

export function getExternalToolBySlug(slug: string): BaseExternalTool | undefined {
  return content.externalTools.find((t: BaseExternalTool) => t.slug === slug)
}
