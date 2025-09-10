import type { AnyContent } from '@/types'
import { Container, Section } from '@/components/layout/Container'
import { ContentHeader } from '@/components/shared/ContentHeader'
import { ContentMetadata } from '@/components/shared/ContentMetadata'
import { Card } from '@/components/ui/card'
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

        {/* Header section with subtle card styling */}
        <Card className="mb-8 bg-card/60 backdrop-blur-sm border-border/60 shadow-sm">
          <div className="p-6 md:p-8">
            <ContentHeader item={item} />
            <ContentMetadata item={item} />
          </div>
        </Card>

        {/* Main content with enhanced card treatment */}
        <Card className="bg-card/40 backdrop-blur-sm border-border/40 shadow-sm hover:shadow-md transition-shadow duration-300">
          <main className={cn(
            'p-6 md:p-8 lg:p-10',
            prose && 'prose prose-lg dark:prose-invert max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-p:text-muted-foreground prose-strong:text-foreground'
          )}>
            {children}
          </main>
        </Card>
      </Container>
    </Section>
  )
}
