// src/content/external-tools-new/openai-playground.ts
import { ExternalTool, externalToolSchema } from '@/lib/content-schema';

const externalToolData = {
  "slug": "openai-playground",
  "title": "OpenAI Playground : Le Studio du Prompt Engineer",
  "description": "Maîtrisez l'art du prompt engineering avec l'OpenAI Playground, l'interface avancée pour contrôler et tester les modèles GPT sans coder.",
  "difficulty": "intermédiaire",
  "tags": [],
  "isFavorite": false,
  "keyTakeaways": [],
  "conceptSlugs": [],
  "url": "https://platform.openai.com/playground",
  "category": "environnement-developpement",
  "capabilities": [],
  "use_cases": [
    "Ingénierie de prompts",
    "Tests de température",
    "Prototypage rapide"
  ],
  "color": "bg-cyan-500",
  "tldr": "Studio pro d'OpenAI pour l'ingénierie de prompts. Contrôle fin des paramètres GPT, indispensable pour prototypage et tests avancés.",
  "content": [
    {
      "type": "markdown",
      "content": "## Qu'est-ce que l'OpenAI Playground ?\n\nL'OpenAI Playground est une interface web avancée qui donne un accès direct et granulaire aux modèles de langage d'OpenAI. Contrairement à ChatGPT, qui est une application de chat optimisée, le Playground est un **laboratoire d'expérimentation**. C'est l'endroit où les \\`prompt engineers\\`, les développeurs (et les non-développeurs curieux !) viennent pour tester, affiner et comprendre le comportement des modèles d'IA.\n\nC'est ici que vous pouvez véritablement \"regarder sous le capot\" et apprendre à piloter l'IA avec précision.\n\n## Les Outils du Laboratoire (Prévisions 2025)\n\nLe Playground met à votre disposition une panoplie de modèles et de paramètres :\n\n- **Accès à tous les Modèles :**\n  - **GPT-5 (et ses variantes mini/nano) :** Testez la puissance brute du modèle le plus avancé d'OpenAI.\n  - **GPT-4.1 (et ses variantes) :** Explorez les modèles conçus pour des cas d'usage plus spécifiques.\n  - **GPT-4o, GPT-3.5-Turbo :** Comparez les performances avec les générations précédentes.\n\n- **Paramètres de Contrôle Fondamentaux :**\n  - **Temperature :** Le thermostat de la créativité. Proche de 0 pour des réponses factuelles et prévisibles, proche de 1 pour plus d'imagination.\n  - **Max Length :** Définissez la taille maximale de la réponse générée.\n  - **Top P :** Une autre méthode pour contrôler la créativité en ne considérant qu'un sous-ensemble de mots probables.\n\n- **Modes d'Interaction :**\n  - **Chat Mode :** Simule une conversation, idéal pour tester des \\`System Prompts\\` et voir comment l'IA maintient le contexte.\n  - **Completion Mode :** Un mode plus simple où l'IA complète directement le texte que vous avez commencé.\n\n- **Fonctionnalités Avancées :**\n  - **Support Multimodal :** Testez la capacité des modèles à traiter du texte, des images et de l'audio.\n  - **Agent :** Explorez comment les modèles peuvent exécuter des tâches complexes en utilisant plusieurs outils.\n\n## Pourquoi Utiliser le Playground en tant qu'Étudiant ?\n\nAlors que ChatGPT est parfait pour les tâches quotidiennes, le Playground est essentiel pour développer une expertise plus profonde :\n\n1.  **Comprendre la \"Température\" :** C'est le meilleur endroit pour voir concrètement comment un changement de \\`0.1\\` à \\`0.8\\` en température transforme une réponse factuelle en une réponse créative.\n2.  **Maîtriser le \\`System Prompt\\` :** En mode Chat, vous pouvez définir une instruction système (la \"constitution\" de l'IA) et observer comment elle influence chaque réponse.\n3.  **Comparer les Modèles :** Pour un même prompt, vous pouvez facilement changer de modèle (ex: GPT-4.1 vs GPT-5) et analyser les différences de coût, de vitesse et de qualité de réponse.\n4.  **Préparer des Prompts pour l'Automatisation :** Si vous souhaitez un jour utiliser l'API, les prompts que vous perfectionnez dans le Playground sont directement réutilisables.\n\n## Accès et Tarifs\n\nL'un des points importants à noter est qu'il n'existe **pas de quota gratuit significatif** pour le Playground sans enregistrer une carte de crédit. L'utilisation est directement liée à votre consommation de tokens via l'API, même si vous n'écrivez pas de code. C'est pourquoi, pour une exploration totalement gratuite, des outils comme **Google AI Studio** sont souvent plus accessibles pour les débutants.\n\n## Conclusion\n\nL'OpenAI Playground est un passage obligé pour quiconque souhaite sérieusement se former au \\`prompt engineering\\`. C'est un environnement contrôlé qui vous donne les commandes de l'IA. Pour un étudiant en pharmacie, c'est l'occasion de créer des prompts ultra-spécifiques pour des cas cliniques, l'analyse de données ou la pharmacovigilance, et de comprendre précisément comment obtenir les meilleurs résultats possibles des modèles GPT."
    }
  ]
};

// Validation et export
export const externalTool: ExternalTool = externalToolSchema.parse(externalToolData);