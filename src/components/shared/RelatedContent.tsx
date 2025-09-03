import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import type { EnrichedGuide } from "@/lib/content-schema";

interface RelatedContentProps {
  currentItem: EnrichedGuide;
}

export function RelatedContent({ currentItem }: RelatedContentProps) {
  const { relatedGuides = [] } = currentItem;

  const hasRelatedContent = relatedGuides.length > 0;

  if (!hasRelatedContent) {
    return null;
  }

  return (
    <footer className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Pour aller plus loin</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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
        </CardContent>
      </Card>
    </footer>
  );
}