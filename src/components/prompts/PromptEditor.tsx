"use client";

import { useState, useEffect, useTransition, useOptimistic } from "react";
import { allPrompts } from "content-collections";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import {
  Save,
  Copy,
  Download,
  Play,
  Plus,
  Trash2,
  Eye,
  Edit3,
  FileText,
  Target,
  Lightbulb,
  CheckCircle,
} from "lucide-react";

interface PromptTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  targetTool: string;
  content: string;
  variables: PromptVariable[];
  createdAt: string;
  updatedAt: string;
}

interface PromptVariable {
  name: string;
  description: string;
  type: "text" | "number" | "boolean" | "list";
  required: boolean;
  example: string;
  options?: string[];
}

interface PromptEditorProps {
  templateToLoad?: string | null;
}

const categoryOptions = [
  { value: "technical", label: "Technique ⚙️" },
  { value: "analysis", label: "Analyse 🔍" },
  { value: "creative", label: "Créatif ✨" },
  { value: "documentation", label: "Documentation 📝" },
  { value: "research", label: "Recherche 🔬" },
];

const difficultyOptions = [
  { value: "beginner", label: "Débutant" },
  { value: "intermediate", label: "Intermédiaire" },
  { value: "advanced", label: "Avancé" },
];

const toolOptions = [
  { value: "chatgpt", label: "ChatGPT" },
  { value: "claude", label: "Claude" },
  { value: "perplexity", label: "Perplexity" },
  { value: "ai.dev", label: "AI.dev" },
  { value: "z.ai", label: "Z.ai" },
  { value: "gemini", label: "Gemini" },
  { value: "gemini-deep-research", label: "Gemini Deep Research" },
  { value: "vertex-ai", label: "Vertex AI" },
  { value: "notebooklm", label: "NotebookLM" },
  { value: "glass-ia", label: "Glass IA" },
];

const typeLabels = {
  text: "Texte",
  number: "Nombre",
  boolean: "Booléen",
  list: "Liste",
};

