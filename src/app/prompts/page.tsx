import { content } from '@/lib/content-loader';
import { PromptListClient } from "@/components/prompts/PromptListClient";
import { Card } from "@/components/ui/card";

export default function PromptsPage() {
  const prompts = content.prompts;

  // Calculate statistics
  const totalPrompts = prompts.length;
  const categoriesCount = new Set(prompts.map(p => p.category)).size;
  const templatesWithVariables = prompts.filter(p => p.variables && p.variables.length > 0).length;
  const averageVariables = Math.round(
    prompts.reduce((acc, prompt) => acc + (prompt.variables?.length || 0), 0) / prompts.length
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">La Banque de Prompts</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Une collection de prompts prêts à l'emploi, conçus pour des cas d'usage pharmaceutiques concrets.
            </p>
          </div>
          
          {/* Statistics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-8">
            <Card className="p-6 text-center bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/50 dark:to-amber-900/30 border-amber-200 dark:border-amber-800">
              <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                {totalPrompts}
              </div>
              <div className="text-sm text-amber-600/70 dark:text-amber-300/70">
                Prompts disponibles
              </div>
            </Card>
            <Card className="p-6 text-center bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/50 dark:to-emerald-900/30 border-emerald-200 dark:border-emerald-800">
              <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                {categoriesCount}
              </div>
              <div className="text-sm text-emerald-600/70 dark:text-emerald-300/70">
                Catégories
              </div>
            </Card>
            <Card className="p-6 text-center bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-950/50 dark:to-rose-900/30 border-rose-200 dark:border-rose-800">
              <div className="text-3xl font-bold text-rose-600 dark:text-rose-400">
                {templatesWithVariables}
              </div>
              <div className="text-sm text-rose-600/70 dark:text-rose-300/70">
                Templates interactifs
              </div>
            </Card>
            <Card className="p-6 text-center bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950/50 dark:to-indigo-900/30 border-indigo-200 dark:border-indigo-800">
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                {averageVariables}
              </div>
              <div className="text-sm text-indigo-600/70 dark:text-indigo-300/70">
                Variables moyennes
              </div>
            </Card>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <PromptListClient initialPrompts={prompts} />
      </div>
    </div>
  );
}
