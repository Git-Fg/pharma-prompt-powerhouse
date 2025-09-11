import { AlertTriangle, ArrowRight, BookOpen, Brain, ExternalLink, Shield, Star, Target, Zap } from 'lucide-react'
import Link from 'next/link'
import { Container, Section } from '@/components/layout/Container'
import { Animate } from '@/components/ui/Animate'
import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { content } from '@/lib/content-loader'
import { designTokens } from '@/design-system/tokens'

export default function HomePage() {
  // Get favorite workflows first, then fill with recent ones if needed (avoiding duplicates)
  const favoriteWorkflows = content.workflows.filter(w => w.isFavorite)
  const favoriteSlugs = new Set(favoriteWorkflows.map(w => w.slug))
  const recentNonFavorites = content.workflows.filter(w => !favoriteSlugs.has(w.slug)).slice(0, 3)
  const featuredWorkflows = favoriteWorkflows.length >= 3
    ? favoriteWorkflows.slice(0, 3)
    : [...favoriteWorkflows, ...recentNonFavorites].slice(0, 3)

  return (
    // Utilisation de Animate pour une animation d'entrée élégante
    <Animate variant="fadeIn" className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">

      {/* 1. HERO SECTION CORRIGÉE : Contenue dans une Card pour un impact visuel fort */}
      <Section size="lg">
        <Container variant="detail">
          <Animate variant="slideUp" delay={100}>
            <Card className="text-center shadow-lg bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="responsive-heading text-balance">
                  Bienvenue sur Pharma Prompt Powerhouse
                </CardTitle>
              </CardHeader>
              <CardContent 
                className="prose prose-lg mx-auto text-muted-foreground text-pretty" 
                style={{ gap: designTokens.spacing.lg }}
              >
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
          </Animate>
        </Container>
      </Section>

      {/* 2. DISCLAIMERS SECTION : Unifiée avec des Cards pour la cohérence */}
      <Section size="md">
        <Container variant="collection">
          <Animate variant="slideUp" delay={200}>
            <div className="grid md:grid-cols-3" style={{ gap: designTokens.spacing.md }}>
              <Card className="flex items-start gap-3">
                <Zap className="size-5 flex-shrink-0 mt-1" style={{ color: designTokens.color.primary.DEFAULT }} />
                <div>
                  <h3 className="font-semibold mb-1">Performance</h3>
                  <p className="text-muted-foreground" style={{ fontSize: designTokens.typography.fontSize.sm }}>
                    Le paysage de l'IA évolue constamment. Expérimentez pour trouver votre solution optimale.
                  </p>
                </div>
              </Card>

              <Card className="flex items-start gap-3">
                <AlertTriangle className="size-5 text-amber-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Fiabilité</h3>
                  <p className="text-muted-foreground" style={{ fontSize: designTokens.typography.fontSize.sm }}>
                    Une IA peut "halluciner". Vérifiez toujours avec des sources fiables.
                  </p>
                </div>
              </Card>

              <Card className="flex items-start gap-3">
                <Shield className="size-5 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Confidentialité</h3>
                  <p className="text-muted-foreground" style={{ fontSize: designTokens.typography.fontSize.sm }}>
                    Si vous ne l'écririez pas sur une carte postale, ne le mettez pas dans un prompt.
                  </p>
                </div>
              </Card>
            </div>
          </Animate>
        </Container>
      </Section>

      {/* 3. QUICK ACCESS SECTION : Titre plus visible */}
      <Section size="md">
        <Container variant="collection">
          <Animate variant="slideUp" delay={300}>
            <h2 className="responsive-subheading text-center" style={{ marginBottom: designTokens.spacing.xl2 }}>Accès Rapides</h2>
            <div className="grid md:grid-cols-3" style={{ gap: designTokens.spacing.lg }}>
              <Card className="border-2 shadow-primary/10" style={{ borderColor: designTokens.color.primary.DEFAULT }}>
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
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <ExternalLink className="size-5" />
                    <span>L'Arsenal IA 2025</span>
                  </CardTitle>
                  <CardDescription>Mes tests personnels et retours d'expérience sur les outils</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" asChild>
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
          </Animate>
        </Container>
      </Section>

      <Separator className="container mx-auto" style={{ marginBlock: designTokens.spacing.xl2 }} />

      {/* 4. FEATURED WORKFLOWS : Titre plus engageant et structure de carte améliorée */}
      <Section size="md">
        <Container variant="collection">
          <Animate variant="slideUp" delay={400}>
            <div className="flex items-center justify-between" style={{ marginBottom: designTokens.spacing.xl2 }}>
              <h2 className="responsive-subheading">Workflows à la Une</h2>
              <Button variant="ghost" asChild>
                <Link href="/workflows">
                  Voir tous
                  <ArrowRight className="size-4 ml-2" />
                </Link>
              </Button>
            </div>
            <div className="grid md:grid-cols-3" style={{ gap: designTokens.spacing.lg }}>
              {featuredWorkflows.map(workflow => (
                <Card key={workflow.slug} className="hover:shadow-lg transition-shadow flex flex-col">
                  <CardHeader className="flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="capitalize">{workflow.difficulty}</Badge>
                      <span className="text-muted-foreground" style={{ fontSize: designTokens.typography.fontSize.sm }}>{workflow.estimatedTime}</span>
                    </div>
                    {workflow.isFavorite && (
                      <Badge variant="default" className="bg-amber-500 text-white hover:bg-amber-600 mb-2">
                        <Star className="size-3 mr-1.5" />
                        {' '}
                        Recommandé
                      </Badge>
                    )}
                    <CardTitle style={{ fontSize: designTokens.typography.fontSize.lg }}>{workflow.title}</CardTitle>
                    <CardDescription className="line-clamp-3">{workflow.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {workflow.tags.slice(0, 3).map((tag: string) => (
                        <Badge key={tag} variant="outline" style={{ fontSize: designTokens.typography.fontSize.xs }}>{tag}</Badge>
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
          </Animate>
        </Container>
      </Section>

      <Separator className="container mx-auto" style={{ marginBlock: designTokens.spacing.xl2 }} />

      {/* 5. PERSONAL NOTE : Design unifié */}
      <Section size="sm">
        <Container variant="detail">
          <Animate variant="slideUp" delay={500}>
            <Card className="bg-muted/50 border-dashed text-center">
              <Brain className="w-12 h-12 mx-auto mb-4" style={{ color: designTokens.color.primary.DEFAULT }} />
              <h3 className="font-semibold mb-4" style={{ fontSize: designTokens.typography.fontSize.lg }}>Mon Approche</h3>
              <p className="prose-personal-note container mx-auto">
                Je ne prétends pas détenir de vérité absolue. Les recommandations et analyses sont basées sur mon expérience personnelle et mes recherches.
                <strong className="text-foreground font-semibold"> Je vous encourage systématiquement à tester par vous-même.</strong>
              </p>
            </Card>
          </Animate>
        </Container>
      </Section>
    </Animate>
  )
}
