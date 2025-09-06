import type { Concept } from '@/lib/content-schema'

export const concept = {
  slug: 'self-consistency',
  title: 'Self-Consistency',
  description: 'Améliorer la robustesse des réponses en générant plusieurs chemins de raisonnement et en sélectionnant la conclusion la plus fréquente par un vote majoritaire.',
  category: 'Concepts Avancés',
  difficulty: 'avancé',
  tags: ['fiabilisation', 'raisonnement', 'vote-majoritaire'],
  isFavorite: false,
  keyTakeaways: [
    'Self-Consistency améliore la robustesse en générant plusieurs chemins de raisonnement et en votant pour la conclusion la plus fréquente.',
    'Cette technique réduit le risque d\'erreurs de logique en utilisant une approche statistique.',
    'L\'évolution RASC (Reasoning-Aware Self-Consistency) analyse aussi la qualité du raisonnement, pas seulement la conclusion.',
  ],
  content: [
    {
      type: 'section',
      title: '1. L\'Analogie Simple : Demander l\'Avis de Plusieurs Experts',
      content: 'Imaginez que vous ayez un problème complexe. Au lieu de ne consulter qu\'un seul expert, vous en consultez cinq. Vous leur posez exactement la même question.',
      variant: 'analogy',
    },
    {
      type: 'points',
      title: 'Principe du Vote Majoritaire',
      points: [
        {
          title: 'Majorité Consensuelle',
          description: 'Quatre experts, bien qu\'utilisant des raisonnements légèrement différents, arrivent à la même conclusion finale',
        },
        {
          title: 'Opinion Minoritaire',
          description: 'Le cinquième expert arrive à une conclusion totalement différente',
        },
        {
          title: 'Confiance Statistique',
          description: 'Intuitivement, vous ferez davantage confiance à la conclusion majoritaire. La Self-Consistency applique ce principe à l\'IA',
        },
      ],
    },
    {
      type: 'section',
      title: '2. La Définition Formelle',
      content: 'La Self-Consistency est une technique qui améliore la performance des modèles de langage sur des tâches de raisonnement. Elle s\'appuie sur l\'idée qu\'il existe souvent plusieurs chemins de pensée pour résoudre un problème complexe.',
      variant: 'section',
    },
    {
      type: 'actionChecklist',
      title: 'Processus Self-Consistency',
      description: 'Les 3 étapes de la méthode Self-Consistency',
      items: [
        {
          id: 'cot-prompt',
          title: 'Utiliser un prompt Chain-of-Thought',
          description: 'Encourager le raisonnement étape par étape avec un prompt CoT',
          priority: 'high',
        },
        {
          id: 'multi-generation',
          title: 'Générer plusieurs sorties indépendantes',
          description: 'Utiliser une température > 0.5 pour introduire de la diversité dans les chemins de raisonnement',
          priority: 'high',
        },
        {
          id: 'vote-majoritaire',
          title: 'Agréger les résultats par vote majoritaire',
          description: 'Extraire la réponse finale de chaque sortie et choisir la plus fréquente',
          priority: 'high',
        },
      ],
      variant: 'default',
      allowChecking: true,
    },
    {
      type: 'section',
      title: '3. Pourquoi C\'est Important Pour Vous ?',
      content: 'Pour les questions à fort enjeu (ex: posologie, contre-indication), la fiabilité est non négociable. La Self-Consistency est une méthode statistique pour augmenter cette fiabilité.',
      variant: 'key-points',
    },
    {
      type: 'points',
      title: 'Avantages en Pharmacie',
      points: [
        {
          title: 'Robustesse Accrue',
          description: 'Réduit la probabilité qu\'une erreur de calcul ou de logique dans une seule chaîne de raisonnement ne conduise à une réponse finale incorrecte',
        },
        {
          title: 'Confiance dans le Résultat',
          description: 'Si 5 générations sur 5 aboutissent à la même conclusion, votre niveau de confiance est maximal. Si les avis divergent, cela signale une ambiguïté nécessitant une investigation humaine',
        },
        {
          title: 'Dépassement du Raisonnement Linéaire',
          description: 'Permet de découvrir des solutions correctes même si le chemin de raisonnement le plus \'évident\' pour le modèle contient une faille',
        },
      ],
    },
    {
      type: 'section',
      title: '4. Pour Aller Plus Loin : l\'Évolution vers RASC',
      content: 'La limite de la Self-Consistency classique est qu\'elle traite tous les raisonnements de la même manière. Un raisonnement brillant mais qui aboutit à une conclusion minoritaire est écarté.',
      variant: 'examples',
    },
    {
      type: 'actionChecklist',
      title: 'Processus RASC (Reasoning-Aware Self-Consistency)',
      description: 'L\'évolution de la Self-Consistency qui analyse la qualité du raisonnement',
      items: [
        {
          id: 'generation-paires',
          title: 'Générer plusieurs paires (raisonnement, réponse)',
          description: 'Créer des ensembles complets de raisonnement et leur conclusion associée',
          priority: 'high',
        },
        {
          id: 'filtrage-qualite',
          title: 'Filtrer par qualité de raisonnement',
          description: 'Écarter les réponses incorrectes ou dont le raisonnement est jugé de mauvaise qualité',
          priority: 'high',
        },
        {
          id: 'vote-filtre',
          title: 'Vote majoritaire sur raisonnements solides',
          description: 'Effectuer un vote uniquement sur les réponses issues de raisonnements jugés fiables',
          priority: 'high',
        },
      ],
      variant: 'card',
      allowChecking: true,
    },
  ],
} satisfies Concept

export default concept
