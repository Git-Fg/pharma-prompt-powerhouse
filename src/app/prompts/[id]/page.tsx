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
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Copy,
  Eye,
  ArrowLeft,
  CheckCircle,
  Clock,
  Target,
  BookOpen,
  Lightbulb,
  Code,
  FileText,
  PlayCircle,
} from "lucide-react";
import { allPrompts } from "content-collections";

const categoryLabels = {
  technical: "Technique ⚙️",
  analysis: "Analyse 🔍",
  creative: "Créatif ✨",
  documentation: "Documentation 📝",
  research: "Recherche 🔬",
};

const difficultyLabels = {
  beginner: "Débutant",
  intermediate: "Intermédiaire",
  advanced: "Avancé",
};

const toolLabels = {
  chatgpt: "ChatGPT",
  claude: "Claude",
  perplexity: "Perplexity",
  "ai.dev": "AI.dev",
};

export default function PromptDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [prompt, setPrompt] = useState<any>(null);
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const promptId = params.id as string;
    const foundPrompt = allPrompts.find((p) => p._meta.path === promptId);
    setPrompt(foundPrompt || null);

    if (foundPrompt && foundPrompt.variables) {
      // Initialize variables with default values
      const initialVariables: Record<string, string> = {};
      foundPrompt.variables.forEach((variableName: string) => {
        initialVariables[variableName] = `[${variableName}]`;
      });
      setVariables(initialVariables);
    }
  }, [params.id]);

  const handleVariableChange = (variableName: string, value: string) => {
    setVariables((prev) => ({
      ...prev,
      [variableName]: value,
    }));
  };

  const generatePrompt = () => {
    if (!prompt) return;

    // Get the content from the prompt and replace variables
    let result = prompt.content || "";

    // Replace variables
    Object.entries(variables).forEach(([key, value]) => {
      const regex = new RegExp(`{${key}}`, "g");
      result = result.replace(regex, value);
    });

    setGeneratedPrompt(result);
  };

  if (!prompt) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Prompt non trouvé</h1>
          <Button onClick={() => router.push("/prompts")}>
            Retour aux prompts
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
              onClick={() => router.push("/prompts")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="outline" className="text-xs">
                  {categoryLabels[prompt.category]}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {difficultyLabels[prompt.difficulty]}
                </Badge>
              </div>
              <h1 className="text-3xl font-bold">{prompt.title}</h1>
              <p className="text-muted-foreground mt-2">{prompt.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {prompt.estimatedTime}
            </div>
            <div className="flex items-center gap-1">
              <Target className="w-4 h-4" />
              {prompt.variables?.length || 0} variable
              {prompt.variables?.length > 1 ? "s" : ""}
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              {toolLabels[prompt.targetTool]}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {prompt.tags.map((tag: string) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
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
                <TabsTrigger value="overview">Aperçu</TabsTrigger>
                <TabsTrigger value="prompt">Prompt</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Description
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {prompt.description}
                    </p>
                    {prompt.promptDescription && (
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-sm text-muted-foreground">
                          {prompt.promptDescription}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Détails
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            Catégorie
                          </p>
                          <p className="text-sm">{prompt.category}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            Difficulté
                          </p>
                          <p className="text-sm">{prompt.difficulty}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            Outil cible
                          </p>
                          <p className="text-sm">{prompt.targetTool}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            Temps estimé
                          </p>
                          <p className="text-sm">{prompt.estimatedTime}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="prompt" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="w-5 h-5" />
                      Contenu du Prompt
                    </CardTitle>
                    <CardDescription>
                      Le prompt complet avec toutes les variables
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">Variables</h4>
                        <Button onClick={generatePrompt} size="sm">
                          <PlayCircle className="w-4 h-4 mr-2" />
                          Générer
                        </Button>
                      </div>

                      {prompt.variables && (
                        <div className="grid gap-4">
                          {prompt.variables.map((variableName: string) => (
                            <div key={variableName} className="space-y-2">
                              <label className="text-sm font-medium">
                                {variableName}
                              </label>
                              <Input
                                value={variables[variableName] || ""}
                                onChange={(e) =>
                                  handleVariableChange(
                                    variableName,
                                    e.target.value
                                  )
                                }
                                placeholder={`Entrez la valeur pour ${variableName}`}
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      {generatedPrompt && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium">
                              Prompt Généré
                            </h4>
                            <Button
                              onClick={() => {
                                navigator.clipboard.writeText(generatedPrompt);
                                setCopied(true);
                                setTimeout(() => setCopied(false), 2000);
                              }}
                              size="sm"
                              variant="outline"
                            >
                              <Copy className="w-4 h-4 mr-2" />
                              {copied ? "Copié !" : "Copier"}
                            </Button>
                          </div>
                          <div className="p-4 bg-muted rounded-lg">
                            <pre className="whitespace-pre-wrap text-sm">
                              {generatedPrompt}
                            </pre>
                          </div>
                        </div>
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
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setActiveTab("prompt")}
                >
                  <PlayCircle className="w-4 h-4 mr-2" />
                  Générer un prompt
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
