#!/usr/bin/env node
// scripts/migrate-prompts.mjs
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const MDX_SOURCE_DIR = 'src/content/prompts';
const TS_OUTPUT_DIR = 'src/content/prompts-new';

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
function generateTSPrompt(frontmatter, content, filename) {
  const slug = path.basename(filename, '.mdx');
  
  const difficulty = normalizeDifficulty(frontmatter.difficulty || 'débutant');
  const tags = Array.isArray(frontmatter.tags) ? frontmatter.tags : [];
  const keyTakeaways = Array.isArray(frontmatter.keyTakeaways) ? frontmatter.keyTakeaways : [];
  const conceptSlugs = Array.isArray(frontmatter.conceptSlugs) ? frontmatter.conceptSlugs : [];
  const variables = Array.isArray(frontmatter.variables) ? frontmatter.variables : [];
  
  // Construire l'objet prompt
  const promptObject = {
    slug: slug,
    title: frontmatter.title || '',
    description: frontmatter.description || '',
    icon: frontmatter.icon || undefined,
    category: frontmatter.category || 'prompt',
    difficulty: difficulty,
    tags: tags,
    isFavorite: frontmatter.isFavorite || false,
    keyTakeaways: keyTakeaways,
    conceptSlugs: conceptSlugs,
    targetTool: frontmatter.targetTool || undefined,
    variables: variables,
    domain: frontmatter.domain || undefined,
    useCase: frontmatter.useCase || undefined,
    example: frontmatter.example || undefined,
    estimatedTime: frontmatter.estimatedTime || undefined,
    promptContent: frontmatter.promptContent || undefined,
    systemPromptContent: frontmatter.systemPromptContent || undefined,
    alternativeVersions: frontmatter.alternativeVersions || undefined,
    recommendedTools: frontmatter.recommendedTools || undefined,
    content: [
      {
        type: 'markdown',
        content: escapeForTypeScript(content.trim())
      }
    ]
  };

  // Générer le code TypeScript
  return `// src/content/prompts-new/${slug}.ts
import { Prompt, promptSchema } from '@/lib/content-schema';

const promptData = ${JSON.stringify(promptObject, null, 2)};

// Validation et export
export const prompt: Prompt = promptSchema.parse(promptData);`;
}

// Fonction principale de migration
function migrateMDXFile(mdxFile) {
  const fullPath = path.join(MDX_SOURCE_DIR, mdxFile);
  const content = fs.readFileSync(fullPath, 'utf-8');
  
  try {
    const { data: frontmatter, content: markdownContent } = matter(content);
    const tsContent = generateTSPrompt(frontmatter, markdownContent, mdxFile);
    
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
    const varName = `prompt${index + 1}`;
    return `import { prompt as ${varName} } from './${file}';`;
  }).join('\n');
  
  const exports = validFiles.map((file, index) => `prompt${index + 1}`).join(',\n  ');
  
  const indexContent = `// src/content/prompts-new/index.ts
${imports}

export const allPrompts = [
  ${exports},
];`;
  
  fs.writeFileSync(path.join(TS_OUTPUT_DIR, 'index.ts'), indexContent);
  console.log(`✅ Updated index.ts with ${validFiles.length} prompts`);
}

// Exécution principale
function main() {
  if (!fs.existsSync(TS_OUTPUT_DIR)) {
    fs.mkdirSync(TS_OUTPUT_DIR, { recursive: true });
  }

  const mdxFiles = fs.readdirSync(MDX_SOURCE_DIR)
    .filter(file => file.endsWith('.mdx'))
    .filter(file => !fs.existsSync(path.join(TS_OUTPUT_DIR, file.replace('.mdx', '.ts')))); // Skip already migrated files

  console.log(`🚀 Migrating ${mdxFiles.length} prompt MDX files...`);
  
  const migratedFiles = mdxFiles.map(migrateMDXFile);
  
  // Lire les fichiers déjà migrés
  const existingTsFiles = fs.readdirSync(TS_OUTPUT_DIR)
    .filter(file => file.endsWith('.ts') && file !== 'index.ts')
    .map(file => path.basename(file, '.ts'));
  
  const allMigratedFiles = [...existingTsFiles, ...migratedFiles.filter(Boolean)];
  updateIndex(allMigratedFiles);
  
  console.log(`\n🎉 Migration completed! ${migratedFiles.filter(Boolean).length} new files migrated.`);
  console.log(`📦 Total prompts available: ${allMigratedFiles.length}`);
}

main();