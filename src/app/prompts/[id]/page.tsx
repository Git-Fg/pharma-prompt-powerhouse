import { notFound } from "next/navigation";
import Link from "next/link";
import { allPrompts } from "content-collections";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Target, BookOpen, Edit3 } from "lucide-react";
import { CodeBlock } from "@/components/ui/code-block";

// Génération des paramètres statiques pour le build
export async function generateStaticParams() {
  return allPrompts.map((prompt) => ({
    id: prompt.slug,
  }));
}

const categoryLabels = {
  technique: "Technique ⚙️",
  analyse: "Analyse 🔍",
  créatif: "Créatif ✨",
  documentation: "Documentation 📝",
  recherche: "Recherche 🔬",
  pharmacologie: "Pharmacologie 💊",
  "cas-cliniques": "Cas Cliniques 🏥",
  révision: "Révision 📚",
  diagnostic: "Diagnostic 🔬",
};

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

export default async function PromptDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const foundPrompt = allPrompts.find((p) => p.slug === id) || null;

  if (!foundPrompt) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header commun */}
      <header className="mb-8">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/prompts">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux prompts
          </Link>
        </Button>
        <h1 className="text-4xl font-bold tracking-tight">
          {foundPrompt.title}
        </h1>
        <p className="text-xl text-muted-foreground mt-2">
          {foundPrompt.description}
        </p>

        {/* Bouton pour utiliser le prompt dans l'éditeur */}
        <div className="mt-6">
          <Button asChild size="lg" className="group">
            <Link
              href={`/boite-a-outils/prompt-editor?template=${foundPrompt.slug}`}
            >
              <Edit3 className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
              Utiliser ce prompt dans l'éditeur
            </Link>
          </Button>
        </div>
      </header>

      {/* Contenu principal en lecture seule */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Prompt Brut</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Voici le template de base. Copiez-le ou utilisez le bouton
                ci-dessus pour le personnaliser dans l'éditeur.
              </p>
              <CodeBlock language="markdown" showLineNumbers>
                {foundPrompt.content || ""}
              </CodeBlock>
            </CardContent>
          </Card>

          {foundPrompt.variables && foundPrompt.variables.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Variables à personnaliser</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {foundPrompt.variables.map((variable, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg"
                    >
                      <Badge variant="outline" className="font-mono">
                        {variable}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        Variable à remplacer par votre valeur
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <BookOpen className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Catégorie</p>
                  <Badge variant="outline">
                    {foundPrompt?.category
                      ? categoryLabels[
                          foundPrompt.category as keyof typeof categoryLabels
                        ] || foundPrompt.category
                      : "Non spécifiée"}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Target className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Difficulté</p>
                  <Badge variant="secondary">
                    {foundPrompt?.difficulty
                      ? difficultyLabels[
                          foundPrompt.difficulty as keyof typeof difficultyLabels
                        ] || foundPrompt.difficulty
                      : "Non spécifiée"}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Temps estimé</p>
                  <span className="font-medium">
                    {foundPrompt?.estimatedTime || "Non spécifié"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div>
                  <p className="text-sm text-muted-foreground">Outil cible</p>
                  <span className="font-medium">
                    {foundPrompt?.targetTool
                      ? toolLabels[
                          foundPrompt.targetTool as keyof typeof toolLabels
                        ] || foundPrompt.targetTool
                      : "Non spécifié"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {foundPrompt.tags && foundPrompt.tags.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {foundPrompt.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
