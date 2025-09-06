// src/components/shared/ContentRenderer.tsx
'use client'

import type { ContentBlock } from '@/lib/content-schema'
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CodeBlock } from '@/components/ui/code-block'
import { ContentTable } from '@/components/ui/data-table/ContentTable'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { createTestIdProps, generateContentTestId, generateTestId } from '@/lib/test-utils'
import MultiFormatPrompt from '../prompts/MultiFormatPrompt'
import { ActionChecklist } from './ActionChecklist'
import { Citation } from './Citation'
import { ConceptRecommendation } from './ConceptRecommendation'
import { DefinedTerm } from './DefinedTerm'
import { Example } from './Example'
import { GuideRecommendation } from './GuideRecommendation'
import { KeyTakeaways } from './KeyTakeaways'
import { PointsBlock } from './PointsBlock'
import { Prerequisites } from './Prerequisites'
import { SectionBlock } from './SectionBlock'
import { ToolRecommendation } from './ToolRecommendation'

function assertNever(x: never): never {
  throw new Error(`Unhandled block variant: ${JSON.stringify(x)}`)
}

function BlockSwitch({ block, index }: { block: ContentBlock, index: number }) {
  const testId = generateContentTestId(block, index)

  switch (block.type) {
    case 'markdown':
      return <MarkdownRenderer content={block.content} />
    case 'alert':
      return (
        <Alert
          {...createTestIdProps(testId)}
          variant={block.variant}
          className="my-6"
        >
          {typeof block.title === 'string' && <AlertTitle>{block.title}</AlertTitle>}
          <AlertDescription>
            <MarkdownRenderer content={block.content} />
          </AlertDescription>
        </Alert>
      )
    case 'toolRecommendation':
      return <ToolRecommendation {...createTestIdProps(testId)} tags={[]} currentSlug={String(block.slug || '')} />
    case 'guideRecommendation':
      return <GuideRecommendation {...createTestIdProps(testId)} guideSlug={String(block.slug || '')} reason={String(block.reason || '')} />
    case 'conceptRecommendation':
      return <ConceptRecommendation {...createTestIdProps(testId)} conceptSlug={String(block.slug || '')} reason={String(block.reason || '')} />
    case 'codeBlock':
      return (
        <CodeBlock
          {...createTestIdProps(testId)}
          language={block.language}
          filename={block.filename}
          showLineNumbers={block.showLineNumbers}
        >
          {block.content}
        </CodeBlock>
      )
    case 'card':
      return (
        <Card {...createTestIdProps(testId)} className="my-6">
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
        <Card {...createTestIdProps(testId)} className="my-6">
          <CardContent className="p-4">
            <Tabs defaultValue={block.defaultValue || block.tabs[0]?.value}>
              <TabsList className="grid w-full gap-1" style={{ gridTemplateColumns: `repeat(${block.tabs.length}, 1fr)` }}>
                {block.tabs.map((tab: { value: string, title: string, content: ContentBlock[] }) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    {...createTestIdProps(generateTestId('tab', 'trigger', tab.value))}
                  >
                    {tab.title}
                  </TabsTrigger>
                ))}
              </TabsList>
              {block.tabs.map((tab: { value: string, title: string, content: ContentBlock[] }) => (
                <TabsContent
                  key={tab.value}
                  value={tab.value}
                  className="mt-4"
                  {...createTestIdProps(generateTestId('tab', 'content', tab.value))}
                >
                  {tab.content.map((subBlock: ContentBlock, idx: number) => {
                    // Create a more stable key using the block's properties when available
                    const blockKey = 'id' in subBlock && typeof subBlock.id === 'string'
                      ? subBlock.id
                      : `${subBlock.type}-${idx}`
                    return <BlockSwitch key={`${tab.value}-${blockKey}`} block={subBlock} index={idx} />
                  })}
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      )
    // --- NOUVEAUX CAS DE RENDU ---
    case 'keyTakeaways':
      return (
        <KeyTakeaways
          {...createTestIdProps(testId)}
          points={block.points}
          variant={block.variant}
          contentType={block.contentType}
        />
      )

    case 'prerequisites':
      return <Prerequisites {...createTestIdProps(testId)} items={block.items} />

    case 'actionChecklist':
      return (
        <ActionChecklist
          {...createTestIdProps(testId)}
          title={block.title}
          description={block.description}
          items={block.items}
          variant={block.variant}
          allowChecking={block.allowChecking}
        />
      )

    case 'points':
      return (
        <PointsBlock
          {...createTestIdProps(testId)}
          title={block.title}
          points={block.points}
        />
      )

    case 'definedTerm':
      return (
        <DefinedTerm
          {...createTestIdProps(testId)}
          term={block.term}
          variant={block.variant}
          showIcon={block.showIcon}
        >
          {block.children}
        </DefinedTerm>
      )

    case 'citation':
      return (
        <Citation
          {...createTestIdProps(testId)}
          source={block.source}
          title={block.title}
          url={block.url}
          type={block.citationType}
          author={block.author}
          year={block.year}
          doi={block.doi}
          journal={block.journal}
          volume={block.volume}
          issue={block.issue}
          pages={block.pages}
          abstract={block.abstract}
          variant={block.variant}
        />
      )

    case 'example':
      return (
        <Example
          {...createTestIdProps(testId)}
          title={block.title}
          description={block.description}
          content={block.content}
          type={block.exampleType}
          language={block.language}
          filename={block.filename}
          outcome={block.outcome}
          tags={block.tags}
          difficulty={block.difficulty}
          warnings={block.warnings}
          variant={block.variant}
        />
      )

    case 'introduction':
    case 'analogy':
    case 'section':
    case 'conclusion':
    case 'key-points':
    case 'examples':
    case 'warning':
    case 'definition':
      return (
        <SectionBlock
          {...createTestIdProps(testId)}
          type={block.type}
          title={block.title}
          content={block.content}
          variant={block.variant}
        />
      )

    case 'accordion':
      return (
        <Accordion {...createTestIdProps(testId)} type="single" collapsible className="w-full my-6">
          {block.items.map((item: { title: string, content: ContentBlock[] }, index: number) => (
            <AccordionItem
              value={`item-${index}`}
              // eslint-disable-next-line react/no-array-index-key -- Index acceptable pour des accordéons avec titres uniques
              key={`accordion-${item.title.replace(/\s+/g, '-').toLowerCase()}-${index}`}
              {...createTestIdProps(generateTestId('accordion', 'item', index))}
            >
              <AccordionTrigger {...createTestIdProps(generateTestId('accordion', 'trigger', index))}>
                {item.title}
              </AccordionTrigger>
              <AccordionContent {...createTestIdProps(generateTestId('accordion', 'content', index))}>
                <ContentRenderer content={item.content} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )

    case 'table':
      return (
        <ContentTable
          {...createTestIdProps(testId)}
          headers={block.headers}
          rows={block.rows}
          caption={block.caption}
          className="my-6"
        />
      )

    case 'multiFormatPrompt':
      return (
        <MultiFormatPrompt
          {...createTestIdProps(testId)}
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
        return <BlockSwitch key={`content-${blockKey}`} block={block} index={index} />
      })}
    </>
  )
}
