'use client'

import type { BundledLanguage } from '@/components/ui/shadcn-io/code-block'
import { BookOpen, Lightbulb } from 'lucide-react'
import Link from 'next/link'
import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CardBody, CardContainer, CardItem } from '@/components/ui/shadcn-io/3d-card'
import { CodeBlock, CodeBlockBody, CodeBlockContent, CodeBlockCopyButton, CodeBlockFilename, CodeBlockFiles, CodeBlockHeader, CodeBlockItem, CodeBlockSelect, CodeBlockSelectContent, CodeBlockSelectItem, CodeBlockSelectTrigger, CodeBlockSelectValue } from '@/components/ui/shadcn-io/code-block'
import { CopyButton } from '@/components/ui/shadcn-io/copy-button'

// Exemple de données pour le CodeBlock multi-fichiers
const codeExamples = [
  {
    language: 'typescript',
    filename: 'concept.ts',
    code: `interface Concept {
  slug: string
  title: string
  description: string
  difficulty: 'débutant' | 'intermédiaire' | 'avancé'
  category: string
  tags: string[]
  content: ContentBlock[]
}`,
  },
  {
    language: 'tsx',
    filename: 'ConceptCard.tsx',
    code: `export const ConceptCard: React.FC<ConceptCardProps> = ({ concept }) => {
  return (
    <Card className="h-full hover:shadow-lg transition-all">
      <CardHeader>
        <CardTitle>{concept.title}</CardTitle>
        <CardDescription>{concept.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Contenu de la carte */}
      </CardContent>
    </Card>
  )
}`,
  },
]

// Type pour les données du concept
interface ConceptData {
  title: string
  description: string
  difficulty: string
  category: string
  tags: string[]
  slug: string
}

// Exemple de composant ConceptCard amélioré avec 3D effect
export function EnhancedConceptCard({ concept }: { concept: ConceptData }) {
  return (
    <CardContainer className="w-full">
      <CardBody>
        <CardItem translateZ="100" className="w-full">
          <Card className="h-full hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-4 flex-1">
                  <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Lightbulb className="size-6 text-primary" />
                  </div>
                  <CardTitle className="line-clamp-2 flex-1">
                    {concept.title}
                  </CardTitle>
                </div>
              </div>
              <CardDescription className="text-sm text-muted-foreground line-clamp-3">
                {concept.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <BookOpen className="size-4" />
                    <span>
                      Difficulté:
                      {concept.difficulty}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{concept.category}</Badge>
                  {concept.tags?.map((tag: string) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <CardItem translateZ="50" className="w-full">
                  <Link href={`/concepts/${concept.slug}`}>
                    <Button className="w-full" size="sm">
                      Découvrir le concept
                    </Button>
                  </Link>
                </CardItem>
              </div>
            </CardContent>
          </Card>
        </CardItem>
      </CardBody>
    </CardContainer>
  )
}

// Composant d'exemple pour démontrer les nouveaux composants
export function ShadcnExamples() {
  return (
    <div className="space-y-8">
      {/* Exemple 1: Copy Button avec animations */}
      <Card>
        <CardHeader>
          <CardTitle>Copy Button Animé</CardTitle>
          <CardDescription>
            Bouton de copie avec animations fluides et multiples variants
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <CopyButton
              content="console.log('Hello, World!')"
              variant="default"
              size="default"
            />
            <CopyButton
              content="const x = 42;"
              variant="outline"
              size="sm"
            />
            <CopyButton
              content="npm install shadcn-ui"
              variant="ghost"
              size="md"
            />
          </div>
        </CardContent>
      </Card>

      {/* Exemple 2: Code Block avancé */}
      <Card>
        <CardHeader>
          <CardTitle>Code Block Multi-fichiers</CardTitle>
          <CardDescription>
            Bloc de code avancé avec sélection de fichier, syntax highlighting, et numérotation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CodeBlock data={codeExamples} defaultValue="typescript">
            <CodeBlockHeader>
              <CodeBlockFiles>
                {item => (
                  <CodeBlockFilename value={item.language}>
                    {item.filename}
                  </CodeBlockFilename>
                )}
              </CodeBlockFiles>
              <CodeBlockSelect>
                <CodeBlockSelectTrigger>
                  <CodeBlockSelectValue />
                </CodeBlockSelectTrigger>
                <CodeBlockSelectContent>
                  {item => (
                    <CodeBlockSelectItem value={item.language}>
                      {item.filename}
                    </CodeBlockSelectItem>
                  )}
                </CodeBlockSelectContent>
              </CodeBlockSelect>
              <CodeBlockCopyButton />
            </CodeBlockHeader>
            <CodeBlockBody>
              {item => (
                <CodeBlockItem value={item.language} lineNumbers>
                  <CodeBlockContent language={item.language as BundledLanguage}>
                    {item.code}
                  </CodeBlockContent>
                </CodeBlockItem>
              )}
            </CodeBlockBody>
          </CodeBlock>
        </CardContent>
      </Card>

      {/* Exemple 3: 3D Card */}
      <Card>
        <CardHeader>
          <CardTitle>3D Card Effect</CardTitle>
          <CardDescription>
            Carte avec effet 3D au survol de la souris
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <CardContainer className="w-96">
              <CardBody>
                <CardItem translateZ="100" className="w-full">
                  <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white border-0">
                    <CardHeader>
                      <CardTitle className="text-white">Concept Innovant</CardTitle>
                      <CardDescription className="text-blue-100">
                        Découvrez les nouvelles possibilités de l'IA en pharmacie
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <CardItem translateZ="50" className="w-full">
                        <Button variant="secondary" className="w-full bg-white text-blue-600 hover:bg-blue-50">
                          Explorer en 3D
                        </Button>
                      </CardItem>
                    </CardContent>
                  </Card>
                </CardItem>
              </CardBody>
            </CardContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
