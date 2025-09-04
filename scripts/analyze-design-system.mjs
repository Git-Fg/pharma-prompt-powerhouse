#!/usr/bin/env node

/**
 * Design System Analysis CLI
 * Analyzes the codebase for hardcoded values and design system issues
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import our migrator (would need proper ESM setup)
const { analyzeComponent, generateMigrationReport } = await import('../src/lib/design-system-migrator.ts');

const SUPPORTED_EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js'];
const EXCLUDE_DIRS = ['node_modules', '.next', 'dist', 'build', '.git'];

function getAllFiles(dir, fileList = []) {
  const files = readdirSync(dir);
  
  for (const file of files) {
    const filePath = join(dir, file);
    const stat = statSync(filePath);
    
    if (stat.isDirectory()) {
      if (!EXCLUDE_DIRS.includes(file)) {
        getAllFiles(filePath, fileList);
      }
    } else if (SUPPORTED_EXTENSIONS.includes(extname(file))) {
      fileList.push(filePath);
    }
  }
  
  return fileList;
}

async function analyzeProject() {
  console.log('🔍 Analyzing project for design system issues...\n');
  
  const projectRoot = join(__dirname, '..');
  const srcDir = join(projectRoot, 'src');
  
  if (!statSync(srcDir).isDirectory()) {
    console.error('❌ No src directory found');
    process.exit(1);
  }
  
  const files = getAllFiles(srcDir);
  console.log(`📁 Found ${files.length} files to analyze\n`);
  
  let totalIssues = 0;
  const issuesByType = {};
  const issuesByFile = [];
  
  for (const filePath of files) {
    try {
      const content = readFileSync(filePath, 'utf8');
      const issues = analyzeComponent(content, filePath);
      
      if (issues.length > 0) {
        totalIssues += issues.length;
        issuesByFile.push({
          file: filePath.replace(projectRoot + '/', ''),
          issues
        });
        
        issues.forEach(issue => {
          issuesByType[issue.type] = (issuesByType[issue.type] || 0) + 1;
        });
      }
    } catch (error) {
      console.warn(`⚠️  Could not analyze ${filePath}: ${error.message}`);
    }
  }
  
  // Generate summary report
  console.log('📊 DESIGN SYSTEM ANALYSIS REPORT');
  console.log('='.repeat(50));
  
  if (totalIssues === 0) {
    console.log('✅ Great! No hardcoded values detected in your codebase.');
    return;
  }
  
  console.log(`\n📈 Summary:`);
  console.log(`   Total files analyzed: ${files.length}`);
  console.log(`   Files with issues: ${issuesByFile.length}`);
  console.log(`   Total issues found: ${totalIssues}\n`);
  
  console.log('📊 Issues by type:');
  Object.entries(issuesByType)
    .sort(([,a], [,b]) => b - a)
    .forEach(([type, count]) => {
      console.log(`   ${type}: ${count} issues`);
    });
  
  console.log('\n🔍 Detailed findings:');
  
  issuesByFile
    .sort((a, b) => b.issues.length - a.issues.length)
    .slice(0, 10) // Show top 10 files with most issues
    .forEach(({ file, issues }) => {
      console.log(`\n📄 ${file} (${issues.length} issues):`);
      issues.slice(0, 5).forEach(issue => { // Show first 5 issues per file
        console.log(`   ⚠️  ${issue.type}: "${issue.value}" → ${issue.suggestion}`);
      });
      if (issues.length > 5) {
        console.log(`   ... and ${issues.length - 5} more issues`);
      }
    });
  
  if (issuesByFile.length > 10) {
    console.log(`\n... and ${issuesByFile.length - 10} more files with issues`);
  }
  
  console.log('\n💡 Recommendations:');
  console.log('   1. Use design tokens from src/lib/design-tokens.ts');
  console.log('   2. Replace hardcoded colors with hsl(var(--color-name))');
  console.log('   3. Use spacing tokens instead of px values');
  console.log('   4. Prefer Tailwind classes over arbitrary values');
  console.log('   5. Run ESLint to get real-time feedback');
  
  console.log('\n🚀 Next steps:');
  console.log('   npm run lint          # See ESLint warnings');
  console.log('   npm run lint:fix       # Auto-fix simple issues');
  console.log('   npm run build          # Verify no build errors');
}

// CLI argument parsing
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case 'analyze':
  case undefined:
    analyzeProject().catch(console.error);
    break;
    
  case 'help':
  case '--help':
  case '-h':
    console.log(`
🎨 Design System Analysis CLI

Usage:
  node scripts/analyze-design-system.mjs [command]

Commands:
  analyze (default)  Analyze the codebase for design system issues
  help              Show this help message

Examples:
  node scripts/analyze-design-system.mjs
  node scripts/analyze-design-system.mjs analyze
  npm run analyze-design-system
`);
    break;
    
  default:
    console.error(`❌ Unknown command: ${command}`);
    console.log('Run with --help for usage information');
    process.exit(1);
}