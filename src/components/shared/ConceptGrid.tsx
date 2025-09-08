'use client'

import React from 'react'
import { ActionLinkCard } from '@/components/ui/ActionLinkCard'
import { createTestIdProps, TestIds } from '@/lib/test-utils'
import { cn } from '@/lib/utils'

export interface ConceptItem {
  /**
   * URL de destination pour le lien
   */
  href: string
  /**
   * Titre du concept
   */
  title: string
  /**
   * Description du concept
   */
  description: string
  /**
   * Icône optionnelle à afficher
   */
  icon?: React.ReactNode
  /**
   * Badge optionnel à afficher
   */
  badge?: React.ReactNode
}

export interface ConceptGridProps {
  /**
   * Liste des concepts à afficher
   */
  concepts: ConceptItem[]
  /**
   * Classes CSS supplémentaires
   */
  className?: string
  /**
   * Test ID personnalisé pour les tests
   */
  testId?: string
}

export const ConceptGrid: React.FC<ConceptGridProps> = ({
  concepts,
  className,
  testId,
}) => {
  // Générer le test ID ou utiliser celui fourni
  const finalTestId = testId || 'concept-grid'

  return (
    <div
      className={cn(
        'grid md:grid-cols-3 gap-4',
        className,
      )}
      {...createTestIdProps(TestIds.Layout.Grid('concepts', finalTestId))}
    >
      {concepts.map((concept, index) => (
        <ActionLinkCard
          key={concept.href || index}
          href={concept.href}
          title={concept.title}
          description={concept.description}
          icon={concept.icon}
          badge={concept.badge}
          variant="concept"
          size="compact"
          testId={`concept-item-${index}`}
        />
      ))}
    </div>
  )
}

export default ConceptGrid
