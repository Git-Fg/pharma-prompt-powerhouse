export const glossary: Record<string, {
  term: string
  definition: string
  category?: string
  context?: string
  examples?: string[]
  relatedConcepts?: string[]
}> = {
  'token': {
    term: 'Token',
    definition: 'Unité de base que l\'IA utilise pour comprendre et traiter le texte. Un token peut être un mot, une partie de mot, ou même un seul caractère selon le contexte.',
    category: 'technique',
    context: 'Les tokens sont l\'unité de base du "langage" des IA. Comprendre leur fonctionnement est essentiel pour optimiser ses prompts et gérer les limites de contexte.',
    examples: [
      'Le mot "pharmacien" = 1 token',
      'Le mot "anti-inflammatoire" = 3 tokens (anti, -, inflammatoire)',
      '1000 tokens ≈ 750 mots en anglais',
      'GPT-4 a une limite de 128K tokens',
    ],
    relatedConcepts: ['context-window', 'temperature-dosage'],
  },
  'rag': {
    term: 'RAG (Retrieval-Augmented Generation)',
    definition: 'Technique qui permet à une IA de rechercher des informations dans une base de données avant de générer sa réponse, combinant ainsi recherche et génération.',
    category: 'technique',
    context: 'Le RAG est essentiel pour réduire les hallucinations en ancrant les réponses de l\'IA dans des sources vérifiables. C\'est la base de moteurs comme Perplexity.',
    examples: [
      'Perplexity AI utilise le RAG pour citer ses sources',
      'Un chatbot d\'entreprise qui répond en cherchant dans sa documentation interne',
      'Recherche médicale basée sur des articles scientifiques validés',
    ],
    relatedConcepts: ['hallucination', 'embeddings', 'agent-ai'],
  },
  'prompt-engineering': {
    term: 'Prompt Engineering',
    definition: 'L\'art de formuler des instructions précises et efficaces pour obtenir les meilleurs résultats d\'une IA générative.',
    category: 'méthode',
    context: 'Le prompt engineering est une compétence essentielle pour tout professionnel utilisant l\'IA. Bien conçu, il peut transformer une IA d\'un outil basique à un assistant expert.',
    examples: [
      'Utiliser la méthode PICO pour des questions cliniques',
      'Structurer ses prompts avec des balises XML',
      'Donner des exemples (few-shot prompting)',
      'Spécifier le format de sortie attendu',
    ],
    relatedConcepts: ['few-shot-prompting', 'chain-of-thought', 'structuration-par-balises'],
  },
  'context-window': {
    term: 'Fenêtre de Contexte',
    definition: 'La quantité maximale de texte qu\'une IA peut "voir" et traiter en une seule fois, limitant la longueur des conversations ou documents.',
    category: 'technique',
    context: 'La fenêtre de contexte est une contrainte technique fondamentale. Bien la gérer est crucial pour travailler avec de longs documents ou maintenir des conversations cohérentes.',
    examples: [
      'GPT-4 : 128K tokens (~100 000 mots)',
      'Claude 3 : 200K tokens (~150 000 mots)',
      'Un article scientifique moyen = 5 000-10 000 tokens',
      'Un livre entier = 200 000+ tokens (nécessite plusieurs appels)',
    ],
    relatedConcepts: ['token', 'fine-tuning', 'rag'],
  },
  'hallucination': {
    term: 'Hallucination',
    definition: 'Phénomène où une IA génère des informations incorrectes ou inventées qu\'elle présente comme vraies, particulièrement problématique en santé.',
    category: 'limitation',
    context: 'Les hallucinations représentent le risque majeur de l\'IA en santé. Une citation inventée peut avoir des conséquences graves, d\'où l\'importance de toujours vérifier les sources.',
    examples: [
      'L\'IA invente une étude clinique qui n\'existe pas',
      'Elle cite un auteur avec une fausse affiliation',
      'Elle invente des posologies ou des contre-indications',
      'Elle mélange les conclusions de plusieurs études',
    ],
    relatedConcepts: ['chain-of-verification', 'rag', 'biais-automatisation'],
  },
  'fine-tuning': {
    term: 'Fine-tuning',
    definition: 'Processus d\'entraînement supplémentaire d\'un modèle d\'IA sur des données spécifiques pour améliorer ses performances dans un domaine particulier.',
    category: 'technique',
    context: 'Le fine-tuning permet de spécialiser un modèle généraliste dans un domaine spécifique comme la médecine. Il donne à l\'IA des connaissances profondes qui dépassent le simple prompting.',
    examples: [
      'Entraîner GPT sur des manuels de pharmacie pour créer un assistant pharmaceutique',
      'Spécialiser un modèle sur la littérature médicale française',
      'Adapter un modèle pour comprendre le jargon pharmaceutique spécifique',
    ],
    relatedConcepts: ['rag', 'embeddings', 'donnees-synthetiques'],
  },
  'few-shot-prompting': {
    term: 'Few-shot Prompting',
    definition: 'Technique qui consiste à fournir à l\'IA quelques exemples (shots) du format ou du style de réponse attendu directement dans le prompt pour la guider.',
    category: 'méthode',
    context: 'Le few-shot prompting est comme montrer à l\'IA quelques exemples de ce que l\'on attend plutôt que de simplement le décrire. C\'est beaucoup plus efficace pour des tâches complexes.',
    examples: [
      'Montrer 2 exemples de fiches de révision avant d\'en demander une nouvelle',
      'Fournir un tableau de pharmacocinétique rempli comme modèle',
      'Donner des exemples de réponses formatées avec des balises XML',
    ],
    relatedConcepts: ['prompt-engineering', 'zero-shot', 'structuration-par-balises'],
  },
  'chain-of-thought': {
    term: 'Chain-of-Thought (CoT)',
    definition: 'Une technique de prompting où l\'on demande à l\'IA d\'expliciter son raisonnement étape par étape avant de donner la réponse finale. Cela améliore la logique et la transparence.',
    category: 'technique',
    context: 'Le Chain-of-Thought transforme l\'IA d\'une boîte noire en un partenaire de raisonnement. En forçant l\'explicitation des étapes, on obtient des résultats plus fiables et vérifiables.',
    examples: [
      'Pour un calcul de dose : "Calcule étape par étape la dose de paracétamol pour un patient de 65kg"',
      'Pour une analyse : "Analyse cette interaction médicamenteuse en expliquant chaque mécanisme"',
      'Pour un diagnostic : "Énumère les hypothèses diagnostiques possibles avec leurs arguments"',
    ],
    relatedConcepts: ['chain-of-verification', 'step-back-prompting', 'metacognition-ia'],
  },
  'chain-of-verification': {
    term: 'Chain-of-Verification (CoVe)',
    definition: 'Une technique où l\'IA devient son propre fact-checker, planifiant et exécutant des vérifications sur ses propres affirmations pour réduire les hallucinations.',
    category: 'technique avancée',
    context: 'CoVe est l\'une des techniques les plus prometteuses pour lutter contre les hallucinations. L\'IA apprend à douter de ses propres affirmations et à les vérifier systématiquement.',
    examples: [
      'L\'IA énonce une affirmation puis cherche des sources pour la valider',
      'Elle croise plusieurs sources pour vérifier une information médicale',
      'Elle identifie elle-même les contradictions dans ses réponses',
    ],
    relatedConcepts: ['hallucination', 'chain-of-thought', 'rag'],
  },
  'step-back-prompting': {
    term: 'Step-Back Prompting',
    definition: 'Une méthode de raisonnement qui force l\'IA à s\'abstraire des détails pour identifier les principes fondamentaux avant de résoudre un problème spécifique.',
    category: 'technique avancée',
  },
  'self-consistency': {
    term: 'Self-Consistency',
    definition: 'Améliorer la robustesse des réponses en générant plusieurs chemins de raisonnement et en sélectionnant la conclusion la plus fréquente par un vote majoritaire.',
    category: 'technique',
  },
  'metacognition-ia': {
    term: 'Métacognition (IA)',
    definition: 'Capacité d\'une IA (guidée par un prompt) à raisonner sur son propre processus de pensée, à l\'analyser, le critiquer et le justifier.',
    category: 'technique avancée',
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
  'agent-ai': {
    term: 'Agent IA',
    definition: 'Un système d\'IA proactif qui interprète un objectif, élabore une stratégie, utilise des outils et s\'auto-corrige. Contrairement à un chatbot qui ne fait que répondre aux questions.',
    category: 'technique',
    context: 'Les agents IA représentent l\'évolution prochaine de l\'interaction avec l\'IA. Plutôt que de dialoguer, on donne un objectif et l\'agent s\'organise pour l\'atteindre.',
    examples: [
      'Perplexity Deep Research qui planifie et exécute une recherche complète',
      'Un agent qui analyse plusieurs articles scientifiques et produit une synthèse',
      'Z.AI qui utilise la méthode Plan-and-Solve pour résoudre des problèmes complexes',
    ],
    relatedConcepts: ['plan-and-solve', 'react-agent', 'systemes-multi-agents', 'rag'],
  },
  'plan-and-solve': {
    term: 'Plan-and-Solve',
    definition: 'Une architecture d\'agent IA (utilisée par Z.AI) qui crée un plan complet avant d\'exécuter une série de tâches. Idéal pour les problèmes complexes nécessitant une vision globale.',
    category: 'architecture',
  },
  'react-agent': {
    term: 'ReAct (Reason+Act)',
    definition: 'Une architecture d\'agent IA (utilisée par Claude) qui fonctionne sur des boucles courtes "Pensée -> Action -> Observation". Idéal pour les tâches nécessitant une interaction constante avec des outils.',
    category: 'architecture',
  },
  'moe': {
    term: 'Mixture-of-Experts (MoE)',
    definition: 'Une architecture de modèle de langage qui n\'active qu\'une fraction de ses paramètres pour une tâche donnée, permettant une grande échelle tout en étant efficace en calcul.',
    category: 'technique',
  },
  'dialogue-socratique-ia': {
    term: 'Dialogue Socratique',
    definition: 'Méthode pédagogique où l\'IA ne donne pas de réponses mais pose des questions pour guider l\'étudiant à construire son propre raisonnement.',
    category: 'méthode',
    context: 'Le dialogue socratique transforme l\'IA en tuteur plutôt qu\'en source de réponses. Cette méthode favorise l\'apprentissage actif et évite le désapprentissage cognitif.',
    examples: [
      'IA : "Quels sont les facteurs à considérer pour ce dosage ?"',
      'IA : "Cette interaction te semble-t-elle plausible ? Pourquoi ?"',
      'IA : "Qu\'autres hypothèses diagnostiques devrions-nous envisager ?"',
    ],
    relatedConcepts: ['desapprentissage-cognitif', 'metacognition-ia', 'biais-automatisation'],
  },
  'biais-automatisation': {
    term: 'Biais d\'Automatisation',
    definition: 'Tendance à trop faire confiance aux systèmes automatisés, ce qui diminue l\'esprit critique et la vigilance.',
    category: 'biais',
    context: 'Ce biais est particulièrement dangereux en santé où l\'esprit critique est essentiel. Il peut conduire à accepter des diagnostics ou traitements suggérés par l\'IA sans vérification.',
    examples: [
      'Accepter sans vérifier une posologie proposée par l\'IA',
      'Se fier à une interprétation de résultats biologiques sans double-check',
      'Ne pas questionner une source citée qui semble pertinente',
    ],
    relatedConcepts: ['hallucination', 'desapprentissage-cognitif', 'inference-causale-ia'],
  },
  'desapprentissage-cognitif': {
    term: 'Désapprentissage Cognitif (Deskilling)',
    definition: 'Perte de compétences due à la délégation excessive du raisonnement à une machine.',
    category: 'biais',
  },
  'systemes-multi-agents': {
    term: 'Systèmes Multi-Agents',
    definition: 'Utilisation de plusieurs agents IA, chacun avec un rôle spécifique, pour analyser un problème sous différents angles.',
    category: 'architecture',
  },
  'inference-causale-ia': {
    term: 'Inférence Causale',
    definition: 'Processus visant à déterminer une relation de cause à effet. C\'est une faiblesse majeure des IA actuelles, qui excellent en corrélation mais pas en causalité.',
    category: 'limitation',
  },
  'quantification': {
    term: 'Quantification',
    definition: 'Technique qui consiste à réduire la précision numérique des poids d\'un modèle (ex: de 16-bit à 4-bit) pour diminuer son empreinte mémoire et accélérer l\'inférence, rendant possible son exécution sur du matériel grand public.',
    category: 'technique',
    context: 'La quantification est la clé qui permet de faire tourner des modèles d\'IA puissants sur des ordinateurs grand public. Sans elle, l\'IA locale serait limitée aux très petits modèles.',
    examples: [
      'Un modèle en 16-bit nécessite 2x plus de VRAM qu\'en 8-bit',
      'La quantification 4-bit peut diviser par 4 la taille du modèle',
      'GGUF est un format optimisé pour les modèles quantifiés',
      'LLaMA 3 70B peut tourner sur 24GB VRAM en 4-bit vs 140GB en 16-bit',
    ],
    relatedConcepts: ['gguf', 'vram', 'donnees-synthetiques'],
  },
  'gguf': {
    term: 'GGUF',
    definition: 'Un format de fichier universel pour les modèles quantifiés, devenu le standard de facto pour l\'inférence sur CPU et GPU en local. Supporté par des outils comme LM Studio, Ollama et Jan.ai.',
    category: 'format',
  },
  'vram': {
    term: 'VRAM (Video RAM)',
    definition: 'La mémoire dédiée d\'une carte graphique (GPU). C\'est le facteur limitant le plus important pour faire tourner de grands modèles de langage en local, car le modèle doit y être chargé pour une performance optimale.',
    category: 'matériel',
  },
  'anonymisation': {
    term: 'Anonymisation',
    definition: 'Processus irréversible qui empêche "raisonnablement" toute ré-identification d\'une personne. Une donnée anonymisée sort du champ d\'application du RGPD.',
    category: 'juridique',
    context: 'L\'anonymisation est cruciale en santé pour utiliser les données patients tout en respectant la vie privée. Elle permet la recherche et l\'IA sans risque de ré-identification.',
    examples: [
      'Remplacer les noms patients par des identifiants uniques non corrélables',
      'Agréger les données pour qu\'elles ne concernent plus d\'individus spécifiques',
      'Générer des données synthétiques qui préservent les propriétés statistiques',
    ],
    relatedConcepts: ['pseudonymisation', 'donnees-synthetiques', 'ai-act'],
  },
  'pseudonymisation': {
    term: 'Pseudonymisation',
    definition: 'Processus réversible qui remplace les identifiants directs par un pseudonyme. La ré-identification reste possible avec une clé, donc la donnée reste sous le régime du RGPD.',
    category: 'juridique',
  },
  'donnees-synthetiques': {
    term: 'Données Synthétiques',
    definition: 'Données artificiellement créées qui miment les propriétés statistiques de données réelles, sans contenir d\'informations personnelles. Une technique d\'anonymisation avancée.',
    category: 'technique',
  },
  'ai-act': {
    term: 'AI Act Européen',
    definition: 'Réglementation européenne qui classe les systèmes d\'IA par niveau de risque et impose des obligations spécifiques (documentation, supervision humaine...) pour les systèmes à haut risque, comme ceux utilisés en santé.',
    category: 'juridique',
  },
}
