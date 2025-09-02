import { content } from '@/lib/content-loader';
import { CollectionPageLayout } from "@/components/layout/CollectionPageLayout";
import { PromptListClient } from "@/components/prompts/PromptListClient";

export default function PromptsPage() {
  const prompts = content.prompts;

  // Calculate statistics
  const totalPrompts = prompts.length;
  const categoriesCount = new Set(prompts.map(p => p.category)).size;
  const templatesWithVariables = prompts.filter(p => p.variables && p.variables.length > 0).length;
  const averageVariables = Math.round(
    prompts.reduce((acc, prompt) => acc + (prompt.variables?.length || 0), 0) / prompts.length
  );

  const stats = [
    { value: totalPrompts, label: 'Prompts disponibles', colorClass: 'text-amber-600 dark:text-amber-400', bgClass: 'bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/50 dark:to-amber-900/30 border-amber-200 dark:border-amber-800' },
    { value: categoriesCount, label: 'Catégories', colorClass: 'text-emerald-600 dark:text-emerald-400', bgClass: 'bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/50 dark:to-emerald-900/30 border-emerald-200 dark:border-emerald-800' },
    { value: templatesWithVariables, label: 'Templates interactifs', colorClass: 'text-rose-600 dark:text-rose-400', bgClass: 'bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-950/50 dark:to-rose-900/30 border-rose-200 dark:border-rose-80' },
    { value: averageVariables, label: 'Variables moyennes', colorClass: 'text-indigo-600 dark:text-indigo-400', bgClass: 'bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950/50 dark:to-indigo-900/30 border-indigo-200 dark:border-indigo-80' },
  ];

  return (
    <CollectionPageLayout
      title="La Banque de Prompts"
      description="Une collection de prompts prêts à l'emploi, conçus pour des cas d'usage pharmaceutiques concrets."
      stats={stats}
    >
      <PromptListClient initialPrompts={prompts} />
    </CollectionPageLayout>
  );
}
