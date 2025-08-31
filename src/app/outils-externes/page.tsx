"use client";

import { allExternalTools } from "content-collections";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ExternalToolsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-bold">Mes Outils Externes Recommandés</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Voici une sélection d'outils que j'utilise régulièrement. Cliquez sur
          "Voir mon guide" pour accéder à mon analyse complète et mes conseils
          d'utilisation.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allExternalTools.map((tool) => (
          <Card key={tool.title} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{tool.title}</CardTitle>
                <Badge
                  variant={tool.pricing === "Gratuit" ? "default" : "secondary"}
                >
                  {tool.pricing}
                </Badge>
              </div>
              <CardDescription>{tool.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-semibold mb-2">Capacités :</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {tool.capabilities.map((cap) => (
                    <Badge key={cap} variant="outline">
                      {cap}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button asChild className="flex-1" variant="secondary">
                  <a href={tool.url} target="_blank" rel="noopener noreferrer">
                    Visiter
                  </a>
                </Button>
                <Button asChild className="flex-1">
                  <Link href={`/outils-externes/${tool.slug}`}>
                    Voir mon guide
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
