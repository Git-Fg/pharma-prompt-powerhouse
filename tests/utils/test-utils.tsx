import type { RenderOptions } from '@testing-library/react'
import type { ReactElement, ReactNode } from 'react'
import { render } from '@testing-library/react'

// Wrapper personnalisé pour les tests avec providers si nécessaire
function AllTheProviders({ children }: { children: ReactNode }) {
  return children as ReactElement
}

// Custom render function with providers
function customRender(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, { wrapper: AllTheProviders, ...options })
}

// Réexporter tout de @testing-library/react
export * from '@testing-library/react'
export { customRender as render }
