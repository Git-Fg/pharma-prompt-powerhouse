import { ArrowRight, BookOpen, ExternalLink, Star, Target } from 'lucide-react'
import Link from 'next/link'
import { Container, Section } from '@/components/layout/Container'
import { DisclaimerBanner } from '@/components/shared/DisclaimerBanner'
import { SectionBlock } from '@/components/shared/SectionBlock'
import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { StaggeredItem, StaggeredPage } from '@/components/ui/transitions'
import { content } from '@/lib/content-loader'

export default function HomePage() {
  // Get favorite workflows first, then fill with recent ones if needed (avoiding duplicates)
  const favoriteWorkflows = content.workflows.filter(w => w.isFavorite)
  const favoriteSlugs = new Set(favoriteWorkflows.map(w => w.slug))
  const recentNonFavorites = content.workflows.filter(w => !favoriteSlugs.has(w.slug)).slice(0, 3)
  const featuredWorkflows = favoriteWorkflows.length >= 3
    ? favoriteWorkflows.slice(0, 3)
    : [...favoriteWorkflows, ...recentNonFavorites].slice(0, 3)

  return (
    // Utilisation de StaggeredPage pour une animation d'entrée élégante
    <StaggeredPage className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">

      {/* 1. HERO SECTION CORRIGÉE : Contenue dans une Card pour un impact visuel fort */}
      <Section size="lg">
        <Container variant="detail">
          <StaggeredItem>
            <Card className="text-center shadow-lg bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="responsive-heading text-balance">
                  Bienvenue sur Pharma Prompt Powerhouse
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg mx-auto text-muted-foreground space-y-4 text-pretty">
                <p className="prose-intro">
                  Bonjour ! Je suis un étudiant en pharmacie, comme vous peut-être.
                </p>
                <p className="prose-intro">
                  J'ai passé du temps à explorer l'IA pour mes études et je partage ici mes méthodes, mes découvertes et mes doutes.
                </p>
                <p className="font-medium text-foreground prose-intro">
                  Ce site est le carnet de bord de mon exploration, structuré pour vous faire gagner du temps.
                </p>
              </CardContent>
            </Card>
          </StaggeredItem>
        </Container>
      </Section>

      {/* 2. DISCLAIMERS SECTION : Unifiée avec le composant DisclaimerBanner */}
      <Section size="md">
        <Container variant="collection">
          <StaggeredItem>
            <DisclaimerBanner variant="grid" />
          </StaggeredItem>
        </Container>
      </Section>

      {/* 3. QUICK ACCESS SECTION : Titre plus visible */}
      <Section size="md">
        <Container variant="collection">
          <StaggeredItem>
            <h2 className="responsive-subheading text-center mb-8">Accès Rapides</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-2 border-primary/50 shadow-primary/10">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="size-5" />
                    <span>Nouveau ici ?</span>
                  </CardTitle>
                  <CardDescription>Je vous accompagne pour découvrir l'essentiel de l'IA</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" asChild>
                    <Link href="/par-ou-commencer">
                      Par où commencer ?
                      <ArrowRight className="size-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="border-2 border-primary/50 shadow-primary/10">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <ExternalLink className="size-5" />
                    <span>L'Arsenal IA 2025</span>
                  </CardTitle>
                  <CardDescription>Mes tests personnels et retours d'expérience sur les outils</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" asChild>
                    <Link href="/l-arsenal-ia">
                      Voir les outils
                      <ArrowRight className="size-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="size-5" />
                    <span>Tous les Workflows</span>
                  </CardTitle>
                  <CardDescription>Mes méthodes testées pour vos cas d'usage</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/workflows">
                      Explorer les workflows
                      <ArrowRight className="size-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </StaggeredItem>
        </Container>
      </Section>

      <Separator className="my-8 container mx-auto" />

      {/* 4. FEATURED WORKFLOWS : Titre plus engageant et structure de carte améliorée */}
      <Section size="md">
        <Container variant="collection">
          <StaggeredItem>
            <div className="flex items-center justify-between mb-8">
              <h2 className="responsive-subheading">Workflows à la Une</h2>
              <Button variant="ghost" asChild>
                <Link href="/workflows">
                  Voir tous
                  <ArrowRight className="size-4 ml-2" />
                </Link>
              </Button>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredWorkflows.map(workflow => (
                <Card key={workflow.slug} className="hover:shadow-lg transition-shadow flex flex-col">
                  <CardHeader className="flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="capitalize">{workflow.difficulty}</Badge>
                      <span className="text-sm text-muted-foreground">{workflow.estimatedTime}</span>
                    </div>
                    {workflow.isFavorite && (
                      <Badge variant="default" className="bg-amber-500 text-white hover:bg-amber-600 mb-2">
                        <Star className="size-3 mr-1.5" />
                        {' '}
                        Recommandé
                      </Badge>
                    )}
                    <CardTitle className="text-lg">{workflow.title}</CardTitle>
                    <CardDescription className="line-clamp-3">{workflow.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {workflow.tags.slice(0, 3).map((tag: string) => (
                        <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                    <Button size="sm" variant="outline" className="w-full" asChild>
                      <Link href={`/workflows/${workflow.slug}`}>
                        Découvrir
                        <ArrowRight className="w-3 h-3 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </StaggeredItem>
        </Container>
      </Section>

      {/* 5. PERSONAL NOTE : Design unifié */}
      <Section size="sm">
        <Container variant="detail">
          <StaggeredItem>
            <SectionBlock
              type="key-points"
              title="Mon Approche"
              content="Je ne prétends pas détenir de vérité absolue. Les recommandations et analyses sont basées sur mon expérience personnelle et mes recherches. Je vous encourage systématiquement à tester par vous-même."
              variant="highlighted"
            />
          </StaggeredItem>
        </Container>
      </Section>
    </StaggeredPage>
  )
}
