'use client'

import { useEffect, useState } from 'react'

export interface PWAStatus {
  isOnline: boolean
  isInstalled: boolean
  isInstallable: boolean
  isUpdating: boolean
}

export function usePWAStatus(): PWAStatus {
  const [status, setStatus] = useState<PWAStatus>({
    isOnline: true,
    isInstalled: false,
    isInstallable: false,
    isUpdating: false,
  })

  useEffect(() => {
    // Check if installed (standalone mode)
    const checkInstalled = () => {
      return window.matchMedia('(display-mode: standalone)').matches

        || (window.navigator as any).standalone === true
    }

    // Update online status
    const updateOnlineStatus = () => {
      setStatus(prev => ({ ...prev, isOnline: navigator.onLine }))
    }

    // Check for beforeinstallprompt event availability
    const handleBeforeInstallPrompt = () => {
      setStatus(prev => ({ ...prev, isInstallable: true }))
    }

    // Check for app installation
    const handleAppInstalled = () => {
      setStatus(prev => ({
        ...prev,
        isInstalled: true,
        isInstallable: false,
      }))
    }

    // Initialize status
    setStatus(prev => ({
      ...prev,
      isOnline: navigator.onLine,
      isInstalled: checkInstalled(),
    }))

    // Add event listeners
    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    // Service worker update detection
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        setStatus(prev => ({ ...prev, isUpdating: true }))
        // Reset updating status after a short delay
        setTimeout(() => {
          setStatus(prev => ({ ...prev, isUpdating: false }))
        }, 2000)
      })
    }

    return () => {
      window.removeEventListener('online', updateOnlineStatus)
      window.removeEventListener('offline', updateOnlineStatus)
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  return status
}
