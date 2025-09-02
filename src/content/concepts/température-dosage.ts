// src/content/concepts-new/température-dosage.ts
import { Concept, conceptSchema } from '@/lib/content-schema';

const conceptData = {
  "slug": "température-dosage",
  "title": "La Température : Le Dosage de la Créativité de l'IA",
  "description": "Découvrez comment le paramètre de température influence la créativité et la prévisibilité des réponses d'un modèle de langage.",
  "icon": "Thermometer",
  "difficulty": "intermédiaire",
  "tags": [],
  "isFavorite": false,
  "keyTakeaways": [
    "La température (0-1) contrôle l'équilibre entre créativité et prévisibilité de l'IA",
    "Température basse (0-0.3) : réponses factuelles, précises, répétables",
    "Température haute (0.7-1) : réponses créatives, originales, mais moins fiables",
    "Le 'bon dosage' dépend de la tâche : analytique vs créative",
    "Accessible uniquement via les environnements d'expérimentation (AI Studio, Playground)"
  ],
  "conceptSlugs": [],
  "content": [
    {
      "type": "markdown",
      "content": "## Définition : La Température, c'est quoi ?\n\nDans les réglages d'un modèle de langage, la **température** est un paramètre (généralement entre 0 et 1, parfois jusqu'à 2) qui contrôle le degré d'aléa et de \"créativité\" dans les réponses de l'IA. \n\nCe n'est pas une mesure de la \"chaleur\" de la réponse, mais plutôt une métaphore pour son degré de prévisibilité.\n\n- **Basse Température (proche de 0) :** L'IA choisira les mots les plus probables et les plus logiques pour compléter un texte. Les réponses seront très factuelles, prévisibles, voire répétitives.\n- **Haute Température (proche de 1 ou plus) :** L'IA sera plus audacieuse et pourra choisir des mots moins probables. Les réponses seront plus créatives, surprenantes, parfois même incohérentes ou \"farfelues\".\n\nC'est l'équivalent d'un dosage en pharmacie : un mauvais dosage peut rendre la réponse inefficace ou toxique (hors-sujet).\n\n## Comment Choisir le Bon \"Dosage\" ?\n\nLe choix de la température dépend entièrement de la tâche que vous souhaitez accomplir.\n\n### Usage à Basse Température (Ex: 0.1 - 0.3)\n\nC'est le mode à privilégier pour les tâches qui exigent de la **précision, de la rigueur et de la reproductibilité**.\n\n- **Cas d'usage en pharmacie :**\n  - **Extraction d'informations :** \"Extrais toutes les posologies mentionnées dans ce document.\"\n  - **Classification :** \"Classe ces médicaments en fonction de leur famille thérapeutique.\"\n  - **Résumé factuel :** \"Résume les conclusions de cette étude clinique sans interprétation.\"\n  - **Formatage de données :** \"Transforme cette liste de médicaments en un tableau JSON.\"\n\n### Usage à Haute Température (Ex: 0.7 - 1.0)\n\nC'est le mode à utiliser pour les tâches qui demandent de la **créativité, de l'exploration et de la génération d'idées**.\n\n- **Cas d'usage en pharmacie :**\n  - **Brainstorming :** \"Donne-moi 10 idées de sujets de thèse sur l'impact de l'IA en pharmacovigilance.\"\n  - **Génération de mnémoniques :** \"Invente une phrase mnémotechnique pour se souvenir des effets secondaires des bêta-bloquants.\"\n  - **Reformulation :** \"Réécris ce paragraphe sur le mécanisme d'action du paracétamol pour un public de non-initiés, en utilisant une analogie simple.\"\n  - **Simulation de dialogue :** \"Simule une conversation entre un pharmacien et un patient inquiet au sujet des vaccins.\"\n\n## Où Régler la Température ?\n\nCe paramètre n'est généralement pas disponible dans les interfaces de chat grand public comme ChatGPT ou Gemini. Pour y accéder, vous devez utiliser les **environnements d'expérimentation** :\n\n- **[Google AI Studio](/external-tools/google-ai-studio)**\n- **[OpenAI Playground](/external-tools/openai-playground)**\n- **[Anthropic Console](/external-tools/anthropic-console)**\n\nCes plateformes sont de véritables laboratoires conçus pour les non-développeurs souhaitant maîtriser le \\`prompt engineering\\`. Elles sont l'endroit idéal pour tester l'impact de la température sur vos prompts.\n\nPour en savoir plus, consultez notre **[guide pour choisir son laboratoire d'IA](/guides/choisir-son-environnement-d-experimentation-ia)**.\n\n## Conclusion\n\nMaîtriser le paramètre de température est une compétence fondamentale du \\`prompt engineering\\`. C'est en apprenant à \"doser\" correctement la créativité de l'IA que vous obtiendrez des résultats à la fois pertinents et adaptés à vos objectifs, qu'ils soient purement scientifiques ou plus créatifs."
    }
  ]
};

// Validation et export
export const concept: Concept = conceptSchema.parse(conceptData);