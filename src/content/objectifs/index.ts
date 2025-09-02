import { objectif as creerFiches } from './creer-fiches-de-revision';
import { objectif as faireRecherche } from './faire-recherche-bibliographique';
import { objectif as resoudreCasClinique } from './resoudre-cas-clinique';
import { objectif as memoriserConcepts } from './memoriser-concepts-difficiles';
import { objectif as construireTableau } from './construire-tableau-comparatif';

export const allObjectifs = [
  creerFiches,
  faireRecherche,
  resoudreCasClinique,
  memoriserConcepts,
  construireTableau,
];