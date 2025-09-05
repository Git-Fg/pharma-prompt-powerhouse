'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

// Simple mapping pour des noms plus jolis
const pathSegmentNames: Record<string, string> = {
  'concepts': 'Concepts',
  'guides': 'Guides',
  'workflows': 'Workflows',
  'l-arsenal-ia': 'L\'Arsenal IA',
}

export function BreadcrumbNavigation() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  if (segments.length === 0) {
    return null
  }

  return (
    <Breadcrumb className="mb-8">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Accueil</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join('/')}`
          const isLast = index === segments.length - 1
          const name = pathSegmentNames[segment] || segment.replace(/-/g, ' ')

          return (
            <React.Fragment key={href}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast
                  ? (
                      <BreadcrumbPage className="capitalize">{name}</BreadcrumbPage>
                    )
                  : (
                      <BreadcrumbLink asChild>
                        <Link href={href} className="capitalize">{name}</Link>
                      </BreadcrumbLink>
                    )}
              </BreadcrumbItem>
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
