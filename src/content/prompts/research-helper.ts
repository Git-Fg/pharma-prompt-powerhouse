import { Prompt, promptSchema } from '@/lib/content-schema';

const promptData = {
  "slug": "research-helper",
  "title": "Assistant de Recherche Bibliographique",
  "description": "Une méthodologie et une série de prompts pour utiliser Perplexity.ai afin de réaliser une recherche bibliographique efficace et sourcée.",
  "icon": "Search",
  "category": "recherche",
  "difficulty": "intermédiaire",
  "tags": [
    "perplexity",
    "pharmacie",
    "prompting",
    "recherche",
    "template",
    "variables",
    "workflow"
  ],
  "isFavorite": false,
  "keyTakeaways": [],
  "conceptSlugs": [],
  "targetTool": "Perplexity.ai",
  "variables": [
    "research_topic",
    "specific_questions"
  ],
  "promptContent": "Sujet: {{research_topic}}\n\nInstructions: Fournis une synthèse générale sur ce sujet, en te basant sur la littérature académique des 2 dernières années. Identifie les 3 sous-thèmes les plus importants.\n\nQuestions spécifiques (si nécessaires):\n{{specific_questions}}\n",
  "content": [
    {
      "type": "alert",
      "variant": "default",
      "title": "🎯 Méthodologie de Recherche",
      "content": "Ce n'est pas un prompt unique, mais une **méthodologie de travail** spécialement conçue pour **Perplexity.ai** qui cite ses sources."
    },
    {
      "type": "tabs",
      "defaultValue": "workflow",
      "tabs": [
        {
          "value": "workflow",
          "title": "Workflow en 3 Étapes",
          "content": [
            {
              "type": "card",
              "title": "1. Choisir le Focus Academic",
              "content": "Avant de taper votre question, cliquez sur **\"Focus\"** et sélectionnez **\"Academic\"**. Cela limitera la recherche aux publications scientifiques uniquement."
            },
            {
              "type": "card",
              "title": "2. Question Initiale Large",
              "variant": "outline",
              "content": "Commencez par une question générale pour défricher le sujet et identifier les axes principaux de recherche."
            },
            {
              "type": "card",
              "title": "3. Questions de Suivi Précises",
              "variant": "outline",
              "content": "Utilisez les réponses et les sources de la première question pour affiner votre recherche avec des questions spécifiques."
            }
          ]
        },
        {
          "value": "prompts",
          "title": "Templates de Prompts",
          "content": [
            {
              "type": "markdown",
              "content": "### Prompt 1 : Question Initiale"
            },
            {
              "type": "codeBlock",
              "language": "text",
              "filename": "question-initiale.txt",
              "content": "Sujet : {{research_topic}}\n\nInstructions : Fournis une synthèse générale sur ce sujet, en te basant sur la littérature académique des 2 dernières années. Identifie les 3 sous-thèmes les plus importants."
            },
            {
              "type": "markdown",
              "content": "### Prompt 2 : Questions de Suivi"
            },
            {
              "type": "codeBlock",
              "language": "text",
              "filename": "questions-suivi.txt",
              "content": "Sujet : {{research_topic}}\n\nQuestions spécifiques :\n\"\"\"\n{{specific_questions}}\n\"\"\"\n\nInstructions : Réponds à chaque question de manière séparée, en citant systématiquement les sources pour chaque information clé."
            }
          ]
        }
      ]
    },
    {
      "type": "card",
      "title": "Exemple de Questions Spécifiques",
      "description": "Questions types pour approfondir une molécule",
      "content": "- Quel est le **mécanisme d'action précis** ?\n- Quelles sont les **données d'efficacité clinique** (critère principal) ?\n- Quel est le **profil de sécurité** (effets indésirables >5%) ?\n- Quelles sont les **contre-indications absolues** ?\n- **Interactions médicamenteuses** majeures documentées ?"
    },
    {
      "type": "alert",
      "variant": "default",
      "title": "💡 Stratégie Avancée",
      "content": "Après chaque réponse de Perplexity, consultez les **sources citées** pour valider et approfondir. Utilisez ces articles comme point de départ pour des recherches complémentaires."
    },
    {
      "type": "toolRecommendation",
      "slug": "perplexity-ai",
      "reason": "Cette méthodologie est spécifiquement optimisée pour Perplexity.ai avec son Focus Academic et sa capacité de citation de sources en temps réel."
    },
    {
      "type": "conceptRecommendation",
      "slug": "context-engineering",
      "reason": "Apprenez à structurer vos questions de recherche pour des résultats plus précis et pertinents."
    }
  ]
};

// Validation et export
export const prompt: Prompt = promptSchema.parse(promptData);