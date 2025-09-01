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
  BookOpen,
  Clock,
  ArrowRight,
  FileText,
  GraduationCap,
  Lightbulb,
  Target,
  CheckCircle,
  PlayCircle,
  Brain,
  Zap,
  Heart,
} from "lucide-react";
import { allGuides } from "content-collections";
import { useFavorites } from "@/hooks/useFavorites";
import { cn } from "@/lib/utils";

const _categoryLabels = {
  prompting: "Prompting 🎯",
  methodologie: "Méthodologie 🔬",
  tools: "Outils 🛠️",
  optimization: "Optimisation ⚡",
  security: "Sécurité 🔒",
  "ia-modernes": "IA Modernes 🤖",
  "cas-pratiques": "Cas Pratiques 💼",
  ressources: "Ressources 📚",
  fondamentaux: "Fondamentaux 🧠",
  "techniques-avancees": "Techniques Avancées ⚡",
};

const difficultyLabels = {
  débutant: "Débutant",
  intermédiaire: "Intermédiaire",
  avancé: "Avancé",
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "prompting":
      return BookOpen;
    case "methodologie":
      return GraduationCap;
    case "tools":
      return FileText;
    case "optimization":
      return Target;
    case "security":
      return CheckCircle;
    case "ia-modernes":
      return Lightbulb;
    case "cas-pratiques":
      return PlayCircle;
    case "ressources":
      return FileText;
    case "fondamentaux":
      return Brain;
    case "techniques-avancees":
      return Zap;
    default:
      return BookOpen;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case "prompting":
      return "bg-blue-500";
    case "methodologie":
      return "bg-green-500";
    case "tools":
      return "bg-purple-500";
    case "optimization":
      return "bg-orange-500";
    case "security":
      return "bg-red-500";
    case "ia-modernes":
      return "bg-indigo-500";
    case "cas-pratiques":
      return "bg-teal-500";
    case "ressources":
      return "bg-purple-500";
    case "fondamentaux":
      return "bg-blue-600";
    case "techniques-avancees":
      return "bg-orange-600";
    default:
      return "bg-gray-500";
  }
};

export default function GuidesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const { toggleFavorite, isFavorite } = useFavorites("favoriteGuides");

  const filteredGuides = allGuides.filter((guide) => {
    const matchesSearch =
      guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (guide.tags &&
        guide.tags.some((tag) =>
          tag.name.toLowerCase().includes(searchTerm.toLowerCase())
        ));
    const matchesCategory =
      selectedCategory === "all" || guide.category === selectedCategory;
    const matchesDifficulty =
      selectedDifficulty === "all" || guide.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Mes Fiches & Méthodes</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Voici les fiches de synthèse que j'ai créées au fil de mes
              révisions. Elles représentent ma méthodologie de structuration de
              l'information. J'espère qu'elles vous seront utiles, et je vous
              encourage à vous en inspirer pour développer vos propres
              approches.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-4 max-w-4xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Rechercher un guide..."
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
                <SelectItem value="fondamentaux">Fondamentaux</SelectItem>
                <SelectItem value="methodologie">Méthodologie</SelectItem>
                <SelectItem value="ressources">Ressources</SelectItem>
                <SelectItem value="techniques-avancees">
                  Techniques Avancées
                </SelectItem>
                <SelectItem value="cas-pratiques">Cas Pratiques</SelectItem>
                <SelectItem value="prompting">Prompting</SelectItem>
                <SelectItem value="tools">Outils</SelectItem>
                <SelectItem value="optimization">Optimisation</SelectItem>
                <SelectItem value="security">Sécurité</SelectItem>
                <SelectItem value="ia-modernes">IA Modernes</SelectItem>
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
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            {filteredGuides.length} guide{filteredGuides.length > 1 ? "s" : ""}{" "}
            trouvé{filteredGuides.length > 1 ? "s" : ""}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map((guide) => {
            const IconComponent = getCategoryIcon(
              guide.category || "prompting"
            );
            return (
              <Card
                key={guide.slug}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div
                      className={`w-12 h-12 ${getCategoryColor(
                        guide.category || "prompting"
                      )} rounded-lg flex items-center justify-center`}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="text-xs">
                        {guide.difficulty
                          ? difficultyLabels[guide.difficulty]
                          : "Non spécifié"}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-8 h-8"
                        onClick={(e) => {
                          e.preventDefault(); // Empêche la navigation si la carte est un lien
                          toggleFavorite(guide.slug);
                        }}
                      >
                        <Heart
                          className={cn(
                            "w-5 h-5",
                            isFavorite(guide.slug)
                              ? "text-red-500 fill-red-500"
                              : "text-muted-foreground"
                          )}
                        />
                      </Button>
                    </div>
                  </div>
                  <CardTitle className="text-lg font-semibold group-hover:text-blue-600 transition-colors">
                    {guide.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600 line-clamp-2">
                    {guide.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{guide.estimatedTime || "Non spécifié"}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <BookOpen className="w-4 h-4" />
                        <span>{guide.category || "Non spécifié"}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {guide.tags &&
                        guide.tags.slice(0, 3).map((tag, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {tag.name}
                          </Badge>
                        ))}
                      {guide.tags && guide.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{guide.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    <Button
                      className="w-full group-hover:bg-blue-600 transition-colors"
                      asChild
                    >
                      <a href={`/guides/${guide.slug}`}>
                        Commencer
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredGuides.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Aucun guide trouvé</h3>
            <p className="text-muted-foreground">
              Essayez de modifier vos filtres ou votre recherche.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
