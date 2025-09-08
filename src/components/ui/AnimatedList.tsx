// src/components/ui/AnimatedList.tsx
'use client'

import type { Variants } from 'framer-motion'
import { motion } from 'framer-motion'
import React from 'react'
import { cn } from '@/lib/utils'
import { staggerConfigs, staggerContainerVariants, staggerItemVariants } from './animation-constants'

export type StaggerConfig = keyof typeof staggerConfigs

interface AnimatedListProps {
  children: React.ReactNode
  className?: string
  stagger?: StaggerConfig
  delay?: number
  itemVariants?: Variants
  containerVariants?: Variants
}

export function AnimatedList({
  children,
  className,
  stagger = 'normal',
  delay = 0,
  itemVariants,
  containerVariants,
}: AnimatedListProps) {
  const config = staggerConfigs[stagger]

  // Apply delay to the stagger config
  const customContainerVariants = containerVariants || {
    ...staggerContainerVariants,
    visible: {
      transition: {
        ...((staggerContainerVariants.visible as { transition?: object })?.transition || {}),
        ...config,
        delayChildren: config.delayChildren + delay,
      },
    },
  }

  const customItemVariants = itemVariants || staggerItemVariants

  // Use React.Children.map to avoid toArray warning and generate stable keys
  return (
    <motion.div
      className={cn(className)}
      variants={customContainerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* eslint-disable-next-line react/no-children-map -- Children.map is necessary for stable key generation with animation variants */}
      {React.Children.map(children, (child, index) => (
        <motion.div

          key={`stagger-item-${index}-${(child as React.ReactElement)?.key || index}`}
          variants={customItemVariants}
          custom={index}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}
