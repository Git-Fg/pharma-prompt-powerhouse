// src/hooks/useConsent.tsx
'use client'

import type { ReactNode } from 'react'
import { createContext, use, useCallback, useEffect, useMemo, useState } from 'react'

type ConsentStatus = 'pending' | 'accepted' | 'declined'
interface ConsentContextType {
  status: ConsentStatus
  accept: () => void
  decline: () => void
}

const ConsentContext = createContext<ConsentContextType | null>(null)

const STORAGE_KEY = 'pharma-consent-status'

/**
 * Nettoie toutes les données stockées (thème, favoris, etc.)
 */
function clearStoredData() {
  // Nettoyer toutes les clés de stockage utilisées par l'application
  const keysToRemove = [
    'theme', // thème utilisateur
    'favorites', // favoris
    'user-preferences', // autres préférences
  ]

  keysToRemove.forEach((key) => {
    localStorage.removeItem(key)
  })
}

/**
 * Provider pour gérer le consentement utilisateur en conformité avec la loi européenne.
 * Philosophie : simplicité respectueuse - un interrupteur ON/OFF simple.
 */
export function ConsentProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<ConsentStatus>('pending')

  // Charger le statut de consentement au montage
  useEffect(() => {
    const loadConsentStatus = () => {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === 'accepted' || stored === 'declined') {
        // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect -- Direct set acceptable pour l'initialisation de l'état de consentement
        setStatus(stored as ConsentStatus)
      }
    }
    loadConsentStatus()
  }, [])

  const accept = useCallback(() => {
    setStatus('accepted')
    localStorage.setItem(STORAGE_KEY, 'accepted')
  }, [])

  const decline = useCallback(() => {
    setStatus('declined')
    localStorage.setItem(STORAGE_KEY, 'declined')
    // Nettoyer toute donnée existante si l'utilisateur refuse
    clearStoredData()
  }, [])

  const contextValue = useMemo(() => ({
    status,
    accept,
    decline,
  }), [status, accept, decline])

  return (
    <ConsentContext value={contextValue}>
      {children}
    </ConsentContext>
  )
}

/**
 * Hook to access consent state - moved to end of file for fast refresh compatibility
 */
export function useConsent() {
  const context = use(ConsentContext)
  if (!context) {
    throw new Error('useConsent doit être utilisé dans un ConsentProvider')
  }
  return context
}
