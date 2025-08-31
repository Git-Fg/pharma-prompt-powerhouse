import Link from "next/link";
import { allGuides, allPrompts } from "content-collections";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RelatedConcepts } from "./RelatedConcepts";
import { BookOpen, Lightbulb } from "lucide-react";

interface RelatedContentProps {
  currentItem: {
    slug: string;
    concepts?: string[];
  };
}

/**
 * Composant unifié pour afficher le contenu lié basé sur les concepts partagés.
 * Remplace les anciens composants RelatedContent et RelatedGuides.
 */
export function RelatedContent({ currentItem }: RelatedContentProps) {
  if (!currentItem.concepts || currentItem.concepts.length === 0) {
    return null;
  }

  // Trouver d'autres guides et prompts qui partagent au moins un concept
  const relatedGuides = allGuides
    .filter(
      (guide) =>
        guide.slug !== currentItem.slug &&
        guide.concepts?.some((c) => currentItem.concepts?.includes(c))
    )
    .slice(0, 2);

  const relatedPrompts = allPrompts
    .filter(
      (prompt) =>
        prompt.slug !== currentItem.slug &&
        prompt.concepts?.some((c) => currentItem.concepts?.includes(c))
    )
    .slice(0, 2);

  // Si aucun contenu lié, afficher seulement les concepts
  if (relatedGuides.length === 0 && relatedPrompts.length === 0) {
    return (
      <footer>
        <RelatedConcepts conceptSlugs={currentItem.concepts} />
      </footer>
    );
  }

  return (
    <footer className="space-y-8">
      {/* Section Concepts - Utilise le composant de base */}
      <RelatedConcepts conceptSlugs={currentItem.concepts} />

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
