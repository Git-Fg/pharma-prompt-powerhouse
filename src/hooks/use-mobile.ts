import { useEffect, useState } from 'react'

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)

    const updateIsMobile = () => {
      setIsMobile(mql.matches) // Use mql.matches instead of window.innerWidth
    }

    mql.addEventListener('change', updateIsMobile)
    updateIsMobile()

    return () => mql.removeEventListener('change', updateIsMobile)
  }, [])

  return !!isMobile
}
