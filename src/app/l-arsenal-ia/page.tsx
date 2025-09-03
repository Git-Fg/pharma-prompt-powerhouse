import { content } from '@/lib/content-loader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';

export default function ExternalToolsPage() {
  const allTags = Array.from(new Set(content.externalTools.flatMap((t) => t.tags)));
  const toolsByCategory = content.externalTools.reduce<Record<string, typeof content.externalTools>>((acc, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = [];
    }
    acc[tool.category]!.push(tool);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      <header className="text-center space-y-2">
        <h1 className="text-4xl font-bold">Outils Externes</h1>
        <p className="text-lg text-muted-foreground">Une sélection d'outils et plateformes pour booster votre productivité.</p>
      </header>

      <div className="flex flex-wrap gap-2 justify-center">
        {allTags.map((tag) => <Badge key={tag} variant="outline">{tag}</Badge>)}
      </div>

      {Object.entries(toolsByCategory).map(([category, tools]) => (
        <section key={category} className="space-y-4">
          <h2 className="text-2xl font-semibold capitalize">{category.replace(/-/g, ' ')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map((tool) => (
              <Link href={`/outils-externes/${tool.slug}`} key={tool.slug} passHref>
                <Card className="hover:border-primary transition-colors h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {tool.title}
                      <ExternalLink className="w-4 h-4" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{tool.description}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                        {tool.tags.map((tag) => <Badge key={tag} variant="outline">{tag}</Badge>)}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
