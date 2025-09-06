import type { Concept } from '@/lib/content-schema'

export const concept = {
  slug: 'hallucination-strategique',
  title: 'L\'Hallucination Stratégique',
  description: 'Un risque subtil des agents planificateurs : quand le plan lui-même est basé sur une mauvaise prémisse.',
  category: 'concepts',
  difficulty: 'intermédiaire',
  tags: ['ia', 'agent', 'plan-and-solve', 'biais', 'fiabilité'],
  isFavorite: false,
  keyTakeaways: [
    'L\'hallucination stratégique est un risque propre aux agents "Plan-and-Solve" où le plan lui-même est basé sur une mauvaise prémisse.',
    'Contrairement à l\'hallucination factuelle, chaque étape du plan peut être correcte mais la stratégie globale est erronée.',
    'La mitigation implique de valider le plan avant exécution, d\'être précis dans l\'objectif, et d\'itérer par étapes.',
  ],

  content: [
    {
      type: 'introduction',
      title: 'Un Danger Plus Subtil',
      content: 'Nous connaissons tous l\'hallucination factuelle, où une IA invente une information. L\'hallucination stratégique est un risque propre aux agents "Plan-and-Solve". Ici, ce n\'est pas une donnée qui est fausse, mais le plan d\'action tout entier qui est défectueux ou basé sur une mauvaise interprétation de l\'objectif.',
    },
    {
      type: 'analogy',
      title: 'L\'Analogie du GPS Défaillant',
      content: 'Imaginez que vous demandiez à votre GPS de trouver l\'itinéraire le plus rapide pour l\'hôpital. L\'hallucination factuelle serait qu\'il invente un nom de rue. L\'hallucination stratégique serait qu\'il comprenne "magasin" au lieu d\'"hôpital" et qu\'il vous calcule un itinéraire parfait... vers la mauvaise destination. Chaque étape de l\'itinéraire est correcte, mais le plan global est erroné.',
    },
    {
      type: 'section',
      title: 'Comment la Détecter et la Mitiger ?',
      content: 'Le risque est élevé car le plan peut paraître très logique et bien structuré. Voici comment s\'en prémunir :\n\n**1. Validez Toujours le Plan**\nLes meilleurs agents "Plan-and-Solve" (comme Z.AI) vous montrent leur plan avant de l\'exécuter. Ne l\'ignorez jamais. Lisez-le attentivement. Est-ce que les étapes correspondent bien à ce que vous voulez faire ?\n\n**2. Soyez Extrêmement Précis dans votre Objectif Initial**\nPlus votre demande est ambiguë, plus le risque d\'interprétation erronée est grand. Fournissez un contexte clair, définissez les termes importants et précisez le format de sortie attendu.\n\n**3. Itérez en Plusieurs Fois**\nPour une tâche très complexe, ne demandez pas tout d\'un coup. Commencez par une demande plus simple, validez le plan et les premiers résultats, puis demandez à l\'agent de continuer ou de raffiner sa stratégie.',
    },
    {
      type: 'conclusion',
      title: 'Un Nouveau Réflexe à Adopter',
      content: 'Avec les agents planificateurs, la vérification ne se fait plus seulement à la fin (sur les faits), mais aussi au début (sur la stratégie). C\'est une nouvelle compétence cruciale pour utiliser ces outils puissants en toute sécurité.',
    },
  ],
} satisfies Concept

export default concept
