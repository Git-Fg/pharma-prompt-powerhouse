"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Edit3,
  FileText,
  Network,
  BookOpen,
  PenTool,
  BarChart3,
} from "lucide-react";

// Données des outils avec statuts et catégories
const toolsData = [
  {
    id: "prompt-editor",
    title: "Éditeur de Prompts",
    description:
      "Créez et personnalisez vos propres prompts avec un éditeur avancé",
    category: "creation",
    icon: Edit3,
    color: "bg-blue-500",
    features: [
      "Syntax highlighting",
      "Variables dynamiques",
      "Aperçu en temps réel",
      "Templates pré-configurés",
    ],
    status: "Disponible",
    href: "/boite-a-outils/prompt-editor",
  },
  {
    id: "markdown-editor",
    title: "Éditeur Markdown",
    description: "Rédigez vos fiches de révision et documentation en Markdown",
    category: "documentation",
    icon: FileText,
    color: "bg-green-500",
    features: [
      "Markdown support",
      "Export PDF/HTML",
      "Templates académiques",
      "Collaboration en temps réel",
    ],
    status: "Bientôt disponible",
    href: "#",
  },
  {
    id: "diagram-editor",
    title: "Éditeur de Diagrammes",
    description: "Créez des schémas et diagrammes avec Mermaid",
    category: "visualization",
    icon: Network,
    color: "bg-purple-500",
    features: [
      "Support Mermaid",
      "Export PNG/SVG",
      "Templates pharmaceutiques",
      "Collaboration",
    ],
    status: "Bientôt disponible",
    href: "#",
  },
  {
    id: "flashcards",
    title: "Générateur de Flashcards",
    description: "Générez des cartes Anki pour vos révisions",
    category: "study",
    icon: BookOpen,
    color: "bg-orange-500",
    features: [
      "Format Anki compatible",
      "Génération IA",
      "Personnalisation",
      "Export direct",
    ],
    status: "Disponible",
    href: "/boite-a-outils/flashcards-generator",
  },
  {
    id: "document-prompt",
    title: "Assistant Document Prompt",
    description: "Analysez des documents et générez des prompts pertinents",
    category: "analysis",
    icon: PenTool,
    color: "bg-red-500",
    features: [
      "Upload PDF/DOCX",
      "Extraction de texte",
      "Génération automatique",
      "Optimisation contextuelle",
    ],
    status: "En développement",
    href: "#",
  },
  {
    id: "comparative-table",
    title: "Constructeur de Tableaux Comparatifs",
    description: "Créez des tableaux de comparaison structurés",
    category: "analysis",
    icon: BarChart3,
    color: "bg-indigo-500",
    features: [
      "Templates pharmaceutiques",
      "Export Excel/CSV",
      "Comparaison multi-critères",
      "Mise à jour automatique",
    ],
    status: "Disponible",
    href: "#",
  },
];

const categoryLabels: Record<string, string> = {
  creation: "Création ✨",
  documentation: "Documentation 📝",
  visualization: "Visualisation 🎨",
  study: "Étude 📚",
  analysis: "Analyse 🔍",
};

const statusColors: Record<string, string> = {
  Disponible: "bg-green-100 text-green-800",
  "Bientôt disponible": "bg-yellow-100 text-yellow-800",
  "En développement": "bg-blue-100 text-blue-800",
};

export default function ToolboxPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold">Ma Boîte à Outils</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Une collection d'outils interactifs que j'ai développés pour mes
          propres besoins et optimisés pour les workflows pharmaceutiques.
        </p>
      </div>

      {/* Outils Internes */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Outils Interactifs
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {toolsData.map((tool) => (
            <Card
              key={tool.id}
              className="h-full hover:shadow-lg transition-all duration-200 hover:scale-105"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${tool.color} text-white`}>
                      <tool.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{tool.title}</CardTitle>
                      <Badge
                        variant="secondary"
                        className={`mt-1 ${statusColors[tool.status]}`}
                      >
                        {tool.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <CardDescription className="mt-3">
                  {tool.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <Badge variant="outline" className="text-xs">
                      {categoryLabels[tool.category]}
                    </Badge>
                  </div>
                  <ul className="space-y-1">
                    {tool.features.map((feature, index) => (
                      <li
                        key={index}
                        className="text-sm text-muted-foreground flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  {tool.href !== "#" && (
                    <Link
                      href={tool.href}
                      className="inline-flex items-center gap-2 text-sm text-primary hover:underline mt-3"
                    >
                      Essayer l'outil →
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
