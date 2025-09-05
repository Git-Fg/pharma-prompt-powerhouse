import type { ExternalTool } from '@/lib/content-schema'

const externalTool = {
  slug: 'z-ai',
  title: 'Chat Z.AI',
  description: 'Mon outil de recherche N°1, un agent planificateur gratuit qui surpasse souvent les alternatives payantes pour les tâches complexes.',
  url: 'https://chat.z.ai/',
  category: 'suite-creative',
  tags: ['gratuit', 'recherche', 'présentations', 'GLM-4.5', 'plan-and-solve'],
  isFavorite: true,

  personalReview: 'Z.AI est le deuxième pilier de mon \'Core Kit\' quotidien. Sa force ne réside pas seulement dans son modèle GLM-4.5, mais dans son architecture d\'agent "Plan-and-Solve". Pour une recherche complexe, il ne se contente pas de chercher : il élabore un plan d\'action complet avant d\'agir, ce qui donne des résultats incroyablement cohérents et approfondis. C\'est l\'outil que je dégaine pour les revues de littérature exploratoires ou la création de supports pédagogiques complets.',

  strongPoints: [
    'Architecture "Plan-and-Solve" idéale pour les requêtes complexes et multi-étapes.',
    'Agent de recherche qui planifie sa stratégie, offrant une grande transparence et robustesse.',
    'Suite créative complète (recherche, slides, dev web) intégrée et gratuite.',
    'Le modèle GLM-4.5 est l\'un des plus performants, basé sur une architecture Mixture-of-Experts (MoE).',
  ],

  vigilancePoints: [
    '**Risque de confidentialité très élevé.** Plateforme basée en Asie. À n\'utiliser que pour des données 100% publiques.',
    '**Latence de planification :** Le mode "Auto Think" a un "coût d\'entrée" en temps. Inefficace pour les questions factuelles simples.',
    '**Risque de "Plan Halluciné" :** L\'agent peut élaborer un plan de recherche biaisé si la question initiale est mal interprétée.',
    'Peut parfois être instable ou indisponible (rançon de la gratuité).',
  ],
  
  confidenceScore: 2,
  confidenceJustification: 'Le score est bas **uniquement à cause du risque majeur de confidentialité**. Sur le plan technique, cet outil mériterait 5/5. Son architecture "Plan-and-Solve" est exceptionnellement puissante, mais ne doit être utilisée qu\'avec des données non sensibles.',

  freeVsPaidOffer: `| Fonctionnalité | Offre Gratuite | Payant |\n| :--- | :--- | :--- |\n| **Accès au modèle GLM-4.5** | ✅ Complet | N/A |\n| **Recherche web avancée** | ✅ Illimitée | N/A |\n| **Création de présentations** | ✅ Illimitée | N/A |\n| **Développement web** | ✅ Inclus | N/A |`,

  content: [
    {
      type: 'card',
      title: 'Comprendre l\'Architecture "Plan-and-Solve"',
      description: 'Z.AI vs. les autres : une différence fondamentale',
      content: 'Contrairement à un simple moteur de recherche, Z.AI agit comme un chercheur qui rédige un protocole complet **avant** de commencer son expérience. Cette phase de planification lui permet de gérer des tâches très complexes de manière cohérente, là où d\'autres outils peuvent se perdre en cours de route.'
    },
    {
      type: 'table',
      caption: 'Tableau comparatif des architectures d\'agents de recherche.',
      headers: ['Critère', 'Z.AI (Auto Think)', 'Perplexity (Deep Research)', 'Claude (Tool Use)'],
      rows: [
        ['**Architecture sous-jacente**', '**Plan-and-Solve** : Planification initiale complète, suivie de l\'exécution.', '**RAG Multi-Étapes** : Boucle itérative de recherche et synthèse.', '**ReAct (Reason+Act)** : Boucle "Pensée → Action → Observation".'],
        ['**Transparence du Plan**', '**Élevée** : Le plan de recherche ("trajectory") est souvent visible.', '**Faible** : Processus interne en "boîte noire".', '**Potentiellement Très Élevée** : Dépend de l\'interface, chaque étape est distincte.'],
        ['**Robustesse (Requêtes Complexes)**', '**Élevée** : Conçu pour les tâches multi-étapes complexes.', '**Moyenne** : Peut se perdre dans des boucles sans plan global.', '**Élevée** : S\'auto-corrige à chaque étape "Observation".'],
        ['**Vitesse**', '**Moyenne à Lente** : Latence due à la planification initiale.', '**Rapide** : Optimisé pour la vitesse.', '**Variable (souvent lente)** : De multiples cycles "Pensée-Action".'],
        ['**Risque d\'Hallucination**', '**Déplacé vers le plan** : Le risque est dans la création d\'un plan biaisé.', '**Élevé dans la synthèse** : Risque classique du RAG (mal interpréter les sources).', '**Faible (si bien implémenté)** : Raisonne sur des résultats concrets d\'outils.']
      ]
    },
  ],
} satisfies ExternalTool

export { externalTool }
