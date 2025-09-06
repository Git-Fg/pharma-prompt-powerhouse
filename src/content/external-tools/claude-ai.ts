import type { ExternalTool } from '@/lib/content-schema'

const externalTool = {
  slug: 'claude-ai',
  title: 'Claude.ai',
  description: 'Mon assistant de recherche pour l\'analyse de documents et le raisonnement complexe, avec des capacités agentiques en version Pro.',
  url: 'https://claude.ai/',
  category: 'outils',
  tags: ['analyse-document', 'pdf', 'anthropic', 'agent-ia'],
  isFavorite: true,

  personalReview: 'Claude est devenu mon assistant de recherche principal pour les projets longs comme un mémoire. La version Pro, avec Claude 4 Opus et ses capacités agentiques ("Tool Use"), peut analyser des documents, chercher des informations complémentaires et maintenir une mémoire de projet sur plusieurs jours. C\'est un changement majeur qui le transforme en véritable partenaire de travail.',

  strongPoints: [
    'Segmentation claire : Sonnet pour la rapidité, Opus (Pro) pour la puissance de raisonnement.',
    'Capacités agentiques (\"Tool Use\", \"Working Notes\") en version Pro pour des tâches autonomes.',
    'Fenêtre de contexte jusqu\'à 1 million de tokens avec Opus pour l\'analyse de corpus très volumineux.',
    'Fiabilité reconnue et faible tendance à l\'hallucination.',
  ],

  vigilancePoints: [
    'Le quota de la version gratuite reste un facteur limitant (~50 messages / 8 heures).',
    'Les fonctionnalités les plus puissantes (Projects, Tool Use) sont exclusives à l\'abonnement Pro.',
    'Politique de confidentialité "Opt-Out" par défaut à partir de fin septembre 2025.',
  ],

  confidenceScore: 4,
  confidenceJustification: 'Très bon score car l\'outil est fiable et sa politique de données est claire. Son architecture ReAct le rend particulièrement robuste pour le raisonnement. Il n\'a pas 5/5 car les quotas gratuits peuvent être frustrants.',

  freeVsPaidOffer: `| Fonctionnalité | Version Gratuite | Version Pro (~20€/mois) |\n| :--- | :--- | :--- |\n| **Modèle principal** | Claude 4 Sonnet | ✅ Claude 4 **Opus** |\n| **Contexte max** | 200k tokens | ✅ **~1 000 000 tokens** |\n| **Capacités Agentiques** | ❌ Non | ✅ **Tool Use & Working Notes** |\n| **Quota d\'usage** | Limité (~50 messages/8h) | ✅ **5x plus de messages** |`,

  content: [
    {
      type: 'table',
      caption: 'Tableau comparatif des architectures d\'agents de recherche.',
      headers: ['Critère', 'Z.AI (Auto Think)', 'Perplexity (Deep Research)', 'Claude (Tool Use)'],
      rows: [
        ['**Architecture sous-jacente**', '**Plan-and-Solve** : Planification initiale complète, suivie de l\'exécution.', '**RAG Multi-Étapes** : Boucle itérative de recherche et synthèse.', '**ReAct (Reason+Act)** : Boucle \"Pensée → Action → Observation\".'],
        ['**Transparence du Plan**', '**Élevée** : Le plan de recherche (\"trajectory\") est souvent visible.', '**Faible** : Processus interne en \"boîte noire\".', '**Potentiellement Très Élevée** : Dépend de l\'interface, chaque étape est distincte.'],
        ['**Robustesse (Requêtes Complexes)**', '**Élevée** : Conçu pour les tâches multi-étapes complexes.', '**Moyenne** : Peut se perdre dans des boucles sans plan global.', '**Élevée** : S\'auto-corrige à chaque étape \"Observation\".'],
        ['**Vitesse**', '**Moyenne à Lente** : Latence due à la planification initiale.', '**Rapide** : Optimisé pour la vitesse.', '**Variable (souvent lente)** : De multiples cycles \"Pensée-Action\".'],
        ['**Risque d\'Hallucination**', '**Déplacé vers le plan** : Le risque est dans la création d\'un plan biaisé.', '**Élevé dans la synthèse** : Risque classique du RAG (mal interpréter les sources).', '**Faible (si bien implémenté)** : Raisonne sur des résultats concrets d\'outils.'],
      ],
    },
  ],
} satisfies ExternalTool

export { externalTool }
