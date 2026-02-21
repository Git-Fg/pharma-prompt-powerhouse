import type { AdapterFn } from './types.js'
import { join } from 'node:path'
import { writeIfChanged } from './write.js'

/**
 * Writes Claude instructions to .gemini/GEMINI.md
 */
export const geminiAdapter: AdapterFn = (content, repoRoot, { dryRun }) => {
  const label = '.gemini/GEMINI.md'

  if (content.main == null) {
    return { targetFile: label, status: 'skipped', reason: 'no CLAUDE.md source' }
  }

  const targetFile = join(repoRoot, '.gemini', 'GEMINI.md')
  return writeIfChanged(targetFile, label, content.main, dryRun)
}
