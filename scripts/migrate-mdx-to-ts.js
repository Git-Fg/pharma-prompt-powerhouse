#!/usr/bin/env node
// scripts/migrate-mdx-to-ts.js
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const MDX_TO_TS_GUIDES_DIR = 'src/content/guides';
const TS_OUTPUT_DIR = 'src/content/guides-new';

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
function generateTSGuide(frontmatter, content, filename) {
  const slug = path.basename(filename, '.mdx');
  const kebabCaseName = slug.replace(/-./g, x => x[1].toUpperCase()).replace(/-/g, '');
  
  const difficulty = normalizeDifficulty(frontmatter.difficulty || 'débutant');
  const tags = Array.isArray(frontmatter.tags) ? frontmatter.tags : [];
  const keyTakeaways = Array.isArray(frontmatter.keyTakeaways) ? frontmatter.keyTakeaways : [];
  const conceptSlugs = Array.isArray(frontmatter.conceptSlugs) ? frontmatter.conceptSlugs : [];
  
  // Construire l'objet guide
  const guideObject = {
    slug: slug,
    title: frontmatter.title || '',
    description: frontmatter.description || '',
    icon: frontmatter.icon || undefined,
    category: frontmatter.category || 'guide',
    difficulty: difficulty,
    estimatedTime: frontmatter.estimatedTime || undefined,
    tags: tags,
    isFavorite: frontmatter.isFavorite || false,
    keyTakeaways: keyTakeaways,
    conceptSlugs: conceptSlugs,
    isWorkflow: frontmatter.isWorkflow || false,
    content: [
      {
        type: 'markdown',
        content: escapeForTypeScript(content.trim())
      }
    ]
  };

  // Générer le code TypeScript
  return `// src/content/guides-new/${slug}.ts
import { Guide, guideSchema } from '@/lib/content-schema';

const guideData = ${JSON.stringify(guideObject, null, 2)};

// Validation et export
export const guide: Guide = guideSchema.parse(guideData);`;
}

// Fonction principale de migration
function migrateMDXFile(mdxFile) {
  const fullPath = path.join(MDX_TO_TS_GUIDES_DIR, mdxFile);
  const content = fs.readFileSync(fullPath, 'utf-8');
  
  try {
    const { data: frontmatter, content: markdownContent } = matter(content);
    const tsContent = generateTSGuide(frontmatter, markdownContent, mdxFile);
    
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
    const varName = `guide${index + 1}`;
    return `import { guide as ${varName} } from './${file}';`;
  }).join('\n');
  
  const exports = validFiles.map((file, index) => `guide${index + 1}`).join(',\\n  ');
  
  const indexContent = `// src/content/guides-new/index.ts
${imports}

export const allGuides = [
  ${exports},
];`;
  
  fs.writeFileSync(path.join(TS_OUTPUT_DIR, 'index.ts'), indexContent);
  console.log(`✅ Updated index.ts with ${validFiles.length} guides`);
}

// Exécution principale
function main() {
  if (!fs.existsSync(TS_OUTPUT_DIR)) {
    fs.mkdirSync(TS_OUTPUT_DIR, { recursive: true });
  }

  const mdxFiles = fs.readdirSync(MDX_TO_TS_GUIDES_DIR)
    .filter(file => file.endsWith('.mdx'))
    .filter(file => !fs.existsSync(path.join(TS_OUTPUT_DIR, file.replace('.mdx', '.ts')))); // Skip already migrated files

  console.log(`🚀 Migrating ${mdxFiles.length} MDX files...`);
  
  const migratedFiles = mdxFiles.map(migrateMDXFile);
  
  // Lire les fichiers déjà migrés
  const existingTsFiles = fs.readdirSync(TS_OUTPUT_DIR)
    .filter(file => file.endsWith('.ts') && file !== 'index.ts')
    .map(file => path.basename(file, '.ts'));
  
  const allMigratedFiles = [...existingTsFiles, ...migratedFiles.filter(Boolean)];
  updateIndex(allMigratedFiles);
  
  console.log(`\\n🎉 Migration completed! ${migratedFiles.filter(Boolean).length} new files migrated.`);
  console.log(`📦 Total guides available: ${allMigratedFiles.length}`);
}

if (require.main === module) {
  main();
}