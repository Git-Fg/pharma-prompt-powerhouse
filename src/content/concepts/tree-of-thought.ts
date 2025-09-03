// src/content/concepts/tree-of-thought.ts
import type { Concept } from '@/lib/content-schema';

export const concept = {
  "slug": "tree-of-thought",
  "title": "Tree-of-Thought",
  "description": "Explorez plusieurs hypothèses en parallèle avec la technique Tree-of-Thought pour résoudre des problèmes complexes.",
  "icon": "GitBranch",
  "category": "techniques-avancees",
  "difficulty": "intermédiaire",
  "tags": [
    "chain-of-thought",
    "guide",
    "pedagogie",
    "pharmacie",
    "tree-of-thought"
  ],
  "isFavorite": false,
  "keyTakeaways": [
    "Le Tree-of-Thought permet à l'IA d'explorer plusieurs chemins de raisonnement simultanément, comme un arbre de décision.",
    "Structurez vos prompts avec des branches d'hypothèses, chacune avec ses preuves et son niveau de confiance.",
    "Cette technique est idéale pour le diagnostic différentiel, l'analyse de cas complexes et la prise de décision clinique."
  ],
  "conceptSlugs": [],
  "content": [
    {
      "type": "markdown",
      "content": "Le **Tree-of-Thought (ToT)** est une technique avancée qui guide l'IA à explorer plusieurs chemins de raisonnement simultanément. Plutôt que de suivre une seule ligne de pensée, elle évalue différentes hypothèses, ce qui est crucial pour le diagnostic différentiel ou l'analyse d'interactions complexes en pharmacie."
    },
    {
      "type": "markdown",
      "content": "## Pourquoi utiliser le Tree-of-Thought ?\n\nCette approche est particulièrement utile quand vous devez :\n\n- Analyser plusieurs hypothèses diagnostiques\n- Évaluer différentes stratégies thérapeutiques\n- Résoudre des cas cliniques complexes avec plusieurs variables\n- Optimiser des protocoles de soins"
    },
    {
      "type": "markdown",
      "content": "## Comment ça fonctionne ?\nLe ToT fonctionne comme un arbre de décision où chaque \"nœud\" représente une étape de raisonnement. L'IA explore plusieurs branches simultanément, évalue la qualité de chaque approche, puis choisit la meilleure ou combine plusieurs stratégies."
    },
    {
      "type": "markdown",
      "content": "## Applications en pharmacie\n\n- **Diagnostic différentiel** : Explorer plusieurs causes possibles d'un effet indésirable\n- **Optimisation posologique** : Tester différentes stratégies d'ajustement de dose\n- **Gestion des interactions** : Analyser plusieurs scénarios d'interaction médicamenteuse\n- **Planification thérapeutique** : Évaluer différentes approches de traitement"
    }
  ]
} satisfies Concept;