import type { ExternalTool } from '@/lib/content-schema'

const externalTool = {
  slug: 'qwen-chat',
  type: 'tool',
  title: 'Qwen Chat',
  description: 'La puissante suite IA d\'Alibaba, gratuite et open-source, que j\'utilise pour des tâches techniques.',
  url: 'https://chat.qwen.ai/',
  category: 'chatbot',
  tags: ['gratuit', 'open-source', 'maths', 'code'],
  isFavorite: false,

  personalReview: 'Qwen Chat est un autre outil impressionnant dans la catégorie des alternatives gratuites. Je me tourne vers lui spécifiquement pour ses excellentes performances en mathématiques et en génération de code. Ses outils créatifs, comme l\'édition d\'image précise, sont également un plus. Comme pour DeepSeek, la prudence sur la confidentialité est ma priorité absolue.',

  strongPoints: [
    'Totalement gratuit, sans quota restrictif connu.',
    'Performances de premier plan en mathématiques et en programmation.',
    'Modèles open-source sous licence Apache 2.0 (permissive).',
    'Outils créatifs uniques comme l\'édition d\'image sémantique.',
  ],

  vigilancePoints: [
    '**Risque de confidentialité très élevé.** Les serveurs sont basés en Asie. Je n\'y mets aucune information personnelle ou sensible.',
    'L\'interface et les modèles sont optimisés pour les langues asiatiques ; le français peut être moins performant.',
    'Le support et la documentation sont moins fournis que pour les plateformes américaines.',
  ],

  confidenceScore: 1,
  confidenceJustification: 'Même justification que pour DeepSeek. Un outil techniquement brillant mais dont le risque de confidentialité est trop élevé pour un usage serein dans le domaine de la santé. À réserver pour des expérimentations sur des données publiques et non sensibles.',

  freeVsPaidOffer: `| Fonctionnalité | Offre Gratuite | Payant |\n| :--- | :--- | :--- |\n| **Accès aux modèles** | ✅ Toute la gamme Qwen 3 | N/A |\n| **Outils créatifs** | ✅ Inclus (Deep Research, Image Edit...) | N/A |\n| **Usage** | ✅ Illimité (actuellement) | N/A |`,

  content: [
    {
      type: 'section',
      title: 'L\'Offre 100% Gratuite',
      content: 'Qwen Chat propose une offre complètement gratuite sans option payante, avec un accès complet à toute la gamme de modèles Qwen 3.',
      variant: 'key-points',
    },
    {
      type: 'table',
      caption: 'Fonctionnalités de Qwen Chat (100% gratuit)',
      headers: ['Fonctionnalité', 'Offre Gratuite', 'Payant'],
      rows: [
        ['**Accès aux modèles**', '✅ Toute la gamme Qwen 3', 'N/A'],
        ['**Outils créatifs**', '✅ Inclus (Deep Research, Image Edit...)', 'N/A'],
        ['**Usage**', '✅ Illimité (actuellement)', 'N/A'],
      ],
    },
    {
      type: 'alert',
      variant: 'destructive',
      title: '⚠️ Usage Recommandé : Données Publiques Uniquement',
      content: 'J\'utilise cet outil pour des calculs complexes, pour générer du code pour des projets personnels, ou pour des recherches sur des sujets non confidentiels. C\'est un excellent bac à sable technique, à condition de bien cloisonner son utilisation.',
    },
  ],
} satisfies ExternalTool

export { externalTool }
