"use client";

import { useState, useEffect } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
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
  Clock,
  Lightbulb,
  CheckCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";

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
];

const typeLabels = {
  text: "Texte",
  number: "Nombre",
  boolean: "Booléen",
  list: "Liste",
};

const templates: PromptTemplate[] = [
  {
    id: "1",
    title: "Analyse Pharmacologique",
    description: "Template pour l'analyse détaillée d'un médicament",
    category: "analysis",
    difficulty: "intermediate",
    targetTool: "claude",
    content: `Agis comme un pharmacien clinicien expert. Tu dois analyser {{médicament}} en incluant :

## Mécanisme d'action
[Explique le mécanisme d'action détaillé]

## Pharmacocinétique
- Absorption : [détails]
- Distribution : [détails]
- Métabolisme : [détails]
- Élimination : [détails]

## Indications thérapeutiques
[Liste des principales indications]

## Effets secondaires
- Fréquents : [liste]
- Rares mais graves : [liste]

## Contre-indications
- Absolues : [liste]
- Relatives : [liste]

## Interactions médicamenteuses
[Interactions majeures à considérer]

## Surveillance recommandée
[Paramètres à surveiller et fréquence]`,
    variables: [
      {
        name: "médicament",
        description: "Nom du médicament à analyser",
        type: "text",
        required: true,
        example: "atorvastatine",
      },
    ],
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: "2",
    title: "Étude de Cas Clinique",
    description: "Template pour l'analyse de cas cliniques complexes",
    category: "methodology",
    difficulty: "advanced",
    targetTool: "chatgpt",
    content: `Agis comme un pharmacien clinicien expérimenté. Analyse le cas clinique suivant :

## Données Patient
- Âge : {{âge}}
- Sexe : {{sexe}}
- Poids : {{poids}}
- Antécédents : {{antécédents}}
- Allergies : {{allergies}}

## Motif de consultation
{{motif}}

## Traitement actuel
{{traitement}}

## Problèmes pharmacothérapeutiques identifiés
1. [Problème 1 avec justification]
2. [Problème 2 avec justification]

## Recommandations
### Au patient
- [Recommandation 1]
- [Recommandation 2]

### Au médecin
- [Recommandation 1]
- [Recommandation 2]

## Surveillance
- [Paramètres à surveiller]
- [Fréquence de surveillance]`,
    variables: [
      {
        name: "âge",
        description: "Âge du patient",
        type: "number",
        required: true,
        example: "65",
      },
      {
        name: "sexe",
        description: "Sexe du patient",
        type: "text",
        required: true,
        example: "Masculin",
      },
      {
        name: "poids",
        description: "Poids du patient en kg",
        type: "number",
        required: true,
        example: "70",
      },
      {
        name: "antécédents",
        description: "Antécédents médicaux du patient",
        type: "text",
        required: true,
        example: "Diabète de type 2, HTA",
      },
      {
        name: "allergies",
        description: "Allergies connues du patient",
        type: "text",
        required: false,
        example: "Pénicilline",
      },
      {
        name: "motif",
        description: "Motif de consultation ou d'hospitalisation",
        type: "text",
        required: true,
        example: "Contrôle de traitement anticoagulant",
      },
      {
        name: "traitement",
        description: "Traitement médicamenteux actuel",
        type: "text",
        required: true,
        example: "Warfarine 5mg, Lisinopril 20mg",
      },
    ],
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
];

export default function PromptEditorPage() {
  const router = useRouter();
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

  useEffect(() => {
    // Load saved prompts from localStorage
    const saved = localStorage.getItem("savedPrompts");
    if (saved) {
      setSavedPrompts(JSON.parse(saved));
    }
  }, []);

  const handleSavePrompt = () => {
    const updatedPrompt = {
      ...currentPrompt,
      updatedAt: new Date().toISOString(),
    };

    const updatedPrompts = savedPrompts.filter(
      (p) => p.id !== currentPrompt.id
    );
    updatedPrompts.push(updatedPrompt);

    setSavedPrompts(updatedPrompts);
    localStorage.setItem("savedPrompts", JSON.stringify(updatedPrompts));

    // Show success message
    alert("Prompt sauvegardé avec succès !");
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
    if (confirm("Êtes-vous sûr de vouloir supprimer ce prompt ?")) {
      const updatedPrompts = savedPrompts.filter((p) => p.id !== id);
      setSavedPrompts(updatedPrompts);
      localStorage.setItem("savedPrompts", JSON.stringify(updatedPrompts));
    }
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
    value: any
  ) => {
    const updatedVariables = [...currentPrompt.variables];
    updatedVariables[index] = { ...updatedVariables[index], [field]: value };
    setCurrentPrompt({ ...currentPrompt, variables: updatedVariables });
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
    } catch (err) {
      console.error("Failed to copy text: ", err);
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
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/tools")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux outils
            </Button>
            <div className="flex-1">
              <h1 className="text-3xl font-bold">Éditeur de Prompts</h1>
              <p className="text-muted-foreground mt-2">
                Créez et personnalisez vos propres prompts avec notre éditeur
                avancé
              </p>
            </div>
          </div>
        </div>
      </div>

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
                        <label className="text-sm font-medium">Titre</label>
                        <Input
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
                        <label className="text-sm font-medium">
                          Description
                        </label>
                        <Input
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
                        <label className="text-sm font-medium">Catégorie</label>
                        <Select
                          value={currentPrompt.category}
                          onValueChange={(value) =>
                            setCurrentPrompt({
                              ...currentPrompt,
                              category: value,
                            })
                          }
                        >
                          <SelectTrigger>
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
                        <label className="text-sm font-medium">
                          Difficulté
                        </label>
                        <Select
                          value={currentPrompt.difficulty}
                          onValueChange={(value) =>
                            setCurrentPrompt({
                              ...currentPrompt,
                              difficulty: value,
                            })
                          }
                        >
                          <SelectTrigger>
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
                        <label className="text-sm font-medium">
                          Outil cible
                        </label>
                        <Select
                          value={currentPrompt.targetTool}
                          onValueChange={(value) =>
                            setCurrentPrompt({
                              ...currentPrompt,
                              targetTool: value,
                            })
                          }
                        >
                          <SelectTrigger>
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
                      <Button size="sm" onClick={handleSavePrompt}>
                        <Save className="w-4 h-4 mr-2" />
                        Sauvegarder
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
                      <div className="space-y-4">
                        {currentPrompt.variables.map((variable, index) => (
                          <div
                            key={index}
                            className="border rounded-lg p-4 space-y-3"
                          >
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">
                                Variable {index + 1}
                              </h4>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => removeVariable(index)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>

                            <div className="grid md:grid-cols-2 gap-3">
                              <div>
                                <label className="text-xs text-muted-foreground">
                                  Nom de la variable
                                </label>
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
                                <label className="text-xs text-muted-foreground">
                                  Type
                                </label>
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
                              <label className="text-xs text-muted-foreground">
                                Description
                              </label>
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
                              <label className="text-xs text-muted-foreground">
                                Exemple
                              </label>
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
                                <label className="text-xs text-muted-foreground">
                                  Options (séparées par des virgules)
                                </label>
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
                          </div>
                        ))}
                      </div>
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
                      {templates.map((template) => (
                        <Card
                          key={template.id}
                          className="cursor-pointer hover:shadow-md transition-shadow"
                        >
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg">
                                {template.title}
                              </CardTitle>
                              <Badge variant="outline" className="text-xs">
                                {template.category}
                              </Badge>
                            </div>
                            <CardDescription>
                              {template.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <div className="flex items-center justify-between">
                              <div className="flex gap-2">
                                <Badge variant="secondary" className="text-xs">
                                  {template.difficulty}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {template.targetTool}
                                </Badge>
                              </div>
                              <Button
                                size="sm"
                                onClick={() => handleLoadTemplate(template)}
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
                    {savedPrompts.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>Aucun prompt sauvegardé</p>
                        <p className="text-sm">
                          Créez votre premier prompt dans l'onglet Éditeur
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {savedPrompts.map((prompt) => (
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
                                    onClick={() => handleLoadTemplate(prompt)}
                                  >
                                    <Edit3 className="w-4 h-4 mr-2" />
                                    Modifier
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() =>
                                      handleDeletePrompt(prompt.id)
                                    }
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
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
                                    {prompt.variables.length} variable
                                    {prompt.variables.length > 1 ? "s" : ""}
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
                  <span className="font-medium">{templates.length}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
