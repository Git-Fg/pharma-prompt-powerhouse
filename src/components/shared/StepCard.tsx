'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { StaggeredItem } from '@/components/ui/transitions'
import { contentCardVariants } from '@/components/ui/variants'
import { createTestIdProps, TestIds } from '@/lib/test-utils'
import { cn } from '@/lib/utils'

export interface StepCardProps {
  /**
   * Numéro de l'étape (1-4)
   */
  step: number
  /**
   * Titre de l'étape
   */
  title: string
  /**
   * Description ou sous-titre
   */
  description?: string
  /**
   * Icône à afficher
   */
  icon: React.ReactNode
  /**
   * Contenu principal de l'étape
   */
  children: React.ReactNode
  /**
   * Variante visuelle de la carte
   * @default 'default'
   */
  variant?: 'concept' | 'guide' | 'workflow' | 'tool' | 'security' | 'advanced' | 'default'
  /**
   * Classes CSS supplémentaires
   */
  className?: string
  /**
   * Test ID personnalisé pour les tests
   */
  testId?: string
}

const stepColors = {
  concept: 'bg-blue-500',
  guide: 'bg-green-500',
  security: 'bg-red-500',
  advanced: 'bg-purple-500',
  default: 'bg-gray-500',
  workflow: 'bg-purple-500',
  tool: 'bg-orange-500',
}

export const StepCard: React.FC<StepCardProps> = ({
  step,
  title,
  description,
  icon,
  children,
  variant = 'default',
  className,
  testId,
}) => {
  // Générer le test ID ou utiliser celui fourni
  const finalTestId = testId || `step-card-${step}`

  return (
    <StaggeredItem delay={step * 0.1}>
      <li className="[counter-increment:step-counter] relative">
        <Card
          className={cn(
            contentCardVariants({ variant }),
            className,
          )}
          {...createTestIdProps(TestIds.Interactive.Card('step', finalTestId))}
        >
          <CardHeader>
            <div className="flex items-center space-x-2">
              <div
                className={cn(
                  'size-8 text-white rounded-full flex items-center justify-center text-sm font-bold [&::before]:content-[counter(step-counter)] [&::before]:absolute [&::before]:inset-0 [&::before]:flex [&::before]:items-center [&::before]:justify-center',
                  stepColors[variant] || stepColors.default,
                )}
              >
                <span className="sr-only">
                  Étape
                  {step}
                </span>
              </div>
              <CardTitle className="flex items-center space-x-2">
                {icon}
                <span>{title}</span>
              </CardTitle>
            </div>
            {description && (
              <CardDescription>
                {description}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            {children}
          </CardContent>
        </Card>
      </li>
    </StaggeredItem>
  )
}

export default StepCard
