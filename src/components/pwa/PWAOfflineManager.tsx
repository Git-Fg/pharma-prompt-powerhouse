'use client'

import { Wifi, WifiOff, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Container } from '@/components/layout/Container'

/**
 * PWA Offline Status Manager
 * Provides modern offline experience with toast notifications
 * instead of full-page redirects
 */
export function PWAOfflineManager() {
  const [isOnline, setIsOnline] = useState(true)
  const [hasShownOfflineToast, setHasShownOfflineToast] = useState(false)
  const [showPersistentBanner, setShowPersistentBanner] = useState(false)
  const [dismissedBanner, setDismissedBanner] = useState(false)

  useEffect(() => {
    // Initialize online status
    const initializeOnlineStatus = () => {
      // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect -- Direct set acceptable pour l'initialisation de l'état de connexion
      setIsOnline(navigator.onLine)
    }

    initializeOnlineStatus()

    const handleOnline = () => {
      setIsOnline(true)
      setHasShownOfflineToast(false)
      setShowPersistentBanner(false)
      setDismissedBanner(false)

      // Welcome back toast
      toast.success('Connexion rétablie', {
        description: 'Toutes les fonctionnalités sont à nouveau disponibles',
        icon: <Wifi className="size-4" />,
        duration: 3000,
      })
    }

    const handleOffline = () => {
      setIsOnline(false)
      setShowPersistentBanner(true)
      setDismissedBanner(false)

      if (!hasShownOfflineToast) {
        setHasShownOfflineToast(true)

        // Initial offline notification
        toast.error('Mode hors ligne activé', {
          description: 'Le contenu en cache reste accessible.',
          icon: <WifiOff className="size-4" />,
          duration: 5000,
        })
      }
    }

    // Listen for online/offline events
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Service Worker integration for cache-only responses
    let serviceWorkerEventHandler: ((event: MessageEvent) => void) | null = null

    if ('serviceWorker' in navigator) {
      serviceWorkerEventHandler = (event) => {
        if (event.data?.type === 'CACHE_ONLY_RESPONSE') {
          // Show notification when content is served from cache only
          toast.info('Contenu en cache', {
            description: 'Affichage de la version sauvegardée hors ligne',
            icon: <WifiOff className="size-4" />,
            duration: 4000,
          })
        }
      }

      navigator.serviceWorker.addEventListener('message', serviceWorkerEventHandler)
    }

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)

      if (serviceWorkerEventHandler && 'serviceWorker' in navigator) {
        navigator.serviceWorker.removeEventListener('message', serviceWorkerEventHandler)
      }
    }
  }, [hasShownOfflineToast])

  // Visual indicator for offline status (could be used in UI)
  useEffect(() => {
    // Update document class for CSS-based offline styling
    const updateOfflineClass = () => {
      document.documentElement.classList.toggle('offline', !isOnline)
    }
    updateOfflineClass()
  }, [isOnline])

  // Render persistent offline banner when needed
  if (!isOnline && showPersistentBanner && !dismissedBanner) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-amber-50 border-t border-amber-200 p-3 shadow-lg">
        <Container variant="detail" className="flex items-center justify-between px-0">
          <div className="flex items-center gap-3">
            <WifiOff className="h-5 w-5 text-amber-600 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-amber-900">Mode hors ligne</p>
              <p className="text-amber-700">Le contenu en cache reste accessible</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                fetch('/api/health', { method: 'HEAD' })
                  .then(() => {
                    if (navigator.onLine) {
                      setIsOnline(true)
                      setShowPersistentBanner(false)
                      setHasShownOfflineToast(false)
                      toast.success('Connexion rétablie', {
                        description: 'Toutes les fonctionnalités sont à nouveau disponibles',
                        icon: <Wifi className="size-4" />,
                        duration: 3000,
                      })
                    }
                  })
                  .catch(() => {
                    toast.info('Toujours hors ligne', {
                      description: 'Vérifiez votre connexion internet',
                      duration: 2000,
                    })
                  })
              }}
              className="px-3 py-1.5 text-xs font-medium text-amber-700 bg-amber-100 hover:bg-amber-200 rounded-md transition-colors"
            >
              Réessayer
            </button>
            <button
              type="button"
              onClick={() => setDismissedBanner(true)}
              className="p-1.5 text-amber-600 hover:text-amber-800 rounded-md hover:bg-amber-100 transition-colors"
              aria-label="Masquer la bannière"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </Container>
      </div>
    )
  }

  // This component doesn't render anything when online or banner dismissed
  return null
}

/**
 * Hook to get current online status
 * Useful for components that need to adapt their behavior
 */
export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    // Initialize online status
    const initializeStatus = () => {
      // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect -- Direct set acceptable pour l'initialisation de l'état de connexion
      setIsOnline(navigator.onLine)
    }

    initializeStatus()

    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return isOnline
}
