import type { Concept } from '@/lib/content-schema'

export const concept = {
  slug: 'architecture-agentique',
  type: 'concept',
  title: 'L\'Architecture Agentique : Au-delà du Chatbot',
  description: 'Comprendre la différence entre un chatbot réactif et un agent proactif qui planifie, agit et s\'auto-corrige.',
  category: 'concepts-fondamentaux',
  difficulty: 'intermédiaire',
  tags: ['ia', 'agent', 'architecture', 'plan-and-solve', 'react'],
  isFavorite: false,
  keyTakeaways: [
    'Les agents autonomes utilisent une boucle "Plan → Act → Vérifier → Corriger" au lieu de simplement répondre.',
    'Le framework "Plan-and-Solve" est plus adapté pour les tâches complexes nécessitant de la recherche.',
    'Comprendre l\'architecture de l\'IA permet de choisir le bon outil pour la bonne tâche.',
  ],

  content: [
    {
      type: 'introduction',
      title: 'De la Réponse à l\'Action',
      content: 'Un chatbot traditionnel est réactif : il attend une question et y répond. Un **agent IA** est proactif : on lui donne un objectif, et il élabore une stratégie pour l\'atteindre. Pour cela, il s\'appuie sur une "architecture agentique".',
    },
    {
      type: 'definition',
      title: 'Les 3 Modules Clés d\'un Agent',
      content: `Une architecture agentique se compose généralement de trois modules :
1.  **Perception :** L\'agent analyse la demande initiale et l\'environnement (par exemple, les outils disponibles, les données fournies).
2.  **Cognition :** Le "cerveau" de l\'agent. C\'est ici qu\'il planifie, raisonne, et décide de la prochaine action.
3.  **Action :** L\'agent exécute la décision prise, par exemple en utilisant un outil (comme une recherche web), en posant une question à l\'utilisateur, ou en générant du contenu.`,
    },
    {
      type: 'markdown',
      content: '## Les 3 Grandes Familles d\'Architectures',
    },
    {
      type: 'points',
      title: 'En 2025, on peut simplifier les architectures d\'agents de recherche en trois grands modèles :',
      points: [
        {
          title: '1. Plan-and-Solve',
          description: 'L\'agent élabore un plan complet et détaillé avant de commencer la moindre action. Idéal pour les tâches complexes nécessitant une vision à long terme. C\'est l\'approche de **Z.AI**.',
        },
        {
          title: '2. ReAct (Reason+Act)',
          description: 'L\'agent fonctionne en boucle courte : il pense (Reason), agit (Act), puis observe le résultat, et recommence. Idéal pour les tâches qui nécessitent des ajustements constants. C\'est l\'approche de **Claude** avec ses outils.',
        },
        {
          title: '3. RAG Multi-Étapes',
          description: 'L\'agent enchaîne des cycles de recherche d\'information (Retrieval-Augmented Generation) et de synthèse de manière itérative. C\'est une forme de ReAct spécialisée dans la recherche. C\'est l\'approche de **Perplexity**.',
        },
      ],
    },
    {
      type: 'markdown',
      content: '## Pourquoi c\'est important pour vous ?',
    },
    {
      type: 'example',
      title: 'Choix du bon agent pour une recherche bibliographique',
      description: 'Exemple concret de sélection d\'architecture selon la complexité de la tâche',
      content: 'Tâche : "Analyser les études sur les nouveaux anticoagulants oraux publiées entre 2020-2025"\n\n❌ Mauvais choix : Chatbot simple\n→ Réponse unique, limitée aux connaissances entraînées\n\n✅ Bon choix : Agent RAG Multi-Étapes (Perplexity)\n→ Recherche itérative, synthèse comparative, sources vérifiables\n\n✅ Bon choix : Agent Plan-and-Solve (Z.AI)\n→ Plan structuré, analyse exhaustive, mise en perspective',
      exampleType: 'workflow',
      difficulty: 'intermédiaire',
      tags: ['recherche', 'bibliographie', 'architecture-agentique'],
      outcome: 'Le choix de l\'architecture RAG Multi-Étapes permet une recherche approfondie avec des sources vérifiables et une synthèse comparative.',
      variant: 'card',
    },
    {
      type: 'citation',
      source: 'Yao et al.',
      title: 'ReAct: Synergizing Reasoning and Acting in Language Models',
      citationType: 'study',
      author: 'Shunyu Yao, Jeffrey Zhao, Dian Yu, Nan Du, Izhak Shafran, Karthik Narasimhan, Yuan Cao',
      year: '2023',
      url: 'https://arxiv.org/abs/2210.03629',
      journal: 'ICLR 2023',
      variant: 'compact',
    },
    {
      type: 'markdown',
      content: 'Comprendre l\'architecture sous-jacente d\'un outil vous permet de choisir le bon "spécialiste" pour votre besoin. Utiliser un agent "Plan-and-Solve" pour une question simple est inefficace, tandis qu\'utiliser un agent simple pour une revue de littérature complexe mènera à un résultat médiocre. C\'est la clé pour obtenir des résultats de haute qualité.',
    },
  ],
} satisfies Concept

export default concept
