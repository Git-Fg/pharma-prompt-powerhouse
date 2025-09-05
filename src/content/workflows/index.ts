import analyseDeCasClinique from './analyse-de-cas-clinique'
import analysePharmacovigilance from './analyse-pharmacovigilance'
import creerFlashcardsMemorables from './creer-flashcards-memorables'

const workflows = [
  analyseDeCasClinique,
  creerFlashcardsMemorables,
  analysePharmacovigilance,
].sort((a, b) => a.title.localeCompare(b.title))

export default workflows
