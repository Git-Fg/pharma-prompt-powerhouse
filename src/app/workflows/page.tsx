import Link from "next/link";
import { allGuides } from "content-collections";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search, Workflow, Clock, Target, BookOpen } from "lucide-react";
import { getIcon } from "@/types/icon-taxonomy";
import type { Metadata } from "next";

const categoryLabels = {
  prompting: "Prompting 🎯",
  methodology: "Méthodologie 🔬",
  tools: "Outils 🛠️",
  security: "Sécurité 🔒",
  optimization: "Optimisation ⚡",
  fondamentaux: "Fondamentaux 📚",
  methodologie: "Méthodologie 🔬",
  ressources: "Ressources 📖",
  "techniques-avancees": "Techniques Avancées 🚀",
  "cas-pratiques": "Cas Pratiques 💊",
};

const difficultyLabels = {
  débutant: "Débutant",
  intermédiaire: "Intermédiaire", 
  avancé: "Avancé",
};

// Identify workflow guides based on title keywords
const workflowGuides = allGuides.filter(guide => 
  guide.title.toLowerCase().includes('workflow') ||
  guide.title.toLowerCase().includes('étapes') ||
  guide.title.toLowerCase().includes('processus') ||
  guide.description.toLowerCase().includes('workflow') ||
  guide.description.toLowerCase().includes('étape par étape') ||
  guide.description.toLowerCase().includes('méthode complète') ||
  guide.tags?.some(tag => ['workflow', 'processus', 'methodologie', 'cas-pratiques'].includes(tag.name?.toLowerCase() || ''))
);

export const metadata: Metadata = {
  title: "Workflows Pharmaceutiques - Pharma Prompt Powerhouse",
  description: "Découvrez nos workflows complets étape par étape pour maîtriser l'ingénierie de prompts appliquée aux sciences pharmaceutiques.",
  keywords: [
    "workflow",
    "pharmacie",
    "prompt engineering",
    "processus",
    "méthodologie",
    "étape par étape",
    "cas pratiques"
  ],
  openGraph: {
    title: "Workflows Pharmaceutiques",
    description: "Workflows complets étape par étape pour l'ingénierie de prompts en pharmacie",
    type: "website",
    images: [
      {
        url: "/og-workflows.png",
        width: 1200,
        height: 630,
        alt: "Workflows Pharmaceutiques"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Workflows Pharmaceutiques",
    description: "Workflows complets étape par étape pour l'ingénierie de prompts en pharmacie"
  }
};

export default function WorkflowsPage() {
  return (
    <div className="container max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <header className="text-center mb-12">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          <Workflow className="w-4 h-4 mr-2" />
          Nouveauté 2025
        </div>
        <h1 className="text-4xl font-bold mb-4">
          Workflows Pharmaceutiques
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Des processus complets étape par étape qui vous guident de A à Z dans l'application 
          concrète des concepts d'ingénierie de prompts. Chaque workflow est un guide détaillé 
          avec exemples pratiques et cas d'usage réels.
        </p>
      </header>

      {/* Search and Filters */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Rechercher un workflow
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher par titre, description ou domaine d'application..."
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Workflows Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {workflowGuides.map((workflow) => {
          const Icon = workflow.icon ? getIcon(workflow.icon) : BookOpen;
          
          return (
            <Card key={workflow.slug} className="flex flex-col h-full hover:shadow-lg transition-all duration-200 group">
              <CardHeader className="flex-grow">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {categoryLabels[workflow.category as keyof typeof categoryLabels] || workflow.category}
                  </Badge>
                </div>
                
                <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                  {workflow.title}
                </CardTitle>
                
                <CardDescription className="line-clamp-3 text-sm leading-relaxed">
                  {workflow.description}
                </CardDescription>
                
                <div className="flex flex-wrap gap-2 pt-3">
                  {workflow.difficulty && (
                    <div className="flex items-center gap-1">
                      <Target className="w-3 h-3" />
                      <Badge variant="secondary" className="text-xs">
                        {difficultyLabels[workflow.difficulty]}
                      </Badge>
                    </div>
                  )}
                  {workflow.estimatedTime && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <Badge variant="outline" className="text-xs">
                        {workflow.estimatedTime}
                      </Badge>
                    </div>
                  )}
                </div>

                {workflow.keyTakeaways && workflow.keyTakeaways.length > 0 && (
                  <div className="pt-3 border-t border-border/50 mt-3">
                    <p className="text-xs font-medium text-muted-foreground mb-2">Points clés :</p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {workflow.keyTakeaways.slice(0, 2).map((takeaway, index) => (
                        <li key={index} className="flex items-start gap-1">
                          <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span className="line-clamp-2">{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardHeader>

              <CardContent className="pt-0">
                <Button asChild className="w-full group/btn">
                  <Link href={`/guides/${workflow.slug}`}>
                    Suivre ce workflow
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {workflowGuides.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Workflow className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Aucun workflow trouvé</h3>
            <p className="text-muted-foreground mb-6">
              Les workflows sont en cours de création. Revenez bientôt !
            </p>
            <Button asChild variant="outline">
              <Link href="/guides">
                Parcourir tous les guides
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Call to Action */}
      {workflowGuides.length > 0 && (
        <>
          <Separator className="my-12" />
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              Créez vos propres workflows
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Vous avez développé une méthode efficace ? Partagez votre expertise 
              en créant un workflow pour la communauté.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="/guides">
                  Voir tous les guides
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/concepts">
                  Explorer les concepts
                </Link>
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}