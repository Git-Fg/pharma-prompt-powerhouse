import type { AdapterFn } from './types.js'
import { join } from 'node:path'
import { writeIfChanged } from './write.js'

/**
 * Writes Claude instructions to .idx/airules.md (Google IDX / Project IDX)
 */
export const idxAdapter: AdapterFn = (content, repoRoot, { dryRun }) => {
  const label = '.idx/airules.md'

  if (content.main == null) {
    return { targetFile: label, status: 'skipped', reason: 'no CLAUDE.md source' }
  }

  const targetFile = join(repoRoot, '.idx', 'airules.md')
  return writeIfChanged(targetFile, label, content.main, dryRun)
}
