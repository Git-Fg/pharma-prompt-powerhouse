import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Clock, Target } from "lucide-react";
import { content, getGuideBySlug } from "@/lib/content-loader";
import { ContentRenderer } from "@/components/shared/ContentRenderer";
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
  "bonnes-pratiques": "Bonnes Pratiques 🛡️",
};

const difficultyLabels = {
  débutant: "Débutant",
  intermédiaire: "Intermédiaire",
  avancé: "Avancé",
};

// Génération des paramètres statiques pour le build
export async function generateStaticParams() {
  return content.guides.map((guide) => ({
    id: guide.slug,
  }));
}

// Génération des métadonnées dynamiques pour le SEO
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const guide = getGuideBySlug(params.id);

  if (!guide) {
    return {
      title: "Guide non trouvé",
    };
  }
  return {
    title: `Guide : ${guide.title} | Pharma Prompt Powerhouse`,
    description: guide.description,
  };
}

export default async function GuideDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const guide = getGuideBySlug(id);

  if (!guide) {
    notFound();
  }

  const categoryLabel = categoryLabels[guide.category as keyof typeof categoryLabels] || guide.category;
  const difficultyLabel = difficultyLabels[guide.difficulty as keyof typeof difficultyLabels] || guide.difficulty;

  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/guides">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux guides
          </Button>
        </Link>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{categoryLabel}</Badge>
            <Badge variant="outline">{difficultyLabel}</Badge>
            {guide.isWorkflow && (
              <Badge variant="default">
                <Target className="mr-1 h-3 w-3" />
                Workflow
              </Badge>
            )}
          </div>

          <h1 className="text-4xl font-bold tracking-tight">{guide.title}</h1>
          <p className="text-xl text-muted-foreground">{guide.description}</p>

          {guide.estimatedTime && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Temps de lecture estimé : {guide.estimatedTime}</span>
            </div>
          )}
        </div>
      </div>

      <Separator className="my-8" />

      {guide.keyTakeaways && guide.keyTakeaways.length > 0 && (
        <>
          <KeyTakeaways points={guide.keyTakeaways} />
          <Separator className="my-8" />
        </>
      )}

      <main className="prose prose-lg dark:prose-invert max-w-none">
        <ContentRenderer content={guide.content} />
      </main>

      <Separator className="my-12" />
      
      <RelatedContent currentItem={guide} />
    </div>
  );
}