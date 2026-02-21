import type { AdapterFn } from './types.js'
import { join } from 'node:path'
import { writeIfChanged } from './write.js'

/**
 * Writes Claude instructions to .cursor/rules/claude.mdc
 * Format: MDC file with Cursor-specific frontmatter
 */
export const cursorAdapter: AdapterFn = (content, repoRoot, { dryRun }) => {
  const label = '.cursor/rules/claude.mdc'

  if (content.main == null) {
    return { targetFile: label, status: 'skipped', reason: 'no CLAUDE.md source' }
  }

  const targetFile = join(repoRoot, '.cursor', 'rules', 'claude.mdc')

  const output = `---
description: Claude project instructions (synced from CLAUDE.md)
globs: "**/*"
alwaysApply: true
---

${content.main}`

  return writeIfChanged(targetFile, label, output, dryRun)
}
