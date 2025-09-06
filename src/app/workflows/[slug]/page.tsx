import { ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ContentPageLayout } from '@/components/layout/ContentPageLayout'
import { ConceptListSection } from '@/components/shared/ConceptListSection'
import { ContentRenderer } from '@/components/shared/ContentRenderer'
import { DisclaimerBanner } from '@/components/shared/DisclaimerBanner'
import { SmartRecommendationsSection } from '@/components/shared/SmartRecommendationsSection'
import Button from '@/components/ui/button'
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

      {/* Recommandations intelligentes */}
      <div className="mt-16">
        <SmartRecommendationsSection item={workflow} />
      </div>

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
