// src/components/shared/ContentRenderer.tsx
'use client'

import type { ContentBlock } from '@/lib/content-schema'
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CodeBlock } from '@/components/ui/code-block'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import MultiFormatPrompt from '../prompts/MultiFormatPrompt'
import { ActionChecklist } from './ActionChecklist'
import { ConceptRecommendation } from './ConceptRecommendation'
import { GuideRecommendation } from './GuideRecommendation'
import { KeyTakeaways } from './KeyTakeaways'
import { Prerequisites } from './Prerequisites'
import { ToolRecommendation } from './ToolRecommendation'

function assertNever(x: never): never {
  throw new Error(`Unhandled block variant: ${JSON.stringify(x)}`)
}

function BlockSwitch({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'markdown':
      return <MarkdownRenderer content={block.content} />
    case 'alert':
      return (
        <Alert variant={block.variant} className="my-6">
          {typeof block.title === 'string' && <AlertTitle>{block.title}</AlertTitle>}
          <AlertDescription>
            <MarkdownRenderer content={block.content} />
          </AlertDescription>
        </Alert>
      )
    case 'toolRecommendation':
      return <ToolRecommendation tags={[]} currentSlug={String(block.slug || '')} />
    case 'guideRecommendation':
      return <GuideRecommendation guideSlug={String(block.slug || '')} reason={String(block.reason || '')} />
    case 'conceptRecommendation':
      return <ConceptRecommendation conceptSlug={String(block.slug || '')} reason={String(block.reason || '')} />
    case 'codeBlock':
      return (
        <CodeBlock
          language={block.language}
          filename={block.filename}
          showLineNumbers={block.showLineNumbers}
        >
          {block.content}
        </CodeBlock>
      )
    case 'card':
      return (
        <Card className="my-6">
          <CardHeader>
            {block.title && <CardTitle>{block.title}</CardTitle>}
            {block.description && <CardDescription>{block.description}</CardDescription>}
          </CardHeader>
          <CardContent>
            <MarkdownRenderer content={block.content} />
          </CardContent>
        </Card>
      )
    case 'tabs':
      return (
        <Card className="my-6">
          <CardContent className="p-4">
            <Tabs defaultValue={block.defaultValue || block.tabs[0]?.value}>
              <TabsList className={`grid w-full grid-cols-${block.tabs.length}`}>
                {block.tabs.map((tab: { value: string, title: string, content: ContentBlock[] }) => (
                  <TabsTrigger key={tab.value} value={tab.value}>
                    {tab.title}
                  </TabsTrigger>
                ))}
              </TabsList>
              {block.tabs.map((tab: { value: string, title: string, content: ContentBlock[] }) => (
                <TabsContent key={tab.value} value={tab.value} className="mt-4">
                  {tab.content.map((subBlock: ContentBlock, idx: number) => {
                    // Create a more stable key using the block's properties when available
                    const blockKey = 'id' in subBlock && typeof subBlock.id === 'string'
                      ? subBlock.id
                      : `${subBlock.type}-${idx}`
                    return <BlockSwitch key={`${tab.value}-${blockKey}`} block={subBlock} />
                  })}
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      )
    // --- NOUVEAUX CAS DE RENDU ---
    case 'keyTakeaways':
      return <KeyTakeaways points={block.points} />

    case 'prerequisites':
      return <Prerequisites items={block.items} />

    case 'actionChecklist':
      return (
        <ActionChecklist
          title={block.title}
          description={block.description}
          items={block.items}
          variant={block.variant}
          allowChecking={block.allowChecking}
        />
      )

    case 'accordion':
      return (
        <Accordion type="single" collapsible className="w-full my-6">
          {block.items.map((item: { title: string, content: ContentBlock[] }, index: number) => (
            <AccordionItem value={`item-${index}`} key={`accordion-${item.title.replace(/\s+/g, '-').toLowerCase()}-${index}`}>
              <AccordionTrigger>{item.title}</AccordionTrigger>
              <AccordionContent>
                <ContentRenderer content={item.content} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )

    case 'table':
      return (
        <div className="my-6">
          {/* Desktop Table View - Enhanced with mobile-first styling */}
          <div className="hidden md:block overflow-x-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
            <Table className="w-full min-w-[600px]">
              {block.caption && <TableCaption>{block.caption}</TableCaption>}
              <TableHeader>
                <TableRow>
                  {block.headers.map((header: string, index: number) => (
                    <TableHead key={`header-${header.replace(/\s+/g, '-').toLowerCase()}-${index}`} className="px-2 py-3 text-sm md:px-4 md:py-3 md:text-base">
                      {header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {block.rows.map((row: string[], rowIndex: number) => (
                  <TableRow key={`row-${rowIndex}`}>
                    {row.map((cell: string, cellIndex: number) => (
                      <TableCell key={`cell-${rowIndex}-${cellIndex}-${cell.substring(0, 20).replace(/[^a-z0-9]/gi, '')}`} className="px-2 py-3 text-sm md:px-4 md:py-3 md:text-base">
                        <MarkdownRenderer content={cell} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Card View - Enhanced with better spacing */}
          <div className="block md:hidden space-y-4">
            {block.rows.map((row: string[], rowIndex: number) => (
              <Card key={`mobile-row-${rowIndex}`} className="p-4">
                {row.map((cell: string, cellIndex: number) => (
                  <div key={`mobile-cell-${rowIndex}-${cellIndex}-${cell.substring(0, 20).replace(/[^a-z0-9]/gi, '')}`} className="mb-3 last:mb-0">
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      {block.headers[cellIndex]}
                    </div>
                    <div className="text-sm leading-relaxed">
                      <MarkdownRenderer content={cell} />
                    </div>
                  </div>
                ))}
              </Card>
            ))}
            {block.caption && (
              <p className="text-sm text-muted-foreground text-center mt-2">
                {block.caption}
              </p>
            )}
          </div>
        </div>
      )

    case 'multiFormatPrompt':
      return (
        <MultiFormatPrompt
          alternativeVersions={block.alternativeVersions}
          recommendedTools={block.recommendedTools}
          variables={block.variables}
          className="my-6"
        />
      )

    default:
      return assertNever(block as never)
  }
}

// Suppression du code dupliqué et conservation du switch exhaustif

export function ContentRenderer({ content }: { content: ContentBlock[] }) {
  if (!content || content.length === 0)
    return null

  return (
    <>
      {content.map((block, index) => {
        // Create a more stable key using the block's properties when available
        const blockKey = 'id' in block && typeof block.id === 'string'
          ? block.id
          : `${block.type}-${index}`
        return <BlockSwitch key={`content-${blockKey}`} block={block} />
      })}
    </>
  )
}
