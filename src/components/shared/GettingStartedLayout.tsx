'use client'

import { BookOpen, Brain } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Container, Section } from '@/components/layout/Container'
import { PageHeader } from '@/components/layout/PageHeader'
import Button from '@/components/ui/button'
import { StaggeredItem, StaggeredPage } from '@/components/ui/transitions'
import { createTestIdProps, TestIds } from '@/lib/test-utils'
import { cn } from '@/lib/utils'

export interface GettingStartedLayoutProps {
  /**
   * Titre de la page
   */
  title: string
  /**
   * Description de la page
   */
  description: string
  /**
   * Badge du hero section
   */
  heroBadge?: string
  /**
   * Étapes du parcours
   */
  children: React.ReactNode
  /**
   * Texte du call to action
   */
  ctaTitle?: string
  /**
   * Description du call to action
   */
  ctaDescription?: string
  /**
   * Classes CSS supplémentaires
   */
  className?: string
  /**
   * Test ID personnalisé pour les tests
   */
  testId?: string
}

export const GettingStartedLayout: React.FC<GettingStartedLayoutProps> = ({
  title,
  description,
  heroBadge = 'Guide pour débutants',
  children,
  ctaTitle = 'Prêt à commencer ?',
  ctaDescription = 'Commencez par comprendre les concepts clés, puis lancez-vous dans votre premier workflow.',
  className,
  testId,
}) => {
  // Générer le test ID ou utiliser celui fourni
  const finalTestId = testId || 'getting-started-layout'

  return (
    <StaggeredPage
      className={cn(
        'min-h-screen bg-gradient-to-br from-background via-background to-muted/20',
        className,
      )}
      {...createTestIdProps(TestIds.Layout.Container('getting-started', finalTestId))}
    >
      {/* Hero Section unifiée */}
      <StaggeredItem>
        <PageHeader
          title={title}
          description={description}
          variant="getting-started"
          badge={heroBadge}
          outlineBadge={true}
          testId="getting-started"
        />
      </StaggeredItem>

      {/* Étapes du parcours */}
      <StaggeredItem>
        <Section size="md">
          <Container variant="collection">
            <ol className="space-y-8 [counter-reset:step-counter]">
              {children}
            </ol>
          </Container>
        </Section>
      </StaggeredItem>

      {/* Call to action */}
      <StaggeredItem>
        <Section size="sm">
          <Container variant="collection">
            <div className="text-center">
              <div className="bg-muted p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">
                  {ctaTitle}
                </h3>
                <p className="prose-personal-note mb-4">
                  {ctaDescription}
                </p>
                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                  <Link href="/concepts">
                    <Button variant="outline">
                      <Brain className="size-4 mr-2" />
                      Les Concepts
                    </Button>
                  </Link>
                  <Link href="/workflows/creer-fiches-de-revision">
                    <Button>
                      <BookOpen className="size-4 mr-2" />
                      Mon Premier Workflow
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </StaggeredItem>
    </StaggeredPage>
  )
}

export default GettingStartedLayout
