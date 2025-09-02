// src/app/outils-externes/page.tsx

import { content } from '@/lib/content-loader';
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FeaturedTools } from "@/components/shared/FeaturedTools";
import { ArrowRight, CheckCircle, Globe, Tag } from "lucide-react";

export default function ExternalToolsPage() {
  // Calculate statistics
  const totalTools = content.tools.length;
  const categoriesCount = new Set(content.tools.map(t => t.category)).size;
  const freeTools = content.tools.filter(t => t.pricing?.toLowerCase().includes('gratuit')).length;
  const totalUseCases = content.tools.reduce((acc, tool) => acc + (tool.use_cases?.length || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Mes Outils Externes Recommandés</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Voici une sélection d'outils que j'utilise régulièrement. Chaque outil a ses propres forces. 
              J'ai préparé un guide détaillé pour chacun afin de vous aider à en tirer le meilleur parti.
            </p>
          </div>
          
          {/* Statistics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-8">
            <Card className="p-6 text-center bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-950/50 dark:to-teal-900/30 border-teal-200 dark:border-teal-800">
              <div className="text-3xl font-bold text-teal-600 dark:text-teal-400">
                {totalTools}
              </div>
              <div className="text-sm text-teal-600/70 dark:text-teal-300/70">
                Outils analysés
              </div>
            </Card>
            <Card className="p-6 text-center bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-950/50 dark:to-cyan-900/30 border-cyan-200 dark:border-cyan-800">
              <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400">
                {categoriesCount}
              </div>
              <div className="text-sm text-cyan-600/70 dark:text-cyan-300/70">
                Catégories
              </div>
            </Card>
            <Card className="p-6 text-center bg-gradient-to-br from-lime-50 to-lime-100 dark:from-lime-950/50 dark:to-lime-900/30 border-lime-200 dark:border-lime-800">
              <div className="text-3xl font-bold text-lime-600 dark:text-lime-400">
                {freeTools}
              </div>
              <div className="text-sm text-lime-600/70 dark:text-lime-300/70">
                Outils gratuits
              </div>
            </Card>
            <Card className="p-6 text-center bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-950/50 dark:to-violet-900/30 border-violet-200 dark:border-violet-800">
              <div className="text-3xl font-bold text-violet-600 dark:text-violet-400">
                {totalUseCases}
              </div>
              <div className="text-sm text-violet-600/70 dark:text-violet-300/70">
                Cas d'usage
              </div>
            </Card>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Core Kit Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-center">Le Core Kit Étudiant - Nos Recommandations N°1</h2>
          <FeaturedTools />
        </div>

        {/* All Tools Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Tous les Outils Analysés</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {content.tools.map((tool) => (
            <Card key={tool.slug} className="flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <CardHeader>
                <div className="flex justify-between items-start mb-4">
                   <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`} style={{ backgroundColor: tool.color }}>
                         <span className="text-2xl font-bold text-white">{tool.title.charAt(0)}</span>
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">{tool.title}</CardTitle>
                   </div>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {tool.pricing || 'Non spécifié'}
                  </Badge>
                </div>
                <CardDescription className="text-sm leading-relaxed">{tool.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Idéal pour :
                  </h4>
                  <ul className="space-y-2 mb-6">
                      {tool.use_cases && tool.use_cases.map((useCase) => (
                          <li key={useCase} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                              {useCase}
                          </li>
                      ))}
                  </ul>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                  <Button asChild className="flex-1" variant="outline">
                    <a href={tool.url} target="_blank" rel="noopener noreferrer">
                      <Globe className="w-4 h-4 mr-2" />
                      Visiter le Site Officiel
                    </a>
                  </Button>
                  <Button asChild className="flex-1 group">
                    <Link href={`/outils-externes/${tool.slug}`}>
                      Voir mon guide 
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"/>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}