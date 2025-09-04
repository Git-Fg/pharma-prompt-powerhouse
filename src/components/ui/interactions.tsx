'use client'

import type { HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { easings } from './animated'

// Enhanced button with micro-interactions
interface AnimatedButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: ReactNode
  variant?: 'default' | 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  loading?: boolean
  success?: boolean
  disabled?: boolean
}

export function AnimatedButton({ ref, children, variant = 'default', size = 'md', className, loading = false, success = false, disabled = false, ...props }: AnimatedButtonProps & { ref?: React.RefObject<HTMLButtonElement | null> }) {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'

  const variantClasses = {
    default: 'bg-background hover:bg-accent hover:text-accent-foreground border border-input',
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
  }

  const sizeClasses = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 px-4 py-2',
    lg: 'h-11 px-8',
  }

  return (
    <motion.button
      ref={ref}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        'rounded-md',
        className,
      )}
      disabled={disabled || loading}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2, ease: easings.spring },
      }}
      whileTap={{
        scale: 0.98,
        transition: { duration: 0.1, ease: easings.snappy },
      }}
      initial={false}
      animate={success
        ? {
            scale: [1, 1.05, 1],
            backgroundColor: ['var(--primary)', 'var(--chart-3)', 'var(--primary)'],
          }
        : {}}
      transition={success
        ? {
            duration: 0.6,
            ease: easings.bounce,
          }
        : {}}
      {...props}
    >
      <motion.div
        className="flex items-center gap-2"
        animate={loading ? { opacity: 0.7 } : { opacity: 1 }}
      >
        {loading && (
          <motion.div
            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        )}
        {success && !loading && (
          <motion.svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ duration: 0.3, ease: easings.spring }}
          >
            <path d="M20 6 9 17l-5-5" />
          </motion.svg>
        )}
        <span>{children}</span>
      </motion.div>
    </motion.button>
  )
}

AnimatedButton.displayName = 'AnimatedButton'

// Enhanced card with hover effects and magnetic attraction
interface MagneticCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode
  className?: string
  intensity?: number
  distance?: number
  disabled?: boolean
}

export function MagneticCard({ ref: _ref, children, className, intensity = 0.3, distance = 150, disabled = false, ...props }: MagneticCardProps & { ref?: React.RefObject<HTMLDivElement | null> }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-100, 100], [5, -5])
  const rotateY = useTransform(x, [-100, 100], [-5, 5])

  useEffect(() => {
    if (disabled)
      return

    const card = cardRef.current
    if (!card)
      return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const deltaX = e.clientX - centerX
      const deltaY = e.clientY - centerY
      const distanceFromCenter = Math.sqrt(deltaX ** 2 + deltaY ** 2)

      if (distanceFromCenter < distance) {
        x.set(deltaX * intensity)
        y.set(deltaY * intensity)
      }
    }

    const handleMouseLeave = () => {
      x.set(0)
      y.set(0)
    }

    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [x, y, intensity, distance, disabled])

  return (
    <motion.div
      ref={cardRef}
      className={cn('bg-card text-card-foreground border rounded-lg shadow-sm p-6 hover-glow', className)}
      style={{
        x,
        y,
        rotateX: disabled ? 0 : rotateX,
        rotateY: disabled ? 0 : rotateY,
      }}
      whileHover={!disabled
        ? {
            scale: 1.02,
            transition: { duration: 0.3, ease: easings.spring },
          }
        : {}}
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 15,
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

MagneticCard.displayName = 'MagneticCard'

// Floating Action Button with pulse effect
interface FloatingButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: ReactNode
  className?: string
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  pulse?: boolean
  badge?: boolean
  badgeContent?: string | number
}

export function FloatingButton({ ref, children, className, position = 'bottom-right', pulse = false, badge = false, badgeContent, ...props }: FloatingButtonProps & { ref?: React.RefObject<HTMLButtonElement | null> }) {
  const positionClasses = {
    'bottom-right': 'fixed bottom-6 right-6',
    'bottom-left': 'fixed bottom-6 left-6',
    'top-right': 'fixed top-6 right-6',
    'top-left': 'fixed top-6 left-6',
  }

  return (
    <motion.button
      ref={ref}
      className={cn(
        'relative w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg z-50',
        'flex items-center justify-center',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        positionClasses[position],
        className,
      )}
      whileHover={{
        scale: 1.1,
        rotate: 5,
        transition: { duration: 0.2, ease: easings.spring },
      }}
      whileTap={{
        scale: 0.95,
        rotate: -5,
        transition: { duration: 0.1, ease: easings.snappy },
      }}
      animate={pulse
        ? {
            scale: [1, 1.05, 1],
            boxShadow: [
              '0 4px 20px rgba(0,0,0,0.1)',
              '0 8px 40px rgba(0,0,0,0.2)',
              '0 4px 20px rgba(0,0,0,0.1)',
            ],
          }
        : {}}
      transition={pulse
        ? {
            duration: 2,
            repeat: Infinity,
            ease: easings.smooth,
          }
        : {}}
      {...props}
    >
      {badge && (
        <motion.div
          className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-xs rounded-full min-w-5 h-5 flex items-center justify-center px-1"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3, ease: easings.bounce }}
        >
          {badgeContent}
        </motion.div>
      )}
      {children}
    </motion.button>
  )
}

