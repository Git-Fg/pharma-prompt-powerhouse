"use client";

import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Badge,
} from "@/components/ui";
import { PromptForm } from "@/components/prompts/PromptForm";
import { PromptList } from "@/components/prompts/PromptList";
import { CodeBlock } from "@/components/ui/code-block";
import { CopyButton } from "@/components/ui/copy-button";
import { Sparkles, Code, FileText, Users, Zap } from "lucide-react";

// Données de démonstration
const demoPrompts = [
  {
    id: "1",
    title: "Analyse de cas clinique complexe",
    description:
      "Prompt pour analyser des cas cliniques complexes avec analyse des facteurs de risque et recommandations thérapeutiques.",
    content:
      "En tant qu'expert en pharmacie clinique, analysez le cas suivant...",
    category: "clinical",
    tags: ["cas clinique", "analyse", "thérapeutique"],
    difficulty: "advanced" as const,
    createdAt: "2025-01-15",
    usageCount: 45,
  },
  {
    id: "2",
    title: "Recherche bibliographique ciblée",
    description:
      "Méthode pour effectuer des recherches bibliographiques ciblées dans les bases de données médicales.",
    content: "Effectuez une recherche bibliographique sur...",
    category: "research",
    tags: ["recherche", "bibliographie", "médecine"],
    difficulty: "intermediate" as const,
    createdAt: "2025-01-10",
    usageCount: 32,
  },
  {
    id: "3",
    title: "Création de fiches de révision",
    description:
      "Template pour créer des fiches de révision efficaces en pharmacie.",
    content: "Créez une fiche de révision structurée pour...",
    category: "education",
    tags: ["révision", "fiches", "apprentissage"],
    difficulty: "beginner" as const,
    createdAt: "2025-01-05",
    usageCount: 78,
  },
];

