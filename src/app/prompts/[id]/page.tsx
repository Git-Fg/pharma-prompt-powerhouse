import { notFound } from "next/navigation";
import Link from "next/link";
import { allPrompts } from "content-collections";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit3 } from "lucide-react";
import { MDXRenderer } from "@/components/markdown/MDXRenderer";
import MultiFormatPrompt from "@/components/prompts/MultiFormatPrompt";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RelatedContent } from "@/components/shared/RelatedContent";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return allPrompts.map((prompt) => ({ id: prompt.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const prompt = allPrompts.find((p) => p.slug === id);
    if (!prompt) return {};
    return {
      title: `${prompt.title} - Prompts`,
      description: prompt.description,
    };
}

export default async function PromptDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const prompt = allPrompts.find((p) => p.slug === id);

  if (!prompt) {
    notFound();
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <header className="mb-8">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/prompts"><ArrowLeft className="w-4 h-4 mr-2" />Retour aux prompts</Link>
        </Button>
        <h1 className="text-4xl font-bold tracking-tight">{prompt.title}</h1>
        <p className="text-xl text-muted-foreground mt-2">{prompt.description}</p>
        <div className="mt-6">
          <Button asChild size="lg" className="group">
            <Link href={`/boite-a-outils/prompt-editor?template=${prompt.slug}`}>
              <Edit3 className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
              Adapter ce prompt dans l'éditeur
            </Link>
          </Button>
        </div>
      </header>

      <main className="space-y-6">
        <MultiFormatPrompt 
          alternativeVersions={prompt.alternativeVersions}
          recommendedTools={prompt.recommendedTools}
          variables={prompt.variables}
        />
        
        <Card>
          <CardHeader><CardTitle>📝 Notes d'Utilisation</CardTitle></CardHeader>
          <CardContent className="prose prose-sm max-w-none dark:prose-invert">
            <MDXRenderer code={prompt.mdxCode} />
          </CardContent>
        </Card>
      </main>

      <RelatedContent currentItem={prompt} />
    </div>
  );
}
