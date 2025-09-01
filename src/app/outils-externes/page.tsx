"use client";

import { allExternalTools } from "content-collections";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

// Ajout de cas d'usage pour chaque outil
const toolsWithUseCases = allExternalTools.map(tool => {
    let use_cases: string[] = [];
    let color = "bg-gray-500";
    switch (tool.slug) {
        case "google-ai-studio":
            use_cases = ["Analyse clinique précise", "Test de prompts avancés", "Raisonnement multi-étapes"];
            color = "bg-blue-50";
            break;
        case "claude-ai":
            use_cases = ["Analyse de longs PDF", "Synthèse de cours", "Dialogue avec un document"];
            color = "bg-orange-500";
            break;
        case "perplexity-ai":
            use_cases = ["Recherche bibliographique", "Vérification de faits", "Veille scientifique"];
            color = "bg-green-500";
            break;
        case "z-ai":
            use_cases = ["Création de présentations", "Génération de schémas", "Projets créatifs"];
            color = "bg-purple-500";
            break;
    }
    return { ...tool, use_cases, color };
});


export default function ExternalToolsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-bold">Mes Outils Externes Recommandés</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Voici une sélection d'outils que j'utilise régulièrement. Chaque outil a ses propres forces. J'ai préparé un guide détaillé pour chacun afin de vous aider à en tirer le meilleur parti.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {toolsWithUseCases.map((tool) => (
          <Card key={tool.slug} className="flex flex-col hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="flex justify-between items-start mb-4">
                 <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${tool.color}`}>
                       {/* Pourrait être remplacé par une icône spécifique si disponible */}
                       <span className="text-2xl font-bold text-white">{tool.title.charAt(0)}</span>
                    </div>
                    <CardTitle className="text-2xl">{tool.title}</CardTitle>
                 </div>
                <Badge variant={tool.isFree ? "default" : "secondary"}>
                  {tool.pricing}
                </Badge>
              </div>
              <CardDescription>{tool.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-semibold mb-3">Idéal pour :</h4>
                <ul className="space-y-2 mb-6">
                    {tool.use_cases.map((useCase) => (
                        <li key={useCase} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            {useCase}
                        </li>
                    ))}
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                <Button asChild className="flex-1" variant="outline">
                  <a href={tool.url} target="_blank" rel="noopener noreferrer">
                    Visiter le Site Officiel
                  </a>
                </Button>
                <Button asChild className="flex-1 group">
                  <Link href={`/outils-externes/${tool.slug}`}>
                    Voir mon guide <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"/>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}