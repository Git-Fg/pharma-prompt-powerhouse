'use client'

import { AlertTriangle, Shield, TrendingUp } from 'lucide-react'
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Card, CardContent } from '@/components/ui/card'

interface DisclaimerBannerProps {
  type?: 'workflow' | 'arsenal' | 'all'
  compact?: boolean
}

export function DisclaimerBanner({ type = 'all', compact = false }: DisclaimerBannerProps) {
  const disclaimers = [
    {
      id: 'performance',
      icon: TrendingUp,
      title: 'Performance et Évolution',
      content: 'Les résultats présentés ici sont des exemples. Le paysage de l\'IA évolue constamment et les performances des modèles peuvent changer. La seule façon de trouver la solution optimale pour *votre* besoin est d\'expérimenter et de comparer.',
      showFor: ['workflow', 'arsenal', 'all'],
    },
    {
      id: 'reliability',
      icon: AlertTriangle,
      title: 'Fiabilité du Contenu Généré',
      content: 'Une IA, même la plus avancée, peut commettre des erreurs, omettre des informations cruciales ou "halluciner". Dans le domaine de la santé, toute information générée par une IA doit être systématiquement vérifiée avec des sources fiables et validées. **N\'utilisez jamais une information non vérifiée pour une décision clinique ou académique importante.**',
      showFor: ['workflow', 'arsenal', 'all'],
    },
    {
      id: 'privacy',
      icon: Shield,
      title: 'Confidentialité et Sécurité',
      content: 'La règle d\'or : si vous ne l\'écririez pas sur une carte postale, ne le mettez pas dans un prompt. N\'utilisez **jamais** de données personnelles, identifiables ou de patient sur une plateforme en ligne. Je précise le niveau de risque perçu pour chaque outil, mais la prudence absolue reste votre meilleure protection.',
      showFor: ['workflow', 'arsenal', 'all'],
    },
  ]

  const relevantDisclaimers = disclaimers.filter(d => d.showFor.includes(type))

  if (compact) {
    return (
      <Card padding="sm" className="border-orange-200 bg-orange-50/50 dark:bg-orange-950/20 dark:border-orange-800/50">
        <CardContent>
          <div className="flex items-start gap-3">
            <AlertTriangle className="size-5 text-orange-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <h4 className="font-semibold text-orange-800 dark:text-orange-200">
                Avertissements Importants
              </h4>
              <p className="text-sm text-orange-700 dark:text-orange-300">
                Vérifiez toujours les informations générées par l'IA • Protégez vos données personnelles •
                Les performances des outils évoluent constamment
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {relevantDisclaimers.map((disclaimer) => {
        const IconComponent = disclaimer.icon
        return (
          <Alert key={disclaimer.id} className="border-orange-200 bg-orange-50 dark:bg-orange-950 dark:border-orange-800">
            <IconComponent className="size-4" />
            <AlertTitle className="text-orange-800 dark:text-orange-200">
              {disclaimer.title}
            </AlertTitle>
            <AlertDescription className="text-orange-700 dark:text-orange-300 mt-2">
              <MarkdownRenderer
                content={disclaimer.content}
                className="prose prose-sm dark:prose-invert prose-orange text-content-width"
              />
            </AlertDescription>
          </Alert>
        )
      })}
    </div>
  )
}
