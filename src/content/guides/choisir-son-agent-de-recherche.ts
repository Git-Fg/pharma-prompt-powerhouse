import type { Guide } from '@/lib/content-schema'

export const guide = {
  slug: 'choisir-son-agent-de-recherche',
  type: 'guide',
  title: 'Choisir son Agent de Recherche : Z.AI vs Perplexity vs Claude',
  description: 'Un guide stratégique pour choisir le bon outil de recherche IA en fonction de la complexité de votre tâche, basé sur leurs architectures sous-jacentes.',
  category: 'guides',
  difficulty: 'intermédiaire',
  tags: ['ia', 'agent', 'recherche', 'z-ai', 'perplexity', 'claude'],
  isFavorite: true,
  isWorkflow: false,
  keyTakeaways: [
    'Les agents de recherche IA utilisent 3 architectures principales : Plan-and-Solve (Z.AI), RAG Multi-Étapes (Perplexity), et ReAct (Claude).',
    'Z.AI est idéal pour les recherches complexes et exploratoires grâce à sa planification structurée.',
    'Perplexity excelle dans la recherche factuelle rapide et la veille scientifique ciblée.',
    'Claude est le plus fiable pour les interactions contrôlées avec des documents spécifiques.',
    'Chaque outil a des risques spécifiques : hallucination stratégique (Z.AI), synthèse erronée (Perplexity), et dépendance de la qualité des documents (Claude).',
  ],

  content: [
    {
      type: 'markdown',
      content: '## Tous les "chercheurs IA" ne sont pas identiques',
    },
    {
      type: 'markdown',
      content: 'Vous avez une recherche bibliographique à faire. Quel outil choisir ? La réponse dépend de la nature de votre tâche. Comprendre comment ces outils "réfléchissent" est la clé pour faire le bon choix. On peut classer les principaux agents de recherche en trois grandes familles, chacune avec ses forces et ses faiblesses.',
    },
    {
      type: 'markdown',
      content: '## Les 3 Paradigmes de la Recherche IA',
    },
    {
      type: 'markdown',
      content: 'Pour faire simple, chaque agent de recherche a une \'personnalité\' différente, dictée par son architecture :\n- **Le Stratège (Plan-and-Solve) :** Il planifie tout à l\'avance. C\'est l\'approche de Z.AI.\n- **Le Sprinteur Itératif (RAG Multi-Étapes) :** Il cherche, synthétise, et recommence en boucle. C\'est l\'approche de Perplexity.\n- **L\'Exécutant Prudent (ReAct) :** Il réfléchit, agit, observe, et ajuste. C\'est l\'approche de Claude quand il utilise des outils.',
    },
    {
      type: 'table',
      caption: 'Tableau comparatif des architectures d\'agents de recherche.',
      headers: ['Critère', 'Z.AI (Auto Think)', 'Perplexity (Deep Research)', 'Claude (Tool Use)'],
      rows: [
        ['**Architecture sous-jacente**', '**Plan-and-Solve**', '**RAG Multi-Étapes**', '**ReAct (Reason+Act)**'],
        ['**Idéal pour...**', 'Recherches exploratoires complexes, création de contenu structuré.', 'Recherche factuelle rapide, veille scientifique ciblée.', 'Tâches contrôlées nécessitant des interactions fiables avec des documents.'],
        ['**Transparence du Plan**', '**Élevée**', '**Faible**', '**Très Élevée**'],
        ['**Vitesse**', 'Lente au démarrage', 'Rapide', 'Variable'],
        ['**Risque Principal**', 'Hallucination Stratégique (plan biaisé)', 'Synthèse erronée des sources', 'Peut se perdre dans les boucles'],
      ],
    },
    {
      type: 'tabs',
      defaultValue: 'z-ai',
      tabs: [
        {
          value: 'z-ai',
          title: 'Z.AI',
          content: [
            {
              type: 'card',
              title: 'Le Stratège (Plan-and-Solve)',
              content: `**Scénario idéal :** Vous devez faire une revue de littérature pour votre thèse sur un sujet que vous connaissez peu.

**Pourquoi Z.AI ?**
- **Approche planifiée** qui structure la recherche de manière logique
- **Exploration systématique** des sous-thèmes
- **Synthèse cohérente et globale** des informations trouvées
- **Idéal** pour les recherches exploratoires complexes

**Architecture :** Plan-and-Solve (Auto Think)
**Risque principal :** Hallucination stratégique (vérifiez toujours son plan)`,
            },
          ],
        },
        {
          value: 'perplexity',
          title: 'Perplexity',
          content: [
            {
              type: 'card',
              title: 'Le Sprinteur Itératif (RAG Multi-Étapes)',
              content: `**Scénario idéal :** Vous entendez parler d\'un nouveau médicament et vous voulez rapidement savoir ce que sont les dernières études publiées.

**Pourquoi Perplexity ?**
- **Vitesse exceptionnelle** pour la recherche factuelle
- **Focus sur les sources récentes** et pertinentes
- **Veille scientifique ciblée** très efficace
- **Synthèse rapide** d\'informations actualisées

**Architecture :** RAG Multi-Étapes (Deep Research)
**Risque principal :** Context drift (peut oublier le début de la question)`,
            },
          ],
        },
        {
          value: 'claude',
          title: 'Claude',
          content: [
            {
              type: 'card',
              title: 'L\'Exécutant Prudent (ReAct)',
              content: `**Scénario idéal :** Vous avez déjà sélectionné 5 études cliniques en PDF et vous voulez en extraire précisément le protocole, la population et les résultats pour les comparer.

**Pourquoi Claude ?**
- **Fiabilité maximale** pour interagir avec des documents fournis
- **Vérification systématique** de chaque étape d\'extraction
- **Contrôle précis** sur le processus d\'analyse
- **Robustesse** dans les tâches documentaires

**Architecture :** ReAct (Reason+Act avec Tool Use)
**Risque principal :** Dépend entièrement de la qualité des documents fournis`,
            },
          ],
        },
      ],
    },
    {
      type: 'alert',
      variant: 'destructive',
      title: 'Points de Vigilance Avancés',
      content: 'Attention à l\'**hallucination stratégique** avec Z.AI (vérifiez son plan) et au **context drift** avec Perplexity (il peut oublier le début de la question dans ses boucles). La robustesse de Claude dépend entièrement de la qualité des documents que vous lui donnez.',
    },
  ],
} satisfies Guide

export default guide
