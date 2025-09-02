import { notFound } from 'next/navigation';
import { content, getObjectifBySlug } from '@/lib/content-loader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Check, Lightbulb, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import { PromptCard } from '@/components/prompts/PromptCard';
import { BeforeAfterPrompt } from '@/components/objectifs/BeforeAfterPrompt';
import { InteractiveChecklist } from '@/components/objectifs/InteractiveChecklist';
import { RelatedConcepts } from '@/components/shared/RelatedConcepts';
import { GuideRecommendation } from '@/components/shared/GuideRecommendation';

export async function generateStaticParams() {
  return content.objectifs.map((obj) => ({ slug: obj.slug }));
}

export default async function ObjectifDetailPage({ params }: { params: { slug: string } }) {
  const objectif = getObjectifBySlug(params.slug);
  if (!objectif) notFound();

  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <header className="mb-8">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/"><ArrowLeft className="w-4 h-4 mr-2" />Retour à l'accueil</Link>
        </Button>
        <h1 className="text-4xl font-bold tracking-tight">{objectif.title}</h1>
        <p className="text-xl text-muted-foreground mt-2">{objectif.description}</p>
      </header>

      <main className="space-y-12">
        {/* Partie 1: Action Immédiate */}
        <section>
          <h2 className="text-3xl font-semibold mb-4">🚀 La Solution "Clé en Main"</h2>
          <p className="text-muted-foreground mb-4">{objectif.masterPrompt.description}</p>
          <PromptCard {...objectif.masterPrompt.prompt} />
        </section>
        
        <Separator />

        {/* Partie 2: Auto-évaluation */}
        <section>
          <h2 className="text-3xl font-semibold mb-4">🔬 L'Atelier Interactif</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">Comparez les Résultats</h3>
              <BeforeAfterPrompt {...objectif.beforeAfter} />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Évaluez Votre Propre Prompt</h3>
              <Card>
                <CardHeader><CardTitle>Checklist d'Auto-Correction</CardTitle></CardHeader>
                <CardContent>
                  <InteractiveChecklist items={objectif.checklist} />
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <Separator />

        {/* Partie 3: Approfondissement */}
        <section>
          <h2 className="text-3xl font-semibold mb-4">📚 Pour Aller Plus Loin</h2>
          <div className="space-y-6">
            <RelatedConcepts conceptSlugs={objectif.relatedConcepts} title="Concepts Fondamentaux Liés" />
            {objectif.relatedGuides.length > 0 && (
              <Card>
                <CardHeader><CardTitle className="flex items-center gap-2"><GraduationCap />Guides Recommandés</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  {objectif.relatedGuides.map(slug => (
                    <GuideRecommendation key={slug} guideSlug={slug} reason="Pour approfondir les techniques utilisées dans ce prompt." />
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}