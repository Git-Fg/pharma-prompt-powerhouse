// src/hooks/useConsentHook.ts
'use client'

import type { ReactNode } from 'react'
import { createContext, use, useCallback, useEffect, useMemo, useState } from 'react'
import { clearStoredData } from './useConsentUtils'

type ConsentStatus = 'pending' | 'accepted' | 'declined'
interface ConsentContextType {
  status: ConsentStatus
  accept: () => void
  decline: () => void
}

const ConsentContext = createContext<ConsentContextType | null>(null)

const STORAGE_KEY = 'pharma-consent-status'

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