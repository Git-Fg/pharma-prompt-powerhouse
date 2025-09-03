import { Guide, guideSchema } from '@/lib/content-schema';

const guideData = {
  "slug": "obtenir-donnees-fiables",
  "title": "Méthodologie de Recherche Bibliographique avec l'IA",
  "description": "Apprenez les principes universels pour obtenir des données fiables avec n'importe quel outil d'IA : méthode PICO, analyse critique des sources et techniques anti-hallucination.",
  "icon": "ShieldCheck",
  "category": "recherche",
  "difficulty": "intermédiaire",
  "estimatedTime": "15 min",
  "tags": [],
  "isFavorite": false,
  "keyTakeaways": [
    "La qualité de votre question (méthode PICO) est plus importante que l'outil utilisé.",
    "Ne faites jamais confiance à la synthèse de l'IA sans vérifier vous-même les sources primaires.",
    "Utilisez les outils IA comme des assistants de recherche surpuissants, pas comme des oracles infaillibles."
  ],
  "conceptSlugs": ["hallucination-effet-indesirable"],
  "isWorkflow": false,
  "content": [
    {
      "type": "markdown",
      "content": "## Le Principe Fondamental : Vous êtes le Chercheur, l'IA est l'Assistant\n\nL'erreur la plus commune est de déléguer son esprit critique à l'IA. Ce guide vous apprend à utiliser l'IA pour décupler votre efficacité de recherche, tout en renforçant votre rigueur scientifique."
    },
    {
      "type": "alert",
      "variant": "destructive",
      "title": "Attention : L'Hallucination",
      "content": "Le plus grand risque est l'hallucination de l'IA. L'IA peut inventer des faits ou des sources de manière très convaincante."
    },
    {
      "type": "conceptRecommendation",
      "slug": "hallucination-effet-indesirable",
      "reason": "Ce concept est la base de toute utilisation sécurisée de l'IA pour la recherche."
    },
    {
      "type": "markdown",
      "content": "## Étape 1 : Formuler une Question de Recherche Efficace (Méthode PICO)\n\nUne question précise est la clé. Le framework PICO est parfait pour cela :\n- **P**atient/Problème\n- **I**ntervention\n- **C**omparaison\n- **O**utcome (Résultat)\n\n**Exemple :**\n*Au lieu de :* `\"infos sur les nouveaux traitements du diabète\"`\n*Préférez :* `\"Chez les patients DT2 (P), quel est l'impact des inhibiteurs de SGLT2 (I) vs placebo (C) sur les événements cardiovasculaires majeurs (O) ?\"`"
    },
    {
      "type": "markdown",
      "content": "## Étape 2 : Choisir le Bon Type d'Outil\n\nPour la recherche, privilégiez les outils basés sur le **RAG (Retrieval-Augmented Generation)**. Ils cherchent l'information sur le web *avant* de générer une réponse, et citent leurs sources."
    },
    {
      "type": "toolRecommendation",
      "slug": "perplexity-ai",
      "reason": "C'est l'exemple type de moteur de réponse RAG, conçu pour la recherche sourcée."
    },
    {
      "type": "toolRecommendation",
      "slug": "z-ai",
      "reason": "Utilise une approche de recherche planifiée avancée, une alternative puissante au RAG classique."
    },
    {
      "type": "markdown",
      "content": "## Étape 3 : L'Analyse Critique des Sources (Votre Vraie Valeur Ajoutée)\n\nC'est l'étape la plus importante et non-délégable.\n\n1.  **Cliquez sur les Sources :** Ne lisez JAMAIS une synthèse sans ouvrir les liens [1], [2]...\n2.  **Évaluez la Qualité de la Source :** Est-ce une méta-analyse du NEJM, un essai randomisé, ou un article de blog ?\n3.  **Lisez l'Abstract et les Conclusions :** Vérifiez si la synthèse de l'IA correspond à la conclusion des auteurs.\n4.  **Cherchez les Biais :** L'IA a-t-elle omis une limitation importante mentionnée dans l'article source ?"
    },
    {
      "type": "markdown",
      "content": "## Conclusion : Un Workflow en Boucle\nVotre travail de recherche devient une boucle vertueuse :\n\n`Question PICO -> IA (Recherche) -> Analyse Critique des Sources -> Affinement de la Question -> IA (Recherche plus ciblée) ...`\n\nEn maîtrisant ce processus, vous utilisez l'IA pour ce qu'elle fait de mieux (scanner et synthétiser des volumes massifs de données) tout en gardant ce que vous faites de mieux : l'analyse critique et le jugement expert."
    }
  ]
};

// Validation et export
export const guide: Guide = guideSchema.parse(guideData);