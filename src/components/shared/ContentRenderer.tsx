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

// Define a more flexible content block type

type KnownBlock =
  | { type: "markdown"; content: string }
  | { type: "alert"; variant?: "default"|"destructive"; title?: string; content: string }
  | { type: "toolRecommendation"; slug?: string; reason?: string }
  | { type: "guideRecommendation"; slug?: string; reason?: string }
  | { type: "conceptRecommendation"; slug?: string; reason?: string }
  | { type: "codeBlock"; language: string; filename?: string; showLineNumbers?: boolean; content: string }
  | { type: "card"; title?: string; description?: string; content: string }
  | { type: "tabs"; defaultValue?: string; tabs: Array<{ value: string; title: string; content: KnownBlock[] }> };

function assertNever(x: never): never {
  throw new Error(`Unhandled block variant: ${JSON.stringify(x)}`);
}

const BlockSwitch = ({ block }: { block: KnownBlock }) => {
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
            {block.tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {block.tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              {tab.content.map((subBlock, idx) => (
                <BlockSwitch key={idx} block={subBlock} />
              ))}
            </TabsContent>
          ))}
        </Tabs>
      );
    default:
      return assertNever(block);
  }
};

// Suppression du code dupliqué et conservation du switch exhaustif

  export function ContentRenderer({ content }: { content: KnownBlock[] }) {
  if (!content || content.length === 0) return null;
  
  return (
    <>
      {content.map((block, index) => (
        <BlockSwitch key={index} block={block} />
      ))}
    </>
  );
}