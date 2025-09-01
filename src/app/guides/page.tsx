import { allGuides } from "content-collections";
import { GuideList } from "@/components/guides/GuideList";
import { Card } from "@/components/ui/card";

export default function GuidesPage() {
  const guides = allGuides;

  // Calculate statistics
  const totalGuides = guides.length;
  const categoriesCount = new Set(guides.map(g => g.category)).size;
  const beginnerGuides = guides.filter(g => g.difficulty === 'débutant').length;
  const averageReadingTime = Math.round(
    guides.reduce((acc, guide) => {
      const timeMatch = guide.readingTime?.match(/\d+/);
      return acc + (timeMatch ? parseInt(timeMatch[0]) : 0);
    }, 0) / guides.length
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Mes Fiches & Méthodes</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Voici les fiches de synthèse que j'ai créées au fil de mes
              révisions. Elles représentent ma méthodologie de structuration de
              l'information.
            </p>
          </div>
          
          {/* Statistics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-8">
            <Card className="p-6 text-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/30 border-blue-200 dark:border-blue-800">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {totalGuides}
              </div>
              <div className="text-sm text-blue-600/70 dark:text-blue-300/70">
                Guides disponibles
              </div>
            </Card>
            <Card className="p-6 text-center bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/30 border-green-200 dark:border-green-800">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                {categoriesCount}
              </div>
              <div className="text-sm text-green-600/70 dark:text-green-300/70">
                Catégories
              </div>
            </Card>
            <Card className="p-6 text-center bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/30 border-purple-200 dark:border-purple-800">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {beginnerGuides}
              </div>
              <div className="text-sm text-purple-600/70 dark:text-purple-300/70">
                Pour débuter
              </div>
            </Card>
            <Card className="p-6 text-center bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/50 dark:to-orange-900/30 border-orange-200 dark:border-orange-800">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                {averageReadingTime}min
              </div>
              <div className="text-sm text-orange-600/70 dark:text-orange-300/70">
                Temps moyen
              </div>
            </Card>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <GuideList initialGuides={guides} />
      </div>
    </div>
  );
}