export function PromptEditor({ templateToLoad }: PromptEditorProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("editor");
  const [currentPrompt, setCurrentPrompt] = useState<PromptTemplate>({
    id: "",
    title: "",
    description: "",
    category: "",
    difficulty: "",
    targetTool: "",
    content: "",
    variables: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  const [previewVariables, setPreviewVariables] = useState<
    Record<string, string>
  >({});
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [savedPrompts, setSavedPrompts] = useState<PromptTemplate[]>([]);
  const [copied, setCopied] = useState(false);
  const [isSaving, startSavingTransition] = useTransition();

  // Utilisation de useOptimistic pour la sauvegarde
  const [optimisticPrompts, addOptimisticPrompt] = useOptimistic(
    savedPrompts,
    (state, newPrompt: PromptTemplate) => {
      const existingIndex = state.findIndex((p) => p.id === newPrompt.id);
      if (existingIndex >= 0) {
        const updated = [...state];
        updated[existingIndex] = {
          ...newPrompt,
          updatedAt: new Date().toISOString(),
        };
        return updated;
      }
      return [
        ...state,
        {
          ...newPrompt,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];
    }
  );

  useEffect(() => {
    // Load saved prompts from localStorage
    const saved = localStorage.getItem("savedPrompts");
    if (saved) {
      setSavedPrompts(JSON.parse(saved));
    }
  }, []);

  // Charger automatiquement le prompt depuis content-collections si templateToLoad est fourni
  useEffect(() => {
    if (templateToLoad) {
      // Chercher le prompt dans allPrompts
      const promptToLoad = allPrompts.find((p) => p.slug === templateToLoad);

      if (promptToLoad) {
        // Utiliser la nouvelle logique d'extraction pour obtenir tous les prompts du document
        import('@/lib/prompt-extraction').then(({ extractPromptsFromDocument, convertToPromptTemplate }) => {
          const extractedPrompts = extractPromptsFromDocument(promptToLoad);
          
          if (extractedPrompts.length > 0) {
            // Prendre le premier prompt extrait ou permettre à l'utilisateur de choisir
            const primaryPrompt = extractedPrompts[0];
            if (primaryPrompt) {
              const template = convertToPromptTemplate(primaryPrompt, promptToLoad);
              
              setCurrentPrompt(template);
              setActiveTab("editor");
              
              // Initialiser les variables de prévisualisation avec des exemples
              const initialPreviewVars: Record<string, string> = {};
              template.variables.forEach((variable: PromptVariable) => {
                initialPreviewVars[variable.name] = variable.example || `[${variable.name}]`;
              });
              setPreviewVariables(initialPreviewVars);
              
              toast({
                title: "Prompt chargé !",
                description: `"${template.title}" a été chargé avec ${template.variables.length} variables détectées.`,
              });
            }
          } else {
            // Fallback vers l'ancienne méthode si aucun prompt n'est détecté
            const template: PromptTemplate = {
              id: promptToLoad.slug,
              title: promptToLoad.title,
              description: promptToLoad.description || "",
              category: promptToLoad.category,
              difficulty: promptToLoad.difficulty || "débutant",
              targetTool: promptToLoad.targetTool || "",
              content: promptToLoad.content,
              variables: [],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };

            setCurrentPrompt(template);
            setActiveTab("editor");
          }
        });
      } else {
        toast({
          title: "Erreur",
          description: `Le template "${templateToLoad}" n'a pas été trouvé.`,
          variant: "destructive",
        });
      }
    }
  }, [templateToLoad, toast]);

  const handleSavePrompt = () => {
    if (!currentPrompt.title.trim()) {
      toast({
        title: "Erreur",
        description: "Le titre est obligatoire.",
        variant: "destructive",
      });
      return;
    }

    if (!currentPrompt.content.trim()) {
      toast({
        title: "Erreur",
        description: "Le contenu est obligatoire.",
        variant: "destructive",
      });
      return;
    }

    const updatedPrompt = {
      ...currentPrompt,
      id: currentPrompt.id || `prompt_${Date.now()}`,
      updatedAt: new Date().toISOString(),
    };

    // Ajouter le prompt optimiste immédiatement
    addOptimisticPrompt(updatedPrompt);

    // Sauvegarder en arrière-plan
    startSavingTransition(() => {
      const updatedPrompts = savedPrompts.filter(
        (p) => p.id !== currentPrompt.id
      );
      updatedPrompts.push(updatedPrompt);

      setSavedPrompts(updatedPrompts);
      localStorage.setItem("savedPrompts", JSON.stringify(updatedPrompts));

      toast({
        title: "Prompt sauvegardé !",
        description: "Votre prompt a été sauvegardé avec succès.",
      });
    });
  };

  const handleLoadTemplate = (template: PromptTemplate) => {
    setCurrentPrompt(template);
    setActiveTab("editor");

    // Initialize preview variables
    const initialVariables: Record<string, string> = {};
    template.variables.forEach((variable) => {
      initialVariables[variable.name] = variable.example;
    });
    setPreviewVariables(initialVariables);
  };

  const handleDeletePrompt = (id: string) => {
    const updatedPrompts = savedPrompts.filter((p) => p.id !== id);
    setSavedPrompts(updatedPrompts);
    localStorage.setItem("savedPrompts", JSON.stringify(updatedPrompts));

    toast({
      title: "Prompt supprimé",
      description: "Le prompt a été supprimé avec succès.",
    });
  };

  const addVariable = () => {
    const newVariable: PromptVariable = {
      name: "",
      description: "",
      type: "text",
      required: true,
      example: "",
    };
    setCurrentPrompt({
      ...currentPrompt,
      variables: [...currentPrompt.variables, newVariable],
    });
  };

  const updateVariable = (
    index: number,
    field: keyof PromptVariable,
    value: string | number | boolean | string[]
  ) => {
    const updatedVariables = [...currentPrompt.variables];
    const currentVariable = updatedVariables[index];
    if (currentVariable) {
      updatedVariables[index] = { ...currentVariable, [field]: value };
      setCurrentPrompt({ ...currentPrompt, variables: updatedVariables });
    }
  };

  const removeVariable = (index: number) => {
    const updatedVariables = currentPrompt.variables.filter(
      (_, i) => i !== index
    );
    setCurrentPrompt({ ...currentPrompt, variables: updatedVariables });
  };

  const handlePreviewVariableChange = (variableName: string, value: string) => {
    setPreviewVariables((prev) => ({
      ...prev,
      [variableName]: value,
    }));
  };

  const generatePreview = () => {
    let result = currentPrompt.content;

    // Replace variables
    Object.entries(previewVariables).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, "g");
      result = result.replace(regex, value);
    });

    setGeneratedPrompt(result);
  };

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
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="editor">Éditeur</TabsTrigger>
                <TabsTrigger value="preview">Aperçu</TabsTrigger>
                <TabsTrigger value="templates">Modèles</TabsTrigger>
                <TabsTrigger value="saved">Mes Prompts</TabsTrigger>
              </TabsList>

              <TabsContent value="editor" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informations du Prompt</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label
                          htmlFor="prompt-title"
                          className="text-sm font-medium"
                        >
                          Titre
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
                          placeholder="Titre du prompt"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="prompt-description"
                          className="text-sm font-medium"
                        >
                          Description
                        </Label>
                        <Input
                          id="prompt-description"
                          value={currentPrompt.description}
                          onChange={(e) =>
                            setCurrentPrompt({
                              ...currentPrompt,
                              description: e.target.value,
                            })
                          }
                          placeholder="Description du prompt"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="prompt-category"
                          className="text-sm font-medium"
                        >
                          Catégorie
                        </Label>
                        <Select
                          value={currentPrompt.category}
                          onValueChange={(value) =>
                            setCurrentPrompt({
                              ...currentPrompt,
                              category: value,
                            })
                          }
                        >
                          <SelectTrigger id="prompt-category">
                            <SelectValue placeholder="Sélectionner une catégorie" />
                          </SelectTrigger>
                          <SelectContent>
                            {categoryOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label
                          htmlFor="prompt-difficulty"
                          className="text-sm font-medium"
                        >
                          Difficulté
                        </Label>
                        <Select
                          value={currentPrompt.difficulty}
                          onValueChange={(value) =>
                            setCurrentPrompt({
                              ...currentPrompt,
                              difficulty: value,
                            })
                          }
                        >
                          <SelectTrigger id="prompt-difficulty">
                            <SelectValue placeholder="Sélectionner la difficulté" />
                          </SelectTrigger>
                          <SelectContent>
                            {difficultyOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label
                          htmlFor="prompt-target-tool"
                          className="text-sm font-medium"
                        >
                          Outil cible
                        </Label>
                        <Select
                          value={currentPrompt.targetTool}
                          onValueChange={(value) =>
                            setCurrentPrompt({
                              ...currentPrompt,
                              targetTool: value,
                            })
                          }
                        >
                          <SelectTrigger id="prompt-target-tool">
                            <SelectValue placeholder="Sélectionner l'outil" />
                          </SelectTrigger>
                          <SelectContent>
                            {toolOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Contenu du Prompt</CardTitle>
                      <Button
                        size="sm"
                        onClick={handleSavePrompt}
                        disabled={isSaving}
                      >
                        <Save className="w-4 h-4 mr-2" />
                        {isSaving ? "Sauvegarde..." : "Sauvegarder"}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea
                      value={currentPrompt.content}
                      onChange={(e) =>
                        setCurrentPrompt({
                          ...currentPrompt,
                          content: e.target.value,
                        })
                      }
                      placeholder="Écrivez votre prompt ici...
Utilisez {{variable}} pour les variables dynamiques."
                      className="min-h-[300px] font-mono"
                    />

                    <div className="text-sm text-muted-foreground">
                      <p>
                        <strong>Astuce :</strong> Utilisez {"{{nom_variable}}"}{" "}
                        pour insérer des variables dynamiques dans votre prompt.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Variables</CardTitle>
                      <Button size="sm" onClick={addVariable}>
                        <Plus className="w-4 h-4 mr-2" />
                        Ajouter une variable
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {currentPrompt.variables.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <Target className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>Aucune variable définie</p>
                        <p className="text-sm">
                          Ajoutez des variables pour rendre votre prompt
                          dynamique
                        </p>
                      </div>
                    ) : (
                      <Accordion type="multiple" className="w-full">
                        {currentPrompt.variables.map((variable, index) => (
                          <AccordionItem value={`item-${index}`} key={index}>
                            <AccordionTrigger className="hover:no-underline">
                              <div className="flex items-center justify-between w-full pr-4">
                                <span className="font-medium">
                                  Variable {index + 1}:{" "}
                                  {variable.name || "Nouvelle variable"}
                                </span>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={(e) => e.stopPropagation()}
                                      className="ml-2"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>
                                        Supprimer la variable
                                      </AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Êtes-vous sûr de vouloir supprimer cette
                                        variable ? Cette action ne peut pas être
                                        annulée.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>
                                        Annuler
                                      </AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => removeVariable(index)}
                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                      >
                                        Supprimer
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="p-4 space-y-3">
                              <div className="grid md:grid-cols-2 gap-3">
                                <div>
                                  <Label className="text-xs text-muted-foreground">
                                    Nom de la variable
                                  </Label>
                                  <Input
                                    value={variable.name}
                                    onChange={(e) =>
                                      updateVariable(
                                        index,
                                        "name",
                                        e.target.value
                                      )
                                    }
                                    placeholder="nom_variable"
                                  />
                                </div>
                                <div>
                                  <Label className="text-xs text-muted-foreground">
                                    Type
                                  </Label>
                                  <Select
                                    value={variable.type}
                                    onValueChange={(value) =>
                                      updateVariable(index, "type", value)
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {Object.entries(typeLabels).map(
                                        ([value, label]) => (
                                          <SelectItem key={value} value={value}>
                                            {label}
                                          </SelectItem>
                                        )
                                      )}
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>

                              <div>
                                <Label className="text-xs text-muted-foreground">
                                  Description
                                </Label>
                                <Input
                                  value={variable.description}
                                  onChange={(e) =>
                                    updateVariable(
                                      index,
                                      "description",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Description de la variable"
                                />
                              </div>

                              <div>
                                <Label className="text-xs text-muted-foreground">
                                  Exemple
                                </Label>
                                <Input
                                  value={variable.example}
                                  onChange={(e) =>
                                    updateVariable(
                                      index,
                                      "example",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Exemple de valeur"
                                />
                              </div>

                              {variable.type === "list" && (
                                <div>
                                  <Label className="text-xs text-muted-foreground">
                                    Options (séparées par des virgules)
                                  </Label>
                                  <Input
                                    value={variable.options?.join(", ") || ""}
                                    onChange={(e) =>
                                      updateVariable(
                                        index,
                                        "options",
                                        e.target.value
                                          .split(",")
                                          .map((s) => s.trim())
                                      )
                                    }
                                    placeholder="option1, option2, option3"
                                  />
                                </div>
                              )}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Aperçu du Prompt</CardTitle>
                    <CardDescription>
                      Testez votre prompt avec des valeurs d'exemple
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {currentPrompt.variables.length > 0 ? (
                      <div className="space-y-4">
                        <h4 className="font-medium">Variables du prompt :</h4>
                        {currentPrompt.variables.map((variable) => (
                          <div key={variable.name} className="space-y-2">
                            <label className="text-sm font-medium">
                              {variable.name}
                              {variable.required && (
                                <Badge
                                  variant="destructive"
                                  className="text-xs ml-2"
                                >
                                  requis
                                </Badge>
                              )}
                              <Badge variant="outline" className="text-xs ml-2">
                                {typeLabels[variable.type]}
                              </Badge>
                            </label>
                            <p className="text-xs text-muted-foreground">
                              {variable.description}
                            </p>

                            {variable.type === "list" ? (
                              <Select
                                value={previewVariables[variable.name] || ""}
                                onValueChange={(value) =>
                                  handlePreviewVariableChange(
                                    variable.name,
                                    value
                                  )
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionnez une option" />
                                </SelectTrigger>
                                <SelectContent>
                                  {variable.options?.map((option) => (
                                    <SelectItem key={option} value={option}>
                                      {option}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            ) : variable.type === "boolean" ? (
                              <Select
                                value={previewVariables[variable.name] || ""}
                                onValueChange={(value) =>
                                  handlePreviewVariableChange(
                                    variable.name,
                                    value
                                  )
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionnez" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="true">Vrai</SelectItem>
                                  <SelectItem value="false">Faux</SelectItem>
                                </SelectContent>
                              </Select>
                            ) : (
                              <Input
                                type={
                                  variable.type === "number" ? "number" : "text"
                                }
                                value={previewVariables[variable.name] || ""}
                                onChange={(e) =>
                                  handlePreviewVariableChange(
                                    variable.name,
                                    e.target.value
                                  )
                                }
                                placeholder={variable.example}
                              />
                            )}
                          </div>
                        ))}

                        <Button onClick={generatePreview} className="w-full">
                          <Play className="w-4 h-4 mr-2" />
                          Générer l'aperçu
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <Target className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>Aucune variable à prévisualiser</p>
                        <p className="text-sm">
                          Ajoutez des variables dans l'onglet Éditeur
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {generatedPrompt && (
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Prompt Généré</CardTitle>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard(generatedPrompt)}
                          >
                            {copied ? (
                              <>
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Copié
                              </>
                            ) : (
                              <>
                                <Copy className="w-4 h-4 mr-2" />
                                Copier
                              </>
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={downloadPrompt}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Télécharger
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        value={generatedPrompt}
                        readOnly
                        className="min-h-[300px] font-mono text-sm"
                      />
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="templates" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Modèles Prédéfinis</CardTitle>
                    <CardDescription>
                      Utilisez ces modèles comme point de départ pour créer vos
                      prompts
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {allPrompts.map((prompt) => (
                        <Card
                          key={prompt.slug}
                          className="cursor-pointer hover:shadow-md transition-shadow"
                        >
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg">
                                {prompt.title}
                              </CardTitle>
                              <Badge variant="outline" className="text-xs">
                                {prompt.category}
                              </Badge>
                            </div>
                            <CardDescription>
                              {prompt.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <div className="flex items-center justify-between">
                              <div className="flex gap-2">
                                <Badge variant="secondary" className="text-xs">
                                  {prompt.difficulty}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {prompt.targetTool}
                                </Badge>
                              </div>
                              <Button
                                size="sm"
                                onClick={() => {
                                  // Adapter le prompt de allPrompts au format PromptTemplate
                                  const adaptedPrompt: PromptTemplate = {
                                    id: prompt.slug,
                                    title: prompt.title,
                                    description: prompt.description,
                                    category: prompt.category || "technique",
                                    difficulty: prompt.difficulty || "débutant",
                                    targetTool: prompt.targetTool || "chatgpt",
                                    content: prompt.content || "",
                                    variables: (prompt.variables || []).map(
                                      (variable) => ({
                                        name: variable,
                                        description: `Variable ${variable}`,
                                        type: "text" as const,
                                        required: true,
                                        example: "",
                                      })
                                    ),
                                    createdAt: new Date().toISOString(),
                                    updatedAt: new Date().toISOString(),
                                  };
                                  handleLoadTemplate(adaptedPrompt);
                                }}
                              >
                                <Edit3 className="w-4 h-4 mr-2" />
                                Utiliser
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="saved" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Mes Prompts Sauvegardés</CardTitle>
                    <CardDescription>
                      Gérez vos prompts créés et personnalisés
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {optimisticPrompts.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>Aucun prompt sauvegardé</p>
                        <p className="text-sm">
                          Créez votre premier prompt dans l'onglet Éditeur
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {optimisticPrompts.map((prompt) => (
                          <Card key={prompt.id}>
                            <CardHeader className="pb-3">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-lg">
                                  {prompt.title}
                                </CardTitle>
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                      // Adapter le prompt au format attendu par l'éditeur
                                      const adaptedPrompt: PromptTemplate = {
                                        id: prompt.id,
                                        title: prompt.title,
                                        description: prompt.description,
                                        category:
                                          prompt.category || "technique",
                                        difficulty:
                                          prompt.difficulty || "débutant",
                                        targetTool:
                                          prompt.targetTool || "chatgpt",
                                        content: prompt.content || "",
                                        variables: (prompt.variables || []).map(
                                          (variable) => ({
                                            name: variable.name,
                                            description: variable.description,
                                            type: variable.type as
                                              | "text"
                                              | "number"
                                              | "boolean"
                                              | "list",
                                            required: variable.required,
                                            example: variable.example,
                                          })
                                        ),
                                        createdAt: new Date().toISOString(),
                                        updatedAt: new Date().toISOString(),
                                      };
                                      handleLoadTemplate(adaptedPrompt);
                                    }}
                                  >
                                    <Edit3 className="w-4 h-4 mr-2" />
                                    Modifier
                                  </Button>
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button size="sm" variant="outline">
                                        <Trash2 className="w-4 h-4" />
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>
                                          Supprimer le prompt
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                          Êtes-vous sûr de vouloir supprimer ce
                                          prompt ? Cette action ne peut pas être
                                          annulée.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>
                                          Annuler
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                          onClick={() =>
                                            handleDeletePrompt(prompt.id)
                                          }
                                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                        >
                                          Supprimer
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </div>
                              </div>
                              <CardDescription>
                                {prompt.description}
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-0">
                              <div className="flex items-center justify-between">
                                <div className="flex gap-2">
                                  <Badge variant="outline" className="text-xs">
                                    {prompt.category}
                                  </Badge>
                                  <Badge
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {prompt.difficulty}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {prompt.targetTool}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {prompt.variables?.length || 0} variable
                                    {(prompt.variables?.length || 0) > 1
                                      ? "s"
                                      : ""}
                                  </Badge>
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  Créé le{" "}
                                  {new Date(
                                    prompt.createdAt
                                  ).toLocaleDateString()}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Conseils d'utilisation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Variables dynamiques</p>
                    <p className="text-xs text-muted-foreground">
                      Utilisez {"{{variable}}"} pour créer des prompts
                      réutilisables
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Structure claire</p>
                    <p className="text-xs text-muted-foreground">
                      Organisez votre prompt avec des sections bien définies
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Testez régulièrement</p>
                    <p className="text-xs text-muted-foreground">
                      Utilisez l'aperçu pour tester avant de sauvegarder
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Raccourcis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setActiveTab("editor")}
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Créer un prompt
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setActiveTab("templates")}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Voir les modèles
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setActiveTab("saved")}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Mes prompts
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Statistiques</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Prompts créés
                  </span>
                  <span className="font-medium">{savedPrompts.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Variables totales
                  </span>
                  <span className="font-medium">
                    {savedPrompts.reduce(
                      (sum, p) => sum + p.variables.length,
                      0
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Modèles disponibles
                  </span>
                  <span className="font-medium">{allPrompts.length}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
