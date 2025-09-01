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

  // Garde-fou pour TypeScript, même si la logique l'empêche d'être undefined ici.
  if (!randomConcept) {
    return null;
  }

  // Le filtre garantit que keyTakeaways existe et n'est pas vide.
  const takeaways = randomConcept.keyTakeaways;
  if (!takeaways || takeaways.length === 0) {
      return null; // Sécurité supplémentaire
  }

  // 3. Sélectionner un key takeaway au hasard dans ce concept
  const randomTakeaway = takeaways[Math.floor(Math.random() * takeaways.length)];
  
  // Autre garde-fou pour le cas où l'accès à l'array renverrait undefined (strictness)
  if (!randomTakeaway) {
      return null;
  }

  // 4. Formatter les données pour le Client Component (sécurité de sérialisation)
  return {
    text: randomTakeaway,
    source: {
      title: randomConcept.title,
      slug: `/concepts/${randomConcept.slug}`,
    },
  };
}
