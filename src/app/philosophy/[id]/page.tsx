"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Brain,
  Lightbulb,
  Target,
  BookOpen,
  Users,
  ArrowRight,
  CheckCircle,
  FileText,
} from "lucide-react";
import { allPhilosophies } from "content-collections";
import MarkdownRenderer from "@/components/markdown/MarkdownRenderer";

export default function PhilosophyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [philosophy, setPhilosophy] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("content");

  useEffect(() => {
    const philosophyId = params.id as string;
    const foundPhilosophy = allPhilosophies.find(
      (p) => p._meta.path === philosophyId
    );
    setPhilosophy(foundPhilosophy || null);
  }, [params.id]);

  if (!philosophy) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            Concept philosophique non trouvé
          </h1>
          <Button onClick={() => router.push("/philosophy")}>
            Retour à la philosophie
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/philosophy")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
            <div className="flex-1">
              <h1 className="text-3xl font-bold">{philosophy.title}</h1>
              <p className="text-muted-foreground mt-2">
                {philosophy.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="content">Concept</TabsTrigger>
                <TabsTrigger value="principles">Principes</TabsTrigger>
                <TabsTrigger value="related">Concepts liés</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <MarkdownRenderer content={philosophy.content} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="principles" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Principes Clés
                    </CardTitle>
                    <CardDescription>
                      Les principes fondamentaux qui sous-tendent ce concept
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {philosophy.principles &&
                      philosophy.principles.length > 0 ? (
                        philosophy.principles.map(
                          (principle: string, index: number) => (
                            <div
                              key={index}
                              className="flex items-start gap-3 p-4 border rounded-lg"
                            >
                              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-sm font-medium">
                                  {index + 1}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium">{principle}</p>
                              </div>
                            </div>
                          )
                        )
                      ) : (
                        <p className="text-muted-foreground text-center py-8">
                          Aucun principe spécifique défini pour ce concept.
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="related" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Concepts Liés
                    </CardTitle>
                    <CardDescription>
                      D'autres concepts philosophiques en relation avec celui-ci
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {philosophy.relatedConcepts &&
                      philosophy.relatedConcepts.length > 0 ? (
                        philosophy.relatedConcepts.map(
                          (concept: string, index: number) => (
                            <div
                              key={index}
                              className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                            >
                              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                <Lightbulb className="w-4 h-4 text-primary" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">{concept}</p>
                              </div>
                            </div>
                          )
                        )
                      ) : (
                        <p className="text-muted-foreground text-center py-8">
                          Aucun concept lié défini pour ce concept.
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Informations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {philosophy.readingTime || "Temps de lecture non spécifié"}
                  </span>
                </div>
                {philosophy.author && (
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Par {philosophy.author}
                    </span>
                  </div>
                )}
                {philosophy.date && (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {philosophy.date}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setActiveTab("principles")}
                >
                  <Target className="w-4 h-4 mr-2" />
                  Voir les principes
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setActiveTab("related")}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Voir les concepts liés
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
