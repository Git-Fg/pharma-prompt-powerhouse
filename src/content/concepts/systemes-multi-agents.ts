import type { Concept } from '@/lib/content-schema'

const concept = {
  slug: 'systemes-multi-agents',
  title: 'Les Systèmes Multi-Agents (SMA)',
  description: 'Simuler un comité d\'experts : comment faire collaborer plusieurs IA spécialisées pour résoudre un problème complexe.',
  area: 'concepts',
  tags: ['ia', 'agent', 'architecture', 'collaboration'],
  isFavorite: false,
  cover: '/images/objectifs/recherche-biblio-apres.png',

  content: [
    {
      type: 'introduction',
      title: 'Le Pouvoir de la Collaboration',
      content: 'Un système multi-agents n\'est pas une IA unique, mais un ensemble d\'IA (ou "agents") qui travaillent ensemble pour atteindre un objectif commun. Chaque agent a souvent un rôle, une expertise ou une perspective qui lui est propre. C\'est une approche très puissante pour résoudre des problèmes complexes qui nécessitent plusieurs points de vue.'
    },
    {
      type: 'analogy',
      title: 'L\'Analogie du Comité d\'Experts Hospitalier',
      content: 'Face à un cas complexe, on réunit un comité : un cardiologue, un pharmacien, un infectiologue, etc. Chacun apporte son expertise. Le système multi-agents fait de même : on peut demander à une IA de jouer le rôle de plusieurs experts, chacun analysant le problème sous un angle différent. La décision finale est prise en synthétisant ces différentes analyses.'
    },
    {
      type: 'section',
      title: 'Pourquoi est-ce une Approche Robuste ?',
      content: [
        {
          type: 'markdown',
          content: 'Simuler un comité d\'experts avec une IA offre plusieurs avantages :'
        },
        {
          type: 'card',
          title: 'Réduction des Biais',
          content: 'En forçant l\'IA à adopter des perspectives différentes, on réduit le risque qu\'elle s\'enferme dans une seule ligne de raisonnement. Un agent "épidémiologiste" n\'aura pas les mêmes réflexes qu\'un agent "pharmacologue".'
        },
        {
          type: 'card',
          title: 'Analyse Plus Exhaustive',
          content: 'Chaque agent est focalisé sur sa tâche, ce qui permet d'explorer chaque facette d'un problème avec plus de profondeur qu'une IA généraliste qui essaierait de tout faire en même temps.'
        },
        {
          type: 'card',
          title: 'Transparence du Raisonnement',
          content: 'La structure même du prompt rend le processus de pensée de l\'IA beaucoup plus transparent. On peut voir clairement l\'avis de chaque "expert" avant la synthèse finale, ce qui permet de mieux évaluer la validité de la conclusion.'
        }
      ]
    },
    {
      type: 'conclusion',
      title: 'Une Technique Avancée à votre Portée',
      content: 'Même sans outils de développement complexes, vous pouvez implémenter un système multi-agents simple directement dans un prompt en définissant clairement les rôles que vous voulez que l\'IA adopte. C\'est la base de notre nouveau workflow sur l\'analyse de signaux de pharmacovigilance.'
    }
  ],
} satisfies Concept

export default concept
