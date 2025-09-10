import type { ExternalTool } from '@/lib/content-schema'

const externalTool = {
  slug: 'perplexity-ai',
  type: 'tool',
  title: 'Perplexity AI',
  description: 'Le "Hub de Modèles" pour la recherche. Accédez aux meilleurs modèles du marché (GPT-5, Claude 4 Opus) et à un agent de recherche autonome.',
  url: 'https://www.perplexity.ai/',
  category: 'recherche',
  tags: ['recherche', 'RAG', 'sources', 'hub-modeles', 'agent-ia'],
  isFavorite: true,

  personalReview: 'Perplexity a radicalement changé. Ce n\'est plus juste un moteur de recherche, c\'est un orchestrateur d\'IA. Pour 20$/mois, j\'ai accès à tous les modèles de pointe sans devoir payer chaque abonnement séparément. Sa nouvelle fonction "Deep Research" transforme Perplexity en un véritable agent qui planifie et exécute une recherche complète, me livrant un rapport sourcé en quelques minutes. C\'est un outil de productivité exceptionnel pour démarrer une recherche bibliographique.',

  strongPoints: [
    'Accès aux meilleurs modèles (GPT-5, Claude 4 Opus, etc.) via un seul abonnement.',
    'Fonctionnalité "Deep Research" qui agit comme un agent de recherche autonome.',
    'Analyse de fichiers illimitée en version Pro.',
    'Cite toujours ses sources, ce qui reste un gage de fiabilité.',
  ],

  vigilancePoints: [
    'La version gratuite est maintenant très limitée en "Pro Searches" (5 par jour).',
    'La valeur ajoutée réside quasi exclusivement dans l\'offre payante.',
    'Le résumé peut toujours simplifier à l\'excès, la vérification des sources reste indispensable.',
  ],

  confidenceScore: 4,
  confidenceJustification: 'Le score est augmenté car il s\'appuie sur les meilleurs modèles du marché. L\'accès centralisé et la fonction Deep Research en font un outil très puissant. La vérification des sources reste un point de vigilance qui l\'empêche d\'avoir 5/5.',

  freeVsPaidOffer: `| Fonctionnalité | Version Gratuite | Version Pro (~20$/mois) |\n| :--- | :--- | :--- |\n| **Modèle de recherche** | Sonar (propriétaire) | ✅ **Choix parmi GPT-5, Claude 4 Opus, etc.** |\n| **\"Pro Searches\"** | 5 par jour | ✅ **300+ par jour** |\n| **Analyse de fichiers** | Limitée | ✅ **Illimitée** |\n| **Agent \"Deep Research\"** | ❌ Non | ✅ **Inclus** |`,

  content: [
    {
      type: 'section',
      title: 'Comparaison des Offres : Gratuit vs Pro',
      content: 'Perplexity propose une version gratuite très limitée et une version Pro (~20$/mois) qui débloque l\'accès aux meilleurs modèles et à l\'agent de recherche autonome.',
      variant: 'key-points',
    },
    {
      type: 'example',
      title: 'Utilisation de Deep Research pour une revue de littérature',
      description: 'Exemple concret d\'utilisation de l\'agent autonome pour une recherche approfondie',
      content: 'Requête : "Analyse comparative des nouvelles thérapies contre l\'obésité (GLP-1, GIP/GLP-1) publiées dans les 3 dernières années"\n\nProcessus Deep Research :\n1. Planification : Identification des molécules concernées (sémaglutide, tirzépatide, rétratutide)\n2. Recherche : Consultation de PubMed, NEJM, Lancet, sites d\'agences réglementaires\n3. Analyse : Extraction des données d\'efficacité, sécurité, mécanismes d\'action\n4. Synthèse : Génération d\'un rapport structuré avec tableau comparatif\n\nRésultat obtenu :\n- Rapport de 8 pages avec 45 sources citées\n- Tableau comparatif des efficacités (perte de poids %)\n- Analyse des effets secondaires et contre-indications\n- Perspectives d\'avenir et molécules en développement',
      exampleType: 'workflow',
      difficulty: 'avancé',
      tags: ['recherche', 'perplexity', 'deep-research'],
      outcome: 'L\'agent Deep Research permet d\'obtenir en quelques minutes une analyse exhaustive qui prendrait normalement plusieurs heures de recherche manuelle.',
      variant: 'card',
    },
    {
      type: 'citation',
      source: 'Perplexity AI',
      title: 'Introducing Deep Research: Autonomous Research Agent',
      citationType: 'website',
      author: 'Perplexity Team',
      year: '2024',
      url: 'https://www.perplexity.ai/hub/blog/deep-research',
      variant: 'compact',
    },
    {
      type: 'table',
      caption: 'Comparaison détaillée des fonctionnalités entre version gratuite et version Pro',
      headers: ['Fonctionnalité', 'Version Gratuite', 'Version Pro (~20$/mois)'],
      rows: [
        ['**Modèle de recherche**', 'Sonar (propriétaire)', '✅ **Choix parmi GPT-5, Claude 4 Opus, etc.**'],
        ['**"Pro Searches"**', '5 par jour', '✅ **300+ par jour**'],
        ['**Analyse de fichiers**', 'Limitée', '✅ **Illimitée**'],
        ['**Agent "Deep Research"**', '❌ Non', '✅ **Inclus**'],
      ],
    },
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
