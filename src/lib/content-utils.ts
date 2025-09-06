import type { Metadata } from 'next'
import { content, getContentTypeToRouteMapping, getRouteToContentTypeMapping } from '@/lib/content-loader'
import { generateContentMetadata, generateNotFoundMetadata } from '@/lib/seo-optimization'
import { normalizeSlug } from '@/lib/utils'

/**
 * Génère les paramètres statiques pour tous les types de contenu
 * Utilisé par la route dynamique [contentType]/[slug]/page.tsx
 */
export function generateAllStaticParams() {
  const routeMapping = getRouteToContentTypeMapping()
  const staticParams = []

  // Générer les params pour chaque type de contenu
  for (const [routeName, contentType] of Object.entries(routeMapping)) {
    const contentArray = content[contentType === 'concept'
      ? 'concepts'
      : contentType === 'guide'
        ? 'guides'
        : contentType === 'workflow' ? 'workflows' : 'externalTools']

    // eslint-disable-next-line ts/no-explicit-any -- Type dynamique nécessaire pour itérer sur différents types de contenu
    const paramsForType = contentArray.map((item: any) => ({
      contentType: routeName,
      slug: normalizeSlug(item.slug),
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
  const item = content[actualContentType === 'concept'
    ? 'concepts'
    : actualContentType === 'guide'
      ? 'guides'
      : actualContentType === 'workflow' ? 'workflows' : 'externalTools']
    // eslint-disable-next-line ts/no-explicit-any -- Type dynamique nécessaire pour itérer sur différents types de contenu
    .find((item: any) => item.slug === slug || normalizeSlug(item.slug) === slug)

  if (!item) {
    return generateNotFoundMetadata(actualContentType)
  }

  return generateContentMetadata(item)
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
