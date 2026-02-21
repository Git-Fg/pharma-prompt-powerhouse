import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

export interface ClaudeCommand {
  name: string
  content: string
}

export interface ClaudeAgent {
  name: string
  content: string
}

export interface ClaudeSettings {
  mcpServers?: Record<string, {
    command?: string
    args?: string[]
    env?: Record<string, string>
    [key: string]: unknown
  }>
  [key: string]: unknown
}

export interface ClaudeContent {
  /** Content of CLAUDE.md (null if not found) */
  main: string | null
  /** .claude/commands/*.md entries */
  commands: ClaudeCommand[]
  /** Parsed .claude/settings.json (null if not found) */
  settings: ClaudeSettings | null
  /** .claude/agents/*.md entries */
  agents: ClaudeAgent[]
}

function readMdFiles(dir: string): ClaudeCommand[] {
  if (!existsSync(dir))
    return []
  return readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .map(f => ({
      name: f.slice(0, -3),
      content: readFileSync(join(dir, f), 'utf-8'),
    }))
}

/** Scan the repository for all Claude source files */
export function discoverSources(repoRoot: string): ClaudeContent {
  const claudeMdPath = join(repoRoot, 'CLAUDE.md')
  const main = existsSync(claudeMdPath) ? readFileSync(claudeMdPath, 'utf-8') : null

  const commands = readMdFiles(join(repoRoot, '.claude', 'commands'))
  const agents = readMdFiles(join(repoRoot, '.claude', 'agents'))

  const settingsPath = join(repoRoot, '.claude', 'settings.json')
  let settings: ClaudeSettings | null = null
  if (existsSync(settingsPath)) {
    try {
      settings = JSON.parse(readFileSync(settingsPath, 'utf-8')) as ClaudeSettings
    }
    catch {
      settings = null
    }
  }

  return { main, commands, settings, agents }
}
