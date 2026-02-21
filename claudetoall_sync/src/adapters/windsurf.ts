import type { AdapterFn } from './types.js'
import { join } from 'node:path'
import { writeIfChanged } from './write.js'

/**
 * Writes Claude instructions to .windsurf/rules.md
 */
export const windsurfAdapter: AdapterFn = (content, repoRoot, { dryRun }) => {
  const label = '.windsurf/rules.md'

  if (content.main == null) {
    return { targetFile: label, status: 'skipped', reason: 'no CLAUDE.md source' }
  }

  const targetFile = join(repoRoot, '.windsurf', 'rules.md')
  return writeIfChanged(targetFile, label, content.main, dryRun)
}
