import type { AnyContent } from '@/types'
import { Container, Section } from '@/components/layout/Container'
import { ContentHeader } from '@/components/shared/ContentHeader'
import { ContentMetadata } from '@/components/shared/ContentMetadata'
import { cn } from '@/lib/utils'
import { BreadcrumbNavigation } from './BreadcrumbNavigation'

interface ContentPageLayoutProps {
  item: AnyContent
  children: React.ReactNode
  prose?: boolean
}

export function ContentPageLayout({ item, children, prose = true }: ContentPageLayoutProps) {
  return (
    <Section>
      <Container variant="detail">
        <BreadcrumbNavigation />

        <ContentHeader item={item} />

        <ContentMetadata item={item} />

        <main className={cn(prose && 'prose prose-lg dark:prose-invert', 'max-w-none')}>
          {children}
        </main>
      </Container>
    </Section>
  )
}
