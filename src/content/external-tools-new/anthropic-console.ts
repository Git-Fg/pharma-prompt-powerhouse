// src/content/external-tools-new/anthropic-console.ts
import { ExternalTool, externalToolSchema } from '@/lib/content-schema';

const externalToolData = {
  "slug": "anthropic-console",
  "title": "Anthropic Console : Le Laboratoire des Modèles Claude",
  "description": "Explorez la Console Anthropic, une interface avancée pour tester et maîtriser les puissants modèles Claude sans écrire de code.",
  "difficulty": "intermédiaire",
  "tags": [],
  "isFavorite": false,
  "keyTakeaways": [],
  "conceptSlugs": [],
  "url": "https://console.anthropic.com/",
  "category": "environnement-developpement",
  "capabilities": [],
  "use_cases": [
    "Tests de prompts avancés",
    "Analyse de paramètres",
    "Expérimentation fine"
  ],
  "color": "bg-amber-500",
  "tldr": "Interface avancée pour tester finement les modèles Claude. Contrôle précis des paramètres, parfait pour l'expérimentation poussée de prompts.",
  "content": [
    {
      "type": "markdown",
      "content": "## Qu'est-ce que l'Anthropic Console ?\n\nL'Anthropic Console est l'équivalent du \"Playground\" ou du \"Studio\" pour les modèles d'intelligence artificielle d'Anthropic, notamment la famille **Claude**. C'est une interface web conçue pour permettre aux utilisateurs, même sans compétences techniques, d'expérimenter, d'évaluer et d'optimiser des prompts en contrôlant finement le comportement des modèles.\n\nC'est l'outil idéal pour aller plus loin que l'interface de chat simple de \\`claude.ai\\` et comprendre comment fonctionnent réellement ces IAs.\n\n## Les Modèles Disponibles (Prévisions 2025)\n\nLa console donne accès à la gamme complète des modèles Claude, chacun ayant ses propres forces :\n\n- **Claude Opus 4.1 (Août 2025) :** Le modèle le plus puissant, conçu pour les tâches complexes, l'analyse approfondie et le raisonnement avancé. C'est le choix privilégié pour des cas d'usage exigeants comme la recherche ou l'analyse de codebases.\n- **Claude Sonnet 4 (Mai 2025) :** L'équilibre parfait entre performance et coût. Excellent pour la génération de contenu, les agents conversationnels et l'analyse de données volumineuses, avec une tendance très faible à l'hallucination.\n- **Claude Haiku 4 (Mai 2025) :** Le plus rapide et le plus économique, parfait pour des réponses quasi instantanées et des applications nécessitant un traitement à haut volume.\n\nTous ces modèles partagent une fenêtre de contexte impressionnante de **200 000 tokens** (environ 150 000 mots), permettant d'analyser des documents très longs.\n\n## Fonctionnalités Clés de la Console (pour les non-développeurs)\n\nLa Console Anthropic est un véritable laboratoire, offrant des outils qui étaient auparavant réservés aux développeurs :\n\n- **Modes d'Interaction :**\n  - **Messages :** Un mode conversationnel structuré où vous pouvez définir un \\`System Prompt\\` pour guider l'IA en continu.\n  - **Completions :** Un mode plus simple, idéal pour les tâches de complétion de texte directes.\n\n- **Paramètres de Contrôle :**\n  - **Temperature :** Ajustez la créativité du modèle. Une valeur proche de 0 le rend plus déterministe et factuel ; une valeur proche de 1 le rend plus imaginatif.\n  - **Top P / Top K :** Des méthodes alternatives pour contrôler la créativité en limitant le choix des mots possibles.\n  - **Max tokens :** Définissez la longueur maximale de la réponse.\n\n- **Outils d'Optimisation :**\n  - **Evaluate :** Testez rigoureusement vos prompts sur différents scénarios pour évaluer leur performance.\n  - **Workbench :** Un environnement de travail intégré pour organiser et sauvegarder vos expériences.\n  - **Générateur de Prompts :** Un assistant qui vous aide à créer des prompts détaillés et efficaces à partir d'une simple instruction.\n\n## Distinctions entre \\`claude.ai\\` et la Console\n\n| Feature | Claude.ai (Chat) | Anthropic Console (Studio) |\n| --- | --- | --- |\n| **Public Cible** | Utilisateurs grand public | Utilisateurs avancés, explorateurs |\n| **Contrôle** | Limité (style de conversation) | Granulaire (température, \\`system prompt\\`...) |\n| **Objectif** | Obtenir des réponses rapides | Tester, évaluer et optimiser des prompts |\n| **Accès aux Modèles** | Modèle par défaut (souvent Sonnet) | Accès à toute la gamme (Opus, Sonnet, Haiku) |\n| **Fonctionnalités** | Conversation, upload de fichiers | Outils de test, \\`prompt engineering\\` |\n| **Coût (API)** | Ne s'applique pas directement | Offre des crédits gratuits pour commencer |\n\n## Conclusion\n\nPour un étudiant en pharmacie, l'**Anthropic Console** est un outil inestimable. Elle permet de dépasser la simple conversation et de se transformer en un véritable \"ingénieur de prompts\". C'est ici que vous pouvez tester comment de légères variations dans un prompt ou un changement de \\`température\\` peuvent radicalement altérer la qualité d'une analyse de cas clinique ou d'une recherche de littérature, le tout sans écrire une seule ligne de code."
    }
  ]
};

// Validation et export
export const externalTool: ExternalTool = externalToolSchema.parse(externalToolData);