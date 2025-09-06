// src/content/concepts/token-acide-amine.ts
import type { Concept } from '@/lib/content-schema'

export const concept = {
  slug: 'token-acide-amine',
  title: 'Le Token : L\'Acide Aminé de l\'IA',
  description: 'Comprendre ce qu\'est un token, l\'unité de base que les modèles de langage utilisent pour lire, comprendre et générer du texte.',
  icon: 'Dna',
  category: 'fondamentaux',
  difficulty: 'intermédiaire',
  tags: [],
  isFavorite: false,
  keyTakeaways: [
    'Un token est l\'unité de base du texte, comme un acide aminé pour une protéine',
    '100 tokens ≈ 75 mots français (ratio de conversion important à retenir)',
    'La fenêtre de contexte limite la \'mémoire de travail\' du modèle',
    'Modèles 2025 : jusqu\'à 1M tokens (plusieurs livres entiers)',
    'Optimiser l\'usage des tokens améliore qualité et coût des requêtes',
  ],
  conceptSlugs: [],
  content: [
    {
      type: 'alert',
      variant: 'default',
      title: '🧬 Analogie Biologique',
      content: 'Un **token** est à l\'IA ce qu\'un **acide aminé** est à une protéine : un bloc fondamental indivisible que le système manipule.',
    },
    {
      type: 'markdown',
      content: '## Définition : Qu\'est-ce qu\'un Token ?',
    },
    {
      type: 'card',
      title: 'Unité de Base du Texte',
      description: 'L\'équivalent numérique d\'un acide aminé',
      content: 'Dans le domaine des modèles de langage (LLMs), un **token** est l\'unité de base du texte. C\'est l\'équivalent d\'un acide aminé pour une protéine : un bloc fondamental que le modèle manipule.',
    },
    {
      type: 'tabs',
      defaultValue: 'composition',
      tabs: [
        {
          value: 'composition',
          title: 'Composition d\'un Token',
          content: [
            {
              type: 'card',
              title: 'Un Token Peut Être :',
              content: '- **Un mot entier** : `"pharmacie"`\n- **Un morceau de mot** : `"phar"`, `"ma"`, `"cie"`\n- **Un signe de ponctuation** : `"?"`, `"!"`\n- **Un espace ou caractère spécial** : espaces, retours à la ligne',
            },
            {
              type: 'alert',
              variant: 'default',
              title: '📊 Règle de Conversion',
              content: 'En moyenne, en français : **100 tokens ≈ 75 mots**',
            },
            {
              type: 'codeBlock',
              language: 'text',
              filename: 'exemple-tokenisation.txt',
              content: 'Phrase : "Cette phrase contient 7 mots"\n\nTokenisation probable :\n["Cette"] ["phrase"] ["contient"] ["7"] ["mots"]\n= 5 tokens pour 5 mots (simple)\n\nPhrase complexe : "L\'anti-inflammatoire non-stéroïdien"\nTokenisation probable :\n["L\'"] ["anti"] ["-"] ["inflamm"] ["atoire"] ["non"] ["-"] ["stér"] ["oïd"] ["ien"]\n= 10 tokens pour 3 mots (complexe)',
            },
          ],
        },
        {
          value: 'context-window',
          title: 'Fenêtre de Contexte',
          content: [
            {
              type: 'card',
              title: 'La "Mémoire à Court Terme" de l\'IA',
              description: 'Quantité maximale de tokens gérés simultanément',
              content: 'Chaque modèle d\'IA possède une **fenêtre de contexte** (ou *context window*), qui est la quantité maximale de tokens qu\'il peut prendre en compte à un instant T.',
            },
            {
              type: 'alert',
              variant: 'default',
              title: '📝 Composition de la Fenêtre',
              content: 'La fenêtre inclut :\n1. **Votre prompt** (tokens que vous envoyez)\n2. **La réponse de l\'IA** (tokens qu\'elle génère)\n\nSi la conversation dépasse cette limite, l\'IA "oublie" les informations les plus anciennes.',
            },
          ],
        },
      ],
    },
    {
      type: 'markdown',
      content: '## Évolution des Tailles de Fenêtre de Contexte',
    },
    {
      type: 'tabs',
      defaultValue: 'evolution',
      tabs: [
        {
          value: 'evolution',
          title: 'Générations de Modèles',
          content: [
            {
              type: 'card',
              title: 'Modèles Standards (Anciens)',
              content: '- **Taille** : 4 000 à 8 000 tokens\n- **Équivalence** : 10-20 pages de texte\n- **Usage** : Conversations courtes, analyses limitées',
            },
            {
              type: 'card',
              title: 'Génération 2024',
              content: '- **Taille** : 128 000 à 200 000 tokens\n- **Équivalence** : Un livre entier\n- **Modèles** : GPT-4, Claude 2',
            },
            {
              type: 'card',
              title: 'Génération 2025 (Prévisions)',
              content: '- **GPT-5** : 400 000 tokens\n- **Gemini 2.5 Pro** : **1 000 000 tokens**\n- **Équivalence** : Plusieurs livres ou une codebase complète',
            },
          ],
        },
        {
          value: 'implications',
          title: 'Implications Pratiques',
          content: [
            {
              type: 'card',
              title: 'Révolution des Capacités',
              description: 'Ce que permet 1M de tokens',
              content: 'Avec une fenêtre de 1M de tokens, vous pouvez soumettre :\n- Un dossier patient complet\n- Plusieurs études cliniques\n- L\'intégralité d\'un cours\n- Une analyse transversale sans perte de contexte',
            },
          ],
        },
      ],
    },
    {
      type: 'markdown',
      content: '## Pourquoi c\'est Important pour la Pharmacie ?',
    },
    {
      type: 'tabs',
      defaultValue: 'clinical',
      tabs: [
        {
          value: 'clinical',
          title: 'Applications Cliniques',
          content: [
            {
              type: 'card',
              title: 'Analyse de Documents Longs',
              content: 'Soumettez un dossier patient complet, plusieurs études cliniques, ou l\'intégralité d\'un cours et demandez une analyse transversale sans que l\'IA perde le fil.',
            },
            {
              type: 'card',
              title: 'Qualité de la Réponse',
              content: 'Un prompt bien formulé qui utilise efficacement les tokens disponibles (concis et précis) obtiendra de meilleurs résultats qu\'un prompt verbeux et mal structuré.',
            },
          ],
        },
        {
          value: 'economic',
          title: 'Considérations Économiques',
          content: [
            {
              type: 'alert',
              variant: 'default',
              title: '💰 Coût API',
              content: 'Pour les développeurs utilisant l\'API, le coût est calculé en fonction du nombre de tokens en entrée et en sortie. Optimiser ses prompts peut avoir un impact financier.',
            },
            {
              type: 'card',
              title: 'Optimisation pour Étudiants',
              content: 'Même en version gratuite, comprendre les tokens aide à :\n- Maximiser l\'efficacité des conversations\n- Éviter de dépasser les limites gratuites\n- Structurer l\'information de manière optimale',
            },
          ],
        },
      ],
    },
    {
      type: 'alert',
      variant: 'default',
      title: '🚀 Passage au Niveau Supérieur',
      content: 'Comprendre la notion de token et de fenêtre de contexte est la première étape pour passer d\'un simple utilisateur à un véritable **prompt engineer** capable de tirer le meilleur parti de ces outils puissants.',
    },
    {
      type: 'guideRecommendation',
      slug: 'optimiser-ses-quotas-et-son-temps-avec-lia',
      reason: 'Apprenez à optimiser vos conversations pour maximiser l\'efficacité de vos quotas gratuits.',
    },
    {
      type: 'conceptRecommendation',
      slug: 'context-engineering',
      reason: 'Maîtrisez l\'art d\'optimiser la fenêtre de contexte pour des réponses plus précises et pertinentes.',
    },
  ],
} satisfies Concept

export default guide || concept || workflow
