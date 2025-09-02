import Link from 'next/link';
import { allConcepts } from 'content-collections';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Lightbulb, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ConceptRecommendationProps {
  conceptSlug: string;
  reason: string;
}

export function ConceptRecommendation({ conceptSlug, reason }: ConceptRecommendationProps) {
  const concept = allConcepts.find(c => c.slug === conceptSlug);

  if (!concept) {
    return (
      <Card className="my-6 border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
        <CardContent className="pt-6">
          <p className="text-amber-800 dark:text-amber-200">
            Concept "{conceptSlug}" non trouvé dans la collection concepts
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="my-6 border-l-4 border-l-blue-500 bg-gradient-to-r from-background to-blue-50/30 dark:to-blue-950/30">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-blue-600" />
              {concept.title}
            </CardTitle>
            <CardDescription className="text-base mb-3">
              <strong>Pourquoi :</strong> {reason}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {concept.tags && concept.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {concept.tags.slice(0, 3).map((tag) => (
              <Badge key={tag.name} variant="outline" className="bg-background">
                {tag.name}
              </Badge>
            ))}
            {concept.tags.length > 3 && (
              <Badge variant="outline" className="bg-background text-xs">
                +{concept.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Concise TLDR display */}
        {concept.keyTakeaways && concept.keyTakeaways.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium mb-2">TLDR :</p>
            <p className="text-sm text-muted-foreground">
              {concept.keyTakeaways[0]} {concept.keyTakeaways.length > 1 && `+ ${concept.keyTakeaways.length - 1} points clés`}
            </p>
          </div>
        )}

        <Button asChild className="w-full">
          <Link 
            href={`/concepts/${concept.slug}`}
            className="inline-flex items-center gap-2"
          >
            <Lightbulb className="w-4 h-4" />
            Explorer
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}