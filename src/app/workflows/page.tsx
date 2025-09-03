'use client';

import Link from "next/link";
import { useState } from "react";
import { content } from '@/lib/content-loader';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search, Clock, Target, BookOpen } from "lucide-react";
import { getIcon } from "@/types/icon-taxonomy";

function WorkflowCard({ workflow }: { workflow: typeof content.workflows[0] }) {
  const Icon = workflow.icon ? getIcon(workflow.icon) : Target;
  
  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-all duration-200 group">
      <CardHeader className="flex-grow">
        <div className="flex items-center justify-between mb-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="text-xs">
              {workflow.difficulty}
            </Badge>
            {workflow.estimatedTime && (
              <Badge variant="secondary" className="text-xs">
                <Clock className="w-3 h-3 mr-1" />
                {workflow.estimatedTime}
              </Badge>
            )}
          </div>
        </div>
        
        <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
          {workflow.title}
        </CardTitle>
        
        <CardDescription className="line-clamp-3 text-sm leading-relaxed">
          {workflow.description}
        </CardDescription>
        
        <div className="flex flex-wrap gap-1 pt-3">
          {workflow.tags.slice(0, 3).map((tag: string) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <Link href={`/workflows/${workflow.slug}`}>
          <Button className="w-full group/btn">
            <span>Découvrir la méthode</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

export default function WorkflowsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  
  // Filter workflows based on search and difficulty
  const filteredWorkflows = content.workflows.filter(workflow => {
    const matchesSearch = workflow.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workflow.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workflow.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
                         
    const matchesDifficulty = !selectedDifficulty || workflow.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesDifficulty;
  });

  const difficulties = [...new Set(content.workflows.map(w => w.difficulty))];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">Workflows Stratégiques</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Mes méthodes éprouvées pour utiliser l'IA efficacement dans vos études. 
          Chaque workflow est une étude de cas personnelle avec ma stratégie pas-à-pas.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Rechercher un workflow..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex justify-center gap-2 flex-wrap">
          <Button
            variant={selectedDifficulty === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedDifficulty(null)}
          >
            Tous
          </Button>
          {difficulties.map((difficulty) => (
            <Button
              key={difficulty}
              variant={selectedDifficulty === difficulty ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedDifficulty(difficulty)}
            >
              {difficulty}
            </Button>
          ))}
        </div>
      </div>

      {/* Workflows Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkflows.map((workflow) => (
          <WorkflowCard key={workflow.slug} workflow={workflow} />
        ))}
      </div>

      {filteredWorkflows.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold mb-2">Aucun workflow trouvé</h3>
          <p className="text-muted-foreground">
            Essayez de modifier votre recherche ou vos filtres.
          </p>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="mt-16 text-center bg-muted p-8 rounded-lg">
        <h3 className="text-2xl font-semibold mb-4">Nouveau dans l'IA ?</h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Je recommande de commencer par comprendre les concepts essentiels avant de vous lancer 
          dans un workflow. Cela vous évitera les erreurs courantes que j'ai faites à mes débuts.
        </p>
        <div className="space-x-4">
          <Link href="/par-ou-commencer">
            <Button>
              Par où commencer ?
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link href="/concepts">
            <Button variant="outline">
              Les concepts essentiels
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}