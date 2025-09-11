import { ArrowLeft, Search } from 'lucide-react'
import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import Button from '@/components/ui/button'
import { designTokens } from '@/design-system/tokens'

export default function NotFound() {
  return (
    <div className="container mx-auto text-center" style={{ 
      paddingLeft: designTokens.spacing.md, 
      paddingRight: designTokens.spacing.md,
      paddingTop: designTokens.spacing.xl4,
      paddingBottom: designTokens.spacing.xl4
    }}>
      <Container variant="detail">
        <div className="w-16 h-16 bg-muted flex items-center justify-center mx-auto" style={{ 
            borderRadius: designTokens.radius.full,
            marginBottom: designTokens.spacing.xl2
          }}>
          <Search className="size-8 text-muted-foreground" />
        </div>

        <h1 className="prose-title prose-title-hero">
          Page non trouvée
        </h1>

        <p className="prose-lg prose-description"
          style={{ marginTop: designTokens.spacing.xl2 }}>
          Désolé, nous n'avons pas trouvé la page que vous recherchez.
        </p>

        <div className="flex items-center justify-center gap-x-6" style={{ marginTop: designTokens.spacing.xl3 }}>
          <Button asChild>
            <Link href="/">
              <ArrowLeft className="size-4" style={{ marginRight: designTokens.spacing.sm }} />
              Retour à l'accueil
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/guides">Voir tous les guides</Link>
          </Button>
        </div>
      </Container>
    </div>
  )
}
