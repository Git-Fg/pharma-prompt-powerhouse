import type { StatCardProps } from './PageHeader'
import React from 'react'
import { ScrollAnimated } from '@/components/ui/animated'
import { StaggeredItem, StaggeredPage } from '@/components/ui/transitions'
import { Container, Section } from './Container'
import { PageHeader } from './PageHeader'

interface CollectionPageLayoutProps {
  title: string
  description: string
  stats?: StatCardProps[] // Tableau de props pour les cartes de statistiques
  headerClassName?: string
  children: React.ReactNode
}

export function CollectionPageLayout({
  title,
  description,
  stats,
  headerClassName,
  children,
}: CollectionPageLayoutProps) {
  return (
    <StaggeredPage className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* En-tête unifié avec responsive design mobile-first et animations */}
      <PageHeader
        title={title}
        description={description}
        variant="collection"
        stats={stats}
        className={headerClassName}
        testId="collection-page"
      />

      {/* Contenu principal avec marges standardisées et animations */}
      <StaggeredItem>
        <Section>
          <Container variant="collection">
            <ScrollAnimated variant="slideUp" className="animate-fade-in">
              {children}
            </ScrollAnimated>
          </Container>
        </Section>
      </StaggeredItem>
    </StaggeredPage>
  )
}
