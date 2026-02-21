import type { AdapterFn } from './types.js'
import { join } from 'node:path'
import { writeIfChanged } from './write.js'

/**
 * Writes Claude instructions to AGENTS.md (Codex / OpenAI Codex format)
 */
export const codexAdapter: AdapterFn = (content, repoRoot, { dryRun }) => {
  const label = 'AGENTS.md'

  if (content.main == null) {
    return { targetFile: label, status: 'skipped', reason: 'no CLAUDE.md source' }
  }

  const targetFile = join(repoRoot, 'AGENTS.md')
  return writeIfChanged(targetFile, label, content.main, dryRun)
}
