export const glossary: Record<string, {
  term: string
  definition: string
  category?: string
}> = {
  'token': {
    term: 'Token',
    definition: "Unité de base que l'IA utilise pour comprendre et traiter le texte. Un token peut être un mot, une partie de mot, ou même un seul caractère selon le contexte.",
    category: 'technique',
  },
  'rag': {
    term: 'RAG (Retrieval-Augmented Generation)',
    definition: "Technique qui permet à une IA de rechercher des informations dans une base de données avant de générer sa réponse, combinant ainsi recherche et génération.",
    category: 'technique',
  },
  'prompt-engineering': {
    term: 'Prompt Engineering',
    definition: "L'art de formuler des instructions précises et efficaces pour obtenir les meilleurs résultats d'une IA générative.",
    category: 'méthode',
  },
  'context-window': {
    term: 'Fenêtre de Contexte',
    definition: "La quantité maximale de texte qu'une IA peut \"voir\" et traiter en une seule fois, limitant la longueur des conversations ou documents.",
    category: 'technique',
  },
  'hallucination': {
    term: 'Hallucination',
    definition: "Phénomène où une IA génère des informations incorrectes ou inventées qu'elle présente comme vraies, particulièrement problématique en santé.",
    category: 'limitation',
  },
  'fine-tuning': {
    term: 'Fine-tuning',
    definition: "Processus d'entraînement supplémentaire d'un modèle d'IA sur des données spécifiques pour améliorer ses performances dans un domaine particulier.",
    category: 'technique',
  },
  'few-shot-prompting': {
      term: 'Few-shot Prompting',
      definition: "Technique qui consiste à fournir à l'IA quelques exemples (shots) du format ou du style de réponse attendu directement dans le prompt pour la guider.",
      category: 'méthode',
  },
  'chain-of-thought': {
      term: 'Chain-of-Thought (CoT)',
      definition: "Une technique de prompting où l'on demande à l'IA d'expliciter son raisonnement étape par étape avant de donner la réponse finale. Cela améliore la logique et la transparence.",
      category: 'technique',
  },
  'chain-of-verification': {
      term: 'Chain-of-Verification (CoVe)',
      definition: "Une technique où l'IA devient son propre fact-checker, planifiant et exécutant des vérifications sur ses propres affirmations pour réduire les hallucinations.",
      category: 'technique avancée',
  },
  'step-back-prompting': {
      term: 'Step-Back Prompting',
      definition: "Une méthode de raisonnement qui force l'IA à s'abstraire des détails pour identifier les principes fondamentaux avant de résoudre un problème spécifique.",
      category: 'technique avancée',
  },
  'self-consistency': {
      term: 'Self-Consistency',
      definition: "Améliorer la robustesse des réponses en générant plusieurs chemins de raisonnement et en sélectionnant la conclusion la plus fréquente par un vote majoritaire.",
      category: 'technique',
  },
  'metacognition-ia': {
      term: 'Métacognition (IA)',
      definition: "Capacité d'une IA (guidée par un prompt) à raisonner sur son propre processus de pensée, à l'analyser, le critiquer et le justifier.",
      category: 'technique avancée',
  },
  'zero-shot': {
    term: 'Zero-shot Learning',
    definition: "Capacité d'une IA à réaliser une tâche sans avoir reçu d'exemples spécifiques, en s'appuyant uniquement sur sa compréhension générale.",
    category: 'méthode',
  },
  'multimodal': {
    term: 'Multimodal',
    definition: "Se dit d'une IA capable de traiter plusieurs types de données : texte, images, audio, vidéo, simultanément.",
    category: 'caractéristique',
  },
  'embeddings': {
    term: 'Embeddings',
    definition: "Représentation numérique du sens d'un texte ou d'un concept, permettant à l'IA de mesurer les similarités sémantiques.",
    category: 'technique',
  },
  'agent-ai': {
    term: 'Agent IA',
    definition: "Un système d'IA proactif qui interprète un objectif, élabore une stratégie, utilise des outils et s'auto-corrige. Contrairement à un chatbot qui ne fait que répondre aux questions.",
    category: 'technique',
  },
  'plan-and-solve': {
    term: 'Plan-and-Solve',
    definition: "Une architecture d'agent IA (utilisée par Z.AI) qui crée un plan complet avant d'exécuter une série de tâches. Idéal pour les problèmes complexes nécessitant une vision globale.",
    category: 'architecture',
  },
  'react-agent': {
    term: 'ReAct (Reason+Act)',
    definition: "Une architecture d'agent IA (utilisée par Claude) qui fonctionne sur des boucles courtes \"Pensée -> Action -> Observation\". Idéal pour les tâches nécessitant une interaction constante avec des outils.",
    category: 'architecture',
  },
  'moe': {
    term: 'Mixture-of-Experts (MoE)',
    definition: "Une architecture de modèle de langage qui n'active qu'une fraction de ses paramètres pour une tâche donnée, permettant une grande échelle tout en étant efficace en calcul.",
    category: 'technique',
  },
  'dialogue-socratique-ia': {
    term: 'Dialogue Socratique',
    definition: "Méthode pédagogique où l'IA ne donne pas de réponses mais pose des questions pour guider l'étudiant à construire son propre raisonnement.",
    category: 'méthode',
  },
  'biais-automatisation': {
    term: "Biais d'Automatisation",
    definition: "Tendance à trop faire confiance aux systèmes automatisés, ce qui diminue l'esprit critique et la vigilance.",
    category: 'biais',
  },
  'desapprentissage-cognitif': {
    term: 'Désapprentissage Cognitif (Deskilling)',
    definition: "Perte de compétences due à la délégation excessive du raisonnement à une machine.",
    category: 'biais',
  },
  'systemes-multi-agents': {
    term: 'Systèmes Multi-Agents',
    definition: "Utilisation de plusieurs agents IA, chacun avec un rôle spécifique, pour analyser un problème sous différents angles.",
    category: 'architecture',
  },
  'inference-causale-ia': {
    term: 'Inférence Causale',
    definition: "Processus visant à déterminer une relation de cause à effet. C'est une faiblesse majeure des IA actuelles, qui excellent en corrélation mais pas en causalité.",
    category: 'limitation',
  },
  'quantification': {
    term: 'Quantification',
    definition: "Technique qui consiste à réduire la précision numérique des poids d'un modèle (ex: de 16-bit à 4-bit) pour diminuer son empreinte mémoire et accélérer l'inférence, rendant possible son exécution sur du matériel grand public.",
    category: 'technique',
  },
  'gguf': {
    term: 'GGUF',
    definition: "Un format de fichier universel pour les modèles quantifiés, devenu le standard de facto pour l'inférence sur CPU et GPU en local. Supporté par des outils comme LM Studio, Ollama et Jan.ai.",
    category: 'format',
  },
  'vram': {
    term: 'VRAM (Video RAM)',
    definition: "La mémoire dédiée d'une carte graphique (GPU). C'est le facteur limitant le plus important pour faire tourner de grands modèles de langage en local, car le modèle doit y être chargé pour une performance optimale.",
    category: 'matériel',
  },
  'anonymisation': {
    term: 'Anonymisation',
    definition: "Processus irréversible qui empêche \"raisonnablement\" toute ré-identification d'une personne. Une donnée anonymisée sort du champ d'application du RGPD.",
    category: 'juridique',
  },
  'pseudonymisation': {
    term: 'Pseudonymisation',
    definition: "Processus réversible qui remplace les identifiants directs par un pseudonyme. La ré-identification reste possible avec une clé, donc la donnée reste sous le régime du RGPD.",
    category: 'juridique',
  },
  'donnees-synthetiques': {
    term: 'Données Synthétiques',
    definition: "Données artificiellement créées qui miment les propriétés statistiques de données réelles, sans contenir d'informations personnelles. Une technique d'anonymisation avancée.",
    category: 'technique',
  },
  'ai-act': {
    term: 'AI Act Européen',
    definition: "Réglementation européenne qui classe les systèmes d'IA par niveau de risque et impose des obligations spécifiques (documentation, supervision humaine...) pour les systèmes à haut risque, comme ceux utilisés en santé.",
    category: 'juridique',
  }
}