import { notFound } from 'next/navigation';
import { content, getExternalToolBySlug } from '@/lib/content-loader';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ContentRenderer } from '@/components/shared/ContentRenderer';
import ReactMarkdown from 'react-markdown';

interface ToolPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return content.externalTools.map((tool) => ({ slug: tool.slug }));
}

export default function ToolPage({ params }: ToolPageProps) {
  const tool = getExternalToolBySlug(params.slug);

  if (!tool) {
    notFound();
  }

  // Type assertion to access optional enhanced schema fields
  const enhancedTool = tool as typeof tool & {
    personalReview?: string;
    strongPoints?: string[];
    vigilancePoints?: string[];
    confidenceScore?: number;
    confidenceJustification?: string;
    freeVsPaidOffer?: string;
  };

  const renderStarRating = (score: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < score ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-2 text-sm text-muted-foreground">
          {score}/5
        </span>
      </div>
    );
  };

  return (
    <article className="max-w-4xl mx-auto py-8 space-y-8">
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-bold">{tool.title}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{tool.description}</p>
        <div className="flex justify-center">
          <Button asChild size="lg">
            <a href={tool.url} target="_blank" rel="noopener noreferrer">
              Visiter l'outil <ExternalLink className="ml-2 w-4 h-4" />
            </a>
          </Button>
        </div>
      </header>

      <div className="flex flex-wrap justify-center gap-2">
        {tool.tags.map((tag: string) => <Badge key={tag}>{tag}</Badge>)}
      </div>

      {/* Enhanced Schema Content */}
      {(enhancedTool.personalReview || enhancedTool.strongPoints || enhancedTool.vigilancePoints || enhancedTool.confidenceScore) && (
        <div className="grid gap-6 md:grid-cols-2">
          {/* Mon Avis en Bref */}
          {enhancedTool.personalReview && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Mon Avis en Bref</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground italic">{enhancedTool.personalReview}</p>
              </CardContent>
            </Card>
          )}

          {/* Score de Confiance */}
          {enhancedTool.confidenceScore && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Score de Confiance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {renderStarRating(enhancedTool.confidenceScore)}
                {enhancedTool.confidenceJustification && (
                  <p className="text-sm text-muted-foreground">{enhancedTool.confidenceJustification}</p>
                )}
              </CardContent>
            </Card>
          )}

          {/* Points Forts */}
          {enhancedTool.strongPoints && enhancedTool.strongPoints.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-green-600">Points Forts</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {enhancedTool.strongPoints?.map((point: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Points de Vigilance */}
          {enhancedTool.vigilancePoints && enhancedTool.vigilancePoints.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-orange-600">Points de Vigilance</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {enhancedTool.vigilancePoints?.map((point: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">⚠</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Offre Gratuite vs Payante */}
      {enhancedTool.freeVsPaidOffer && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Offre Gratuite vs Payante</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose dark:prose-invert max-w-none">
              <ReactMarkdown>{enhancedTool.freeVsPaidOffer}</ReactMarkdown>
            </div>
          </CardContent>
        </Card>
      )}

      {/* TLDR */}
      {tool.tldr && (
        <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="text-lg text-blue-800 dark:text-blue-200">
              TL;DR
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-blue-700 dark:text-blue-300">{tool.tldr}</p>
          </CardContent>
        </Card>
      )}

      {/* Use Cases */}
      {tool.use_cases && tool.use_cases.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Cas d'Usage Principaux</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {tool.use_cases?.map((useCase: string, index: number) => (
                <Badge key={index} variant="secondary">
                  {useCase}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content */}
      {tool.content && tool.content.length > 0 && (
        <div className="prose dark:prose-invert max-w-none">
          <ContentRenderer content={tool.content} />
        </div>
      )}
    </article>
  );
}
