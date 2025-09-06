import type { Concept } from '@/lib/content-schema'

export const concept = {
  slug: 'inference-causale-ia',
  title: 'L\'Inférence Causale et l\'IA',
  description: 'La limite fondamentale des IA actuelles : pourquoi trouver une corrélation n\'est pas prouver une causalité.',
  category: 'concepts',
  difficulty: 'intermédiaire',
  tags: ['ia', 'limitation', 'fiabilité', 'pharmacovigilance'],
  isFavorite: false,
  keyTakeaways: [
    'Les IA excellent pour trouver des corrélations mais ne peuvent pas prouver des liens de causalité.',
    'En pharmacovigilance, cette limite est critique : l\'IA peut aider à explorer des hypothèses mais pas à établir l\'imputabilité.',
    'Utilisez l\'IA pour organiser l\'information et appliquer des cadres méthodologiques, mais gardez le jugement humain pour la causalité.',
  ],

  content: [
    {
      type: 'introduction',
      title: 'Corrélation n\'est pas Causalité',
      content: 'C\'est l\'un des principes fondamentaux de la science, et c\'est la plus grande faiblesse des modèles de langage actuels (LLMs). L\'inférence causale est le processus qui permet de déterminer si une action est bien la **cause** d\'un effet. Les IA sont extraordinairement douées pour trouver des **corrélations** dans d\'immenses quantités de données, mais elles ne peuvent pas, par elles-mêmes, prouver un lien de cause à effet.',
    },
    {
      type: 'analogy',
      title: 'L\'Analogie de la Crème Solaire et des Noyades',
      content: 'Une IA analysant des données estivales pourrait conclure : "Les ventes de crème solaire sont fortement corrélées aux nombres de noyades." La corrélation est statistiquement vraie. Mais la crème solaire ne cause pas la noyade. Le facteur causal caché (la "variable de confusion") est la chaleur et le soleil, qui poussent les gens à acheter de la crème ET à se baigner (augmentant le risque de noyade). Un LLM seul a beaucoup de mal à faire ce type de raisonnement.',
    },
    {
      type: 'section',
      title: 'Pourquoi est-ce Critique en Pharmacovigilance ?',
      content: 'Dans l\'analyse d\'un effet indésirable, la question n\'est pas de savoir si l\'effet est *associé* au médicament, mais s\'il est *causé* par lui. C\'est ce qu\'on appelle l\'imputabilité.\n\n**Le Risque de Fausse Imputation**\nUne IA peut trouver dans la littérature 50 cas où le médicament A a été donné à des patients qui ont développé l\'effet B. Mais elle ne peut pas savoir si ces patients n\'avaient pas tous une autre maladie (facteur de confusion) qui est la vraie cause de l\'effet B.\n\n⚠️ **Ne Jamais Conclure à la Causalité sur la Base d\'une IA Seule**\nLa sortie d\'une IA peut être une excellente base pour **explorer des hypothèses**, mais ne doit jamais être utilisée comme une preuve de causalité. Le jugement humain et l\'application de cadres méthodologiques rigoureux (comme les critères de Bradford Hill ou l\'échelle de Naranjo) restent indispensables.',
    },
    {
      type: 'conclusion',
      title: 'Une Utilisation Intelligente et Sécurisée',
      content: 'Conscient de cette limite, on peut utiliser l\'IA de manière plus intelligente. Au lieu de lui demander "Est-ce que ce médicament a causé cet effet ?", on peut lui demander de nous aider à appliquer un cadre d\'analyse. Par exemple, en simulant un comité d\'experts où chaque agent évalue un aspect spécifique (plausibilité biologique, chronologie, etc.), on utilise l\'IA pour ce qu\'elle fait le mieux : organiser l\'information et la structurer, tout en gardant le jugement final sur la causalité.',
    },
  ],
} satisfies Concept

export default concept
