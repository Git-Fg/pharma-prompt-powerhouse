// src/content/concepts/tree-of-thought.ts
import type { Concept } from '@/lib/content-schema'

export const concept = {
  slug: 'tree-of-thought',
  type: 'concept',
  title: 'Tree-of-Thought',
  description: 'Explorez plusieurs hypothèses en parallèle avec la technique Tree-of-Thought pour résoudre des problèmes complexes.',
  icon: 'GitBranch',
  category: 'techniques-avancees',
  difficulty: 'intermédiaire',
  tags: [
    'chain-of-thought',
    'guide',
    'pedagogie',
    'pharmacie',
    'tree-of-thought',
  ],
  isFavorite: false,
  keyTakeaways: [
    'Le Tree-of-Thought permet à l\'IA d\'explorer plusieurs chemins de raisonnement simultanément, comme un arbre de décision.',
    'Structurez vos prompts avec des branches d\'hypothèses, chacune avec ses preuves et son niveau de confiance.',
    'Cette technique est idéale pour le diagnostic différentiel, l\'analyse de cas complexes et la prise de décision clinique.',
  ],
  conceptSlugs: [],
  content: [
    {
      type: 'section',
      title: 'Introduction au Tree-of-Thought',
      content: 'Le Tree-of-Thought (ToT) est une technique avancée qui guide l\'IA à explorer plusieurs chemins de raisonnement simultanément. Plutôt que de suivre une seule ligne de pensée, elle évalue différentes hypothèses, ce qui est crucial pour le diagnostic différentiel ou l\'analyse d\'interactions complexes en pharmacie.',
      variant: 'introduction',
    },
    {
      type: 'section',
      title: 'Pourquoi utiliser le Tree-of-Thought ?',
      content: 'Cette approche est particulièrement utile quand vous devez analyser plusieurs hypothèses en parallèle.',
      variant: 'key-points',
    },
    {
      type: 'points',
      title: 'Cas d\'Usage du Tree-of-Thought',
      points: [
        {
          title: 'Analyse d\'hypothèses diagnostiques',
          description: 'Explorer plusieurs causes possibles pour un même symptôme ou effet indésirable',
        },
        {
          title: 'Évaluation de stratégies thérapeutiques',
          description: 'Comparer différentes approches de traitement pour trouver la plus efficace',
        },
        {
          title: 'Résolution de cas complexes',
          description: 'Gérer les situations cliniques avec de multiples variables et incertitudes',
        },
        {
          title: 'Optimisation de protocoles',
          description: 'Tester différentes combinaisons et ajustements pour optimiser les soins',
        },
      ],
    },
    {
      type: 'section',
      title: 'Comment ça fonctionne ?',
      content: 'Le ToT fonctionne comme un arbre de décision où chaque \'nœud\' représente une étape de raisonnement. L\'IA explore plusieurs branches simultanément, évalue la qualité de chaque approche, puis choisit la meilleure ou combine plusieurs stratégies.',
      variant: 'section',
    },
    {
      type: 'section',
      title: 'Applications en pharmacie',
      content: 'Applications concrètes du Tree-of-Thought dans la pratique pharmaceutique',
      variant: 'examples',
    },
    {
      type: 'points',
      title: 'Applications Pharmaceutiques',
      points: [
        {
          title: 'Diagnostic différentiel',
          description: 'Explorer plusieurs causes possibles d\'un effet indésirable pour identifier la plus probable',
        },
        {
          title: 'Optimisation posologique',
          description: 'Tester différentes stratégies d\'ajustement de dose en fonction des paramètres du patient',
        },
        {
          title: 'Gestion des interactions',
          description: 'Analyser plusieurs scénarios d\'interaction médicamenteuse pour prévenir les risques',
        },
        {
          title: 'Planification thérapeutique',
          description: 'Évaluer différentes approches de traitement pour personnaliser la prise en charge',
        },
      ],
    },
  ],
} satisfies Concept

export default concept
