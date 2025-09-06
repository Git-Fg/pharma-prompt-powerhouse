import type { Concept } from '@/lib/content-schema'

export const concept = {
  slug: 'plan-and-solve',
  title: 'Plan-and-Solve',
  description: 'L\'architecture des stratèges : comment une IA peut planifier une tâche complexe de A à Z avant de commencer.',
  category: 'concepts',
  difficulty: 'intermédiaire',
  tags: ['ia', 'agent', 'architecture', 'plan-and-solve', 'z-ai'],
  isFavorite: false,
  keyTakeaways: [
    'L\'architecture "Plan-and-Solve" fait planifier l\'IA avant d\'agir, comme un chercheur rédigeant un protocole.',
    'Cette approche est idéale pour les revues de littérature exhaustives et la création de contenu structuré.',
    'Le principal risque est l\'hallucination stratégique : valider toujours le plan avant exécution.',
  ],

  content: [
    {
      type: 'introduction',
      title: 'La Stratégie avant l\'Action',
      content: 'L\'architecture "Plan-and-Solve" est une approche où l\'agent IA ne se précipite pas pour agir. Il prend d\'abord le temps de décomposer un objectif complexe en une séquence d\'étapes logiques et réalisables. Ce n\'est qu\'une fois ce plan validé qu\'il commence à l\'exécuter.',
    },
    {
      type: 'analogy',
      title: 'L\'Analogie du Chercheur en Laboratoire',
      content: 'Imaginez un chercheur qui doit mener une expérience complexe. Il ne commence pas à mélanger des produits au hasard. D\'abord, il rédige un protocole détaillé : les étapes, les matériaux, les mesures à prendre, les points de contrôle. L\'agent "Plan-and-Solve" fait exactement la même chose : il rédige son propre protocole de recherche avant de lancer la première requête.',
    },
    {
      type: 'section',
      title: 'Quand utiliser cette architecture ?',
      content: 'Cette approche est particulièrement efficace pour :\n\n**Les Revues de Littérature Exhaustives**\nLorsqu\'il faut synthétiser de nombreuses sources sur un sujet large, le plan initial garantit que toutes les facettes du problème seront explorées de manière cohérente.\n\n**La Création de Contenu Structuré**\nPour générer un rapport, un cours ou une présentation, l\'agent peut d\'abord planifier la structure (introduction, chapitres, conclusion) puis générer chaque partie.\n\n⚠️ **Le Point de Vigilance**\nLe principal risque est celui de l\'"hallucination stratégique". Si l\'agent interprète mal la demande initiale, tout son plan peut être hors-sujet ou biaisé. Il est crucial de valider le plan avant de le laisser continuer.',
    },
    {
      type: 'conclusion',
      title: 'L\'Outil de Prédilection',
      content: 'En 2025, **Z.AI** avec son mode "Auto Think" est l\'exemple le plus abouti et accessible de l\'architecture "Plan-and-Solve" pour les étudiants.',
    },
  ],
} satisfies Concept

export default concept
