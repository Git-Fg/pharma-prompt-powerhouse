// src/app/test-new-guide/page.tsx
'use client';

import { ContentRenderer } from '@/components/shared/ContentRenderer';
import { getGuideBySlug } from '@/lib/content-loader';
import { Badge } from "@/components/ui/badge";
import { KeyTakeaways } from "@/components/shared/KeyTakeaways";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TestNewGuidePage() {
  const guide = getGuideBySlug('confidentialite-securite');

  if (!guide) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <h1>Guide non trouvé</h1>
      </div>
    );
  }

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
            <Badge variant="secondary">{guide.category}</Badge>
            <Badge variant="outline">{guide.difficulty}</Badge>
          </div>

          <h1 className="text-4xl font-bold tracking-tight">{guide.title}</h1>
          <p className="text-xl text-muted-foreground">{guide.description}</p>

          {guide.estimatedTime && (
            <p className="text-sm text-muted-foreground">
              ⏱️ Temps de lecture estimé : {guide.estimatedTime}
            </p>
          )}

          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
              🧪 TEST : Nouveau système de rendu
            </h3>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Cette page teste le nouveau ContentRenderer avec des blocs de contenu structurés TypeScript + Zod.
              Le contenu provient de <code>src/content/guides-new/confidentialite-securite.ts</code>
            </p>
          </div>
        </div>
      </div>

      {guide.keyTakeaways && (
        <>
          <KeyTakeaways points={guide.keyTakeaways} />
          <div className="my-8 border-b" />
        </>
      )}

      <main className="prose prose-lg dark:prose-invert max-w-none">
        <ContentRenderer content={guide.content} />
      </main>
    </div>
  );
}