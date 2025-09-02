import { content } from '@/lib/content-loader';
import { ConceptCard } from '@/components/cards/ConceptCard';
import { EnrichedGuide } from '@/lib/content-schema';

interface RelatedConceptsProps {
  guide: EnrichedGuide;
}

export function RelatedConcepts({ guide }: RelatedConceptsProps) {
  if (!guide.concepts || guide.concepts.length === 0) {
    return null;
  }

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Concepts Associés</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {guide.concepts.map(concept => (
          <ConceptCard key={concept.slug} concept={concept} />
        ))}
      </div>
    </section>
  );
}
