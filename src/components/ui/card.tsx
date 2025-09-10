'use client'

import { cva } from 'class-variance-authority'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface CardContextValue {
  padding: 'sm' | 'md' | 'lg'
}

const CardContext = React.createContext<CardContextValue | undefined>(undefined)

function useCardContext() {
  const context = React.use(CardContext)
  if (!context) {
    throw new Error('Card components must be used within a Card component')
  }
  return context
}

const cardVariants = cva(
  'bg-card/70 dark:bg-card/50 text-card-foreground backdrop-blur-xl rounded-lg border border-border/20 shadow-lg shadow-black/5 dark:shadow-black/20 transition-all duration-200 ease-spring hover-lift',
  {
    variants: {
      padding: {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8 md:p-10',
      },
    },
    defaultVariants: {
      padding: 'md',
    },
  },
)

const cardHeaderVariants = cva(
  'flex flex-col space-y-1.5 @container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
  {
    variants: {
      padding: {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8 md:p-10',
      },
    },
    defaultVariants: {
      padding: 'md',
    },
  },
)

const cardContentVariants = cva(
  '',
  {
    variants: {
      padding: {
        sm: 'p-4 pt-0',
        md: 'p-6 pt-0',
        lg: 'p-8 md:p-10 pt-0',
      },
    },
    defaultVariants: {
      padding: 'md',
    },
  },
)

const cardFooterVariants = cva(
  'flex items-center [.border-t]:pt-6',
  {
    variants: {
      padding: {
        sm: 'p-4 pt-4',
        md: 'p-6 pt-4',
        lg: 'p-8 md:p-10 pt-6',
      },
    },
    defaultVariants: {
      padding: 'md',
    },
  },
)

interface CardProps extends React.ComponentProps<'div'> {
  // La prop padding est supprimée pour forcer l'utilisation des sous-composants
  // CardHeader, CardContent, et CardFooter qui ont déjà un padding standardisé
}

function Card({ className, children, ...props }: CardProps) {
  // Padding par défaut pour les cartes sans sous-composants
  const contextValue = React.useMemo(() => ({ padding: 'md' as const }), [])
  return (
    <CardContext value={contextValue}>
      <div
        data-slot="card"
        className={cn(
          cardVariants({ padding: 'md' }),
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </CardContext>
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  const { padding } = useCardContext()
  return (
    <div
      data-slot="card-header"
      className={cn(
        cardHeaderVariants({ padding }),
        className,
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn('leading-none font-semibold', className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
        className,
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  const { padding } = useCardContext()
  return (
    <div
      data-slot="card-content"
      className={cn(cardContentVariants({ padding }), className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  const { padding } = useCardContext()
  return (
    <div
      data-slot="card-footer"
      className={cn(cardFooterVariants({ padding }), className)}
      {...props}
    />
  )
}

export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
}
