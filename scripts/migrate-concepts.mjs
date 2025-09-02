#!/usr/bin/env node
// scripts/migrate-concepts.mjs
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const MDX_SOURCE_DIR = 'src/content/concepts';
const TS_OUTPUT_DIR = 'src/content/concepts-new';

// Fonction pour échapper les guillemets et backslashes dans les chaînes JS
function escapeForTypeScript(content) {
  return content
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\${/g, '\\${');
}

// Fonction pour convertir la valeur de difficulty
function normalizeDifficulty(difficulty) {
  const normalizedMap = {
    'débutant': 'débutant',
    'debutant': 'débutant',
    'intermédiaire': 'intermédiaire',
    'intermediaire': 'intermédiaire',
    'avancé': 'avancé',
    'avance': 'avancé'
  };
  return normalizedMap[difficulty] || 'débutant';
}

// Fonction pour générer le fichier TypeScript
function generateTSConcept(frontmatter, content, filename) {
  const slug = path.basename(filename, '.mdx');
  
  const difficulty = normalizeDifficulty(frontmatter.difficulty || 'débutant');
  const tags = Array.isArray(frontmatter.tags) ? frontmatter.tags : [];
  const keyTakeaways = Array.isArray(frontmatter.keyTakeaways) ? frontmatter.keyTakeaways : [];
  const conceptSlugs = Array.isArray(frontmatter.conceptSlugs) ? frontmatter.conceptSlugs : [];
  
  // Construire l'objet concept
  const conceptObject = {
    slug: slug,
    title: frontmatter.title || '',
    description: frontmatter.description || '',
    icon: frontmatter.icon || undefined,
    category: frontmatter.category || undefined,
    difficulty: difficulty,
    tags: tags,
    isFavorite: frontmatter.isFavorite || false,
    keyTakeaways: keyTakeaways,
    conceptSlugs: conceptSlugs,
    mainGuideSlug: frontmatter.mainGuideSlug || undefined,
    content: [
      {
        type: 'markdown',
        content: escapeForTypeScript(content.trim())
      }
    ]
  };

  // Générer le code TypeScript
  return `// src/content/concepts-new/${slug}.ts
import { Concept, conceptSchema } from '@/lib/content-schema';

const conceptData = ${JSON.stringify(conceptObject, null, 2)};

// Validation et export
export const concept: Concept = conceptSchema.parse(conceptData);`;
}

// Fonction principale de migration
function migrateMDXFile(mdxFile) {
  const fullPath = path.join(MDX_SOURCE_DIR, mdxFile);
  const content = fs.readFileSync(fullPath, 'utf-8');
  
  try {
    const { data: frontmatter, content: markdownContent } = matter(content);
    const tsContent = generateTSConcept(frontmatter, markdownContent, mdxFile);
    
    const outputFile = path.join(TS_OUTPUT_DIR, mdxFile.replace('.mdx', '.ts'));
    fs.writeFileSync(outputFile, tsContent);
    
    console.log(`✅ Migrated: ${mdxFile} -> ${path.basename(outputFile)}`);
    return path.basename(outputFile, '.ts');
  } catch (error) {
    console.error(`❌ Error migrating ${mdxFile}:`, error.message);
    return null;
  }
}

// Fonction pour mettre à jour l'index
function updateIndex(migratedFiles) {
  const validFiles = migratedFiles.filter(Boolean);
  
  const imports = validFiles.map((file, index) => {
    const varName = `concept${index + 1}`;
    return `import { concept as ${varName} } from './${file}';`;
  }).join('\n');
  
  const exports = validFiles.map((file, index) => `concept${index + 1}`).join(',\n  ');
  
  const indexContent = `// src/content/concepts-new/index.ts
${imports}

export const allConcepts = [
  ${exports},
];`;
  
  fs.writeFileSync(path.join(TS_OUTPUT_DIR, 'index.ts'), indexContent);
  console.log(`✅ Updated index.ts with ${validFiles.length} concepts`);
}

// Exécution principale
function main() {
  if (!fs.existsSync(TS_OUTPUT_DIR)) {
    fs.mkdirSync(TS_OUTPUT_DIR, { recursive: true });
  }

  const mdxFiles = fs.readdirSync(MDX_SOURCE_DIR)
    .filter(file => file.endsWith('.mdx'))
    .filter(file => !fs.existsSync(path.join(TS_OUTPUT_DIR, file.replace('.mdx', '.ts')))); // Skip already migrated files

  console.log(`🚀 Migrating ${mdxFiles.length} concept MDX files...`);
  
  const migratedFiles = mdxFiles.map(migrateMDXFile);
  
  // Lire les fichiers déjà migrés
  const existingTsFiles = fs.readdirSync(TS_OUTPUT_DIR)
    .filter(file => file.endsWith('.ts') && file !== 'index.ts')
    .map(file => path.basename(file, '.ts'));
  
  const allMigratedFiles = [...existingTsFiles, ...migratedFiles.filter(Boolean)];
  updateIndex(allMigratedFiles);
  
  console.log(`\n🎉 Migration completed! ${migratedFiles.filter(Boolean).length} new files migrated.`);
  console.log(`📦 Total concepts available: ${allMigratedFiles.length}`);
}

main();