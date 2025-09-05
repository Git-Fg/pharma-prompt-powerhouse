import type { Concept } from '@/lib/content-schema'

const concept = {
  slug: 'architecture-agentique',
  title: 'L\'Architecture Agentique : Au-delà du Chatbot',
  description: 'Comprendre la différence entre un chatbot réactif et un agent proactif qui planifie, agit et s\'auto-corrige.',
  area: 'concepts',
  tags: ['ia', 'agent', 'architecture', 'plan-and-solve', 'react'],
  isFavorite: false,
  cover: '/images/objectifs/recherche-biblio-apres.png',

  content: [
    {
      type: 'introduction',
      title: 'De la Réponse à l\'Action',
      content: 'Un chatbot traditionnel est réactif : il attend une question et y répond. Un **agent IA** est proactif : on lui donne un objectif, et il élabore une stratégie pour l\'atteindre. Pour cela, il s\'appuie sur une "architecture agentique".'
    },
    {
      type: 'definition',
      title: 'Les 3 Modules Clés d\'un Agent',
      content: `Une architecture agentique se compose généralement de trois modules :
1.  **Perception :** L\'agent analyse la demande initiale et l\'environnement (par exemple, les outils disponibles, les données fournies).
2.  **Cognition :** Le "cerveau" de l\'agent. C\'est ici qu\'il planifie, raisonne, et décide de la prochaine action.
3.  **Action :** L\'agent exécute la décision prise, par exemple en utilisant un outil (comme une recherche web), en posant une question à l\'utilisateur, ou en générant du contenu.`
    },
    {
      type: 'section',
      title: 'Les 3 Grandes Familles d\'Architectures',
      content: [
        {
          type: 'markdown',
          content: `En 2025, on peut simplifier les architectures d\'agents de recherche en trois grands modèles :`
        },
        {
          type: 'card',
          title: '1. Plan-and-Solve',
          content: 'L\'agent élabore un plan complet et détaillé avant de commencer la moindre action. Idéal pour les tâches complexes nécessitant une vision à long terme. C\'est l\'approche de **Z.AI**.'
        },
        {
          type: 'card',
          title: '2. ReAct (Reason+Act)',
          content: 'L\'agent fonctionne en boucle courte : il pense (Reason), agit (Act), puis observe le résultat, et recommence. Idéal pour les tâches qui nécessitent des ajustements constants. C\'est l\'approche de **Claude** avec ses outils.'
        },
        {
          type: 'card',
          title: '3. RAG Multi-Étapes',
          content: 'L\'agent enchaîne des cycles de recherche d\'information (Retrieval-Augmented Generation) et de synthèse de manière itérative. C\'est une forme de ReAct spécialisée dans la recherche. C\'est l\'approche de **Perplexity**.'
        }
      ]
    },
    {
      type: 'conclusion',
      title: 'Pourquoi c\'est important pour vous ?',
      content: 'Comprendre l\'architecture sous-jacente d\'un outil vous permet de choisir le bon "spécialiste" pour votre besoin. Utiliser un agent "Plan-and-Solve" pour une question simple est inefficace, tandis qu\'utiliser un agent simple pour une revue de littérature complexe mènera à un résultat médiocre. C\'est la clé pour obtenir des résultats de haute qualité.'
    }
  ],
} satisfies Concept

export default concept
