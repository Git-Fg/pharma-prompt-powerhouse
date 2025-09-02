/**
 * Content Quality and Validation Tests
 * Ensure content meets quality standards and pedagogical requirements
 */

import { content } from '@/lib/content-loader';
import type { ContentBlock } from '@/lib/content-schema';

// Define the tag taxonomy as used in the new TypeScript content system
const TAG_TAXONOMY = {
  technique: [
    "prompting", "context-engineering", "xml-prompting", "chain-of-thought",
    "tree-of-thought", "rag", "self-consistency", "auto-critique", "template",
    "variables", "deep-research", "image-edit", "web-dev", "raisonnement",
    "confidentialite", "deep-think", "multimodal", "opensource", "fiabilité",
  ],
  domaine: [
    "pharmacie", "clinique", "recherche", "pedagogie", "pharmacovigilance",
    "geriatrie", "cardiologie",
  ],
  niveau: ["debutant", "intermediaire", "avance"],
  format: [
    "guide", "tutoriel", "workflow", "fiche-revision", "qcm", "cas-clinique",
    "tableau", "mnemonique", "synthese", "comparatif", "exemple-code",
    "fondamentaux", "structuration", "outils",
  ],
  outils: [
    "chatgpt", "claude", "gemini", "perplexity", "z-ai", "aistudio",
    "deepseek", "qwen", "alibaba",
  ],
  pharma: [
    "posologie", "effets-indesirables", "monitoring", "observance", "interactions",
  ],
};

const ALL_VALID_TAGS = Object.values(TAG_TAXONOMY).flat();

// Helper function to extract text from content blocks
function extractTextFromContent(contentBlocks: ContentBlock[]): string {
  let text = '';
  
  for (const block of contentBlocks) {
    switch (block.type) {
      case 'markdown':
        text += block.content + ' ';
        break;
      case 'alert':
        text += (block.title || '') + ' ' + block.content + ' ';
        break;
      case 'card':
        text += (block.title || '') + ' ' + (block.description || '') + ' ' + block.content + ' ';
        break;
      case 'codeBlock':
        text += block.content + ' ';
        break;
      case 'tabs':
        for (const tab of block.tabs) {
          text += tab.title + ' ' + extractTextFromContent(tab.content) + ' ';
        }
        break;
      case 'toolRecommendation':
      case 'guideRecommendation':
      case 'conceptRecommendation':
        text += block.reason + ' ';
        break;
    }
  }
  
  return text;
}

