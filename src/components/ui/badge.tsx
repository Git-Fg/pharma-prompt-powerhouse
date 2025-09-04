import type { VariantProps } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 [&>svg]:pointer-events-none overflow-hidden',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'bg-destructive text-white shadow hover:bg-destructive/90 focus:ring-destructive/20 dark:focus:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'text-foreground border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        success: 'bg-green-500 text-white shadow hover:bg-green-600',
        warning: 'bg-yellow-500 text-white shadow hover:bg-yellow-600',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        default: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Badge({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'span'>
  & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span'

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
