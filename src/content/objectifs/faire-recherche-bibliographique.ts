import { Objectif, objectifSchema } from '@/lib/content-schema';
import { allPrompts } from '@/content/prompts';

const masterPromptData = allPrompts.find(p => p.slug === 'research-helper');
if (!masterPromptData) throw new Error("Prompt 'research-helper' non trouvé");

const objectifData = {
  slug: 'faire-recherche-bibliographique',
  title: 'Faire une Recherche Bibliographique Fiable',
  description: 'Apprenez à utiliser les meilleurs outils IA pour des recherches académiques rapides, sourcées et sans hallucination.',
  icon: 'BookCheck',
  
  masterPrompt: {
    description: "Ce prompt initial est conçu pour lancer votre recherche sur n'importe quel outil. Il demande une synthèse large et l'identification des sous-thèmes, vous donnant une base solide pour approfondir.",
    prompt: masterPromptData,
  },

  beforeAfter: {
    beforePrompt: `"Trouve des infos sur les nouveaux anticoagulants."`,
    afterPrompt: `"En utilisant le focus académique, fournis une synthèse sur les nouveaux anticoagulants oraux directs (NACOs) publiés depuis 2023, en citant tes sources."`,
    beforeImageSrc: "/images/objectifs/recherche-biblio-avant.png",
    afterImageSrc: "/images/objectifs/recherche-biblio-apres.png",
  },
  
  checklist: [
    "Ai-je formulé ma question selon la méthode PICO (Patient, Intervention, Comparaison, Outcome) ?",
    "Ai-je utilisé un outil spécialisé dans la recherche sourcée (RAG) ?",
    "Ai-je activé un mode de recherche 'Académique' ou 'Scientifique' si disponible ?",
    "Ai-je vérifié manuellement les 2-3 sources les plus importantes citées par l'IA ?",
    "Ai-je demandé à l'IA de signaler les limitations ou controverses sur le sujet ?",
  ],

  relatedConcepts: ["hallucination-effet-indesirable", "context-engineering"],
  relatedGuides: ["obtenir-donnees-fiables", "techniques-avancees-fiabilisation"],
  
  content: [
    {
      "type": "tabs",
      "defaultValue": "perplexity",
      "tabs": [
        {
          "value": "perplexity",
          "title": "Avec Perplexity AI",
          "content": [
            {
              "type": "markdown",
              "content": "Perplexity est excellent pour sa simplicité et son mode 'Focus Academic'. C'est le choix le plus direct pour une recherche rapide et sourcée.\n\n**Exemple de Prompt :**\n```\n(Assurez-vous que le Focus est sur 'Academic')\n\nQuelles sont les dernières avancées dans le traitement de l'amylose cardiaque à transthyrétine (ATTR-CM) publiées depuis 2023 ?\n```"
            },
            {
                "type": "toolRecommendation",
                "slug": "perplexity-ai",
                "reason": "Idéal pour sa fiabilité et sa facilité d'utilisation avec le mode 'Focus Academic' qui limite la recherche aux publications scientifiques."
            }
          ]
        },
        {
          "value": "zai",
          "title": "Avec Z.AI",
          "content": [
            {
              "type": "markdown",
              "content": "Z.AI utilise une approche de recherche planifiée qui peut donner des synthèses plus riches et contextuelles, mais attention à la confidentialité.\n\n**Exemple de Prompt :**\n```\n(Activez le mode 'Deep Research' si nécessaire)\n\nEffectue une recherche approfondie sur les dernières avancées dans le traitement de l'amylose cardiaque à transthyrétine (ATTR-CM) publiées depuis 2023. Structure ta réponse en sections : mécanismes, essais cliniques clés, et perspectives futures.\n```"
            },
            {
                "type": "toolRecommendation",
                "slug": "z-ai",
                "reason": "Excellent pour des recherches complexes nécessitant une synthèse planifiée. À utiliser uniquement avec des données non-confidentielles."
            }
          ]
        },
        {
            "value": "verdict",
            "title": "Verdict & Stratégie",
            "content": [
                {
                    "type": "markdown",
                    "content": "**Stratégie recommandée :**\n\n1. **Commencez avec Perplexity (Focus: Academic)** pour une première passe rapide, fiable et bien sourcée.\n2.  **Utilisez les sources trouvées par Perplexity** comme base pour une analyse plus approfondie dans un outil comme <ToolRecommendation toolSlug='google-ai-studio' reason='Permet d_analyser de multiples PDF en même temps grâce à son immense fenêtre de contexte.' />\n3.  **Pour une exploration créative ou des synthèses complexes**, Z.AI peut offrir des perspectives différentes, mais toujours en gardant à l_esprit la question de la confidentialité."
                }
            ]
        }
      ]
    }
  ]
};

export const objectif: Objectif = objectifSchema.parse(objectifData);