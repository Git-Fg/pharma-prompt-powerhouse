'use client'

import Link from 'next/link'
import React from 'react'
import { contentCardVariants } from '@/components/ui/variants'
import { createTestIdProps, TestIds } from '@/lib/test-utils'
import { cn } from '@/lib/utils'

export interface ActionLinkCardProps {
  /**
   * URL de destination pour le lien
   */
  href: string
  /**
   * Titre principal de la carte
   */
  title: string
  /**
   * Description ou sous-titre
   */
  description?: string
  /**
   * Icône optionnelle à afficher
   */
  icon?: React.ReactNode
  /**
   * Badge optionnel à afficher
   */
  badge?: React.ReactNode
  /**
   * Variante visuelle de la carte
   * @default 'default'
   */
  variant?: 'concept' | 'guide' | 'workflow' | 'tool' | 'security' | 'advanced' | 'default'
  /**
   * Taille de la carte
   * @default 'compact'
   */
  size?: 'compact' | 'default' | 'large'
  /**
   * Classes CSS supplémentaires
   */
  className?: string
  /**
   * Test ID personnalisé pour les tests
   */
  testId?: string
}

export const ActionLinkCard: React.FC<ActionLinkCardProps> = ({
  href,
  title,
  description,
  icon,
  badge,
  variant = 'default',
  size = 'compact',
  className,
  testId,
}) => {
  // Générer le test ID ou utiliser celui fourni
  const finalTestId = testId || `action-link-card-${title.toLowerCase().replace(/\s+/g, '-')}`

  return (
    <Link
      href={href}
      className={cn(
        'block group',
        contentCardVariants({ variant, size }),
        'hover:shadow-lg hover:border-primary/50 transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        className,
      )}
      {...createTestIdProps(TestIds.Interactive.Card('action-link', finalTestId))}
    >
      <div className="flex items-start space-x-3">
        {/* Icône optionnelle */}
        {icon && (
          <div className="flex-shrink-0">
            {icon}
          </div>
        )}

        {/* Contenu principal */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className={cn(
              'font-semibold line-clamp-2 group-hover:text-primary transition-colors',
              size === 'compact' ? 'text-sm' : 'text-base',
            )}
            >
              {title}
            </h3>

            {/* Badge optionnel */}
            {badge && (
              <div className="flex-shrink-0 ml-2">
                {badge}
              </div>
            )}
          </div>

          {/* Description optionnelle */}
          {description && (
            <p className={cn(
              'text-muted-foreground line-clamp-2',
              size === 'compact' ? 'text-xs' : 'text-sm',
            )}
            >
              {description}
            </p>
          )}
        </div>

        {/* Flèche indicatrice */}
        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <svg
            className={cn(
              'text-muted-foreground group-hover:text-primary transition-colors',
              size === 'compact' ? 'size-4' : 'size-5',
            )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  )
}

export default ActionLinkCard
