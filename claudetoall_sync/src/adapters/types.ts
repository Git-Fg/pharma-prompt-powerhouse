import type { ClaudeContent } from '../discover/sources.js'

export interface SyncResult {
  targetFile: string
  status: 'created' | 'updated' | 'no-change' | 'skipped'
  reason?: string
}

export interface AdapterOptions {
  dryRun: boolean
  verbose: boolean
}

export type AdapterFn = (content: ClaudeContent, repoRoot: string, opts: AdapterOptions) => SyncResult
