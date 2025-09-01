import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RelatedConcepts } from "./RelatedConcepts";
import { BookOpen, Lightbulb } from "lucide-react";

interface RelatedContentProps {
  currentItem: {
    slug: string;
    concepts?: Array<{ slug: string; title: string; icon?: string; category?: string }>;
    relatedGuides?: Array<{ slug: string; title: string; description: string }>;
    relatedPrompts?: Array<{ slug: string; title: string; description: string }>;
  };
}

/**
 * Composant unifié pour afficher le contenu lié basé sur les concepts partagés.
 * Utilise maintenant des données pré-calculées au build-time pour optimiser les performances.
 */
export function RelatedContent({ currentItem }: RelatedContentProps) {
  if (!currentItem.concepts || currentItem.concepts.length === 0) {
    return null;
  }

  const relatedGuides = currentItem.relatedGuides || [];
  const relatedPrompts = currentItem.relatedPrompts || [];

  // Si aucun contenu lié, afficher seulement les concepts
  if (relatedGuides.length === 0 && relatedPrompts.length === 0) {
    return (
      <footer>
        <RelatedConcepts conceptSlugs={currentItem.concepts?.map(c => c.slug) || []} />
      </footer>
    );
  }

  return (
    <footer className="space-y-8">
      {/* Section Concepts - Utilise le composant de base */}
      <RelatedConcepts conceptSlugs={currentItem.concepts?.map(c => c.slug) || []} />

      {/* Section Contenu Lié - Guides et Prompts */}
      <Card>
        <CardHeader>
          <CardTitle>Pour aller plus loin</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Guides similaires */}
          {relatedGuides.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Guides similaires
              </h3>
              {relatedGuides.map((guide) => (
                <Link
                  href={`/guides/${guide.slug}`}
                  key={guide.slug}
                  className="block p-3 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <p className="font-medium">{guide.title}</p>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {guide.description}
                  </p>
                </Link>
              ))}
            </div>
          )}

          {/* Séparateur si les deux sections sont présentes */}
          {relatedGuides.length > 0 && relatedPrompts.length > 0 && (
            <Separator />
          )}

          {/* Prompts d'application */}
          {relatedPrompts.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                Prompts d'application
              </h3>
              {relatedPrompts.map((prompt) => (
                <Link
                  href={`/prompts/${prompt.slug}`}
                  key={prompt.slug}
                  className="block p-3 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <p className="font-medium">{prompt.title}</p>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {prompt.description}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </footer>
  );
}
