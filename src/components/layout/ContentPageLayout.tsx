import type { AnyContent } from '@/types'
import { Container, Section } from '@/components/layout/Container'
import { ContentHeader } from '@/components/shared/ContentHeader'
import { ContentMetadata } from '@/components/shared/ContentMetadata'
import { DisclaimerBanner } from '@/components/shared/DisclaimerBanner'
import { cn } from '@/lib/utils'
import { BreadcrumbNavigation } from './BreadcrumbNavigation'

interface ContentPageLayoutProps {
  item: AnyContent
  children: React.ReactNode
  prose?: boolean
}

// Gardes de type pour déterminer le type de contenu
function isExternalTool(item: AnyContent): item is import('@/lib/content-schema').ExternalTool {
  return 'url' in item && typeof item.url === 'string'
}

function isWorkflow(item: AnyContent): item is import('@/lib/content-schema').Workflow {
  return 'cover' in item && typeof item.cover === 'string'
}

export function ContentPageLayout({ item, children, prose = true }: ContentPageLayoutProps) {
  // Déterminer le type de disclaimer selon le contenu
  const getDisclaimerType = () => {
    if (isWorkflow(item)) {
      return 'workflow'
    }
    if (isExternalTool(item)) {
      return 'arsenal'
    }
    return 'all'
  }

  return (
    <Section>
      <Container variant="detail">
        <BreadcrumbNavigation />

        <ContentHeader item={item} />

        <ContentMetadata item={item} />

        <main className={cn(prose && 'prose prose-lg dark:prose-invert', 'max-w-none')}>
          {children}
        </main>

        {/* Ajout des avertissements de sécurité pour tous les contenus */}
        <div className="mt-8">
          <DisclaimerBanner type={getDisclaimerType()} compact={false} />
        </div>
      </Container>
    </Section>
  )
}
