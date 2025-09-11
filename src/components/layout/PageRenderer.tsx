import type { CollectionType } from '@/lib/content-loader'
import type { Concept, ExternalTool, Guide, Workflow } from '@/lib/content-schema'
import { ArrowRight } from 'lucide-react'
import * as LucideIcons from 'lucide-react'

import Link from 'next/link'
import React from 'react'
import { ContentCard } from '@/components/shared/ContentCard'
import { ContentHeader } from '@/components/shared/ContentHeader'
import { ContentMetadata } from '@/components/shared/ContentMetadata'
import { FilterableGrid } from '@/components/shared/FilterableGrid'
import { Animate, StaggeredContainer } from '@/components/ui/Animate'
import Button from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

import { getCollectionConfig, getCollectionItems, getCollectionStats } from '@/lib/content-loader'
import { cn } from '@/lib/utils'
import { BreadcrumbNavigation } from './BreadcrumbNavigation'
import { Container, Section } from './Container'
import { designTokens } from '@/design-system/tokens'

type StatType = 'primary' | 'concepts' | 'guides' | 'workflows' | 'tools' | 'default'

// Type union pour les types de base utilisés dans le content-loader
type BaseContent = Concept | Guide | Workflow | ExternalTool

// Le composant ContentCard peut directement gérer tous les types de base
// Pas besoin de wrapper intermédiaire

interface PageRendererProps {
  // Pour les pages de collection
  collectionType?: CollectionType
  collectionTitle?: string
  collectionDescription?: string
  showCollectionHelp?: boolean
  showCollectionCTA?: boolean

  // Pour les pages de contenu individuel
  item?: Concept | Guide | Workflow | ExternalTool

  // Enfants (pour le contenu personnalisé)
  children?: React.ReactNode
}

export function PageRenderer({
  collectionType,
  collectionTitle,
  collectionDescription,
  showCollectionHelp = false,
  showCollectionCTA = false,
  item,
  children,
}: PageRendererProps) {
  // Déterminer si c'est une page de collection ou de contenu individuel
  const isCollectionPage = collectionType && collectionTitle && collectionDescription

  if (isCollectionPage) {
    return (
      <CollectionRenderer
        type={collectionType}
        title={collectionTitle}
        description={collectionDescription}
        showHelp={showCollectionHelp}
        showCTA={showCollectionCTA}
      >
        {children}
      </CollectionRenderer>
    )
  }

  if (item) {
    return (
      <ContentPageLayout item={item}>
        {children}
      </ContentPageLayout>
    )
  }

  // Fallback: juste render les enfants
  return <>{children}</>
}

interface CollectionRendererProps {
  type: CollectionType
  title: string
  description: string
  showHelp?: boolean
  showCTA?: boolean
  children?: React.ReactNode
}

