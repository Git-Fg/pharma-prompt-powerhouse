
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  ArrowRight,
} from "lucide-react";
import { CollectionPageLayout } from '@/components/layout/CollectionPageLayout';

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
  // Calculate statistics
  const totalTools = toolsData.length;
  const availableTools = toolsData.filter(t => t.status === "Disponible").length;
  const categoriesCount = new Set(toolsData.map(t => t.category)).size;
  const inDevelopment = toolsData.filter(t => t.status === "En développement").length;

  const stats = [
    { value: totalTools, label: 'Outils planifiés', colorClass: 'text-blue-600 dark:text-blue-400', bgClass: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/30 border-blue-200 dark:border-blue-800' },
    { value: availableTools, label: 'Disponibles', colorClass: 'text-green-600 dark:text-green-400', bgClass: 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/30 border-green-200 dark:border-green-800' },
    { value: categoriesCount, label: 'Catégories', colorClass: 'text-purple-600 dark:text-purple-400', bgClass: 'bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/30 border-purple-200 dark:border-purple-800' },
    { value: inDevelopment, label: 'En développement', colorClass: 'text-orange-600 dark:text-orange-400', bgClass: 'bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/50 dark:to-orange-900/30 border-orange-200 dark:border-orange-800' },
  ];

  return (
    <CollectionPageLayout
      title="Ma Boîte à Outils"
      description="Une collection d'outils interactifs que j'ai développés pour mes propres besoins et optimisés pour les workflows pharmaceutiques."
      stats={stats}
      contentMaxWidth="6xl"
    >
      {/* Outils Internes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {toolsData.map((tool) => (
          <Card
            key={tool.id}
            className="group flex flex-col hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <CardHeader className="flex-grow">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${tool.color} text-white`}>
                    <tool.icon className="size-5" />
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
                {tool.href !== "#" ? (
                  <Button asChild className="w-full">
                    <Link href={tool.href}>
                      Essayer l'outil
                      <ArrowRight className="size-4 ml-2" />
                    </Link>
                  </Button>
                ) : (
                  <Button disabled className="w-full">
                    Bientôt disponible
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </CollectionPageLayout>
  );
}
