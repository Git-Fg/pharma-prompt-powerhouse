import { content } from '@/lib/content-loader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Star } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function ExternalToolsPage() {
  const tools = content.externalTools;

  // Type assertion for enhanced schema fields
  const enhancedTools = tools as (typeof tools[0] & {
    personalReview?: string;
    strongPoints?: string[];
    vigilancePoints?: string[];
    confidenceScore?: number;
    confidenceJustification?: string;
    freeVsPaidOffer?: string;
  })[];

  const renderStarRating = (score?: number) => {
    if (!score) return <span className="text-muted-foreground">N/A</span>;
    
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-3 h-3 ${
              i < score ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-1 text-xs text-muted-foreground">
          {score}/5
        </span>
      </div>
    );
  };

  const getAvailability = (tool: typeof enhancedTools[0]) => {
    if (tool.freeVsPaidOffer && tool.freeVsPaidOffer.includes('Gratuit')) {
      return { label: 'Gratuit + Payant', color: 'bg-green-100 text-green-800' };
    }
    return { label: 'Gratuit', color: 'bg-blue-100 text-blue-800' };
  };

  return (
    <div className="space-y-8">
      <header className="text-center space-y-2">
        <h1 className="text-4xl font-bold">L'Arsenal IA 2025</h1>
        <p className="text-lg text-muted-foreground">
          Mon guide personnel des outils IA pour les étudiants en pharmacie
        </p>
      </header>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="p-4 border rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{enhancedTools.length}</div>
          <div className="text-sm text-muted-foreground">Outils testés</div>
        </div>
        <div className="p-4 border rounded-lg">
          <div className="text-2xl font-bold text-green-600">
            {enhancedTools.filter(t => t.isFavorite).length}
          </div>
          <div className="text-sm text-muted-foreground">Favoris</div>
        </div>
        <div className="p-4 border rounded-lg">
          <div className="text-2xl font-bold text-purple-600">
            {enhancedTools.filter(t => t.personalReview).length}
          </div>
          <div className="text-sm text-muted-foreground">Avis détaillés</div>
        </div>
        <div className="p-4 border rounded-lg">
          <div className="text-2xl font-bold text-orange-600">
            {enhancedTools.filter(t => !t.freeVsPaidOffer || t.freeVsPaidOffer.includes('Gratuit')).length}
          </div>
          <div className="text-sm text-muted-foreground">Accès gratuit</div>
        </div>
      </div>

      {/* Comparative Table */}
      <Card>
        <CardHeader>
          <CardTitle>Tableau Comparatif</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Outil</TableHead>
                  <TableHead>Mon Avis</TableHead>
                  <TableHead>Disponibilité</TableHead>
                  <TableHead>Confiance</TableHead>
                  <TableHead>Cas d'Usage</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {enhancedTools.map((tool) => {
                  const availability = getAvailability(tool);
                  
                  return (
                    <TableRow key={tool.slug}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">
                            {tool.title}
                            {tool.isFavorite && (
                              <Badge variant="secondary" className="ml-2 text-xs">
                                ⭐ Favori
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {tool.description}
                          </div>
                        </div>
                      </TableCell>
                      
                      <TableCell className="max-w-xs">
                        {tool.personalReview ? (
                          <p className="text-sm italic text-muted-foreground line-clamp-3">
                            "{tool.personalReview}"
                          </p>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      
                      <TableCell>
                        <Badge className={availability.color}>
                          {availability.label}
                        </Badge>
                      </TableCell>
                      
                      <TableCell>
                        {renderStarRating(tool.confidenceScore)}
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {tool.use_cases?.slice(0, 2).map((useCase: string, i: number) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {useCase}
                            </Badge>
                          ))}
                          {tool.use_cases && tool.use_cases.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{tool.use_cases.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex gap-2">
                          <Link 
                            href={`/l-arsenal-ia/${tool.slug}`}
                            className="text-primary hover:underline text-sm"
                          >
                            Détails
                          </Link>
                          <a
                            href={tool.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Card View for Mobile/Alternative */}
      <div className="md:hidden space-y-4">
        <h2 className="text-xl font-semibold">Vue Cartes</h2>
        <div className="grid gap-4">
          {enhancedTools.map((tool) => (
            <Card key={tool.slug} className="hover:border-primary transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    {tool.title}
                    {tool.isFavorite && <Badge variant="secondary">⭐</Badge>}
                  </span>
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{tool.description}</p>
                
                {tool.personalReview && (
                  <p className="text-sm italic">"{tool.personalReview}"</p>
                )}
                
                <div className="flex items-center justify-between">
                  {tool.confidenceScore && renderStarRating(tool.confidenceScore)}
                  <Link 
                    href={`/l-arsenal-ia/${tool.slug}`}
                    className="text-primary hover:underline text-sm"
                  >
                    Voir les détails →
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
