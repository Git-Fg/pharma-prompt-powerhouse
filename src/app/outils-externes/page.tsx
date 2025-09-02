import { content } from '@/lib/content-loader';
import { CollectionPageLayout } from "@/components/layout/CollectionPageLayout";
import { FeaturedTools } from "@/components/shared/FeaturedTools";
import { ToolListClient } from "@/components/tools/ToolListClient";

export default function ExternalToolsPage() {
  // Calculate statistics
  const totalTools = content.tools.length;
  const categoriesCount = new Set(content.tools.map(t => t.category)).size;
  const freeTools = content.tools.filter(t => t.pricing?.toLowerCase().includes('gratuit')).length;
  const totalUseCases = content.tools.reduce((acc, tool) => acc + (tool.use_cases?.length || 0), 0);

  const stats = [
    { value: totalTools, label: 'Outils analysés', colorClass: 'text-teal-600 dark:text-teal-400', bgClass: 'bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-950/50 dark:to-teal-900/30 border-teal-200 dark:border-teal-80' },
    { value: categoriesCount, label: 'Catégories', colorClass: 'text-cyan-600 dark:text-cyan-400', bgClass: 'bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-950/50 dark:to-cyan-900/30 border-cyan-200 dark:border-cyan-800' },
    { value: freeTools, label: 'Outils gratuits', colorClass: 'text-lime-600 dark:text-lime-400', bgClass: 'bg-gradient-to-br from-lime-50 to-lime-100 dark:from-lime-950/50 dark:to-lime-900/30 border-lime-200 dark:border-lime-800' },
    { value: totalUseCases, label: 'Cas d\'usage', colorClass: 'text-violet-600 dark:text-violet-400', bgClass: 'bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-950/50 dark:to-violet-900/30 border-violet-200 dark:border-violet-800' },
 ];

  return (
    <CollectionPageLayout
      title="Mes Outils Externes Recommandés"
      description="Voici une sélection d'outils que j'utilise régulièrement. Chaque outil a ses propres forces. J'ai préparé un guide détaillé pour chacun afin de vous aider à en tirer le meilleur parti."
      stats={stats}
    >
      {/* Core Kit Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-center">Le Core Kit Étudiant - Nos Recommandations N°1</h2>
        <FeaturedTools />
      </div>

      {/* All Tools Grid */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Tous les Outils Analysés</h2>
      </div>
      <ToolListClient initialTools={content.tools} />
    </CollectionPageLayout>
  );
}