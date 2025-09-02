import Link from "next/link";
import { allConcepts, allGuides, allPrompts } from "content-collections";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import * as LucideIcons from "lucide-react";
import { getIcon } from "@/types/icon-taxonomy";

export default function ConceptsPage() {
  const categories = ["Fondamentaux", "Techniques Avancées", "Méthodologie"];

  const conceptsByCategory = categories.map((category) => ({
    category,
    concepts: allConcepts.filter((c) => c.category === category),
  }));

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-bold">Hub de Concepts</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Chaque concept est un dossier complet reliant la théorie, la pratique
          et les outils. Choisissez un concept pour commencer.
        </p>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-primary">
            {allConcepts.length}
          </div>
          <div className="text-sm text-muted-foreground">
            Concepts disponibles
          </div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-green-600">4</div>
          <div className="text-sm text-muted-foreground">Domaines couverts</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-blue-600">100%</div>
          <div className="text-sm text-muted-foreground">Contenus liés</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-purple-600">∞</div>
          <div className="text-sm text-muted-foreground">Possibilités</div>
        </Card>
      </div>

      <Separator className="my-8" />

      <div className="space-y-12">
        {conceptsByCategory.map(({ category, concepts }) => {
          if (concepts.length === 0) return null;
          const conceptsWithStats = concepts.map((c) => {
            const guideCount = allGuides.filter((g) =>
              g.conceptSlugs?.includes(c.slug)
            ).length;
            const promptCount = allPrompts.filter((p) =>
              p.conceptSlugs?.includes(c.slug)
            ).length;
            return { ...c, guideCount, promptCount };
          });

          return (
            <section key={category}>
              <h2 className="text-2xl font-semibold mb-6">{category}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {conceptsWithStats.map((concept) => {
                  const Icon = getIcon(concept.icon);
                  return (
                    <Link
                      href={`/concepts/${concept.slug}`}
                      key={concept.slug}
                      className="block"
                      data-testid="concept-card"
                    >
                      <Card className="h-full hover:shadow-lg hover:border-primary/50 transition-all duration-200 group">
                        <CardHeader>
                          <div className="flex items-center gap-4 mb-3">
                            <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
                              <Icon className="w-6 h-6 text-primary" />
                            </div>
                            <CardTitle className="group-hover:text-primary transition-colors">
                              {concept.title}
                            </CardTitle>
                          </div>
                          <CardDescription>
                            {concept.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>
                              <Badge variant="secondary">
                                {concept.guideCount} Guides
                              </Badge>
                            </span>
                            <span>
                              <Badge variant="secondary">
                                {concept.promptCount} Prompts
                              </Badge>
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      {/* Section d'aide */}
      <div className="mt-16 text-center">
        <Separator className="mb-8" />
        <h2 className="text-2xl font-semibold mb-4">
          Comment utiliser le Hub de Concepts ?
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <LucideIcons.BookOpen className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">1. Choisissez un concept</h3>
            <p className="text-sm text-muted-foreground">
              Explorez les concepts qui correspondent à vos besoins
              d'apprentissage
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <LucideIcons.Lightbulb className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">2. Découvrez les ressources</h3>
            <p className="text-sm text-muted-foreground">
              Accédez aux guides, prompts et outils liés à ce concept
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <LucideIcons.Wrench className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">3. Mettez en pratique</h3>
            <p className="text-sm text-muted-foreground">
              Utilisez l'éditeur de prompts pour tester et adapter les
              techniques
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
