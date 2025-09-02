// src/content/external-tools-new/z-ai.ts
import { ExternalTool, externalToolSchema } from '@/lib/content-schema';

const externalToolData = {
  "slug": "z-ai",
  "title": "Zhipu AI (Chat Z.AI) : L'IA Open-Source et Gratuite",
  "description": "Explorez Chat Z.AI, la plateforme de Zhipu AI qui donne accès au puissant modèle open-source GLM-4.5 et à une suite d'outils de création impressionnants, le tout gratuitement.",
  "difficulty": "intermédiaire",
  "tags": [],
  "isFavorite": false,
  "keyTakeaways": [],
  "conceptSlugs": [],
  "url": "https://chat.z.ai/",
  "category": "Suite créative",
  "capabilities": [],
  "use_cases": [
    "Création de présentations",
    "Génération de schémas",
    "Projets créatifs"
  ],
  "color": "bg-purple-500",
  "tldr": "Suite créative complète gratuite avec GLM-4.5. Génération de présentations, schémas et projets visuels. Alternative innovante aux outils classiques.",
  "content": [
    {
      "type": "markdown",
      "content": "## Qu'est-ce que Zhipu AI (Chat Z.AI) ?\n\nZhipu AI est une entreprise de recherche en intelligence artificielle qui, à l'instar de DeepSeek et Alibaba, mise fortement sur l'**open-source**. Sa plateforme web, **Chat Z.AI**, est l'interface qui permet au grand public d'accéder gratuitement à ses modèles de pointe, notamment la famille GLM.\n\nC'est une plateforme particulièrement intéressante pour les étudiants car elle combine un modèle de langage très performant avec des outils créatifs uniques, sans aucune barrière financière.\n\n## Le Modèle GLM-4.5 (Prévisions 2025)\n\nLe moteur de Chat Z.AI est le modèle **GLM-4.5**, une IA open-source unifiée sortie en juillet 2025 :\n\n- **Architecture :** *Mixture-of-Experts (MoE)* avec 355 milliards de paramètres, ce qui le place parmi les modèles open-source les plus grands et les plus performants.\n- **Contexte :** Une fenêtre de **128K tokens**, standard pour les modèles de cette génération, permettant l'analyse de documents volumineux.\n- **Performances :** Classé parmi les meilleurs modèles mondiaux, il excelle particulièrement dans l'appel d'outils et l'exécution de tâches complexes (agentique).\n- **Modes Hybrides :** Il dispose d'un mode \"thinking\" pour le raisonnement complexe et d'un mode \"non-thinking\" pour des réponses rapides et directes.\n\n## Une Suite d'Outils \"Créateur\" Gratuite\n\nChat Z.AI se distingue par sa suite d'outils orientés \"création\", tous disponibles gratuitement (en date d'août 2025) :\n\n- **AI Slides (Création de Présentations) :**\n  - Un agent capable de créer une présentation complète (type PowerPoint) à partir d'un simple prompt.\n  - Il effectue sa propre recherche web pour trouver le contenu et les images.\n  - La présentation est générée en HTML, ce qui la rend universellement accessible.\n\n- **Web Search Avancée :**\n  - Un moteur de recherche qui simule une approche \"humaine\", collectant et synthétisant l'information de manière très naturelle.\n\n- **Fullstack & Web Design :**\n  - Des agents capables de générer des applications web entières, du *frontend* (interface) au *backend* (logique serveur) et à la base de données, à partir d'instructions en langage naturel.\n\n- **Code & Artefacts Autonomes :**\n  - L'IA peut générer du code exécutable (Python, JS) pour créer de mini-jeux, des simulations physiques ou des graphiques SVG complexes.\n\n## Avantages et Inconvénients\n\n| Avantages | Inconvénients |\n| :--- | :--- |\n| ✅ **Totalement Gratuit :** Accès sans restriction au modèle GLM-4.5 et à tous les outils. | ⚠️ **Risque de Confidentialité Élevé :** Comme pour les autres plateformes gratuites hébergées en Asie, la prudence est de mise. N'utilisez aucune donnée sensible. |\n| ✅ **Suite d'Outils Uniques :** La génération de slides et le développement full-stack sont des différenciants majeurs. | ⚠️ **Moins Axé Recherche Académique :** Contrairement à Perplexity, l'accent est mis sur la création plutôt que sur la recherche sourcée. |\n| ✅ **Très Performant en \"Agentique\" :** Le modèle est excellent pour exécuter des tâches en plusieurs étapes. | |\n| ✅ **Open-Source :** Le modèle de base (GLM-4.5) est transparent et auditable par la communauté. | |\n\n## Conclusion\n\nChat Z.AI est un outil fantastique pour les étudiants qui ont besoin de **créer des livrables concrets**. Besoin de faire une présentation sur une nouvelle classe de médicaments ? L'agent \"AI Slides\" peut générer une première version en quelques minutes. Envie de créer une petite application web pour simuler une interaction médicamenteuse ? L'agent \"Fullstack\" peut vous aider.\n\nBien qu'il ne soit peut-être pas le premier choix pour une revue de littérature scientifique rigoureuse (Perplexity reste le roi dans ce domaine), sa puissance et sa polyvalence en font un allié de choix pour de nombreux projets universitaires, à condition de rester extrêmement vigilant sur la confidentialité des données partagées."
    }
  ]
};

// Validation et export
export const externalTool: ExternalTool = externalToolSchema.parse(externalToolData);