// src/app/outils-externes/[slug]/page.tsx

import { notFound } from "next/navigation";
import Link from "next/link";
import { allExternalTools } from "content-collections";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Globe, Tag, DollarSign } from "lucide-react";
import { MDXRenderer } from "@/components/markdown/MDXRenderer";
import { KeyTakeaways } from "@/components/shared/KeyTakeaways";
import { RelatedContent } from "@/components/shared/RelatedContent";
import type { Metadata } from "next";

// Cette fonction permet à Next.js de générer les pages statiques au moment du build
export async function generateStaticParams() {
  return allExternalTools.map((tool) => ({
    slug: tool.slug,
  }));
}

// Génération des métadonnées dynamiques pour le SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = allExternalTools.find((t) => t.slug === slug);

  if (!tool) {
    return {
      title: "Outil non trouvé - Pharma Prompt Powerhouse",
      description: "L'outil externe que vous recherchez n'existe pas.",
    };
  }

  return {
    title: `${tool.title} - Outils Externes | Pharma Prompt Powerhouse`,
    description: tool.description,
    keywords: [
      "pharmacie",
      "prompt engineering",
      "outil IA",
      "intelligence artificielle",
      tool.title,
      tool.category,
      ...(tool.tags?.map(t => t.name) || [])
    ],
    openGraph: {
      title: tool.title,
      description: tool.description,
      type: "article",
      images: [
        {
          url: "/og-external-tool.png",
          width: 1200,
          height: 630,
          alt: tool.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: tool.title,
      description: tool.description,
    },
  };
}

export default async function ExternalToolDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // On trouve l'outil par son slug
  const tool = allExternalTools.find((t) => t.slug === slug);

  if (!tool) {
    notFound();
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <header className="mb-8">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/outils-externes">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux outils
          </Link>
        </Button>
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">{tool.title}</h1>
          <p className="text-xl text-muted-foreground">{tool.description}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4" />
              <span>
                Catégorie : <Badge variant="outline">{tool.category}</Badge>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              <span>
                Prix : <Badge variant="secondary">{tool.pricing}</Badge>
              </span>
            </div>
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary hover:underline"
            >
              <Globe className="w-4 h-4" />
              <span>Visiter le site officiel</span>
            </a>
          </div>
          {tool.tags && tool.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {tool.tags.map((tag) => (
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
      {tool.keyTakeaways && <KeyTakeaways points={tool.keyTakeaways} />}

      <main className="prose prose-lg dark:prose-invert max-w-none">
        <MDXRenderer code={tool.mdxCode} />
      </main>

      {/* NOUVELLE SECTION : Contenu lié */}
      {tool.conceptSlugs && tool.conceptSlugs.length > 0 && (
        <>
          <Separator className="my-12" />
          <RelatedContent
            currentItem={{ slug: tool.slug, conceptSlugs: tool.conceptSlugs }}
          />
        </>
      )}
    </div>
  );
}
