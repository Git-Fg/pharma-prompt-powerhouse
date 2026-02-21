import type { AdapterFn, SyncResult } from './adapters/types.js'
import type { ClaudeContent } from './discover/sources.js'
import type { TargetId } from './discover/targets.js'
import { clineAdapter } from './adapters/cline.js'
import { codexAdapter } from './adapters/codex.js'
import { copilotAdapter } from './adapters/copilot.js'
import { cursorAdapter } from './adapters/cursor.js'
import { geminiAdapter } from './adapters/gemini.js'
import { idxAdapter } from './adapters/idx.js'
import { rooAdapter } from './adapters/roo.js'
import { windsurfAdapter } from './adapters/windsurf.js'
import { discoverSources } from './discover/sources.js'
import { discoverTargets } from './discover/targets.js'

const ADAPTERS: Record<TargetId, AdapterFn> = {
  cursor: cursorAdapter,
  copilot: copilotAdapter,
  gemini: geminiAdapter,
  codex: codexAdapter,
  cline: clineAdapter,
  windsurf: windsurfAdapter,
  roo: rooAdapter,
  idx: idxAdapter,
}

export interface SyncOptions {
  repoRoot: string
  dryRun?: boolean
  verbose?: boolean
  only?: string[]
}

export interface SyncReport {
  results: SyncResult[]
  sources: ClaudeContent
}

/** Core sync loop: discover → transform → write → report */
export function sync(options: SyncOptions): SyncReport {
  const { repoRoot, dryRun = false, verbose = false, only } = options

  const sources = discoverSources(repoRoot)
  const targets = discoverTargets(repoRoot, only)

  const results: SyncResult[] = []

  for (const target of targets) {
    const adapter = ADAPTERS[target.id]
    const result = adapter(sources, repoRoot, { dryRun, verbose })
    results.push(result)
  }

  return { results, sources }
}
