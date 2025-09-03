// Centralized constants for filtering and labeling

// SOURCE DE VÉRITÉ UNIQUE - Toutes les catégories utilisées dans le contenu
export const categoryLabels: Record<string, string> = {
  // Categories les plus utilisées (basées sur l'analyse du contenu existant)
  'outils': 'Outils',
  'fondamentaux': 'Fondamentaux',
  'techniques-avancees': 'Techniques Avancées',
  'methodologie': 'Méthodologie',
  'recherche': 'Recherche & Analyse',
  'apprentissage': 'Apprentissage & Révision',
  'cas-pratiques': 'Cas Pratiques',
  'ressources': 'Ressources',
  'creation': 'Création de Contenu',
  'securite': 'Sécurité & Confidentialité',
  'clinique': 'Clinique',
  'chatbot': 'Chatbot',
  'moteur-de-recherche': 'Moteur de Recherche',
  'suite-creative': 'Suite Créative',
};

export const difficultyLabels: Record<string, string> = {
  débutant: 'Débutant',
  intermédiaire: 'Intermédiaire',
  avancé: 'Avancé',
};

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