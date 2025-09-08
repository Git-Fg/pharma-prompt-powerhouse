// src/components/ui/InteractiveAnimation.tsx
'use client'

import { motion } from 'framer-motion'
import React from 'react'
import { cn } from '@/lib/utils'
import { hoverScaleVariants, pressScaleVariants } from './animation-constants'

interface InteractiveAnimationProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  press?: boolean
  scale?: number
  pressScale?: number
  disabled?: boolean
}

export function InteractiveAnimation({
  children,
  className,
  hover = true,
  press = true,
  scale = 1.05,
  pressScale = 0.95,
  disabled = false,
}: InteractiveAnimationProps) {
  const hoverVariants = hover
    ? {
        ...hoverScaleVariants,
        hover: {
          scale,
          transition: {
            duration: 0.2,
            ease: 'easeOut',
          },
        },
      }
    : undefined

  const pressVariants = press
    ? {
        ...pressScaleVariants,
        press: {
          scale: pressScale,
          transition: {
            duration: 0.1,
            ease: 'easeInOut',
          },
        },
      }
    : undefined

  return (
    <motion.div
      className={cn(
        'cursor-pointer select-none',
        disabled && 'cursor-not-allowed opacity-60',
        className,
      )}
      whileHover={!disabled ? hoverVariants?.hover as { scale?: number, transition?: object } : undefined}
      whileTap={!disabled ? pressVariants?.press as { scale?: number, transition?: object } : undefined}
    >
      {children}
    </motion.div>
  )
}
