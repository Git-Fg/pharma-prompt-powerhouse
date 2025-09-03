import type { Prompt } from '@/lib/content-schema';

const promptData = {
  "slug": "generateur-mnemoniques-analogies",
  "title": "Générateur de Mnémoniques et Analogies",
  "description": "Un prompt pour créer des mnémoniques et analogies pédagogiques aidant à mémoriser des concepts complexes.",
  "icon": "Lightbulb",
  "category": "enseignement",
 "difficulty": "intermédiaire",
 "tags": [
    "analogie",
    "enseignement",
    "mnémonique",
    "mémoire",
    "pharmacie",
    "prompting",
    "template",
    "variables"
  ],
  "isFavorite": false,
  "keyTakeaways": [],
  "conceptSlugs": [],
  "variables": [
    "concept_complexe",
    "contexte_apprentissage"
  ],
  "promptContent": "Tu es un expert en neurosciences de l'apprentissage appliqué à la pharmacie.\n\n<concept_complexe>\n{{concept_complexe}}\n</concept_complexe>\n\n<contexte_apprentissage>\n{{contexte_apprentissage}}\n</contexte_apprentissage>\n\n<thinking_process>\n1. **Analyse Sémantique** : Décompose le concept en éléments clés.\n2. **Création de Liens** : Associe chaque élément à des images ou idées familières.\n3. **Génération de Mnémoniques** : Crée un acronyme ou une phrase mnémonique.\n4. **Construction d'Analogies** : Formule une analogie visuelle ou narrative.\n</thinking_process>\n\n<format_sortie>\n- Présente d'abord le mnémonique, puis l'analogie.\n- Explique comment chaque élément du mnémonique/analogy se rapporte au concept.\n- Adapte le langage au contexte d'apprentissage.\n</format_sortie>",
  "systemPromptContent": "Tu es un expert en neurosciences de l'apprentissage appliqué à la pharmacie. Ta spécialité est de créer des mnémoniques et analogies pédagogiques qui facilitent la mémorisation de concepts complexes en les reliant à des idées familières.\n",
  "alternativeVersions": {
    "standard": "Tu es un expert en neurosciences de l'apprentissage appliqué à la pharmacie.\n\nCrée un mnémonique et une analogie pour le concept complexe suivant.\n\n**Concept Complexe :**\n{{concept_complexe}}\n\n**Contexte d'Apprentissage :**\n{{contexte_apprentissage}}\n\nProcède ainsi :\n1. **Analyse Sémantique** : Décompose le concept en éléments clés.\n2. **Création de Liens** : Associe chaque élément à des images ou idées familières.\n3. **Génération de Mnémoniques** : Crée un acronyme ou une phrase.\n4. **Construction d'Analogies** : Formule une analogie visuelle.\n\nPrésente d'abord le mnémonique, puis l'analogie. Explique chaque lien et adapte le langage au contexte.",
    "xml": "Tu es un expert en neurosciences de l'apprentissage appliqué à la pharmacie.\n\n<concept_complexe>\n{{concept_complexe}}\n</concept_complexe>\n\n<contexte_apprentissage>\n{{contexte_apprentissage}}\n</contexte_apprentissage>\n\n<thinking_process>\n1. **Analyse Sémantique** : Décompose le concept en éléments clés.\n2. **Création de Liens** : Associe chaque élément à des images ou idées familières.\n3. **Génération de Mnémoniques** : Crée un acronyme ou une phrase mnémonique.\n4. **Construction d'Analogies** : Formule une analogie visuelle ou narrative.\n</thinking_process>\n\n<format_sortie>\n- Présente d'abord le mnémonique, puis l'analogie.\n- Explique comment chaque élément du mnémonique/analogy se rapporte au concept.\n- Adapte le langage au contexte d'apprentissage.\n</format_sortie>",
    "aiStudio": {
      "systemPrompt": "Tu es un expert en neurosciences de l'apprentissage appliqué à la pharmacie. Ta spécialité est de créer des mnémoniques et analogies pédagogiques qui facilitent la mémorisation de concepts complexes en les reliant à des idées familières.\n",
      "userPrompt": "Crée un mnémonique et une analogie pour le concept complexe suivant.\n\n**Concept Complexe :**\n{{concept_complexe}}\n\n**Contexte d'Apprentissage :**\n{{contexte_apprentissage}}\n\nProcède ainsi :\n1. **Analyse Sémantique** : Décompose le concept en éléments clés.\n2. **Création de Liens** : Associe chaque élément à des images ou idées familières.\n3. **Génération de Mnémoniques** : Crée un acronyme ou une phrase.\n4. **Construction d'Analogies** : Formule une analogie visuelle.\n\nPrésente d'abord le mnémonique, puis l'analogie. Explique chaque lien et adapte le langage au contexte."
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
      "DeepSeek Chat"
    ]
  },
  "content": [
    {
      "type": "markdown",
      "content": "## Mémorisation Assistée par IA\n\nCe prompt utilise les principes des neurosciences de l'apprentissage pour générer des mnémoniques et analogies qui facilitent la mémorisation de concepts complexes en pharmacie."
    },
    {
      "type": "card",
      "title": "Variables à Personnaliser",
      "content": "- **{{concept_complexe}}** : Le concept difficile à mémoriser\n- **{{contexte_apprentissage}}** : Le niveau (L1, L2, PACES) et le style (visuel, narratif)"
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
              "title": "Exemple : Cycle de Krebs (L2)",
              "content": "**Concept Complexe :**\nCycle de Krebs (acétyl-CoA → citrate → isocitrate → α-cétoglutarate → succinyl-CoA → succinate → fumarate → malate → oxaloacétate)\n\n**Contexte d'Apprentissage :**\nL2 en biologie, étudiants visuels ayant besoin d'une méthode de mémorisation rapide."
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
              "content": "Optimisé pour Claude qui excelle avec les balises structurées `<concept_complexe>`, `<contexte_apprentissage>`."
            },
            {
              "type": "card",
              "title": "Version AI Studio",
              "variant": "outline",
              "content": "Sépare System/User pour un contrôle granulaire des paramètres de créativité. Idéal pour DeepSeek Chat."
            }
          ]
        }
      ]
    },
    {
      "type": "alert",
      "variant": "default",
      "title": "⚠️ Créativité Humaine",
      "content": "Les mnémoniques générés automatiquement peuvent manquer de créativité. Encouragez les étudiants à les personnaliser pour les rendre plus mémorables."
    },
    {
      "type": "guideRecommendation",
      "slug": "methodes-memorisation",
      "reason": "Explorez d'autres techniques de mémorisation basées sur les neurosciences pour optimiser votre apprentissage."
    }
  ]
};

// Validation et export
export const prompt = promptData satisfies Prompt;