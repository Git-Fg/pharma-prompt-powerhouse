'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { easings } from './animation-constants'

// Enhanced skeleton with modern shimmer effect
interface SkeletonProps {
  className?: string
  width?: string | number
  height?: string | number
  variant?: 'rectangular' | 'circular' | 'rounded' | 'text'
  lines?: number
  animate?: boolean
  style?: React.CSSProperties
  dataSidebar?: string
  // eslint-disable-next-line ts/no-explicit-any -- Permet les attributs data HTML arbitraires pour les tests et le style
  [key: string]: any // Allow any data attributes
}

export function Skeleton({
  className,
  width = '100%',
  height = '1rem',
  variant = 'rectangular',
  lines = 1,
  animate = true,
  style,
  dataSidebar,
  ...props
}: SkeletonProps) {
  const baseClasses = 'bg-muted'

  const variantClasses = {
    rectangular: 'rounded-md',
    circular: 'rounded-full',
    rounded: 'rounded-lg',
    text: 'rounded-sm h-4',
  }

  if (variant === 'text' && lines > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, index) => (
          <motion.div
            // eslint-disable-next-line react/no-array-index-key -- Index acceptable pour des lignes de loading avec identifiant unique généré
            key={`text-line-${index}-${Math.random().toString(36).substr(2, 9)}`}
            className={cn(
              baseClasses,
              variantClasses[variant],
              animate && 'animate-pulse-subtle',
              className,
            )}
            style={{
              width: index === lines - 1 ? '75%' : width,
              height,
              ...style,
            }}
            initial={animate ? { opacity: 0 } : false}
            animate={animate ? { opacity: 1 } : false}
            transition={animate
              ? {
                  delay: index * 0.1,
                  duration: 0.3,
                  ease: easings.smooth,
                }
              : undefined}
            {...props}
            data-sidebar={dataSidebar}
          />
        ))}
      </div>
    )
  }

  return (
    <motion.div
      className={cn(
        baseClasses,
        variantClasses[variant],
        animate && 'animate-pulse-subtle',
        className,
      )}
      style={{ width, height, ...style }}
      initial={animate ? { opacity: 0 } : false}
      animate={animate ? { opacity: 1 } : false}
      transition={animate
        ? {
            duration: 0.3,
            ease: easings.smooth,
          }
        : undefined}
      {...props}
      data-sidebar={dataSidebar}
    />
  )
}

// Card skeleton for content loading states
interface CardSkeletonProps {
  showImage?: boolean
  imageHeight?: string | number
  titleLines?: number
  descriptionLines?: number
  showActions?: boolean
  className?: string
}

export function CardSkeleton({
  showImage = false,
  imageHeight = '200px',
  titleLines = 1,
  descriptionLines = 2,
  showActions = false,
  className,
}: CardSkeletonProps) {
  return (
    <motion.div
      className={cn('p-6 border rounded-lg bg-card', className)}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.3,
        ease: easings.spring,
      }}
    >
      {showImage && (
        <Skeleton
          className="mb-4"
          height={imageHeight}
          variant="rounded"
        />
      )}

      <Skeleton
        variant="text"
        lines={titleLines}
        height="1.25rem"
        className="mb-3"
      />

      <Skeleton
        variant="text"
        lines={descriptionLines}
        height="0.875rem"
        className="mb-4"
      />

      {showActions && (
        <div className="flex gap-2">
          <Skeleton width="80px" height="36px" variant="rounded" />
          <Skeleton width="100px" height="36px" variant="rounded" />
        </div>
      )}
    </motion.div>
  )
}

// List skeleton for content collections
interface ListSkeletonProps {
  items?: number
  showImages?: boolean
  className?: string
}

