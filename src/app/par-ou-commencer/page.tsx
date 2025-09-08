import { ArrowRight, BookOpen, Brain, Shield, Target, Zap } from 'lucide-react'
import Link from 'next/link'
import { ConceptGrid } from '@/components/shared/ConceptGrid'
import { GettingStartedLayout } from '@/components/shared/GettingStartedLayout'
import { StepCard } from '@/components/shared/StepCard'
import { WorkflowGrid } from '@/components/shared/WorkflowGrid'
import { Alert, AlertDescription } from '@/components/ui/alert'
import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'

export const metadata = {
  title: 'Par où commencer ? - Guide pour débuter avec l\'IA',
  description: 'Votre guide étape par étape pour découvrir l\'IA en pharmacie. Les concepts essentiels, votre premier workflow, et les règles de sécurité à retenir.',
}

export default function ParOuCommencerPage() {
  return (
    <GettingStartedLayout
      title="Par où commencer ?"
      description="Vous découvrez l'IA ? Parfait ! J'ai conçu ce parcours pour vous accompagner pas à pas dans votre apprentissage. Suivez ces étapes dans l'ordre."
      heroBadge="Guide pour débutants"
    >
      {/* Étape 1 - Concepts Clés */}
      <StepCard
        step={1}
        title="Les Concepts Clés"
        description="Avant de commencer, comprenons ensemble le vocabulaire essentiel."
        icon={<Brain className="size-5" />}
        variant="concept"
      >
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            J'ai sélectionné les 3 concepts les plus importants à maîtriser avant tout :
          </p>

          <ConceptGrid
            concepts={[
              {
                href: '/concepts/context-engineering',
                title: 'Context Engineering',
                description: 'Comment donner le bon contexte à l\'IA pour obtenir des réponses pertinentes.',
                icon: <Brain className="size-5" />,
              },
              {
                href: '/concepts/hallucination-effet-indesirable',
                title: 'Hallucinations',
                description: 'Pourquoi l\'IA peut parfois \'inventer\' des informations et comment s\'en protéger.',
                icon: <Brain className="size-5" />,
              },
              {
                href: '/concepts/structuration-par-balises',
                title: 'Structuration',
                description: 'Comment organiser ses prompts pour des résultats clairs et utilisables.',
                icon: <Brain className="size-5" />,
              },
            ]}
          />
        </div>
      </StepCard>

      {/* Étape 2 - Premier Workflow */}
      <StepCard
        step={2}
        title="Votre Premier Workflow"
        description="Passons à la pratique avec un cas concret et facile."
        icon={<Target className="size-5" />}
        variant="guide"
      >
        <div>
          <p className="text-sm text-muted-foreground mb-4">
            Je recommande de commencer par la création de fiches de révision. C'est simple, utile,
            et ça vous permet d'appliquer tous les concepts essentiels.
          </p>

          <Link href="/workflows/creer-fiches-de-revision">
            <Button className="w-full md:w-auto">
              <BookOpen className="size-4 mr-2" />
              Commencer avec les Fiches de Révision
              <ArrowRight className="size-4 ml-2" />
            </Button>
          </Link>
        </div>
      </StepCard>

      {/* Étape 3 - Sécurité */}
      <StepCard
        step={3}
        title="La Règle d'Or de la Sécurité"
        description="CRUCIAL : ce que vous ne devez JAMAIS faire avec l'IA."
        icon={<Shield className="size-5" />}
        variant="security"
      >
        <div className="space-y-4">
          <Alert variant="destructive">
            <Shield className="size-4" />
            <AlertDescription className="font-semibold">
              Si vous ne l'écririez pas sur une carte postale, ne le mettez pas dans un prompt.
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
              <div>
                <p className="font-semibold text-red-600">Jamais de données personnelles</p>
                <p className="text-sm text-muted-foreground">Nom, adresse, numéro de sécurité sociale...</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
              <div>
                <p className="font-semibold text-red-600">Jamais d'informations patients</p>
                <p className="text-sm text-muted-foreground">Même anonymisées, c'est un risque inutile</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
              <div>
                <p className="font-semibold text-red-600">Toujours vérifier les informations médicales</p>
                <p className="text-sm text-muted-foreground">L'IA peut se tromper, surtout sur les dosages et interactions</p>
              </div>
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm">
              <strong>Ma règle personnelle :</strong>
              {' '}
              J'utilise exclusivement des cas fictifs
              et je vérifie systématiquement toute information médicale avec mes cours
              ou des sources officielles.
            </p>
          </div>
        </div>
      </StepCard>

      {/* Étape 4 - Et après ? */}
      <StepCard
        step={4}
        title="Et après ?"
        description="Une fois ces bases maîtrisées, le monde des workflows s'ouvre à vous !"
        icon={<Zap className="size-5" />}
        variant="advanced"
      >
        <div>
          <p className="text-sm text-muted-foreground mb-4">
            Quand vous serez à l'aise avec votre premier workflow, explorez les autres selon vos besoins :
          </p>

          <WorkflowGrid
            workflows={[
              {
                href: '/workflows/resoudre-cas-clinique',
                title: 'Cas Cliniques',
                description: 'Pour l\'analyse méthodique de situations complexes',
                badge: <Badge variant="secondary">Avancé</Badge>,
              },
              {
                href: '/workflows/faire-recherche-bibliographique',
                title: 'Recherche Biblio',
                description: 'Pour structurer vos recherches académiques',
                badge: <Badge variant="secondary">Intermédiaire</Badge>,
              },
            ]}
          />

          <div className="mt-6 pt-4 border-t">
            <Link href="/workflows">
              <Button variant="outline" className="w-full md:w-auto">
                Voir tous les workflows
                <ArrowRight className="size-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </StepCard>
    </GettingStartedLayout>
  )
}
