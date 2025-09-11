'use client'

import type { ContainerVariants } from '@/design-system/variants';
import React from 'react'
import { containerVariants } from '@/design-system/variants'
import { cn } from '@/lib/utils'

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement>, ContainerVariants {}

function Container({ ref, className, size, center, padding, ...props }: ContainerProps & { ref?: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div
      ref={ref}
      className={cn(containerVariants({ size, center, padding, className }))}
      {...props}
    />
  )
}

Container.displayName = 'Container'

export default Container
