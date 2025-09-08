import '@testing-library/jest-dom'

// Setup minimal pour Browser Mode avec gestion de process global
if (typeof globalThis !== 'undefined' && !globalThis.process) {
  globalThis.process = { env: { NODE_ENV: 'test' } } as any
}
