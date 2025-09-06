#!/usr/bin/env node

import { readFileSync } from 'node:fs'
import { glob } from 'glob'
import markdownLinkCheck from 'markdown-link-check'

/* eslint-disable no-console -- Script de validation, besoin de console.log */
console.log('🔍 Checking for broken links in content files...')

// Configuration pour markdown-link-check
const options = {
  timeout: '10s',
  retryOn429: true,
  retryCount: 2,
  ignorePatterns: [
    // Ignorer les liens localhost et de développement
    { pattern: /^https?:\/\/localhost/ },
    { pattern: /^https?:\/\/127\.0\.0\.1/ },
    // Ignorer les liens relatifs internes (ils seront vérifiés par Next.js)
    { pattern: /^\/[^/]/ },
    // Ignorer les ancres locales
    { pattern: /^#/ },
  ],
}

// Trouver tous les fichiers de contenu TypeScript
const contentFiles = await glob('src/content/**/*.ts')
let hasErrors = false
let totalLinksChecked = 0
let brokenLinksCount = 0

console.log(`📄 Found ${contentFiles.length} content files to analyze`)

for (const file of contentFiles) {
  try {
    const content = readFileSync(file, 'utf8')

    // Extraire le contenu Markdown de toutes les chaînes dans le fichier
    // Split on lines and find those with markdown links
    const lines = content.split('\n')
    const markdownLines = lines.filter(line =>
      line.includes('[') && line.includes(']') && line.includes('(') && line.includes(')'),
    )

    let fileHasLinks = false

    for (const line of markdownLines) {
      // Chercher tous les liens markdown dans cette ligne
      const linkMatches = line.match(/\[([^\]]+)\]\(([^)]+)\)/g) || []

      if (linkMatches.length > 0) {
        if (!fileHasLinks) {
          console.log(`🔗 Analyzing ${file}`)
          fileHasLinks = true
        }

        for (const linkMatch of linkMatches) {
          const urlMatch = linkMatch.match(/\[([^\]]+)\]\(([^)]+)\)/)
          if (!urlMatch)
            continue

          const linkText = urlMatch[1]
          const url = urlMatch[2]

          console.log(`   Found link: "${linkText}" -> ${url}`)

          // Ignorer les liens qui correspondent aux patterns ignorés
          const shouldIgnore = options.ignorePatterns.some(
            pattern => pattern.pattern.test(url),
          )

          if (shouldIgnore) {
            console.log(`   ⏭️  Skipped (internal link): ${url}`)
            continue
          }

          totalLinksChecked++

          // Utiliser une promesse pour markdown-link-check
          await new Promise((resolve) => {
            markdownLinkCheck(linkMatch, options, (err, results) => {
              if (err) {
                console.error(`❌ Error checking links in ${file}: ${err.message}`)
                hasErrors = true
                resolve()
                return
              }

              results.forEach((result) => {
                if (result.status === 'dead') {
                  console.error(`❌ Dead link in ${file}: ${result.link}`)
                  console.error(`   Link text: "${linkText}"`)
                  hasErrors = true
                  brokenLinksCount++
                }
                else if (result.status === 'error') {
                  console.warn(`⚠️  Error checking link in ${file}: ${result.link}`)
                  console.warn(`   Error: ${result.err || 'Unknown error'}`)
                }
                else {
                  console.log(`   ✅ Link is alive: ${result.link}`)
                }
              })
              resolve()
            })
          })
        }
      }
    }
  }
  catch (error) {
    console.error(`❌ Error reading file ${file}: ${error.message}`)
    hasErrors = true
  }
}

// Résumé final
console.log('\n📊 Link validation summary:')
console.log(`   Total external links checked: ${totalLinksChecked}`)
console.log(`   Broken links found: ${brokenLinksCount}`)

if (hasErrors) {
  console.error('\n🚫 Broken links found. Commit aborted.')
  console.error('Please fix the broken links before committing.')
  process.exit(1)
}
else {
  console.log('\n✅ All external links are live.')
}
/* eslint-enable no-console -- Fin du script de validation */
