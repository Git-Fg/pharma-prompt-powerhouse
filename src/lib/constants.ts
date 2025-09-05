// =================================================================
// SOURCE DE VÉRITÉ UNIQUE - CONSTANTES DE CONTENU
// =================================================================

// Types stricts pour les catégories et difficultés
export type Category
  = | 'fondamentaux'
    | 'methodologie'
    | 'ressources'
    | 'techniques-avancees'
    | 'cas-pratiques'
    | 'prompting'
    | 'security'
    | 'optimization'
    | 'bonnes-pratiques'

export type Difficulty = 'débutant' | 'intermédiaire' | 'avancé'

// Labels des catégories - source de vérité unique
export const categoryLabels = {
  'fondamentaux': 'Fondamentaux 📚',
  'methodologie': 'Méthodologie 🔬',
  'ressources': 'Ressources 📖',
  'techniques-avancees': 'Techniques Avancées 🚀',
  'cas-pratiques': 'Cas Pratiques 💊',
  'prompting': 'Prompting 🎯',
  'security': 'Sécurité 🔒',
  'optimization': 'Optimisation ⚡',
  'bonnes-pratiques': 'Bonnes Pratiques 🛡️',
} as const satisfies Record<Category, string>

// Labels des difficultés
export const difficultyLabels = {
  débutant: 'Débutant 🌱',
  intermédiaire: 'Intermédiaire 🌿',
  avancé: 'Avancé 🌳',
} as const satisfies Record<Difficulty, string>

// Labels des outils IA
export const toolLabels = {
  'chatgpt': 'ChatGPT',
  'claude': 'Claude',
  'perplexity': 'Perplexity',
  'gemini': 'Gemini',
  'z-ai': 'Z.AI',
  'deepseek': 'DeepSeek',
  'qwen': 'Qwen',
  'ai-studio': 'AI Studio',
  'cursor': 'Cursor',
  'codium': 'Codium',
} as const

// Couleurs associées aux catégories pour l'UI
export const categoryColors = {
  'fondamentaux': 'blue',
  'methodologie': 'green',
  'ressources': 'purple',
  'techniques-avancees': 'orange',
  'cas-pratiques': 'red',
  'prompting': 'cyan',
  'security': 'yellow',
  'optimization': 'pink',
  'bonnes-pratiques': 'indigo',
} as const satisfies Record<Category, string>

// Niveaux de confiance pour les outils
export const confidenceLevels = {
  1: { label: '⭐☆☆☆☆', description: 'Très faible confiance' },
  2: { label: '⭐⭐☆☆☆', description: 'Faible confiance' },
  3: { label: '⭐⭐⭐☆☆', description: 'Confiance modérée' },
  4: { label: '⭐⭐⭐⭐☆', description: 'Bonne confiance' },
  5: { label: '⭐⭐⭐⭐⭐', description: 'Très haute confiance' },
} as const

// =================================================================
// CONSTANTES DE L'APPLICATION
// =================================================================

// URLs et métadonnées
export const APP_CONFIG = {
  name: 'Pharma Prompt Powerhouse',
  description: 'Mon carnet de notes, partagé avec ❤️ pour la communauté.',
  author: 'Git-Fg',
  version: '1.0.0',
  repository: 'https://github.com/Git-Fg/pharma-prompt-powerhouse',
} as const

// Limites et contraintes
export const CONTENT_LIMITS = {
  maxTitleLength: 100,
  maxDescriptionLength: 300,
  maxTagsPerItem: 10,
  maxKeyTakeaways: 8,
  itemsPerPage: 12,
  maxSearchResults: 50,
} as const

// Temps estimés par défaut
export const DEFAULT_ESTIMATED_TIMES = {
  concept: '5-10 min',
  guide: '15-30 min',
  workflow: '30-60 min',
  tool: '5-15 min',
} as const
