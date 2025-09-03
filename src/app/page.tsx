import { content } from '@/lib/content-loader';
import { ConceptCard } from '@/components/shared/ConceptCard';
import { GuideCard } from '@/components/shared/GuideCard';
import { PromptCard } from '@/components/prompts/PromptCard';
import { SearchInput } from '@/components/ui/search-input';
import { Badge } from '@/components/ui/badge';
import { ObjectifCard } from '@/components/objectifs/ObjectifCard';

export default function HomePage() {
  const favoriteConcepts = content.concepts.filter(c => c.isFavorite);
  const favoriteGuides = content.guides.filter(g => g.isFavorite);
  const favoritePrompts = content.prompts.filter(p => p.isFavorite);
  const allTags = Array.from(new Set(content.prompts.flatMap(p => p.tags)));

  return (
    <div className="space-y-16">
      <section className="text-center py-16">
        <h1 className="text-5xl font-bold mb-4">Pharma Prompt Powerhouse</h1>
        <p className="text-xl text-muted-foreground mx-auto max-w-2xl">
          La base de connaissances ultime pour les étudiants et professionnels de santé souhaitant maîtriser l'IA générative.
        </p>
        <div className="mt-8 max-w-lg mx-auto">
          <SearchInput />
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6">Objectifs d'Apprentissage</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.objectives.map((objectif) => <ObjectifCard key={objectif.slug} objectif={objectif} />)}
        </div>
      </section>

      {favoriteGuides.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold mb-6">Guides Essentiels</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {favoriteGuides.map(guide => <GuideCard key={guide.slug} guide={guide} />)}
          </div>
        </section>
      )}

      {favoriteConcepts.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold mb-6">Concepts Clés</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteConcepts.map(concept => <ConceptCard key={concept.slug} concept={concept} />)}
          </div>
        </section>
      )}

      {favoritePrompts.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold mb-6">Prompts à la Une</h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {allTags.map((tag: string) => <Badge key={tag} variant="outline">{tag}</Badge>)}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoritePrompts.map(prompt => <PromptCard key={prompt.slug} prompt={prompt} />)}
          </div>
        </section>
      )}
    </div>
  );
}
