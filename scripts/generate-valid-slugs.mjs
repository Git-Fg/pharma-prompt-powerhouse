#!/usr/bin/env node

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'

/* eslint-disable no-console -- Script de génération, besoin de console.log */
console.log('📝 Generating valid slugs list for ESLint validation...')

// Check if we have cached content first
const cacheDir = '.content-cache'
const contentCachePath = `${cacheDir}/content.json`

let allSlugs

if (existsSync(contentCachePath)) {
  try {
    console.log('📖 Reading from content cache...')
    const cachedContent = JSON.parse(readFileSync(contentCachePath, 'utf-8'))

    allSlugs = {
      concepts: cachedContent.concepts.map(c => c.slug),
      guides: cachedContent.guides.map(g => g.slug),
      workflows: cachedContent.workflows.map(w => w.slug),
      externalTools: cachedContent.externalTools.map(t => t.slug),

      // Métadonnées pour le futur
      _meta: {
        generatedAt: new Date().toISOString(),
        sourceMethod: 'cache',
        totalSlugs: 0,
        counts: {
          concepts: cachedContent.concepts.length,
          guides: cachedContent.guides.length,
          workflows: cachedContent.workflows.length,
          externalTools: cachedContent.externalTools.length,
        },
      },
    }
  }
  catch (error) {
    console.error('❌ Error reading cached content:', error.message)
    process.exit(1)
  }
}
else {
  console.error('❌ No content cache found.')
  console.log('💡 Run `npm run build` first to generate the content cache')
  process.exit(1)
}

// Calculer le total
allSlugs._meta.totalSlugs
  = allSlugs.concepts.length
    + allSlugs.guides.length
    + allSlugs.workflows.length
    + allSlugs.externalTools.length

// S'assurer que le répertoire de cache existe
if (!existsSync(cacheDir)) {
  mkdirSync(cacheDir, { recursive: true })
}

// Écrire le fichier de slugs valides
const outputPath = `${cacheDir}/valid-slugs.json`
writeFileSync(outputPath, JSON.stringify(allSlugs, null, 2))

console.log('✅ Valid slugs list generated successfully.')
console.log('📊 Summary:')
console.log(`   Concepts: ${allSlugs._meta.counts.concepts}`)
console.log(`   Guides: ${allSlugs._meta.counts.guides}`)
console.log(`   Workflows: ${allSlugs._meta.counts.workflows}`)
console.log(`   External Tools: ${allSlugs._meta.counts.externalTools}`)
console.log(`   Total slugs: ${allSlugs._meta.totalSlugs}`)
console.log(`   Output: ${outputPath}`)

// Optionnel: Vérifier les doublons
const allSlugsList = [
  ...allSlugs.concepts,
  ...allSlugs.guides,
  ...allSlugs.workflows,
  ...allSlugs.externalTools,
]

const duplicates = allSlugsList.filter((slug, index) =>
  allSlugsList.indexOf(slug) !== index,
)

if (duplicates.length > 0) {
  console.warn(`⚠️  Warning: Found duplicate slugs: ${duplicates.join(', ')}`)
}
else {
  console.log('✅ No duplicate slugs found.')
}
/* eslint-enable no-console -- Fin du script de génération */
