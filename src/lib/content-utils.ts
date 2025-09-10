import type { Metadata } from 'next'
import type { AnyContent } from '@/types'
import { content, getContentTypeToRouteMapping, getRouteToContentTypeMapping } from '@/lib/content-loader'
import { generateContentMetadata, generateNotFoundMetadata } from '@/lib/seo-optimization'

interface BaseContentItem {
  slug: string
  title: string
  description: string
  tags: string[]
  isFavorite: boolean
  category: string
  difficulty?: string // Optional for external tools
}

/**
 * Génère les paramètres statiques pour tous les types de contenu
 * Utilisé par la route dynamique [contentType]/[slug]/page.tsx
 */
export function generateAllStaticParams() {
  const routeMapping = getRouteToContentTypeMapping()
  const staticParams: Array<{ contentType: string, slug: string }> = []

  // Générer les params pour chaque type de contenu
  for (const [routeName, contentType] of Object.entries(routeMapping)) {
    let contentArray: BaseContentItem[]

    switch (contentType) {
      case 'concept':
        contentArray = content.concepts
        break
      case 'guide':
        contentArray = content.guides
        break
      case 'workflow':
        contentArray = content.workflows
        break
      case 'tool':
        contentArray = content.externalTools
        break
      default:
        continue
    }

    const paramsForType = contentArray.map(item => ({
      contentType: routeName,
      slug: item.slug, // Garanti propre par le loader
    }))

    staticParams.push(...paramsForType)
  }

  return staticParams
}

/**
 * Génère les métadonnées pour un contenu spécifique
 * Utilisé par la route dynamique [contentType]/[slug]/page.tsx
 */
export async function generateContentMetadataDynamic({
  contentType,
  slug,
}: {
  contentType: string
  slug: string
}): Promise<Metadata> {
  const routeMapping = getRouteToContentTypeMapping()
  const actualContentType = routeMapping[contentType]

  if (!actualContentType) {
    return generateNotFoundMetadata('guide') // fallback à un type connu
  }

  // Récupérer le contenu en utilisant notre fonction unifiée
  let contentArray: BaseContentItem[]

  switch (actualContentType) {
    case 'concept':
      contentArray = content.concepts
      break
    case 'guide':
      contentArray = content.guides
      break
    case 'workflow':
      contentArray = content.workflows
      break
    case 'tool':
      contentArray = content.externalTools
      break
    default:
      return generateNotFoundMetadata('guide')
  }

  const item = contentArray.find(item => item.slug === slug)

  if (!item) {
    return generateNotFoundMetadata(actualContentType)
  }

  return generateContentMetadata(item as AnyContent)
}

/**
 * Fonction utilitaire pour obtenir le type de contenu à partir du nom de la route
 */
export function getContentTypeFromRoute(routeName: string): 'concept' | 'guide' | 'workflow' | 'tool' | null {
  const mapping = getRouteToContentTypeMapping()
  return mapping[routeName] || null
}

/**
 * Fonction utilitaire pour obtenir le nom de la route à partir du type de contenu
 */
export function getRouteFromContentType(contentType: 'concept' | 'guide' | 'workflow' | 'tool'): string | null {
  const mapping = getContentTypeToRouteMapping()
  return mapping[contentType] || null
}
