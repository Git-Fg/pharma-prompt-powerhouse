import type { ExternalTool } from '@/lib/content-schema'

const externalTool = {
  slug: 'google-ai-studio',
  title: 'Google AI Studio',
  description: 'Mon écosystème de prédilection pour l\'expérimentation, l\'analyse multimodale et maintenant, l\'apprentissage guidé, totalement gratuit.',
  url: 'https://aistudio.google.com/',
  category: 'outils',
  tags: ['gratuit', 'gemini', 'multimodal', 'tuteur-ia'],
  isFavorite: true,

  personalReview: 'AI Studio confirme sa place de pilier de mon \'Core Kit\'. Non seulement son offre gratuite reste inégalée (Gemini 2.5 Pro, 1M de tokens), mais la nouvelle fonctionnalité "Guided Learning" le transforme en un tuteur personnel. Je peux lui donner un cours complexe, et il me crée un parcours d\'apprentissage interactif avec des explications et des exercices. C\'est une avancée majeure pour l\'auto-formation.',

  strongPoints: [
    'Accès gratuit continu au puissant modèle Gemini 2.5 Pro et sa fenêtre de contexte de 1M de tokens.',
    'Nouvelle fonctionnalité "Guided Learning" pour transformer des documents en parcours d\'apprentissage interactifs.',
    'Inégalé pour l\'analyse d\'images et de documents longs (OCR).',
    'Politique de confidentialité "Opt-Out" par défaut à partir de septembre 2025.',
  ],

  vigilancePoints: [
    'L\'interface reste plus technique que celle d\'un simple chat, ce qui peut intimider les débutants.',
    'Bien que la politique soit claire, cela reste un service cloud américain.',
  ],

  confidenceScore: 5,
  confidenceJustification: 'Score maximal. L\'outil est puissant, gratuit, soutenu par une documentation claire et une entreprise majeure. Le rapport puissance/accessibilité est actuellement sans équivalent pour un étudiant. La politique de confidentialité est standard pour un service américain.',

  freeVsPaidOffer: `| Fonctionnalité | Offre Gratuite | Payant |\n| :--- | :--- | :--- |\n| **Modèle principal** | ✅ **Gemini 2.5 Pro** | N/A (API payante pour développeurs) |\n| **Contexte max** | ✅ **1 Million de tokens** | N/A |\n| **Quota d\'usage** | Très généreux (60 req/min) | N/A |\n| **Multimodal** | ✅ Complet (Image, Vidéo, Audio) | N/A |`,

  content: [
    {
      type: 'card',
      title: '🚀 Nouvelle Capacité : Le Tuteur Personnel',
      description: 'La fonctionnalité "Guided Learning"',
      content: 'Annoncée en août 2025, cette fonction change la donne pour les étudiants. Vous pouvez uploader un chapitre de cours complexe et demander à AI Studio de vous guider pour le maîtriser. Il va générer :\n\n- Des explications simplifiées des concepts clés.\n- Des QCM et des exercices pour valider votre compréhension.\n- Un parcours d\'apprentissage personnalisé étape par étape.',
    },
    {
      type: 'alert',
      variant: 'default',
      title: '🚀 Mon workflow du \'Core Kit\'',
      content: 'J\'utilise Z.AI pour sa recherche créative et planifiée, puis je bascule sur AI Studio pour une analyse rigoureuse et multimodale des sources et documents. Ce duo couvre 95% de mes besoins sans coûter un centime.',
    },
  ],
} satisfies ExternalTool

export { externalTool }
