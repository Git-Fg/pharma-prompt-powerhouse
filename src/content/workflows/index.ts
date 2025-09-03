export { workflow as creerFichesRevision } from './creer-fiches-de-revision';
export { workflow as resoudreCasCliique } from './resoudre-cas-clinique';
export { workflow as faireRechercheBibliographique } from './faire-recherche-bibliographique';
export { workflow as construireTableauComparatif } from './construire-tableau-comparatif';
export { workflow as memoriserConceptsDifficiles } from './memoriser-concepts-difficiles';
export { workflow as workflowGenererCasCliniques } from './workflow-generer-cas-cliniques';
export { workflow as investigationPharmacovigilanceAvecTot } from './investigation-pharmacovigilance-avec-tot';

export const allWorkflows = [
  await import('./creer-fiches-de-revision').then(m => m.workflow),
  await import('./resoudre-cas-clinique').then(m => m.workflow),
  await import('./faire-recherche-bibliographique').then(m => m.workflow),
  await import('./construire-tableau-comparatif').then(m => m.workflow),
  await import('./memoriser-concepts-difficiles').then(m => m.workflow),
  await import('./workflow-generer-cas-cliniques').then(m => m.workflow),
  await import('./investigation-pharmacovigilance-avec-tot').then(m => m.workflow),
];