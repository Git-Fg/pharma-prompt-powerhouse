import type { Workflow } from '@/lib/content-schema'

export const workflow = {
  slug: 'creer-flashcards-memorables',
  type: 'workflow',
  title: 'Le Générateur de Flashcards Actives',
  description: 'Un workflow pour créer des flashcards qui forcent la réflexion et l\'application, bien plus efficaces que de simples paires question/réponse.',
  category: 'creation-contenu',
  difficulty: 'intermédiaire',
  estimatedTime: '25 minutes',
  tags: ['flashcards', 'apprentissage', 'mémorisation', 'révision-active'],
  isFavorite: false,
  cover: '/images/objectifs/flashcards-apres.png',
  keyTakeaways: [
    'Les flashcards actives forcent la réflexion et l\'application plutôt que la simple mémorisation',
    'Varier les formats de questions (scénario clinique, comparaison, mécanistique, etc.) améliore l\'apprentissage en profondeur',
    'La qualité des flashcards est plus importante que la quantité pour une rétention efficace',
  ],

  content: [
    {
      type: 'introduction',
      title: 'Le Problème : Les Flashcards Passives ne Suffisent Pas',
      content: 'Le format classique de flashcard (Terme au recto, Définition au verso) est utile, mais limité. Il teste principalement la reconnaissance et la mémorisation brute. Pour un apprentissage en profondeur, il faut des flashcards qui nous obligent à **réfléchir, appliquer et connecter** les connaissances, pas seulement à les réciter. C\'est le principe de la révision active.',
    },
    {
      type: 'carousel',
      caption: 'L\'évolution des flashcards : de la mémorisation passive à l\'apprentissage actif',
      items: [
        {
          image: '/images/objectifs/fiche-revision-avant.png',
          title: 'Flashcard Passive Traditionnelle',
          description: 'Simple paire terme/définition qui teste seulement la reconnaissance.',
          alt: 'Flashcard traditionnelle recto verso avec terme et définition simple',
        },
        {
          image: '/images/objectifs/flashcards-apres.png',
          title: 'Flashcard Active Moderne',
          description: 'Flashcard avec scénario clinique qui force l\'application et la réflexion.',
          alt: 'Flashcard interactive avec cas clinique et questions d\'application',
        },
      ],
    },
    {
      type: 'section',
      title: 'La Stratégie Optimisée : Diversifier les Formats de Questions',
      content: 'L\'idée est de demander à l\'IA de se comporter comme un ingénieur pédagogique et de transformer une notion brute en une série de mini-exercices sous forme de flashcards. On va lui fournir une typologie de questions pour qu\'elle puisse varier les angles d\'attaque.',
    },
    {
      type: 'points',
      title: 'La Stratégie Optimisée : Diversifier les Formats de Questions',
      points: [
        {
          title: 'Flashcard de Scénario Clinique',
          description: '**Objectif :** Appliquer une connaissance dans un contexte. **Exemple :** "Un patient sous amiodarone se plaint de toux sèche. Quelle est votre première hypothèse et quel examen simple demandez-vous ?"',
        },
        {
          title: 'Flashcard de Comparaison',
          description: '**Objectif :** Distinguer des concepts proches. **Exemple :** "Quelles sont les 3 différences clés entre la maladie de Crohn et la rectocolite hémorragique en termes de localisation et de type d\'inflammation ?"',
        },
        {
          title: 'Flashcard "Pourquoi" ou "Comment" (Mécanistique)',
          description: '**Objectif :** Expliquer un mécanisme d\'action. **Exemple :** "Expliquez par quel mécanisme simple les IEC peuvent provoquer une toux sèche."',
        },
        {
          title: 'Flashcard "Avocat du Diable"',
          description: '**Objectif :** Challenger une idée reçue. **Exemple :** "Pourquoi l\'association Bêta-bloquant + Vérapamil est-elle généralement contre-indiquée, alors que les deux sont des anti-hypertenseurs ?"',
        },
      ],
    },
    {
      type: 'codeBlock',
      language: 'markdown',
      content: `# CONTEXTE
Je suis un étudiant en pharmacie qui prépare ses examens. Je veux créer des flashcards de révision active, conçues pour maximiser la rétention et la compréhension en profondeur. Je vais utiliser le logiciel Anki, donc je veux une sortie au format CSV (recto;verso).

# RÔLE
Tu es un ingénieur pédagogique spécialisé dans les sciences cognitives. Ton but est de transformer un sujet complexe en une série de questions de révision active qui forcent la réflexion, l'application et la connexion des connaissances.

# INSTRUCTIONS

1.  **Analyser le sujet :** Commence par analyser le sujet que je te donne : \`{{sujet_de_la_lecon}}\`.
2.  **Générer 5 à 7 flashcards :** Crée entre 5 et 7 flashcards pour ce sujet.
3.  **Varier les formats :** Utilise au moins 3 des formats suivants pour les questions (le recto de la carte) :
    *   **Scénario Clinique :** Une mini-étude de cas.
    *   **Comparaison :** Mettre en évidence les différences/ressemblances entre deux concepts.
    *   **Mécanistique :** Questionner le "pourquoi" ou le "comment".
    *   **Avocat du Diable :** Challenger une idée ou une règle.
    *   **Définition simple :** Une question directe (à utiliser avec parcimonie).
4.  **Des réponses concises :** Le verso de la carte doit être clair, concis et aller droit au but.
5.  **Format de sortie :** Présente le résultat sous forme de liste de points, où chaque point est une ligne au format \`Recto de la carte;Verso de la carte\`.

# SUJET
Le sujet à transformer en flashcards est le suivant :

<sujet>
{{sujet_de_la_lecon}}
</sujet>`,
    },
    {
      type: 'conclusion',
      title: 'Ce qu\'il faut retenir : La Qualité plutôt que la Quantité',
      content: 'Ce workflow prend un peu plus de temps que de simplement copier-coller son cours. Cependant, créer 10 flashcards actives de ce type est infiniment plus rentable sur le plan cognitif que d\'en créer 50 qui ne font que gratter la surface de la connaissance. C\'est un investissement qui paie le jour de l\'examen, où la capacité à appliquer et à raisonner est bien plus importante que la simple mémorisation.',
    },
  ],
} satisfies Workflow

export default workflow