export function ListSkeleton({
  items = 3,
  showImages = false,
  className,
}: ListSkeletonProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {Array.from({ length: items }).map((_, index) => (
        <motion.div
          // eslint-disable-next-line react/no-array-index-key -- Index acceptable pour des items de liste avec identifiant unique généré
          key={`list-item-${index}-${Math.random().toString(36).substr(2, 9)}`}
          className="flex gap-4 p-4 border rounded-lg bg-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: index * 0.1,
            duration: 0.4,
            ease: easings.spring,
          }}
        >
          {showImages && (
            <Skeleton
              width="60px"
              height="60px"
              variant="rounded"
            />
          )}

          <div className="flex-1 space-y-2">
            <Skeleton variant="text" height="1.125rem" width="75%" />
            <Skeleton variant="text" lines={2} height="0.875rem" />

            <div className="flex gap-2 mt-3">
              <Skeleton width="60px" height="20px" variant="rounded" />
              <Skeleton width="80px" height="20px" variant="rounded" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// Table skeleton for data loading
interface TableSkeletonProps {
  rows?: number
  columns?: number
  className?: string
}

export function TableSkeleton({
  rows = 5,
  columns = 4,
  className,
}: TableSkeletonProps) {
  return (
    <div className={cn('border rounded-lg overflow-hidden bg-card', className)}>
      {/* Header */}
      <div className="border-b bg-muted/50 p-3">
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {Array.from({ length: columns }).map((_, index) => (
            <Skeleton
              // eslint-disable-next-line react/no-array-index-key -- Index acceptable pour des headers de table avec identifiant unique généré
              key={`header-${index}-${Math.random().toString(36).substr(2, 9)}`}
              height="1rem"
              width="80%"
              variant="text"
            />
          ))}
        </div>
      </div>

      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <motion.div
          // eslint-disable-next-line react/no-array-index-key -- Index acceptable pour des lignes de table avec identifiant unique généré
          key={`row-${rowIndex}-${Math.random().toString(36).substr(2, 9)}`}
          className="border-b last:border-b-0 p-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: rowIndex * 0.05,
            duration: 0.3,
            ease: easings.smooth,
          }}
        >
          <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
            {Array.from({ length: columns }).map((_, colIndex) => (
              <Skeleton
                // eslint-disable-next-line react/no-array-index-key -- Index acceptable pour des cellules de table avec position unique
                key={`cell-${rowIndex}-${colIndex}-${Math.random().toString(36).substr(2, 9)}`}
                height="0.875rem"
                width={colIndex === 0 ? '90%' : '70%'}
                variant="text"
              />
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// Loading spinner with modern design
interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  label?: string
}

export function Spinner({
  size = 'md',
  className,
  label = 'Chargement...',
}: SpinnerProps) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }

  return (
    <div className={cn('flex items-center justify-center gap-3', className)}>
      <motion.div
        className={cn(
          'border-2 border-primary/20 border-t-primary rounded-full',
          sizes[size],
        )}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      {label && (
        <span className="text-sm text-muted-foreground animate-pulse-subtle">
          {label}
        </span>
      )}
    </div>
  )
}

// Comprehensive loading states component
interface LoadingStateProps {
  type?: 'skeleton' | 'spinner' | 'dots'
  variant?: 'card' | 'list' | 'table' | 'page'
  items?: number
  message?: string
  className?: string
}

export function LoadingState({
  type = 'skeleton',
  variant = 'card',
  items = 3,
  message = 'Chargement du contenu...',
  className,
}: LoadingStateProps) {
  if (type === 'spinner') {
    return (
      <div className={cn('flex flex-col items-center justify-center py-12', className)}>
        <Spinner size="lg" label={message} />
      </div>
    )
  }

  if (type === 'dots') {
    return (
      <div className={cn('flex items-center justify-center py-8', className)}>
        <div className="flex space-x-2">
          {[0, 1, 2].map(index => (
            <motion.div
              key={`dot-${index}`}
              className="w-2 h-2 bg-primary rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: index * 0.2,
                ease: easings.smooth,
              }}
            />
          ))}
        </div>
        {message && (
          <span className="ml-3 text-sm text-muted-foreground">
            {message}
          </span>
        )}
      </div>
    )
  }

  // Skeleton variants
  switch (variant) {
    case 'list':
      return <ListSkeleton items={items} className={className} />
    case 'table':
      return <TableSkeleton rows={items} className={className} />
    case 'page':
      return (
        <div className={cn('space-y-6', className)}>
          <div className="text-center space-y-4">
            <Skeleton height="2.5rem" width="60%" variant="text" className="mx-auto" />
            <Skeleton height="1rem" lines={2} width="80%" variant="text" className="mx-auto" />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: items }).map((_, index) => (
              <CardSkeleton
                // eslint-disable-next-line react/no-array-index-key -- Index acceptable pour des cards avec identifiant unique généré
                key={`card-${index}-${Math.random().toString(36).substr(2, 9)}`}
                showImage
              />
            ))}
          </div>
        </div>
      )
    default: // card
      return (
        <div className={cn('grid gap-4 md:grid-cols-2 lg:grid-cols-3', className)}>
          {Array.from({ length: items }).map((_, index) => (
            <CardSkeleton
              // eslint-disable-next-line react/no-array-index-key -- Index acceptable pour des cards avec identifiant unique généré
              key={`card-${index}-${Math.random().toString(36).substr(2, 9)}`}
            />
          ))}
        </div>
      )
  }
}
