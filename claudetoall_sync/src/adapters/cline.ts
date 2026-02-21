import type { AdapterFn } from './types.js'
import { join } from 'node:path'
import { writeIfChanged } from './write.js'

/**
 * Writes Claude instructions to .cline/rules.md
 */
export const clineAdapter: AdapterFn = (content, repoRoot, { dryRun }) => {
  const label = '.cline/rules.md'

  if (content.main == null) {
    return { targetFile: label, status: 'skipped', reason: 'no CLAUDE.md source' }
  }

  const targetFile = join(repoRoot, '.cline', 'rules.md')
  return writeIfChanged(targetFile, label, content.main, dryRun)
}
