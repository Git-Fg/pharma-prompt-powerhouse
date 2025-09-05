import type { AnyContent } from '@/types'
import { Container, Section } from '@/components/layout/Container'
import { ContentMetadata } from '@/components/shared/ContentMetadata'
import { cn } from '@/lib/utils'
import { BreadcrumbNavigation } from './BreadcrumbNavigation'

interface ContentPageLayoutProps {
  item: AnyContent
  children: React.ReactNode
  prose?: boolean
  headerContent?: React.ReactNode
}

export function ContentPageLayout({ item, children, prose = true, headerContent }: ContentPageLayoutProps) {
  return (
    <Section>
      <Container maxWidth="4xl">
        <BreadcrumbNavigation />

        {headerContent || (
          <header className="mb-8 space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">{item.title}</h1>
            <p className="text-xl text-muted-foreground">{item.description}</p>
          </header>
        )}

        <ContentMetadata item={item} />

        <main className={cn(prose && 'prose prose-lg dark:prose-invert', 'max-w-none')}>
          {children}
        </main>
      </Container>
    </Section>
  )
}