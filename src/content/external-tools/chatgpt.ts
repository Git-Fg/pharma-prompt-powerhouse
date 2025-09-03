// src/content/external-tools-new/chatgpt.ts
import type { ExternalTool } from '@/lib/content-schema';

const externalToolData = {
  "slug": "chatgpt",
  "title": "ChatGPT : L'Interface Conversationnelle d'OpenAI",
  "description": "Explorez ChatGPT, l'interface de chat qui a démocratisé l'IA, et découvrez ses fonctionnalités pour les étudiants en pharmacie.",
  "tags": ["chat", "openai", "gpt", "conversation"],
  "isFavorite": false,
  "conceptSlugs": ["chaîne-de-prompts"],
  "url": "https://chatgpt.com/",
  "category": "outils",
  
  // Enhanced schema fields
  "personalReview": "J'utilise ChatGPT principalement pour les conversations exploratoires et l'optimisation itérative de prompts. Sa mémoire conversationnelle en fait un partenaire idéal pour affiner progressivement mes demandes.",
  
  "strongPoints": [
    "Interface conversationnelle très intuitive, parfaite pour les débutants",
    "Mémoire de conversation qui permet l'optimisation itérative",
    "Écosystème GPTs pour des applications spécialisées (version payante)",
    "Fonction Deep Research pour la recherche approfondie (version payante)"
  ],
  
  "vigilancePoints": [
    "Modèles gratuits limités (GPT-4o mini principalement)",
    "Pas de citations systématiques des sources",
    "Peut manquer de précision sur des sujets très spécialisés",
    "Limites d'usage quotidiennes sur la version gratuite"
  ],
  
  "confidenceScore": 3,
  "confidenceJustification": "Score modéré car ChatGPT est hébergé aux États-Unis avec des politiques de confidentialité standard. Évitez d'y saisir des données personnelles ou sensibles.",
  
  "freeVsPaidOffer": `| Fonctionnalité | Version Gratuite | ChatGPT Plus (~20€/mois) |
|---|---|---|
| **Modèles disponibles** | GPT-4o mini, accès limité GPT-5 | GPT-5 étendu, GPT-4.1, GPT-4o |
| **Analyse de PDF** | Limitée | Avancée avec OCR |
| **Deep Research** | Version "lite" (5/mois) | Illimitée avec export PDF |
| **Voix** | Standard | Voix avancées temps réel |
| **GPTs et Plugins** | ❌ | ✅ Accès complet |
| **Génération d'images** | ❌ | ✅ DALL-E intégré |

*Données : Septembre 2025*`,
  
  "tldr": "L'IA accessible à tous : interface conversationnelle intuitive d'OpenAI, parfaite pour débuter avec l'IA. Idéale pour assistance quotidienne et rédaction.",
  "color": "bg-emerald-500",
  "use_cases": [
    "Conversations quotidiennes",
    "Aide aux devoirs", 
    "Rédaction simplifiée"
  ],
  "capabilities": ["conversation", "analyse_documents", "generation_texte"],
  "keyTakeaways": [
    "ChatGPT excelle dans l'interaction conversationnelle naturelle",
    "La version payante débloque des fonctionnalités avancées comme Deep Research",
    "Idéal pour l'apprentissage du prompt engineering grâce à sa mémoire conversationnelle"
  ],
  
  "content": [
    {
      "type": "markdown",
      "content": "## Mon Expérience avec ChatGPT\n\nChatGPT est souvent le premier contact avec l'IA pour beaucoup d'étudiants. Son interface conversationnelle naturelle permet de poser des questions comme on le ferait avec un collègue expérimenté.\n\n**Ce que j'apprécie le plus :** La capacité à affiner progressivement mes demandes dans une même conversation. Contrairement à d'autres outils, je peux dire \"Non, ce n'est pas exactement ça, plutôt quelque chose comme...\" et l'IA s'adapte."
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
export const externalTool = externalToolData satisfies ExternalTool;