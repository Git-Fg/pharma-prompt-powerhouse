import type { Prompt } from '@/lib/content-schema';

const promptData = {
  "slug": "resolveur-cas-cliniques-tot",
  "title": "Résolveur de Cas Cliniques Complexe (ToT)",
  "description": "Un prompt avancé basé sur la méthode Tree-of-Thought pour analyser des cas cliniques complexes avec diagnostic différentiel structuré.",
  "icon": "GitBranch",
  "category": "clinique",
  "difficulty": "avancé",
  "tags": [
    "cas-clinique",
    "clinique",
    "exemple-code",
    "pharmacie",
    "prompting",
    "template",
    "tree-of-thought",
    "variables"
  ],
  "isFavorite": false,
  "keyTakeaways": [],
  "conceptSlugs": [
    "tree-of-thought",
    "structuration-par-balises"
  ],
  "variables": [
    "cas_clinique",
    "hypothèses_diagnostiques"
  ],
  "promptContent": "<role>\nTu es un clinicien expert en pharmacie hospitalière avec 15 ans d'expérience dans le diagnostic différentiel.\n</role>\n\n<cas_clinique>\n{{cas_clinique}}\n</cas_clinique>\n\n<hypothèses_diagnostiques>\n{{hypothèses_diagnostiques}}\n</hypothèses_diagnostiques>\n\n<thinking_process>\nAnalyse ce cas en explorant chaque hypothèse dans une branche de raisonnement séparée.\nPour chaque branche, évalue :\n- La probabilité (0-1)\n- Les arguments cliniques et biologiques\n- Les actions diagnostiques et thérapeutiques appropriées\n</thinking_process>\n\n<format_sortie>\nAprès avoir exploré chaque branche, fournis une synthèse finale :\n<analyse_finale>\n  <evaluation_branches>\n    <!-- Pour chaque hypothèse, indique la probabilité et la justification -->\n  </evaluation_branches>\n  <diagnostic_le_plus_probable></diagnostic_le_plus_probable>\n <plan_action_immediat>\n    <!-- 3-5 actions prioritaires -->\n  </plan_action_immediat>\n</analyse_finale>\n</format_sortie>\n",
  "systemPromptContent": "Tu es un clinicien expert en pharmacie hospitalière avec 15 ans d'expérience dans le diagnostic différentiel. Ta spécialité est d'analyser des cas complexes en explorant plusieurs hypothèses en parallèle (Tree-of-Thought) et de proposer des plans d'action fondés sur des données probantes.\n",
  "alternativeVersions": {
    "standard": "Tu es un clinicien expert en pharmacie hospitalière avec 15 ans d'expérience dans le diagnostic différentiel.\n\nAnalyse le cas clinique suivant en explorant plusieurs hypothèses diagnostiques.\n\n**Cas Clinique :**\n{{cas_clinique}}\n\n**Hypothèses Diagnostiques :**\n{{hypothèses_diagnostiques}}\n\nPour chaque hypothèse, évalue :\n- La probabilité (0-1)\n- Les arguments cliniques et biologiques\n- Les actions diagnostiques et thérapeutiques appropriées\n\nFournis une synthèse finale avec le diagnostic le plus probable et un plan d'action immédiat (3-5 actions prioritaires).\n",
    "xml": "<role>\nTu es un clinicien expert en pharmacie hospitalière avec 15 ans d'expérience dans le diagnostic différentiel.\n</role>\n\n<cas_clinique>\n{{cas_clinique}}\n</cas_clinique>\n\n<hypothèses_diagnostiques>\n{{hypothèses_diagnostiques}}\n</hypothèses_diagnostiques>\n\n<thinking_process>\nAnalyse ce cas en explorant chaque hypothèse dans une branche de raisonnement séparée.\nPour chaque branche, évalue :\n- La probabilité (0-1)\n- Les arguments cliniques et biologiques\n- Les actions diagnostiques et thérapeutiques appropriées\n</thinking_process>\n\n<format_sortie>\nAprès avoir exploré chaque branche, fournis une synthèse finale :\n<analyse_finale>\n  <evaluation_branches>\n    <!-- Pour chaque hypothèse, indique la probabilité et la justification -->\n  </evaluation_branches>\n  <diagnostic_le_plus_probable></diagnostic_le_plus_probable>\n <plan_action_immediat>\n    <!-- 3-5 actions prioritaires -->\n  </plan_action_immediat>\n</analyse_finale>\n</format_sortie>\n",
    "aiStudio": {
      "systemPrompt": "Tu es un clinicien expert en pharmacie hospitalière avec 15 ans d'expérience dans le diagnostic différentiel. Ta spécialité est d'analyser des cas complexes en explorant plusieurs hypothèses en parallèle (Tree-of-Thought) et de proposer des plans d'action fondés sur des données probantes.\n",
      "userPrompt": "Analyse le cas clinique suivant en explorant plusieurs hypothèses diagnostiques.\n\n**Cas Clinique :**\n{{cas_clinique}}\n\n**Hypothèses Diagnostiques :**\n{{hypothèses_diagnostiques}}\n\nPour chaque hypothèse, évalue :\n- La probabilité (0-1)\n- Les arguments cliniques et biologiques\n- Les actions diagnostiques et thérapeutiques appropriées\n\nFournis une synthèse finale avec le diagnostic le plus probable et un plan d'action immédiat (3-5 actions prioritaires)."
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
      "OpenAI Playground"
    ]
  },
  "content": [
    {
      "type": "markdown",
      "content": "## Méthode Tree-of-Thought pour les Cas Cliniques\n\nCe prompt utilise la méthode **[Tree-of-Thought](/concepts/tree-of-thought)** pour forcer l'IA à explorer plusieurs hypothèses diagnostiques en parallèle, imitant l'approche d'un clinicien expert."
    },
    {
      "type": "card",
      "title": "Variables à Personnaliser",
      "content": "- **{{cas_clinique}}** : Description détaillée du cas clinique\n- **{{hypothèses_diagnostiques}}** : Liste des hypothèses à explorer"
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
              "title": "Exemple : Bradycardie chez un Patient sous Amiodarone",
              "content": "**Cas Clinique :**\nPatient de 78 ans, femme, avec antécédents d'HTA et fibrillation atriale. Sous amiodarone 200mg/j, apixaban 2.5mg x2/j et furosémide 40mg/j. Présente une asthénie intense depuis 48h avec une fréquence cardiaque à 45 bpm.\n\n**Hypothèses Diagnostiques :**\n1. Surdosage en bêta-bloquant ou bradycardisant\n2. Trouble de la conduction cardiaque intrinsèque\n3. Cause métabolique (ex: dysthyroïdie)"
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
              "content": "Optimisé pour Claude qui excelle avec les balises structurées `<role>`, `<cas_clinique>`, `<hypothèses_diagnostiques>`."
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
      "title": "⚠️ Validation Clinique",
      "content": "Toujours valider les analyses avec un clinicien humain. Ce prompt est un outil d'aide à la réflexion, pas un substitut au jugement médical."
    },
    {
      "type": "conceptRecommendation",
      "slug": "tree-of-thought",
      "reason": "Approfondissez la méthode Tree-of-Thought pour comprendre comment elle améliore le raisonnement clinique de l'IA."
    },
    {
      "type": "guideRecommendation",
      "slug": "tree-of-thought-clinique",
      "reason": "Suivez le guide pratique pour maîtriser l'application du Tree-of-Thought aux cas cliniques complexes."
    }
  ]
};

// Validation et export
export const prompt = promptData satisfies Prompt;