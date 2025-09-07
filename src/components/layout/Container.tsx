import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
  variant?: 'collection' | 'detail' | 'full'
}

export function Container({
  children,
  className = '',
  variant = 'detail',
  ...rest
}: ContainerProps) {
  const variantClasses = {
    collection: 'container-layout-collection',
    detail: 'container-layout-detail',
    full: 'max-w-full px-0',
  }

  return (
    <div
      className={cn(
        'w-full',
        variantClasses[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

/**
 * Composant pour les sections avec marges standardisées
 *
 * Convention de rythme vertical :
 * - `size="lg"` : Uniquement pour la toute première section "héro" d'une page
 * - `size="md"` (défaut) : Pour toutes les sections de contenu principales qui se suivent
 * - `size="sm"` : Pour les sections auxiliaires ou de conclusion
 */
interface SectionProps {
  children: ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function Section({
  children,
  className = '',
  size = 'md',
}: SectionProps) {
  const sizeClasses = {
    sm: 'py-6 md:py-8',
    md: 'py-8 md:py-12',
    lg: 'py-12 md:py-16',
  }

  return (
    <section className={cn(
      sizeClasses[size],
      className,
    )}
    >
      {children}
    </section>
  )
}
