#!/usr/bin/env node

// Performance-focused test runner
// Fast validation with timeout handling

import { execSync } from 'node:child_process'

// Test configurations for different scenarios
const testConfigs = {
  // Fast unit tests only
  unit: {
    command: 'npm run test:browser:unit',
    timeout: 30000,
    description: 'Unit tests (fast)',
  },
  // Component tests with medium timeout
  component: {
    command: 'npm run test:browser:component',
    timeout: 60000,
    description: 'Component tests (medium)',
  },
  // Fast tests with short timeout
  fast: {
    command: 'npm run test:browser:fast',
    timeout: 45000,
    description: 'All tests with fast timeout',
  },
  // Full test suite with longer timeout
  full: {
    command: 'npm run test:browser',
    timeout: 180000,
    description: 'Full test suite',
  },
}

function runTest(configName) {
  const config = testConfigs[configName]
  if (!config) {
    console.error(`Unknown test config: ${configName}`)
    console.log('Available configs:', Object.keys(testConfigs).join(', '))
    process.exit(1)
  }

  console.log(`\n🚀 Running ${config.description}...`)
  console.log(`⏱️  Timeout: ${config.timeout}ms`)
  console.log(`📝 Command: ${config.command}`)
  console.log(''.repeat(50))

  const startTime = Date.now()

  try {
    execSync(config.command, {
      timeout: config.timeout,
      stdio: 'inherit',
      encoding: 'utf8',
    })

    const duration = Date.now() - startTime
    console.log(''.repeat(50))
    console.log(`✅ ${config.description} completed successfully`)
    console.log(`⏱️  Duration: ${duration}ms`)
    console.log(`🎯 Performance: ${duration < config.timeout / 2 ? 'Excellent' : duration < config.timeout * 0.8 ? 'Good' : 'Needs attention'}`)
  }
  catch (error) {
    const duration = Date.now() - startTime
    console.log(''.repeat(50))

    if (error.signal === 'SIGTERM') {
      console.log(`⏰ ${config.description} timed out after ${duration}ms`)
      console.log(`💡 Consider using a faster test config or optimizing slow tests`)
    }
    else {
      console.log(`❌ ${config.description} failed after ${duration}ms`)
      console.log(`📊 Error: ${error.message}`)
    }

    process.exit(1)
  }
}

// Get config from command line arg
const configName = process.argv[2] || 'fast'
runTest(configName)
