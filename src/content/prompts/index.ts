// src/content/prompts-new/index.ts
import { prompt as assistantPromptDocument } from './assistant-prompt-document';
import { prompt as constructeurTableauxComparatifs } from './constructeur-tableaux-comparatifs';
import { prompt as generateurMnemoniquesAnalogies } from './generateur-mnemoniques-analogies';
import { prompt as generateurQuestionsExamen } from './generateur-questions-examen';
import { prompt as researchHelper } from './research-helper';
import { prompt as resolveurCasCliniquesTot } from './resolveur-cas-cliniques-tot';

export const allPrompts = [
  assistantPromptDocument,
  constructeurTableauxComparatifs,
  generateurMnemoniquesAnalogies,
  generateurQuestionsExamen,
  researchHelper,
  resolveurCasCliniquesTot,
];