FloatingButton.displayName = 'FloatingButton'

// Ripple effect component
interface RippleEffectProps {
  className?: string
  color?: string
}

export function RippleEffect({ className, color = 'rgba(255, 255, 255, 0.6)' }: RippleEffectProps) {
  const ripples = useMotionValue([] as Array<{ id: number, x: number, y: number }>)

  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = Date.now()

    const currentRipples = ripples.get()
    ripples.set([...currentRipples, { id, x, y }])

    setTimeout(() => {
      const updatedRipples = ripples.get().filter(ripple => ripple.id !== id)
      ripples.set(updatedRipples)
    }, 600)
  }

  return (
    <div
      className={cn('absolute inset-0 overflow-hidden rounded-inherit pointer-events-auto', className)}
      onClick={handleClick}
    >
      {ripples.get().map(ripple => (
        <motion.div
          key={ripple.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            backgroundColor: color,
            left: ripple.x,
            top: ripple.y,
          }}
          initial={{
            width: 0,
            height: 0,
            x: 0,
            y: 0,
            opacity: 0.8,
          }}
          animate={{
            width: 300,
            height: 300,
            x: -150,
            y: -150,
            opacity: 0,
          }}
          transition={{
            duration: 0.6,
            ease: easings.smooth,
          }}
        />
      ))}
    </div>
  )
}

// Progress indicator with smooth animations
interface AnimatedProgressProps {
  value: number
  max?: number
  className?: string
  showPercentage?: boolean
  color?: string
  height?: string
}

export function AnimatedProgress({
  value,
  max = 100,
  className,
  showPercentage = false,
  color = 'var(--primary)',
  height = '8px',
}: AnimatedProgressProps) {
  const percentage = Math.min((value / max) * 100, 100)

  return (
    <div className={cn('relative w-full', className)}>
      <div
        className="w-full bg-muted rounded-full overflow-hidden"
        style={{ height }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{
            duration: 0.8,
            ease: easings.spring,
          }}
        />
      </div>

      {showPercentage && (
        <motion.div
          className="absolute top-0 right-0 -mt-6 text-sm font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          {Math.round(percentage)}
          %
        </motion.div>
      )}
    </div>
  )
}

// Toast notification with slide animation
interface AnimatedToastProps {
  message: string
  type?: 'success' | 'error' | 'warning' | 'info'
  isVisible: boolean
  onClose?: () => void
  duration?: number
}

export function AnimatedToast({
  message,
  type = 'info',
  isVisible,
  onClose,
  duration = 5000,
}: AnimatedToastProps) {
  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  }

  const colors = {
    success: 'bg-chart-3 text-white',
    error: 'bg-destructive text-destructive-foreground',
    warning: 'bg-yellow-500 text-white',
    info: 'bg-primary text-primary-foreground',
  }

  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose?.()
      }, duration)

      return () => clearTimeout(timer)
    }
    return undefined
  }, [isVisible, duration, onClose])

  return (
    <motion.div
      className={cn(
        'fixed top-6 right-6 z-toast',
        'px-4 py-3 rounded-lg shadow-lg',
        'flex items-center gap-3',
        'max-w-sm',
        colors[type],
      )}
      initial={{ opacity: 0, x: 100, scale: 0.95 }}
      animate={isVisible
        ? {
            opacity: 1,
            x: 0,
            scale: 1,
          }
        : {
            opacity: 0,
            x: 100,
            scale: 0.95,
          }}
      transition={{
        duration: 0.3,
        ease: easings.spring,
      }}
    >
      <span className="text-lg">{icons[type]}</span>
      <span className="text-sm font-medium">{message}</span>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="ml-auto hover:opacity-70 transition-opacity"
        >
          ✕
        </button>
      )}
    </motion.div>
  )
}
