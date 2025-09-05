'use client'

import { Book, Home, RefreshCw, WifiOff, Workflow } from 'lucide-react'
import Link from 'next/link'
import Button from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      <div className="container-constrained w-full space-y-6">
        <div className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 bg-muted rounded-full flex items-center justify-center">
            <WifiOff className="h-10 w-10 text-muted-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Mode hors ligne</h1>
            <p className="text-muted-foreground mt-2">
              Vous n'êtes pas connecté à Internet. Certains contenus restent disponibles.
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Contenu disponible hors ligne</CardTitle>
            <CardDescription>
              Ces sections peuvent être consultées sans connexion Internet
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Accueil
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/workflows">
                <Workflow className="h-4 w-4 mr-2" />
                Workflows (en cache)
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/guides">
                <Book className="h-4 w-4 mr-2" />
                Guides (en cache)
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <Button
              variant="default"
              className="w-full"
              onClick={() => window.location.reload()}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Réessayer la connexion
            </Button>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          <p>
            Cette page s'affiche automatiquement quand vous n'avez pas de connexion Internet.
            <br />
            Reconnectez-vous pour accéder à tout le contenu.
          </p>
        </div>
      </div>
    </div>
  )
}
