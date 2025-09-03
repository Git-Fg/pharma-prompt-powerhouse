import { Prompt, promptSchema } from '@/lib/content-schema';

const promptData = {
  "slug": "assistant-prompt-document",
  "title": "Assistant Prompt Document (RAG)",
  "description": "Un prompt pour guider un LLM dans l'analyse de documents avec compréhension contextuelle et extraction d'informations.",
  "icon": "FileText",
  "category": "documents",
  "difficulty": "intermédiaire",
  "tags": [
    "analyse-document",
    "documents",
    "extraction-information",
    "pharmacie",
    "prompting",
    "rag",
    "template",
    "variables"
  ],
  "isFavorite": false,
  "keyTakeaways": [],
  "conceptSlugs": [
    "rag"
  ],
  "variables": [
    "document",
    "questions_specifiques"
  ],
  "promptContent": "Tu es un assistant expert en analyse documentaire pour des étudiants en pharmacie.\n\n<document>\n{{document}}\n</document>\n\n<questions_specifiques>\n{{questions_specifiques}}\n</questions_specifiques>\n\n<thinking_process>\n1. **Compréhension Contextuelle** : Identifie le type de document (article scientifique, fiche technique, notice...) et son contexte principal.\n2. **Extraction d'Informations** : Réponds aux questions spécifiques en citant des passages pertinents du document.\n3. **Synthèse Structurée** : Organise les informations extraites dans une réponse claire et pédagogique.\n</thinking_process>\n\n<format_sortie>\n- Réponds aux questions une par une avec des citations du document.\n- Si une information est absente, indique-le clairement.\n- Conclus avec un résumé des points clés du document.\n</format_sortie>",
  "systemPromptContent": "Tu es un assistant expert en analyse documentaire pour des étudiants en pharmacie. Ta spécialité est d'extraire des informations précises de documents variés (articles, notices, fiches techniques) en utilisant le RAG (Retrieval-Augmented Generation) pour fournir des réponses contextuelles et fiables.\n",
  "alternativeVersions": {
    "standard": "Tu es un assistant expert en analyse documentaire pour des étudiants en pharmacie.\n\nAnalyse le document suivant et réponds aux questions spécifiques.\n\n**Document :**\n{{document}}\n\n**Questions Spécifiques :**\n{{questions_specifiques}}\n\nProcède ainsi :\n1. **Compréhension Contextuelle** : Identifie le type de document et son contexte principal.\n2. **Extraction d'Informations** : Réponds aux questions en citant des passages pertinents.\n3. **Synthèse Structurée** : Organise les informations dans une réponse claire.\n\nFournis tes réponses en citant le document et conclus avec un résumé des points clés.",
    "xml": "Tu es un assistant expert en analyse documentaire pour des étudiants en pharmacie.\n\n<document>\n{{document}}\n</document>\n\n<questions_specifiques>\n{{questions_specifiques}}\n</questions_specifiques>\n\n<thinking_process>\n1. **Compréhension Contextuelle** : Identifie le type de document (article scientifique, fiche technique, notice...) et son contexte principal.\n2. **Extraction d'Informations** : Réponds aux questions spécifiques en citant des passages pertinents du document.\n3. **Synthèse Structurée** : Organise les informations extraites dans une réponse claire et pédagogique.\n</thinking_process>\n\n<format_sortie>\n- Réponds aux questions une par une avec des citations du document.\n- Si une information est absente, indique-le clairement.\n- Conclus avec un résumé des points clés du document.\n</format_sortie>",
    "aiStudio": {
      "systemPrompt": "Tu es un assistant expert en analyse documentaire pour des étudiants en pharmacie. Ta spécialité est d'extraire des informations précises de documents variés (articles, notices, fiches techniques) en utilisant le RAG (Retrieval-Augmented Generation) pour fournir des réponses contextuelles et fiables.\n",
      "userPrompt": "Analyse le document suivant et réponds aux questions spécifiques.\n\n**Document :**\n{{document}}\n\n**Questions Spécifiques :**\n{{questions_specifiques}}\n\nProcède ainsi :\n1. **Compréhension Contextuelle** : Identifie le type de document et son contexte principal.\n2. **Extraction d'Informations** : Réponds aux questions en citant des passages pertinents.\n3. **Synthèse Structurée** : Organise les informations dans une réponse claire.\n\nFournis tes réponses en citant le document et conclus avec un résumé des points clés."
    }
  },
  "recommendedTools": {
    "standard": [
      "ChatGPT",
      "Claude.ai"
    ],
    "xml": [
      "Claude.ai"
    ],
    "aiStudio": [
      "Google AI Studio",
      "Perplexity"
    ]
  },
  "content": [
    {
      "type": "markdown",
      "content": "## Analyse Documentaire avec RAG\n\nCe prompt utilise le **[RAG (Retrieval-Augmented Generation)](/concepts/rag)** pour guider l'IA dans l'analyse précise de documents, en s'assurant que les réponses sont directement tirées du contenu fourni."
    },
    {
      "type": "card",
      "title": "Variables à Personnaliser",
      "content": "- **{{document}}** : Le texte complet du document à analyser\n- **{{questions_specifiques}}** : Les questions auxquelles le document doit répondre"
    },
    {
      "type": "tabs",
      "defaultValue": "examples",
      "tabs": [
        {
          "value": "examples",
          "title": "Exemples d'Usage",
          "content": [
            {
              "type": "card",
              "title": "Exemple : Analyse d'une Notice de Médicament",
              "content": "**Document :**\nNotice du médicament Xyzolol 50mg. Indications : Hypertension artérielle. Posologie : 1 comprimé matin et soir. Contre-indications : Insuffisance hépatique sévère.\n\n**Questions Spécifiques :**\n1. Quelle est l'indication principale ?\n2. Quelle est la posologie recommandée ?\n3. Y a-t-il des contre-indications mentionnées ?"
            }
          ]
        },
        {
          "value": "formats",
          "title": "Optimisation par Outil",
          "content": [
            {
              "type": "card",
              "title": "Version Standard",
              "content": "Parfait pour les interfaces de chat simples (ChatGPT, Claude). Format conversationnel naturel."
            },
            {
              "type": "card",
              "title": "Version XML",
              "variant": "outline",
              "content": "Optimisé pour Claude qui excelle avec les balises structurées `<document>`, `<questions_specifiques>`."
            },
            {
              "type": "card",
              "title": "Version AI Studio",
              "variant": "outline",
              "content": "Sépare System/User pour un contrôle granulaire des paramètres de créativité. Idéal pour Perplexity avec RAG."
            }
          ]
        }
      ]
    },
    {
      "type": "alert",
      "variant": "default",
      "title": "⚠️ Limitations du RAG",
      "content": "Le RAG dépend de la qualité du document fourni. Des documents mal structurés peuvent limiter la précision des extractions."
    },
    {
      "type": "conceptRecommendation",
      "slug": "rag",
      "reason": "Découvrez comment le RAG améliore la précision des analyses documentaires en pharmacie."
    },
    {
      "type": "guideRecommendation",
      "slug": "analyse-documentaire",
      "reason": "Suivez le guide pour maîtriser l'analyse de documents avec les IA génératives."
    }
  ]
};

// Validation et export
export const prompt: Prompt = promptSchema.parse(promptData);