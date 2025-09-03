import { content } from '@/lib/content-loader';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowRight, Brain, Shield, Zap, BookOpen, Target, ExternalLink, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  // Get latest workflows (first 3 for now since we just created them)
  const latestWorkflows = content.workflows.slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section - Personal Introduction */}
      <section className="text-center py-16 max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold mb-6">Bienvenue sur Prompt Santé</h1>
        <div className="prose prose-lg mx-auto text-muted-foreground">
          <p>
            Bonjour ! Je suis un étudiant en pharmacie, comme vous peut-être. En tant qu'étudiant, 
            j'ai passé du temps à explorer l'IA pour mes études et je partage ici mes méthodes, 
            mes découvertes et mes doutes.
          </p>
          <p className="font-medium text-foreground">
            Ce site est le carnet de bord de mon exploration, structuré pour vous faire gagner du temps.
          </p>
        </div>
      </section>

      {/* Disclaimers Section */}
      <section className="max-w-4xl mx-auto mb-16">
        <div className="grid md:grid-cols-3 gap-4">
          <Alert>
            <Zap className="size-4" />
            <AlertDescription>
              <strong>Performance :</strong> Les résultats présentés sont des exemples. 
              Le paysage de l'IA évolue constamment. Expérimentez pour trouver votre solution optimale.
            </AlertDescription>
          </Alert>
          
          <Alert>
            <AlertTriangle className="size-4" />
            <AlertDescription>
              <strong>Fiabilité :</strong> Une IA peut commettre des erreurs ou "halluciner". 
              Vérifiez toujours les informations avec des sources fiables.
            </AlertDescription>
          </Alert>
          
          <Alert>
            <Shield className="size-4" />
            <AlertDescription>
              <strong>Confidentialité :</strong> Si vous ne l'écririez pas sur une carte postale, 
              ne le mettez pas dans un prompt.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="max-w-6xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Accès Rapides</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* Pour les nouveaux visiteurs */}
          <Card className="border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="size-5" />
                <span>Nouveau ici ?</span>
              </CardTitle>
              <CardDescription>
                Découvrez l'essentiel pour bien commencer avec l'IA
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/par-ou-commencer">
                <Button className="w-full">
                  Par où commencer ?
                  <ArrowRight className="size-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* L'Arsenal IA */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ExternalLink className="size-5" />
                <span>L'Arsenal IA 2025</span>
              </CardTitle>
              <CardDescription>
                Comparaison des outils avec mon retour d'expérience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/l-arsenal-ia">
                <Button variant="outline" className="w-full">
                  Voir les outils
                  <ArrowRight className="size-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Workflows */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="size-5" />
                <span>Tous les Workflows</span>
              </CardTitle>
              <CardDescription>
                Méthodes complètes pour vos cas d'usage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/workflows">
                <Button variant="outline" className="w-full">
                  Explorer les workflows
                  <ArrowRight className="size-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Latest Workflows */}
      <section className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Derniers Workflows Publiés</h2>
          <Link href="/workflows">
            <Button variant="ghost">
              Voir tous
              <ArrowRight className="size-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {latestWorkflows.map((workflow) => (
            <Card key={workflow.slug} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Badge variant="secondary">{workflow.difficulty}</Badge>
                  <span className="text-sm text-muted-foreground">{workflow.estimatedTime}</span>
                </div>
                <CardTitle className="text-lg">{workflow.title}</CardTitle>
                <CardDescription>{workflow.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {workflow.tags.slice(0, 2).map((tag: string) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Link href={`/workflows/${workflow.slug}`}>
                    <Button size="sm">
                      Lire
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Personal Note */}
      <section className="max-w-3xl mx-auto mt-16 text-center">
        <div className="bg-muted p-8 rounded-lg">
          <Brain className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold mb-4">Mon Approche</h3>
          <p className="text-muted-foreground">
            Je ne prétends pas détenir de vérité absolue. Les recommandations et analyses 
            sont basées sur mon expérience personnelle et mes recherches. 
            <strong className="text-foreground"> Je vous encourage systématiquement à tester par vous-même.</strong>
          </p>
        </div>
      </section>
    </div>
  );
}
