import type { Concept } from '@/lib/content-schema'

export const concept = {
  slug: 'chain-of-verification',
  title: 'Chain-of-Verification (CoVe)',
  description: 'Une technique où l\'IA devient son propre fact-checker, planifiant et exécutant des vérifications sur ses propres affirmations pour réduire les hallucinations.',
  category: 'Concepts Avancés',
  difficulty: 'avancé',
  tags: ['vérification', 'fiabilisation', 'hallucination'],
  isFavorite: false,
  keyTakeaways: [
    'Le CoVe permet à l\'IA de devenir son propre fact-checker en planifiant et exécutant des vérifications.',
    'Cette technique réduit significativement les hallucinations en ajoutant une étape de validation systématique.',
    'Le processus en 4 étapes : réponse de base → planification → exécution → réponse finale vérifiée.',
  ],
  content: [
    {
      type: 'section',
      title: '1. L\'Analogie Simple : Le Journaliste Interne',
      content: 'Imaginez une IA non pas comme un expert qui sait tout, mais comme un journaliste.',
      variant: 'analogy',
    },
    {
      type: 'actionChecklist',
      title: 'Processus de Fact-Checking Interne',
      description: 'Les 4 étapes du CoVe analogie du journaliste',
      items: [
        {
          id: 'brouillon',
          title: 'Le Brouillon',
          description: 'Il écrit une première version de son article (la réponse initiale)',
          priority: 'high',
        },
        {
          id: 'doute-systematique',
          title: 'Le Doute Systématique',
          description: 'Au lieu de publier, il s\'arrête et se demande : \'Quelles sont les affirmations clés que j\'ai faites ici ? Comment puis-je les vérifier ?\'',
          priority: 'high',
        },
        {
          id: 'enquete',
          title: 'L\'Enquête',
          description: 'Il pose des questions précises pour vérifier chaque affirmation (ex: \'La metformine cause-t-elle fréquemment des troubles lactiques ?\')',
          priority: 'high',
        },
        {
          id: 'edition-finale',
          title: 'L\'Édition Finale',
          description: 'Après avoir obtenu les réponses à ses propres questions, il corrige et affine son article initial pour le rendre factuellement exact',
          priority: 'high',
        },
      ],
      variant: 'card',
      allowChecking: true,
    },
    {
      type: 'section',
      title: '2. La Définition Formelle',
      content: 'Chain-of-Verification (CoVe) est une technique de prompting qui vise à réduire les hallucinations factuelles d\'un modèle de langage.',
      variant: 'section',
    },
    {
      type: 'actionChecklist',
      title: 'Processus CoVe en 4 Étapes',
      description: 'Les étapes formelles du Chain-of-Verification',
      items: [
        {
          id: 'reponse-base',
          title: 'Génération d\'une Réponse de Base',
          description: 'Le modèle produit une première réponse à la question de l\'utilisateur',
          priority: 'high',
        },
        {
          id: 'planification',
          title: 'Planification de la Vérification',
          description: 'Le modèle identifie les affirmations factuelles dans sa réponse et génère une série de questions de vérification pour les valider',
          priority: 'high',
        },
        {
          id: 'execution',
          title: 'Exécution de la Vérification',
          description: 'Le modèle répond à ces questions de vérification de manière indépendante, sans être biaisé par sa réponse initiale',
          priority: 'high',
        },
        {
          id: 'reponse-finale',
          title: 'Génération d\'une Réponse Finale Vérifiée',
          description: 'Le modèle synthétise les informations issues de la vérification pour corriger sa réponse initiale et présenter une version finale plus fiable',
          priority: 'high',
        },
      ],
      variant: 'default',
      allowChecking: true,
    },
    {
      type: 'section',
      title: '3. Pourquoi C\'est Important Pour Vous ?',
      content: 'Dans le domaine de la santé, une information incorrecte peut avoir des conséquences graves. Le CoVe est une barrière de sécurité cruciale.',
      variant: 'key-points',
    },
    {
      type: 'points',
      title: 'Avantages du CoVe en Pharmacie',
      points: [
        {
          title: 'Fiabilité Accrue',
          description: 'Il diminue significativement le risque que l\'IA présente une information plausible mais fausse (une \'hallucination\')',
        },
        {
          title: 'Transparence du Raisonnement',
          description: 'Le plan de vérification vous montre exactement ce que l\'IA a jugé nécessaire de confirmer, vous donnant un aperçu de ses \'doutes\'',
        },
        {
          title: 'Meilleur Contrôle',
          description: 'Vous pouvez évaluer non seulement la réponse finale, mais aussi la pertinence du plan de vérification lui-même',
        },
      ],
    },
    {
      type: 'section',
      title: '4. Pour Aller Plus Loin (Notions Avancées)',
      content: 'Les implémentations avancées et limites du CoVe',
      variant: 'examples',
    },
    {
      type: 'points',
      title: 'Concepts Avancés et Limites',
      points: [
        {
          title: 'CoVe avec Recherche (Tool-Integrated CoVe)',
          description: 'Les implémentations les plus avancées utilisent un outil de recherche web pour répondre aux questions de vérification, augmentant encore la fiabilité',
        },
        {
          title: 'Limites du CoVe',
          description: 'Excellent pour les faits vérifiables, mais moins utile pour les questions de raisonnement pur, d\'opinion ou de créativité',
        },
        {
          title: 'Coût et Performance',
          description: 'Augmente le temps de réponse et le coût de la requête, car il demande plusieurs étapes de génération',
        },
      ],
    },
  ],
} satisfies Concept

export default concept
