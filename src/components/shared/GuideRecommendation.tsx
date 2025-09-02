'use client';
import Link from 'next/link';
import { content } from '@/lib/content-loader';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Button } from '@/components/ui/button';
import { BookOpen, Info, Clock } from 'lucide-react';
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
  const guide = content.guides.find(g => g.slug === guideSlug);

  if (!guide) return <Badge variant="destructive">Guide introuvable: {guideSlug}</Badge>;

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span className="text-primary font-semibold underline decoration-dotted underline-offset-4 cursor-pointer hover:text-primary/80 transition-colors">
          {guide.title}
        </span>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex flex-col gap-4">
          <div>
            <h4 className="text-sm font-semibold">{guide.title}</h4>
            <p className="text-sm text-muted-foreground">{guide.description}</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
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
                <Clock className="w-3 h-3 mr-1" />
                {guide.estimatedTime}
              </Badge>
            )}
          </div>

          {/* Concise TLDR display */}
          {guide.keyTakeaways && guide.keyTakeaways.length > 0 && (
            <div>
              <p className="text-xs font-medium mb-1">TLDR :</p>
              <p className="text-xs text-muted-foreground">
                {guide.keyTakeaways[0]} {guide.keyTakeaways.length > 1 && `+ ${guide.keyTakeaways.length - 1} points`}
              </p>
            </div>
          )}

          <div className="flex items-center pt-2 border-t">
            <Info className="mr-2 h-4 w-4 shrink-0 opacity-70" />
            <span className="text-xs text-muted-foreground italic">{reason}</span>
          </div>
          
          <Button asChild size="sm" className="w-full">
            <Link href={`/guides/${guide.slug}`} className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Lire le guide
            </Link>
          </Button>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}