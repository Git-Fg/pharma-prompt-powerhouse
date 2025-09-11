import type { VariantProps } from 'tailwind-variants'
import { Slot } from '@radix-ui/react-slot'
import * as React from 'react'

import { badgeVariants } from '@/design-system/variants'
import { cn } from '@/lib/utils'

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

export default Badge
