/**
 * Test utilities for consistent data-testid generation and component testing
 */

import type { ContentBlock } from './content-schema'
import React from 'react'

/**
 * Generate consistent test IDs following the pattern: {component-type}-{component-name}-{optional-identifier}
 */
export function generateTestId(
  componentType: string,
  componentName: string,
  identifier?: string | number,
): string {
  const parts = [componentType, componentName]
  if (identifier !== undefined) {
    parts.push(String(identifier))
  }
  return parts
    .join('-')
    .replace(/[^a-z0-9-]/gi, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()
}

/**
 * Generate test ID for content blocks in ContentRenderer
 */
export function generateContentTestId(block: ContentBlock, index: number): string {
  const typeSlug = block.type.replace(/([A-Z])/g, '-$1').toLowerCase()
  let identifier = String(index)

  // Use block-specific identifiers when available
  if ('id' in block && typeof block.id === 'string') {
    identifier = block.id
  }
  else if ('title' in block && typeof block.title === 'string') {
    identifier = block.title.replace(/\s+/g, '-').toLowerCase()
  }
  else if ('slug' in block && typeof block.slug === 'string') {
    identifier = block.slug
  }

  return generateTestId('content', typeSlug, identifier)
}

/**
 * HOC to add test ID to any component
 */
export function withTestId<T extends React.HTMLAttributes<HTMLElement>>(
  Component: React.ComponentType<T>,
  testId: string,
): React.FC<T> {
  const WithTestId: React.FC<T> = (props) => {
    return React.createElement(Component, { ...props, 'data-testid': testId })
  }
  WithTestId.displayName = `WithTestId(${Component.displayName || Component.name})`
  return WithTestId
}

/**
 * Props for TestableComponent wrapper
 */
export interface TestableComponentProps extends React.HTMLAttributes<HTMLElement> {
  testId?: string
  children: React.ReactNode
}

/**
 * Wrapper component to add test IDs to any element
 */
export function TestableComponent({ testId, children, ...props }: TestableComponentProps) {
  return React.createElement('div', { 'data-testid': testId, ...props }, children)
}

/**
 * Common test ID patterns for reusable components
 */
export const TestIds = {
  // Layout components
  Layout: {
    Header: 'layout-header',
    Footer: 'layout-footer',
    MobileNav: 'layout-mobile-nav',
    Container: (type: string, identifier?: string) => generateTestId('layout', 'container', `${type}${identifier ? `-${identifier}` : ''}`),
    Grid: (type: string, identifier?: string) => generateTestId('layout', 'grid', `${type}${identifier ? `-${identifier}` : ''}`),
  },

  // Navigation
  Navigation: {
    Logo: 'nav-logo',
    Link: (name: string) => generateTestId('nav', 'link', name),
    MobileItem: (name: string) => generateTestId('mobile-nav', 'item', name),
    ThemeToggle: 'nav-theme-toggle',
    SearchTrigger: 'nav-search-trigger',
  },

  // Content
  Content: {
    Block: (type: string, identifier?: string) => generateTestId('content', 'block', `${type}${identifier ? `-${identifier}` : ''}`),
    Section: (type: string) => generateTestId('content', 'section', type),
    Tabs: (value: string) => generateTestId('content', 'tabs', value),
    Accordion: (title: string) => generateTestId('content', 'accordion', title),
  },

  // Interactive components
  Interactive: {
    Checklist: (title?: string) => generateTestId('interactive', 'checklist', title),
    ChecklistItem: (index: number) => generateTestId('interactive', 'checklist-item', index),
    Card: (type: string, identifier: string) => generateTestId('card', type, identifier),
    Button: (action: string) => generateTestId('button', action),
  },

  // Forms
  Form: {
    Input: (name: string) => generateTestId('form', 'input', name),
    Select: (name: string) => generateTestId('form', 'select', name),
    Checkbox: (name: string) => generateTestId('form', 'checkbox', name),
    Submit: 'form-submit',
  },
} as const

/**
 * Utility to create test ID props for React components
 */
export function createTestIdProps(testId: string): { 'data-testid': string } {
  return { 'data-testid': testId }
}
