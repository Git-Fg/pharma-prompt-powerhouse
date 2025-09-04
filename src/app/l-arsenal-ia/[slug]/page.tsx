import { notFound } from 'next/navigation';
import { content, getExternalToolBySlug } from '@/lib/content-loader';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ContentRenderer } from '@/components/shared/ContentRenderer';
import { DisclaimerBanner } from '@/components/shared/DisclaimerBanner';
import { Container, Section } from '@/components/layout/Container';
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer';
import { getStarRatingProps } from '@/lib/ui-utils';

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

  return (
    <Section>
      <Container maxWidth="4xl">
        <article className="py-8 space-y-8">
          <header className="text-center space-y-4">
            <h1 className="responsive-large-heading">{tool.title}</h1>
            <p className="responsive-section-title text-muted-foreground responsive-max-width-content mx-auto">{tool.description}</p>
            <div className="flex justify-center">
              <Button asChild size="lg">
                <a href={tool.url} target="_blank" rel="noopener noreferrer">
                  Visiter l'outil <ExternalLink className="ml-2 size-4" />
                </a>
              </Button>
            </div>
          </header>

      <div className="flex flex-wrap justify-center gap-2">
        {tool.tags.map((tag: string) => <Badge key={tag}>{tag}</Badge>)}
      </div>

      {/* Enhanced Schema Content */}
      {(tool.personalReview || tool.strongPoints || tool.vigilancePoints || tool.confidenceScore) && (
        <div className="content-grid md:grid-cols-2">
          {/* Mon Avis en Bref */}
          {tool.personalReview && (
            <Card>
              <CardHeader>
                <CardTitle className="responsive-card-title">Mon Avis en Bref</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground italic">{tool.personalReview}</p>
              </CardContent>
            </Card>
          )}

          {/* Score de Confiance */}
          {tool.confidenceScore && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Score de Confiance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-1">
                  {getStarRatingProps(tool.confidenceScore).stars.map((star) => (
                    <Star
                      key={star.index}
                      className={`size-4 ${star.className}`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">
                    {tool.confidenceScore}/5
                  </span>
                </div>
                {tool.confidenceJustification && (
                  <p className="text-sm text-muted-foreground">{tool.confidenceJustification}</p>
                )}
              </CardContent>
            </Card>
          )}

          {/* Points Forts */}
          {tool.strongPoints && tool.strongPoints.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-green-600">Points Forts</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tool.strongPoints?.map((point: string, index: number) => (
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
          {tool.vigilancePoints && tool.vigilancePoints.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-orange-600">Points de Vigilance</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tool.vigilancePoints?.map((point: string, index: number) => (
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
      {tool.freeVsPaidOffer && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Offre Gratuite vs Payante</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose dark:prose-invert max-w-none">
              <MarkdownRenderer content={tool.freeVsPaidOffer} />
            </div>
          </CardContent>
        </Card>
      )}

      {/* TLDR */}
      {("tldr" in tool) && tool.tldr && (
        <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="text-lg text-blue-800 dark:text-blue-200">
              TL;DR
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-blue-700 dark:text-blue-300">{("tldr" in tool) ? tool.tldr : ""}</p>
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

          {/* Disclaimer Banner */}
          <div className="mt-8">
            <DisclaimerBanner type="arsenal" />
          </div>
        </article>
      </Container>
    </Section>
  );
}
