import type { Guide } from '@/lib/content-schema'

export const guide = {
  slug: 'optimisation-de-prompts-la-methode-iterative',
  title: 'Optimisation de Prompts : La Méthode Itérative',
  description: 'Maîtrisez l\'art de l\'amélioration continue de vos prompts grâce au dialogue, à l\'auto-critique et aux chaînes de prompts.',
  icon: 'TrendingUp',
  category: 'methodologie',
  difficulty: 'intermédiaire',
  estimatedTime: '25 minutes',
  tags: [
    'auto-critique',
    'chain-of-thought',
    'clinique',
    'guide',
    'pedagogie',
    'pharmacie',
    'prompting',
  ],
  isFavorite: true,
  isWorkflow: false,
  keyTakeaways: [
    'Un prompt efficace est le résultat d\'un cycle d\'optimisation : Prompt initial -> Analyse -> Auto-critique assistée -> Raffinement.',
    'Utilisez des \'chaînes de prompts\' pour décomposer une tâche complexe en une série d\'étapes simples et fiables, comme un protocole.',
    'Fournissez un feedback précis et actionnable au lieu de critiques vagues pour guider efficacement l\'IA.',
  ],
  conceptSlugs: [
    'chaine-de-prompts',
  ],
  content: [
    {
      type: 'markdown',
      content: 'Un bon résultat vient rarement du premier coup. Le `prompt engineering` est un dialogue, pas une simple commande. L\'itération est la pratique la plus importante pour obtenir des résultats de qualité professionnelle.',
    },
    {
      type: 'markdown',
      content: '## Le Cycle d\'Optimisation des Prompts\n\nCe cycle en 4 étapes transforme un prompt moyen en un outil de haute précision.',
    },
    {
      type: 'tabs',
      defaultValue: 'etape1',
      tabs: [
        {
          value: 'etape1',
          title: '1. Prompt Initial',
          content: [
            {
              type: 'card',
              title: 'Étape 1 : Le Prompt Initial (La Première Prescription)',
              content: 'Formulez votre premier prompt de manière claire, en suivant les 5 piliers. Ne visez pas la perfection, visez la clarté.',
            },
            {
              type: 'codeBlock',
              language: 'text',
              content: '"Explique les interactions médicamenteuses des IEC."',
            },
          ],
        },
        {
          value: 'etape2',
          title: '2. Analyse Critique',
          content: [
            {
              type: 'card',
              title: 'Étape 2 : L\'Analyse Critique (L\'Évaluation Clinique)',
              content: 'Exécutez le prompt et analysez la réponse. Est-elle complète ? Structurée ? Précise ?\n\n**Constat :** La réponse est trop générale, manque de structure et n\'est pas adaptée à un étudiant.',
            },
          ],
        },
        {
          value: 'etape3',
          title: '3. Auto-Critique Assistée',
          content: [
            {
              type: 'card',
              title: 'Étape 3 : L\'Auto-Critique Assistée (La RCP)',
              content: 'C\'est l\'étape clé. Demandez à l\'IA de critiquer son propre travail pour vous aider à raffiner le prompt.',
            },
            {
              type: 'codeBlock',
              language: 'text',
              content: '"Critique ta réponse précédente. Comment pourrais-tu l\'améliorer pour qu\'elle soit plus utile pour un étudiant en pharmacie ? Propose 3 axes d\'amélioration."',
            },
            {
              type: 'alert',
              content: 'L\'IA va souvent suggérer d\'ajouter de la structure (tableau), de préciser le public cible, et d\'inclure des exemples concrets.',
            },
          ],
        },
        {
          value: 'etape4',
          title: '4. Raffinement',
          content: [
            {
              type: 'card',
              title: 'Étape 4 : Le Raffinement (L\'Ajustement Posologique)',
              content: 'Intégrez les critiques (les vôtres et celles de l\'IA) dans un nouveau prompt amélioré.\nRépétez ce cycle jusqu\'à obtenir le résultat souhaité.',
            },
            {
              type: 'codeBlock',
              language: 'text',
              content: '"Ta réponse manque de structure. Présente les interactions des IEC sous forme de tableau avec les colonnes : Famille de médicaments, Type d\'interaction, Conséquence clinique, Conduite à tenir. Cible : étudiant en 4ème année."',
            },
          ],
        },
      ],
    },
    {
      type: 'markdown',
      content: '## Aller Plus Loin : Les Chaînes de Prompts\n\nPour les tâches très complexes, un seul prompt, même parfait, ne suffit pas. La solution est de créer une **chaîne de prompts**, où la sortie d\'un prompt devient l\'entrée du suivant. C\'est l\'équivalent d\'un protocole thérapeutique.',
    },
    {
      type: 'conceptRecommendation',
      slug: 'chaine-de-prompts',
      reason: 'Découvrez comment décomposer des tâches complexes en séquences de prompts simples et fiables pour des résultats reproductibles.',
    },
    {
      type: 'card',
      title: 'Exemple : Créer une Fiche de Révision Complète en 3 Étapes',
      content: '1. **Prompt 1 (Extraction) :** `Extrais les 10 concepts clés de ce cours.`\n2. **Prompt 2 (Structuration) :** `À partir de ces 10 concepts, propose un plan de fiche de révision logique.`\n3. **Prompt 3 (Rédaction) :** `Rédige la fiche de révision en suivant ce plan et en détaillant chaque concept.`\n\nCette méthode décompose un problème complexe en tâches simples et maîtrisables, augmentant drastiquement la fiabilité du résultat final.',
    },
    {
      type: 'toolRecommendation',
      slug: 'chatgpt',
      reason: 'ChatGPT est idéal pour l\'optimisation itérative grâce à sa fonction de mémoire conversationnelle qui garde le contexte de vos itérations précédentes.',
    },
    {
      type: 'guideRecommendation',
      slug: 'les-6-piliers-prompt-pharmaceutique-efficace',
      reason: 'Avant d\'optimiser, assurez-vous de maîtriser les fondamentaux : un prompt bien structuré nécessite moins d\'itérations pour atteindre l\'excellence.',
    },
  ],
} satisfies Guide

export default guide
