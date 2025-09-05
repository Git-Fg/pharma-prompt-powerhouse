import analyseDeCasClinique from './analyse-de-cas-clinique'
import creerFlashcardsMemorables from './creer-flashcards-memorables'
import analysePharmacovigilance from './analyse-pharmacovigilance'

const workflows = [
  analyseDeCasClinique,
  creerFlashcardsMemorables,
  analysePharmacovigilance,
].sort((a, b) => a.title.localeCompare(b.title))

export default workflows
