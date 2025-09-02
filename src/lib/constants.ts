// Centralized constants for filtering and labeling

// NOUVELLE SOURCE DE VÉRITÉ UNIQUE
export const categoryLabels = {
  // Intention: Apprendre la théorie
  'fondamentaux': 'Fondamentaux',
  'techniques-avancees': 'Techniques Avancées',

  // Intention: Apprendre à faire
  'methodologie': 'Méthodologie',
  'cas-pratiques': 'Cas Pratiques',
  'bonnes-pratiques': 'Bonnes Pratiques',

  // Intention: Utiliser des ressources
  'outils': 'Outils',
  'prompts': 'Prompts',
  'ressources': 'Ressources',
  
  // Catégories spécifiques mais transversales
  'securite': 'Sécurité & Confidentialité',
  'apprentissage': 'Apprentissage & Révision',
  'recherche': 'Recherche & Analyse',
  'creation': 'Création de Contenu',
} as const;

// Nouvelle liste unique pour Zod
export const allCategories = Object.keys(categoryLabels) as [keyof typeof categoryLabels, ...(keyof typeof categoryLabels)[]];

export const difficultyLabels = {
  débutant: 'Débutant',
  intermédiaire: 'Intermédiaire',
 avancé: 'Avancé',
} as const;

// Exporter les clés sous forme de tableau pour Zod
export const allDifficulties = Object.keys(difficultyLabels) as [keyof typeof difficultyLabels, ...(keyof typeof difficultyLabels)[]];

export const toolLabels = {
  chatgpt: 'ChatGPT',
  claude: 'Claude',
  perplexity: 'Perplexity',
  gemini: 'Gemini',
  'z-ai': 'Z.AI',
  deepseek: 'DeepSeek',
  qwen: 'Qwen',
} as const;

// Legacy constants for backward compatibility
export const CATEGORIES = {
 CONCEPTS: {
    FONDAMENTAUX: "Fondamentaux",
    TECHNIQUES_AVANCEES: "Techniques Avancées",
    METHODOLOGIE: "Méthodologie"
  },
  
  GUIDES: {
    FONDAMENTAUX: "fondamentaux",
    METHODOLOGIE: "methodologie",
    TECHNIQUES_AVANCEES: "techniques-avancees",
    CAS_PRATIQUES: "cas-pratiques",
    RESSOURCES: "ressources"
  },
  
  PROMPTS: {
    ANALYSE: "analyse",
    CREATION: "créatif",
    RECHERCHE: "recherche",
    DOCUMENTATION: "documentation",
    EVALUATION: "évaluation"
  },
  
  EXTERNAL_TOOLS: {
    GENERALISTE: "LLM Généraliste",
    SPECIALISE_SANTE: "Spécialisé Santé"
  }
} as const;

export type Category = typeof CATEGORIES;