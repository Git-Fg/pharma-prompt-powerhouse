export const glossary: Record<string, {
  term: string
  definition: string
  category?: string
}> = {
  'token': {
    term: 'Token',
    definition: 'Unité de base que l\'IA utilise pour comprendre et traiter le texte. Un token peut être un mot, une partie de mot, ou même un seul caractère selon le contexte.',
    category: 'technique',
  },
  'rag': {
    term: 'RAG (Retrieval-Augmented Generation)',
    definition: 'Technique qui permet à une IA de rechercher des informations dans une base de données avant de générer sa réponse, combinant ainsi recherche et génération.',
    category: 'technique',
  },
  'prompt-engineering': {
    term: 'Prompt Engineering',
    definition: 'L\'art de formuler des instructions précises et efficaces pour obtenir les meilleurs résultats d\'une IA générative.',
    category: 'méthode',
  },
  'context-window': {
    term: 'Fenêtre de Contexte',
    definition: 'La quantité maximale de texte qu\'une IA peut "voir" et traiter en une seule fois, limitant la longueur des conversations ou documents.',
    category: 'technique',
  },
  'hallucination': {
    term: 'Hallucination',
    definition: 'Phénomène où une IA génère des informations incorrectes ou inventées qu\'elle présente comme vraies, particulièrement problématique en santé.',
    category: 'limitation',
  },
  'fine-tuning': {
    term: 'Fine-tuning',
    definition: 'Processus d\'entraînement supplémentaire d\'un modèle d\'IA sur des données spécifiques pour améliorer ses performances dans un domaine particulier.',
    category: 'technique',
  },
  'few-shot': {
    term: 'Few-shot Learning',
    definition: 'Technique où l\'on fournit quelques exemples à l\'IA dans le prompt pour lui montrer le format ou le style de réponse attendu.',
    category: 'méthode',
  },
  'zero-shot': {
    term: 'Zero-shot Learning',
    definition: 'Capacité d\'une IA à réaliser une tâche sans avoir reçu d\'exemples spécifiques, en s\'appuyant uniquement sur sa compréhension générale.',
    category: 'méthode',
  },
  'multimodal': {
    term: 'Multimodal',
    definition: 'Se dit d\'une IA capable de traiter plusieurs types de données : texte, images, audio, vidéo, simultanément.',
    category: 'caractéristique',
  },
  'embeddings': {
    term: 'Embeddings',
    definition: 'Représentation numérique du sens d\'un texte ou d\'un concept, permettant à l\'IA de mesurer les similarités sémantiques.',
    category: 'technique',
  },
}