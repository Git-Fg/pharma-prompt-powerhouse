// src/components/shared/ContentRenderer.tsx
'use client';

import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';
import { ToolRecommendation } from './ToolRecommendation';
import { GuideRecommendation } from './GuideRecommendation';
import { ConceptRecommendation } from './ConceptRecommendation';
import { KeyTakeaways } from './KeyTakeaways';
import { BeforeAfterPrompt } from '../objectifs/BeforeAfterPrompt';
import { InteractiveChecklist } from '../objectifs/InteractiveChecklist';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { ContentBlock } from '@/lib/content-schema';

function assertNever(x: never): never {
  throw new Error(`Unhandled block variant: ${JSON.stringify(x)}`);
}

const BlockSwitch = ({ block }: { block: ContentBlock }) => {
  switch (block.type) {
    case "markdown":
      return <MarkdownRenderer content={block.content} />;
    case "alert":
      return (
        <Alert variant={block.variant} className="my-6">
          {typeof block.title === "string" && <AlertTitle>{block.title}</AlertTitle>}
          <AlertDescription>
            <MarkdownRenderer content={block.content} />
          </AlertDescription>
        </Alert>
      );
    case "toolRecommendation":
      return <ToolRecommendation tags={[]} currentSlug={String(block.slug || "")} />;
    case "guideRecommendation":
      return <GuideRecommendation guideSlug={String(block.slug || "")} reason={String(block.reason || "")} />;
    case "conceptRecommendation":
      return <ConceptRecommendation conceptSlug={String(block.slug || "")} reason={String(block.reason || "")} />;
    case "codeBlock":
      return (
        <CodeBlock
          language={block.language}
          filename={block.filename}
          showLineNumbers={block.showLineNumbers}
        >
          {block.content}
        </CodeBlock>
      );
    case "card":
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
      );
    case "tabs":
      return (
        <Tabs defaultValue={block.defaultValue || block.tabs[0]?.value} className="my-6">
          <TabsList>
            {block.tabs.map((tab: { value: string; title: string; content: ContentBlock[] }) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {block.tabs.map((tab: { value: string; title: string; content: ContentBlock[] }) => (
            <TabsContent key={tab.value} value={tab.value}>
              {tab.content.map((subBlock: ContentBlock, idx: number) => (
                <BlockSwitch key={idx} block={subBlock} />
              ))}
            </TabsContent>
          ))}
        </Tabs>
      );
    // --- NOUVEAUX CAS DE RENDU ---
    case 'keyTakeaways':
      return <KeyTakeaways points={block.points} />;

    case 'beforeAfterPrompt':
      return <BeforeAfterPrompt {...block} />;

    case 'interactiveChecklist':
      return <InteractiveChecklist items={block.items} />;

    case 'accordion':
      return (
        <Accordion type="single" collapsible className="w-full my-6">
          {block.items.map((item: { title: string; content: ContentBlock[] }, index: number) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger>{item.title}</AccordionTrigger>
              <AccordionContent>
                <ContentRenderer content={item.content} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      );

    case 'table':
      return (
        <Table className="my-6">
          {block.caption && <TableCaption>{block.caption}</TableCaption>}
          <TableHeader>
            <TableRow>
              {block.headers.map((header: string, index: number) => (
                <TableHead key={index}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {block.rows.map((row: string[], rowIndex: number) => (
              <TableRow key={rowIndex}>
                {row.map((cell: string, cellIndex: number) => (
                  <TableCell key={cellIndex}>
                    <MarkdownRenderer content={cell} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );

    case 'multiFormatPrompt':
      return (
        <Card className="my-6">
          <CardHeader>
            <CardTitle>Format Multi-Plateforme</CardTitle>
            <CardDescription>Ce prompt est disponible sous plusieurs formats optimisés</CardDescription>
          </CardHeader>
          <CardContent>
            {block.alternativeVersions && (
              <div className="space-y-4">
                <h4 className="font-medium">Versions alternatives disponibles:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {Object.keys(block.alternativeVersions).map((version) => (
                    <li key={version} className="text-sm text-muted-foreground">
                      Version {version}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {block.variables && block.variables.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium">Variables:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {block.variables.map((variable: string) => (
                    <li key={variable} className="text-sm text-muted-foreground">
                      {variable}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      );

    default:
      return assertNever(block as never);
  }
};

// Suppression du code dupliqué et conservation du switch exhaustif

  export function ContentRenderer({ content }: { content: ContentBlock[] }) {
  if (!content || content.length === 0) return null;
  
  return (
    <>
      {content.map((block, index) => (
        <BlockSwitch key={index} block={block} />
      ))}
    </>
  );
}