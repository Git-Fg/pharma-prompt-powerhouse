import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Clock, BookOpen, Target } from "lucide-react";
import { allGuides } from "content-collections";
import { MDXRenderer } from "@/components/markdown/MDXRenderer";
import { RelatedContent } from "@/components/shared/RelatedContent";
import { KeyTakeaways } from "@/components/shared/KeyTakeaways";
import type { Guide } from "@/types";
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
};

const difficultyLabels = {
  débutant: "Débutant",
  intermédiaire: "Intermédiaire",
  avancé: "Avancé",
};

// Génération des paramètres statiques pour le build
export async function generateStaticParams() {
  return allGuides.map((guide) => ({
    id: guide.slug,
  }));
}

// Génération des métadonnées dynamiques pour le SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const guide = allGuides.find((g) => g.slug === id);

  if (!guide) {
    return {
      title: "Guide non trouvé - Pharma Prompt Powerhouse",
      description: "Le guide que vous recherchez n'existe pas.",
    };
  }

  return {
    title: `${guide.title} - Guides | Pharma Prompt Powerhouse`,
    description: guide.description,
    keywords: [
      "pharmacie",
      "prompt engineering",
      "guide",
      "tutoriel",
      "formation",
      guide.title,
      guide.category,
      ...(guide.tags?.map(t => t.name) || [])
    ],
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: "article",
      images: [
        {
          url: "/og-guide.png",
          width: 1200,
          height: 630,
          alt: guide.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.description,
    },
  };
}

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const guide: Guide | undefined = allGuides.find((g) => g.slug === id);

  if (!guide) {
    notFound();
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      {/* NOUVEAU HEADER ENRICHI */}
      <header className="mb-8">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/guides">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux guides
          </Link>
        </Button>
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">{guide.title}</h1>
          <p className="text-xl text-muted-foreground">{guide.description}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>
                Catégorie :{" "}
                <Badge variant="outline">
                  {categoryLabels[
                    guide.category as keyof typeof categoryLabels
                  ] || guide.category}
                </Badge>
              </span>
            </div>
            {guide.difficulty && (
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                <span>
                  Difficulté :{" "}
                  <Badge variant="secondary">
                    {difficultyLabels[guide.difficulty]}
                  </Badge>
                </span>
              </div>
            )}
            {guide.estimatedTime && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Temps estimé : {guide.estimatedTime}</span>
              </div>
            )}
          </div>
          {guide.tags && guide.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {guide.tags.map((tag) => (
                <Badge key={tag.name} variant="secondary">
                  {tag.name}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </header>

      <Separator className="my-8" />

      {/* NOUVELLE SECTION : Points clés à retenir */}
      {guide.keyTakeaways && <KeyTakeaways points={guide.keyTakeaways} />}

      {/* CONTENU PRINCIPAL */}
      <main className="prose prose-lg dark:prose-invert max-w-none">
        <MDXRenderer code={guide.mdxCode} />
      </main>

      <Separator className="my-12" />

      {/* FOOTER ENTIÈREMENT REMPLACÉ PAR LA NOUVELLE LOGIQUE */}
      <RelatedContent
        currentItem={{ slug: guide.slug, concepts: guide.concepts }}
      />
    </div>
  );
}
