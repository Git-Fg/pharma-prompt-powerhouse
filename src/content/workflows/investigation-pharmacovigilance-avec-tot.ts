import type { Workflow } from '@/lib/content-schema'

export const workflow = {
  slug: 'investigation-pharmacovigilance-avec-tot',
  title: 'Analyser un Signal de Pharmacovigilance avec Tree-of-Thought',
  description: 'Apprenez à utiliser le Tree-of-Thought pour mener une investigation structurée et rigoureuse face à un signal de sécurité médicamenteuse.',
  icon: 'AlertTriangle',
  category: 'methodologie',
  difficulty: 'avancé',
  estimatedTime: '35 minutes',
  tags: [
    'clinique',
    'exemple-code',
    'guide',
    'pedagogie',
    'pharmacie',
    'pharmacovigilance',
    'tree-of-thought',
    'workflow',
  ],
  isFavorite: false,
  conceptSlugs: [
    'tree-of-thought',
  ],

  problem: [
    {
      type: 'markdown',
      content: '## Le Défi : Analyser un Signal de Pharmacovigilance Complexe\n\nVous êtes le pharmacien responsable de la pharmacovigilance dans un hôpital. Vous recevez 3 notifications en une semaine pour des cas d\'hépatite aiguë chez des patients traités par un nouveau médicament, le "Novamab". \n\n**Le problème :** Face à un signal de sécurité, il faut explorer méthodiquement toutes les hypothèses possibles sans en oublier. Un raisonnement linéaire risque de passer à côté de causes importantes.',
    },
    {
      type: 'conceptRecommendation',
      slug: 'tree-of-thought',
      reason: 'Ce guide est une application directe et pratique du concept de Tree-of-Thought à un cas réel de pharmacie.',
    },
  ],

  initialApproach: [
    {
      type: 'markdown',
      content: 'Au début, j\'aurais demandé directement :\n\n> *"Analyse cette situation de pharmacovigilance et dis-moi quelle est la cause probable."*\n\n**Résultat :** Une réponse linéaire qui se concentre sur l\'hypothèse la plus évidente, sans exploration systématique des alternatives.',
    },
    {
      type: 'alert',
      variant: 'destructive',
      title: 'Pourquoi ça ne marche pas',
      content: 'L\'IA, comme un humain, peut avoir des biais de confirmation. Elle va privilégier la première hypothèse plausible sans explorer méthodiquement les autres pistes.',
    },
  ],

  optimizedStrategy: [
    {
      type: 'markdown',
      content: '## Ma Stratégie Optimisée avec Tree-of-Thought\n\nLe Tree-of-Thought force l\'IA à explorer systématiquement plusieurs branches d\'hypothèses. Cette méthode utilise la **structuration par balises** pour organiser les données.',
    },
    {
      type: 'conceptRecommendation',
      slug: 'structuration-par-balises',
      reason: 'L\'utilisation de balises XML permet de structurer clairement les données de pharmacovigilance et d\'améliorer la précision de l\'analyse.',
    },
    {
      type: 'card',
      title: '🎯 Étape 1 : Structurer les Faits',
      content: '**Utilisez des balises XML pour clarifier les données :**\n- Signal observé\n- Informations patient\n- Données temporelles\n- Facteurs confondants potentiels',
    },
    {
      type: 'card',
      title: '🌳 Étape 2 : Définir les Branches d\'Investigation',
      content: '**Forcez l\'exploration de plusieurs hypothèses :**\n- Branche 1 : Toxicité intrinsèque du médicament\n- Branche 2 : Interaction médicamenteuse\n- Branche 3 : Problème de qualité (lot défectueux)\n- Branche 4 : Facteur patient (âge, comorbidités)',
    },
    {
      type: 'card',
      title: '⚖️ Étape 3 : Demander une Synthèse Hiérarchisée',
      content: '**Exigez une conclusion structurée :**\n- Classement des hypothèses par probabilité\n- Plan d\'action priorisé\n- Actions immédiates vs enquêtes à long terme',
    },
  ],

  toolComparison: [
    {
      type: 'markdown',
      content: '## L\'Outil Idéal pour Cette Analyse',
    },
    {
      type: 'toolRecommendation',
      slug: 'google-ai-studio',
      reason: 'AI Studio excelle dans le raisonnement complexe. Son accès à Gemini 2.5 Pro et sa fenêtre de contexte étendue permettent de maintenir la cohérence à travers toutes les branches d\'analyse.',
    },
  ],

  finalPrompt: [
    {
      type: 'markdown',
      content: '## Le Prompt d\'Investigation Structurée\n\nVoici le prompt complet qui transforme l\'IA en enquêteur méthodique :',
    },
    {
      type: 'codeBlock',
      language: 'xml',
      content: '<cas>\n  <signal>\n    <medicament_suspect>Novamab</medicament_suspect>\n    <evenement_indesirable>Hépatite aiguë</evenement_indesirable>\n    <nombre_de_cas>3</nombre_de_cas>\n  </signal>\n  <informations_complementaires>\n    - Les 3 patients sont âgés (> 70 ans).\n    - Les 3 patients prenaient du paracétamol en co-prescription.\n    - Le lot A123 du Novamab est commun aux 3 cas.\n  </informations_complementaires>\n</cas>\n\n<instructions>\nTu es un expert en pharmacovigilance. En te basant sur le `<cas>` ci-dessus, analyse la situation en suivant un raisonnement par arbre de pensée (Tree-of-Thought).\n\n1. **Branche 1 (Toxicité intrinsèque) :** Évalue l\'hypothèse que le Novamab est hépatotoxique par lui-même. Quels sont les arguments pour/contre ? Quelle action de vérification proposes-tu ?\n\n2.  **Branche 2 (Interaction) :** Évalue l\'hypothèse d\'une interaction entre le Novamab et le paracétamol. Quels sont les arguments pour/contre ? Quelle action de vérification proposes-tu ?\n\n3.  **Branche 3 (Problème qualité) :** Évalue l\'hypothèse d\'un défaut sur le lot A123. Quels sont les arguments pour/contre ? Quelle action de vérification proposes-tu ?\n\n4.  **Synthèse :** Conclus en hiérarchisant les hypothèses de la plus probable à la moins probable, et propose un plan d\'action final priorisé en 3 points.\n</instructions>',
    },
    {
      type: 'alert',
      variant: 'default',
      title: 'Résultat Attendu',
      content: 'Une réponse en texte (Markdown) bien structurée, qui suit votre plan d\'investigation, facile à lire et à utiliser.',
    },
  ],

  keyTakeaways: [
    'Le Tree-of-Thought est un framework idéal pour les investigations complexes où plusieurs causes sont possibles.',
    'Structurez votre investigation en \'branches\' d\'hypothèses (toxicité, interaction, qualité) pour une analyse exhaustive.',
    'Utilisez le ToT pour générer un plan d\'action clair, en priorisant les vérifications et les mesures à prendre.',
  ],
} satisfies Workflow

export default workflow
