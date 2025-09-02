// src/content/concepts-new/token-acide-amine.ts
import { Concept, conceptSchema } from '@/lib/content-schema';

const conceptData = {
  "slug": "token-acide-amine",
  "title": "Le Token : L'Acide Aminé de l'IA",
  "description": "Comprendre ce qu'est un token, l'unité de base que les modèles de langage utilisent pour lire, comprendre et générer du texte.",
  "icon": "Dna",
  "difficulty": "intermédiaire",
  "tags": [],
  "isFavorite": false,
  "keyTakeaways": [
    "Un token est l'unité de base du texte, comme un acide aminé pour une protéine",
    "100 tokens ≈ 75 mots français (ratio de conversion important à retenir)",
    "La fenêtre de contexte limite la 'mémoire de travail' du modèle",
    "Modèles 2025 : jusqu'à 1M tokens (plusieurs livres entiers)",
    "Optimiser l'usage des tokens améliore qualité et coût des requêtes"
  ],
  "conceptSlugs": [],
  "content": [
    {
      "type": "markdown",
      "content": "## Définition : Qu'est-ce qu'un Token ?\n\nDans le domaine des modèles de langage (LLMs), un **token** est l'unité de base du texte. C'est l'équivalent d'un acide aminé pour une protéine : un bloc fondamental que le modèle manipule.\n\nUn token n'est pas exactement un mot. Il peut être :\n- Un mot entier (\\`\"pharmacie\"\\`)\n- Un morceau de mot (\\`\"phar\"\\`, \\`\"ma\"\\`, \\`\"cie\"\\`)\n- Un signe de ponctuation (\\`\"?\"\\`)\n- Un espace ou un caractère spécial.\n\nEn moyenne, en français, **100 tokens représentent environ 75 mots**.\n\n\\`Cette phrase contient 7 mots, mais est probablement découpée en 9 ou 10 tokens par le modèle.\\`\n\n## La Fenêtre de Contexte : La \"Mémoire à Court Terme\" de l'IA\n\nChaque modèle d'IA possède une **fenêtre de contexte** (ou *context window*), qui est la quantité maximale de tokens qu'il peut prendre en compte à un instant T. C'est sa mémoire de travail.\n\nCette fenêtre inclut à la fois :\n1.  **Votre prompt** (les tokens que vous envoyez)\n2.  **La réponse de l'IA** (les tokens qu'elle génère)\n\nSi la conversation dépasse cette limite, l'IA commence à \"oublier\" les informations les plus anciennes.\n\n### Exemples de Tailles de Fenêtre de Contexte (Prévisions 2025)\n\nLa taille de la fenêtre de contexte a explosé, ce qui change radicalement ce qu'il est possible de faire :\n\n- **Modèles Standards (anciens) :** 4 000 à 8 000 tokens (environ 10-20 pages de texte).\n- **Modèles de Génération 2024 (Ex: GPT-4, Claude 2) :** 128 000 à 200 000 tokens (un livre entier).\n- **Modèles de Génération 2025 :**\n  - **GPT-5 :** 400 000 tokens.\n  - **Gemini 2.5 Pro :** **1 000 000 de tokens** (l'équivalent de plusieurs gros livres ou d'un petit projet de codebase).\n\n## Pourquoi est-ce Important pour la Pharmacie ?\n\n1.  **Analyse de Documents Longs :** Avec une fenêtre de 1M de tokens, vous pouvez soumettre un dossier patient complet, plusieurs études cliniques, ou l'intégralité d'un cours à l'IA et lui demander d'effectuer une analyse transversale sans qu'elle perde le fil.\n\n2.  **Coût d'Utilisation (API) :** Lorsque vous utilisez l'API (pour les développeurs), le coût est généralement calculé en fonction du nombre de tokens en entrée et en sortie. Optimiser la longueur de ses prompts peut donc avoir un impact financier.\n\n3.  **Qualité de la Réponse :** Un prompt bien formulé qui utilise efficacement les tokens disponibles (en étant concis et précis) obtiendra de meilleurs résultats qu'un prompt verbeux et mal structuré.\n\nComprendre la notion de token et de fenêtre de contexte est la première étape pour passer d'un simple utilisateur à un véritable \\`prompt engineer\\` capable de tirer le meilleur parti de ces outils puissants."
    }
  ]
};

// Validation et export
export const concept: Concept = conceptSchema.parse(conceptData);