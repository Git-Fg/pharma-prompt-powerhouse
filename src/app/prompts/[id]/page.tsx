import { notFound } from "next/navigation";
import Link from "next/link";
import { content, getPromptBySlug } from '@/lib/content-loader';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Edit3, Clock, Target, Tag } from "lucide-react";
import { ContentRenderer } from "@/components/shared/ContentRenderer";
import MultiFormatPrompt from "@/components/prompts/MultiFormatPrompt";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RelatedContent } from "@/components/shared/RelatedContent";
import { KeyTakeaways } from "@/components/shared/KeyTakeaways";
import type { Metadata } from "next";

const categoryLabels = {
  prompting: "Prompting 🎯",
  methodology: "Méthodologie 🔬",
  tools: "Outils 🛠️",
  security: "Sécurité 🔒",
  optimization: "Optimisation ⚡",
  fondamentaux: "Fondamentaux 📚",
  methodologie: "Méthodologie 🔬",
  ressources: "Ressources 📖",
  "techniques-avancees": "Techniques Avancées 🚀",
  "cas-pratiques": "Cas Pratiques 💊",
  "analyse": "Analyse 🔍",
  "synthese": "Synthèse 📋",
  "creation": "Création ✨",
};

const difficultyLabels = {
  débutant: "Débutant",
  intermédiaire: "Intermédiaire",
  avancé: "Avancé",
};

export async function generateStaticParams() {
  return content.prompts.map((prompt) => ({ id: prompt.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const prompt = getPromptBySlug(id);
    if (!prompt) return {};
    return {
      title: `${prompt.title} - Prompts`,
      description: prompt.description,
    };
}

export default async function PromptDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const prompt = getPromptBySlug(id);

  if (!prompt) {
    notFound();
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <header className="mb-8">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/prompts"><ArrowLeft className="w-4 h-4 mr-2" />Retour aux prompts</Link>
        </Button>
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">{prompt.title}</h1>
          <p className="text-xl text-muted-foreground">{prompt.description}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4" />
              <span>
                Catégorie :{" "}
                <Badge variant="outline">
                  {categoryLabels[
                    prompt.category as keyof typeof categoryLabels
                  ] || prompt.category}
                </Badge>
              </span>
            </div>
            {prompt.difficulty && (
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                <span>
                  Difficulté :{" "}
                  <Badge variant="secondary">
                    {difficultyLabels[prompt.difficulty]}
                  </Badge>
                </span>
              </div>
            )}
            {prompt.estimatedTime && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Temps estimé : {prompt.estimatedTime}</span>
              </div>
            )}
          </div>
          <div className="mt-6">
            <Button asChild size="lg" className="group">
              <Link href={`/boite-a-outils/prompt-editor?template=${prompt.slug}`}>
                <Edit3 className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                Adapter ce prompt dans l'éditeur
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <Separator className="my-8" />

      {/* NOUVELLE SECTION : Points clés à retenir */}
      {prompt.keyTakeaways && <KeyTakeaways points={prompt.keyTakeaways} />}

      <main className="space-y-6">
        <MultiFormatPrompt 
          alternativeVersions={prompt.alternativeVersions}
          recommendedTools={prompt.recommendedTools}
          variables={prompt.variables}
        />
        
        <Card>
          <CardHeader><CardTitle>📝 Notes d'Utilisation</CardTitle></CardHeader>
          <CardContent className="prose prose-sm max-w-none dark:prose-invert">
            <ContentRenderer content={prompt.content} />
          </CardContent>
        </Card>
      </main>

      <Separator className="my-12" />

      <RelatedContent currentItem={prompt} />
    </div>
  );
}
