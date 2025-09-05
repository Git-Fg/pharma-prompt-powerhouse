// src/hooks/useConsent.ts
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
 * Hook pour utiliser le contexte de consentement
 */
export function useConsent() {
  const context = use(ConsentContext)
  if (!context) {
    throw new Error('useConsent doit être utilisé dans un ConsentProvider')
  }
  return context
}

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
 * Hook utilitaire pour le stockage conditionnel
 * Permet de stocker des données seulement si l'utilisateur a consenti
 */
export function useConsentStorage() {
  const { status } = useConsent()

  const setItem = useCallback((key: string, value: string) => {
    if (status === 'accepted') {
      localStorage.setItem(key, value)
    }
    // Si décliné, on ne stocke rien
    // Les fonctionnalités marchent pour la session en cours
  }, [status])

  const getItem = useCallback((key: string): string | null => {
    if (status === 'accepted') {
      return localStorage.getItem(key)
    }
    // Si décliné, on ne lit pas depuis le stockage persistant
    return null
  }, [status])

  const removeItem = useCallback((key: string) => {
    localStorage.removeItem(key)
  }, [])

  return { setItem, getItem, removeItem }
}
