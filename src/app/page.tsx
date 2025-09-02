import Link from "next/link";
import { content } from '@/lib/content-loader';
import { getRandomConceptTip } from "@/lib/tips-utils";
import { Button } from "@/components/ui/button";
import { FeaturedTools } from "@/components/shared/FeaturedTools";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Sparkles,
  Brain,
  BookOpen,
  Settings,
  Code,
  GitBranch,
  Network,
  Lightbulb,
  Workflow,
  FileText,
  Target,
  CheckCircle,
  Zap,
} from "lucide-react";
import { getIcon } from "@/types/icon-taxonomy";

// Concepts fondamentaux à mettre en avant sur la page d'accueil
const featuredConcepts = [
  {
    slug: "prompt-prescription",
    title: "Prompt = Prescription",
    description:
      "La méthode de base pour structurer chaque prompt comme une ordonnance claire et précise.",
    icon: BookOpen,
  },
  {
    slug: "context-engineering",
    title: "Context Engineering",
    description:
      "Apprenez à optimiser la 'mémoire' de l'IA pour des réponses plus pertinentes.",
    icon: Network,
  },
  {
    slug: "xml-prompting",
    title: "XML Prompting",
    description:
      "Utilisez des balises pour guider l'IA et obtenir des sorties parfaitement structurées.",
    icon: Code,
  },
  {
    slug: "tree-of-thought",
    title: "Tree of Thought",
    description:
      "Explorez plusieurs hypothèses pour résoudre des cas cliniques complexes.",
    icon: GitBranch,
  },
];

// Identify featured workflows
const featuredWorkflows = content.guides
  .filter(guide => 
    guide.title.toLowerCase().includes('workflow') ||
    guide.title.toLowerCase().includes('étapes') ||
    guide.description.toLowerCase().includes('workflow') ||
    guide.description.toLowerCase().includes('étape par étape') ||
    guide.tags?.some(tag => ['workflow', 'processus', 'methodologie'].includes(tag.toLowerCase() || ''))
  )
  .slice(0, 3);

export default function HomePage() {
  const dailyTip = getRandomConceptTip(content.concepts);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Section 1 : Le Héros - L'Accroche Principale */}
      <section className="container mx-auto px-4 py-16 md:py-24 text-center">
        <Badge variant="secondary" className="mb-4">
          <Sparkles className="w-4 h-4 mr-2" />
          Une approche pédagogique pour 2025
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Pharma Prompt Powerhouse
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
          Fini de jongler entre des guides théoriques et des listes de prompts.
          Ici, chaque concept clé est un <strong>dossier complet</strong> qui
          relie la théorie, la pratique et les outils.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="group" asChild>
            <Link href="/concepts">
              Commencer par un Concept
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/guides">Voir tous les guides</Link>
          </Button>
        </div>
      </section>

      {/* Section 1.5 : Le Conseil du Jour */}
      {dailyTip && (
        <section className="container mx-auto px-4 pb-16 -mt-8">
          <Card className="max-w-4xl mx-auto bg-primary/5 border-primary/20 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Lightbulb className="w-6 h-6 text-primary" />
                </div>
              <div>
                <CardTitle className="text-primary">Le conseil du jour</CardTitle>
                <CardDescription className="text-lg text-foreground/80 mt-2">
                  "{dailyTip.text}"
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
               <Button variant="link" asChild className="p-0 text-primary">
                  <Link href={dailyTip.source.slug}>
                    Explorer le concept : {dailyTip.source.title}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Section 2 : L'Approche - Comment ça marche ? */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Mon Approche : Simple et Efficace
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Une méthodologie structurée qui transforme l'IA en un outil de
            travail fiable pour nos études.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>1. Choisissez un Concept</CardTitle>
              <CardDescription>
                Parcourez le Hub de Concepts et choisissez le sujet que vous
                voulez maîtriser.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>2. Accédez au Dossier Complet</CardTitle>
              <CardDescription>
                Chaque page de concept centralise le guide principal, les
                prompts d'application et les ressources.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Settings className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>3. Mettez en Pratique</CardTitle>
              <CardDescription>
                Utilisez l'éditeur de prompts intégré pour tester et adapter les
                techniques apprises.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Section 2.5 : Core Kit Étudiant - Outils Essentiels Gratuits */}
      <section className="container mx-auto px-4 py-16 bg-gradient-to-r from-muted/20 to-background">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Le Core Kit Étudiant 2025
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Découvrez les outils IA gratuits qui changent la donne. 95% des capacités 
            de pointe sans sortir la carte bancaire.
          </p>
        </div>
        <FeaturedTools />
      </section>

      {/* NOUVELLE Section : Hub d'Objectifs */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Que voulez-vous accomplir aujourd'hui ?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choisissez un objectif et accédez directement à un prompt optimisé, des exemples et des guides pour aller plus loin.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {content.objectifs.map((objectif) => {
            const Icon = getIcon(objectif.icon);
            return (
              <Card key={objectif.slug} className="flex flex-col hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>{objectif.title}</CardTitle>
                  <CardDescription className="flex-grow">
                    {objectif.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/objectifs/${objectif.slug}`}>
                      Explorer l'objectif
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Section 3.5 : Workflows En Vedette - NOUVEAU */}
      {featuredWorkflows.length > 0 && (
        <section className="container mx-auto px-4 py-16 bg-gradient-to-r from-muted/30 to-background">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Workflow className="w-4 h-4 mr-2" />
              Nouveauté 2025
            </div>
            <h2 className="text-3xl font-bold mb-4">
              Workflows Étape par Étape
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Des processus complets qui vous guident de A à Z dans l'application pratique 
              des concepts. Parfaits pour mettre en pratique votre apprentissage.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {featuredWorkflows.map((workflow) => (
              <Card key={workflow.slug} className="flex flex-col hover:shadow-lg transition-all duration-200">
                <CardHeader className="flex-grow">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                    <Workflow className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="line-clamp-2">{workflow.title}</CardTitle>
                  <CardDescription className="line-clamp-3 text-sm">
                    {workflow.description}
                  </CardDescription>
                  {workflow.estimatedTime && (
                    <Badge variant="secondary" className="self-start mt-2">
                      {workflow.estimatedTime}
                    </Badge>
                  )}
                </CardHeader>
                <CardContent className="pt-0">
                  <Button asChild className="w-full">
                    <Link href={`/guides/${workflow.slug}`}>
                      Suivre ce workflow
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg">
              <Link href="/workflows">
                Voir tous les workflows
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </section>
      )}

      {/* Section 4 : Le CTA Final */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">
              Prêt à changer votre façon de réviser ?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Plongez dans le Hub de Concepts et découvrez une méthode de
              travail plus structurée et intuitive.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90 transition-colors group"
              asChild
            >
              <Link href="/concepts">
                Explorer tous les concepts
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
