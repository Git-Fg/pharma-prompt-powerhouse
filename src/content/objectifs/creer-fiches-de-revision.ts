import { Objectif, objectifSchema } from '@/lib/content-schema';
import { allPrompts } from '@/content/prompts';

// On récupère un prompt existant pour le réutiliser
const masterPromptData = allPrompts.find(p => p.slug === 'generateur-questions-examen');
if (!masterPromptData) throw new Error("Prompt 'generateur-questions-examen' non trouvé");

const objectifData = {
  slug: 'creer-fiches-de-revision',
  title: 'Créer des Fiches de Révision',
  description: 'Transformez vos notes de cours en fiches de révision et QCM interactifs pour un apprentissage actif.',
  icon: 'FileText',
  
  masterPrompt: {
    description: "Ce prompt 'maître' est conçu pour transformer n'importe quel contenu de cours en un outil de révision structuré. Il demande à l'IA d'agir comme un concepteur d'examen, garantissant des questions pertinentes.",
    prompt: masterPromptData,
  },

  beforeAfter: {
    beforePrompt: `"Résume ce cours sur les bêta-bloquants."`,
    afterPrompt: `"En te basant sur le cours fourni, génère 5 QCM de difficulté intermédiaire avec justifications."`,
    // NOTE: Vous devrez créer ces screenshots et les placer dans /public/images/objectifs/
    beforeImageSrc: "/images/objectifs/fiche-revision-avant.png",
    afterImageSrc: "/images/objectifs/fiche-revision-apres.png",
  },

  checklist: [
    "Ai-je défini un rôle précis pour l'IA (ex: 'concepteur de sujet d'examen') ?",
    "Ai-je fourni l'intégralité du contexte (le cours) de manière claire ?",
    "Ai-je spécifié le format de sortie exact (QCM, question ouverte) ?",
    "Ai-je demandé des justifications pour les réponses ?",
    "Ai-je précisé le niveau de difficulté pour adapter les questions ?",
  ],

  relatedConcepts: ["context-engineering", "structuration-par-balises"],
  relatedGuides: ["les-5-piliers-dun-prompt-pharmaceutique-efficace"],
};

export const objectif: Objectif = objectifSchema.parse(objectifData);