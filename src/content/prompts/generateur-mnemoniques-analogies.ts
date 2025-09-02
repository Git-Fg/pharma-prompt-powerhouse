// src/content/prompts-new/generateur-mnemoniques-analogies.ts
import { Prompt, promptSchema } from '@/lib/content-schema';

const promptData = {
  "slug": "generateur-mnemoniques-analogies",
  "title": "Générateur de Mnémoniques et Analogies",
  "description": "Créez des moyens mnémotechniques et des analogies pour mémoriser facilement les concepts pharmaceutiques les plus complexes.",
  "icon": "Brain",
  "category": "apprentissage",
  "difficulty": "débutant",
  "tags": [
    "exemple-code",
    "mnemonique",
    "pedagogie",
    "pharmacie",
    "prompting",
    "template",
    "variables"
  ],
  "isFavorite": false,
  "keyTakeaways": [],
  "conceptSlugs": [
    "température-dosage"
  ],
  "targetTool": "Google AI Studio",
  "variables": [
    "elements_a_memoriser",
    "type_aide_memoire",
    "style_prefere"
  ],
  "promptContent": "Crée une aide-mémoire de type **{{type_aide_memoire}}** pour mémoriser la liste suivante.\nLe style doit être **{{style_prefere}}**.\n\n**Éléments à mémoriser :**\n{{elements_a_memoriser}}\n",
  "systemPromptContent": "Tu es un tuteur en pharmacie extrêmement créatif, reconnu pour tes moyens mnémotechniques inoubliables et tes analogies percutantes. Tu cherches toujours l'originalité et l'efficacité pédagogique.\n",
  "alternativeVersions": {
    "standard": "Tu es un tuteur en pharmacie extrêmement créatif, reconnu pour tes moyens mnémotechniques inoubliables et tes analogies percutantes. Tu cherches toujours l'originalité et l'efficacité pédagogique.\n\nCrée une aide-mémoire de type **{{type_aide_memoire}}** pour mémoriser la liste suivante.\nLe style doit être **{{style_prefere}}**.\n\n**Éléments à mémoriser :**\n{{elements_a_memoriser}}\n",
    "xml": "<role>\nTu es un tuteur en pharmacie extrêmement créatif, reconnu pour tes moyens mnémotechniques inoubliables et tes analogies percutantes.\n</role>\n\n<task>\nCrée une aide-mémoire de type **{{type_aide_memoire}}** pour mémoriser la liste suivante.\nLe style doit être **{{style_prefere}}**.\n</task>\n\n<elements_to_memorize>\n{{elements_a_memoriser}}\n</elements_to_memorize>\n\n<output_format>\n- Commence par proposer 3 approches différentes\n- Développe celle qui semble la plus efficace\n- Ajoute des conseils d'utilisation\n</output_format>\n",
    "aiStudio": {
      "systemPrompt": "Tu es un tuteur en pharmacie extrêmement créatif, reconnu pour tes moyens mnémotechniques inoubliables et tes analogies percutantes. Tu cherches toujours l'originalité et l'efficacité pédagogique.\n",
      "userPrompt": "Crée une aide-mémoire de type **{{type_aide_memoire}}** pour mémoriser la liste suivante.\nLe style doit être **{{style_prefere}}**.\n\n**Éléments à mémoriser :**\n{{elements_a_memoriser}}\n"
    }
  },
  "recommendedTools": {
    "standard": [
      "ChatGPT",
      "Claude.ai",
      "Gemini"
    ],
    "xml": [
      "Claude.ai",
      "DeepSeek"
    ],
    "aiStudio": [
      "Google AI Studio"
    ]
  },
  "content": [
    {
      "type": "alert",
      "variant": "default",
      "title": "🌡️ Température Recommandée",
      "content": "Réglez entre **0.7** et **0.9** dans les paramètres pour obtenir des résultats vraiment originaux et créatifs. En dessous, les réponses seront trop convenues."
    },
    {
      "type": "markdown",
      "content": "## Variables à Personnaliser"
    },
    {
      "type": "card",
      "title": "Template Variables",
      "content": "- **{{type_aide_memoire}}** : \"mnémotechnique\", \"analogie\", \"histoire\", \"image mentale\", \"poème\"\n- **{{style_prefere}}** : \"humoristique\", \"professionnel\", \"dramatique\", \"scientifique\", \"original\"\n- **{{elements_a_memoriser}}** : Liste des éléments à retenir"
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
              "title": "Exemple : Classes d'Antibiotiques",
              "content": "**Type** : mnémotechnique\n**Style** : humoristique\n**Éléments** : Pénicillines, Céphalosporines, Macrolides, Quinolones\n\n**Résultat possible** : \"**P**apy **C**harles **M**ange des **Q**uiches\" avec histoire détaillée pour chaque classe."
            },
            {
              "type": "card",
              "title": "Exemple : Interactions Warfarine",
              "variant": "outline",
              "content": "**Type** : analogie\n**Style** : professionnel\n**Éléments** : Aspirine, Amiodarone, Antibiotiques\n\n**Résultat possible** : Analogie du \"chef cuisinier\" (warfarine) perturbé par différents \"ingrédients\" (interactions)."
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
              "content": "Parfait pour les interfaces de chat simples (ChatGPT, Claude, Gemini). Format conversationnel naturel."
            },
            {
              "type": "card",
              "title": "Version XML",
              "variant": "outline",
              "content": "Optimisé pour Claude qui excelle avec les balises structurées `<role>`, `<task>`, `<elements_to_memorize>`."
            },
            {
              "type": "card",
              "title": "Version AI Studio",
              "variant": "outline",
              "content": "Sépare System/User pour un contrôle granulaire des paramètres de créativité."
            }
          ]
        }
      ]
    },
    {
      "type": "alert",
      "variant": "default",
      "title": "🎨 Conseil Créatif",
      "content": "N'hésitez pas à demander plusieurs approches dans le même prompt. L'IA proposera souvent 2-3 alternatives dont vous pourrez choisir la plus mémorable."
    },
    {
      "type": "conceptRecommendation",
      "slug": "température-dosage",
      "reason": "Comprenez comment ajuster la température pour optimiser la créativité de vos mnémotechniques."
    },
    {
      "type": "guideRecommendation",
      "slug": "choisir-ses-outils-ia-en-2025-chat-vs-studio",
      "reason": "Découvrez quel format utiliser selon votre outil préféré pour maximiser la créativité."
    }
  ]
};

// Validation et export
export const prompt: Prompt = promptSchema.parse(promptData);