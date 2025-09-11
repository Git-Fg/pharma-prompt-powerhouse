import type { VariantProps } from 'tailwind-variants'
import { Slot } from '@radix-ui/react-slot'
import * as React from 'react'

import { buttonVariants } from '@/design-system/variants'
import { cn } from '@/lib/utils'

function Button({
  className,
  variant,
  size,
  animation,
  asChild = false,
  ...props
}: React.ComponentProps<'button'>
  & VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, animation, className }))}
      {...props}
    />
  )
}

export default Button
