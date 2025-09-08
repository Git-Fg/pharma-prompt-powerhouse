'use client'

import React from 'react'
import { AnimatedItem, AnimatedList } from '@/components/ui/animated'
import Badge from '@/components/ui/badge'
import { StaggeredItem } from '@/components/ui/transitions'
import { createTestIdProps } from '@/lib/test-utils'
import { cn } from '@/lib/utils'
import { Container, Section } from './Container'

// Types existants réutilisés
export type StatType = 'primary' | 'concepts' | 'guides' | 'workflows' | 'tools' | 'default'

export interface StatCardProps {
  value: string | number
  label: string
  type: StatType
}

// Variantes d'en-tête
export type PageHeaderVariant = 'default' | 'hero' | 'collection' | 'getting-started' | 'home'

export interface PageHeaderProps {
  /**
   * Titre principal de la page
   */
  title: string
  /**
   * Description de la page
   */
  description: string
  /**
   * Variante de l'en-tête pour différents types de pages
   */
  variant?: PageHeaderVariant
  /**
   * Badge à afficher (pour les pages hero ou getting-started)
   */
  badge?: string
  /**
   * Statistiques à afficher (pour les pages collection)
   */
  stats?: StatCardProps[]
  /**
   * Classe CSS supplémentaire pour le conteneur
   */
  className?: string
  /**
   * Test ID personnalisé pour les tests
   */
  testId?: string
  /**
   * Si true, utilise le style hero avec fond et centrage
   */
  isHero?: boolean
  /**
   * Si true, affiche le badge en variant outline plutôt que default
   */
  outlineBadge?: boolean
}

/**
 * Composant PageHeader unifié pour centraliser la gestion des en-têtes de page
 *
 * Ce composant remplace les différentes implémentations d'en-têtes dispersées dans le codebase :
 * - En-têtes simples de CollectionPageLayout
 * - Hero sections de GettingStartedLayout
 * - En-têtes personnalisés des pages d'accueil
 *
 * Il supporte plusieurs variantes pour s'adapter à différents contextes tout en
 * maintenant une cohérence de design et d'animations.
 */
export function PageHeader({
  title,
  description,
  variant = 'default',
  badge,
  stats,
  className,
  testId,
  isHero = false,
  outlineBadge = false,
}: PageHeaderProps) {
  // Générer le test ID ou utiliser celui fourni
  const finalTestId = testId || `page-header-${variant}`

  // Mapping des styles selon le type de statistique
  const statStyles: Record<StatType, { color: string, bg: string }> = {
    primary: { color: 'text-primary', bg: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/30 border-blue-200 dark:border-blue-800' },
    concepts: { color: 'text-primary', bg: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/30 border-blue-200 dark:border-blue-800' },
    guides: { color: 'text-green-600 dark:text-green-400', bg: 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/30 border-green-200 dark:border-green-800' },
    workflows: { color: 'text-purple-600 dark:text-purple-400', bg: 'bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/30 border-purple-200 dark:border-purple-800' },
    tools: { color: 'text-orange-600 dark:text-orange-400', bg: 'bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/50 dark:to-orange-900/30 border-orange-200 dark:border-orange-800' },
    default: { color: 'text-muted-foreground', bg: 'bg-muted/50' },
  }

  // Déterminer la variante finale
  const finalVariant = isHero ? 'hero' : variant

  // Styles de conteneur selon la variante
  const containerStyles = {
    'default': 'border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
    'hero': 'bg-gradient-to-br from-background via-background to-muted/10',
    'collection': 'border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
    'getting-started': 'bg-gradient-to-br from-background via-background to-muted/10',
    'home': '',
  }

  // Styles de contenu selon la variante
  const contentStyles = {
    'default': 'text-left',
    'hero': 'text-center',
    'collection': 'text-left',
    'getting-started': 'text-center flex flex-col items-center space-y-4',
    'home': 'text-center',
  }

  // Styles de titre selon la variante
  const titleStyles = {
    'default': 'page-title text-balance animate-fade-in',
    'hero': 'text-2xl md:text-4xl font-bold leading-tight animate-fade-in',
    'collection': 'page-title text-balance animate-fade-in',
    'getting-started': 'text-2xl md:text-4xl font-bold leading-tight animate-fade-in',
    'home': 'responsive-heading text-balance animate-fade-in',
  }

  // Styles de description selon la variante
  const descriptionStyles = {
    'default': 'prose-description text-pretty animate-slide-up',
    'hero': 'prose-description animate-slide-up max-w-2xl',
    'collection': 'prose-description text-pretty animate-slide-up',
    'getting-started': 'prose-description animate-slide-up max-w-2xl',
    'home': 'prose-description animate-slide-up max-w-2xl',
  }

  // Configuration de section selon la variante
  const sectionSize = finalVariant === 'hero' || finalVariant === 'getting-started' ? 'lg' : 'md'
  const containerVariant = finalVariant === 'home' ? 'detail' : 'detail'

  return (
    <StaggeredItem>
      <div className={cn(containerStyles[finalVariant], className)} {...createTestIdProps(finalTestId || 'page-header')}>
        <Section size={sectionSize}>
          <Container variant={containerVariant}>
            <div className={cn('page-header', contentStyles[finalVariant])}>
              {/* Badge */}
              {badge && (
                <Badge
                  variant={outlineBadge ? 'outline' : 'default'}
                  className={cn(
                    finalVariant === 'getting-started' && 'mb-4',
                    'animate-slide-up',
                  )}
                >
                  {badge}
                </Badge>
              )}

              {/* Titre */}
              <h1 className={titleStyles[finalVariant]}>
                {title}
              </h1>

              {/* Description */}
              <p className={descriptionStyles[finalVariant]}>
                {description}
              </p>

              {/* Statistiques */}
              {stats && stats.length > 0 && (
                <AnimatedList className="stats-grid mt-6" staggerDelay={0.15}>
                  {stats.map((stat, index) => {
                    const styles = statStyles[stat.type] || statStyles.default
                    return (
                      <AnimatedItem
                        // eslint-disable-next-line react/no-array-index-key -- Index acceptable pour des cartes statistiques avec labels uniques
                        key={`stat-${stat.label.replace(/\s+/g, '-').toLowerCase()}-${index}`}
                        delay={index * 0.1}
                      >
                        <div className={cn('stat-card hover-glow hover-scale cursor-pointer', styles.bg)}>
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
            </div>
          </Container>
        </Section>
      </div>
    </StaggeredItem>
  )
}

export default PageHeader
