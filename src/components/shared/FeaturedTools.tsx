// src/components/shared/FeaturedTools.tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Zap, Shield } from 'lucide-react';
import Link from 'next/link';

export function FeaturedTools() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
      <Card className="relative overflow-hidden border-l-4 border-l-purple-500 bg-gradient-to-br from-purple-50/50 to-white dark:from-purple-950/20 dark:to-background">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl flex items-center gap-2">
              <Star className="size-5 text-purple-600" />
              Z.AI - Recherche Excellence
            </CardTitle>
            <Badge variant="default" className="bg-purple-100 text-purple-700 hover:bg-purple-200">
              🆓 Gratuit
            </Badge>
          </div>
          <CardDescription className="text-sm">
            Notre choix N°1 pour la recherche web fiable
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            GLM-4.5 avec raisonnement transparent et appels d'outils avancés. 
            Surpasse Perplexity pour la recherche planifiée et sourcée.
          </p>
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              <Badge variant="outline" className="text-xs">Recherche</Badge>
              <Badge variant="outline" className="text-xs">Présentations</Badge>
              <Badge variant="outline" className="text-xs">Créativité</Badge>
            </div>
            <Link 
              href="/outils-externes/z-ai"
              className="text-sm text-purple-600 hover:text-purple-800 font-medium"
            >
              Découvrir →
            </Link>
          </div>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden border-l-4 border-l-blue-500 bg-gradient-to-br from-blue-50/50 to-white dark:from-blue-950/20 dark:to-background">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl flex items-center gap-2">
              <Zap className="size-5 text-blue-600" />
              AI Studio - Analyse Pro
            </CardTitle>
            <Badge variant="default" className="bg-blue-100 text-blue-700 hover:bg-blue-200">
              🆓 Sans CB
            </Badge>
          </div>
          <CardDescription className="text-sm">
            Inégalé pour l'analyse d'images et documents manuscrits
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Gemini 2.5 Pro avec contexte 1M tokens. Écosystème multimodal complet : 
            images, vidéo, audio, applications web.
          </p>
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              <Badge variant="outline" className="text-xs">Multimodal</Badge>
              <Badge variant="outline" className="text-xs">OCR</Badge>
              <Badge variant="outline" className="text-xs">Analyse</Badge>
            </div>
            <Link 
              href="/outils-externes/google-ai-studio"
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Découvrir →
            </Link>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2 border border-dashed border-green-300 bg-gradient-to-r from-green-50/50 via-blue-50/30 to-purple-50/30 dark:from-green-950/20 dark:via-blue-950/10 dark:to-purple-950/20">
        <CardHeader className="text-center pb-3">
          <CardTitle className="text-lg flex items-center justify-center gap-2">
            <Shield className="size-5 text-green-600" />
            Le Core Kit Étudiant 2025
          </CardTitle>
          <CardDescription>
            Z.AI + AI Studio = 95% des capacités IA de pointe sans débourser un euro
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-muted-foreground mb-4">
            <strong>Workflow éprouvé :</strong> Recherche créative (Z.AI) → Analyse rigoureuse (AI Studio) → Validation croisée
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              href="/guides/le-core-kit-ia-gratuit-en-2025"
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white text-sm font-medium rounded-md hover:from-green-700 hover:to-blue-700 transition-all"
            >
              📘 Guide Complet du Core Kit
            </Link>
            <Link 
              href="/guides/confidentialite-securite"
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-all"
            >
              🔒 Sécurité & Confidentialité
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}