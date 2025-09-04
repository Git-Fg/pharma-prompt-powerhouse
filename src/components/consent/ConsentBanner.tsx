// src/components/consent/ConsentBanner.tsx
'use client';

import { useConsent } from '@/hooks/useConsent';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Cookie, Shield, Settings } from 'lucide-react';

/**
 * Bannière de consentement discrète et respectueuse.
 * Apparaît seulement quand le statut est 'pending'.
 * Design : position fixe en bas, non intrusive, avec une animation douce.
 */
export function ConsentBanner() {
  const { status, accept, decline } = useConsent();

  // Ne pas afficher si le consentement a déjà été donné ou refusé
  if (status !== 'pending') {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur-md border-t animate-slide-up">
      <div className="container mx-auto max-w-4xl">
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              
              {/* Icône et message principal */}
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <Cookie className="h-6 w-6 text-primary mt-0.5" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">
                    Confort et Confidentialité
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Nous souhaitons sauvegarder vos préférences (thème, favoris) pour améliorer votre expérience. 
                    Aucune donnée personnelle ou de santé n'est collectée. 
                    <span className="font-medium"> Vous gardez le contrôle total.</span>
                  </p>
                </div>
              </div>

              {/* Boutons d'action */}
              <div className="flex flex-col sm:flex-row gap-3 lg:flex-shrink-0">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={decline}
                  className="text-sm"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Naviguer sans sauvegarde
                </Button>
                <Button 
                  size="sm"
                  onClick={accept}
                  className="text-sm"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Activer le confort
                </Button>
              </div>
            </div>

            {/* Note de transparence */}
            <div className="mt-4 pt-4 border-t">
              <p className="text-xs text-muted-foreground">
                <strong>Transparence totale :</strong> En mode "confort", nous sauvegardons uniquement vos préférences d'interface. 
                En mode "navigation sans sauvegarde", toutes les fonctionnalités restent disponibles pour la session en cours, 
                mais rien n'est mémorisé à la fermeture du navigateur.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}