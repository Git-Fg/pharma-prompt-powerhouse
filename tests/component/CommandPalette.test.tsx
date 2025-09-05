import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { CommandPalette } from '@/components/search/CommandPalette'

// Mock the content loader with simpler data
vi.mock('@/lib/content-loader', () => ({
  content: {
    guides: [],
    concepts: [],
    workflows: [],
    externalTools: [],
  },
}))

// Mock router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),

  useSearchParams: () => new URLSearchParams(),

  usePathname: () => '/',
  redirect: vi.fn(),
  notFound: vi.fn(),
}))

describe('commandPalette', () => {
  it('should render without crashing', () => {
    expect(() => {
      render(<CommandPalette />)
    }).not.toThrow()
  })

  it('should set up keyboard event listeners', () => {
    const addEventListenerSpy = vi.spyOn(document, 'addEventListener')

    render(<CommandPalette />)

    expect(addEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function))
  })

  it('should clean up event listeners on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener')

    const { unmount } = render(<CommandPalette />)

    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function))
  })
})
