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
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Clock,
  BookOpen,
  Target,
  CheckCircle,
  PlayCircle,
  FileText,
  Lightbulb,
  Users,
  ArrowRight,
} from "lucide-react";
import { allGuides } from "content-collections";
import MarkdownRenderer from "@/components/markdown/MarkdownRenderer";

const categoryLabels = {
  prompting: "Prompting 🎯",
  methodology: "Méthodologie 🔬",
  tools: "Outils 🛠️",
  security: "Sécurité 🔒",
  optimization: "Optimisation ⚡",
};

const difficultyLabels = {
  beginner: "Débutant",
  intermediate: "Intermédiaire",
  advanced: "Avancé",
};

export default function GuideDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [guide, setGuide] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("content");

  useEffect(() => {
    const guideId = params.id as string;
    const foundGuide = allGuides.find((g) => g._meta.path === guideId);
    setGuide(foundGuide || null);
  }, [params.id]);

  if (!guide) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Guide non trouvé</h1>
          <Button onClick={() => router.push("/guides")}>
            Retour aux guides
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
              onClick={() => router.push("/guides")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="outline" className="text-xs">
                  {categoryLabels[guide.category]}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {difficultyLabels[guide.difficulty]}
                </Badge>
              </div>
              <h1 className="text-3xl font-bold">{guide.title}</h1>
              <p className="text-muted-foreground mt-2">{guide.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {guide.estimatedTime}
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              {guide.tags.length} tag{guide.tags.length > 1 ? "s" : ""}
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
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="content">Contenu</TabsTrigger>
                <TabsTrigger value="related">Liens utiles</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <MarkdownRenderer content={guide.content} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="related" className="space-y-6">
                {guide.relatedPrompts && guide.relatedPrompts.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="w-5 h-5" />
                        Prompts Liés
                      </CardTitle>
                      <CardDescription>
                        Ces prompts peuvent vous aider à mettre en pratique les
                        concepts de ce guide
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {guide.relatedPrompts.map((promptId) => (
                          <div
                            key={promptId}
                            className="flex items-center justify-between p-3 border rounded-lg"
                          >
                            <div>
                              <p className="font-medium">{promptId}</p>
                              <p className="text-sm text-muted-foreground">
                                Prompt lié à ce guide
                              </p>
                            </div>
                            <Button size="sm" variant="outline">
                              Voir
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {guide.relatedTools && guide.relatedTools.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        Outils Liés
                      </CardTitle>
                      <CardDescription>
                        Ces outils peuvent vous aider dans votre apprentissage
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {guide.relatedTools.map((toolId) => (
                          <div
                            key={toolId}
                            className="flex items-center justify-between p-3 border rounded-lg"
                          >
                            <div>
                              <p className="font-medium">{toolId}</p>
                              <p className="text-sm text-muted-foreground">
                                Outil recommandé
                              </p>
                            </div>
                            <Button size="sm" variant="outline">
                              Essayer
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="w-5 h-5" />
                      Ressources Complémentaires
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">
                            Documentation officielle
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Références et ressources externes
                          </p>
                        </div>
                        <Button size="sm" variant="outline">
                          Accéder
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Exercices pratiques</p>
                          <p className="text-sm text-muted-foreground">
                            Mettez en pratique vos connaissances
                          </p>
                        </div>
                        <Button size="sm" variant="outline">
                          Commencer
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Communauté</p>
                          <p className="text-sm text-muted-foreground">
                            Discutez avec d'autres étudiants
                          </p>
                        </div>
                        <Button size="sm" variant="outline">
                          Rejoindre
                        </Button>
                      </div>
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
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Catégorie
                  </p>
                  <Badge variant="outline" className="mt-1">
                    {categoryLabels[guide.category]}
                  </Badge>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Difficulté
                  </p>
                  <Badge variant="secondary" className="mt-1">
                    {difficultyLabels[guide.difficulty]}
                  </Badge>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Temps estimé
                  </p>
                  <p className="text-sm mt-1">{guide.estimatedTime}</p>
                </div>

                {guide.progress !== undefined && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Progression
                    </p>
                    <div className="mt-1">
                      <Progress value={guide.progress} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        {guide.progress}% terminé
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {guide.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Navigation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setActiveTab("content")}
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Lire le contenu
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setActiveTab("related")}
                >
                  <Target className="w-4 h-4 mr-2" />
                  Voir les liens utiles
                </Button>
              </CardContent>
            </Card>

            {guide.progress === 100 && (
              <Card className="border-green-500 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-lg text-green-800">
                    Guide terminé !
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-green-700 mb-4">
                    Félicitations ! Vous avez terminé ce guide. Continuez votre
                    apprentissage avec les guides liés.
                  </p>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Continuer mon apprentissage
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
