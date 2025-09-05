import type { ExternalTool } from '@/lib/content-schema'

const externalTool = {
  slug: 'perplexity-ai',
  title: 'Perplexity AI',
  description: 'Le "Hub de Modèles" pour la recherche. Accédez aux meilleurs modèles du marché (GPT-5, Claude 4 Opus) et à un agent de recherche autonome.',
  url: 'https://www.perplexity.ai/',
  category: 'recherche',
  tags: ['recherche', 'RAG', 'sources', 'hub-modeles', 'agent-ia'],
  isFavorite: true,

  personalReview: "Perplexity a radicalement changé. Ce n'est plus juste un moteur de recherche, c'est un orchestrateur d'IA. Pour 20$/mois, j'ai accès à tous les modèles de pointe sans devoir payer chaque abonnement séparément. Sa nouvelle fonction \"Deep Research\" transforme Perplexity en un véritable agent qui planifie et exécute une recherche complète, me livrant un rapport sourcé en quelques minutes. C'est un outil de productivité exceptionnel pour démarrer une recherche bibliographique.",
  
  strongPoints: [
    'Accès aux meilleurs modèles (GPT-5, Claude 4 Opus, etc.) via un seul abonnement.',
    'Fonctionnalité "Deep Research" qui agit comme un agent de recherche autonome.',
    'Analyse de fichiers illimitée en version Pro.',
    'Cite toujours ses sources, ce qui reste un gage de fiabilité.',
  ],

  vigilancePoints: [
    'La version gratuite est maintenant très limitée en "Pro Searches" (5 par jour).',
    "La valeur ajoutée réside quasi exclusivement dans l'offre payante.",
    "Le résumé peut toujours simplifier à l'excès, la vérification des sources reste indispensable.",
  ],
  
  confidenceScore: 4,
  confidenceJustification: "Le score est augmenté car il s'appuie sur les meilleurs modèles du marché. L'accès centralisé et la fonction Deep Research en font un outil très puissant. La vérification des sources reste un point de vigilance qui l'empêche d'avoir 5/5.",
  
  freeVsPaidOffer: `| Fonctionnalité | Version Gratuite | Version Pro (~20$/mois) |\n| :--- | :--- | :--- |\n| **Modèle de recherche** | Sonar (propriétaire) | ✅ **Choix parmi GPT-5, Claude 4 Opus, etc.** |\n| **\"Pro Searches\"** | 5 par jour | ✅ **300+ par jour** |\n| **Analyse de fichiers** | Limitée | ✅ **Illimitée** |\n| **Agent \"Deep Research\"** | ❌ Non | ✅ **Inclus** |`,
  
  content: [
        {
      type: 'table',
      caption: "Tableau comparatif des architectures d'agents de recherche.",
      headers: ['Critère', 'Z.AI (Auto Think)', 'Perplexity (Deep Research)', 'Claude (Tool Use)'],
      rows: [
        ['**Architecture sous-jacente**', '**Plan-and-Solve** : Planification initiale complète, suivie de l'exécution.', '**RAG Multi-Étapes** : Boucle itérative de recherche et synthèse.', '**ReAct (Reason+Act)** : Boucle \"Pensée → Action → Observation\".'],
        ['**Transparence du Plan**', '**Élevée** : Le plan de recherche (\"trajectory\") est souvent visible.', '**Faible** : Processus interne en \"boîte noire\".', '**Potentiellement Très Élevée** : Dépend de l\'interface, chaque étape est distincte.'],
        ['**Robustesse (Requêtes Complexes)**', '**Élevée** : Conçu pour les tâches multi-étapes complexes.', '**Moyenne** : Peut se perdre dans des boucles sans plan global.', '**Élevée** : S\'auto-corrige à chaque étape \"Observation\".'],
        ['**Vitesse**', '**Moyenne à Lente** : Latence due à la planification initiale.', '**Rapide** : Optimisé pour la vitesse.', '**Variable (souvent lente)** : De multiples cycles \"Pensée-Action\".'],
        ['**Risque d'Hallucination**', '**Déplacé vers le plan** : Le risque est dans la création d\'un plan biaisé.', '**Élevé dans la synthèse** : Risque classique du RAG (mal interpréter les sources).', '**Faible (si bien implémenté)** : Raisonne sur des résultats concrets d\'outils.']
      ]
    },
  ],
} satisfies ExternalTool

export { externalTool }
