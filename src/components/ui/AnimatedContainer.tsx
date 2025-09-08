// src/components/ui/AnimatedContainer.tsx
'use client'

import type { TargetAndTransition, VariantLabels, Variants } from 'framer-motion'
import { motion } from 'framer-motion'
import React from 'react'
import { cn } from '@/lib/utils'
import {
  bounceInVariants,
  fadeInVariants,
  scaleVariants,
  slideDownVariants,
  slideLeftVariants,
  slideRightVariants,
  slideUpVariants,
} from './animation-constants'

export type AnimationType
  = | 'fadeIn'
    | 'slideUp'
    | 'slideDown'
    | 'slideLeft'
    | 'slideRight'
    | 'scale'
    | 'bounceIn'

interface AnimatedContainerProps {
  children: React.ReactNode
  animation?: AnimationType
  delay?: number
  duration?: number
  className?: string
  variants?: Variants
  whileHover?: Variants
  whileTap?: Variants
  initial?: boolean | string
  animate?: boolean | string
  exit?: boolean | string
}

const animationVariants: Record<AnimationType, Variants> = {
  fadeIn: fadeInVariants,
  slideUp: slideUpVariants,
  slideDown: slideDownVariants,
  slideLeft: slideLeftVariants,
  slideRight: slideRightVariants,
  scale: scaleVariants,
  bounceIn: bounceInVariants,
}

export function AnimatedContainer({
  children,
  animation = 'fadeIn',
  delay = 0,
  duration,
  className,
  variants,
  whileHover,
  whileTap,
  initial = true,
  animate = 'visible',
  exit = 'hidden',
}: AnimatedContainerProps) {
  const selectedVariants = variants || animationVariants[animation]

  // Apply custom duration if provided - simplified approach
  const finalVariants = duration ? variants : selectedVariants

  return (
    <motion.div
      className={cn(className)}
      variants={finalVariants}
      initial={initial === true ? 'hidden' : initial as TargetAndTransition | VariantLabels}
      animate={animate === true ? 'visible' : animate as TargetAndTransition | VariantLabels}
      exit={exit === true ? 'hidden' : exit as TargetAndTransition | VariantLabels}
      // eslint-disable-next-line ts/no-explicit-any -- Framer Motion whileHover and whileTap require complex type casting that conflicts with Variants type
      whileHover={whileHover as any}
      // eslint-disable-next-line ts/no-explicit-any -- Framer Motion whileHover and whileTap require complex type casting that conflicts with Variants type
      whileTap={whileTap as any}
      custom={delay}
    >
      {children}
    </motion.div>
  )
}
