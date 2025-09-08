// src/components/ui/animations/index.ts
export { AnimatedContainer } from '../AnimatedContainer'
// Type exports
export type { AnimationType } from '../AnimatedContainer'
export { AnimatedList } from '../AnimatedList'

export type { StaggerConfig } from '../AnimatedList'

// Re-export animation constants
export {
  bounceInVariants,
  easings,
  fadeInVariants,
  hoverScaleVariants,
  pressScaleVariants,
  pulseVariants,
  scaleVariants,
  slideDownVariants,
  slideLeftVariants,
  slideRightVariants,
  slideUpVariants,
  staggerConfigs,
  staggerContainerVariants,
  staggerItemVariants,
} from '../animation-constants'
export { InteractiveAnimation } from '../InteractiveAnimation'
