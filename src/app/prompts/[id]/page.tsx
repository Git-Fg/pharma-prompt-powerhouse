import { notFound } from "next/navigation";
import Link from "next/link";
import { allPrompts } from "content-collections";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Target, BookOpen, Edit3 } from "lucide-react";
import { CodeBlock } from "@/components/ui/code-block";
import { CopyButton } from "@/components/ui/copy-button";
import { MDXRenderer } from "@/components/markdown/MDXRenderer";
import MultiFormatPrompt from "@/components/prompts/MultiFormatPrompt";
import type { Metadata } from "next";

// Génération des paramètres statiques pour le build
export async function generateStaticParams() {
  return allPrompts.map((prompt) => ({
    id: prompt.slug,
  }));
}

// Génération des métadonnées dynamiques pour le SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const prompt = allPrompts.find((p) => p.slug === id);

  if (!prompt) {
    return {
      title: "Prompt non trouvé - Pharma Prompt Powerhouse",
      description: "Le prompt que vous recherchez n'existe pas.",
    };
  }

  return {
    title: `${prompt.title} - Prompts | Pharma Prompt Powerhouse`,
    description: prompt.description,
    keywords: [
      "pharmacie",
      "prompt engineering",
      "prompt",
      "template",
      "IA",
      prompt.title,
      prompt.category,
      ...(prompt.tags?.map(t => t.name) || [])
    ],
    openGraph: {
      title: prompt.title,
      description: prompt.description,
      type: "article",
      images: [
        {
          url: "/og-prompt.png",
          width: 1200,
          height: 630,
          alt: prompt.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: prompt.title,
      description: prompt.description,
    },
  };
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
          {/* S'il y a un System Prompt, on affiche deux blocs distincts */}
          {foundPrompt.hasSystemPrompt && (
            <>
              <Card className="border-2 border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    🧠 System Prompt
                    <CopyButton
                      text={foundPrompt.systemPromptContent || ""}
                      label="Copier"
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    <strong>Rôle de l'IA :</strong> Copiez ceci dans le champ "System Prompt" de votre outil (ex: AI Studio).
                  </p>
                  <div className="bg-muted/30 p-4 rounded-lg border-l-4 border-blue-500">
                    <CodeBlock language="text" showLineNumbers={false}>
                      {foundPrompt.systemPromptContent || ""}
                    </CodeBlock>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    🎯 User Prompt
                    <CopyButton
                      text={foundPrompt.promptContent || ""}
                      label="Copier"
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    <strong>Votre instruction :</strong> C'est la tâche que vous demandez à l'IA d'exécuter.
                  </p>
                  <div className="bg-muted/30 p-4 rounded-lg border-l-4 border-primary">
                    <CodeBlock language="text" showLineNumbers={false}>
                      {foundPrompt.promptContent || ""}
                    </CodeBlock>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* S'il n'y a pas de System Prompt, on affiche un seul bloc comme avant */}
          {!foundPrompt.hasSystemPrompt && (
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  🎯 Prompt Principal
                  <CopyButton
                    text={foundPrompt.promptContent || foundPrompt._meta.content || ""}
                    label="Copier"
                  />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  <strong>Prêt à utiliser :</strong> Copiez ce prompt et collez-le dans votre outil IA préféré.
                </p>
                <div className="bg-muted/30 p-4 rounded-lg border-l-4 border-primary">
                  <CodeBlock language="text" showLineNumbers={false}>
                    {foundPrompt.promptContent || foundPrompt._meta.content || ""}
                  </CodeBlock>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Multi-format prompt display */}
          {foundPrompt.alternativeVersions && (
            <MultiFormatPrompt 
              alternativeVersions={foundPrompt.alternativeVersions}
              recommendedTools={foundPrompt.recommendedTools}
              variables={foundPrompt.variables}
            />
          )}

          {/* Notes d'utilisation - Séparées du prompt */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">📝 Notes d'Utilisation</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <MDXRenderer code={foundPrompt.mdxCode} />
            </CardContent>
          </Card>

          {foundPrompt.variables && foundPrompt.variables.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>🔧 Variables à personnaliser</CardTitle>
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
                        Remplacez cette variable par votre valeur
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
                      {tag.name}
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
