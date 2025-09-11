// Configuration centrale pour la page "Par où commencer"
// Ce fichier définit quels concepts et workflows sont recommandés sur la page
// Modifier cette configuration change les recommandations sans toucher au code

export const gettingStartedConfig = {
  // Les 3 concepts essentiels pour commencer
  essentialConcepts: [
    'context-engineering',
    'hallucination-effet-indesirable',
    'structuration-par-balises',
  ] as const,

  // Le premier workflow recommandé pour débuter
  firstWorkflow: 'creer-fiches-de-revision' as const,

  // Workflows avancés pour continuer
  advancedWorkflows: [
    'resoudre-cas-clinique',
    'faire-recherche-bibliographique',
  ] as const,
} as const
