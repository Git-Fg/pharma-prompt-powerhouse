import Link from 'next/link';
import { allExternalTools } from 'content-collections';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ToolRecommendationProps {
  toolSlug: string;
  reason: string;
}

export function ToolRecommendation({ toolSlug, reason }: ToolRecommendationProps) {
  const tool = allExternalTools.find(t => t.slug === toolSlug);

  if (!tool) {
    return (
      <Card className="my-6 border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
        <CardContent className="pt-6">
          <p className="text-amber-800 dark:text-amber-200">
            Outil "{toolSlug}" non trouvé dans la collection external-tools
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`my-6 border-l-4 ${tool.color} bg-gradient-to-r from-background to-muted/30`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              {tool.title}
            </CardTitle>
            <CardDescription className="text-base mb-3">
              <strong>Pourquoi cet outil :</strong> {reason}
            </CardDescription>
            <p className="text-sm text-muted-foreground">{tool.description}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline" className="bg-background">
            {tool.category}
          </Badge>
          {tool.difficulty && (
            <Badge variant="secondary">
              {tool.difficulty}
            </Badge>
          )}
          {tool.pricing && (
            <Badge variant={tool.isFree ? "default" : "secondary"}>
              {tool.pricing}
            </Badge>
          )}
        </div>

        {tool.use_cases && tool.use_cases.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium mb-2">Cas d'usage principaux :</p>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              {tool.use_cases.map((useCase, index) => (
                <li key={index}>{useCase}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-2">
          <Button asChild className="flex-1">
            <a 
              href={tool.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Accéder à {tool.title}
            </a>
          </Button>
          <Button variant="outline" asChild>
            <Link 
              href={`/tools/${tool.slug}`}
              className="inline-flex items-center gap-2"
            >
              En savoir plus
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}