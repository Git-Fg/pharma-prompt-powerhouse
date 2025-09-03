// src/content/guides/les-5-piliers-dun-prompt-pharmaceutique-efficace.ts
import type { GuideInput } from '@/types/content';

export const guide = {
  "slug": "les-5-piliers-dun-prompt-pharmaceutique-efficace",
  "title": "Les 5 Piliers d'un Prompt Pharmaceutique Efficace",
  "description": "Apprenez à construire un prompt fiable en suivant la méthode des 5 piliers : Rôle, Tâche, Contexte, Format et Exemples, inspirée de la rédaction d'une prescription.",
  "icon": "Pill",
  "category": "fondamentaux",
  "difficulty": "débutant",
  "estimatedTime": "25 minutes",
  "tags": [
    "clinique",
    "exemple-code",
    "guide",
    "pedagogie",
    "pharmacie",
    "prompting"
  ],
  "isFavorite": false,
  "isWorkflow": false,
  "keyTakeaways": [
    "Structurez chaque prompt comme une prescription en définissant clairement le Rôle, la Tâche, le Contexte, le Format et les Exemples.",
    "Un prompt bien rédigé ne laisse aucune place à l'ambiguïté, ce qui réduit les erreurs et les hallucinations de l'IA.",
    "Utilisez des formats de sortie stricts (tableaux, XML, YAML) pour obtenir des réponses cohérentes et directement exploitables."
  ],
  "conceptSlugs": [
    "context-engineering",
    "structuration-par-balises"
  ],
  "content": [
    {
      "type": "markdown",
      "content": "## Introduction : De la Question à la Prescription\n\nCe guide est votre point de départ. Il vous apprend à construire un prompt fiable, étape par étape, en appliquant des principes simples dérivés de notre pratique en pharmacie.\n\nL'objectif n'est pas de simplement \"poser une question\" à l'IA, mais de lui donner une **instruction de travail complète et sans ambiguïté**, comme on rédigerait une prescription détaillée. Cette méthode met en pratique les concepts de [Prompt = Prescription](/concepts/les-5-piliers-dun-prompt-efficace-methode-prescription)."
    },
    {
      "type": "toolRecommendation",
      "slug": "chatgpt",
      "reason": "ChatGPT est parfait pour commencer avec les 5 piliers. Son interface simple permet de tester rapidement vos prompts structurés et d'itérer sur les différents éléments."
    },
    {
      "type": "markdown",
      "content": "## Le Workflow en 5 Piliers\n\nChaque prompt de qualité que vous rédigerez devrait contenir ces cinq éléments."
    },
    {
      "type": "card",
      "title": "1. Définir le Rôle (La \"Molécule\")",
      "description": "Précisez l'expertise exacte que vous attendez de l'IA.",
      "content": "**❌ Mauvais :**\n```text\nTu es un expert.\n```\n\n**✅ Bon :**\n```text\nTu es un pharmacien clinicien spécialisé en gériatrie, habitué à optimiser des ordonnances complexes pour des patients polymédiqués en EHPAD.\n```"
    },
    {
      "type": "card",
      "title": "2. Formuler la Tâche (La \"Posologie\")",
      "description": "Utilisez un verbe d'action clair pour décrire le résultat final.",
      "content": "**❌ Mauvais :**\n```text\nParle-moi des IEC.\n```\n\n**✅ Bon :**\n```text\nCrée une fiche de révision synthétique sur la classe des IEC, adaptée à un étudiant en L3 de pharmacie.\n```"
    },
    {
      "type": "card",
      "title": "3. Fournir le Contexte (Les \"Antécédents\")",
      "description": "Donnez à l'IA toutes les données nécessaires, comme un dossier patient.",
      "content": "**❌ Mauvais :**\n```text\nAnalyse cette ordonnance.\n```\n\n**✅ Bon :**\n```text\nVoici l'ordonnance d'un patient de 75 ans avec une insuffisance rénale (ClCr 40 mL/min). Analyse-la en te basant UNIQUEMENT sur les informations fournies.\n```"
    },
    {
      "type": "card",
      "title": "4. Spécifier le Format (La \"Voie d'Administration\")",
      "description": "Dictez la structure de la réponse pour garantir la fiabilité.",
      "content": "**❌ Mauvais :**\n```text\nFais une liste des effets.\n```\n\n**✅ Bon :**\n```text\nPrésente les effets indésirables dans un tableau Markdown à 3 colonnes : \"Effet\", \"Fréquence (RCP)\", et \"Gestion/Conseil\".\n```"
    },
    {
      "type": "card",
      "title": "5. Donner un Exemple (Le \"Cas de Référence\")",
      "description": "Montrez à l'IA un exemple du résultat attendu (_few-shot prompting_).",
      "content": "Voici un exemple de formatting que vous pouvez donner à l'IA :\n\n```text\nTransforme ces infos en carte Anki. Voici le format attendu :\nRecto: \"Question ?\"\nVerso: \"Réponse.\"\n\nMaintenant, applique ce format à...\n```"
    },
    {
      "type": "markdown",
      "content": "## Application Pratique : Construire un Prompt d'Analyse\n\nMettons ces piliers en action pour analyser une interaction médicamenteuse en utilisant des balises pour une clarté maximale."
    },
    {
      "type": "codeBlock",
      "language": "xml",
      "filename": "prompt-analyse-interaction.xml",
      "content": "<role>\nTu es un pharmacien d'officine expérimenté, spécialisé dans le conseil patient.\n</role>\n\n<tache>\nAnalyse l'interaction potentielle entre les deux médicaments suivants et rédige un conseil court et clair pour le patient.\n</tache>\n\n<contexte>\n- Médicament 1 : Fluconazole 150 mg\n- Médicament 2 : Atorvastatine 20 mg\n- Contexte patient : Prise ponctuelle du Fluconazole.\n</contexte>\n\n<format_attendu>\nRéponds en utilisant la structure suivante :\n\n1. **Niveau de Risque :** (ex: Faible, Modéré, Élevé)\n2. **Mécanisme Simplifié :** (en une phrase simple)\n3. **Conseil au Patient :** (maximum 30 mots, langage accessible)\n</format_attendu>\n\n<exemple>\n**Conseil au Patient type :**\n\"Attention, ce nouveau médicament peut augmenter les effets du traitement pour le cholestérol. Soyez attentif à d'éventuelles douleurs musculaires inhabituelles.\"\n</exemple>"
    },
    {
      "type": "markdown",
      "content": "## Conclusion\n\nUn prompt parfait n'est pas une question, c'est un **protocole thérapeutique** pour votre IA. En structurant vos demandes selon ces 5 piliers, vous transformez un \"stagiaire brillant mais naïf\" en un \"expert spécialisé\" qui vous livre exactement ce dont vous avez besoin."
    },
    {
      "type": "toolRecommendation",
      "slug": "claude-ai",
      "reason": "Claude excelle dans l'interprétation de prompts structurés et complexes. Ses capacités de raisonnement en font l'outil idéal pour appliquer la méthode des 5 piliers sur des cas cliniques détaillés."
    },
    {
      "type": "guideRecommendation",
      "slug": "structurer-ses-prompts-avec-des-balises-methode-xml",
      "reason": "Une fois les 5 piliers maîtrisés, apprenez à structurer des prompts encore plus complexes avec la méthode XML pour des cas cliniques multi-parties."
    }
  ]
} satisfies GuideInput;