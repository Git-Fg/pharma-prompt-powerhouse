'use client';

import Link from "next/link";
import { useState } from "react";
import { content } from '@/lib/content-loader';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Search, Workflow, Clock, Target, BookOpen, CheckCircle } from "lucide-react";
import { getIcon } from "@/types/icon-taxonomy";
import { categoryLabels, difficultyLabels } from '@/lib/constants';

const allWorkflowGuides = content.guides.filter(guide => guide.isWorkflow);

const allPracticalGuides = content.guides.filter(guide => !guide.isWorkflow);

function GuideCard({ guide, isWorkflow = false }: { 
  guide: (typeof allWorkflowGuides)[0];
  isWorkflow?: boolean;
}) {
  const Icon = guide.icon ? getIcon(guide.icon) : BookOpen;
  
  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-all duration-200 group">
      <CardHeader className="flex-grow">
        <div className="flex items-center justify-between mb-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <div className="flex gap-2">
            {isWorkflow && (
              <Badge variant="default" className="text-xs">
                <Workflow className="w-3 h-3 mr-1" />
                Workflow
              </Badge>
            )}
            <Badge variant="outline" className="text-xs">
              {categoryLabels[guide.category as keyof typeof categoryLabels] || guide.category}
            </Badge>
          </div>
        </div>
        
        <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
          {guide.title}
        </CardTitle>
        
        <CardDescription className="line-clamp-3 text-sm leading-relaxed">
          {guide.description}
        </CardDescription>
        
        <div className="flex flex-wrap gap-2 pt-3">
          {guide.difficulty && (
            <div className="flex items-center gap-1">
              <Target className="w-3 h-3" />
              <Badge variant="secondary" className="text-xs">
                {difficultyLabels[guide.difficulty as keyof typeof difficultyLabels] || guide.difficulty}
              </Badge>
            </div>
          )}
          {guide.estimatedTime && (
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <Badge variant="outline" className="text-xs">
                {guide.estimatedTime}
              </Badge>
            </div>
          )}
        </div>

        {guide.keyTakeaways && guide.keyTakeaways.length > 0 && (
          <div className="pt-3 border-t border-border/50 mt-3">
            <p className="text-xs font-medium text-muted-foreground mb-2">TLDR :</p>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {guide.keyTakeaways[0]} {guide.keyTakeaways.length > 1 && `+ ${guide.keyTakeaways.length - 1} points`}
            </p>
          </div>
        )}
      </CardHeader>

      <CardContent className="pt-0">
        <Button asChild className="w-full group/btn">
          <Link href={`/guides/${guide.slug}`}>
            {isWorkflow ? "Suivre ce workflow" : "Lire le guide"}
            <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export default function WorkflowsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filterLogic = (guide: (typeof allWorkflowGuides)[0]) => 
    guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guide.description.toLowerCase().includes(searchTerm.toLowerCase());

  const filteredWorkflows = allWorkflowGuides.filter(filterLogic);
  const filteredGuides = allPracticalGuides.filter(filterLogic);

  const totalContent = allWorkflowGuides.length + allPracticalGuides.length;

  return (
    <div className="container max-w-6xl mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          <Workflow className="w-4 h-4 mr-2" />
          Expérience Unifiée 2025
        </div>
        <h1 className="text-4xl font-bold mb-4">
          Workflows & Guides Pratiques
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Tous vos contenus pratiques réunis : workflows étape par étape et guides complets 
          pour maîtriser l'ingénierie de prompts en pharmacie. {totalContent} ressources disponibles.
        </p>
      </header>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Recherche globale
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher par titre, description, ou mot-clé..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="workflows" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="workflows" className="flex items-center gap-2">
            <Workflow className="w-4 h-4" />
            Workflows ({filteredWorkflows.length})
          </TabsTrigger>
          <TabsTrigger value="guides" className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Guides Pratiques ({filteredGuides.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="workflows" className="mt-0">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Processus Étape par Étape</h2>
            <p className="text-muted-foreground">
              Des workflows complets qui vous guident de A à Z dans l'application concrète des concepts.
            </p>
          </div>
          
          {filteredWorkflows.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredWorkflows.map((workflow) => (
                <GuideCard key={workflow.slug} guide={workflow} isWorkflow />
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <Workflow className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Aucun workflow trouvé</h3>
                <p className="text-muted-foreground mb-6">
                  Aucun workflow ne correspond à votre recherche. Essayez d'autres termes.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="guides" className="mt-0">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Guides Complets</h2>
            <p className="text-muted-foreground">
              Tutoriels détaillés et ressources pour approfondir vos connaissances en ingénierie de prompts.
            </p>
          </div>
          
          {filteredGuides.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredGuides.map((guide) => (
                <GuideCard key={guide.slug} guide={guide} />
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Aucun guide trouvé</h3>
                <p className="text-muted-foreground mb-6">
                   Aucun guide pratique ne correspond à votre recherche. Essayez d'autres termes.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <Separator className="my-12" />
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">
          Découvrez l'Écosystème Complet
        </h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Combinez workflows et guides avec nos concepts fondamentaux et prompts prêts à l'emploi 
          pour une approche complète de l'ingénierie de prompts pharmaceutiques.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <Card className="p-6">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold mb-2">Concepts</h3>
            <p className="text-sm text-muted-foreground mb-4">Maîtrisez les fondamentaux</p>
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link href="/concepts">Explorer</Link>
            </Button>
          </Card>
          
          <Card className="p-6">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold mb-2">Prompts</h3>
            <p className="text-sm text-muted-foreground mb-4">Templates prêts à l'emploi</p>
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link href="/prompts">Parcourir</Link>
            </Button>
          </Card>
          
          <Card className="p-6">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-3">
              <BookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-semibold mb-2">Outils</h3>
            <p className="text-sm text-muted-foreground mb-4">Recommandations d'experts</p>
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link href="/outils-externes">Découvrir</Link>
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}