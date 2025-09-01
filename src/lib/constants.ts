// Centralized constants for filtering and labeling
export const categoryLabels = {
  // Guides categories
  'prise-en-main': 'Prise en main',
  fondamentaux: 'Fondamentaux',
  methodologie: 'Méthodologie',
  'techniques-avancees': 'Techniques avancées',
  'cas-pratiques': 'Cas pratiques',
  'principes-generaux': 'Principes généraux',
  outils: 'Outils',
  'bonnes-pratiques': 'Bonnes pratiques',
  technique: 'Technique',
  ressources: 'Ressources',

  // Prompts categories
  'rédaction-médicale': 'Rédaction Médicale',
  'analyse-de-données': 'Analyse de Données',
  'formation-et-éducation': 'Formation et Éducation',
  'optimisation-de-processus': 'Optimisation de Processus',
  'cas-cliniques': 'Cas Cliniques',
  révision: 'Révision',
  diagnostic: 'Diagnostic',
  créatif: 'Créatif',
  documentation: 'Documentation',
  recherche: 'Recherche',
  pharmacologie: 'Pharmacologie',

  // External tools categories
  'environnement-developpement': 'Environnement de développement',
  chatbot: 'Chatbot',
  'moteur-de-recherche': 'Moteur de recherche',
  'suite-creative': 'Suite créative',
} as const;

export const difficultyLabels = {
  débutant: 'Débutant',
  intermédiaire: 'Intermédiaire',
  avancé: 'Avancé',
} as const;

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