import type { Workflow } from '@/lib/content-schema/workflow'

const workflow = {
  slug: 'analyse-pharmacovigilance',
  title: 'Le Comité d\'Experts IA pour l\'Analyse de Pharmacovigilance',
  description: 'Un workflow avancé utilisant un système multi-agents pour analyser un signal de pharmacovigilance sous plusieurs angles et éviter les conclusions hâtives.',
  area: 'recherche-et-veille',
  tags: ['pharmacovigilance', 'multi-agent', 'imputabilité', 'biais', 'causalité'],
  isFavorite: false,
  cover: '/images/objectifs/recherche-biblio-apres.png',

  content: [
    {
      type: 'introduction',
      title: 'Le Problème : Corrélation n\'est pas Causalité',
      content: 'Analyser un signal de pharmacovigilance est l\'une des tâches les plus complexes. Le principal danger est de conclure à un lien de causalité à partir d\'une simple corrélation statistique. Les IA excellent pour trouver des associations dans de grands volumes de données, mais elles sont structurellement incapables de prouver une causalité. Demander à une IA "Est-ce que ce médicament cause cet effet ?" est une erreur méthodologique fondamentale qui peut conduire à de mauvaises conclusions.',
    },
    {
      type: 'section',
      title: 'La Stratégie Optimisée : Simuler un Comité d\'Experts',
      content: [
        {
          type: 'markdown',
          content: 'Plutôt que de poser une question directe, nous allons utiliser une approche de **système multi-agents**. Nous demandons à l\'IA de simuler un comité d\'experts où chaque "agent" a une expertise spécifique et analyse le problème sous un angle différent. L\'objectif est de structurer le raisonnement de l\'IA, de réduire les biais et de rendre son processus de "pensée" plus transparent.',
        },
        {
          type: 'alert',
          variant: 'default',
          title: 'La Puissance de la Perspective Forcée',
          content: 'En obligeant l\'IA à endosser des rôles contradictoires (par exemple, un qui cherche à prouver le lien, un autre qui cherche à l\'infirmer), on la force à une analyse plus nuancée et exhaustive. La conclusion n\'est plus une simple affirmation, mais une synthèse pondérée des arguments de chaque expert.',
        },
      ],
    },
    {
      type: 'section',
      title: 'Le Prompt Final (à adapter)',
      content: [
        {
          type: 'code-block',
          language: 'markdown',
          code: `
# CONTEXTE
Je suis un étudiant en pharmacie analysant un signal potentiel de pharmacovigilance. Mon objectif n\'est pas d\'obtenir une réponse définitive, mais de structurer une analyse complète et nuancée en utilisant les critères d\'imputabilité comme guide. Je suis conscient de la différence fondamentale entre corrélation et causalité.

# RÔLE
Tu vas agir comme un comité d\'experts en pharmacovigilance, composé de 4 agents distincts. Tu dois décomposer ton analyse en suivant les interventions de chaque agent, l\'un après l\'autre. Ne fournis pas une seule réponse unifiée, mais une discussion structurée entre les experts.

# LES EXPERTS

1.  **Le Pharmacologue :** Son rôle est d\'évaluer la plausibilité biologique. Se concentre sur le mécanisme d\'action du médicament et la physiopathologie de l\'effet indésirable. Sa question est : "Le lien est-il plausible sur le plan mécanistique ?"
2.  **L\'Épidémiologiste :** Son rôle est d\'analyser la force de l\'association à partir des données disponibles (études de cas, essais cliniques, bases de données). Il cherche des preuves statistiques, des facteurs de confusion potentiels. Sa question est : "Les données montrent-elles une corrélation statistiquement significative et robuste ?"
3.  **Le Clinicien :** Son rôle est d\'évaluer la chronologie et la sémiologie. Il analyse la séquence temporelle (délai d\'apparition, effet de-challenge / re-challenge). Sa question est : "Le tableau clinique est-il compatible avec une origine médicamenteuse ?"
4.  **L\'Avocat du Diable :** Son rôle est de systématiquement challenger les conclusions des autres. Il recherche activement des causes alternatives, des biais dans les données, des explications alternatives. Sa question est : "Sommes-nous certains que ce n\'est pas autre chose ?"

# INSTRUCTIONS

1.  **Introduction :** Commence par reformuler le problème à analyser.
2.  **Tour de Table :** Fais intervenir chaque expert, l\'un après l\'autre, dans l\'ordre. Chaque intervention doit commencer par le nom de l\'expert en gras (ex: **Le Pharmacologue :**).
3.  **Synthèse Finale :** Après le tour de table, rédige une conclusion prudente et nuancée. Cette synthèse doit refléter les points de vue de chaque expert, souligner les certitudes et (surtout) les incertitudes. Elle ne doit jamais affirmer une causalité certaine, mais plutôt évaluer un niveau de présomption.

# PROBLÈME À ANALYSER
Voici le signal que je veux analyser :

<signal>
Je suspecte un lien entre le médicament {{nom_medicament}} et l\'apparition de {{effet_indesirable}}.

Voici les informations dont je dispose :
- **Mécanisme du médicament :** {{mecanisme_action}}
- **Données disponibles :** {{donnees_disponibles}}
- **Description du cas typique :** {{description_cas}}
</signal>
`,
        },
      ],
    },
    {
      type: 'conclusion',
      title: 'Ce qu\'il faut retenir : L\'IA comme Outil de Structuration',
      content: 'Ce workflow illustre un usage avancé et sécurisé de l\'IA pour un problème critique. Nous ne lui demandons pas la réponse, nous l\'utilisons pour appliquer un cadre d\'analyse rigoureux. En décomposant le problème en sous-questions et en forçant l\'IA à adopter des perspectives multiples, nous nous approprions son processus de raisonnement et nous gardons la main sur l\'interprétation finale. C\'est un exemple parfait de l\'IA comme levier pour l\'esprit critique, et non comme substitut.',
    },
  ],
} satisfies Workflow

export default workflow
