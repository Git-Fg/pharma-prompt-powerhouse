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

// Imports conditionnels pour Node.js uniquement (build time)
/* eslint-disable ts/no-require-imports */
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

type BaseContentItem = BaseGuide | BaseWorkflow

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

export const content = loadContent()

export const getGuideBySlug = (slug: string): EnrichedGuide | undefined => content.guides.find((g: EnrichedGuide) => g.slug === slug)
export const getWorkflowBySlug = (slug: string): EnrichedWorkflow | undefined => content.workflows.find((w: EnrichedWorkflow) => w.slug === slug)
export const getConceptBySlug = (slug: string): EnrichedConcept | undefined => content.concepts.find((c: EnrichedConcept) => c.slug === slug)
export const getExternalToolBySlug = (slug: string): BaseExternalTool | undefined => content.externalTools.find((t: BaseExternalTool) => t.slug === slug)
