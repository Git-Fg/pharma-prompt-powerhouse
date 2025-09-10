import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PageRenderer } from '@/components/layout/PageRenderer'
import { ContentBodyRenderer } from '@/components/shared/ContentBodyRenderer'
import { getContentItem } from '@/lib/content-loader'
import { generateAllStaticParams, generateContentMetadataDynamic, getContentTypeFromRoute } from '@/lib/content-utils'

interface DynamicContentPageProps {
  params: Promise<{
    contentType: string
    slug: string
  }>
}

// Génération des pages statiques au build pour TOUS les types de contenu
export async function generateStaticParams() {
  return generateAllStaticParams()
}

// Génération des métadonnées dynamiques pour le SEO
export async function generateMetadata({
  params,
}: DynamicContentPageProps): Promise<Metadata> {
  const { contentType, slug } = await params
  return generateContentMetadataDynamic({ contentType, slug })
}

export default async function DynamicContentPage({
  params,
}: DynamicContentPageProps) {
  const { contentType, slug } = await params

  // Convertir le nom de la route en type de contenu
  const actualContentType = getContentTypeFromRoute(contentType)

  if (!actualContentType) {
    console.error(`Invalid content type route: ${contentType}`)
    notFound()
  }

  // Récupérer le contenu en utilisant notre fonction unifiée
  const item = getContentItem(actualContentType, slug)

  if (!item) {
    console.error(`Content not found: ${actualContentType}/${slug}`)
    notFound()
  }

  return (
    <PageRenderer item={item}>
      <ContentBodyRenderer
        item={item}
        contentType={actualContentType}
      />
    </PageRenderer>
  )
}
