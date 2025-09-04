// Centralized constants for filtering and labeling

// SOURCE DE VÉRITÉ UNIQUE - Toutes les catégories utilisées dans le contenu

// Type Category défini ici pour labels stricts
export type Category =
  | 'fondamentaux'
  | 'methodologie'
  | 'ressources'
  | 'techniques-avancees'
  | 'cas-pratiques';

export type Difficulty = 'débutant' | 'intermédiaire' | 'avancé';

export const categoryLabels = {
  // Workflow/Guide categories
  fondamentaux: 'Fondamentaux 📚',
  methodologie: 'Méthodologie 🔬',
  ressources: 'Ressources 📖',
  'techniques-avancees': 'Techniques Avancées 🚀',
  'cas-pratiques': 'Cas Pratiques 💊',
  // Additional categories
  prompting: "Prompting 🎯",
  methodology: "Méthodologie 🔬",
  tools: "Outils 🛠️",
  security: "Sécurité 🔒",
  optimization: "Optimisation ⚡",
  "bonnes-pratiques": "Bonnes Pratiques 🛡️",
} as const satisfies Record<string, string>;

export const difficultyLabels = {
  débutant: 'Débutant',
  intermédiaire: 'Intermédiaire',
  avancé: 'Avancé',
} as const satisfies Record<Difficulty, string>;

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

// export type Category = typeof CATEGORIES; // supprimé car doublon et non utilisé