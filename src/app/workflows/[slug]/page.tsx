import { ArrowLeft, ArrowRight, CheckCircle, Clock, Target } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Container, Section } from '@/components/layout/Container'
import { ContentRenderer } from '@/components/shared/ContentRenderer'
import { DisclaimerBanner } from '@/components/shared/DisclaimerBanner'
import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { content, getWorkflowBySlug } from '@/lib/content-loader'
import { getIcon } from '@/types/icon-taxonomy'

interface WorkflowPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return content.workflows.map(workflow => ({ slug: workflow.slug }))
}

export async function generateMetadata({ params }: WorkflowPageProps) {
  const workflow = getWorkflowBySlug(params.slug)

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

export default function WorkflowPage({ params }: WorkflowPageProps) {
  const workflow = getWorkflowBySlug(params.slug)

  if (!workflow) {
    notFound()
  }

  const Icon = workflow.icon ? getIcon(workflow.icon) : Target

  return (
    <Section>
      <Container maxWidth="4xl">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/workflows" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4 mr-1" />
            Retour aux workflows
          </Link>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon className="size-6 text-primary" />
            </div>
            <div className="flex gap-2">
              <Badge variant="outline">{workflow.difficulty}</Badge>
              {workflow.estimatedTime && (
                <Badge variant="secondary">
                  <Clock className="w-3 h-3 mr-1" />
                  {workflow.estimatedTime}
                </Badge>
              )}
            </div>
          </div>

          <h1 className="text-4xl font-bold mb-4">{workflow.title}</h1>
          <p className="text-xl text-muted-foreground">{workflow.description}</p>

          {workflow.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {workflow.tags.map((tag: string) => (
                <Badge key={tag} variant="outline" className="text-sm">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Table of Contents */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">Plan du Workflow</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-sm">Le Problème</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-sm">Mon Approche Initiale (et ses limites)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">La Stratégie Optimisée</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm">Comparaison des Outils</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm">Le Prompt Final (à adapter)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                <span className="text-sm">Ce qu'il faut retenir</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Workflow Sections */}
        <div className="space-y-12">
          {/* Le Problème */}
          <section>
            <div className="flex items-center space-x-2 mb-6">
              <div className="size-6 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">1</span>
              </div>
              <h2 className="text-2xl font-bold">Le Problème</h2>
            </div>
            <div className="prose prose-lg max-w-none">
              <ContentRenderer content={workflow.problem} />
            </div>
          </section>

          <Separator />

          {/* Mon Approche Initiale */}
          <section>
            <div className="flex items-center space-x-2 mb-6">
              <div className="size-6 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">2</span>
              </div>
              <h2 className="text-2xl font-bold">Mon Approche Initiale (et ses limites)</h2>
            </div>
            <div className="prose prose-lg max-w-none">
              <ContentRenderer content={workflow.initialApproach} />
            </div>
          </section>

          <Separator />

          {/* La Stratégie Optimisée */}
          <section>
            <div className="flex items-center space-x-2 mb-6">
              <div className="size-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">3</span>
              </div>
              <h2 className="text-2xl font-bold">La Stratégie Optimisée</h2>
            </div>
            <div className="prose prose-lg max-w-none">
              <ContentRenderer content={workflow.optimizedStrategy} />
            </div>
          </section>

          <Separator />

          {/* Comparaison des Outils */}
          <section>
            <div className="flex items-center space-x-2 mb-6">
              <div className="size-6 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">4</span>
              </div>
              <h2 className="text-2xl font-bold">Comparaison des Outils</h2>
            </div>
            <div className="prose prose-lg max-w-none">
              <ContentRenderer content={workflow.toolComparison} />
            </div>
          </section>

          <Separator />

          {/* Le Prompt Final */}
          <section>
            <div className="flex items-center space-x-2 mb-6">
              <div className="size-6 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">5</span>
              </div>
              <h2 className="text-2xl font-bold">Le Prompt Final (à adapter)</h2>
            </div>
            <div className="prose prose-lg max-w-none">
              <ContentRenderer content={workflow.finalPrompt} />
            </div>
          </section>

          <Separator />

          {/* Ce qu'il faut retenir */}
          <section>
            <div className="flex items-center space-x-2 mb-6">
              <div className="size-6 bg-gray-500 rounded-full flex items-center justify-center">
                <CheckCircle className="size-4 text-white" />
              </div>
              <h2 className="text-2xl font-bold">Ce qu'il faut retenir</h2>
            </div>
            <div className="bg-muted p-6 rounded-lg">
              <ul className="space-y-3">
                {workflow.keyTakeaways.map((takeaway, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="size-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        {/* Disclaimer Banner */}
        <div className="mt-16">
          <DisclaimerBanner type="workflow" />
        </div>

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
      </Container>
    </Section>
  )
}
