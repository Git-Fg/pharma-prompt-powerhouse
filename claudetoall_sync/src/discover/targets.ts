import { existsSync } from 'node:fs'
import { join } from 'node:path'

export type TargetId = 'cursor' | 'copilot' | 'gemini' | 'codex' | 'cline' | 'windsurf' | 'roo' | 'idx'

export interface Target {
  id: TargetId
  /** Path that was found to confirm this agent is set up */
  sentinel: string
}

const CANDIDATES: Array<{ id: TargetId, sentinel: string }> = [
  { id: 'cursor', sentinel: '.cursor/rules' },
  { id: 'copilot', sentinel: '.github/copilot-instructions.md' },
  { id: 'gemini', sentinel: '.gemini' },
  { id: 'codex', sentinel: 'AGENTS.md' },
  { id: 'cline', sentinel: '.cline' },
  { id: 'windsurf', sentinel: '.windsurf' },
  { id: 'roo', sentinel: '.roo/rules' },
  { id: 'idx', sentinel: '.idx/airules.md' },
]

/** Detect which AI agents are already configured in the repo */
export function discoverTargets(repoRoot: string, only?: string[]): Target[] {
  return CANDIDATES
    .filter(c => only == null || only.includes(c.id))
    .filter(c => existsSync(join(repoRoot, c.sentinel)))
    .map(c => ({ id: c.id, sentinel: join(repoRoot, c.sentinel) }))
}
