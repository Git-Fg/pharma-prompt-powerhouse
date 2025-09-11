import { ArrowRight, BookOpen, Brain, Shield, Target, Zap } from 'lucide-react'
import Link from 'next/link'
import { Container, Section } from '@/components/layout/Container'
import { Alert, AlertDescription } from '@/components/ui/alert'
import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { contentCardVariants } from '@/components/ui/variants'
import { getConceptBySlug, getWorkflowBySlug } from '@/lib/content-loader'
import { gettingStartedConfig } from './config'
import { designTokens } from '@/design-system/tokens'

export const metadata = {
  title: 'Par où commencer ? - Guide pour débuter avec l\'IA',
  description: 'Votre guide étape par étape pour découvrir l\'IA en pharmacie. Les concepts essentiels, votre premier workflow, et les règles de sécurité à retenir.',
}

export default function ParOuCommencerPage() {
  // Récupération dynamique des données depuis le content-loader
  const essentialConcepts = gettingStartedConfig.essentialConcepts
    .map(slug => getConceptBySlug(slug))
    .filter((concept): concept is NonNullable<typeof concept> => Boolean(concept))

  const firstWorkflow = getWorkflowBySlug(gettingStartedConfig.firstWorkflow)

  const advancedWorkflows = gettingStartedConfig.advancedWorkflows
    .map(slug => getWorkflowBySlug(slug))
    .filter((workflow): workflow is NonNullable<typeof workflow> => Boolean(workflow))

  // Validation que toutes les données ont été trouvées
  if (essentialConcepts.length !== 3 || !firstWorkflow || advancedWorkflows.length !== 2) {
    throw new Error('Contenu manquant pour la page \'Par où commencer\'. Vérifiez les slugs dans config.ts.')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <Section size="lg">
        <Container variant="detail">
          <div className="flex flex-col items-center" style={{ gap: designTokens.spacing.lg }}>
            <Badge variant="outline" style={{ marginBottom: designTokens.spacing.lg }}>
              Guide pour débutants
            </Badge>
            <h1 className="prose-title prose-title-hero text-center">Par où commencer ?</h1>
            <p className="prose-description">
              Vous découvrez l'IA ? Parfait ! J'ai conçu ce parcours pour vous accompagner
              pas à pas dans votre apprentissage. Suivez ces étapes dans l'ordre.
            </p>
          </div>
        </Container>
      </Section>

      {/* Étapes du parcours */}
      <Section size="md">
        <Container variant="collection">
          <ol className="[counter-reset:step-counter]" style={{ gap: designTokens.spacing.xl3 }}>
            {/* Étape 1 */}
            <li className="[counter-increment:step-counter] relative">
              <Card className={contentCardVariants({ variant: 'concept' })}>
                <CardHeader>
                  <div className="flex items-center" style={{ gap: designTokens.spacing.sm }}>
                    <div className="size-8 bg-blue-500 text-white flex items-center justify-center font-bold [&::before]:content-[counter(step-counter)] [&::before]:absolute [&::before]:inset-0 [&::before]:flex [&::before]:items-center [&::before]:justify-center" style={{ 
                        borderRadius: designTokens.radius.full,
                        fontSize: designTokens.typography.fontSize.sm
                      }}>
                      <span className="sr-only">Étape 1</span>
                    </div>
                    <CardTitle className="flex items-center" style={{ gap: designTokens.spacing.sm }}>
                      <Brain className="size-5" />
                      <span>Les Concepts Clés</span>
                    </CardTitle>
                  </div>
                  <CardDescription>
                    Avant de commencer, comprenons ensemble le vocabulaire essentiel.
                  </CardDescription>
                </CardHeader>
                <CardContent style={{ gap: designTokens.spacing.lg }}>
                  <p className="text-muted-foreground" style={{ fontSize: designTokens.typography.fontSize.sm }}>
                    J'ai sélectionné les 3 concepts les plus importants à maîtriser avant tout :
                  </p>

                  <div className="grid md:grid-cols-3" style={{ gap: designTokens.spacing.md }}>
                    {essentialConcepts.map(concept => (
                      <Link key={concept.slug} href={`/concepts/${concept.slug}`} className="block">
                        <div className="border hover:bg-accent transition-colors" style={{ 
                              padding: designTokens.spacing.md,
                              borderRadius: designTokens.radius.lg 
                            }}>
                          <h4 className="font-semibold" style={{ marginBottom: designTokens.spacing.sm }}>{concept.title}</h4>
                          <p className="text-muted-foreground" style={{ fontSize: designTokens.typography.fontSize.sm }}>
                            {concept.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </li>

            {/* Étape 2 */}
            <li className="[counter-increment:step-counter] relative">
              <Card className={contentCardVariants({ variant: 'guide' })}>
                <CardHeader>
                  <div className="flex items-center" style={{ gap: designTokens.spacing.sm }}>
                    <div className="size-8 bg-green-500 text-white flex items-center justify-center font-bold [&::before]:content-[counter(step-counter)] [&::before]:absolute [&::before]:inset-0 [&::before]:flex [&::before]:items-center [&::before]:justify-center" style={{ 
                          borderRadius: designTokens.radius.full,
                          fontSize: designTokens.typography.fontSize.sm
                        }}>
                      <span className="sr-only">Étape 2</span>
                    </div>
                    <CardTitle className="flex items-center" style={{ gap: designTokens.spacing.sm }}>
                      <Target className="size-5" />
                      <span>Votre Premier Workflow</span>
                    </CardTitle>
                  </div>
                  <CardDescription>
                    Passons à la pratique avec un cas concret et facile.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground" style={{ 
                          fontSize: designTokens.typography.fontSize.sm,
                          marginBottom: designTokens.spacing.lg
                        }}>
                    Je recommande de commencer par la création de fiches de révision. C'est simple, utile,
                    et ça vous permet d'appliquer tous les concepts essentiels.
                  </p>

                  <Link href={`/workflows/${firstWorkflow.slug}`}>
                    <Button className="w-full md:w-auto">
                      <BookOpen className="size-4" style={{ marginRight: designTokens.spacing.sm }} />
                      Commencer avec "
                      {firstWorkflow.title}
                      "
                      <ArrowRight className="size-4" style={{ marginLeft: designTokens.spacing.sm }} />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </li>

            {/* Étape 3 */}
            <li className="[counter-increment:step-counter] relative">
              <Card className={contentCardVariants({ variant: 'security' })}>
                <CardHeader>
                  <div className="flex items-center" style={{ gap: designTokens.spacing.sm }}>
                    <div className="size-8 bg-red-500 text-white flex items-center justify-center font-bold [&::before]:content-[counter(step-counter)] [&::before]:absolute [&::before]:inset-0 [&::before]:flex [&::before]:items-center [&::before]:justify-center" style={{ 
                          borderRadius: designTokens.radius.full,
                          fontSize: designTokens.typography.fontSize.sm
                        }}>
                      <span className="sr-only">Étape 3</span>
                    </div>
                    <CardTitle className="flex items-center" style={{ gap: designTokens.spacing.sm }}>
                      <Shield className="size-5" />
                      <span>La Règle d'Or de la Sécurité</span>
                    </CardTitle>
                  </div>
                  <CardDescription>
                    CRUCIAL : ce que vous ne devez JAMAIS faire avec l'IA.
                  </CardDescription>
                </CardHeader>
                <CardContent style={{ gap: designTokens.spacing.lg }}>
                  <Alert variant="destructive">
                    <Shield className="size-4" />
                    <AlertDescription className="font-semibold">
                      Si vous ne l'écririez pas sur une carte postale, ne le mettez pas dans un prompt.
                    </AlertDescription>
                  </Alert>

                  <div style={{ gap: designTokens.spacing.md }}>
                    <div className="flex items-start" style={{ gap: designTokens.spacing.md }}>
                      <div className="w-2 h-2 bg-red-500 mt-2" style={{ borderRadius: designTokens.radius.full }}></div>
                      <div>
                        <p className="font-semibold text-red-600">Jamais de données personnelles</p>
                        <p className="text-muted-foreground" style={{ fontSize: designTokens.typography.fontSize.sm }}>Nom, adresse, numéro de sécurité sociale...</p>
                      </div>
                    </div>

                    <div className="flex items-start" style={{ gap: designTokens.spacing.md }}>
                      <div className="w-2 h-2 bg-red-500 mt-2" style={{ borderRadius: designTokens.radius.full }}></div>
                      <div>
                        <p className="font-semibold text-red-600">Jamais d'informations patients</p>
                        <p className="text-muted-foreground" style={{ fontSize: designTokens.typography.fontSize.sm }}>Même anonymisées, c'est un risque inutile</p>
                      </div>
                    </div>

                    <div className="flex items-start" style={{ gap: designTokens.spacing.md }}>
                      <div className="w-2 h-2 bg-red-500 mt-2" style={{ borderRadius: designTokens.radius.full }}></div>
                      <div>
                        <p className="font-semibold text-red-600">Toujours vérifier les informations médicales</p>
                        <p className="text-muted-foreground" style={{ fontSize: designTokens.typography.fontSize.sm }}>L'IA peut se tromper, surtout sur les dosages et interactions</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted" style={{ 
                        padding: designTokens.spacing.md,
                        borderRadius: designTokens.radius.lg 
                      }}>
                    <p style={{ fontSize: designTokens.typography.fontSize.sm }}>
                      <strong>Ma règle personnelle :</strong>
                      {' '}
                      J'utilise exclusivement des cas fictifs
                      et je vérifie systématiquement toute information médicale avec mes cours
                      ou des sources officielles.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </li>

            {/* Étape suivante */}
            <li className="[counter-increment:step-counter] relative">
              <Card className={contentCardVariants({ variant: 'advanced' })}>
                <CardHeader>
                  <div className="flex items-center" style={{ gap: designTokens.spacing.sm }}>
                    <div className="size-8 bg-purple-500 text-white flex items-center justify-center font-bold [&::before]:content-[counter(step-counter)] [&::before]:absolute [&::before]:inset-0 [&::before]:flex [&::before]:items-center [&::before]:justify-center" style={{ 
                          borderRadius: designTokens.radius.full,
                          fontSize: designTokens.typography.fontSize.sm
                        }}>
                      <span className="sr-only">Étape 4</span>
                    </div>
                    <CardTitle className="flex items-center" style={{ gap: designTokens.spacing.sm }}>
                      <Zap className="size-5" />
                      <span>Et après ?</span>
                    </CardTitle>
                  </div>
                  <CardDescription>
                    Une fois ces bases maîtrisées, le monde des workflows s'ouvre à vous !
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground" style={{ 
                          fontSize: designTokens.typography.fontSize.sm,
                          marginBottom: designTokens.spacing.lg
                        }}>
                    Quand vous serez à l'aise avec votre premier workflow, explorez les autres selon vos besoins :
                  </p>

                  <div className="grid md:grid-cols-2" style={{ gap: designTokens.spacing.md }}>
                    {advancedWorkflows.map(workflow => (
                      <Link key={workflow.slug} href={`/workflows/${workflow.slug}`} className="block">
                        <div className="border hover:bg-accent transition-colors" style={{ 
                              padding: designTokens.spacing.md,
                              borderRadius: designTokens.radius.lg 
                            }}>
                          <h4 className="font-semibold mb-2">{workflow.title}</h4>
                          <p className="text-muted-foreground" style={{ fontSize: designTokens.typography.fontSize.sm }}>
                            {workflow.description}
                          </p>
                          <Badge variant="secondary" className="capitalize" style={{ marginTop: designTokens.spacing.sm }}>{workflow.difficulty}</Badge>
                        </div>
                      </Link>
                    ))}
                  </div>

                  <div className="border-t" style={{ 
                        marginTop: designTokens.spacing.xl3,
                        paddingTop: designTokens.spacing.lg
                      }}>
                    <Link href="/workflows">
                      <Button variant="outline" className="w-full md:w-auto">
                        Voir tous les workflows
                        <ArrowRight className="size-4" style={{ marginLeft: designTokens.spacing.sm }} />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </li>
          </ol>
        </Container>
      </Section>

      {/* Call to action */}
      <Section size="sm">
        <Container variant="collection">
          <div className="text-center">
            <div className="bg-muted" style={{ 
                      padding: designTokens.spacing.xl3,
                      borderRadius: designTokens.radius.lg 
                    }}>
              <h3 className="font-semibold" style={{ 
                          fontSize: designTokens.typography.fontSize.lg,
                          marginBottom: designTokens.spacing.sm
                        }}>Prêt à commencer ?</h3>
              <p className="prose-personal-note" style={{ marginBottom: designTokens.spacing.lg }}>
                Commencez par comprendre les concepts clés, puis lancez-vous dans votre premier workflow.
              </p>
              <div className="flex flex-col sm:flex-row justify-center" style={{ gap: designTokens.spacing.sm }}>
                <Link href="/concepts">
                  <Button variant="outline">
                    <Brain className="size-4" style={{ marginRight: designTokens.spacing.sm }} />
                    Les Concepts
                  </Button>
                </Link>
                <Link href={`/workflows/${firstWorkflow.slug}`}>
                  <Button>
                    <BookOpen className="size-4" style={{ marginRight: designTokens.spacing.sm }} />
                    Mon Premier Workflow
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
