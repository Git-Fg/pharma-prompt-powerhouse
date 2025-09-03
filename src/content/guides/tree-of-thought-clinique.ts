import { Guide, guideSchema } from '@/lib/content-schema';

const guideData = {
  "slug": "tree-of-thought-clinique",
  "title": "Guide Pratique : Résoudre un Cas Clinique Complexe avec Tree-of-Thought",
  "description": "Apprenez à construire et utiliser un prompt Tree-of-Thought pour analyser un cas clinique avec plusieurs hypothèses diagnostiques.",
  "icon": "Network",
  "category": "ressources",
  "difficulty": "avancé",
  "estimatedTime": "30 minutes",
  "tags": [
    "cas-clinique",
    "clinique",
    "exemple-code",
    "guide",
    "pedagogie",
    "pharmacie",
    "tree-of-thought"
  ],
  "isFavorite": false,
  "keyTakeaways": [
    "Utilisez le Tree-of-Thought pour forcer l'IA à évaluer plusieurs hypothèses en parallèle, idéal pour le diagnostic différentiel.",
    "Structurez votre prompt en XML avec une balise `<thinking_process>` contenant plusieurs balises `<branch>` pour chaque hypothèse.",
    "Imposez à l'IA de justifier et de noter chaque branche pour obtenir une analyse comparative claire et argumentée."
  ],
  "conceptSlugs": [
    "tree-of-thought",
    "structuration-par-balises"
  ],
  "isWorkflow": false,
  "content": [
    {
      "type": "markdown",
      "content": "# Guide Pratique : Résoudre un Cas Clinique Complexe avec Tree-of-Thought\n\nCe guide est un tutoriel pratique pour appliquer le concept de Tree-of-Thought à la résolution de cas cliniques complexes. Nous n'allons pas redéfinir la théorie ici, mais vous montrer **comment** construire un prompt ToT efficace, étape par étape."
    },
    {
      "type": "conceptRecommendation",
      "slug": "tree-of-thought",
      "reason": "Ce guide est l'application pratique et détaillée du concept théorique de Tree-of-Thought."
    },
    {
      "type": "markdown",
      "content": "## Le Problème : Le Raisonnement Linéaire de l'IA\n\nFace à un cas complexe, une IA standard suivra souvent le premier chemin de raisonnement plausible, ignorant d'autres diagnostics potentiels. Le ToT résout ce problème en la forçant à agir comme un clinicien expérimenté : explorer plusieurs pistes, les évaluer, puis conclure."
    },
    {
      "type": "markdown",
      "content": "## Workflow de Construction d'un Prompt ToT\n\n### Étape 1 : Structurer les Données Cliniques en XML\n\nLa clarté est essentielle. Commencez par formater les données du patient dans des balises XML sémantiques."
    },
    {
      "type": "codeBlock",
      "language": "xml",
      "content": "<cas_clinique>\n  <patient>\n    <age>78</age>\n    <sexe>F</sexe>\n    <antécédents>HTA, Fibrillation Atriale, Insuffisance Rénale (ClCr 40ml/min)</antécédents>\n  </patient>\n  <traitement>\n    <medicament nom=\"Amiodarone\" dose=\"200mg/j\" />\n    <medicament nom=\"Apixaban\" dose=\"2.5mg x2/j\" />\n    <medicament nom=\"Furosémide\" dose=\"40mg/j\" />\n  </traitement>\n  <presentation_clinique>\n    <symptome>Asthénie intense depuis 48h</symptome>\n    <signe_vital>Fréquence cardiaque à 45 bpm</signe_vital>\n  </presentation_clinique>\n</cas_clinique>"
    },
    {
      "type": "markdown",
      "content": "### Étape 2 : Définir les Branches d'Analyse\n\nC'est le cœur du ToT. Vous demandez à l'IA d'explorer plusieurs hypothèses."
    },
    {
      "type": "codeBlock",
      "language": "xml",
      "content": "<instructions>\nAnalyse ce cas en explorant les 3 hypothèses suivantes dans des branches de raisonnement séparées.\n\n<thinking_process>\n  <branch id=\"1\">\n    <hypothesis>Surdosage en bêta-bloquant ou bradycardisant</hypothesis>\n    <questions_a_explorer>\n      - Quels médicaments actuels ont un effet bradycardisant ?\n      - La posologie est-elle adaptée à la fonction rénale et à l'âge ?\n      - Y a-t-il une interaction qui potentialise cet effet ?\n    </questions_a_explorer>\n  </branch>\n\n  <branch id=\"2\">\n    <hypothesis>Trouble de la conduction cardiaque intrinsèque</hypothesis>\n    <questions_a_explorer>\n      - Les symptômes sont-ils typiques d'un bloc auriculo-ventriculaire ?\n      - Y a-t-il des facteurs de risque non médicamenteux ?\n    </questions_a_explorer>\n  </branch>\n\n  <branch id=\"3\">\n    <hypothesis>Cause métabolique (ex: dysthyroïdie)</hypothesis>\n    <questions_a_explorer>\n      - L'amiodarone peut-elle induire une dysthyroïdie ?\n      - Quels examens biologiques seraient pertinents ?\n    </questions_a_explorer>\n  </branch>\n</thinking_process>\n</instructions>"
    },
    {
      "type": "markdown",
      "content": "### Étape 3 : Exiger une Évaluation et une Synthèse\n\nPour finir, forcez l'IA à comparer ses propres raisonnements et à conclure."
    },
    {
      "type": "codeBlock",
      "language": "xml",
      "content": "<format_sortie>\nAprès avoir exploré chaque branche, fournis une synthèse finale :\n\n<analyse_finale>\n  <evaluation_branches>\n    <branche id=\"1\" probabilité=\"[0-1]\" justification=\"...\" />\n    <branche id=\"2\" probabilité=\"[0-1]\" justification=\"...\" />\n    <branche id=\"3\" probabilité=\"[0-1]\" justification=\"...\" />\n  </evaluation_branches>\n  <diagnostic_le_plus_probable>...</diagnostic_le_plus_probable>\n  <plan_action_immediat>\n    1. Action 1...\n    2. Action 2...\n  </plan_action_immediat>\n</analyse_finale>\n</format_sortie>"
    },
    {
      "type": "markdown",
      "content": "En combinant ces trois blocs, vous obtenez un prompt ToT robuste qui guide l'IA à travers un processus de diagnostic différentiel structuré, fiable et transparent."
    }
  ]
};

// Validation et export
export const guide: Guide = guideSchema.parse(guideData);