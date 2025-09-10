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
      <Container variant="collection">
        <BreadcrumbNavigation />

        {/* Header section */}
        <div className="mb-8">
          <div className="p-6 md:p-8">
            <ContentHeader item={item} />
            <ContentMetadata item={item} />
          </div>
        </div>

        {/* Main content */}
        <main className={cn(
          'p-6 md:p-8 lg:p-10',
          prose && 'prose prose-lg dark:prose-invert max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-p:text-muted-foreground prose-strong:text-foreground',
        )}
        >
          {children}
        </main>
      </Container>
    </Section>
  )
}
