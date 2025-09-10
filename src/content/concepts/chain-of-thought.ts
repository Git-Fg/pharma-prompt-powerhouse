import type { Concept } from '@/lib/content-schema'

export const concept = {
  slug: 'chain-of-thought',
  type: 'concept',
  title: 'Chain-of-Thought (CoT)',
  description: 'Une technique fondamentale où l\'IA explicite son raisonnement étape par étape, améliorant la qualité et la traçabilité de ses réponses.',
  category: 'Concepts Fondamentaux',
  difficulty: 'intermédiaire',
  tags: ['raisonnement', 'étape-par-étape', 'fiabilisation', 'prompting'],
  isFavorite: true,
  keyTakeaways: [
    'Le Chain-of-Thought oblige l\'IA à montrer son raisonnement, ce qui améliore la qualité des réponses complexes.',
    'Cette technique est particulièrement efficace pour les problèmes de mathématiques, de logique et de raisonnement.',
    'Le CoT sert de base à de nombreuses techniques avancées comme le Tree-of-Thought et le Chain-of-Verification.',
    'En 2025, le CoT reste essentiel même pour les modèles les plus puissants pour éviter les raccourcis logiques.',
  ],
  conceptSlugs: [],
  content: [
    {
      type: 'keyTakeaways',
      points: [
        'Le Chain-of-Thought oblige l\'IA à montrer son raisonnement, ce qui améliore la qualité des réponses complexes.',
        'Cette technique est particulièrement efficace pour les problèmes de mathématiques, de logique et de raisonnement.',
        'Le CoT sert de base à de nombreuses techniques avancées comme le Tree-of-Thought et le Chain-of-Verification.',
        'En 2025, le CoT reste essentiel même pour les modèles les plus puissants pour éviter les raccourcis logiques.',
      ],
      variant: 'featured',
      contentType: 'concept',
    },
    {
      type: 'section',
      title: '1. L\'Analogie Simple : Le Professeur qui Montre ses Calculs',
      content: 'Imaginez un professeur de mathématiques qui non seulement vous donne la réponse finale, mais vous montre aussi toutes les étapes intermédiaires.',
      variant: 'analogy',
    },
    {
      type: 'actionChecklist',
      title: 'Processus de Résolution Mathématique',
      description: 'Comparaison entre réponse simple et Chain-of-Thought',
      items: [
        {
          id: 'question',
          title: 'La Question',
          description: '"Résolvez 15 × 23"',
          priority: 'medium',
        },
        {
          id: 'reponse-simple',
          title: 'La Réponse Simple',
          description: '"345"',
          priority: 'low',
        },
        {
          id: 'reponse-cot',
          title: 'La Réponse Chain-of-Thought',
          description: '"Pour résoudre 15 × 23, je vais décomposer : D\'abord, 15 × 20 = 300, Ensuite, 15 × 3 = 45, Finalement, 300 + 45 = 345, Donc la réponse est 345"',
          priority: 'high',
        },
      ],
      variant: 'card',
      allowChecking: true,
    },
    {
      type: 'section',
      title: '2. La Définition Formelle',
      content: 'Le Chain-of-Thought (CoT) est une technique de prompting qui encourage le modèle de langage à générer une réponse en explicitant chaque étape de son raisonnement.',
      variant: 'section',
    },
    {
      type: 'points',
      title: 'Bénéfices du Chain-of-Thought',
      points: [
        {
          title: 'Meilleure qualité',
          description: 'Le raisonnement étape par étape réduit les erreurs',
        },
        {
          title: 'Traçabilité',
          description: 'On peut suivre la logique et identifier où le modèle se trompe',
        },
        {
          title: 'Transparence',
          description: 'Le processus de décision est visible et vérifiable',
        },
        {
          title: 'Apprentissage',
          description: 'L\'utilisateur peut comprendre comment arriver à la solution',
        },
      ],
    },
    {
      type: 'codeBlock',
      language: 'text',
      filename: 'exemple-cot-simple.txt',
      content: `# Question
Un patient de 70 ans, 65 kg, sous warfarine (INR cible 2-3) présente une fibrillation auriculaire. 
Quelle dose de warfarine recommanderiez-vous pour commencer ?

# Instructions Chain-of-Thought
Raisonnez étape par étape en montrant :
1. L'analyse des facteurs de risque du patient
2. Les considérations pharmacocinétiques
3. La stratégie de dosage initiale
4. Le plan de surveillance

# Réponse attendue
[Première étape de raisonnement]
[Deuxième étape de raisonnement]
[Troisième étape de raisonnement]
[Conclusion avec dosage recommandé]`,
    },
    {
      type: 'section',
      title: '3. Pourquoi C\'est Fondamental en 2025',
      content: 'Contrairement à ce qu\'on pourrait penser, les modèles les plus puissants (GPT-5, Gemini 2.5) ont encore plus besoin du CoT.',
      variant: 'section',
    },
    {
      type: 'points',
      title: 'Pourquoi les Modèles Puissants Ont Besoin de CoT',
      points: [
        {
          title: 'Anti-raccourcis',
          description: 'Plus un modèle est puissant, plus il est tenté de prendre des raccourcis logiques',
        },
        {
          title: 'Canalement',
          description: 'Le CoT force le modèle à exploiter sa puissance de manière structurée',
        },
        {
          title: 'Fiabilité',
          description: 'Les modèles sans CoT ont un taux d\'erreur 2-3x plus élevé dans les domaines complexes',
        },
      ],
    },
    {
      type: 'table',
      headers: ['Métrique', 'Sans CoT', 'Avec CoT', 'Amélioration'],
      rows: [
        ['Taux d\'erreur (domaine médical)', '11.6%', '4.8%', '58% de réduction'],
        ['Complexité gérable', 'Moyenne', 'Élevée', '+200%'],
        ['Confiance dans la réponse', 'Modérée', 'Élevée', '+150%'],
      ],
    },
    {
      type: 'section',
      title: '4. Applications en Pharmacie',
      content: 'Le Chain-of-Thought est particulièrement utile pour les applications pharmaceutiques.',
      variant: 'examples',
    },
    {
      type: 'points',
      title: 'Applications Pharmaceutiques du CoT',
      points: [
        {
          title: 'Calculs de dosage',
          description: 'Montrer les étapes de calcul pour les posologies complexes',
        },
        {
          title: 'Analyse d\'interactions',
          description: 'Raisonner sur les mécanismes d\'interaction médicamenteuse',
        },
        {
          title: 'Diagnostic différentiel',
          description: 'Évaluer systématiquement les hypothèses diagnostiques',
        },
        {
          title: 'Pharmacocinétique',
          description: 'Expliquer le raisonnement sur l\'absorption, distribution, métabolisme, élimination',
        },
        {
          title: 'Conseil patient',
          description: 'Structurer les recommandations de manière logique',
        },
      ],
    },
    {
      type: 'section',
      title: '5. Bonnes Pratiques',
      content: 'Pour mettre en œuvre efficacement le Chain-of-Thought.',
      variant: 'key-points',
    },
    {
      type: 'actionChecklist',
      title: 'Bonnes Pratiques Chain-of-Thought',
      description: 'Checklist pour une mise en œuvre efficace du CoT',
      items: [
        {
          id: 'explicite',
          title: 'Soyez explicite',
          description: 'Demandez clairement \'raisonnez étape par étape\'',
          priority: 'high',
        },
        {
          id: 'structure',
          title: 'Structurez la réponse',
          description: 'Utilisez des numéros ou des tirets pour chaque étape',
          priority: 'high',
        },
        {
          id: 'verification',
          title: 'Vérifiez chaque étape',
          description: 'Demandez au modèle de valider son raisonnement intermédiaire',
          priority: 'medium',
        },
        {
          id: 'adaptation',
          title: 'Adaptez la complexité',
          description: 'Plus le problème est complexe, plus le CoT est nécessaire',
          priority: 'medium',
        },
      ],
      variant: 'card',
      allowChecking: true,
    },
  ],
} satisfies Concept

export default concept
