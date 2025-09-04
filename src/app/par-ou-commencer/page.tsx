import { ArrowRight, BookOpen, Brain, Shield, Target, Zap } from 'lucide-react'
import Link from 'next/link'
import { Container, Section } from '@/components/layout/Container'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata = {
  title: 'Par où commencer ? - Guide pour débuter avec l\'IA',
  description: 'Votre guide étape par étape pour découvrir l\'IA en pharmacie. Les concepts essentiels, votre premier workflow, et les règles de sécurité à retenir.',
}

export default function ParOuCommencerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <Section size="lg">
        <Container maxWidth="4xl">
          <div className="text-center space-y-4">
            <Badge variant="outline" className="mb-4">
              Guide pour débutants
            </Badge>
            <h1 className="text-2xl md:text-4xl font-bold leading-tight">Par où commencer ?</h1>
            <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Vous découvrez l'IA ? Parfait ! J'ai conçu ce parcours pour vous accompagner
              pas à pas dans votre apprentissage. Suivez ces étapes dans l'ordre.
            </p>
          </div>
        </Container>
      </Section>

      {/* Étapes du parcours */}
      <Section>
        <Container maxWidth="4xl">
          <div className="space-y-8">
            {/* Étape 1 */}
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="size-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="size-5" />
                    <span>Les Concepts Clés</span>
                  </CardTitle>
                </div>
                <CardDescription>
                  Avant de commencer, comprenons ensemble le vocabulaire essentiel.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  J'ai sélectionné les 3 concepts les plus importants à maîtriser avant tout :
                </p>

                <div className="grid md:grid-cols-3 gap-4">
                  <Link href="/concepts/context-engineering" className="block">
                    <div className="p-4 border rounded-lg hover:bg-accent transition-colors">
                      <h4 className="font-semibold mb-2">Context Engineering</h4>
                      <p className="text-sm text-muted-foreground">
                        Comment donner le bon contexte à l'IA pour obtenir des réponses pertinentes.
                      </p>
                    </div>
                  </Link>

                  <Link href="/concepts/hallucination-effet-indesirable" className="block">
                    <div className="p-4 border rounded-lg hover:bg-accent transition-colors">
                      <h4 className="font-semibold mb-2">Hallucinations</h4>
                      <p className="text-sm text-muted-foreground">
                        Pourquoi l'IA peut parfois "inventer" des informations et comment s'en protéger.
                      </p>
                    </div>
                  </Link>

                  <Link href="/concepts/structuration-par-balises" className="block">
                    <div className="p-4 border rounded-lg hover:bg-accent transition-colors">
                      <h4 className="font-semibold mb-2">Structuration</h4>
                      <p className="text-sm text-muted-foreground">
                        Comment organiser ses prompts pour des résultats clairs et utilisables.
                      </p>
                    </div>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Étape 2 */}
            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="size-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="size-5" />
                    <span>Votre Premier Workflow</span>
                  </CardTitle>
                </div>
                <CardDescription>
                  Passons à la pratique avec un cas concret et facile.
                </CardDescription>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>

            {/* Étape 3 */}
            <Card className="border-l-4 border-l-red-500">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="size-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="size-5" />
                    <span>La Règle d'Or de la Sécurité</span>
                  </CardTitle>
                </div>
                <CardDescription>
                  CRUCIAL : ce que vous ne devez JAMAIS faire avec l'IA.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
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
              </CardContent>
            </Card>

            {/* Étape suivante */}
            <Card className="border-l-4 border-l-purple-500">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="size-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    4
                  </div>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="size-5" />
                    <span>Et après ?</span>
                  </CardTitle>
                </div>
                <CardDescription>
                  Une fois ces bases maîtrisées, le monde des workflows s'ouvre à vous !
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Quand vous serez à l'aise avec votre premier workflow, explorez les autres selon vos besoins :
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <Link href="/workflows/resoudre-cas-clinique" className="block">
                    <div className="p-4 border rounded-lg hover:bg-accent transition-colors">
                      <h4 className="font-semibold mb-2">Cas Cliniques</h4>
                      <p className="text-sm text-muted-foreground">
                        Pour l'analyse méthodique de situations complexes
                      </p>
                      <Badge variant="secondary" className="mt-2">Avancé</Badge>
                    </div>
                  </Link>

                  <Link href="/workflows/faire-recherche-bibliographique" className="block">
                    <div className="p-4 border rounded-lg hover:bg-accent transition-colors">
                      <h4 className="font-semibold mb-2">Recherche Biblio</h4>
                      <p className="text-sm text-muted-foreground">
                        Pour structurer vos recherches académiques
                      </p>
                      <Badge variant="secondary" className="mt-2">Intermédiaire</Badge>
                    </div>
                  </Link>
                </div>

                <div className="mt-6 pt-4 border-t">
                  <Link href="/workflows">
                    <Button variant="outline" className="w-full md:w-auto">
                      Voir tous les workflows
                      <ArrowRight className="size-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Call to action */}
      <Section>
        <Container maxWidth="4xl">
          <div className="text-center">
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Prêt à commencer ?</h3>
              <p className="text-muted-foreground mb-4">
                Commencez par comprendre les concepts clés, puis lancez-vous dans votre premier workflow.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Link href="/concepts">
                  <Button variant="outline">
                    <Brain className="size-4 mr-2" />
                    Les Concepts
                  </Button>
                </Link>
                <Link href="/workflows/creer-fiches-de-revision">
                  <Button>
                    <BookOpen className="size-4 mr-2" />
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
