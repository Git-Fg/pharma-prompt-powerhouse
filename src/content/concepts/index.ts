import architectureAgentique from './architecture-agentique'
import chaineDePrompts from './chaîne-de-prompts'
import contextEngineering from './context-engineering'
import hallucinationEffetIndesirable from './hallucination-effet-indesirable'
import hallucinationStrategique from './hallucination-strategique'
import memoireIa from './memoire-ia'
import planAndSolve from './plan-and-solve'
import reactReasonAct from './react-reason-act'
import structurationParBalises from './structuration-par-balises'
import temperatureDosage from './température-dosage'
import tokenAcideAmine from './token-acide-amine'
import treeOfThought from './tree-of-thought'
import dialogueSocratiqueIa from './dialogue-socratique-ia'
import biaisAutomatisation from './biais-automatisation'
import desapprentissageCognitif from './desapprentissage-cognitif'
import systemesMultiAgents from './systemes-multi-agents'
import inferenceCausaleIa from './inference-causale-ia'
import anonymisationVsPseudonymisation from './anonymisation-vs-pseudonymisation'
import chainOfVerification from './chain-of-verification'
import stepBackPrompting from './step-back-prompting'
import selfConsistency from './self-consistency'

const concepts = [
  architectureAgentique,
  chaineDePrompts,
  contextEngineering,
  hallucinationEffetIndesirable,
  hallucinationStrategique,
  memoireIa,
  planAndSolve,
  reactReasonAct,
  structurationParBalises,
  temperatureDosage,
  tokenAcideAmine,
  treeOfThought,
  dialogueSocratiqueIa,
  biaisAutomatisation,
  desapprentissageCognitif,
  systemesMultiAgents,
  inferenceCausaleIa,
  anonymisationVsPseudonymisation,
  chainOfVerification,
  stepBackPrompting,
  selfConsistency,
].sort((a, b) => a.title.localeCompare(b.title))

export default concepts
