export { workflow as creerFichesRevision } from './creer-fiches-de-revision';
export { workflow as resoudreCasCliique } from './resoudre-cas-clinique';
export { workflow as faireRechercheBibliographique } from './faire-recherche-bibliographique';
export { workflow as construireTableauComparatif } from './construire-tableau-comparatif';
export { workflow as memoriserConceptsDifficiles } from './memoriser-concepts-difficiles';
export { workflow as workflowGenererCasCliniques } from './workflow-generer-cas-cliniques';
export { workflow as investigationPharmacovigilanceAvecTot } from './investigation-pharmacovigilance-avec-tot';

import { workflow as creerFichesRevision } from './creer-fiches-de-revision';
import { workflow as resoudreCasCliique } from './resoudre-cas-clinique';
import { workflow as faireRechercheBibliographique } from './faire-recherche-bibliographique';
import { workflow as construireTableauComparatif } from './construire-tableau-comparatif';
import { workflow as memoriserConceptsDifficiles } from './memoriser-concepts-difficiles';
import { workflow as workflowGenererCasCliniques } from './workflow-generer-cas-cliniques';
import { workflow as investigationPharmacovigilanceAvecTot } from './investigation-pharmacovigilance-avec-tot';

export const allWorkflows = [
  creerFichesRevision,
  resoudreCasCliique,
  faireRechercheBibliographique,
  construireTableauComparatif,
  memoriserConceptsDifficiles,
  workflowGenererCasCliniques,
  investigationPharmacovigilanceAvecTot,
];