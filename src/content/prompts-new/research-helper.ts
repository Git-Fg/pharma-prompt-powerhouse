// src/content/prompts-new/research-helper.ts
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
      "type": "markdown",
      "content": "## Notes d'Utilisation\n\nCe n'est pas un prompt unique, mais une **méthodologie de travail** pour **Perplexity.ai**. Cet outil est conçu pour la recherche et cite ses sources, ce qui est fondamental.\n\n### Le Workflow en 3 Étapes\n\n1.  **Choisir le Focus :** Avant de taper votre question, cliquez sur \"Focus\" et sélectionnez **\"Academic\"**. Cela limitera la recherche aux publications scientifiques.\n2.  **Question Initiale Large :** Commencez par une question générale pour défricher le sujet.\n3.  **Questions de Suivi Précises :** Utilisez les réponses et les sources de la première question pour affiner votre recherche.\n\n### Prompt 1 : Question Initiale\n\n> **Sujet :** \\`{{research_topic}}\\`\n\n> **Instructions :** Fournis une synthèse générale sur ce sujet, en te basant sur la littérature académique des 2 dernières années. Identifie les 3 sous-thèmes les plus importants.\n\n### Prompt 2 : Questions de Suivi\n\n> **Sujet :** \\`{{research_topic}}\\`\n>\n> **Questions spécifiques :**\n> \"\"\"\n> \\`{{specific_questions}}\\`\n> \"\"\"\n>\n> **Instructions :** Réponds à chaque question de manière séparée, en citant systématiquement les sources pour chaque information clé.\n\n**Exemple de questions spécifiques :**\n> - Quel est le mécanisme d'action précis ?\n> - Quelles sont les données d'efficacité clinique (critère principal) ?\n> - Quel est le profil de sécurité (effets indésirables >5%) ?"
    }
  ]
};

// Validation et export
export const prompt: Prompt = promptSchema.parse(promptData);