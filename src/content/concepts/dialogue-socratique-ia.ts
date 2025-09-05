import type { Concept } from '@/lib/content-schema'

const concept = {
  slug: 'dialogue-socratique-ia',
  title: 'Le Dialogue Socratique avec une IA',
  description: 'Comment transformer une IA en un tuteur qui vous guide plutôt qu\'en une machine qui donne des réponses.',
  area: 'concepts',
  tags: ['ia', 'méthodologie', 'apprentissage', 'socratique'],
  isFavorite: true,
  cover: '/images/objectifs/fiche-revision-apres.png',

  content: [
    {
      type: 'introduction',
      title: 'Ne demandez plus la réponse, construisez-la',
      content: 'Le dialogue socratique est une méthode pédagogique où le tuteur ne donne pas de réponses directes, mais pose une série de questions pour amener l\'étudiant à construire son propre raisonnement. Appliquée à une IA, cette technique transforme un simple "moteur de réponse" en un puissant "partenaire de raisonnement".'
    },
    {
      type: 'analogy',
      title: 'L\'Analogie du Tuteur Personnel',
      content: 'Imaginez un tuteur qui, au lieu de vous donner la solution d\'un cas clinique, vous dit : "Intéressant. Quelle est ton hypothèse principale ? Quels éléments te font penser ça ? Y a-t-il une alternative ?". C\'est exactement le rôle que nous faisons jouer à l\'IA. L\'objectif n\'est pas la vitesse, mais la profondeur de votre propre apprentissage.'
    },
    {
      type: 'section',
      title: 'Les Bénéfices pour l\'Apprentissage',
      content: [
        {
          type: 'markdown',
          content: 'Adopter cette approche change radicalement votre interaction avec l\'IA :'
        },
        {
          type: 'card',
          title: 'Engagement Cognitif Actif',
          content: 'Vous n\'êtes plus un spectateur passif. C\'est à vous de réfléchir, de formuler des hypothèses et de les défendre. L\'IA n\'est qu\'un guide.'
        },
        {
          type: 'card',
          title: 'Développement de l\'Esprit Critique',
          content: 'En vous challengeant, l\'IA vous force à évaluer la solidité de vos propres arguments, à identifier les failles et à anticiper les objections.'
        },
        {
          type: 'card',
          title: 'Ancrage Mémoriel Durable',
          content: 'On retient beaucoup mieux ce que l\'on a découvert par son propre raisonnement que ce que l\'on a lu passivement. C\'est l\'apprentissage par la pratique.'
        }
      ]
    },
    {
      type: 'conclusion',
      title: 'Une Nouvelle Philosophie de Prompting',
      content: 'Cette méthode nécessite de changer sa façon de prompter. Au lieu de demander "Quelle est la prise en charge pour... ?", on commence par "Aidons-moi à raisonner sur... Pose-moi les bonnes questions pour commencer". C\'est une compétence clé pour faire de l\'IA un véritable levier pour vos études.'
    }
  ],
} satisfies Concept

export default concept
