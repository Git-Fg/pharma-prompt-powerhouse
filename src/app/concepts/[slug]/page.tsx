import { notFound } from "next/navigation";
import Link from "next/link";
import { content, getConceptBySlug } from '@/lib/content-loader';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  BookOpen,
  Lightbulb,
  Wrench,
  ArrowRight,
  Target,
} from "lucide-react";
import { ContentRenderer } from "@/components/shared/ContentRenderer";
import { KeyTakeaways } from "@/components/shared/KeyTakeaways";
import type { Metadata } from "next";

// Génération des pages statiques au build
export async function generateStaticParams() {
  return content.concepts.map((concept) => ({
    slug: concept.slug,
  }));
}

// Génération des métadonnées dynamiques pour le SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const concept = getConceptBySlug(params.slug);

  if (!concept) {
    return {
      title: "Concept non trouvé - Pharma Prompt Powerhouse",
      description: "Le concept que vous recherchez n'existe pas.",
    };
  }
  return {
    title: `${concept.title} - Concepts | Pharma Prompt Powerhouse`,
    description: concept.description,
    keywords: [
      "pharmacie",
      "prompt engineering",
      "intelligence artificielle",
      "formation",
      concept.title,
      ...(concept.tags || [])
    ],
    openGraph: {
      title: concept.title,
      description: concept.description,
      type: "article",
      images: [
        {
          url: "/og-concept.png",
          width: 1200,
          height: 630,
          alt: concept.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: concept.title,
      description: concept.description,
    },
  };
}

export default async function ConceptDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const concept = getConceptBySlug(slug);

  if (!concept) {
    notFound();
  }

  // Trouver les contenus liés à ce concept
  const relatedGuides = content.guides.filter(
    (g) => g.conceptSlugs?.includes(slug)
  );
  const relatedWorkflows = content.workflows.filter(
    (w) => w.conceptSlugs?.includes(slug)
  );

  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <header className="mb-8">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/concepts">
            <ArrowLeft className="size-4 mr-2" />
            Retour aux concepts
          </Link>
        </Button>

        {/* En-tête du concept */}
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight">
                {concept.title}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                {concept.description}
              </p>
            </div>
          </div>

          {/* Statistiques du concept */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-primary">
                {relatedGuides.length + relatedWorkflows.length}
              </div>
              <div className="text-sm text-muted-foreground">
                Ressources liées
              </div>
            </Card>
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-green-600">
                {relatedGuides.length}
              </div>
              <div className="text-sm text-muted-foreground">Guides</div>
            </Card>
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-blue-600">
                {relatedWorkflows.length}
              </div>
              <div className="text-sm text-muted-foreground">Workflows</div>
            </Card>
          </div>
        </div>
      </header>

      {/* NOUVELLE SECTION : Points clés à retenir */}
      {concept.keyTakeaways && <KeyTakeaways points={concept.keyTakeaways} />}

      {/* Contenu principal du concept */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="size-5" />À propos de ce concept
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose dark:prose-invert max-w-none">
            <ContentRenderer content={concept.content} />
          </div>
        </CardContent>
      </Card>

      <Separator className="my-8" />

      <main className="space-y-12">
        {/* Guides liés */}
        {relatedGuides.length > 0 && (
          <section>
            <h2 className="text-3xl font-semibold flex items-center gap-3 mb-4">
              <BookOpen className="size-8 text-primary" /> Guides liés à ce concept
            </h2>
            <div className="grid gap-4">
              {relatedGuides.map((guide) => (
                <Link href={`/guides/${guide.slug}`} key={guide.slug}>
                  <Card className="hover:bg-accent/50 transition-colors">
                    <CardHeader>
                      <CardTitle>{guide.title}</CardTitle>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {guide.description}
                      </p>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 2. Les Workflows Pratiques */}
        {relatedWorkflows.length > 0 && (
          <section>
            <h2 className="text-3xl font-semibold flex items-center gap-3 mb-4">
              <Lightbulb className="size-8 text-yellow-500" /> Appliquer : Les
              Workflows Pratiques
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedWorkflows.map((workflow) => (
                <Link href={`/workflows/${workflow.slug}`} key={workflow.slug}>
                  <Card className="h-full hover:bg-accent/50 transition-colors">
                    <CardHeader>
                      <CardTitle>{workflow.title}</CardTitle>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {workflow.description}
                      </p>
                      <div className="flex gap-2 pt-2">
                        <Badge variant="outline">{workflow.category}</Badge>
                        <Badge variant="secondary">{workflow.difficulty}</Badge>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 3. L'Outil pour Pratiquer */}
        <section>
          <h2 className="text-3xl font-semibold flex items-center gap-3 mb-4">
            <Wrench className="size-8 text-destructive" /> Essayer : Mettre en
            Pratique
          </h2>
          <Card className="bg-muted/50">
            <CardHeader className="md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle>Prêt à tester ?</CardTitle>
                <p className="text-muted-foreground mt-2">
                  Ouvrez l'éditeur pour expérimenter avec ce concept et adapter
                  les prompts à vos besoins.
                </p>
              </div>
              <Button asChild size="lg" className="mt-4 md:mt-0">
                <Link href="/boite-a-outils/prompt-editor">
                  Ouvrir l'Éditeur de Prompts{" "}
                  <ArrowRight className="size-4 ml-2" />
                </Link>
              </Button>
            </CardHeader>
          </Card>
        </section>
      </main>
    </div>
  );
}
