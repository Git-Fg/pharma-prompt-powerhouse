// src/content/external-tools-new/perplexity-ai.ts
import { ExternalTool, externalToolSchema } from '@/lib/content-schema';

const externalToolData = {
  "slug": "perplexity-ai",
  "title": "Perplexity AI : Le Moteur de Réponse pour la Recherche Fiable",
  "description": "Découvrez Perplexity AI, l'outil qui combine la puissance des LLMs avec la recherche web en temps réel pour fournir des réponses sourcées et précises.",
  "difficulty": "débutant",
  "tags": [],
  "isFavorite": false,
  "keyTakeaways": [],
  "conceptSlugs": [],
  "url": "https://www.perplexity.ai/",
  "category": "moteur-de-recherche",
  "capabilities": [],
  "use_cases": [
    "Recherche bibliographique",
    "Vérification de faits",
    "Veille scientifique"
  ],
  "color": "bg-green-500",
  "tldr": "Moteur de recherche IA avec sources citées en temps réel. Parfait pour recherche bibliographique fiable et veille scientifique actualisée.",
  "content": [
    {
      "type": "markdown",
      "content": "## Qu'est-ce que Perplexity AI ?\n\nPerplexity AI n'est pas un chatbot traditionnel. C'est un **moteur de réponse** (Answer Engine). Sa mission principale est de répondre à des questions de manière précise et fiable en se basant sur des informations fraîches provenant d'Internet. Pour chaque réponse, Perplexity cite ses sources, ce qui vous permet de vérifier l'information et d'approfondir le sujet.\n\nIl utilise une technologie de **RAG (Retrieval-Augmented Generation)**, ce qui signifie qu'il ne se contente pas de \"savoir\" des choses, il va activement \"chercher\" l'information la plus à jour avant de vous répondre. C'est un atout majeur dans un domaine comme la santé où les connaissances évoluent constamment.\n\n## Les Modèles derrière Perplexity\n\nPerplexity s'appuie sur une combinaison de modèles internes et externes :\n\n- **Modèle Maison : Sonar (2024)**\n  - Un modèle propriétaire basé sur Llama 3.3, spécifiquement entraîné pour la recherche et la synthèse en temps réel. Il est extrêmement rapide (jusqu'à 1200 tokens/seconde) et efficace.\n  - **Sonar Pro :** Une version plus puissante disponible pour les abonnés.\n\n- **Modèles Externes (Abonnement Pro) :**\n  - Perplexity Pro vous donne la flexibilité de choisir parmi les meilleurs modèles du marché pour traiter votre requête, notamment :\n    - **GPT-5**\n    - **Gemini 2.5 Pro**\n    - **Claude 3**\n\n## Fonctionnalités Clés\n\n| Fonctionnalité | Version Gratuite | Version Pro ($20/mois) |\n| :--- | :--- | :--- |\n| **Recherches Pro** | 5 par jour | 300+ par jour |\n| **Modèle par défaut** | Sonar (rapide) | Sonar Pro, et accès à GPT-5, Gemini 2.5 Pro, etc. |\n| **Traitement de fichiers** | Limité (extraits) | **Illimité** (PDF, images, CSV, etc.) |\n| **Deep Research** | Non disponible | **Oui**, pour des rapports de recherche complets et autonomes. |\n| **Génération d'images**| Non disponible | Oui, intégrée à l'interface. |\n\n## Le \"Focus\" : La Recherche Ciblée\n\nUne des fonctionnalités les plus puissantes de Perplexity est le \"Focus\". Elle vous permet de restreindre la recherche à des domaines spécifiques pour obtenir des résultats plus pertinents :\n\n- **Academic :** Pour ne chercher que dans les publications scientifiques et les journaux académiques.\n- **Wolfram|Alpha :** Pour les calculs et les données structurées.\n- **YouTube :** Pour trouver des informations dans des vidéos.\n- **Reddit :** Pour sonder les discussions et les avis communautaires.\n\nPour un étudiant en pharmacie, la recherche **Academic** est un outil d'une valeur inestimable.\n\n## Cas d'Usage en Pharmacie\n\n- **Question de Pharmacovigilance :** \"Quels sont les derniers signalements sur les effets secondaires de la molécule X selon les articles publiés en 2024 ?\" (Focus: Academic)\n- **Recherche de Protocole :** \"Existe-t-il des protocoles de traitement standard pour la maladie Y chez les patients pédiatriques ?\"\n- **Analyse d'un Article :** Uploadez un PDF et demandez : \"Résume les points clés de cette étude et compare ses conclusions avec les 3 articles les plus récents sur le même sujet.\"\n- **Veille Scientifique :** \"Quelles sont les nouvelles thérapies géniques en phase 3 d'essais cliniques pour la mucoviscidose ?\"\n\n## Conclusion\n\nPerplexity AI est l'outil de choix pour la **recherche d'informations fiables et sourcées**. Alors qu'un chatbot comme ChatGPT peut parfois \"halluciner\" ou se baser sur des données datées, Perplexity met la priorité sur la véracité et la fraîcheur de l'information. Son abonnement Pro, avec la fonction **Deep Research** et l'accès aux meilleurs modèles, en fait un assistant de recherche extrêmement puissant, capable de générer des synthèses de littérature quasi automatiquement."
    }
  ]
};

// Validation et export
export const externalTool: ExternalTool = externalToolSchema.parse(externalToolData);