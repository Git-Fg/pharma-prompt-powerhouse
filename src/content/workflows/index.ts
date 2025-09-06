import analyseDeCasClinique from './analyse-de-cas-clinique'
import analysePharmacovigilance from './analyse-pharmacovigilance'
import construireTableauComparatif from './construire-tableau-comparatif'
import creerFichesDeRevision from './creer-fiches-de-revision'
import creerFlashcardsMemorables from './creer-flashcards-memorables'
import faireRechercheBibliographique from './faire-recherche-bibliographique'
import investigationPharmacovigilanceAvecTot from './investigation-pharmacovigilance-avec-tot'
import memoriserConceptsDifficiles from './memoriser-concepts-difficiles'
import resoudreCasClinique from './resoudre-cas-clinique'
import workflowGenererCasCliniques from './workflow-generer-cas-cliniques'

const workflows = [
  analyseDeCasClinique,
  analysePharmacovigilance,
  construireTableauComparatif,
  creerFichesDeRevision,
  creerFlashcardsMemorables,
  faireRechercheBibliographique,
  investigationPharmacovigilanceAvecTot,
  memoriserConceptsDifficiles,
  resoudreCasClinique,
  workflowGenererCasCliniques,
].sort((a, b) => a.title.localeCompare(b.title))

export default workflows
export { workflows as allWorkflows }
