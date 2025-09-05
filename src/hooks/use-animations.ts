'use client'

import { useMotionValue, useSpring } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'

// Hook for scroll-driven animations
export function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const currentProgress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0
      setScrollProgress(currentProgress)
    }

    window.addEventListener('scroll', updateScrollProgress, { passive: true })
    updateScrollProgress()

    return () => window.removeEventListener('scroll', updateScrollProgress)
  }, [])

  return scrollProgress
}

// Hook for element intersection animations
export function useInView(threshold = 0.1) {
  const [isInView, setIsInView] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element)
      return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry) {
          setIsInView(entry.isIntersecting)
        }
      },
      { threshold },
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold])

  return { ref, isInView }
}

// Hook for mouse position tracking
export function useMousePosition() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [mouseX, mouseY])

  return { mouseX, mouseY }
}

// Hook for magnetic effect
export function useMagneticEffect(strength = 0.3, distance = 150) {
  const ref = useRef<HTMLElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, { stiffness: 150, damping: 15 })
  const springY = useSpring(y, { stiffness: 150, damping: 15 })

  useEffect(() => {
    const element = ref.current
    if (!element)
      return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const deltaX = e.clientX - centerX
      const deltaY = e.clientY - centerY
      const distanceFromCenter = Math.sqrt(deltaX ** 2 + deltaY ** 2)

      if (distanceFromCenter < distance) {
        x.set(deltaX * strength)
        y.set(deltaY * strength)
      }
    }

    const handleMouseLeave = () => {
      x.set(0)
      y.set(0)
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [x, y, strength, distance])

  return { ref, x: springX, y: springY }
}

// Hook for parallax effect
export function useParallax(speed = 0.5) {
  const ref = useRef<HTMLElement>(null)
  const y = useMotionValue(0)

  useEffect(() => {
    const element = ref.current
    if (!element)
      return

    const handleScroll = () => {
      const scrolled = window.scrollY
      const rate = scrolled * speed
      y.set(rate)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [y, speed])

  return { ref, y }
}

// Hook for staggered animations
export function useStagger<T>(items: T[], delay = 0.1) {
  const [visibleItems, setVisibleItems] = useState<T[]>([])

  useEffect(() => {
    // Reset visible items when items change
    setVisibleItems([])

    const timeouts: NodeJS.Timeout[] = []

    items.forEach((item, index) => {
      const timeout = setTimeout(() => {
        setVisibleItems(prev => [...prev, item])
      }, index * delay * 1000)
      timeouts.push(timeout)
    })

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout))
    }
  }, [items, delay])

  return visibleItems
}

// Hook for loading state animations
export function useLoadingState(initialDelay = 500) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, initialDelay)

    return () => clearTimeout(timer)
  }, [initialDelay])

  const startLoading = useCallback(() => setIsLoading(true), [])
  const stopLoading = useCallback(() => setIsLoading(false), [])

  return { isLoading, startLoading, stopLoading }
}

// Hook for smooth counter animation
export function useCounterAnimation(end: number, duration = 1000, start = 0) {
  const [count, setCount] = useState(start)
  const [isAnimating, setIsAnimating] = useState(false)

  const animate = useCallback(() => {
    setIsAnimating(true)
    const startTime = Date.now()
    const startValue = start

    const updateCounter = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / duration, 1)

      // Easing function for smooth animation
      const easedProgress = 1 - Math.cos(progress * Math.PI / 2)
      const currentValue = Math.floor(startValue + (end - startValue) * easedProgress)

      setCount(currentValue)

      if (progress < 1) {
        requestAnimationFrame(updateCounter)
      }
      else {
        setIsAnimating(false)
      }
    }

    requestAnimationFrame(updateCounter)
  }, [start, end, duration])

  return { count, animate, isAnimating }
}

// Hook for typed text animation
export function useTypewriter(text: string, speed = 50) {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    // Reset states when text changes
    setDisplayedText('')
    setIsComplete(false)

    let index = 0
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(prev => prev + text[index])
        index++
      }
      else {
        setIsComplete(true)
        clearInterval(timer)
      }
    }, speed)

    return () => clearInterval(timer)
  }, [text, speed])

  return { displayedText, isComplete }
}

// Hook for device motion animations (mobile)
export function useDeviceMotion() {
  const [motion, setMotion] = useState({ x: 0, y: 0, z: 0 })

  useEffect(() => {
    const handleDeviceMotion = (event: DeviceMotionEvent) => {
      const acceleration = event.accelerationIncludingGravity
      if (acceleration) {
        setMotion({
          x: acceleration.x || 0,
          y: acceleration.y || 0,
          z: acceleration.z || 0,
        })
      }
    }

    window.addEventListener('devicemotion', handleDeviceMotion)

    return () => {
      window.removeEventListener('devicemotion', handleDeviceMotion)
    }
  }, [])

  return motion
}

// Hook for reduced motion preferences
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const updatePreference = () => {
      setPrefersReducedMotion(mediaQuery.matches)
    }

    updatePreference()

    mediaQuery.addEventListener('change', updatePreference)

    return () => {
      mediaQuery.removeEventListener('change', updatePreference)
    }
  }, [])

  return prefersReducedMotion
}
