#!/usr/bin/env node
// scripts/migrate-external-tools.mjs
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const MDX_SOURCE_DIR = 'src/content/external-tools';
const TS_OUTPUT_DIR = 'src/content/external-tools-new';

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
function generateTSExternalTool(frontmatter, content, filename) {
  const slug = path.basename(filename, '.mdx');
  
  const difficulty = normalizeDifficulty(frontmatter.difficulty || 'débutant');
  const tags = Array.isArray(frontmatter.tags) ? frontmatter.tags : [];
  const keyTakeaways = Array.isArray(frontmatter.keyTakeaways) ? frontmatter.keyTakeaways : [];
  const conceptSlugs = Array.isArray(frontmatter.conceptSlugs) ? frontmatter.conceptSlugs : [];
  const capabilities = Array.isArray(frontmatter.capabilities) ? frontmatter.capabilities : [];
  const use_cases = Array.isArray(frontmatter.use_cases) ? frontmatter.use_cases : ['Utilisation générale'];
  
  // Construire l'objet external tool
  const externalToolObject = {
    slug: slug,
    title: frontmatter.title || '',
    description: frontmatter.description || '',
    difficulty: difficulty,
    tags: tags,
    isFavorite: frontmatter.isFavorite || false,
    keyTakeaways: keyTakeaways,
    conceptSlugs: conceptSlugs,
    url: frontmatter.url || 'https://example.com',
    category: frontmatter.category || 'outil',
    pricing: frontmatter.pricing || undefined,
    capabilities: capabilities,
    use_cases: use_cases,
    color: frontmatter.color || '#3B82F6',
    tldr: frontmatter.tldr || undefined,
    content: [
      {
        type: 'markdown',
        content: escapeForTypeScript(content.trim())
      }
    ]
  };

  // Générer le code TypeScript
  return `// src/content/external-tools-new/${slug}.ts
import { ExternalTool, externalToolSchema } from '@/lib/content-schema';

const externalToolData = ${JSON.stringify(externalToolObject, null, 2)};

// Validation et export
export const externalTool: ExternalTool = externalToolSchema.parse(externalToolData);`;
}

// Fonction principale de migration
function migrateMDXFile(mdxFile) {
  const fullPath = path.join(MDX_SOURCE_DIR, mdxFile);
  const content = fs.readFileSync(fullPath, 'utf-8');
  
  try {
    const { data: frontmatter, content: markdownContent } = matter(content);
    const tsContent = generateTSExternalTool(frontmatter, markdownContent, mdxFile);
    
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
    const varName = `externalTool${index + 1}`;
    return `import { externalTool as ${varName} } from './${file}';`;
  }).join('\n');
  
  const exports = validFiles.map((file, index) => `externalTool${index + 1}`).join(',\n  ');
  
  const indexContent = `// src/content/external-tools-new/index.ts
${imports}

export const allExternalTools = [
  ${exports},
];`;
  
  fs.writeFileSync(path.join(TS_OUTPUT_DIR, 'index.ts'), indexContent);
  console.log(`✅ Updated index.ts with ${validFiles.length} external tools`);
}

// Exécution principale
function main() {
  if (!fs.existsSync(TS_OUTPUT_DIR)) {
    fs.mkdirSync(TS_OUTPUT_DIR, { recursive: true });
  }

  const mdxFiles = fs.readdirSync(MDX_SOURCE_DIR)
    .filter(file => file.endsWith('.mdx'))
    .filter(file => !fs.existsSync(path.join(TS_OUTPUT_DIR, file.replace('.mdx', '.ts')))); // Skip already migrated files

  console.log(`🚀 Migrating ${mdxFiles.length} external tool MDX files...`);
  
  const migratedFiles = mdxFiles.map(migrateMDXFile);
  
  // Lire les fichiers déjà migrés
  const existingTsFiles = fs.readdirSync(TS_OUTPUT_DIR)
    .filter(file => file.endsWith('.ts') && file !== 'index.ts')
    .map(file => path.basename(file, '.ts'));
  
  const allMigratedFiles = [...existingTsFiles, ...migratedFiles.filter(Boolean)];
  updateIndex(allMigratedFiles);
  
  console.log(`\n🎉 Migration completed! ${migratedFiles.filter(Boolean).length} new files migrated.`);
  console.log(`📦 Total external tools available: ${allMigratedFiles.length}`);
}

main();