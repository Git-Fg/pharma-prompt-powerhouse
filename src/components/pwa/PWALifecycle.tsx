'use client'

import { useEffect } from 'react'

export function PWALifecycle() {
  useEffect(() => {
    if (
      typeof window !== 'undefined'
      && 'serviceWorker' in navigator
    ) {
      let registration: ServiceWorkerRegistration | undefined

      const handleUpdateFound = () => {
        const newWorker = registration?.installing
        if (newWorker) {
          const handleStateChange = () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // In production, you might want to show a toast notification here
              if (process.env.NODE_ENV === 'development') {
                console.warn('New version available! Please refresh to update.')
              }
            }
          }

          newWorker.addEventListener('statechange', handleStateChange)
        }
      }

      const handleMessage = (event: MessageEvent) => {
        if (event.data && event.data.type === 'SKIP_WAITING') {
          window.location.reload()
        }
      }

      // Register the service worker
      navigator.serviceWorker.register('/sw.js').then((reg) => {
        registration = reg
        // Service worker registered successfully
        if (process.env.NODE_ENV === 'development') {
          console.warn('Service Worker registered:', registration)
        }

        // Listen for service worker updates
        registration.addEventListener('updatefound', handleUpdateFound)
      }).catch((error) => {
        // Service worker registration failed - only log in development
        if (process.env.NODE_ENV === 'development') {
          console.warn('Service Worker registration failed:', error)
        }
      })

      // Listen for service worker messages
      navigator.serviceWorker.addEventListener('message', handleMessage)

      // Cleanup function
      return () => {
        if (registration) {
          registration.removeEventListener('updatefound', handleUpdateFound)
        }
        navigator.serviceWorker.removeEventListener('message', handleMessage)
      }
    }

    // Return undefined for the else case
    return undefined
  }, [])

  return null
}
