import { workflow as construireTableauComparatif } from './construire-tableau-comparatif'
import { workflow as creerFichesRevision } from './creer-fiches-de-revision'
import { workflow as faireRechercheBibliographique } from './faire-recherche-bibliographique'
import { workflow as investigationPharmacovigilanceAvecTot } from './investigation-pharmacovigilance-avec-tot'
import { workflow as memoriserConceptsDifficiles } from './memoriser-concepts-difficiles'
import { workflow as resoudreCasCliique } from './resoudre-cas-clinique'
import { workflow as workflowGenererCasCliniques } from './workflow-generer-cas-cliniques'

export const allWorkflows = [
  creerFichesRevision,
  resoudreCasCliique,
  faireRechercheBibliographique,
  construireTableauComparatif,
  memoriserConceptsDifficiles,
  workflowGenererCasCliniques,
  investigationPharmacovigilanceAvecTot,
]
