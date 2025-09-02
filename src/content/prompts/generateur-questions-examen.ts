// src/content/prompts-new/generateur-questions-examen.ts
import { Prompt, promptSchema } from '@/lib/content-schema';

const promptData = {
  "slug": "generateur-questions-examen",
  "title": "Générateur de Questions d'Examen",
  "description": "Transformez vos notes de cours en QCM et questions ouvertes pour une révision active et efficace.",
  "icon": "HelpCircle",
  "category": "apprentissage",
  "difficulty": "intermédiaire",
  "tags": [
    "chatgpt",
    "exemple-code",
    "pedagogie",
    "pharmacie",
    "prompting",
    "qcm",
    "template",
    "variables"
  ],
  "isFavorite": false,
  "keyTakeaways": [],
  "conceptSlugs": [
    "context-engineering"
  ],
  "targetTool": "ChatGPT",
  "variables": [
    "course_content",
    "question_types",
    "difficulty_level",
    "question_count"
  ],
  "promptContent": "<role>\nTu es un concepteur de sujets d'examen pour le concours de l'internat en pharmacie. Tu crées des questions pertinentes qui testent la compréhension profonde et non la simple mémorisation.\n</role>\n\n<texte_de_cours>\n{{course_content}}\n</texte_de_cours>\n\n<instructions>\nEn te basant exclusivement sur le texte de cours fourni, génère {{question_count}} questions de type \"{{question_types}}\" avec un niveau de difficulté \"{{difficulty_level}}\".\nPour les QCM, fournis la réponse correcte et une justification.\nPour les questions ouvertes, fournis les points clés de la réponse attendue.\n</instructions>\n",
  "content": [
    {
      "type": "alert",
      "variant": "default",
      "title": "🎯 Outil Recommandé",
      "content": "**ChatGPT** avec son **Study Mode** est particulièrement adapté pour cette tâche grâce à son approche interactive d'apprentissage."
    },
    {
      "type": "markdown",
      "content": "## Comment Utiliser ce Prompt"
    },
    {
      "type": "card",
      "title": "Variables à Personnaliser",
      "variant": "outline",
      "content": "- **{{course_content}}** : Copiez-collez le contenu de votre cours ou de vos notes\n- **{{question_types}}** : \"QCM\", \"questions ouvertes\", ou \"mélange\"\n- **{{difficulty_level}}** : \"débutant\", \"intermédiaire\", ou \"avancé\"\n- **{{question_count}}** : Nombre de questions souhaitées (ex: 5, 10, 15)"
    },
    {
      "type": "tabs",
      "defaultValue": "standard",
      "tabs": [
        {
          "value": "standard",
          "title": "Version Standard",
          "content": [
            {
              "type": "markdown",
              "content": "Idéale pour tous les outils IA classiques."
            },
            {
              "type": "codeBlock",
              "language": "text",
              "filename": "prompt-standard.txt",
              "content": "Tu es un concepteur de sujets d'examen pour le concours de l'internat en pharmacie. Tu crées des questions pertinentes qui testent la compréhension profonde et non la simple mémorisation.\n\nEn te basant exclusivement sur le texte de cours suivant :\n\"\"\"\n{{course_content}}\n\"\"\"\n\nGénère {{question_count}} questions de type \"{{question_types}}\" avec un niveau de difficulté \"{{difficulty_level}}\".\n\nPour les QCM, fournis la réponse correcte et une justification.\nPour les questions ouvertes, fournis les points clés de la réponse attendue."
            }
          ]
        },
        {
          "value": "chatgpt-study",
          "title": "ChatGPT Study Mode",
          "content": [
            {
              "type": "alert",
              "variant": "default",
              "title": "💡 Astuce",
              "content": "Activez le **Study Mode** dans ChatGPT avant d'envoyer ce prompt pour une expérience d'apprentissage interactive."
            },
            {
              "type": "codeBlock",
              "language": "markdown",
              "filename": "chatgpt-study-mode.md",
              "content": "# Objectif : Préparation à l'examen\n\nAgis en tant que mon tuteur pour l'internat en pharmacie.\nVoici mon support de cours sur lequel je veux m'entraîner :\n\"\"\"\n{{course_content}}\n\"\"\"\n\nGénère {{question_count}} questions de type \"{{question_types}}\" (difficulté : {{difficulty_level}}).\n\nAprès chaque question que je réponds, donne-moi :\n- La correction détaillée\n- Une explication pédagogique\n- Des conseils pour mémoriser"
            }
          ]
        }
      ]
    },
    {
      "type": "card",
      "title": "Exemple Concret d'Utilisation",
      "content": "**Sujet** : Pharmacocinétique des bêta-bloquants\n\n**Variables personnalisées** :\n- `{{course_content}}` : *\"Les bêta-bloquants sont des antagonistes compétitifs des récepteurs β-adrénergiques...\"*\n- `{{question_types}}` : *\"QCM\"*\n- `{{difficulty_level}}` : *\"intermédiaire\"*\n- `{{question_count}}` : *\"8\"*"
    },
    {
      "type": "alert",
      "variant": "default",
      "title": "📚 Conseil Pédagogique",
      "content": "Pour maximiser l'efficacité, limitez le contenu de cours à un chapitre ou un concept à la fois. Cela permet des questions plus précises et ciblées."
    },
    {
      "type": "conceptRecommendation",
      "slug": "context-engineering",
      "reason": "Apprenez à optimiser la structure de vos cours pour des questions plus pertinentes et un apprentissage plus efficace."
    }
  ]
};

// Validation et export
export const prompt: Prompt = promptSchema.parse(promptData);