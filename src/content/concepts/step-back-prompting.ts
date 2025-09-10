import type { Concept } from '@/lib/content-schema'

export const concept = {
  slug: 'step-back-prompting',
  type: 'concept',
  title: 'Step-Back Prompting',
  description: 'Une méthode de raisonnement qui force l\'IA à s\'abstraire des détails pour identifier les principes fondamentaux avant de résoudre un problème spécifique.',
  category: 'Concepts Avancés',
  difficulty: 'avancé',
  tags: ['raisonnement', 'abstraction', 'principes-fondamentaux'],
  isFavorite: false,
  keyTakeaways: [
    'Step-Back Prompting force l\'IA à s\'abstraire des détails pour identifier les principes fondamentaux avant de résoudre un problème.',
    'Cette méthode réduit les erreurs de précipitation et améliore le raisonnement en ancrant la réponse dans des concepts de base.',
    'Idéale pour les cas complexes comme le diagnostic différentiel et l\'analyse d\'interactions médicamenteuses.',
  ],
  content: [
    {
      type: 'markdown',
      content: `
### 1. L'Analogie Simple : Le Médecin Senior vs. l'Interne

Un interne, confronté à un cas complexe, peut se perdre dans les détails : un symptôme inhabituel, une valeur biologique à la limite de la normale...

Le médecin senior, lui, prend du recul (il fait un \"step back\"). Avant de se plonger dans les détails du patient X, il se pose une question plus fondamentale : \"Quels sont les grands principes qui régissent l'interaction entre cette classe de médicaments et cette pathologie ?\".

En répondant d'abord à cette question de haut niveau, il établit un cadre de raisonnement solide. Ensuite, il applique ces principes généraux au cas spécifique du patient X. Cette abstraction lui évite de tomber dans les pièges des détails trompeurs.

Le Step-Back Prompting, c'est enseigner cette prise de recul à l'IA.`,
    },
    {
      type: 'markdown',
      content: `
### 2. La Définition Formelle

**Step-Back Prompting** est une technique qui améliore la capacité de raisonnement d'un modèle de langage en le guidant à travers un processus d'abstraction et d'application. Le processus se déroule en deux temps :

1.  **Abstraction (The Step Back) :** À partir d'une question spécifique et détaillée, le modèle est d'abord invité à formuler une question plus générale ou un principe de haut niveau qui sous-tend le problème initial.
2.  **Application (Reasoning & Grounding) :** Le modèle utilise la réponse ou les principes dérivés de la question \"step-back\" comme un cadre pour raisonner et répondre à la question spécifique originale.

Cette méthode force le modèle à ancrer sa réponse finale dans des concepts fondamentaux, ce qui améliore la logique et la robustesse de sa conclusion.`,
    },
    {
      type: 'markdown',
      content: `
### 3. Pourquoi C'est Important Pour Vous ?

Les cas cliniques ou les questions pharmaceutiques sont rarement simples. Les détails (comorbidités, co-médications) peuvent être des \"bruits\" qui masquent le signal principal.

-   **Réduction des Erreurs de Précipitation :** Le Step-Back Prompting empêche l'IA de sauter sur une conclusion basée sur un détail frappant mais potentiellement non pertinent.
-   **Raisonnement Amélioré :** En forçant l'IA à expliciter les principes généraux, vous obtenez des réponses mieux argumentées et plus faciles à vérifier.
-   **Applicabilité aux Cas Complexes :** C'est une technique particulièrement puissante pour le diagnostic différentiel, l'analyse d'interactions médicamenteuses complexes ou l'adaptation de protocoles à des situations patient inhabituelles.`,
    },
    {
      type: 'markdown',
      content: `
### 4. Pour Aller Plus Loin (Notions Avancées)

-   **Combinaison avec d'autres techniques :** Le Step-Back Prompting est souvent utilisé en amont d'autres méthodes. Par exemple, on peut utiliser le \"step-back\" pour définir un principe, puis un \"Chain-of-Thought\" pour l'appliquer méthodiquement au cas d'espèce.
-   **Automatisation du Step-Back :** Des recherches sont en cours pour que le modèle décide lui-même quand un \"step-back\" est nécessaire, sans que l'utilisateur ait à le guider explicitement. Cela fait partie d'une tendance plus large vers des systèmes de raisonnement plus autonomes.`,
    },
  ],
} satisfies Concept

export default concept
