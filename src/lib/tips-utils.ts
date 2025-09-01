import { allConcepts } from "content-collections";
import type { Concept } from "content-collections";

export interface ConceptTip {
  text: string;
  source: {
    title: string;
    slug: string;
  };
}

/**
 * Extrait un "conseil" aléatoire à partir des `keyTakeaways` d'un concept.
 * La fonction garantit une sérialisation correcte pour les Client Components.
 *
 * @param concepts - La liste de tous les concepts, importée de content-collections.
 * @returns Un objet ConceptTip ou null si aucun conseil n'a pu être généré.
 */
export function getRandomConceptTip(
  concepts: Concept[]
): ConceptTip | null {
  // 1. Filtrer les concepts qui sont éligibles pour devenir un "tip"
  const eligibleConcepts = concepts.filter(
    (concept) => concept.keyTakeaways && concept.keyTakeaways.length > 0
  );

  if (eligibleConcepts.length === 0) {
    return null; // Aucun concept avec des key takeaways n'a été trouvé.
  }

  // 2. Sélectionner un concept au hasard parmi les éligibles
  const randomConcept = eligibleConcepts[Math.floor(Math.random() * eligibleConcepts.length)];

  // 3. Sélectionner un key takeaway au hasard dans ce concept
  const randomTakeaway = randomConcept.keyTakeaways[
    Math.floor(Math.random() * randomConcept.keyTakeaways.length)
  ];

  // 4. Formatter les données pour le Client Component (sécurité de sérialisation)
  return {
    text: randomTakeaway,
    source: {
      title: randomConcept.title,
      slug: `/concepts/${randomConcept.slug}`,
    },
  };
}
