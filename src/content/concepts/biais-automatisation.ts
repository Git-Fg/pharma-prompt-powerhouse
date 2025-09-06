import type { Concept } from '@/lib/content-schema'

export const concept = {
  slug: 'biais-automatisation',
  title: 'Le Biais d\'Automatisation',
  description: 'Le piège de la confiance excessive : quand l\'efficacité de l\'IA nous fait baisser notre garde et notre esprit critique.',
  category: 'concepts',
  difficulty: 'intermédiaire',
  tags: ['ia', 'biais', 'fiabilité', 'esprit-critique'],
  isFavorite: false,
  keyTakeaways: [
    'Le biais d\'automatisation est la tendance à trop faire confiance aux systèmes automatisés et à leurs résultats.',
    'Plus l\'IA est performante, plus on accepte ses conclusions sans vérification, même erronées.',
    'Ce biais est particulièrement dangereux pour les étudiants car il atrophie l\'esprit critique.',
    'La solution est de changer de posture : devenir le pilote, pas le passager de l\'IA.',
  ],
  content: [
    {
      type: 'markdown',
      content: '## Quand l\'Efficacité Devient un Piège',
    },
    {
      type: 'markdown',
      content: 'Le biais d\'automatisation est la tendance psychologique à trop faire confiance aux systèmes automatisés et à leurs résultats. Plus une IA est performante et semble "magique", plus nous avons tendance à accepter ses conclusions sans les vérifier, même si elles sont erronées.',
    },
    {
      type: 'card',
      title: 'L\'Analogie du GPS Clinique',
      content: 'C\'est comme suivre aveuglément son GPS, même quand la route semble manifestement mauvaise. Dans le domaine clinique, si une IA propose une analyse brillante pour 9 cas, nous sommes beaucoup plus susceptibles d\'accepter sans discuter sa conclusion pour le 10ème cas, même si elle est dangereusement fausse.',
    },
    {
      type: 'markdown',
      content: '## Pourquoi est-ce un Risque Majeur pour les Étudiants ?',
    },
    {
      type: 'markdown',
      content: 'Ce biais est particulièrement insidieux dans le contexte de l\'apprentissage :',
    },
    {
      type: 'card',
      title: 'Atrophie de l\'Esprit Critique',
      content: 'À force de recevoir des réponses correctes et bien structurées, on perd l\'habitude de se poser des questions, de douter et de vérifier. La compétence fondamentale de l\'évaluation critique n\'est plus exercée.',
    },
    {
      type: 'card',
      title: 'Désapprentissage Cognitif (Deskilling)',
      content: 'Pire encore, en déléguant systématiquement le raisonnement à l\'IA, on risque de ne jamais acquérir ou même de perdre les compétences cognitives complexes que l\'on est censé développer pendant ses études.',
    },
    {
      type: 'alert',
      variant: 'destructive',
      title: 'Le Faux Sentiment de Compétence',
      content: 'Obtenir rapidement une bonne réponse donne l\'illusion de maîtriser un sujet, alors qu\'en réalité, on maîtrise seulement l\'art de poser une question à une machine. Le jour de l\'examen ou face à un vrai patient, cette illusion peut être dangereuse.',
    },
    {
      type: 'markdown',
      content: '## La Solution : Devenir le Pilote, pas le Passager',
    },
    {
      type: 'markdown',
      content: 'La meilleure défense contre ce biais est de changer de posture. N\'utilisez pas l\'IA comme un oracle qui vous donne la réponse, mais comme un partenaire de dialogue. C\'est vous qui devez garder le contrôle du raisonnement. Les méthodes comme le dialogue socratique sont conçues spécifiquement pour cela.',
    },
  ],
} satisfies Concept

export default concept