export function ModernComponentsDemo() {
  const [activeTab, setActiveTab] = useState("components");

  const tabs = [
    { id: "components", label: "Composants UI", icon: Code },
    { id: "forms", label: "Formulaires", icon: FileText },
    { id: "lists", label: "Listes", icon: Users },
    { id: "code", label: "Blocs de code", icon: Zap },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">
            Démonstration des Composants Modernes
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Découvrez les nouvelles fonctionnalités et composants modernisés de
          votre application pharma-prompt-powerhouse
        </p>
      </div>

      {/* Navigation par onglets */}
      <div className="flex justify-center">
        <div className="flex rounded-lg border bg-muted p-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2"
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Contenu des onglets */}
      <div className="space-y-8">
        {activeTab === "components" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Composants UI Modernisés</h2>

            {/* Boutons */}
            <Card>
              <CardHeader>
                <CardTitle>Boutons et Interactions</CardTitle>
                <CardDescription>
                  Nouveaux boutons avec animations et états
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <Button>Bouton Principal</Button>
                  <Button variant="outline">Bouton Contour</Button>
                  <Button variant="secondary">Bouton Secondaire</Button>
                  <Button variant="destructive">Bouton Destructeur</Button>
                  <Button variant="ghost">Bouton Fantôme</Button>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button size="sm">Petit</Button>
                  <Button size="default">Normal</Button>
                  <Button size="lg">Grand</Button>
                </div>
              </CardContent>
            </Card>

            {/* Badges */}
            <Card>
              <CardHeader>
                <CardTitle>Badges et Indicateurs</CardTitle>
                <CardDescription>
                  Badges avec couleurs contextuelles
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge>Défaut</Badge>
                  <Badge variant="secondary">Secondaire</Badge>
                  <Badge variant="outline">Contour</Badge>
                  <Badge variant="destructive">Destructeur</Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Succès
                  </Badge>
                  <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                    Attention
                  </Badge>
                  <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                    Erreur
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "forms" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">
              Formulaires avec Actions React 19
            </h2>
            <PromptForm />
          </div>
        )}

        {activeTab === "lists" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">
              Listes avec useOptimistic
            </h2>
            <PromptList prompts={demoPrompts} />
          </div>
        )}

        {activeTab === "code" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">
              Blocs de Code avec Bouton de Copie
            </h2>

            {/* Bloc de code simple */}
            <Card>
              <CardHeader>
                <CardTitle>Bloc de Code Simple</CardTitle>
                <CardDescription>Avec bouton de copie intégré</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="group relative">
                  <pre className="mb-4 mt-6 overflow-x-auto rounded-lg bg-muted p-4">
                    <code className="language-javascript">
                      {`function generatePrompt(template, variables) {
  return template.replace(/\\{\\{([^}]+)\\}\\}/g, (match, key) => {
    return variables[key] || match;
  });
}`}
                    </code>
                  </pre>
                  <CopyButton
                    text={`function generatePrompt(template, variables) {
  return template.replace(/\{\{([^}]+)\}\}/g, (match, key) => {
    return variables[key] || match;
  });
}`}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Bloc de code avancé */}
            <Card>
              <CardHeader>
                <CardTitle>Bloc de Code Avancé</CardTitle>
                <CardDescription>
                  Avec nom de fichier et numéros de ligne
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  language="typescript"
                  filename="prompt-generator.ts"
                  showLineNumbers
                >
                  {`interface PromptTemplate {
  id: string;
  title: string;
  content: string;
  variables: string[];
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

class PromptGenerator {
  private templates: PromptTemplate[] = [];

  addTemplate(template: PromptTemplate): void {
    this.templates.push(template);
  }

  generatePrompt(templateId: string, variables: Record<string, string>): string {
    const template = this.templates.find(t => t.id === templateId);
    if (!template) {
      throw new Error(\`Template \${templateId} not found\`);
    }

    return template.content.replace(/\\{\\{([^}]+)\\}\\}/g, (match, key) => {
      return variables[key] || match;
    });
  }
}`}
                </CodeBlock>
              </CardContent>
            </Card>

            {/* Bloc de code avec syntaxe highlight */}
            <Card>
              <CardHeader>
                <CardTitle>Bloc de Code avec Coloration Syntaxique</CardTitle>
                <CardDescription>
                  Utilisant Shiki pour une coloration optimale
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="group relative">
                  <pre className="mb-4 mt-6 overflow-x-auto rounded-lg bg-muted p-4">
                    <code className="language-python">
                      {`import re
from typing import Dict, List, Optional

class PromptAnalyzer:
    def __init__(self):
        self.patterns = {
            'variables': r'\\{\\{([^}]+)\\}\\}',
            'instructions': r'(?:Instructions?|Steps?|Guidelines?):\\s*(.+?)(?=\\n|$)',
            'output_format': r'(?:Output|Response|Format):\\s*(.+?)(?=\\n|$)'
        }
    
    def extract_variables(self, prompt: str) -> List[str]:
        """Extrait les variables du prompt."""
        matches = re.findall(self.patterns['variables'], prompt)
        return list(set(matches))
    
    def analyze_prompt(self, prompt: str) -> Dict[str, any]:
        """Analyse complète d'un prompt."""
        return {
            'variables': self.extract_variables(prompt),
            'length': len(prompt),
            'complexity': self.calculate_complexity(prompt)
        }
    
    def calculate_complexity(self, prompt: str) -> float:
        """Calcule la complexité d'un prompt."""
        # Logique de calcul de complexité
        return len(prompt.split()) / 100.0`}
                    </code>
                  </pre>
                  <CopyButton
                    text={`import re
from typing import Dict, List, Optional

class PromptAnalyzer:
    def __init__(self):
        self.patterns = {
            'variables': r'\\{\\{([^}]+)\\}\\}',
            'instructions': r'(?:Instructions?|Steps?|Guidelines?):\\s*(.+?)(?=\\n|$)',
            'output_format': r'(?:Output|Response|Format):\\s*(.+?)(?=\\n|$)'
        }
    
    def extract_variables(self, prompt: str) -> List[str]:
        """Extrait les variables du prompt."""
        matches = re.findall(self.patterns['variables'], prompt)
        return list(set(matches))
    
    def analyze_prompt(self, prompt: str) -> Dict[str, any]:
        """Analyse complète d'un prompt."""
        return {
            'variables': self.extract_variables(prompt),
            'length': len(prompt),
            'complexity': self.calculate_complexity(prompt)
        }
    
    def calculate_complexity(self, prompt: str) -> float:
        """Calcule la complexité d'un prompt."""
        # Logique de calcul de complexité
        return len(prompt.split()) / 100.0`}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
