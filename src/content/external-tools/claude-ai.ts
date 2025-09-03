import type { EnhancedExternalTool } from '@/lib/content-schema';

const externalTool = {
  slug: "claude-ai",
  title: "Claude.ai",
  description: "Mon assistant de prédilection pour l'analyse de documents longs et le raisonnement clinique.",
  url: "https://claude.ai/",
  category: "outils",
  tags: ["analyse-document", "pdf", "anthropic"],
  isFavorite: false,

  personalReview: "J'utilise Claude.ai dès que j'ai besoin d'analyser en profondeur des documents longs, comme des articles scientifiques ou des chapitres de cours. Sa grande fenêtre de contexte et sa capacité à extraire des informations nuancées en font mon outil de choix pour les synthèses et les analyses critiques. Je le trouve particulièrement fiable pour le raisonnement clinique.",

  strongPoints: [
    "Excellente gestion des documents longs (PDF, Word, etc.).",
    "Faible tendance à l'hallucination, ce qui le rend fiable pour la synthèse.",
    "Très performant pour le raisonnement complexe et l'analyse de cas cliniques.",
    "Comprend très bien les prompts structurés avec des balises XML.",
  ],

  vigilancePoints: [
    "La version gratuite a un quota de messages assez restrictif qui se réinitialise toutes les quelques heures.",
    "Peut parfois être plus lent que d'autres modèles sur des tâches simples.",
    "Les fonctionnalités avancées comme 'Projects' sont réservées à la version payante.",
  ],
  
  confidenceScore: 4,
  confidenceJustification: "Très bon score car l'outil est fiable et la politique de données est claire. Le fait qu'il hallucine moins que d'autres est un gage de confiance. Il n'a pas 5/5 car les quotas gratuits peuvent être frustrants.",

  freeVsPaidOffer: `| Fonctionnalité | Version Gratuite | Version Pro (~20€/mois) |\n| :--- | :--- | :--- |\n| **Modèle principal** | Claude Sonnet 4 | ✅ Claude **Opus** 4.1 (plus puissant) |\n| **Quota d'usage** | Limité (~50 messages/8h) | ✅ **5x plus de messages** |\n| **Analyse de documents** | ✅ Oui (limité en volume) | ✅ **Optimisé pour les gros fichiers** |\n| **Projects (Mémoire)** | ❌ Non | ✅ **Illimité** |`,

  content: [
    {
      type: "card",
      title: "Mes cas d'usage principaux pour Claude.ai",
      content: "- **Analyse d'Études Cliniques :** J'uploade un PDF de 30 pages et je demande à Claude d'extraire le protocole, les résultats et les conclusions.\n- **Synthèse de Cours :** Je colle le contenu de plusieurs cours pour obtenir une fiche de révision comparative.\n- **Préparation de Cas Cliniques :** Je soumets une description de cas (anonymisée !) pour explorer les diagnostics différentiels et les options de traitement."
    }
  ]
} satisfies EnhancedExternalTool;

export { externalTool };
