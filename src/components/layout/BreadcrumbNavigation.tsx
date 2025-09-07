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
import { formatBreadcrumbSegments } from '@/lib/navigation'

export function BreadcrumbNavigation() {
  const pathname = usePathname()
  const breadcrumbSegments = formatBreadcrumbSegments(pathname)

  if (breadcrumbSegments.length === 0) {
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
        {breadcrumbSegments.map(segment => (
          <React.Fragment key={segment.href}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {segment.isLast
                ? (
                    <BreadcrumbPage className="capitalize">{segment.name}</BreadcrumbPage>
                  )
                : (
                    <BreadcrumbLink asChild>
                      <Link href={segment.href} className="capitalize">{segment.name}</Link>
                    </BreadcrumbLink>
                  )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
