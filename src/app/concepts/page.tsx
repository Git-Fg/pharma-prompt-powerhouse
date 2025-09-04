import { content } from '@/lib/content-loader';
import { CollectionPageLayout } from "@/components/layout/CollectionPageLayout";
import { Separator } from "@/components/ui/separator";
import * as LucideIcons from "lucide-react";
import { ConceptListClient } from "@/components/concepts/ConceptListClient";

export default function ConceptsPage() {
  const totalConcepts = content.concepts.length;
  const categoriesCount = new Set(content.concepts.map(c => c.category)).size;
  
  const stats = [
    { value: totalConcepts, label: 'Concepts disponibles', colorClass: 'text-primary', bgClass: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/30 border-blue-200 dark:border-blue-800' },
    { value: categoriesCount, label: 'Catégories', colorClass: 'text-green-600 dark:text-green-400', bgClass: 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/30 border-green-200 dark:border-green-800' },
    { value: '100%', label: 'Contenus liés', colorClass: 'text-blue-600 dark:text-blue-400', bgClass: 'bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/30 border-purple-200 dark:border-purple-800' },
    { value: '∞', label: 'Possibilités', colorClass: 'text-purple-600 dark:text-purple-400', bgClass: 'bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/50 dark:to-orange-900/30 border-orange-200 dark:border-orange-800' },
  ];

  return (
    <CollectionPageLayout
      title="Hub de Concepts"
      description="Chaque concept est un dossier complet reliant la théorie, la pratique et les outils. Choisissez un concept pour commencer."
      stats={stats}
    >
      <ConceptListClient initialConcepts={content.concepts} />

      <Separator className="my-12" />
      
      {/* Section d'aide */}
      <div className="mt-16 text-center">
        <Separator className="mb-8" />
        <h2 className="responsive-section-title mb-4">
          Comment utiliser le Hub de Concepts ?
        </h2>
        <div className="content-grid md:grid-cols-3 responsive-max-width-prose mx-auto">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <LucideIcons.BookOpen className="size-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">1. Choisissez un concept</h3>
            <p className="responsive-small-text text-muted-foreground">
              Explorez les concepts qui correspondent à vos besoins
              d'apprentissage
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <LucideIcons.Lightbulb className="size-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">2. Découvrez les ressources</h3>
            <p className="responsive-small-text text-muted-foreground">
              Accédez aux guides, workflows et outils liés à ce concept
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <LucideIcons.Wrench className="size-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">3. Mettez en pratique</h3>
            <p className="responsive-small-text text-muted-foreground">
              Utilisez l'éditeur de prompts pour tester et adapter les
              workflows pratiques
            </p>
          </div>
        </div>
      </div>
    </CollectionPageLayout>
  );
}
