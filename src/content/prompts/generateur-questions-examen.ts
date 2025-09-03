import { Prompt, promptSchema } from '@/lib/content-schema';

const promptData = {
  "slug": "generateur-questions-examen",
  "title": "Générateur de Questions d'Examen",
  "description": "Un prompt pour générer des questions d'examen (QCM, questions ouvertes) basées sur un contenu de cours.",
  "icon": "HelpCircle",
  "category": "enseignement",
  "difficulty": "intermédiaire",
  "tags": [
    "enseignement",
    "examen",
    "génération-contenu",
    "pharmacie",
    "prompting",
    "qcm",
    "template",
    "variables"
  ],
  "isFavorite": false,
  "keyTakeaways": [],
  "conceptSlugs": [],
  "variables": [
    "contenu_cours",
    "type_questions",
    "nombre_questions"
  ],
 "promptContent": "Tu es un expert en pédagogie pour des étudiants en pharmacie.\n\n<contenu_cours>\n{{contenu_cours}}\n</contenu_cours>\n\n<type_questions>\n{{type_questions}}\n</type_questions>\n\n<nombre_questions>\n{{nombre_questions}}\n</nombre_questions>\n\n<thinking_process>\n1. **Analyse du Contenu** : Identifie les concepts clés et les faits importants du cours.\n2. **Génération de Questions** : Crée des questions adaptées au type demandé (QCM, ouvertes).\n3. **Validation Pédagogique** : Assure-toi que les questions testent la compréhension, pas seulement la mémoire.\n</thinking_process>\n\n<format_sortie>\n- Fournis les questions numérotées.\n- Pour les QCM, inclue 4 options avec la bonne réponse en premier.\n- Pour les questions ouvertes, propose un exemple de réponse modèle.\n</format_sortie>",
  "systemPromptContent": "Tu es un expert en pédagogie pour des étudiants en pharmacie. Ta spécialité est de créer des questions d'examen (QCM, questions ouvertes) qui testent la compréhension et l'application des connaissances, basées sur un contenu de cours fourni.\n",
  "alternativeVersions": {
    "standard": "Tu es un expert en pédagogie pour des étudiants en pharmacie.\n\nGénère des questions d'examen basées sur le contenu de cours suivant.\n\n**Contenu du Cours :**\n{{contenu_cours}}\n\n**Type de Questions Souhaité :**\n{{type_questions}}\n\n**Nombre de Questions :**\n{{nombre_questions}}\n\nProcède ainsi :\n1. **Analyse du Contenu** : Identifie les concepts clés.\n2. **Génération de Questions** : Crée des questions adaptées.\n3. **Validation Pédagogique** : Assure-toi qu'elles testent la compréhension.\n\nFournis les questions numérotées. Pour les QCM, inclue 4 options avec la bonne réponse en premier. Pour les questions ouvertes, propose un exemple de réponse modèle.",
    "xml": "Tu es un expert en pédagogie pour des étudiants en pharmacie.\n\n<contenu_cours>\n{{contenu_cours}}\n</contenu_cours>\n\n<type_questions>\n{{type_questions}}\n</type_questions>\n\n<nombre_questions>\n{{nombre_questions}}\n</nombre_questions>\n\n<thinking_process>\n1. **Analyse du Contenu** : Identifie les concepts clés et les faits importants du cours.\n2. **Génération de Questions** : Crée des questions adaptées au type demandé (QCM, ouvertes).\n3. **Validation Pédagogique** : Assure-toi que les questions testent la compréhension, pas seulement la mémoire.\n</thinking_process>\n\n<format_sortie>\n- Fournis les questions numérotées.\n- Pour les QCM, inclue 4 options avec la bonne réponse en premier.\n- Pour les questions ouvertes, propose un exemple de réponse modèle.\n</format_sortie>",
    "aiStudio": {
      "systemPrompt": "Tu es un expert en pédagogie pour des étudiants en pharmacie. Ta spécialité est de créer des questions d'examen (QCM, questions ouvertes) qui testent la compréhension et l'application des connaissances, basées sur un contenu de cours fourni.\n",
      "userPrompt": "Génère des questions d'examen basées sur le contenu de cours suivant.\n\n**Contenu du Cours :**\n{{contenu_cours}}\n\n**Type de Questions Souhaité :**\n{{type_questions}}\n\n**Nombre de Questions :**\n{{nombre_questions}}\n\nProcède ainsi :\n1. **Analyse du Contenu** : Identifie les concepts clés.\n2. **Génération de Questions** : Crée des questions adaptées.\n3. **Validation Pédagogique** : Assure-toi qu'elles testent la compréhension.\n\nFournis les questions numérotées. Pour les QCM, inclue 4 options avec la bonne réponse en premier. Pour les questions ouvertes, propose un exemple de réponse modèle."
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
      "Qwen Chat"
    ]
  },
  "content": [
    {
      "type": "markdown",
      "content": "## Création d'Examens avec IA\n\nCe prompt guide un LLM dans la création de questions d'examen pédagogiques (QCM, ouvertes) à partir d'un contenu de cours, en se concentrant sur la compréhension plutôt que la mémoire."
    },
    {
      "type": "card",
      "title": "Variables à Personnaliser",
      "content": "- **{{contenu_cours}}** : Le texte du cours sur lequel baser les questions\n- **{{type_questions}}** : 'QCM' ou 'questions ouvertes'\n- **{{nombre_questions}}** : Le nombre de questions à générer"
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
              "title": "Exemple : Questions sur les Antihypertenseurs",
              "content": "**Contenu du Cours :**\nLes antihypertenseurs sont classés en plusieurs classes : diurétiques, bêta-bloquants, IEC, ARA, CCB. Chaque classe a un mécanisme d'action spécifique.\n\n**Type de Questions Souhaité :**\nQCM\n**Nombre de Questions :**\n3"
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
              "content": "Optimisé pour Claude qui excelle avec les balises structurées `<contenu_cours>`, `<type_questions>`."
            },
            {
              "type": "card",
              "title": "Version AI Studio",
              "variant": "outline",
              "content": "Sépare System/User pour un contrôle granulaire des paramètres de créativité. Idéal pour Qwen Chat."
            }
          ]
        }
      ]
    },
    {
      "type": "alert",
      "variant": "default",
      "title": "⚠️ Validation Humaine",
      "content": "Toujours valider les questions générées par un enseignant humain pour en garantir l'exactitude scientifique et la pertinence pédagogique."
    },
    {
      "type": "guideRecommendation",
      "slug": "creation-evaluations",
      "reason": "Découvrez les bonnes pratiques pour créer des évaluations efficaces en pharmacie."
    }
  ]
};

// Validation et export
export const prompt: Prompt = promptSchema.parse(promptData);