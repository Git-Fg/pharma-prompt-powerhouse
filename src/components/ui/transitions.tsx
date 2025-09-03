'use client'

import { motion, AnimatePresence, HTMLMotionProps } from 'framer-motion'
import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { easings } from './animated'

// Page transition variants - Modern 2025 patterns
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: easings.spring,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: easings.smooth,
    },
  },
}

const slideVariants = {
  initial: {
    x: 20,
    opacity: 0,
  },
  enter: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: easings.spring,
    },
  },
  exit: {
    x: -20,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: easings.smooth,
    },
  },
}

const scaleVariants = {
  initial: {
    scale: 0.95,
    opacity: 0,
  },
  enter: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: easings.spring,
    },
  },
  exit: {
    scale: 1.05,
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: easings.smooth,
    },
  },
}

// Staggered content animation for page sections
const staggeredPageVariants = {
  initial: {},
  enter: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
}

const staggeredItemVariants = {
  initial: {
    y: 20,
    opacity: 0,
  },
  enter: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: easings.spring,
    },
  },
  exit: {
    y: -10,
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: easings.smooth,
    },
  },
}

interface PageTransitionProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode
  variant?: 'fade' | 'slide' | 'scale'
  className?: string
}

export function PageTransition({ 
  children, 
  variant = 'fade', 
  className = '',
  ...props 
}: PageTransitionProps) {
  const pathname = usePathname()
  
  const variants = {
    fade: pageVariants,
    slide: slideVariants,
    scale: scaleVariants,
  }[variant]

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        className={className}
        initial="initial"
        animate="enter"
        exit="exit"
        variants={variants}
        {...props}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

interface StaggeredPageProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode
  className?: string
}

export function StaggeredPage({ 
  children, 
  className = '',
  ...props 
}: StaggeredPageProps) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        className={className}
        initial="initial"
        animate="enter"
        exit="exit"
        variants={staggeredPageVariants}
        {...props}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export function StaggeredItem({ 
  children, 
  className = '',
  ...props 
}: { children: ReactNode; className?: string } & HTMLMotionProps<'div'>) {
  return (
    <motion.div
      className={className}
      variants={staggeredItemVariants}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Enhanced loading transitions
const loadingVariants = {
  initial: {
    opacity: 0,
  },
  loading: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: easings.smooth,
    },
  },
  loaded: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: easings.smooth,
    },
  },
}

interface LoadingTransitionProps {
  isLoading: boolean
  children: ReactNode
  loadingComponent?: ReactNode
  className?: string
}

export function LoadingTransition({ 
  isLoading, 
  children, 
  loadingComponent,
  className = ''
}: LoadingTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loading"
          className={className}
          initial="initial"
          animate="loading"
          exit="loaded"
          variants={loadingVariants}
        >
          {loadingComponent || (
            <div className="flex items-center justify-center py-8">
              <div className="animate-pulse-subtle text-muted-foreground">
                Chargement...
              </div>
            </div>
          )}
        </motion.div>
      ) : (
        <motion.div
          key="content"
          className={className}
          initial="initial"
          animate="enter"
          variants={pageVariants}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Modal and overlay transitions
const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 10,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: easings.spring,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: {
      duration: 0.15,
      ease: easings.smooth,
    },
  },
}

const backdropVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.15,
    },
  },
}

interface ModalTransitionProps {
  isOpen: boolean
  children: ReactNode
  onClose?: () => void
  className?: string
}

export function ModalTransition({ 
  isOpen, 
  children, 
  onClose,
  className = ''
}: ModalTransitionProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-modal-backdrop"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={backdropVariants}
            onClick={onClose}
          />
          
          {/* Modal content */}
          <motion.div
            className={`fixed inset-0 flex items-center justify-center z-modal p-4 ${className}`}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}