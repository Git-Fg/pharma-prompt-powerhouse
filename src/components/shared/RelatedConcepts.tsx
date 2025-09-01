import Link from "next/link";
import { allConcepts } from "content-collections";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Network } from "lucide-react";
import { getIcon } from "@/types/icon-taxonomy";

/**
 * Composant de base pour afficher les concepts liés à un contenu.
 * Utilisé par RelatedContent et peut être utilisé indépendamment.
 */

interface RelatedConceptsProps {
  conceptSlugs: string[];
  title?: string;
  className?: string;
}

export function RelatedConcepts({
  conceptSlugs,
  title = "Concepts Abordés",
  className = "",
}: RelatedConceptsProps) {
  if (!conceptSlugs || conceptSlugs.length === 0) {
    return null;
  }

  const related = allConcepts.filter((c) => conceptSlugs.includes(c.slug));

  if (related.length === 0) {
    return null;
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 mb-4">
          <Network className="w-5 h-5 text-primary" />
          {title}
        </CardTitle>
        <div className="flex flex-wrap gap-4">
          {related.map((concept) => {
            const Icon = getIcon(concept.icon);
            return (
              <Link
                href={`/concepts/${concept.slug}`}
                key={concept.slug}
                className="flex-1 min-w-[200px]"
              >
                <div className="p-3 border rounded-lg hover:bg-accent/50 transition-colors flex items-center gap-3">
                  <Icon className="w-5 h-5 text-muted-foreground" />
                  <span className="font-semibold">{concept.title}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </CardHeader>
    </Card>
  );
}
