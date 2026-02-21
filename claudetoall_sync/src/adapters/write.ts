import type { SyncResult } from './types.js'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'

/**
 * Write output to targetFile unless content is unchanged (idempotent).
 * In dry-run mode, computes what would happen without writing.
 */
export function writeIfChanged(
  targetFile: string,
  targetLabel: string,
  output: string,
  dryRun: boolean,
): SyncResult {
  const exists = existsSync(targetFile)
  if (exists && readFileSync(targetFile, 'utf-8') === output) {
    return { targetFile: targetLabel, status: 'no-change' }
  }

  const status = exists ? 'updated' : 'created'

  if (!dryRun) {
    mkdirSync(dirname(targetFile), { recursive: true })
    writeFileSync(targetFile, output, 'utf-8')
  }

  return { targetFile: targetLabel, status }
}
