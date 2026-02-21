#!/usr/bin/env node
import type { SyncResult } from './adapters/types.js'
import { resolve } from 'node:path'
import { sync } from './sync.js'

const USAGE = `
claudetoall_sync — Sync CLAUDE.md to all AI agents in your repo

Usage:
  claudetoall_sync [options]

Options:
  --dry-run          Show what would change without writing
  --verbose          Show skipped features per target
  --only <targets>   Comma-separated list of targets (cursor,copilot,gemini,codex,cline,windsurf,roo,idx)
  --help             Show this help message

Examples:
  claudetoall_sync
  claudetoall_sync --dry-run
  claudetoall_sync --verbose
  claudetoall_sync --only cursor,copilot
`.trim()

function parseArgs(argv: string[]): {
  dryRun: boolean
  verbose: boolean
  only: string[] | undefined
  help: boolean
} {
  const dryRun = argv.includes('--dry-run')
  const verbose = argv.includes('--verbose')
  const help = argv.includes('--help') || argv.includes('-h')

  const onlyIdx = argv.findIndex(a => a === '--only')
  let only: string[] | undefined
  if (onlyIdx !== -1 && argv[onlyIdx + 1] != null) {
    only = argv[onlyIdx + 1].split(',').map(s => s.trim()).filter(Boolean)
  }
  else {
    const onlyInline = argv.find(a => a.startsWith('--only='))
    if (onlyInline != null) {
      only = onlyInline.slice('--only='.length).split(',').map(s => s.trim()).filter(Boolean)
    }
  }

  return { dryRun, verbose, only, help }
}

function statusIcon(status: SyncResult['status']): string {
  switch (status) {
    case 'created': return '✔'
    case 'updated': return '✔'
    case 'no-change': return '✔'
    case 'skipped': return '⊘'
  }
}

function statusLabel(status: SyncResult['status'], dryRun: boolean): string {
  if (dryRun && status !== 'no-change' && status !== 'skipped') {
    return `(dry-run) would ${status}`
  }
  return status
}

function print(msg: string): void {
  process.stdout.write(`${msg}\n`)
}

function main(): void {
  const args = process.argv.slice(2)
  const { dryRun, verbose, only, help } = parseArgs(args)

  if (help) {
    print(USAGE)
    process.exit(0)
  }

  const repoRoot = resolve(process.cwd())

  const { results, sources } = sync({ repoRoot, dryRun, verbose, only })

  if (sources.main == null) {
    process.stderr.write(`✘ No CLAUDE.md found in ${repoRoot}\n`)
    process.exit(1)
  }

  if (results.length === 0) {
    print('No agent targets detected. Nothing to sync.')
    if (verbose) {
      print('Tip: ensure at least one of .cursor/rules/, AGENTS.md, .roo/rules/, etc. exists.')
    }
    process.exit(0)
  }

  for (const result of results) {
    const icon = statusIcon(result.status)
    const label = statusLabel(result.status, dryRun)
    const reason = result.reason != null ? `  (${result.reason})` : ''
    print(`${icon} ${result.targetFile}  (${label})${verbose ? reason : ''}`)
  }

  if (dryRun) {
    print('\n(dry-run: no files were written)')
  }
}

main()
