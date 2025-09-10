import type { ExternalTool } from '@/lib/content-schema'

const externalTool = {
  slug: 'deepseek-chat',
  type: 'tool',
  title: 'DeepSeek Chat',
  description: 'Une alternative open-source gratuite et puissante, que j\'utilise pour l\'expérimentation non sensible.',
  url: 'https://chat.deepseek.com/',
  category: 'outils',
  tags: ['gratuit', 'open-source', 'expérimentation'],
  isFavorite: false,

  personalReview: 'DeepSeek Chat est impressionnant pour un outil gratuit. Je l\'utilise quand j\'ai besoin d\'une grande capacité d\'analyse de fichiers (jusqu\'à 50 !) ou pour tester des prompts de raisonnement logique avec son mode \'DeepThink\'. C\'est un excellent outil d\'appoint, mais je reste extrêmement prudent sur la confidentialité.',

  strongPoints: [
    'Totalement gratuit avec des fonctionnalités très généreuses.',
    'Capacité d\'analyser jusqu\'à 50 fichiers simultanément.',
    'Le mode \'DeepThink\' active un modèle spécialisé en raisonnement complexe.',
    'Modèles open-source performants, notamment en mathématiques et en code.',
  ],

  vigilancePoints: [
    '**Risque de confidentialité très élevé.** Les serveurs sont basés en Asie avec une politique de données floue. Je considère que tout ce que j\'y écris peut devenir public.',
    'Ne jamais utiliser pour des données personnelles, de patient, ou de recherche confidentielle.',
    'L\'interface est moins polie que celle des concurrents majeurs.',
  ],

  confidenceScore: 1,
  confidenceJustification: 'Le score est très bas **uniquement à cause du risque majeur de confidentialité**. Sur le plan technique, cet outil est excellent. Mais dans le domaine de la santé, la confidentialité n\'est pas négociable. À n\'utiliser que pour des tâches sur des données 100% publiques.',

  freeVsPaidOffer: `| Fonctionnalité | Offre Gratuite | Payant |\n| :--- | :--- | :--- |\n| **Accès aux modèles** | ✅ DeepSeek V3.1 & R1 | N/A |\n| **Analyse de fichiers** | ✅ Jusqu'à 50 fichiers | N/A |\n| **DeepThink (Raisonnement)** | ✅ 50 messages/jour | N/A |\n| **Recherche Web** | ✅ Illimitée | N/A |`,

  content: [
    {
      type: 'alert',
      variant: 'destructive',
      title: '⚠️ Avertissement de Confidentialité',
      content: 'Je le répète : la règle d\'or s\'applique ici plus que jamais. J\'utilise cet outil uniquement pour des expérimentations sur des articles scientifiques publics ou des données non sensibles.',
    },
    {
      type: 'section',
      title: 'Fonctionnalités Disponibles',
      content: 'DeepSeek Chat offre un ensemble complet de fonctionnalités gratuitement, sans option payante.',
      variant: 'key-points',
    },
    {
      type: 'table',
      caption: 'Fonctionnalités de DeepSeek Chat (100% gratuit)',
      headers: ['Fonctionnalité', 'Offre Gratuite', 'Payant'],
      rows: [
        ['**Accès aux modèles**', '✅ DeepSeek V3.1 & R1', 'N/A'],
        ['**Analyse de fichiers**', '✅ Jusqu\'à 50 fichiers', 'N/A'],
        ['**DeepThink (Raisonnement)**', '✅ 50 messages/jour', 'N/A'],
        ['**Recherche Web**', '✅ Illimitée', 'N/A'],
      ],
    },
    {
      type: 'card',
      title: 'Mon usage optimal de DeepSeek',
      content: '- **Synthèse d\'annales :** Uploader 20-30 PDF d\'annales pour identifier les thèmes récurrents.\n- **Analyse de littérature :** Soumettre un grand nombre d\'articles publics pour une revue de la littérature rapide.\n- **Test de raisonnement :** Utiliser le mode \'DeepThink\' pour résoudre des problèmes logiques complexes.',
    },
  ],
} satisfies ExternalTool

export { externalTool }
