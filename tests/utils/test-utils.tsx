import { render, RenderOptions } from '@testing-library/react'
import { ReactElement } from 'react'

// Wrapper personnalisé pour les tests avec providers si nécessaire
const AllTheProviders = ({ children }: { children: ReactElement }) => {
  return children
}

// Custom render function with providers
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

// Réexporter tout de @testing-library/react
export * from '@testing-library/react'
export { customRender as render }