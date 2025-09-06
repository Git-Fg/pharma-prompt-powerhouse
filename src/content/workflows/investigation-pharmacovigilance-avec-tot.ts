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

  content: [
    {
      type: 'introduction',
      title: 'Le Défi',
      content: 'Vous êtes le pharmacien responsable de la pharmacovigilance dans un hôpital. Vous recevez 3 notifications en une semaine pour des cas d\'hépatite aiguë chez des patients traités par un nouveau médicament, le "Novamab". \n\n**Le problème :** Face à un signal de sécurité, il faut explorer méthodiquement toutes les hypothèses possibles sans en oublier. Un raisonnement linéaire risque de passer à côté de causes importantes.',
    },
    {
      type: 'conceptRecommendation',
      slug: 'tree-of-thought',
      reason: 'Ce guide est une application directe et pratique du concept de Tree-of-Thought à un cas réel de pharmacie.',
    },
    {
      type: 'section',
      title: 'Mon Approche Initiale',
      content: 'Au début, j\'aurais demandé directement :\n\n> *"Analyse cette situation de pharmacovigilance et dis-moi quelle est la cause probable."*\n\n**Résultat :** Une réponse linéaire qui se concentre sur l\'hypothèse la plus évidente, sans exploration systématique des alternatives.',
    },
    {
      type: 'alert',
      variant: 'destructive',
      title: 'Pourquoi ça ne marche pas',
      content: 'L\'IA, comme un humain, peut avoir des biais de confirmation. Elle va privilégier la première hypothèse plausible sans explorer méthodiquement les autres pistes.',
    },
    {
      type: 'section',
      title: 'Ma Stratégie Optimisée avec Tree-of-Thought',
      content: 'Le Tree-of-Thought force l\'IA à explorer systématiquement plusieurs branches d\'hypothèses. Cette méthode utilise la **structuration par balises** pour organiser les données.',
    },
    {
      type: 'conceptRecommendation',
      slug: 'structuration-par-balises',
      reason: 'L\'utilisation de balises XML permet de structurer clairement les données de pharmacovigilance et d\'améliorer la précision de l\'analyse.',
    },
    {
      type: 'actionChecklist',
      title: 'Les 3 Étapes Clés du Tree-of-Thought',
      description: 'Mon workflow pour une investigation structurée',
      items: [
        {
          id: 'etape1-structure',
          title: 'Étape 1 : Structurer les faits',
          description: 'Utilisez des balises XML pour clarifier les données : signal observé, informations patient, données temporelles, facteurs confondants potentiels.',
          priority: 'high',
        },
        {
          id: 'etape2-branches',
          title: 'Étape 2 : Définir les branches d\'investigation',
          description: 'Forcez l\'exploration de plusieurs hypothèses : toxicité intrinsèque du médicament, interaction médicamenteuse, problème de qualité, facteur patient.',
          priority: 'high',
        },
        {
          id: 'etape3-synthese',
          title: 'Étape 3 : Demander une synthèse hiérarchisée',
          description: 'Exigez une conclusion structurée : classement des hypothèses par probabilité, plan d\'action priorisé, actions immédiates vs enquêtes à long terme.',
          priority: 'high',
        },
      ],
      variant: 'card',
      allowChecking: true,
    },
    {
      type: 'section',
      title: 'L\'Outil Idéal pour Cette Analyse',
      content: '',
    },
    {
      type: 'toolRecommendation',
      slug: 'google-ai-studio',
      reason: 'AI Studio excelle dans le raisonnement complexe. Son accès à Gemini 2.5 Pro et sa fenêtre de contexte étendue permettent de maintenir la cohérence à travers toutes les branches d\'analyse.',
    },
    {
      type: 'section',
      title: 'Le Prompt d\'Investigation Structurée',
      content: 'Voici le prompt complet qui transforme l\'IA en enquêteur méthodique :',
    },
    {
      type: 'codeBlock',
      language: 'xml',
      content: `<cas>
  <signal>
    <medicament_suspect>Novamab</medicament_suspect>
    <evenement_indesirable>Hépatite aiguë</evenement_indesirable>
    <nombre_de_cas>3</nombre_de_cas>
  </signal>
  <informations_complementaires>
    - Les 3 patients sont âgés (> 70 ans).
    - Les 3 patients prenaient du paracétamol en co-prescription.
    - Le lot A123 du Novamab est commun aux 3 cas.
  </informations_complementaires>
</cas>

<instructions>
Tu es un expert en pharmacovigilance. En te basant sur le \`<cas>\` ci-dessus, analyse la situation en suivant un raisonnement par arbre de pensée (Tree-of-Thought).

1. **Branche 1 (Toxicité intrinsèque) :** Évalue l'hypothèse que le Novamab est hépatotoxique par lui-même. Quels sont les arguments pour/contre ? Quelle action de vérification proposes-tu ?

2.  **Branche 2 (Interaction) :** Évalue l'hypothèse d'une interaction entre le Novamab et le paracétamol. Quels sont les arguments pour/contre ? Quelle action de vérification proposes-tu ?

3.  **Branche 3 (Problème qualité) :** Évalue l'hypothèse d'un défaut sur le lot A123. Quels sont les arguments pour/contre ? Quelle action de vérification proposes-tu ?

4.  **Synthèse :** Conclus en hiérarchisant les hypothèses de la plus probable à la moins probable, et propose un plan d'action final priorisé en 3 points.
</instructions>`,
    },
    {
      type: 'alert',
      variant: 'default',
      title: 'Résultat Attendu',
      content: 'Une réponse en texte (Markdown) bien structurée, qui suit votre plan d\'investigation, facile à lire et à utiliser.',
    },
    {
      type: 'keyTakeaways',
      points: [
        'Le Tree-of-Thought est un framework idéal pour les investigations complexes où plusieurs causes sont possibles.',
        'Structurez votre investigation en \'branches\' d\'hypothèses (toxicité, interaction, qualité) pour une analyse exhaustive.',
        'Utilisez le ToT pour générer un plan d\'action clair, en priorisant les vérifications et les mesures à prendre.',
      ],
      variant: 'featured',
      contentType: 'workflow',
    },
  ],

  keyTakeaways: [
    'Le Tree-of-Thought est un framework idéal pour les investigations complexes où plusieurs causes sont possibles.',
    'Structurez votre investigation en \'branches\' d\'hypothèses (toxicité, interaction, qualité) pour une analyse exhaustive.',
    'Utilisez le ToT pour générer un plan d\'action clair, en priorisant les vérifications et les mesures à prendre.',
  ],
} satisfies Workflow

export default workflow
