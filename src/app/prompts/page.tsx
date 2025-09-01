"use client";

import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Copy,
  Eye,
  Code,
  FileText,
  PenTool,
  BookOpen,
  Microscope,
  Clock,
} from "lucide-react";
import { allPrompts } from "content-collections";
// Unused imports - keeping them for potential future use
// import { getPromptsByCategory, getPromptsByTool } from "@/lib/content-utils";
import Link from "next/link";

const difficultyLabels = {
  débutant: "Débutant",
  intermédiaire: "Intermédiaire",
  avancé: "Avancé",
};

const toolLabels = {
  chatgpt: "ChatGPT",
  claude: "Claude",
  perplexity: "Perplexity",
  "ai.dev": "AI.dev",
  "z.ai": "Z.ai",
  gemini: "Gemini",
  "gemini-deep-research": "Gemini Deep Research",
  "vertex-ai": "Vertex AI",
  notebooklm: "NotebookLM",
  "glass-ia": "Glass IA",
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "technique":
      return Code;
    case "analyse":
      return Microscope;
    case "créatif":
      return PenTool;
    case "documentation":
      return BookOpen;
    case "recherche":
      return Microscope;
    default:
      return FileText;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case "technique":
      return "bg-blue-500";
    case "analyse":
      return "bg-green-500";
    case "créatif":
      return "bg-purple-500";
    case "documentation":
      return "bg-orange-500";
    case "recherche":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

export default function PromptsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedTool, setSelectedTool] = useState("all");

  const filteredPrompts = allPrompts.filter((prompt) => {
    const matchesSearch =
      prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prompt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (prompt.tags &&
        prompt.tags.some((tag) =>
          tag.name.toLowerCase().includes(searchTerm.toLowerCase())
        ));
    const matchesCategory =
      selectedCategory === "all" || prompt.category === selectedCategory;
    const matchesDifficulty =
      selectedDifficulty === "all" || prompt.difficulty === selectedDifficulty;
    const matchesTool =
      selectedTool === "all" || prompt.targetTool === selectedTool;

    return matchesSearch && matchesCategory && matchesDifficulty && matchesTool;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">
              Ma Collection de Prompts
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              J'ai sélectionné et optimisé ces prompts pour vous accompagner
              dans vos projets en pharmacie et sciences de la santé. Chaque
              prompt a été testé et affiné pour garantir des résultats de
              qualité.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-4 max-w-4xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Rechercher un prompt..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes catégories</SelectItem>
                <SelectItem value="technique">Technique</SelectItem>
                <SelectItem value="analyse">Analyse</SelectItem>
                <SelectItem value="créatif">Créatif</SelectItem>
                <SelectItem value="documentation">Documentation</SelectItem>
                <SelectItem value="recherche">Recherche</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={selectedDifficulty}
              onValueChange={setSelectedDifficulty}
            >
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Difficulté" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous niveaux</SelectItem>
                <SelectItem value="débutant">Débutant</SelectItem>
                <SelectItem value="intermédiaire">Intermédiaire</SelectItem>
                <SelectItem value="avancé">Avancé</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedTool} onValueChange={setSelectedTool}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Outil" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous outils</SelectItem>
                <SelectItem value="chatgpt">ChatGPT</SelectItem>
                <SelectItem value="claude">Claude</SelectItem>
                <SelectItem value="perplexity">Perplexity</SelectItem>
                <SelectItem value="ai.dev">AI.dev</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            {filteredPrompts.length} prompt
            {filteredPrompts.length > 1 ? "s" : ""} trouvé
            {filteredPrompts.length > 1 ? "s" : ""}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrompts.map((prompt) => {
            const IconComponent = getCategoryIcon(prompt.category);
            return (
              <Card
                key={prompt.slug}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div
                      className={`w-12 h-12 ${getCategoryColor(
                        prompt.category
                      )} rounded-lg flex items-center justify-center`}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="text-xs">
                        {prompt.difficulty
                          ? difficultyLabels[prompt.difficulty]
                          : "Non spécifié"}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-lg font-semibold group-hover:text-blue-600 transition-colors">
                    {prompt.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600 line-clamp-2">
                    {prompt.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{prompt.estimatedTime}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4" />
                        <span>
                          {toolLabels[
                            prompt.targetTool as keyof typeof toolLabels
                          ] || prompt.targetTool}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {prompt.tags &&
                        prompt.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag.name}
                            variant="outline"
                            className="text-xs"
                          >
                            {tag.name}
                          </Badge>
                        ))}
                      {prompt.tags && prompt.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{prompt.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 group-hover:border-blue-600 transition-colors"
                        asChild
                      >
                        <Link href={`/prompts/${prompt.slug}`}>
                          <Eye className="w-4 h-4 mr-2" />
                          Voir
                        </Link>
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 group-hover:bg-blue-600 transition-colors"
                        onClick={() => {
                          navigator.clipboard.writeText(prompt._meta.content || "");
                          // Optionnel : ajouter un toast de confirmation
                        }}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copier
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredPrompts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Aucun prompt trouvé</h3>
            <p className="text-muted-foreground">
              Essayez de modifier vos filtres ou votre recherche.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
