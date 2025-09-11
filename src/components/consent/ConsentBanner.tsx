// src/components/consent/ConsentBanner.tsx
'use client'

import { Cookie, Settings, Shield } from 'lucide-react'
import Button from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useConsent } from '@/hooks/useConsent'
import { designTokens } from '@/design-system/tokens'

/**
 * Bannière de consentement discrète et respectueuse.
 * Apparaît seulement quand le statut est 'pending'.
 * Design : position fixe en bas, non intrusive, avec une animation douce.
 */
export function ConsentBanner() {
  const { status, accept, decline } = useConsent()

  // Ne pas afficher si le consentement a déjà été donné ou refusé
  if (status !== 'pending') {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t animate-slide-up" style={{ padding: designTokens.spacing.md }}>
      <div className="container mx-auto container">
        <Card className="shadow-lg">
          <CardContent>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between" style={{ gap: designTokens.spacing.lg }}>

              {/* Icône et message principal */}
              <div className="flex items-start" style={{ gap: designTokens.spacing.sm }}>
                <div className="flex-shrink-0">
                  <Cookie className="text-primary" style={{ width: '1.5rem', height: '1.5rem', marginTop: '0.125rem' }} />
                </div>
                <div className="space-y-2" style={{ gap: designTokens.spacing.sm }}>
                  <h3 className="font-semibold text-foreground">
                    Confort et Confidentialité
                  </h3>
                  <p className="text-muted-foreground leading-relaxed" style={{ fontSize: designTokens.typography.fontSize.sm }}>
                    Nous souhaitons sauvegarder vos préférences (thème, favoris) pour améliorer votre expérience.
                    Aucune donnée personnelle ou de santé n'est collectée.
                    <span className="font-medium" style={{ fontSize: designTokens.typography.fontSize.sm }}> Vous gardez le contrôle total.</span>
                  </p>
                </div>
              </div>

              {/* Boutons d'action */}
              <div className="flex flex-col sm:flex-row lg:flex-shrink-0" style={{ gap: designTokens.spacing.sm }}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={decline}
                  style={{ fontSize: designTokens.typography.fontSize.sm }}
                >
                  <Shield className="mr-2" style={{ width: '1rem', height: '1rem' }} />
                  Naviguer sans sauvegarde
                </Button>
                <Button
                  size="sm"
                  onClick={accept}
                  style={{ fontSize: designTokens.typography.fontSize.sm }}
                >
                  <Settings className="mr-2" style={{ width: '1rem', height: '1rem' }} />
                  Activer le confort
                </Button>
              </div>
            </div>

            {/* Note de transparence */}
            <div className="border-t" style={{ marginTop: designTokens.spacing.lg, paddingTop: designTokens.spacing.lg }}>
              <p className="text-muted-foreground" style={{ fontSize: designTokens.typography.fontSize.xs }}>
                <strong>Transparence totale :</strong>
                {' '}
                En mode "confort", nous sauvegardons uniquement vos préférences d'interface.
                En mode "navigation sans sauvegarde", toutes les fonctionnalités restent disponibles pour la session en cours,
                mais rien n'est mémorisé à la fermeture du navigateur.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
