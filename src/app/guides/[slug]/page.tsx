import type { Metadata } from 'next'
import { ArrowLeft, BookOpen, Clock, Target } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Container, Section } from '@/components/layout/Container'
import { ContentRenderer } from '@/components/shared/ContentRenderer'
import { KeyTakeaways } from '@/components/shared/KeyTakeaways'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { content, getGuideBySlug } from '@/lib/content-loader'
import { getCategoryLabel, getDifficultyLabel } from '@/lib/ui-utils'

// Génération des paramètres statiques pour le build
export async function generateStaticParams() {
  return content.guides.map(guide => ({
    slug: guide.slug,
  }))
}

// Génération des métadonnées dynamiques pour le SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const guide = getGuideBySlug(params.slug)

  if (!guide) {
    return {
      title: 'Guide non trouvé',
    }
  }
  return {
    title: `Guide : ${guide.title} | Pharma Prompt Powerhouse`,
    description: guide.description,
  }
}

export default async function GuideDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const guide = getGuideBySlug(params.slug)

  if (!guide) {
    notFound()
  }

  const categoryLabel = getCategoryLabel(guide.category)
  const difficultyLabel = getDifficultyLabel(guide.difficulty)

  return (
    <Section>
      <Container maxWidth="4xl">
        <div className="mb-8">
          <Link href="/guides">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 size-4" />
              Retour aux guides
            </Button>
          </Link>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{categoryLabel}</Badge>
              <Badge variant="outline">{difficultyLabel}</Badge>
              {guide.isWorkflow && (
                <Badge variant="default">
                  <Target className="mr-1 h-3 w-3" />
                  Workflow
                </Badge>
              )}
            </div>

            <h1 className="text-4xl font-bold tracking-tight">{guide.title}</h1>
            <p className="text-xl text-muted-foreground">{guide.description}</p>

            {guide.estimatedTime && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="size-4" />
                <span>
                  Temps de lecture estimé :
                  {guide.estimatedTime}
                </span>
              </div>
            )}
          </div>
        </div>

        <Separator className="my-8" />

        {guide.keyTakeaways && guide.keyTakeaways.length > 0 && (
          <>
            <KeyTakeaways points={guide.keyTakeaways} />
            <Separator className="my-8" />
          </>
        )}

        <main className="prose prose-lg dark:prose-invert max-w-none">
          <ContentRenderer content={guide.content} />
        </main>

        <Separator className="my-12" />

        {/* Related Guides - Moved after main content */}
        {guide.relatedGuides && guide.relatedGuides.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Pour aller plus loin</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <BookOpen className="size-4" />
                  Guides similaires
                </h3>
                {guide.relatedGuides.map(relatedGuide => (
                  <Link
                    href={`/guides/${relatedGuide.slug}`}
                    key={relatedGuide.slug}
                    className="block p-3 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <p className="font-medium">{relatedGuide.title}</p>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {relatedGuide.description}
                    </p>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </Container>
    </Section>
  )
}
