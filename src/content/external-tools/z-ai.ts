import type { ExternalTool } from '@/lib/content-schema'

const externalTool = {
  slug: 'z-ai',
  title: 'Chat Z.AI',
  description: 'Mon outil de recherche N°1, une suite créative gratuite qui surpasse souvent les alternatives payantes.',
  url: 'https://chat.z.ai/',
  category: 'suite-creative',
  tags: ['gratuit', 'recherche', 'présentations', 'GLM-4.5'],
  isFavorite: true,

  personalReview: 'Z.AI est le deuxième pilier de mon \'Core Kit\' quotidien. J\'ai été bluffé par la qualité de son agent de recherche. Au lieu de simplement chercher et résumer (RAG), il planifie sa recherche, ce qui donne des résultats beaucoup plus cohérents et approfondis. Pour la création de présentations, son outil \'AI Slides\' est magique : je donne un sujet, et il fait la recherche et la mise en page. C\'est un outil que j\'utilise presque tous les jours.',

  strongPoints: [
    'Totalement gratuit, sans inscription ni carte bancaire.',
    'Agent de recherche \'planifié\' qui, d\'après mon expérience, surpasse souvent Perplexity.',
    'Suite créative complète (recherche, slides, dev web) intégrée.',
    'Le modèle GLM-4.5 est l\'un des plus performants au monde.',
    'La génération de présentations est incroyablement rapide et efficace.',
  ],

  vigilancePoints: [
    '**Risque de confidentialité très élevé.** Plateforme basée en Asie. Je n\'y traite aucune information sensible.',
    'Peut parfois être instable ou indisponible (rançon de la gratuité).',
    'Moins connu, donc moins de retours de la communauté.',
  ],

  confidenceScore: 2,
  confidenceJustification: 'Le score est bas **uniquement à cause du risque majeur de confidentialité**. Sur le plan technique, cet outil mériterait 5/5. Il est puissant et incroyablement utile. C\'est un outil de productivité exceptionnel, à condition de l\'utiliser exclusivement pour des tâches non confidentielles, comme la préparation de cours à partir de sources publiques.',

  freeVsPaidOffer: `| Fonctionnalité | Offre Gratuite | Payant |\n| :--- | :--- | :--- |\n| **Accès au modèle GLM-4.5** | ✅ Complet | N/A |\n| **Recherche web avancée** | ✅ Illimitée | N/A |\n| **Création de présentations** | ✅ Illimitée | N/A |\n| **Développement web** | ✅ Inclus | N/A |`,

  content: [
    {
      type: 'alert',
      variant: 'default',
      title: '🏆 Mon choix pour la recherche et la création',
      content: 'Pour toute recherche qui ne contient aucune donnée sensible, Z.AI est mon premier choix. Son workflow de recherche planifiée est plus transparent et, à mon avis, plus fiable que celui de Perplexity. La capacité à transformer cette recherche en une présentation en un clic est un gain de temps énorme.',
    },
  ],
} satisfies ExternalTool

export { externalTool }
