import type { AdapterFn } from './types.js'
import { join } from 'node:path'
import { writeIfChanged } from './write.js'

/**
 * Writes Claude instructions to .roo/rules/claude.md
 */
export const rooAdapter: AdapterFn = (content, repoRoot, { dryRun }) => {
  const label = '.roo/rules/claude.md'

  if (content.main == null) {
    return { targetFile: label, status: 'skipped', reason: 'no CLAUDE.md source' }
  }

  const targetFile = join(repoRoot, '.roo', 'rules', 'claude.md')
  return writeIfChanged(targetFile, label, content.main, dryRun)
}
