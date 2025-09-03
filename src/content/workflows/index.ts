export { workflow as creerFichesRevision } from './creer-fiches-de-revision';
export { workflow as resoudreCasCliique } from './resoudre-cas-clinique';
export { workflow as faireRechercheBibliographique } from './faire-recherche-bibliographique';

export const allWorkflows = [
  await import('./creer-fiches-de-revision').then(m => m.workflow),
  await import('./resoudre-cas-clinique').then(m => m.workflow),
  await import('./faire-recherche-bibliographique').then(m => m.workflow),
];