import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ContentPageLayout } from '@/components/layout/ContentPageLayout'
import { ConceptListSection } from '@/components/shared/ConceptListSection'
import { ContentRenderer } from '@/components/shared/ContentRenderer'
import { DisclaimerBanner } from '@/components/shared/DisclaimerBanner'
import { SimilarContentSection } from '@/components/shared/SimilarContentSection'
import Button from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { content, getWorkflowBySlug } from '@/lib/content-loader'

interface WorkflowPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return content.workflows.map(workflow => ({ slug: workflow.slug }))
}

export async function generateMetadata({ params }: WorkflowPageProps) {
  const { slug } = await params
  const workflow = getWorkflowBySlug(slug)

  if (!workflow) {
    return {
      title: 'Workflow non trouvé',
    }
  }

  return {
    title: `${workflow.title} - Workflow Stratégique`,
    description: workflow.description,
  }
}

export default async function WorkflowPage({ params }: WorkflowPageProps) {
  const { slug } = await params
  const workflow = getWorkflowBySlug(slug)

  if (!workflow) {
    notFound()
  }

  return (
    <ContentPageLayout item={workflow} prose={false}>
      {/* Concepts fondamentaux abordés */}
      {workflow.concepts && workflow.concepts.length > 0 && (
        <>
          <ConceptListSection concepts={workflow.concepts} />
          <Separator className="my-8" />
        </>
      )}

      {/* Workflow Content */}
      <ContentRenderer content={workflow.content} />

      {/* Disclaimer Banner */}
      <div className="mt-16">
        <DisclaimerBanner type="workflow" />
      </div>

      {/* Similar content based on tags */}
      {workflow.tags && workflow.tags.length > 0 && (
        <div className="mt-16">
          <SimilarContentSection
            currentSlug={workflow.slug}
            currentTags={workflow.tags}
            contentType="workflow"
          />
        </div>
      )}

      {/* Related Workflows */}
      {workflow.relatedWorkflows.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Workflows Connexes</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {workflow.relatedWorkflows.map(relatedWorkflow => (
              <Card key={relatedWorkflow.slug} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{relatedWorkflow.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{relatedWorkflow.description}</p>
                  <Link href={`/workflows/${relatedWorkflow.slug}`}>
                    <Button variant="outline" size="sm">
                      Découvrir
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Navigation */}
      <div className="mt-16 flex justify-between">
        <Link href="/workflows">
          <Button variant="outline">
            <ArrowLeft className="size-4 mr-2" />
            Tous les workflows
          </Button>
        </Link>
        <Link href="/par-ou-commencer">
          <Button>
            Guide débutant
            <ArrowRight className="size-4 ml-2" />
          </Button>
        </Link>
      </div>
    </ContentPageLayout>
  )
}
