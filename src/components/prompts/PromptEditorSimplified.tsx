"use client";

import { useState, useEffect } from "react";
import { allPrompts } from "content-collections";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import {
  Copy,
  Download,
  Plus,
  Trash2,
  FileText,
  Lightbulb,
  CheckCircle,
} from "lucide-react";

interface PromptVariable {
  name: string;
  description: string;
  example: string;
}

interface SimplePrompt {
  title: string;
  content: string;
  variables: PromptVariable[];
}

interface PromptEditorProps {
  templateToLoad?: string | null;
}

export function PromptEditor({ templateToLoad }: PromptEditorProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("editor");
  const [copied, setCopied] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState<string>("");

  // État simplifié du prompt
  const [currentPrompt, setCurrentPrompt] = useState<SimplePrompt>({
    title: "",
    content: "",
    variables: [],
  });

  // Charger un template si spécifié dans l'URL
  useEffect(() => {
    if (templateToLoad) {
      const template = allPrompts.find((p) => p.slug === templateToLoad);
      if (template) {
        setCurrentPrompt({
          title: template.title,
          content: template.promptContent || template.content || "",
          variables: template.variables?.map((v) => ({
            name: v,
            description: `Variable ${v}`,
            example: `Exemple pour ${v}`,
          })) || [],
        });
        generatePrompt();
      }
    }
  }, [templateToLoad]);

  // Générer le prompt avec les variables remplacées
  const generatePrompt = () => {
    let result = currentPrompt.content;

    currentPrompt.variables.forEach((variable) => {
      const placeholder = `{${variable.name}}`;
      const replacement = variable.example || `{{${variable.name}}}`;
      result = result.replaceAll(placeholder, replacement);
    });

    setGeneratedPrompt(result);
  };

  // Copier le prompt dans le presse-papier
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);

      toast({
        title: "Copié !",
        description: "Le prompt a été copié dans le presse-papiers.",
      });
    } catch (err) {
      console.error("Failed to copy text: ", err);
      toast({
        title: "Erreur",
        description: "Impossible de copier le prompt.",
        variant: "destructive",
      });
    }
  };

  // Télécharger le prompt en fichier .txt
  const downloadPrompt = () => {
    if (!generatedPrompt) return;

    const blob = new Blob([generatedPrompt], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${currentPrompt.title || "prompt"}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Téléchargement lancé !",
      description: "Votre prompt a été téléchargé au format .txt",
    });
  };

  // Ajouter une nouvelle variable
  const addVariable = () => {
    const newVariable: PromptVariable = {
      name: `variable_${Date.now()}`,
      description: "Description de la variable",
      example: "Valeur d'exemple",
    };
    
    setCurrentPrompt({
      ...currentPrompt,
      variables: [...currentPrompt.variables, newVariable],
    });
  };

  // Supprimer une variable
  const removeVariable = (index: number) => {
    const updatedVariables = currentPrompt.variables.filter((_, i) => i !== index);
    setCurrentPrompt({
      ...currentPrompt,
      variables: updatedVariables,
    });
  };

  // Mettre à jour une variable
  const updateVariable = (index: number, field: keyof PromptVariable, value: string) => {
    const updatedVariables = currentPrompt.variables.map((variable, i) =>
      i === index ? { ...variable, [field]: value } : variable
    );
    
    setCurrentPrompt({
      ...currentPrompt,
      variables: updatedVariables,
    });
  };

  // Recalculer le prompt quand le contenu ou les variables changent
  useEffect(() => {
    generatePrompt();
  }, [currentPrompt.content, currentPrompt.variables]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Contenu principal */}
          <div className="lg:col-span-3">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="editor">✏️ Éditeur</TabsTrigger>
                <TabsTrigger value="preview">👁️ Aperçu</TabsTrigger>
              </TabsList>

              <TabsContent value="editor" className="space-y-6">
                {/* Nom du prompt (optionnel) */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">📝 Mon Prompt</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Label htmlFor="prompt-title" className="text-sm font-medium">
                      Nom (optionnel)
                    </Label>
                    <Input
                      id="prompt-title"
                      value={currentPrompt.title}
                      onChange={(e) =>
                        setCurrentPrompt({
                          ...currentPrompt,
                          title: e.target.value,
                        })
                      }
                      placeholder="Donnez un nom à votre prompt..."
                      className="mt-2"
                    />
                  </CardContent>
                </Card>

                {/* Contenu du prompt */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      🎯 Contenu du Prompt
                      <div className="flex gap-2 ml-auto">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(generatedPrompt)}
                          disabled={!generatedPrompt}
                        >
                          <Copy className="w-4 h-4 mr-1" />
                          {copied ? "Copié !" : "Copier"}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={downloadPrompt}
                          disabled={!generatedPrompt}
                        >
                          <Download className="w-4 h-4 mr-1" />
                          .txt
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={currentPrompt.content}
                      onChange={(e) =>
                        setCurrentPrompt({
                          ...currentPrompt,
                          content: e.target.value,
                        })
                      }
                      placeholder="Écrivez votre prompt ici... Utilisez {nom_variable} pour les variables dynamiques."
                      className="min-h-[300px] font-mono text-sm"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      <strong>Astuce :</strong> Utilisez {"{nom_variable}"} pour insérer des variables dynamiques dans votre prompt.
                    </p>
                  </CardContent>
                </Card>

                {/* Gestion des variables */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      🔧 Variables
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={addVariable}
                        className="ml-auto"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Ajouter une variable
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {currentPrompt.variables.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">
                        Aucune variable définie. Ajoutez-en une pour personnaliser votre prompt !
                      </p>
                    ) : (
                      <Accordion type="multiple" className="w-full">
                        {currentPrompt.variables.map((variable, index) => (
                          <AccordionItem key={index} value={`variable-${index}`}>
                            <AccordionTrigger>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="font-mono">
                                  {variable.name}
                                </Badge>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeVariable(index);
                                  }}
                                  className="ml-auto"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="space-y-3">
                              <div>
                                <Label className="text-sm">Nom de la variable</Label>
                                <Input
                                  value={variable.name}
                                  onChange={(e) =>
                                    updateVariable(index, "name", e.target.value)
                                  }
                                  className="font-mono"
                                />
                              </div>
                              <div>
                                <Label className="text-sm">Description</Label>
                                <Input
                                  value={variable.description}
                                  onChange={(e) =>
                                    updateVariable(index, "description", e.target.value)
                                  }
                                />
                              </div>
                              <div>
                                <Label className="text-sm">Valeur d'exemple</Label>
                                <Textarea
                                  value={variable.example}
                                  onChange={(e) =>
                                    updateVariable(index, "example", e.target.value)
                                  }
                                  rows={2}
                                />
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Onglet Aperçu */}
              <TabsContent value="preview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      👁️ Aperçu de votre prompt
                      <div className="flex gap-2 ml-auto">
                        <Button
                          size="sm"
                          onClick={() => copyToClipboard(generatedPrompt)}
                          disabled={!generatedPrompt}
                        >
                          <Copy className="w-4 h-4 mr-1" />
                          {copied ? "Copié !" : "Copier"}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={downloadPrompt}
                          disabled={!generatedPrompt}
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Télécharger .txt
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {generatedPrompt ? (
                      <div className="bg-muted/30 p-4 rounded-lg border">
                        <pre className="whitespace-pre-wrap text-sm font-mono">
                          {generatedPrompt}
                        </pre>
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-center py-8">
                        Écrivez du contenu dans l'éditeur pour voir l'aperçu
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Panneau latéral avec conseils */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Conseils d'utilisation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <FileText className="w-4 h-4 mt-1 text-primary" />
                  <div>
                    <p className="font-medium text-sm">Variables dynamiques</p>
                    <p className="text-xs text-muted-foreground">
                      Utilisez {"{variable}"} pour créer des prompts réutilisables
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 mt-1 text-primary" />
                  <div>
                    <p className="font-medium text-sm">Testez régulièrement</p>
                    <p className="text-xs text-muted-foreground">
                      Utilisez l'aperçu pour tester avant d'utiliser votre prompt
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">📊 Statistiques</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Caractères</span>
                  <Badge variant="outline">{generatedPrompt.length}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Variables</span>
                  <Badge variant="outline">{currentPrompt.variables.length}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Mots</span>
                  <Badge variant="outline">
                    {generatedPrompt.trim() ? generatedPrompt.trim().split(/\s+/).length : 0}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}