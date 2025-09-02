// src/content/prompts-new/constructeur-tableaux-comparatifs.ts
import { Prompt, promptSchema } from '@/lib/content-schema';

const promptData = {
  "slug": "constructeur-tableaux-comparatifs",
  "title": "Constructeur de Tableaux Comparatifs",
  "description": "Générez des tableaux comparatifs clairs et efficaces, un outil essentiel pour les révisions en pharmacie.",
  "icon": "Table",
  "category": "creation",
  "difficulty": "débutant",
  "tags": [
    "comparatif",
    "exemple-code",
    "pedagogie",
    "pharmacie",
    "prompting",
    "tableau",
    "template",
    "variables"
  ],
  "isFavorite": false,
  "keyTakeaways": [],
  "conceptSlugs": [
    "structuration-par-balises"
  ],
  "variables": [
    "sujet_comparaison",
    "elements_a_comparer",
    "criteres_comparaison"
  ],
  "promptContent": "<tache>\nCrée un tableau comparatif détaillé.\n</tache>\n\n<sujet>\n{{sujet_comparaison}}\n</sujet>\n\n<elements>\n{{elements_a_comparer}}\n</elements>\n\n<criteres>\n{{criteres_comparaison}}\n</criteres>\n",
  "systemPromptContent": "Tu es un expert en pharmacologie et en pédagogie. Ta spécialité est de créer des supports de révision clairs et synthétiques. Tu réponds toujours au format Markdown avec des tableaux bien structurés.\n",
  "alternativeVersions": {
    "standard": "Tu es un expert en pharmacologie et en pédagogie. Ta spécialité est de créer des supports de révision clairs et synthétiques. Tu réponds toujours au format Markdown avec des tableaux bien structurés.\n\nCrée un tableau comparatif détaillé pour :\n- **Sujet :** {{sujet_comparaison}}\n- **Éléments à comparer :** {{elements_a_comparer}}\n- **Critères de comparaison :** {{criteres_comparaison}}\n",
    "xml": "<role>\nTu es un expert en pharmacologie et en pédagogie, spécialisé dans la création de supports de révision.\n</role>\n\n<tache>\nCrée un tableau comparatif détaillé au format Markdown.\n</tache>\n\n<sujet>\n{{sujet_comparaison}}\n</sujet>\n\n<elements_to_compare>\n{{elements_a_comparer}}\n</elements_to_compare>\n\n<criteria>\n{{criteres_comparaison}}\n</criteria>\n\n<format_instructions>\n- Utilise le format Markdown pour les tableaux\n- Ajoute des émojis pour améliorer la lisibilité\n- Inclus une conclusion synthétique après le tableau\n</format_instructions>\n",
    "aiStudio": {
      "systemPrompt": "Tu es un expert en pharmacologie et en pédagogie. Ta spécialité est de créer des supports de révision clairs et synthétiques. Tu réponds toujours au format Markdown avec des tableaux bien structurés.\n",
      "userPrompt": "Crée un tableau comparatif détaillé pour :\n\n**Sujet :** {{sujet_comparaison}}\n**Éléments à comparer :** {{elements_a_comparer}}  \n**Critères de comparaison :** {{criteres_comparaison}}\n\nAjoute une brève conclusion après le tableau.\n"
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
      "Google AI Studio",
      "OpenAI Playground"
    ]
  },
  "content": [
    {
      "type": "markdown",
      "content": "## Notes d'Utilisation\n\nCe prompt utilise les nouvelles capacités multi-format pour s'adapter automatiquement à votre outil préféré. Chaque version est optimisée pour tirer le meilleur parti de la plateforme choisie."
    },
    {
      "type": "alert",
      "variant": "default",
      "title": "💡 Conseil",
      "content": "Pour des tableaux complexes, utilisez la version XML avec Claude qui excelle dans la structuration des données."
    },
    {
      "type": "markdown",
      "content": "## Exemple de Variables\n\nVoici un exemple concret d'utilisation :"
    },
    {
      "type": "codeBlock",
      "language": "text",
      "filename": "variables-exemple.txt",
      "content": "{{sujet_comparaison}} : \"Antidépresseurs pour le traitement de la dépression majeure\"\n{{elements_a_comparer}} : \"ISRS (fluoxétine), IRSN (venlafaxine), tricycliques (amitriptyline)\"\n{{criteres_comparaison}} : \"Mécanisme d'action, posologie, effets indésirables, contre-indications, surveillance\""
    },
    {
      "type": "markdown",
      "content": "## Versions Recommandées par Outil\n\n- **Version Standard** : Pour ChatGPT, Claude.ai, Gemini\n- **Version XML** : Optimale pour Claude.ai et DeepSeek\n- **Version AI Studio** : Spécialement conçue pour Google AI Studio et OpenAI Playground"
    }
  ]
};

// Validation et export
export const prompt: Prompt = promptSchema.parse(promptData);