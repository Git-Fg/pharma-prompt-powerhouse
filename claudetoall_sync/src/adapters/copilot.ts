import type { AdapterFn } from './types.js'
import { join } from 'node:path'
import { writeIfChanged } from './write.js'

/**
 * Writes Claude instructions to .github/copilot-instructions.md
 */
export const copilotAdapter: AdapterFn = (content, repoRoot, { dryRun }) => {
  const label = '.github/copilot-instructions.md'

  if (content.main == null) {
    return { targetFile: label, status: 'skipped', reason: 'no CLAUDE.md source' }
  }

  const targetFile = join(repoRoot, '.github', 'copilot-instructions.md')
  return writeIfChanged(targetFile, label, content.main, dryRun)
}
