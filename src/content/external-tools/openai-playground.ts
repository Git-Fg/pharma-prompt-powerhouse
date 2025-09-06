import type { ExternalTool } from '@/lib/content-schema'

const externalTool = {
  slug: 'openai-playground',
  title: 'OpenAI Playground',
  description: 'Le studio d\'expérimentation d\'OpenAI, essentiel pour maîtriser les modèles GPT.',
  url: 'https://platform.openai.com/playground',
  category: 'outils',
  tags: ['expérimentation', 'gpt', 'prompt-engineering'],
  isFavorite: false,

  personalReview: 'Le Playground est mon \'simulateur de vol\' pour les modèles GPT. C\'est là que je vais quand j\'ai besoin de comprendre pourquoi un prompt ne fonctionne pas bien sur ChatGPT. En ajustant la température et le system prompt, je peux affiner mes instructions avec une précision chirurgicale avant de les utiliser dans des applications plus simples.',

  strongPoints: [
    'Contrôle total sur les paramètres des modèles GPT (température, etc.).',
    'Permet de comparer facilement les performances de différents modèles (GPT-5, GPT-4o).',
    'Idéal pour développer et tester des \'System Prompts\' complexes.',
    'Les prompts perfectionnés ici sont directement réutilisables via l\'API.',
  ],

  vigilancePoints: [
    'Nécessite une carte de crédit et fonctionne avec un système de paiement à l\'usage.',
    'Interface plus intimidante pour les débutants que ChatGPT.',
    'Pas d\'historique de conversation aussi simple que sur l\'interface de chat.',
  ],

  confidenceScore: 4,
  confidenceJustification: 'C\'est un outil professionnel et transparent d\'OpenAI. La politique de données est claire. Le score n\'est pas de 5/5 uniquement à cause de la barrière du paiement à l\'usage qui le rend moins accessible pour une simple exploration.',

  freeVsPaidOffer: `| Fonctionnalité | Offre Gratuite (Crédits initiaux) | Payant (API) |\n| :--- | :--- | :--- |\n| **Accès aux modèles** | ✅ Accès limité | ✅ **Accès complet** |\n| **Contrôle des paramètres** | ✅ Complet | ✅ **Complet** |\n| **Coût** | Crédits de bienvenue (si disponibles) | **Paiement à l\'usage (tokens)** |\n| **Usage** | Expérimentation limitée | **Illimité (selon budget)** |`,

  content: [
    {
      type: 'section',
      title: 'Comparaison des Offres : Crédits vs API',
      content: 'OpenAI Playground propose des crédits initiaux pour l\'expérimentation, puis fonctionne sur un modèle de paiement à l\'usage via l\'API.',
      variant: 'key-points',
    },
    {
      type: 'table',
      caption: 'Offres OpenAI Playground',
      headers: ['Fonctionnalité', 'Offre Gratuite (Crédits initiaux)', 'Payant (API)'],
      rows: [
        ['**Accès aux modèles**', '✅ Accès limité', '✅ **Accès complet**'],
        ['**Contrôle des paramètres**', '✅ Complet', '✅ **Complet**'],
        ['**Coût**', 'Crédits de bienvenue (si disponibles)', '**Paiement à l\'usage (tokens)**'],
        ['**Usage**', 'Expérimentation limitée', '**Illimité (selon budget)**'],
      ],
    },
    {
      type: 'alert',
      variant: 'default',
      title: '🎓 Mon conseil pour les étudiants',
      content: 'Pour une exploration des paramètres sans frais, je recommande de commencer avec **Google AI Studio**. Une fois les concepts maîtrisés, le Playground d\'OpenAI devient un outil puissant pour ceux qui veulent se spécialiser sur l\'écosystème GPT.',
    },
  ],
} satisfies ExternalTool

export { externalTool }
