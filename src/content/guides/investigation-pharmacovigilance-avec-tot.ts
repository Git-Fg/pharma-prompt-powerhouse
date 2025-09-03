// src/content/guides/investigation-pharmacovigilance-avec-tot.ts
import { Guide, guideSchema } from '@/lib/content-schema';

const guideData = {
  "slug": "investigation-pharmacovigilance-avec-tot",
  "title": "Workflow d'Investigation : Analyser un Signal de Pharmacovigilance avec ToT",
  "description": "Apprenez à utiliser le Tree-of-Thought pour mener une investigation structurée et rigoureuse face à un signal de sécurité médicamenteuse.",
  "icon": "AlertTriangle",
  "category": "methodologie",
  "difficulty": "avancé",
  "estimatedTime": "35 minutes",
  "tags": [
    "clinique",
    "exemple-code",
    "guide",
    "pedagogie",
    "pharmacie",
    "pharmacovigilance",
    "tree-of-thought",
    "workflow"
  ],
  "isFavorite": false,
  "keyTakeaways": [
    "Le Tree-of-Thought est un framework idéal pour les investigations complexes où plusieurs causes sont possibles.",
    "Structurez votre investigation en 'branches' d'hypothèses (toxicité, interaction, qualité) pour une analyse exhaustive.",
    "Utilisez le ToT pour générer un plan d'action clair, en priorisant les vérifications et les mesures à prendre."
  ],
  "conceptSlugs": [
    "tree-of-thought"
  ],
  "isWorkflow": true,
  "content": [
    {
      "type": "markdown",
      "content": "# Workflow d'Investigation : Analyser un Signal de Pharmacovigilance avec ToT\n\nCe guide pratique vous montre **comment** appliquer le concept avancé de Tree-of-Thought à un scénario complexe de pharmacovigilance. Le but est de transformer l'IA en un enquêteur méthodique qui explore toutes les pistes."
    },
    {
      "type": "conceptRecommendation",
      "slug": "tree-of-thought",
      "reason": "Ce guide est une application directe et pratique du concept de Tree-of-Thought à un cas réel de pharmacie."
    },
    {
      "type": "markdown",
      "content": "## Le Scénario : Un Signal Inattendu\n\nVous êtes le pharmacien responsable de la pharmacovigilance dans un hôpital. Vous recevez 3 notifications en une semaine pour des cas d'hépatite aiguë chez des patients traités par un nouveau médicament, le \"Novamab\". Que faites-vous ?"
    },
    {
      "type": "markdown",
      "content": "## Utiliser le Tree-of-Thought comme Framework d'Investigation\n\nNous allons construire un prompt qui force l'IA à explorer systématiquement les causes possibles."
    },
    {
      "type": "markdown",
      "content": "### Étape 1 : Poser le Contexte (Structuré)\n\nOn utilise des balises pour clarifier les faits pour nous et pour l'IA."
    },
    {
      "type": "codeBlock",
      "language": "xml",
      "content": "<cas>\n  <signal>\n    <medicament_suspect>Novamab</medicament_suspect>\n    <evenement_indesirable>Hépatite aiguë</evenement_indesirable>\n    <nombre_de_cas>3</nombre_de_cas>\n  </signal>\n  <informations_complementaires>\n    - Les 3 patients sont âgés (> 70 ans).\n    - Les 3 patients prenaient du paracétamol en co-prescription.\n    - Le lot A123 du Novamab est commun aux 3 cas.\n  </informations_complementaires>\n</cas>"
    },
    {
      "type": "markdown",
      "content": "### Étape 2 & 3 : Guider le Raisonnement avec ToT\n\nIci, on ne demande pas une sortie XML, on structure notre question pour forcer l'IA à penser de manière exhaustive."
    },
    {
      "type": "codeBlock",
      "language": "xml",
      "content": "<instructions>\nTu es un expert en pharmacovigilance. En te basant sur le `<cas>` ci-dessus, analyse la situation en suivant un raisonnement par arbre de pensée (Tree-of-Thought).\n\n1. **Branche 1 (Toxicité intrinsèque) :** Évalue l'hypothèse que le Novamab est hépatotoxique par lui-même. Quels sont les arguments pour/contre ? Quelle action de vérification proposes-tu ?\n\n2.  **Branche 2 (Interaction) :** Évalue l'hypothèse d'une interaction entre le Novamab et le paracétamol. Quels sont les arguments pour/contre ? Quelle action de vérification proposes-tu ?\n\n3.  **Branche 3 (Problème qualité) :** Évalue l'hypothèse d'un défaut sur le lot A123. Quels sont les arguments pour/contre ? Quelle action de vérification proposes-tu ?\n\n4.  **Synthèse :** Conclus en hiérarchisant les hypothèses de la plus probable à la moins probable, et propose un plan d'action final priorisé en 3 points.\n</instructions>"
    },
    {
      "type": "alert",
      "variant": "default",
      "title": "Résultat Attendu",
      "content": "Une réponse en texte (Markdown) bien structurée, qui suit votre plan d'investigation, facile à lire et à utiliser."
    }
  ]
};

// Validation et export
export const guide: Guide = guideSchema.parse(guideData);