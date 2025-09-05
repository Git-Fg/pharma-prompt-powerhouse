// src/content/guides/choisir-ses-outils-ia-en-2025-chat-vs-studio.ts
import type { Guide } from '@/lib/content-schema'

export const guide = {
  slug: 'choisir-ses-outils-ia-en-2025-chat-vs-studio',
  title: 'Choisir ses Outils IA en 2025 : Le Guide Stratégique',
  description: "Un guide pour naviguer l'écosystème IA de 2025, des agents de recherche aux tuteurs personnels, en passant par les hubs de modèles.",
  icon: 'Workflow',
  category: 'outils',
  difficulty: 'débutant',
  estimatedTime: '20 minutes',
  tags: [
    'outils',
    'guide',
    'comparatif',
    'strategie',
    'agent-ia',
  ],
  isFavorite: true,
  isWorkflow: false,
  keyTakeaways: [
    "La distinction n\'est plus seulement 'Chat vs Studio', mais se base sur des rôles spécialisés : Agent de Recherche, Hub de Modèles, Assistant d\'Analyse, et Tuteur IA.",
    "**Perplexity Pro** s\'est transformé en 'Hub de Modèles', donnant accès à GPT-5 et Claude 4 Opus pour le prix d\'un seul abonnement.",
    "**Claude Pro** est devenu un 'Assistant d\'Analyse' avec des capacités agentiques (Tool Use) pour les projets de recherche au long cours.",
    "**Google AI Studio** s\'impose comme le 'Tuteur IA' ultime grâce à sa fonction 'Guided Learning', tout en restant le meilleur laboratoire gratuit.",
    "Votre 'arsenal stratégique' doit combiner un outil de recherche rapide (Perplexity gratuit), un pour l\'analyse de fond (AI Studio), et potentiellement un abonnement 'Hub' (Perplexity Pro) pour maximiser la puissance.",
  ],
  conceptSlugs: [
    'architecture-agentique',
    'react-reason-act',
    'systemes-multi-agents',
  ],
  content: [
    {
      type: 'markdown',
      content: "# L'Écosystème IA en 2025 : Au-delà du simple Chat\n\nEn 2025, choisir son outil IA ne se résume plus à une simple préférence entre ChatGPT et Gemini. Le marché a mûri, donnant naissance à des outils spécialisés avec des rôles bien définis. Ce guide vous aidera à y voir clair pour construire votre arsenal stratégique.",
    },
    {
      type: 'markdown',
      content: '## Les Nouveaux Rôles sur le Terrain',
    },
    {
      type: 'table',
      caption: "Tableau comparatif des positionnements stratégiques des outils IA en 2025.",
      headers: ["Outil", "Nouveau Rôle Stratégique", "Idéal Pour..."],
      rows: [
        ['**Perplexity AI**', "**Le Hub de Modèles & Agent de Recherche**", "Accéder aux meilleurs modèles (GPT-5, Claude 4 Opus) via un seul abonnement et lancer des recherches autonomes."],
        ['**Claude.ai**', "**L\'Assistant d\'Analyse et de Raisonnement**", "Les projets de recherche longs (mémoires) nécessitant l\'analyse de nombreux documents et une mémoire persistante."],
        ['**Google AI Studio**', "**Le Laboratoire & Tuteur Personnel**", "L\'expérimentation gratuite et l\'apprentissage guidé en transformant des cours en modules interactifs."],
        ['**ChatGPT**', "**La Référence Polyvalente**", "Les tâches de rédaction, de brainstorming et l\'accès à l'écosystème de pointe d\'OpenAI (GPT-5, GPTs)."],
      ],
    },
    {
      type: 'markdown',
      content: "### L'Évolution Majeure : Perplexity, le Hub de Modèles",
    },
    {
      type: 'card',
      title: "Perplexity n\'est plus un simple moteur de recherche",
      content: "C\'est le changement le plus important de l\'année. Au lieu de payer des abonnements séparés pour chaque modèle de pointe, l\'abonnement Perplexity Pro (environ 20$/mois) vous donne accès à **GPT-5**, **Claude 4 Opus**, et d\'autres, directement dans leur interface. \n\nSa fonction **'Deep Research'** en fait un véritable **agent de recherche** : vous lui donnez un sujet, et il planifie, exécute une recherche multi-sources, et vous rend un rapport de synthèse sourcé. C\'est un gain de productivité phénoménal."
    },
    {
      type: 'markdown',
      content: '## Mon Combo Idéal pour l'Étudiant en 2025',
    },
    {
      type: 'tabs',
      defaultValue: 'gratuit',
      tabs: [
        {
          value: 'gratuit',
          title: 'Le Combo 100% Gratuit',
          content: [
            {
              type: 'card',
              title: 'Le Duo Gagnant : Perplexity + AI Studio',
              content: "**1. Pour la recherche rapide et sourcée :** La version gratuite de **Perplexity** reste excellente pour des questions factuelles. Vous obtenez des réponses à jour avec des liens vers les sources.\n\n**2. Pour l\'analyse de fond et l\'apprentissage :** **Google AI Studio** est imbattable. Utilisez-le pour analyser vos cours, générer des fiches de révision avec sa fenêtre de contexte de 1M de tokens, ou transformer un PDF en cours interactif avec 'Guided Learning'.",
            },
          ]
        },
        {
          value: 'premium',
          title: 'Le Combo Productivité Maximale',
          content: [
            {
              type: 'card',
              title: 'L\'Abonnement Unique : Perplexity Pro',
              content: "Si je ne devais payer qu\'un seul abonnement, ce serait celui-ci. Pour environ 20$/mois, il remplace presque tous les autres :\n\n- **Accès aux meilleurs modèles** : Plus besoin de choisir entre GPT-5 et Claude 4 Opus.\n- **Agent de recherche intégré** : La fonction 'Deep Research' pour démarrer une bibliographie est révolutionnaire.\n- **Analyse de fichiers illimitée**.\n\nJe le complète avec **AI Studio** (gratuit) pour sa fonction unique de 'Guided Learning' et pour les expérimentations très spécifiques.",
            },
          ]
        }
      ]
    },
    {
      type: 'markdown',
      content: '## Analyse Détaillée par Cas d\'Usage',
    },
    {
        type: 'accordion',
        items: [
            {
                value: 'recherche-biblio',
                title: 'Pour une Recherche Bibliographique Approfondie',
                content: {
                    type: 'card',
                    content: "**🥇 Le Meilleur : Perplexity Pro avec 'Deep Research'**\n\nC\'est la solution la plus efficace. Vous lancez une recherche sur un sujet, et l\'agent travaille pour vous. Le rapport final est une base de travail solide, avec toutes les sources citées.\n\n**🥈 Alternative Gratuite : Le combo Z.AI + AI Studio**\n\nUtilisez l\'agent de recherche de **Z.AI** pour obtenir un plan de recherche et des sources initiales (attention à la confidentialité). Ensuite, utilisez **AI Studio** pour analyser en profondeur les articles et les données trouvées."
                }
            },
            {
                value: 'analyse-de-fonds',
                title: 'Pour l\'Analyse d\'un Corpus de Documents (Mémoire, Thèse)',
                content: {
                    type: 'card',
                    content: "**🥇 Le Meilleur : Claude Pro**\n\nAvec sa fenêtre de contexte allant jusqu'à 1M de tokens et ses nouvelles capacités agentiques ('Tool Use', 'Working Notes'), Claude peut devenir un véritable partenaire de recherche, gardant en mémoire vos documents et vos objectifs sur plusieurs jours.\n\n**🥈 Alternative Gratuite : Google AI Studio**\n\nSa fenêtre de contexte de 1M de tokens est également disponible gratuitement. Il est excellent pour des sessions d\'analyse ponctuelles sur un grand nombre de documents, même s\'il n\'a pas la mémoire à long terme d\'un projet Claude."
                }
            },
            {
                value: 'tutorat',
                title: 'Pour se Faire Expliquer un Cours Complexe',
                content: {
                    type: 'card',
                    content: "**🥇 Le Meilleur : Google AI Studio avec 'Guided Learning'**\n\nC\'est la fonctionnalité phare pour cet usage. Uploadez votre cours, et demandez-lui de créer un parcours d\'apprentissage. Il vous guidera à travers les concepts clés avec des explications, des QCM et des exercices.\n\n**🥈 Alternative : ChatGPT-5**\n\nLe dernier modèle d\'OpenAI a d\'excellentes capacités pédagogiques. Vous pouvez lui demander de se comporter comme un tuteur et de vous poser des questions de manière socratique."
                }
            }
        ]
    },
    {
      type: 'markdown',
      content: '## Conclusion : Pensez "Rôle" et non "Outil"\n\nL'ère du 'couteau suisse' unique est révolue. Pour être efficace en 2025, il faut penser comme un chef d\'orchestre : quel instrument (ou quel rôle d\'IA) est le plus adapté pour cette partie de la symphonie ? En combinant judicieusement ces outils spécialisés, vous démultiplierez votre productivité.',
    },
    {
      type: 'guideRecommendation',
      slug: 'le-core-kit-ia-gratuit-en-2025',
      reason: 'Découvrez en détail comment optimiser l\'utilisation du duo Perplexity (gratuit) et AI Studio pour couvrir la majorité de vos besoins sans dépenser un centime.',
    },
  ],
} satisfies Guide
