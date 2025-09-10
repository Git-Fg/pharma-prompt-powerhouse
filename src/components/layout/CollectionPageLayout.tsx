import React from 'react'
import { AnimatedItem, AnimatedList, ScrollAnimated } from '@/components/ui/animated'
import { StaggeredItem, StaggeredPage } from '@/components/ui/transitions'
import { cn } from '@/lib/utils'
import { Container, Section } from './Container'

type StatType = 'primary' | 'concepts' | 'guides' | 'workflows' | 'tools' | 'default'

export interface StatCardProps {
  value: string | number
  label: string
  type: StatType // Nouvelle prop sémantique
}

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
    <StaggeredPage className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Header avec responsive design mobile-first et animations */}
      <StaggeredItem>
        <div className={cn('border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60', headerClassName)}>
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
                <AnimatedList className="stats-grid" staggerDelay={0.15}>
                  {stats.map((stat, index) => {
                    const styles = statStyles[stat.type] || statStyles.default
                    return (
                      <AnimatedItem
                        // eslint-disable-next-line react/no-array-index-key -- Index acceptable pour des cartes statistiques avec labels uniques
                        key={`stat-${stat.label.replace(/\s+/g, '-').toLowerCase()}-${index}`}
                        delay={index * 0.1}
                      >
                        <div className={cn(
                          'stat-card hover-glow hover-scale cursor-pointer',
                          'border-2 border-border/50 backdrop-blur-sm',
                          'hover:border-border transition-all duration-300',
                          'hover:shadow-lg hover:shadow-primary/5',
                          styles.bg,
                        )}
                        >
                          <div className={cn('stat-number animate-bounce-subtle', styles.color)}>
                            {stat.value}
                          </div>
                          <div className={cn('stat-label text-muted-foreground', styles.color)}>
                            {stat.label}
                          </div>
                        </div>
                      </AnimatedItem>
                    )
                  })}
                </AnimatedList>
              )}
            </Container>
          </Section>
        </div>
      </StaggeredItem>

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
