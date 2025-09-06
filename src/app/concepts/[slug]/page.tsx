import type { Metadata } from 'next'
import {
  BookOpen,
  Lightbulb,
  Target,
} from 'lucide-react'
import { notFound } from 'next/navigation'
import { ContentPageLayout } from '@/components/layout/ContentPageLayout'
import { ContentRenderer } from '@/components/shared/ContentRenderer'
import { KeyTakeaways } from '@/components/shared/KeyTakeaways'
import { RelatedContentSection } from '@/components/shared/RelatedContentSection'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { content, getConceptBySlug } from '@/lib/content-loader'
import { normalizeSlug } from '@/lib/utils'

// Génération des pages statiques au build
export async function generateStaticParams() {
  return content.concepts.map(concept => ({
    slug: normalizeSlug(concept.slug),
  }))
}

// Génération des métadonnées dynamiques pour le SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const concept = getConceptBySlug(params.slug)

  if (!concept) {
    return {
      title: 'Concept non trouvé - Pharma Prompt Powerhouse',
      description: 'Le concept que vous recherchez n\'existe pas.',
    }
  }
  return {
    title: `${concept.title} - Concepts | Pharma Prompt Powerhouse`,
    description: concept.description,
    keywords: [
      'pharmacie',
      'prompt engineering',
      'intelligence artificielle',
      'formation',
      concept.title,
      ...(concept.tags || []),
    ],
    openGraph: {
      title: concept.title,
      description: concept.description,
      type: 'article',
      images: [
        {
          url: '/icon-512x512.png',
          width: 512,
          height: 512,
          alt: concept.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: concept.title,
      description: concept.description,
    },
  }
}

export default async function ConceptDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const concept = getConceptBySlug(params.slug)

  if (!concept) {
    notFound()
  }

  // Trouver les contenus liés à ce concept
  const relatedGuides = content.guides.filter(
    g => g.conceptSlugs?.includes(params.slug),
  )
  const relatedWorkflows = content.workflows.filter(
    w => w.conceptSlugs?.includes(params.slug),
  )

  return (
    <ContentPageLayout
      item={concept}
      prose={false}
    >
      {/* NOUVELLE SECTION : Points clés à retenir */}
      {concept.keyTakeaways && <KeyTakeaways points={concept.keyTakeaways} />}

      {/* Contenu principal du concept */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="size-5" />
            À propos de ce concept
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose dark:prose-invert">
            <ContentRenderer content={concept.content} />
          </div>
        </CardContent>
      </Card>

      <Separator className="my-8" />

      <div className="space-y-12">
        {/* Guides liés */}
        <RelatedContentSection
          title="Guides liés à ce concept"
          icon={BookOpen}
          items={relatedGuides}
          type="guides"
        />

        {/* Workflows pratiques */}
        <RelatedContentSection
          title="Appliquer : Les Workflows Pratiques"
          icon={Lightbulb}
          items={relatedWorkflows}
          type="workflows"
        />
      </div>
    </ContentPageLayout>
  )
}
