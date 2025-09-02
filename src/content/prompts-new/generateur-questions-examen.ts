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
      "type": "markdown",
      "content": "## Notes d'Utilisation\n\n**ChatGPT** avec son **\"Study Mode\"** est particulièrement adapté pour cette tâche, car il peut créer une expérience d'apprentissage interactive. Cependant, tous les outils sont capables de générer des questions de qualité. L'usage de balises est pertinent pour bien isoler le matériel de cours.\n\n### Adaptation pour ChatGPT (avec Study Mode)\n\n**Astuce :** Activez le \"Study Mode\" dans l'interface de ChatGPT avant d'envoyer ce prompt pour une expérience plus interactive.\n\n\\`\\`\\`markdown\n# Objectif : Préparation à l'examen\n\nAgis en tant que mon tuteur pour l'internat en pharmacie.\nVoici mon support de cours sur lequel je veux m'entraîner :\n\"\"\"\n\\`{{course_content}}\\`\n\"\"\"\n\nGénère \\`{{question_count}}\\` questions de type \"\\`{{question_types}}\\`\" (difficulté : \\`{{difficulty_level}}\\`).\nAprès chaque question que je réponds, donne-moi la correction et une explication détaillée.\n\\`\\`\\`"
    }
  ]
};

// Validation et export
export const prompt: Prompt = promptSchema.parse(promptData);