import type { ExternalTool } from '@/lib/content-schema'

const externalTool = {
  slug: 'notebooklm',
  title: 'NotebookLM',
  description: 'Mon assistant de recherche personnel qui transforme mes documents en une base de connaissance interactive.',
  url: 'https://notebooklm.google.com/',
  category: 'recherche',
  tags: ['gratuit', 'google', 'rag', 'synthèse'],
  isFavorite: false,

  personalReview: 'J\'utilise NotebookLM pour tous mes projets de recherche de longue haleine. C\'est l\'outil parfait pour centraliser mes sources. Je crée un \'notebook\' par matière, j\'y télécharge mes cours en PDF, des articles, et mes notes. Ensuite, je peux littéralement \'discuter\' avec mes documents. C\'est un gain de temps phénoménal pour les révisions et la rédaction.',

  strongPoints: [
    'Crée un chatbot personnalisé et expert de VOS documents.',
    'Zéro risque d\'hallucination car les réponses sont basées uniquement sur les sources fournies.',
    'Cite précisément le passage de la source pour chaque affirmation.',
    'La fonction \'Audio Overview\' génère un podcast de révision de vos notes, ce qui est génial.',
    'Totalement gratuit et bien intégré à l\'écosystème Google.',
  ],

  vigilancePoints: [
    'La qualité des réponses dépend à 100% de la qualité des documents que vous fournissez.',
    'Pas de recherche web : l\'outil ne connaît que ce que vous lui donnez.',
    'La fonction de podcast audio est encore principalement optimisée pour l\'anglais.',
    'Confidentialité : vos documents sont analysés par les serveurs de Google.',
  ],

  confidenceScore: 4,
  confidenceJustification: 'Le score est élevé car l\'outil est très fiable dans son domaine (RAG sur documents). Le risque d\'hallucination est quasi nul. La politique de données est celle de Google, ce qui est un standard acceptable pour des données de cours anonymisées.',

  freeVsPaidOffer: `| Fonctionnalité | Offre Gratuite | Payant |\n| :--- | :--- | :--- |\n| **Nombre de Notebooks** | ✅ Illimité | N/A |\n| **Nombre de sources** | ✅ 50 par notebook | N/A |\n| **Taille des sources** | Généreuse | N/A |\n| **Audio Overview** | ✅ Inclus | N/A |`,

  content: [
    {
      type: 'card',
      title: 'Mon Workflow de Révision avec NotebookLM',
      content: '1. **Création :** Je crée un notebook par Unité d\'Enseignement (UE).\n2. **Alimentation :** Tout au long du semestre, j\'ajoute les PDFs des cours, les TD et mes fiches de révision.\n3. **Interrogation :** Avant un examen, je lui pose des questions transversales : *\'Compare les mécanismes d\'action des diurétiques selon mes différentes sources\'*.\n4. **Synthèse Audio :** Je génère l\' \'Audio Overview\' pour réviser passivement pendant mes trajets.',
    },
  ],
} satisfies ExternalTool

export { externalTool }
