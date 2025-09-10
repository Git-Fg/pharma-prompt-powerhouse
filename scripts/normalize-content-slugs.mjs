#!/usr/bin/env node

/**
 * Script de normalisation des slugs dans les fichiers de contenu
 *
 * Ce script parcourt tous les fichiers de contenu dans src/content/
 * et normalise les slugs pour garantir qu'ils soient URL-safe.
 *
 * Usage: node scripts/normalize-content-slugs.mjs
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// Recréer la fonction normalizeSlug ici pour éviter les dépendances
function normalizeSlug(slug) {
  return slug
    .normalize('NFD')
    .replace(/[\u0300-\u036F]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

// Obtenir le chemin du répertoire courant
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.join(__dirname, '..')

async function processFiles() {
  const contentDir = path.join(rootDir, 'src', 'content')
  const contentFiles = []

  // Parcourir récursivement les répertoires de contenu
  async function findContentFiles(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)

      if (entry.isDirectory()) {
        await findContentFiles(fullPath)
      }
      else if (entry.isFile() && entry.name.endsWith('.ts') && entry.name !== 'index.ts') {
        contentFiles.push(fullPath)
      }
    }
  }

  await findContentFiles(contentDir)

  console.warn(`Found ${contentFiles.length} content files to process.`)

  let totalModified = 0

  for (const filePath of contentFiles) {
    const content = await fs.readFile(filePath, 'utf-8')
    const slugRegex = /slug:\s*['"`]([^'"`]+)['"`]/
    const match = content.match(slugRegex)

    if (match && match[1]) {
      const rawSlug = match[1]
      const normalized = normalizeSlug(rawSlug)

      if (rawSlug !== normalized) {
        console.warn(`\n📝 ${path.relative(rootDir, filePath)}:`)
        console.warn(`   From: "${rawSlug}"`)
        console.warn(`   To:   "${normalized}"`)

        // Remplacer le slug dans le contenu
        const newContent = content.replace(slugRegex, `slug: '${normalized}'`)
        await fs.writeFile(filePath, newContent, 'utf-8')

        totalModified++

        // Vérifier s'il y a des références à ce slug dans les conceptSlugs
        const conceptSlugRegex = new RegExp(`conceptSlugs:\\s*\\[\\s*['"\`]${rawSlug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"\`]`)
        if (conceptSlugRegex.test(content)) {
          console.warn(`   ⚠️  Warning: This slug is referenced in conceptSlugs - manual update may be needed`)
        }
      }
    }
  }

  console.warn(`\n✅ Slug normalization complete!`)
  console.warn(`📊 Summary: ${totalModified} files modified`)

  if (totalModified > 0) {
    console.warn(`\n💡 Next steps:`)
    console.warn(`   1. Run 'npm run validate' to ensure everything works correctly`)
    console.warn(`   2. Check for any broken conceptSlugs references`)
    console.warn(`   3. Test the application to verify all links work properly`)
  }
}

// Gestion des erreurs
processFiles().catch((error) => {
  console.error('❌ Error during slug normalization:', error)
  process.exit(1)
})