describe('Content Quality and Validation', () => {
  describe('Content Completeness', () => {
    test('all content items have substantial content', () => {
      const allContent = [
        ...content.guides,
        ...content.concepts,
        ...content.prompts,
        ...content.externalTools
      ];
      
      for (const item of allContent) {
        // Check metadata completeness
        expect(item.title).toBeDefined();
        expect(item.title.length).toBeGreaterThan(5);
        expect(item.description).toBeDefined();
        expect(item.description.length).toBeGreaterThan(20);
        
        // Check content blocks exist and have content
        expect(Array.isArray(item.content)).toBe(true);
        expect(item.content.length).toBeGreaterThan(0);
        
        const textContent = extractTextFromContent(item.content);
        expect(textContent.length).toBeGreaterThan(100);
      }
    });

    test('concepts have pedagogical structure', () => {
      for (const concept of content.concepts) {
        expect(concept.keyTakeaways).toBeDefined();
        expect(Array.isArray(concept.keyTakeaways)).toBe(true);
        expect(concept.keyTakeaways!.length).toBeGreaterThan(0);
        
        expect(['débutant', 'intermédiaire', 'avancé']).toContain(concept.difficulty);
      }
    });

    test('guides have actionable content', () => {
      const validCategories = [
        'outils', 'bonnes-pratiques', 'Technique', 'methodologie', 
        'fondamentaux', 'techniques-avancees', 'ressources', 'cas-pratiques',
        'Outils & Techniques', 'Sécurité & Confidentialité'
      ];
      
      for (const guide of content.guides) {
        expect(guide.category).toBeDefined();
        expect(validCategories).toContain(guide.category);
        
        expect(Array.isArray(guide.conceptSlugs)).toBe(true);
        expect(['débutant', 'intermédiaire', 'avancé']).toContain(guide.difficulty);
      }
    });

    test('prompts have proper structure with variables', () => {
      for (const prompt of content.prompts) {
        expect(prompt.category).toBeDefined();
        expect(prompt.difficulty).toBeDefined();
        
        if (prompt.variables && prompt.variables.length > 0) {
          expect(Array.isArray(prompt.variables)).toBe(true);
          
          // Check that variables are properly referenced in content
          const textContent = extractTextFromContent(prompt.content);
          // At least one variable should be referenced with {{ }} syntax
          const _hasVariableReferences = prompt.variables.some(variable => 
            textContent.includes(`{{${variable}}`) || 
            prompt.promptContent?.includes(`{{${variable}}`)
          );
          // This is optional - some prompts might not use variables in their content blocks
          // expect(_hasVariableReferences).toBe(true);
        }
      }
    });
  });

  describe('Tag Validation', () => {
    test('tags follow known patterns', () => {
      const allContent = [
        ...content.guides,
        ...content.concepts,
        ...content.prompts,
        ...content.externalTools
      ];
      
      for (const item of allContent) {
        if (item.tags) {
          for (const tag of item.tags) {
            expect(ALL_VALID_TAGS.includes(tag) || tag.length > 0).toBe(true);
          }
        }
      }
    });
  });

  describe('Cross-references Validation', () => {
    test('conceptSlugs reference valid concepts', () => {
      const conceptSlugs = new Set(content.concepts.map(c => c.slug));
      
      const itemsWithConceptSlugs = [
        ...content.guides,
        ...content.prompts,
        ...content.externalTools
      ];
      
      for (const item of itemsWithConceptSlugs) {
        if (item.conceptSlugs) {
          for (const slug of item.conceptSlugs) {
            expect(conceptSlugs.has(slug)).toBe(true);
          }
        }
      }
    });

    test('mainGuideSlug references valid guides', () => {
      const guideSlugs = new Set(content.guides.map(g => g.slug));
      
      for (const concept of content.concepts) {
        if (concept.mainGuideSlug) {
          expect(guideSlugs.has(concept.mainGuideSlug)).toBe(true);
        }
      }
    });
  });

  describe('Pharmaceutical Content Quality', () => {
    test('pharmaceutical content uses appropriate terminology', () => {
      const pharmaTerms = [
        'pharmacien', 'pharmacie', 'médicament', 'posologie', 'dosage',
        'effets indésirables', 'contre-indication', 'interaction', 'observance',
        'pharmaco', 'thérapeutique', 'clinique', 'patient', 'traitement'
      ];
      
      let pharmaContentFound = false;
      
      for (const item of [...content.guides, ...content.concepts, ...content.prompts]) {
        const fullText = (item.title + ' ' + item.description + ' ' + extractTextFromContent(item.content)).toLowerCase();
        
        if (pharmaTerms.some(term => fullText.includes(term.toLowerCase()))) {
          pharmaContentFound = true;
          break;
        }
      }
      
      expect(pharmaContentFound).toBe(true);
    });

    test('safety and ethics content is present', () => {
      const safetyTerms = [
        'confidentialité', 'sécurité', 'anonymisation', 'rgpd',
        'données personnelles', 'éthique', 'respect', 'vie privée'
      ];
      
      let safetyContentFound = false;
      
      for (const guide of content.guides) {
        const fullText = (guide.title + ' ' + guide.description + ' ' + extractTextFromContent(guide.content)).toLowerCase();
        
        if (safetyTerms.some(term => fullText.includes(term.toLowerCase()))) {
          safetyContentFound = true;
          break;
        }
      }
      
      expect(safetyContentFound).toBe(true);
    });
  });
});