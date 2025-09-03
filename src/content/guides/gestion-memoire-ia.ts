// src/content/guides/gestion-memoire-ia.ts
import type { GuideInput } from '@/types/content';

export const guide = {
  "slug": "gestion-memoire-ia",
  "title": "Gérer la Mémoire de l'IA : Le Guide Pratique",
  "description": "Devenez un pilote d'IA efficace en apprenant à gérer activement sa mémoire volatile (contexte) et sa mémoire persistante (instructions, GPTs).",
  "icon": "Database",
  "category": "techniques-avancees",
  "difficulty": "intermédiaire",
  "estimatedTime": "30 minutes",
  "tags": [],
  "isFavorite": false,
  "isWorkflow": false,
  "keyTakeaways": [
    "Maîtrisez la fenêtre de contexte avec des points de sauvegarde et des corrections de trajectoire pour des conversations longues et cohérentes.",
    "Personnalisez l'IA avec des instructions persistantes et créez des GPTs spécialisés pour des tâches récurrentes.",
    "Une gestion proactive de la mémoire transforme l'IA d'un outil générique en un assistant personnel puissant."
  ],
  "conceptSlugs": [],
  "content": [
    {
      "type": "alert",
      "variant": "default",
      "title": "🚗 Analogie",
      "content": "Subir les limitations de la mémoire de l'IA, c'est être un passager. La gérer activement, c'est devenir un pilote."
    },
    {
      "type": "markdown",
      "content": "Nous avons vu la **[différence entre la mémoire vive (contexte) et le disque dur (mémoire long terme simulée) de l'IA](/concepts/memoire-ia)**. Ce guide vous donne des techniques pratiques et des prompts concrets pour prendre les commandes de la mémoire de l'IA, éviter la \"démence contextuelle\" et obtenir des résultats plus cohérents et pertinents sur la durée."
    },
    {
      "type": "tabs",
      "defaultValue": "sauvegarde",
      "tabs": [
        {
          "value": "sauvegarde",
          "title": ".Point de Sauvegarde",
          "content": [
            {
              "type": "card",
              "title": "Quand l'utiliser ?",
              "content": "Toutes les 10-15 interactions, ou quand vous avez atteint une conclusion intermédiaire."
            },
            {
              "type": "codeBlock",
              "language": "text",
              "filename": "prompt-sauvegarde.txt",
              "content": "Faisons une pause et créons un point de sauvegarde. Résume de manière concise et structurée les éléments les plus importants que nous avons établis jusqu'à présent dans cette conversation.\n\n**Format attendu :**\n- **Patient :** (Synthèse des caractéristiques pertinentes)\n- **Problème Principal :** (Ce que nous essayons de résoudre)\n- **Hypothèses Établies :** (Les conclusions que nous avons validées)\n- **Hypothèses Rejetées :** (Les pistes que nous avons explorées et écartées)\n- **Actions Décidées :** (Les stratégies thérapeutiques que nous avons définies)\n- **Points en Suspens :** (Les questions qui restent à clarifier)"
            },
            {
              "type": "alert",
              "variant": "default",
              "title": "Action",
              "content": "Copiez cette synthèse. Si vous sentez que l'IA commence à perdre le fil plus tard, collez-la au début de votre prochain prompt en disant : `\"Rappelle-toi notre point de sauvegarde : [coller la synthèse]`."
            }
          ]
        },
        {
          "value": "trajectoire",
          "title": "Correction de Trajectoire",
          "content": [
            {
              "type": "card",
              "title": "Quand l'utiliser ?",
              "content": "Dès que vous réalisez qu'une partie de votre raisonnement était fausse."
            },
            {
              "type": "codeBlock",
              "language": "text",
              "filename": "prompt-correction.txt",
              "content": "Correction de trajectoire. L'hypothèse que nous avons explorée concernant une possible interaction avec le millepertuis est incorrecte ; la recherche bibliographique ne la confirme pas. Ignore complètement cette partie de notre discussion et toutes les conclusions qui en découlent. Reconcentrons-nous uniquement sur l'interaction pharmacocinétique potentielle entre la warfarine et l'amiodarone que nous avions identifiée au début."
            }
          ]
        }
      ]
    },
    {
      "type": "tabs",
      "defaultValue": "instructions",
      "tabs": [
        {
          "value": "instructions",
          "title": "Instructions Personnalisées",
          "content": [
            {
              "type": "markdown",
              "content": "C'est la première chose à faire sur **ChatGPT** ou **Claude.ai**. C'est votre \"signature\" qui s'appliquera à chaque conversation. Soyez précis et détaillé."
            },
            {
              "type": "card",
              "title": "Exemple de configuration pour un étudiant en 5ème année option industrie",
              "content": "**Champ 1 (Qui êtes-vous ?) :** \"Je suis un étudiant en 5ème année de pharmacie, spécialisé en affaires réglementaires. Je m'intéresse à la rédaction de documentation pour les dossiers d'AMM (Autorisation de Mise sur le Marché) et à la veille concurrentielle. Mon niveau est avancé.\"\n\n**Champ 2 (Comment répondre ?) :** \"Adopte le ton d'un consultant senior en affaires réglementaires. Sois précis, formel et factuel. Structure toujours tes réponses avec des titres et des sous-titres. Lorsque tu analyses une situation, utilise le cadre SWOT (Forces, Faiblesses, Opportunités, Menaces) si applicable. Cite toujours des exemples de guidelines (EMA, FDA) lorsque c'est pertinent. Ne jamais utiliser d'émojis.\""
            }
          ]
        },
        {
          "value": "experts",
          "title": "Experts sur Mesure (GPTs)",
          "content": [
            {
              "type": "markdown",
              "content": "Ne vous contentez pas du modèle de base de **ChatGPT Plus**. Créez une armée de spécialistes.\n\n**Comment ?** Allez dans `\"Explorer\"` -> `\"Créer un GPT\"`. Donnez-lui un nom, une instruction claire et, surtout, une base de connaissances en uploadant des documents."
            },
            {
              "type": "card",
              "title": "Idées de GPTs pour un étudiant en pharmacie",
              "content": "**\"Analyseur de RCP\" :**\n*Instruction :* \"Tu es un expert en analyse de RCP. Extrais les informations clés du document fourni et présente-les dans un format JSON structuré.\"\n*Connaissances :* Uploadez 5-10 exemples de RCP de différents types de médicaments.\n\n**\"Tuteur en Pharmacocinétique\" :**\n*Instruction :* \"Tu es un professeur de pharmacocinétique. Explique les concepts de manière simple, donne des analogies et crée des exercices avec corrigés détaillés.\"\n*Connaissances :* Uploadez vos cours de PK, des fiches de TD, et des exercices corrigés.\n\n**\"Assistant de Veille Scientifique\" :**\n*Instruction :* \"Tu es un documentaliste scientifique. Lorsque je te donne un thème, cherche sur le web les 3 publications les plus récentes et pertinentes (méta-analyses ou essais cliniques randomisés en priorité) et résume-les en 5 points clés chacun, en incluant la référence complète.\"\n*Capacités :* Activez la recherche web (`Web Browsing`)."
            }
          ]
        }
      ]
    },
    {
      "type": "card",
      "title": "Conclusion : Une Discipline à Cultiver",
      "content": "La gestion de la mémoire de l'IA est une discipline. Prenez l'habitude de faire des points de sauvegarde dans les longues conversations, de corriger activement la trajectoire quand vous vous égarez, et de passer du temps à configurer vos instructions personnalisées et vos GPTs.\n\nL'investissement initial est largement récompensé par des interactions plus rapides, plus pertinentes et une IA qui se comporte moins comme un outil générique et plus comme un véritable assistant personnel à votre service."
    },
    {
      "type": "toolRecommendation",
      "slug": "chatgpt",
      "reason": "ChatGPT Plus offre les fonctionnalités les plus avancées pour la gestion de mémoire : instructions personnalisées persistantes, création de GPTs spécialisés avec base de connaissances intégrée."
    },
    {
      "type": "conceptRecommendation",
      "slug": "memoire-ia",
      "reason": "Comprendre les mécanismes fondamentaux de la mémoire des IA (contexte vs mémoire persistante) est essentiel avant d'appliquer ces techniques de gestion avancées."
    },
    {
      "type": "conceptRecommendation",
      "slug": "context-engineering",
      "reason": "La gestion de mémoire est une application pratique du context engineering - optimiser la fenêtre de contexte pour des interactions plus efficaces."
    }
  ]
} satisfies GuideInput;