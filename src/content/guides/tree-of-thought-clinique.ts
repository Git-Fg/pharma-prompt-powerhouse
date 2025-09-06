import type { Guide } from '@/lib/content-schema'

export const guide = {
  slug: 'tree-of-thought-clinique',
  title: 'Guide Pratique : Résoudre un Cas Clinique Complexe avec Tree-of-Thought',
  description: 'Apprenez à construire et utiliser un prompt Tree-of-Thought pour analyser un cas clinique avec plusieurs hypothèses diagnostiques.',
  icon: 'Network',
  category: 'ressources',
  difficulty: 'avancé',
  estimatedTime: '30 minutes',
  tags: [
    'cas-clinique',
    'clinique',
    'exemple-code',
    'guide',
    'pedagogie',
    'pharmacie',
    'tree-of-thought',
    'scaffolding',
  ],
  isFavorite: false,
  isWorkflow: false,
  keyTakeaways: [
    'Utilisez le Tree-of-Thought pour forcer l\'IA à évaluer plusieurs hypothèses en parallèle, idéal pour le diagnostic différentiel.',
    'Structurez votre prompt en XML avec une balise `<thinking_process>` contenant plusieurs balises `<branch>` pour chaque hypothèse.',
    'Imposez à l\'IA de justifier et de noter chaque branche pour obtenir une analyse comparative claire et argumentée.',
    'Découvrez comment les plateformes modernes comme Claude facilitent le ToT avec des outils de scaffolding natifs comme la balise `<thinking>`.',
  ],
  conceptSlugs: [
    'tree-of-thought',
    'structuration-par-balises',
  ],
  content: [
    {
      type: 'markdown',
      content: `# Guide Pratique : Résoudre un Cas Clinique Complexe avec Tree-of-Thought

Ce guide est un tutoriel pratique pour appliquer le concept de Tree-of-Thought à la résolution de cas cliniques complexes. Nous n'allons pas redéfinir la théorie ici, mais vous montrer **comment** construire un prompt ToT efficace, étape par étape.`,
    },
    {
      type: 'conceptRecommendation',
      slug: 'tree-of-thought',
      reason: 'Ce guide est l\'application pratique et détaillée du concept théorique de Tree-of-Thought.',
    },
    {
      type: 'markdown',
      content: `## Le Problème : Le Raisonnement Linéaire de l'IA

Face à un cas complexe, une IA standard suivra souvent le premier chemin de raisonnement plausible, ignorant d'autres diagnostics potentiels. Le ToT résout ce problème en la forçant à agir comme un clinicien expérimenté : explorer plusieurs pistes, les évaluer, puis conclure.`,
    },
    {
      type: 'markdown',
      content: `## Workflow de Construction d'un Prompt ToT Manuel

Ce workflow montre comment implémenter un ToT manuellement, en utilisant uniquement la structuration du prompt.`,
    },
    {
      type: 'codeBlock',
      language: 'xml',
      title: 'Étape 1 : Structurer les Données Cliniques',
      content: `<cas_clinique>
  <patient>
    <age>78</age>
    <sexe>F</sexe>
    <antécédents>HTA, Fibrillation Atriale, Insuffisance Rénale (ClCr 40ml/min)</antécédents>
  </patient>
  <traitement>
    <medicament nom="Amiodarone" dose="200mg/j" />
    <medicament nom="Apixaban" dose="2.5mg x2/j" />
    <medicament nom="Furosémide" dose="40mg/j" />
  </traitement>
  <presentation_clinique>
    <symptome>Asthénie intense depuis 48h</symptome>
    <signe_vital>Fréquence cardiaque à 45 bpm</signe_vital>
  </presentation_clinique>
</cas_clinique>`,
    },
    {
      type: 'codeBlock',
      language: 'xml',
      title: 'Étape 2 : Définir les Branches d\'Analyse',
      content: `<instructions>
Analyse ce cas en explorant les 3 hypothèses suivantes dans des branches de raisonnement séparées.

<thinking_process>
  <branch id="1">
    <hypothesis>Surdosage en bêta-bloquant ou bradycardisant</hypothesis>
    <questions_a_explorer>
      - Quels médicaments actuels ont un effet bradycardisant ?
      - La posologie est-elle adaptée à la fonction rénale et à l'âge ?
      - Y a-t-il une interaction qui potentialise cet effet ?
    </questions_a_explorer>
  </branch>

  <branch id="2">
    <hypothesis>Trouble de la conduction cardiaque intrinsèque</hypothesis>
    <questions_a_explorer>
      - Les symptômes sont-ils typiques d'un bloc auriculo-ventriculaire ?
      - Y a-t-il des facteurs de risque non médicamenteux ?
    </questions_a_explorer>
  </branch>

  <branch id="3">
    <hypothesis>Cause métabolique (ex: dysthyroïdie)</hypothesis>
    <questions_a_explorer>
      - L'amiodarone peut-elle induire une dysthyroïdie ?
      - Quels examens biologiques seraient pertinents ?
    </questions_a_explorer>
  </branch>
</thinking_process>
</instructions>`,
    },
    {
      type: 'codeBlock',
      language: 'xml',
      title: 'Étape 3 : Exiger une Évaluation et une Synthèse',
      content: `<format_sortie>
Après avoir exploré chaque branche, fournis une synthèse finale :

<analyse_finale>
  <evaluation_branches>
    <branche id="1" probabilité="[0-1]" justification="..." />
    <branche id="2" probabilité="[0-1]" justification="..." />
    <branche id="3" probabilité="[0-1]" justification="..." />
  </evaluation_branches>
 <diagnostic_le_plus_probable>...</diagnostic_le_plus_probable>
  <plan_action_immediat>
    1. Action 1...
    2. Action 2...
  </plan_action_immediat>
</analyse_finale>
</format_sortie>`,
    },
    {
      type: 'markdown',
      content: `## Évolution 2025 : Implémentation Assistée par la Plateforme (Scaffolding Natif)

Le ToT manuel est puissant mais peut être verbeux. Les plateformes de 2025, comme Anthropic avec Claude, commencent à proposer des outils natifs qui simplifient ce processus.`,
    },
    {
      type: 'card',
      title: 'Exemple avec la balise <thinking> de Claude',
      content: `L'outil \`<thinking>\` permet au modèle de délibérer avant de répondre. Même si l'orchestration complète du ToT (gérer plusieurs branches complexes, les évaluer, etc.) reste manuelle, cet outil fiabilise la génération de chaque "nœud" de l'arbre.

**Exemple simplifié :**
\`\`\`text
<prompt>
[...] la bradycardie pourrait être iatrogène. Explore cette hypothèse.
<thinking>
1.  Je liste les médicaments du patient : Amiodarone, Apixaban, Furosémide.
2.  Je vérifie leurs effets bradycardisants connus.
3.  Amiodarone est un bradycardisant majeur. Apixaban non. Furosémide non.
4.  Je vérifie l'interaction Amiodarone + Apixaban. Pas d'interaction pharmacodynamique directe sur la FC.
5.  Je me concentre sur l'Amiodarone. C'est la piste la plus probable.
</thinking>
L'hypothèse iatrogène est très probable, principalement due à l'amiodarone. [...]
</prompt>
\`\`\`

Cet outil rend chaque étape du raisonnement plus explicite et fiable, même si vous devez toujours guider le processus global de branche en branche.`,
    },
  ],
} satisfies Guide

export default guide
