import anonymisationVsPseudonymisation from './anonymisation-vs-pseudonymisation'
import architectureAgentique from './architecture-agentique'
import biaisAutomatisation from './biais-automatisation'
import chainOfThought from './chain-of-thought'
import chainOfVerification from './chain-of-verification'
import chaineDePrompts from './chaine-de-prompts'
import contextEngineering from './context-engineering'
import desapprentissageCognitif from './desapprentissage-cognitif'
import dialogueSocratiqueIa from './dialogue-socratique-ia'
import frameworkCostar from './framework-costar'
import hallucinationEffetIndesirable from './hallucination-effet-indesirable'
import hallucinationStrategique from './hallucination-strategique'
import inferenceCausaleIa from './inference-causale-ia'
import memoireIa from './memoire-ia'
import planAndSolve from './plan-and-solve'
import quantificationIa from './quantification-ia'
import reactReasonAct from './react-reason-act'
import selfConsistency from './self-consistency'
import stepBackPrompting from './step-back-prompting'
import structurationParBalises from './structuration-par-balises'
import systemesMultiAgents from './systemes-multi-agents'
import temperatureDosage from './temperature-dosage'
import tokenAcideAmine from './token-acide-amine'
import treeOfThought from './tree-of-thought'

const concepts = [
  anonymisationVsPseudonymisation,
  architectureAgentique,
  biaisAutomatisation,
  chainOfThought,
  chainOfVerification,
  chaineDePrompts,
  contextEngineering,
  desapprentissageCognitif,
  dialogueSocratiqueIa,
  frameworkCostar,
  hallucinationEffetIndesirable,
  hallucinationStrategique,
  inferenceCausaleIa,
  memoireIa,
  planAndSolve,
  quantificationIa,
  reactReasonAct,
  selfConsistency,
  stepBackPrompting,
  structurationParBalises,
  systemesMultiAgents,
  temperatureDosage,
  tokenAcideAmine,
  treeOfThought,
].sort((a, b) => a.title.localeCompare(b.title))

export default concepts
export { concepts as allConcepts }
