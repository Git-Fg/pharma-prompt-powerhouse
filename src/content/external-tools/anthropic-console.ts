import type { ExternalTool } from '@/lib/content-schema'

const externalTool = {
  slug: 'anthropic-console',
  type: 'tool',
  title: 'Anthropic Console',
  description: 'Mon laboratoire pour pousser les modèles Claude dans leurs retranchements, sans écrire de code.',
  url: 'https://console.anthropic.com/',
  category: 'outils',
  tags: ['expérimentation', 'claude', 'prompt-engineering'],
  isFavorite: false,

  personalReview: 'J\'utilise l\'Anthropic Console quand j\'ai besoin de comprendre finement le comportement des modèles Claude. C\'est l\'équivalent d\'un banc d\'essai moteur : parfait pour tester des prompts complexes, ajuster la \'température\' et voir comment le modèle réagit. C\'est un passage obligé pour quiconque veut vraiment maîtriser le prompt engineering sur cet écosystème.',

  strongPoints: [
    'Accès à toute la gamme des modèles Claude (Opus, Sonnet, Haiku).',
    'Contrôle granulaire des paramètres (température, top-p, etc.).',
    'Outils d\'évaluation de prompts pour des tests rigoureux.',
    'Mode \'System Prompt\' clairement séparé pour définir le rôle de l\'IA.',
  ],

  vigilancePoints: [
    'Nécessite une carte de crédit pour obtenir des crédits, même si des crédits gratuits sont offerts au départ.',
    'L\'interface est plus technique et moins intuitive qu\'un simple chat.',
    'Le coût à l\'usage (via API) peut devenir significatif pour des tests intensifs.',
  ],

  confidenceScore: 4,
  confidenceJustification: 'Je lui attribue ce score élevé car c\'est un outil professionnel et transparent d\'une entreprise américaine majeure. La politique de données est claire, mais il reste un service cloud, d\'où la prudence de mise.',

  freeVsPaidOffer: `| Fonctionnalité | Offre Gratuite (Crédits initiaux) | Payant (API) |\n| :--- | :--- | :--- |\n| **Accès aux modèles** | ✅ Tous les modèles | ✅ Tous les modèles |\n| **Contrôle des paramètres** | ✅ Complet | ✅ Complet |\n| **Coût** | Crédits gratuits de départ | Paiement à l\'usage (tokens) |\n| **Sauvegarde** | ✅ Workbench pour projets | ✅ Workbench pour projets |`,

  content: [
    {
      type: 'section',
      title: 'Comparaison des Offres : Crédits vs API',
      content: 'Anthropic Console propose des crédits initiaux pour l\'expérimentation, puis fonctionne sur un modèle de paiement à l\'usage via l\'API.',
      variant: 'key-points',
    },
    {
      type: 'table',
      caption: 'Offres Anthropic Console',
      headers: ['Fonctionnalité', 'Offre Gratuite (Crédits initiaux)', 'Payant (API)'],
      rows: [
        ['**Accès aux modèles**', '✅ Tous les modèles', '✅ Tous les modèles'],
        ['**Contrôle des paramètres**', '✅ Complet', '✅ Complet'],
        ['**Coût**', 'Crédits gratuits de départ', 'Paiement à l\'usage (tokens)'],
        ['**Sauvegarde**', '✅ Workbench pour projets', '✅ Workbench pour projets'],
      ],
    },
    {
      type: 'card',
      title: '🧪 Qu\'est-ce que l\'Anthropic Console ?',
      description: 'Le laboratoire des modèles Claude',
      content: 'L\'Anthropic Console est l\'équivalent du \'Playground\' d\'OpenAI ou du \'Studio\' de Google. C\'est une interface web conçue pour me permettre, même sans être développeur, d\'expérimenter, d\'évaluer et d\'optimiser des prompts en contrôlant finement le comportement des modèles Claude. C\'est l\'outil que j\'utilise pour aller plus loin que l\'interface de chat de `claude.ai`.',
    },
    {
      type: 'table',
      caption: 'Claude.ai vs Anthropic Console : Mon Usage',
      headers: ['Aspect', 'Claude.ai (Chat)', 'Anthropic Console (Studio)'],
      rows: [
        ['**Mon Objectif**', 'Obtenir des réponses, rédiger', '**Tester, comprendre, optimiser**'],
        ['**Mon Contrôle**', 'Limité (style de conversation)', '**Total** (température, system prompt...)'],
        ['**Idéal pour...**', 'Tâches quotidiennes', 'Apprentissage du prompt engineering'],
        ['**Coût pour moi**', 'Gratuit/Pro', '**Crédits gratuits** puis payant'],
      ],
    },
    {
      type: 'alert',
      variant: 'default',
      title: '🎓 Mon conseil pour les étudiants',
      content: 'L\'Anthropic Console est un outil inestimable. C\'est ici que l\'on peut tester comment de légères variations dans un prompt ou un changement de température peuvent radicalement altérer la qualité d\'une analyse de cas clinique. C\'est une étape essentielle pour devenir un véritable \'pilote d\'IA\'.',
    },
  ],
} satisfies ExternalTool

export { externalTool }
