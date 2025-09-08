'use client'

import React from 'react'
import { ActionLinkCard } from '@/components/ui/ActionLinkCard'
import { createTestIdProps, TestIds } from '@/lib/test-utils'
import { cn } from '@/lib/utils'

export interface WorkflowItem {
  /**
   * URL de destination pour le lien
   */
  href: string
  /**
   * Titre du workflow
   */
  title: string
  /**
   * Description du workflow
   */
  description: string
  /**
   * Badge optionnel à afficher
   */
  badge?: React.ReactNode
}

export interface WorkflowGridProps {
  /**
   * Liste des workflows à afficher
   */
  workflows: WorkflowItem[]
  /**
   * Classes CSS supplémentaires
   */
  className?: string
  /**
   * Test ID personnalisé pour les tests
   */
  testId?: string
}

export const WorkflowGrid: React.FC<WorkflowGridProps> = ({
  workflows,
  className,
  testId,
}) => {
  // Générer le test ID ou utiliser celui fourni
  const finalTestId = testId || 'workflow-grid'

  return (
    <div
      className={cn(
        'grid md:grid-cols-2 gap-4',
        className,
      )}
      {...createTestIdProps(TestIds.Layout.Grid('workflows', finalTestId))}
    >
      {workflows.map((workflow, index) => (
        <ActionLinkCard
          key={workflow.href || index}
          href={workflow.href}
          title={workflow.title}
          description={workflow.description}
          badge={workflow.badge}
          variant="workflow"
          size="compact"
          testId={`workflow-item-${index}`}
        />
      ))}
    </div>
  )
}

export default WorkflowGrid
