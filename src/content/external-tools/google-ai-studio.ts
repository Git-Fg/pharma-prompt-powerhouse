// src/content/external-tools-new/google-ai-studio.ts
import { ExternalTool, externalToolSchema } from '@/lib/content-schema';

const externalToolData = {
  "slug": "google-ai-studio",
  "title": "Google AI Studio : L'Accès Gratuit aux Modèles Gemini de Pointe",
  "description": "Découvrez Google AI Studio, la plateforme qui démocratise l'accès aux modèles Gemini 2.5 Pro et Flash sans nécessiter de carte de crédit.",
  "difficulty": "intermédiaire",
  "tags": [],
  "isFavorite": false,
  "keyTakeaways": [],
  "conceptSlugs": [],
  "url": "https://aistudio.google.com/",
  "category": "environnement-developpement",
  "capabilities": [],
  "use_cases": [
    "Analyse clinique précise",
    "Test de prompts avancés",
    "Raisonnement multi-étapes"
  ],
  "color": "bg-blue-500",
  "tldr": "Accès gratuit aux modèles Gemini 2.5 de Google. Interface pro sans carte de crédit, excellent pour analyse clinique précise et raisonnement complexe.",
  "content": [
    {
      "type": "markdown",
      "content": "# Google AI Studio : L'Accès Gratuit aux Modèles Gemini de Pointe\n\n<Alert>\n  <AlertDescription>\n    **🎯 Avantage Concurrentiel Majeur :** Accès gratuit aux modèles Gemini 2.5 Pro les plus récents avec une fenêtre de contexte de 1 million de tokens, sans carte de crédit requise. C'est la meilleure porte d'entrée vers la puissance de l'IA Google.\n  </AlertDescription>\n</Alert>\n\n## Qu'est-ce que Google AI Studio ?\n\nGoogle AI Studio est une interface web conçue pour les développeurs et les curieux, permettant d'explorer, de prototyper et d'utiliser les modèles d'intelligence artificielle les plus avancés de Google. Pour un étudiant non-développeur, c'est **la meilleure porte d'entrée vers la puissance des modèles Gemini**, car elle offre un accès gratuit et généreux sans demander de carte de crédit.\n\nC'est un véritable \"studio\" où l'on peut manipuler les paramètres de l'IA et voir immédiatement leur effet, bien au-delà de ce que permet l'interface de chat \\`gemini.google.com\\`.\n\n## Le Joyau : Un Accès Gratuit aux Meilleurs Modèles (Prévisions 2025)\n\nL'avantage majeur de Google AI Studio est son **quota gratuit extrêmement généreux** qui donne accès aux modèles les plus récents :\n\n- **Gemini 2.5 Pro (Juin 2025) :** Le modèle multimodal le plus puissant de Google, capable de traiter texte, images, audio, vidéo et de très longs documents grâce à sa fenêtre de contexte de **1 million de tokens**.\n- **Gemini 2.5 Flash (Juin 2025) :** Une version optimisée pour la vitesse et l'efficacité, tout en conservant la même fenêtre de contexte massive. Idéal pour des réponses rapides et des applications interactives.\n- **Imagen 4 (Août 2025) :** La nouvelle génération de modèles de génération d'images de Google.\n\nL'accès gratuit est de **60 requêtes par minute**, ce qui est largement suffisant pour un usage étudiant intensif, le tout sans jamais avoir à fournir d'informations de paiement.\n\n## Fonctionnalités Clés pour l'Ingénierie de Prompts\n\nGoogle AI Studio est un terrain de jeu parfait pour l'apprentissage du \\`prompt engineering\\` :\n\n- **Choix du Modèle :** Sélectionnez facilement entre Gemini Pro et Flash pour comparer leurs réponses.\n- **Paramètres Avancés :**\n  - **Temperature :** Contrôlez le degré de créativité ou de prévisibilité des réponses.\n  - **Top K / Top P :** Affinez davantage la sélection des mots du modèle.\n\n- **Modes d'Interaction :**\n  - **Chat :** Pour une conversation structurée avec un historique.\n  - **Completion :** Pour des tâches de complétion de texte plus directes.\n\n- **Fonctionnalités Uniques :**\n  - **Structured Outputs :** Forcez l'IA à répondre dans un format spécifique (JSON), une technique avancée de fiabilisation.\n  - **Function Calling :** Permet à l'IA de simuler l'utilisation d'outils externes.\n  - **URL Context :** Donnez une URL à l'IA pour qu'elle base sa réponse sur son contenu.\n\n## Gemini (Chat) vs. Google AI Studio\n\n| Feature | Gemini (gemini.google.com) | Google AI Studio (aistudio.google.com) |\n| :--- | :--- | :--- |\n| **Modèle Gratuit** | Gemini 2.5 Flash (contexte de 32K) | **Gemini 2.5 Pro** (contexte de 1M) |\n| **Public Cible** | Grand public | Étudiants, développeurs, curieux |\n| **Contrôle** | Minimal | **Granulaire** (Température, Top K...) |\n| **Objectif** | Assistant conversationnel | Laboratoire d'expérimentation et de prototypage |\n| **Accès** | Simple et direct | Nécessite un compte Google, mais **sans CB** |\n\n## Conclusion : L'Outil Privilégié pour les Étudiants\n\nPour un étudiant en pharmacie qui souhaite explorer sérieusement le \\`prompt engineering\\` sans contraintes financières, **Google AI Studio est l'outil par excellence**. Il offre un accès sans précédent au modèle le plus puissant de Google (Gemini 2.5 Pro) avec sa gigantesque fenêtre de contexte, le tout gratuitement.\n\nC'est l'endroit idéal pour tester des prompts sur de très longs documents de recherche, des cours entiers, ou pour apprendre à structurer les sorties de l'IA de manière fiable. Une ressource inestimable pour développer des compétences de pointe."
    }
  ]
};

// Validation et export
export const externalTool: ExternalTool = externalToolSchema.parse(externalToolData);