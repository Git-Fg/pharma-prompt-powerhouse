"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Edit3, 
  FileText, 
  Network, 
  BookOpen,
  PenTool,
  Image as ImageIcon,
  BarChart3,
  Code,
  ArrowRight,
  Sparkles,
  Settings,
  Database,
  MessageSquare
} from "lucide-react";

// Tools data
const toolsData = [
  {
    id: "prompt-editor",
    title: "Éditeur de Prompts",
    description: "Créez et personnalisez vos propres prompts avec un éditeur avancé",
    category: "creation",
    icon: Edit3,
    color: "bg-blue-500",
    features: [
      "Syntax highlighting",
      "Variables dynamiques",
      "Aperçu en temps réel",
      "Templates pré-configurés"
    ],
    status: "Disponible"
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
      "Collaboration en temps réel"
    ],
    status: "Disponible"
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
      "Collaboration"
    ],
    status: "Bientôt disponible"
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
      "Export direct"
    ],
    status: "Disponible"
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
      "Optimisation contextuelle"
    ],
    status: "En développement"
  },
  {
    id: "comparative-table",
    title: "Constructeur de Tableaux Comparatifs",
    description: "Créez des tableaux comparatifs pour médicaments et concepts",
    category: "analysis",
    icon: BarChart3,
    color: "bg-indigo-500",
    features: [
      "Templates pharmaceutiques",
      "Comparaison multi-critères",
      "Export Excel/PDF",
      "Visualisation avancée"
    ],
    status: "Bientôt disponible"
  },
  {
    id: "mnemonic-generator",
    title: "Générateur de Mnémoniques",
    description: "Créez des aides-mémoire pour les concepts complexes",
    category: "study",
    icon: ImageIcon,
    color: "bg-pink-500",
    features: [
      "Génération créative",
      "Personnalisation",
      "Support multimédia",
      "Partage facile"
    ],
    status: "En développement"
  },
  {
    id: "context-optimizer",
    title: "Optimiseur de Contexte",
    description: "Optimisez vos prompts pour une meilleure compréhension par l'IA",
    category: "optimization",
    icon: Database,
    color: "bg-teal-500",
    features: [
      "Analyse de contexte",
      "Suggestions d'optimisation",
      "Gestion de la fenêtre de contexte",
      "Performance tracking"
    ],
    status: "Bientôt disponible"
  },
  {
    id: "exam-generator",
    title: "Générateur de Questions d'Examen",
    description: "Créez des questions d'examen types pour vos révisions",
    category: "study",
    icon: MessageSquare,
    color: "bg-cyan-500",
    features: [
      "Types de questions variés",
      "Difficulté ajustable",
      "Correction automatique",
      "Suivi des progrès"
    ],
    status: "En développement"
  }
];

const categoryLabels = {
  creation: "Création 🎨",
  documentation: "Documentation 📝",
  visualization: "Visualisation 📊",
  study: "Étude 📚",
  analysis: "Analyse 🔍",
  optimization: "Optimisation ⚡"
};

const statusLabels = {
  "Disponible": { label: "Disponible", variant: "default" as const },
  "Bientôt disponible": { label: "Bientôt disponible", variant: "secondary" as const },
  "En développement": { label: "En développement", variant: "outline" as const }
};

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4">
              <Settings className="w-4 h-4 mr-2" />
              Mes Outils
            </Badge>
            <h1 className="text-4xl font-bold mb-4">Mes Outils Interactifs</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              J'ai développé ces outils pour vous aider à créer, tester et optimiser vos prompts. 
              Chaque outil est conçu pour répondre à un besoin spécifique dans votre apprentissage.
            </p>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {toolsData.map((tool) => {
            const IconComponent = tool.icon;
            const statusConfig = statusLabels[tool.status as keyof typeof statusLabels];
            
            return (
              <Card key={tool.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 ${tool.color} rounded-lg flex items-center justify-center`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <Badge variant={statusConfig.variant} className="text-xs">
                      {statusConfig.label}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl line-clamp-2">{tool.title}</CardTitle>
                  <CardDescription className="line-clamp-3">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs">
                        {categoryLabels[tool.category]}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm text-muted-foreground">
                        Fonctionnalités :
                      </h4>
                      <ul className="space-y-1">
                        {tool.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Sparkles className="w-3 h-3 text-primary" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button 
                      size="sm" 
                      className="w-full"
                      disabled={tool.status !== "Disponible"}
                    >
                      {tool.status === "Disponible" ? (
                        <>
                          Essayer l'outil
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      ) : tool.status === "Bientôt disponible" ? (
                        "Notifications à venir"
                      ) : (
                        "En développement"
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="mt-16">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Mon Approche du Développement</CardTitle>
            </CardHeader>
            <CardContent className="max-w-3xl mx-auto text-center">
              <p className="text-muted-foreground leading-relaxed mb-4">
                Je développe ces outils en fonction de mes propres besoins et des retours que je reçois. 
                Chaque outil est testé et validé dans un contexte réel d'études en pharmacie avant d'être partagé.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Cette approche me permet de m'assurer que chaque outil répond à un besoin réel 
                et apporte une réelle valeur ajoutée à votre apprentissage.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}