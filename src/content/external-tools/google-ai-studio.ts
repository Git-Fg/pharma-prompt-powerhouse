import type { EnhancedExternalTool } from '@/lib/content-schema';

const externalTool = {
  slug: "google-ai-studio",
  title: "Google AI Studio",
  description: "Mon écosystème de prédilection pour l'analyse de documents et l'expérimentation avancée, totalement gratuit.",
  url: "https://aistudio.google.com/",
  category: "outils",
  tags: ["gratuit", "gemini", "multimodal", "analyse-document"],
  isFavorite: true,
  
  personalReview: "Google AI Studio est l'un des deux piliers de mon 'Core Kit' quotidien. Son accès gratuit à Gemini 2.5 Pro avec 1 million de tokens de contexte est tout simplement imbattable. Je l'utilise pour toutes mes analyses de documents volumineux, pour expérimenter avec les paramètres avancés comme la température, et pour créer des contenus multimodaux. C'est un véritable laboratoire accessible à tous.",

  strongPoints: [
    "Accès gratuit au puissant modèle Gemini 2.5 Pro.",
    "Fenêtre de contexte massive de 1 million de tokens.",
    "Inégalé pour l'analyse d'images, de documents longs et même de notes manuscrites (OCR).",
    "Fonctionnalités avancées pour les non-développeurs (Structured Outputs, mode Thinking).",
    "Aucune carte de crédit n'est requise pour l'utiliser.",
  ],

  vigilancePoints: [
    "L'interface est plus technique et moins 'chat' que celle de gemini.google.com.",
    "La puissance de l'outil peut être intimidante pour un débutant complet.",
    "Bien que la politique de Google soit claire, cela reste un service cloud américain.",
  ],
  
  confidenceScore: 5,
  confidenceJustification: "Score maximal. L'outil est puissant, gratuit, soutenu par une documentation claire et une entreprise majeure. Le rapport puissance/accessibilité est actuellement sans équivalent pour un étudiant. La politique de confidentialité est standard pour un service américain.",

  freeVsPaidOffer: `| Fonctionnalité | Offre Gratuite | Payant |\n| :--- | :--- | :--- |\n| **Modèle principal** | ✅ **Gemini 2.5 Pro** | N/A (API payante pour développeurs) |\n| **Contexte max** | ✅ **1 Million de tokens** | N/A |\n| **Quota d'usage** | Très généreux (60 req/min) | N/A |\n| **Multimodal** | ✅ Complet (Image, Vidéo, Audio) | N/A |`,

  content: [
    {
      type: "card",
      title: "Gemini Chat vs Google AI Studio : Mon Choix",
      content: "| **Aspect** | **Gemini Chat** | **Google AI Studio** |\n| :--- | :--- | :--- |\n| **Mon usage** | Questions rapides | **Analyses profondes, expérimentation** |\n| **Modèle gratuit** | Gemini 2.5 Flash | ✅ **Gemini 2.5 Pro** |\n| **Contrôle** | Minimal | ✅ **Total** |\n| **Mon verdict** | Pour un usage simple | ✅ **Pour un travail sérieux** |"
    },
    {
      type: "alert",
      variant: "default",
      title: "🚀 Mon workflow du 'Core Kit'",
      content: "J'utilise Z.AI pour sa recherche créative et planifiée, puis je bascule sur AI Studio pour une analyse rigoureuse et multimodale des sources et documents. Ce duo couvre 95% de mes besoins sans coûter un centime."
    }
  ]
} satisfies EnhancedExternalTool;

export { externalTool };
