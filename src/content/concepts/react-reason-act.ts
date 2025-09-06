import type { Concept } from '@/lib/content-schema'

const concept = {
  slug: 'react-reason-act',
  title: 'ReAct (Reason+Act)',
  description: 'La boucle de raisonnement courte : comment une IA réfléchit, agit, et observe pour accomplir des tâches étape par étape.',
  area: 'concepts',
  tags: ['ia', 'agent', 'architecture', 'react', 'claude'],
  isFavorite: false,
  cover: '/images/objectifs/recherche-biblio-apres.png',

  content: [
    {
      type: 'introduction',
      title: 'Penser, Agir, Observer, Répéter',
      content: 'L\'architecture "ReAct" (pour Reason + Act) est un modèle d\'action pour les agents IA qui imite la façon dont les humains accomplissent des tâches. Au lieu de tout planifier à l\'avance, l\'agent progresse par une série de petites boucles de raisonnement et d\'action.'
    },
    {
      type: 'analogy',
      title: 'L\'Analogie du Pharmacien à l\'Officine',
      content: `Un pharmacien qui prépare une ordonnance suit une boucle ReAct : 

1.  **Pensée (Reason) :** "Je dois préparer cette ordonnance. Je commence par lire la première ligne : Paracétamol 1g."
2.  **Action (Act) :** Il se tourne vers le tiroir des antalgiques et prend la boîte de Paracétamol.
3.  **Observation :** Il vérifie la boîte. "C'est bien du 1g. La date de péremption est bonne."

Il recommence ensuite la boucle pour le médicament suivant, s'ajustant à chaque étape. L'agent ReAct fonctionne de la même manière, en utilisant des "outils" (comme une recherche web, une calculatrice, etc.) à chaque étape.`,
    },
    {
      type: 'section',
      title: 'Quand utiliser cette architecture ?',
      content: [
        {
          type: 'markdown',
          content: 'Cette approche est idéale pour :'
        },
        {
          type: 'card',
          title: 'Les Tâches Nécessitant des Outils Externes',
          content: 'Chaque fois que l\'IA doit interagir avec une source d\'information externe (une API, une base de données, un moteur de recherche), la boucle ReAct lui permet de s\'assurer que le résultat de l\'outil est correct avant de continuer.'
        },
        {
          type: 'card',
          title: 'Les Problèmes où le Contexte Évolue Rapidement',
          content: 'Si la situation peut changer après chaque action, une planification rigide est inefficace. ReAct permet une grande flexibilité et une capacité d\'adaptation.'
        },
        {
          type: 'alert',
          variant: 'destructive',
          title: 'Le Point de Vigilance',
          content: 'Le risque principal est de se perdre dans une boucle ou d\'échouer à trouver une solution si les outils ne donnent pas les résultats attendus. L\'agent peut "tourner en rond" sans une stratégie globale.'
        },
      ],
    },
    {
      type: 'conclusion',
      title: 'L\'Outil de Prédilection',
      content: 'En 2025, **Claude** est l\'exemple le plus puissant de cette architecture grâce à sa fonctionnalité de "Tool Use", qui lui permet d\'interagir de manière fiable avec des outils externes.'
    },
  ],
} satisfies Concept

export default concept