function CollectionRenderer({ type, title, description, showHelp, showCTA, children }: CollectionRendererProps) {
  const stats = getCollectionStats(type)
  const items = getCollectionItems(type)
  const config = getCollectionConfig(type)

  // Mapping des styles selon le type de statistique
  const statStyles: Record<StatType, { color: string, bg: string }> = {
    primary: { color: 'text-primary', bg: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/30 border-blue-200 dark:border-blue-800' },
    concepts: { color: 'text-primary', bg: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/30 border-blue-200 dark:border-blue-800' },
    guides: { color: 'text-green-600 dark:text-green-400', bg: 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/30 border-green-200 dark:border-green-800' },
    workflows: { color: 'text-purple-600 dark:text-purple-400', bg: 'bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/30 border-purple-200 dark:border-purple-800' },
    tools: { color: 'text-orange-600 dark:text-orange-400', bg: 'bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/50 dark:to-orange-900/30 border-orange-200 dark:border-orange-800' },
    default: { color: 'text-muted-foreground', bg: 'bg-muted/50' },
  }

  return (
    <Animate variant="fadeIn" className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Header avec responsive design mobile-first et animations */}
      <Animate variant="slideUp" delay={100}>
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <Section size="md">
            <Container variant="detail">
              <div className="page-header">
                <h1 className="page-title text-balance animate-fade-in">
                  {title}
                </h1>
                <p className="prose-description text-pretty animate-slide-up">
                  {description}
                </p>
              </div>

              {stats && stats.length > 0 && (
                <StaggeredContainer staggerDelay={100} className="stats-grid">
                  {stats.map((stat, index) => {
                    const styles = statStyles[stat.type] || statStyles.default
                    return (
                      <Animate
                        // eslint-disable-next-line react/no-array-index-key -- Index acceptable pour des cartes statistiques avec labels uniques
                        key={`stat-${stat.label.replace(/\s+/g, '-').toLowerCase()}-${index}`}
                        variant="slideUp"
                        staggerIndex={index}
                        className="stats-grid-item"
                      >
                        <div className={cn('stat-card hover-glow hover-scale cursor-pointer', styles.bg)}>
                          <div className={cn('stat-number animate-bounce-subtle', styles.color)}>
                            {stat.value}
                          </div>
                          <div className={cn('stat-label text-muted-foreground', styles.color)}>
                            {stat.label}
                          </div>
                        </div>
                      </Animate>
                    )
                  })}
                </StaggeredContainer>
              )}
            </Container>
          </Section>
        </div>
      </Animate>

      {/* Contenu principal avec marges standardisées et animations */}
      <Animate variant="slideUp" delay={200}>
        <Section>
          <Container variant="collection">
            <Animate variant="fadeIn" delay={300} className="animate-fade-in">
              {/* Utilisation universelle de ContentCard pour tous les types de contenu */}
              {(type === 'concepts' || type === 'guides' || type === 'workflows') && (
                <FilterableGrid
                  items={items as BaseContent[]}
                  renderComponent={ContentCard}
                  searchPlaceholder={config.searchPlaceholder}
                  showCategoryFilter={config.showCategoryFilter}
                  showDifficultyFilter={config.showDifficultyFilter}
                  gridClassName={config.gridClassName}
                />
              )}

              {showHelp && type === 'concepts' && (
                <>
                  <Separator className="my-12" />

                  {/* Section d'aide */}
                  <div className="mt-16 text-center">
                    <Separator className="mb-8" />
                    <h2 className="text-2xl font-semibold mb-4">
                      Comment utiliser le Hub de Concepts ?
                    </h2>
                    <div className="grid md:grid-cols-3 container mx-auto" style={{
                      gap: designTokens.spacing.lg
                    }}>
                      <div className="text-center">
                        <div className="bg-primary/10 flex items-center justify-center mx-auto mb-3" style={{
                          width: designTokens.spacing.xl3,
                          height: designTokens.spacing.xl3,
                          borderRadius: designTokens.radius.lg
                        }}>
                          <LucideIcons.BookOpen className="size-6 text-primary" />
                        </div>
                        <h3 className="font-semibold mb-2">1. Choisissez un concept</h3>
                        <p className="prose-caption">
                          Explorez les concepts qui correspondent à vos besoins
                          d'apprentissage
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="bg-primary/10 flex items-center justify-center mx-auto mb-3" style={{
                          width: designTokens.spacing.xl3,
                          height: designTokens.spacing.xl3,
                          borderRadius: designTokens.radius.lg
                        }}>
                          <LucideIcons.Lightbulb className="size-6 text-primary" />
                        </div>
                        <h3 className="font-semibold mb-2">2. Découvrez les ressources</h3>
                        <p className="prose-caption">
                          Accédez aux guides, workflows et outils liés à ce concept
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="bg-primary/10 flex items-center justify-center mx-auto mb-3" style={{
                          width: designTokens.spacing.xl3,
                          height: designTokens.spacing.xl3,
                          borderRadius: designTokens.radius.lg
                        }}>
                          <LucideIcons.Wrench className="size-6 text-primary" />
                        </div>
                        <h3 className="font-semibold mb-2">3. Mettez en pratique</h3>
                        <p className="prose-caption">
                          Utilisez l'éditeur de prompts pour tester et adapter les
                          workflows pratiques
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {showCTA && type === 'workflows' && (
                <>
                  {/* Bottom CTA */}
                  <div className="mt-16 text-center bg-muted rounded-lg" style={{
                    padding: designTokens.spacing.lg,
                    paddingTop: designTokens.spacing.xl2,
                    paddingBottom: designTokens.spacing.xl2,
                    borderRadius: designTokens.radius.lg
                  }}>
                    <h3 className="responsive-subheading mb-4">Nouveau dans l'IA ?</h3>
                    <p className="prose-description mb-6">
                      Je recommande de commencer par comprendre les concepts essentiels avant de vous lancer
                      dans un workflow. Cela vous évitera les erreurs courantes que j'ai faites à mes débuts.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center" style={{
                      gap: designTokens.spacing.md
                    }}>
                      <Link href="/par-ou-commencer">
                        <Button>
                          Par où commencer ?
                          <ArrowRight className="size-4 ml-2" />
                        </Button>
                      </Link>
                      <Link href="/concepts">
                        <Button variant="outline">
                          Les concepts essentiels
                        </Button>
                      </Link>
                    </div>
                  </div>
                </>
              )}

              {children}
            </Animate>
          </Container>
        </Section>
      </Animate>
    </Animate>
  )
}

interface ContentPageLayoutProps {
  item: Concept | Guide | Workflow | ExternalTool
  children?: React.ReactNode
}

function ContentPageLayout({ item, children }: ContentPageLayoutProps) {
  // Déterminer si on doit utiliser le mode prose ou non
  // Les concepts et outils n'utilisent pas prose par défaut
  const applyProseStyles = !('url' in item) && !('keyTakeaways' in item && 'category' in item && !('estimatedTime' in item))

  return (
    <Section>
      <Container variant="collection">
        <BreadcrumbNavigation />

        <div className="mb-8">
          <div style={{
            padding: designTokens.spacing.lg,
            paddingTop: designTokens.spacing.xl2,
            paddingBottom: designTokens.spacing.xl2
          }}>
            <ContentHeader item={item} />
            <ContentMetadata item={item} />
          </div>
        </div>

        <main className={cn(
          '',
          applyProseStyles && 'prose prose-lg dark:prose-invert max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-p:text-muted-foreground prose-strong:text-foreground',
        )}" style={{
          padding: designTokens.spacing.lg,
          paddingTop: designTokens.spacing.xl2,
          paddingBottom: designTokens.spacing.xl2,
          paddingLeft: designTokens.spacing.xl3,
          paddingRight: designTokens.spacing.xl3
        }}
        >
          {children}
        </main>
      </Container>
    </Section>
  )
}
