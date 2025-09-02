// src/content/external-tools-new/chatgpt.ts
import { ExternalTool, externalToolSchema } from '@/lib/content-schema';

const externalToolData = {
  "slug": "chatgpt",
  "title": "ChatGPT : L'Interface Conversationnelle d'OpenAI",
  "description": "Explorez ChatGPT, l'interface de chat qui a démocratisé l'IA, et découvrez ses fonctionnalités pour les étudiants en pharmacie.",
  "tags": [],
  "isFavorite": false,
  "keyTakeaways": [],
  "conceptSlugs": [],
  "url": "https://chatgpt.com/",
  "category": "outils",
  "capabilities": [],
  "use_cases": [
    "Conversations quotidiennes",
    "Aide aux devoirs",
    "Rédaction simplifiée"
  ],
  "color": "bg-emerald-500",
  "tldr": "L'IA accessible à tous : interface conversationnelle intuitive d'OpenAI, parfaite pour débuter avec l'IA. Idéale pour assistance quotidienne et rédaction.",
  "content": [
    {
      "type": "markdown",
      "content": "## Qu'est-ce que ChatGPT ?\n\nChatGPT est l'interface de conversation (chatbot) développée par OpenAI. C'est l'outil qui a rendu l'intelligence artificielle accessible à des millions de personnes à travers le monde. Conçu pour être intuitif et facile à utiliser, il permet de poser des questions, de générer du texte, de traduire, de résumer et bien plus encore, en s'appuyant sur les puissants modèles de langage d'OpenAI.\n\nPour les étudiants, c'est souvent le premier contact avec l'IA et un excellent point de départ pour des tâches quotidiennes.\n\n## Les Modèles derrière l'Interface (Prévisions 2025)\n\nChatGPT donne accès à différents modèles en fonction de l'abonnement :\n\n**Accès Gratuit :**\n- **GPT-4o mini :** Une version plus rapide et plus légère de GPT-4o, déjà très performante pour la plupart des tâches.\n- **GPT-5 (limité) :** Un accès restreint au modèle le plus avancé, permettant de tester ses capacités de raisonnement supérieures.\n\n**Accès Payant (ChatGPT Plus, ~20€/mois) :**\n- **GPT-5 (étendu) :** Un accès beaucoup plus large au modèle phare d'OpenAI, avec sa fenêtre de contexte massive de **400K tokens** et ses performances de pointe.\n- **GPT-4.1 / GPT-4o :** Accès complet aux modèles précédents, qui restent des références."
    },
    {
      "type": "card",
      "title": "📊 Fonctionnalités par Abonnement",
      "content": "| Fonctionnalité | Version Gratuite | Version Payante (Plus) |\n| :--- | :--- | :--- |\n| **Analyse de PDF** | Limitée (avec GPT-4o mini) | **Avancée** (avec GPT-5), incluant OCR et analyse de tableaux complexes. |\n| **Deep Research** | Version \"lite\" (5 usages/mois) | **Illimitée**, avec export des rapports en PDF. |\n| **Live (Voix)** | Voix standard | Voix avancées et naturelles, streaming en temps réel. |\n| **Plugins & GPTs** | Non disponible | Accès à une boutique d'applications (GPTs) et de plugins pour étendre les capacités. |\n| **Génération d'Images**| Non disponible | Intégrée nativement avec DALL-E. |"
    },
    {
      "type": "markdown",
      "content": "## Quand Utiliser ChatGPT ?\n\nChatGPT est idéal pour :\n- **Obtenir des réponses rapides** sur des sujets variés.\n- **Brainstormer** des idées pour un exposé ou un mémoire.\n- **Rédiger** des ébauches de textes, des emails ou des résumés.\n- **Traduire** des articles ou des documents.\n- **Utiliser des outils spécialisés** (GPTs) pour des tâches précises (analyse de données, création de diagrammes, etc.) avec un abonnement payant.\n\n## ChatGPT vs. OpenAI Playground"
    },
    {
      "type": "alert",
      "variant": "default",
      "title": "Distinction importante",
      "content": "**ChatGPT** est un **produit fini**, une application. Vous l'utilisez pour accomplir des tâches.\n\n**OpenAI Playground** est un **laboratoire**, un outil d'expérimentation. Vous l'utilisez pour comprendre le fonctionnement des modèles et construire des prompts sur mesure.\n\nPour un étudiant, la maîtrise commence sur ChatGPT, mais l'expertise en prompt engineering se développe dans le Playground."
    },
    {
      "type": "guideRecommendation",
      "slug": "les-5-piliers-dun-prompt-pharmaceutique-efficace",
      "reason": "ChatGPT est l'outil parfait pour apprendre et appliquer la méthode des 5 piliers. Sa simplicité vous permet de vous concentrer sur la structure de vos prompts."
    },
    {
      "type": "guideRecommendation",
      "slug": "optimisation-de-prompts-la-methode-iterative",
      "reason": "La mémoire conversationnelle de ChatGPT en fait l'outil idéal pour l'optimisation itérative de vos prompts."
    },
    {
      "type": "conceptRecommendation",
      "slug": "chaîne-de-prompts",
      "reason": "Apprenez à créer des workflows structurés que vous pourrez ensuite appliquer naturellement dans les conversations ChatGPT."
    }
  ]
};

// Validation et export
export const externalTool: ExternalTool = externalToolSchema.parse(externalToolData);