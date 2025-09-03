// src/content/concepts/structuration-par-balises.ts
import type { Concept } from '@/lib/content-schema';

export const concept = {
  "slug": "structuration-par-balises",
  "title": "Structuration par Balises",
  "description": "Utilisez des balises pour structurer vos prompts, clarifier vos intentions et obtenir des réponses plus fiables de l'IA.",
  "icon": "CodeXml",
  "category": "techniques-avancees",
  "difficulty": "intermédiaire",
  "tags": [
    "exemple-code",
    "guide",
    "pedagogie",
    "pharmacie",
    "xml-prompting"
  ],
  "isFavorite": false,
  "keyTakeaways": [
    "Utiliser des balises comme `<contexte>` ou `<question>` aide l'IA à mieux comprendre la structure de votre demande.",
    "Cette technique ne sert pas à obtenir du code en sortie, mais à organiser votre prompt d'entrée pour plus de clarté.",
    "Particulièrement recommandée par Anthropic (Claude), cette méthode améliore la fiabilité sur toutes les plateformes pour les prompts complexes."
  ],
  "conceptSlugs": [],
  "mainGuideSlug": "structurer-ses-prompts-avec-des-balises-methode-xml",
  "content": [
    {
      "type": "markdown",
      "content": "La **structuration par balises** est une méthode de *prompt engineering* qui consiste à utiliser des balises (similaires au HTML/XML) pour délimiter clairement les différentes parties d'un prompt : le contexte, les instructions, les exemples, etc."
    },
    {
      "type": "markdown",
      "content": "## Pourquoi utiliser cette technique ?\n\nCette approche structurée transforme un bloc de texte en une instruction de travail claire et sans ambiguïté pour l'IA.\n\n-   **Clarté Maximale :** L'IA sait exactement quelle partie est le contexte et quelle partie est la question.\n-   **Réduction des Hallucinations :** En délimitant clairement la source d'information, vous réduisez le risque que l'IA invente des faits.\n-   **Fiabilité Accrue :** Les modèles comme Claude sont spécifiquement entraînés à reconnaître et respecter cette structure."
    },
    {
      "type": "markdown",
      "content": "## Structure de Base\n\nUn prompt bien structuré avec des balises pourrait ressembler à ça :"
    },
    {
      "type": "codeBlock",
      "language": "xml",
      "content": "<role>\nTu es un pharmacien clinicien expert.\n</role>\n\n<contexte>\n <!-- Les informations de base du cas clinique ou du document vont ici -->\n</contexte>\n\n<instructions>\n  <!-- Ce que vous voulez que l'IA fasse, étape par étape -->\n</instructions>\n\n<format_attendu>\n  <!-- La structure de la réponse que vous souhaitez (ex: tableau Markdown, liste à puces) -->\n</format_attendu>"
    },
    {
      "type": "markdown",
      "content": "Cette méthode simple mais puissante est une des clés pour passer de prompts amateurs à des résultats de qualité professionnelle."
    },
    {
      "type": "guideRecommendation",
      "slug": "structurer-ses-prompts-avec-des-balises-methode-xml",
      "reason": "Mettez immédiatement en pratique la structuration par balises avec ce guide complet qui vous montre comment l'appliquer concrètement à vos cas cliniques."
    }
  ]
} satisfies Concept;