import Link from 'next/link';
import { allGuides } from 'content-collections';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface GuideRecommendationProps {
  guideSlug: string;
  reason: string;
}

const categoryLabels = {
  prompting: "Prompting 🎯",
  methodology: "Méthodologie 🔬",
  tools: "Outils 🛠️",
  security: "Sécurité 🔒",
  optimization: "Optimisation ⚡",
  fondamentaux: "Fondamentaux 📚",
  methodologie: "Méthodologie 🔬",
  ressources: "Ressources 📖",
  "techniques-avancees": "Techniques Avancées 🚀",
  "cas-pratiques": "Cas Pratiques 💊",
};

const difficultyLabels = {
  débutant: "Débutant",
  intermédiaire: "Intermédiaire",
  avancé: "Avancé",
};

export function GuideRecommendation({ guideSlug, reason }: GuideRecommendationProps) {
  const guide = allGuides.find(g => g.slug === guideSlug);

  if (!guide) {
    return (
      <Card className="my-6 border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
        <CardContent className="pt-6">
          <p className="text-amber-800 dark:text-amber-200">
            Guide "{guideSlug}" non trouvé dans la collection guides
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="my-6 border-l-4 border-l-green-500 bg-gradient-to-r from-background to-green-50/30 dark:to-green-950/30">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              {guide.title}
            </CardTitle>
            <CardDescription className="text-base mb-3">
              <strong>Pourquoi ce guide :</strong> {reason}
            </CardDescription>
            <p className="text-sm text-muted-foreground">{guide.description}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline" className="bg-background">
            {categoryLabels[guide.category as keyof typeof categoryLabels] || guide.category}
          </Badge>
          {guide.difficulty && (
            <Badge variant="secondary">
              {difficultyLabels[guide.difficulty]}
            </Badge>
          )}
          {guide.estimatedTime && (
            <Badge variant="outline">
              {guide.estimatedTime}
            </Badge>
          )}
        </div>

        {guide.keyTakeaways && guide.keyTakeaways.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium mb-2">Points clés :</p>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              {guide.keyTakeaways.slice(0, 3).map((takeaway, index) => (
                <li key={index}>{takeaway}</li>
              ))}
              {guide.keyTakeaways.length > 3 && (
                <li className="text-xs italic">et {guide.keyTakeaways.length - 3} points supplémentaires...</li>
              )}
            </ul>
          </div>
        )}

        <Button asChild className="w-full">
          <Link 
            href={`/guides/${guide.slug}`}
            className="inline-flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            Lire ce guide
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}