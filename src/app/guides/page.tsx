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
  Star,
  ArrowRight,
  FileText,
  GraduationCap,
  Lightbulb,
  Target,
  CheckCircle,
  PlayCircle,
} from "lucide-react";
import { allGuides } from "content-collections";

const categoryLabels = {
  prompting: "Prompting 🎯",
  methodology: "Méthodologie 🔬",
  tools: "Outils 🛠️",
  optimization: "Optimisation ⚡",
  security: "Sécurité 🔒",
};

const difficultyLabels = {
  beginner: "Débutant",
  intermediate: "Intermédiaire",
  advanced: "Avancé",
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "prompting":
      return BookOpen;
    case "methodology":
      return GraduationCap;
    case "tools":
      return FileText;
    case "optimization":
      return Target;
    case "security":
      return CheckCircle;
    default:
      return BookOpen;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case "prompting":
      return "bg-blue-500";
    case "methodology":
      return "bg-green-500";
    case "tools":
      return "bg-purple-500";
    case "optimization":
      return "bg-orange-500";
    case "security":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

export default function GuidesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  const filteredGuides = allGuides.filter((guide) => {
    const matchesSearch =
      guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (guide.tags &&
        guide.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        ));
    const matchesCategory =
      selectedCategory === "all" || guide.category === selectedCategory;
    const matchesDifficulty =
      selectedDifficulty === "all" || guide.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <div className="min-h-screen-dynamic bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container-fluid py-section-sm">
          <div className="text-center mb-8 container-tight">
            <h1 className="mb-4">Mes Fiches & Méthodes</h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-none">
              Voici les fiches de synthèse que j'ai créées au fil de mes
              révisions. Elles représentent ma méthodologie de structuration de
              l'information. J'espère qu'elles vous seront utiles, et je vous
              encourage à vous en inspirer pour développer vos propres
              approches.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-4xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Rechercher un guide..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 focus-ring touch-target"
              />
            </div>

            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full sm:w-48 touch-target focus-ring">
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes catégories</SelectItem>
                <SelectItem value="prompting">Prompting</SelectItem>
                <SelectItem value="methodology">Méthodologie</SelectItem>
                <SelectItem value="tools">Outils</SelectItem>
                <SelectItem value="optimization">Optimisation</SelectItem>
                <SelectItem value="security">Sécurité</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={selectedDifficulty}
              onValueChange={setSelectedDifficulty}
            >
              <SelectTrigger className="w-full sm:w-48 touch-target focus-ring">
                <SelectValue placeholder="Difficulté" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous niveaux</SelectItem>
                <SelectItem value="beginner">Débutant</SelectItem>
                <SelectItem value="intermediate">Intermédiaire</SelectItem>
                <SelectItem value="advanced">Avancé</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container-fluid py-section-sm">
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground text-sm sm:text-base">
            {filteredGuides.length} guide{filteredGuides.length > 1 ? "s" : ""}{" "}
            trouvé{filteredGuides.length > 1 ? "s" : ""}
          </p>
        </div>

        <div className="grid-cards">
          {filteredGuides.map((guide, index) => {
            const IconComponent = getCategoryIcon(guide.category);
            return (
              <Card
                key={guide._meta.path}
                className="hover-lift animate-fade-in-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 ${getCategoryColor(
                        guide.category
                      )} rounded-lg flex items-center justify-center shadow-sm`}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="text-xs">
                        {difficultyLabels[guide.difficulty]}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors duration-200">
                    {guide.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {guide.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{guide.readingTime} minutes</span>
                    </div>
                    <div className="flex items-center">
                      <PlayCircle className="w-4 h-4 mr-1" />
                      <span>{guide.duration} minutes</span>
                    </div>
                  </div>
                  
                  {guide.tags && guide.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {guide.tags.slice(0, 3).map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {guide.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{guide.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}

                  <Button
                    className="w-full group focus-ring"
                    onClick={() => window.location.href = `/guides/${guide.slug}`}
                  >
                    Commencer
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredGuides.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Aucun guide trouvé</h3>
            <p className="text-muted-foreground mb-4 max-w-md mx-auto">
              Essayez de modifier vos critères de recherche ou parcourez tous les guides disponibles.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
                setSelectedDifficulty("all");
              }}
              className="focus-ring"
            >
              Réinitialiser les filtres
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

