import type { ExternalTool } from '@/lib/content-schema';

const externalTool = {
  slug: "chatgpt",
  title: "ChatGPT",
  description: "L'interface de chat d'OpenAI, mon point d'entrée pour l'IA et un excellent outil polyvalent.",
  url: "https://chatgpt.com/",
  category: "outils",
  tags: ["conversationnel", "rédaction", "openai"],
  isFavorite: false,
  
  personalReview: "ChatGPT est mon outil de tous les jours. C'est la première IA que j'ai utilisée et elle reste ma référence pour le brainstorming, la rédaction rapide et l'expérimentation de nouvelles idées. Sa capacité à maintenir une conversation fluide en fait un excellent partenaire pour affiner un prompt de manière itérative.",

  strongPoints: [
    "Interface de chat très intuitive et facile à prendre en main.",
    "Excellent pour les tâches créatives, la reformulation et le brainstorming.",
    "Vaste écosystème de GPTs (version payante) pour des tâches spécialisées.",
    "La mémoire conversationnelle permet d'améliorer les réponses pas à pas.",
  ],

  vigilancePoints: [
    "La version gratuite utilise des modèles moins puissants et peut être limitée.",
    "Peut parfois être trop verbeux ou 'scolaire' dans ses réponses.",
    "Les fonctionnalités les plus puissantes (analyse de PDF avancée, GPTs) sont payantes.",
    "Comme tout outil cloud, la prudence est de mise avec les données que l'on soumet.",
  ],

  confidenceScore: 4,
  confidenceJustification: "Le score est élevé car c'est un produit mature d'un acteur majeur. Sa politique de confidentialité est claire (et on peut désactiver l'entraînement sur nos données). La version payante est très fiable, mais la version gratuite peut être moins performante.",

  freeVsPaidOffer: `| Fonctionnalité | Version Gratuite | Version Payante (Plus) |\n| :--- | :--- | :--- |\n| **Modèle principal** | GPT-4o mini / GPT-5 (limité) | ✅ **GPT-5 (étendu)** |\n| **Analyse de PDF** | Limitée | ✅ **Avancée (OCR)** |\n| **GPTs personnalisés**| ❌ Non | ✅ **Accès illimité** |\n| **Génération d'images**| ❌ Non | ✅ **Intégrée** |`,

  content: [
    {
      type: "card",
      title: "Quand est-ce que j'utilise ChatGPT ?",
      content: "J'utilise ChatGPT principalement pour :\n- **Obtenir des réponses rapides** sur des sujets généraux.\n- **Brainstormer** des idées pour un exposé ou un mémoire.\n- **Rédiger** des ébauches de textes, des emails ou des résumés.\n- **Traduire** des articles ou des documents de manière rapide.\n- **Dialoguer** avec l'IA pour affiner un prompt étape par étape (optimisation itérative)."
    },
    {
      type: "alert",
      variant: "default",
      title: "ChatGPT vs. OpenAI Playground : Mon Utilisation",
      content: "Pour moi, **ChatGPT** est un **produit fini**, une application que j'utilise pour accomplir des tâches. **OpenAI Playground** est mon **laboratoire**, un outil d'expérimentation pour comprendre le fonctionnement des modèles et construire des prompts sur mesure. La maîtrise commence sur ChatGPT, mais l'expertise se développe dans le Playground."
    }
  ]
} satisfies ExternalTool;

export { externalTool };
