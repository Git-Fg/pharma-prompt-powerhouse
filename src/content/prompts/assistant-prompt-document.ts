// src/content/prompts-new/assistant-prompt-document.ts
import { Prompt, promptSchema } from '@/lib/content-schema';

const promptData = {
  "slug": "assistant-prompt-document",
  "title": "Assistant d'Analyse de Document",
  "description": "Permet de 'dialoguer' avec un document (PDF, notes de cours) pour en extraire des synthèses ou des réponses précises.",
  "icon": "FileText",
  "category": "apprentissage",
  "difficulty": "intermédiaire",
  "tags": [
    "claude",
    "exemple-code",
    "fiche-revision",
    "pharmacie",
    "prompting",
    "recherche",
    "synthese",
    "template",
    "variables"
  ],
  "isFavorite": false,
  "keyTakeaways": [],
  "conceptSlugs": [
    "context-engineering"
  ],
  "variables": [
    "document_content",
    "user_question"
  ],
  "promptContent": "<document>\n{{document_content}}\n</document>\n\n<instructions>\nEn te basant EXCLUSIVEMENT sur le document fourni ci-dessus, réponds à la question suivante. Si l'information n'est pas présente dans le texte, réponds \"L'information n'est pas disponible dans le document fourni.\"\n</instructions>\n\n<question>\n{{user_question}}\n</question>\n",
  "alternativeVersions": {
    "standard": "### Contexte\nVoici un document :\n\"\"\"\n{{document_content}}\n\"\"\"\n\n### Ma Question\nEn me basant uniquement sur le document ci-dessus, réponds à cette question : {{user_question}}\n\n**Règle importante :** Si la réponse ne se trouve pas dans le document, dis-le explicitement.\n",
    "xml": "<document>\n{{document_content}}\n</document>\n\n<instructions>\nEn te basant EXCLUSIVEMENT sur le document fourni ci-dessus, réponds à la question suivante. Si l'information n'est pas présente dans le texte, réponds \"L'information n'est pas disponible dans le document fourni.\"\n</instructions>\n\n<question>\n{{user_question}}\n</question>\n"
  },
  "recommendedTools": {
    "standard": [
      "ChatGPT",
      "Gemini"
    ],
    "xml": [
      "Claude.ai",
      "DeepSeek"
    ]
  },
  "content": [
    {
      "type": "alert",
      "variant": "default",
      "title": "🏆 Outil Recommandé",
      "content": "**Claude** est la meilleure plateforme pour ce prompt car elle permet d'uploader des fichiers PDF directement."
    },
    {
      "type": "tabs",
      "defaultValue": "claude",
      "tabs": [
        {
          "value": "claude",
          "title": "Claude (Recommandé)",
          "content": [
            {
              "type": "card",
              "title": "Format Optimal avec Upload PDF",
              "description": "Utilisation directe des balises XML",
              "content": "1. **Utilisez l'icône trombone** 📎 pour joindre votre fichier PDF\n2. **Copiez le prompt principal** tel quel (avec les balises XML)\n3. Les balises `<document>` et `<question>` sont particulièrement efficaces sur Claude"
            },
            {
              "type": "alert",
              "variant": "default",
              "title": "🎯 Avantage",
              "content": "Claude excelle dans l'analyse de documents avec cette structure XML et peut traiter les PDF directement."
            }
          ]
        },
        {
          "value": "aistudio",
          "title": "Google AI Studio",
          "content": [
            {
              "type": "card",
              "title": "Traitement de Longs Documents",
              "description": "Contexte de 1M tokens",
              "content": "1. **Copiez le texte** de votre document\n2. **Remplacez** `{{document_content}}` par votre contenu\n3. **Utilisez la version XML** pour plus de précision"
            },
            {
              "type": "alert",
              "variant": "default",
              "title": "🚀 Avantage",
              "content": "Parfait pour les très gros documents grâce à la fenêtre de contexte massive de Gemini 2.5 Pro."
            }
          ]
        },
        {
          "value": "chatgpt",
          "title": "ChatGPT",
          "content": [
            {
              "type": "card",
              "title": "Format Conversationnel",
              "description": "Plus naturel et intuitif",
              "content": "1. **Utilisez la version alternative** (format plus conversationnel)\n2. **Copiez-collez votre document** à la place de `{{document_content}}`\n3. ChatGPT répond mieux au format des guillemets triples (`\"\"\"`)"
            },
            {
              "type": "alert",
              "variant": "default",
              "title": "📝 Note",
              "content": "La version alternative est optimisée pour le style conversationnel de ChatGPT."
            }
          ]
        }
      ]
    },
    {
      "type": "markdown",
      "content": "## Variables à Personnaliser"
    },
    {
      "type": "card",
      "title": "Template Variables",
      "content": "- **{{document_content}}** : Le contenu complet de votre document (texte, PDF converti)\n- **{{user_question}}** : Votre question spécifique sur le document"
    },
    {
      "type": "codeBlock",
      "language": "text",
      "filename": "exemple-utilisation.txt",
      "content": "Document : \"Guide de prescription des anticoagulants oraux directs...\"\nQuestion : \"Quelles sont les contre-indications absolues des AOD chez les patients insuffisants rénaux ?\"\n\nRésultat attendu : Réponse précise basée uniquement sur le contenu du document fourni."
    },
    {
      "type": "alert",
      "variant": "default",
      "title": "🛡️ Technique Anti-Hallucination",
      "content": "L'utilisation de balises XML (`<document>`, `<instructions>`, `<question>`) sépare clairement la source de vérité de l'instruction, ce qui réduit drastiquement le risque d'hallucination."
    },
    {
      "type": "toolRecommendation",
      "slug": "claude-ai",
      "reason": "Claude excelle dans l'analyse de documents avec cette structure XML et peut traiter les PDF directement grâce à sa capacité d'upload de fichiers native."
    },
    {
      "type": "conceptRecommendation",
      "slug": "context-engineering",
      "reason": "Ce prompt illustre parfaitement les principes du context engineering : structuration claire des informations pour une analyse précise et fiable."
    },
    {
      "type": "guideRecommendation",
      "slug": "structurer-ses-prompts-avec-des-balises-methode-xml",
      "reason": "Approfondissez votre maîtrise de la structuration XML pour créer des prompts d'analyse encore plus sophistiqués et précis."
    }
  ]
};

// Validation et export
export const prompt: Prompt = promptSchema.parse(promptData);