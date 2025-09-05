import type { Concept } from '@/lib/content-schema'

const concept = {
  slug: 'desapprentissage-cognitif',
  title: 'Le Désapprentissage Cognitif (Deskilling)',
  description: 'Le risque de perdre ses compétences en déléguant trop de tâches cognitives à une intelligence artificielle.',
  area: 'concepts',
  tags: ['ia', 'biais', 'apprentissage', 'deskilling'],
  isFavorite: false,
  cover: '/images/objectifs/fiche-revision-avant.png',

  content: [
    {
      type: 'introduction',
      title: 'L\'Effet Secondaire de l\'Automatisation',
      content: 'Le désapprentissage cognitif, ou "deskilling" en anglais, est la perte progressive de compétences et de savoir-faire lorsqu\'une tâche est systématiquement déléguée à un système automatisé. C\'est un phénomène bien connu en aéronautique avec les pilotes automatiques, et il représente un risque majeur pour les étudiants qui utilisent l\'IA.'
    },
    {
      type: 'analogy',
      title: 'L\'Analogie du Calcul Mental et de la Calculatrice',
      content: 'Dans les années 80, l\'arrivée des calculatrices a fait craindre que les élèves ne sachent plus faire de calcul mental. Avec l\'IA, le risque est démultiplié : ce n\'est plus seulement le calcul que l\'on délègue, mais la structuration d\'un argument, la synthèse de documents, la formulation d\'hypothèses – le cœur même du raisonnement clinique et scientifique.'
    },
    {
      type: 'section',
      title: 'Concrètement, quelles compétences sont menacées ?',
      content: [
        {
          type: 'markdown',
          content: 'L\'utilisation passive de l\'IA peut atrophier plusieurs compétences clés pour un professionnel de santé :'
        },
        {
          type: 'card',
          title: 'Le Raisonnement Diagnostique',
          content: 'La capacité à partir de données brutes pour formuler et hiérarchiser des hypothèses. Si l\'IA le fait pour vous, vous n\'entraînez jamais ce muscle cognitif.'
        },
        {
          type: 'card',
          title: 'La Planification Thérapeutique',
          content: 'La compétence de concevoir une stratégie de prise en charge, d\'anticiper les risques et d\'ajuster le plan en fonction du patient. L\'IA peut le faire, mais c\'est à vous de l\'apprendre.'
        },
        {
          type: 'card',
          title: 'La Communication Scientifique',
          content: 'L\'art de structurer une argumentation, de rédiger une synthèse claire ou de présenter un cas. Si l\'IA génère systématiquement le texte, votre propre capacité à écrire et à argumenter s\'affaiblit.'
        }
      ]
    },
    {
      type: 'conclusion',
      title: 'Comment l\'Éviter : La Philosophie du "Tuteur Cognitif"',
      content: 'La seule façon de contrer le désapprentissage est de s\'assurer que l\'IA est utilisée comme un outil pour **améliorer** votre raisonnement, et non pour le remplacer. Les workflows de ce site sont en cours de refonte pour suivre cette philosophie. Des approches comme le dialogue socratique ou l\'agent "avocat du diable" sont spécifiquement conçues pour vous forcer à rester aux commandes du processus cognitif.'
    }
  ],
} satisfies Concept

export default concept
