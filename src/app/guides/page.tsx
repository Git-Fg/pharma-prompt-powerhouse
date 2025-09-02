import { content } from '@/lib/content-loader';
import { CollectionPageLayout } from "@/components/layout/CollectionPageLayout";
import { GuideList } from "@/components/guides/GuideList";

export default function GuidesPage() {
 const guides = content.guides;

  // Calculate statistics
  const totalGuides = guides.length;
  const categoriesCount = new Set(guides.map(g => g.category)).size;
  const beginnerGuides = guides.filter(g => g.difficulty === 'débutant').length;
  const averageReadingTime = Math.round(
    guides.reduce((acc, guide) => {
      const timeMatch = guide.estimatedTime?.match(/\d+/);
      return acc + (timeMatch ? parseInt(timeMatch[0]) : 0);
    }, 0) / guides.length
  );

  const stats = [
    { value: totalGuides, label: 'Guides disponibles', colorClass: 'text-blue-600 dark:text-blue-400', bgClass: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/30 border-blue-200 dark:border-blue-800' },
    { value: categoriesCount, label: 'Catégories', colorClass: 'text-green-600 dark:text-green-400', bgClass: 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/30 border-green-200 dark:border-green-800' },
    { value: beginnerGuides, label: 'Pour débuter', colorClass: 'text-purple-600 dark:text-purple-400', bgClass: 'bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/30 border-purple-200 dark:border-purple-800' },
    { value: `${averageReadingTime}min`, label: 'Temps moyen', colorClass: 'text-orange-600 dark:text-orange-400', bgClass: 'bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/50 dark:to-orange-900/30 border-orange-200 dark:border-orange-800' },
 ];

  return (
    <CollectionPageLayout
      title="Mes Fiches & Méthodes"
      description="Voici les fiches de synthèse que j'ai créées au fil de mes révisions. Elles représentent ma méthodologie de structuration de l'information."
      stats={stats}
    >
      <GuideList initialGuides={guides} />
    </CollectionPageLayout>
  );
}
