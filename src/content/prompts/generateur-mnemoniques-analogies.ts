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
      "type": "markdown",
      "content": "## Notes d'Utilisation\n\nCe prompt est disponible en plusieurs formats optimisés pour différents outils. Utilisez les onglets ci-dessus pour choisir la version qui convient le mieux à votre plateforme.\n\n<Alert>\n  <AlertDescription>\n    **🌡️ Température Recommandée :** Réglez entre \\`0.7\\` et \\`0.9\\` dans les paramètres pour obtenir des résultats vraiment originaux et créatifs. En dessous, les réponses seront trop convenues.\n  </AlertDescription>\n</Alert>\n\n## Pourquoi Plusieurs Formats ?\n\n<Card>\n  <CardHeader>\n    <CardTitle>🎯 Optimisation par Outil</CardTitle>\n  </CardHeader>\n  <CardContent className=\"space-y-3\">\n    <div className=\"flex items-start space-x-2\">\n      <Badge variant=\"outline\">Standard</Badge>\n      <p className=\"text-sm\">Parfait pour les interfaces de chat simples (ChatGPT, Claude, Gemini)</p>\n    </div>\n    <div className=\"flex items-start space-x-2\">\n      <Badge variant=\"outline\">XML</Badge>\n      <p className=\"text-sm\">Optimisé pour Claude qui excelle avec les balises structurées</p>\n    </div>\n    <div className=\"flex items-start space-x-2\">\n      <Badge variant=\"outline\">AI Studio</Badge>\n      <p className=\"text-sm\">Sépare System/User pour un contrôle granulaire des paramètres</p>\n    </div>\n  </CardContent>\n</Card>"
    }
  ]
};

// Validation et export
export const prompt: Prompt = promptSchema.parse(promptData);