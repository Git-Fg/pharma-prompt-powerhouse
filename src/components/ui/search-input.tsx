'use client'

import { SearchIcon } from 'lucide-react'
import * as React from 'react'
import { cn } from '@/lib/utils'

function SearchInput({ ref, className, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { ref?: React.RefObject<HTMLInputElement | null> }) {
  return (
    <div className="relative">
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
      <input
        ref={ref}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-transparent py-2 pl-10 pr-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...props}
      />
    </div>
  )
}

SearchInput.displayName = 'SearchInput'

export { SearchInput }
