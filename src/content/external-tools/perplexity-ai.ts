import type { EnhancedExternalTool } from '@/lib/content-schema';

const externalTool = {
  slug: "perplexity-ai",
  title: "Perplexity AI",
  description: "Mon moteur de recherche IA de référence pour des réponses rapides, factuelles et surtout, sourcées.",
  url: "https://www.perplexity.ai/",
  category: "recherche",
  tags: ["recherche", "RAG", "sources"],
  isFavorite: false,
  
  personalReview: "J'utilise Perplexity comme mon 'Google' augmenté. Quand j'ai besoin d'une réponse rapide sur un sujet factuel et que je veux absolument vérifier les sources, c'est mon premier réflexe. La fonction 'Focus: Academic' est un gain de temps considérable pour mes recherches bibliographiques initiales.",

  strongPoints: [
    "Cite systématiquement ses sources, ce qui permet de vérifier l'information.",
    "Le mode 'Focus: Academic' filtre la recherche pour ne garder que les publications scientifiques.",
    "Très rapide et efficace pour obtenir une synthèse sur un sujet d'actualité.",
    "Moins sujet aux hallucinations sur les faits grâce à son approche RAG (recherche avant de répondre).",
  ],

  vigilancePoints: [
    "Le résumé peut parfois simplifier à l'extrême ou mal interpréter une source. Il faut toujours lire l'article original.",
    "Les capacités d'analyse de documents (PDF) sont limitées en version gratuite.",
    "Son approche de recherche est moins 'profonde' que celle d'outils comme Z.AI qui planifient leurs recherches.",
  ],
  
  confidenceScore: 3,
  confidenceJustification: "Score solide car l'outil est fiable pour sa mission principale : la recherche sourcée. Il n'est pas plus haut car son utilité est plus ciblée et il peut être surpassé par d'autres outils pour une analyse en profondeur ou une créativité avancée.",
  
  freeVsPaidOffer: `| Fonctionnalité | Version Gratuite | Version Pro (~20€/mois) |\n| :--- | :--- | :--- |\n| **Recherches Pro** | 5 par jour | ✅ 300+ par jour |\n| **Accès modèles premium** | ❌ Non | ✅ GPT-5, Gemini 2.5 Pro... |\n| **Analyse de fichiers** | Limitée | ✅ **Illimitée** |\n| **Deep Research** | ❌ Non | ✅ **Rapports autonomes** |`,

  content: [
    {
      type: "card",
      title: "Mon workflow de recherche avec Perplexity",
      content: "1. **Question initiale :** Je pose ma question de recherche avec le `Focus: Academic`.\n2. **Analyse des sources :** J'ouvre les 3-4 sources les plus pertinentes (souvent des articles PubMed ou des revues systématiques) dans de nouveaux onglets.\n3. **Validation :** Je lis les abstracts et conclusions pour m'assurer que le résumé de Perplexity est fidèle.\n4. **Approfondissement :** J'utilise ensuite un outil comme NotebookLM ou Claude.ai pour analyser en profondeur les PDF que j'ai trouvés."
    }
  ]
} satisfies EnhancedExternalTool;

export { externalTool };
