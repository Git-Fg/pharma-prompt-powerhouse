// src/components/shared/ContentRenderer.tsx
'use client';

import { ContentBlock } from '@/lib/content-schema';
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';
import { ToolRecommendation } from './ToolRecommendation';
import { GuideRecommendation } from './GuideRecommendation';
import { ConceptRecommendation } from './ConceptRecommendation';

// Define a more flexible content block type
type FlexibleContentBlock = ContentBlock | {
  type: string;
  slug?: string;
  reason?: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  content: string;
  title?: string;
  variant?: string;
  defaultValue?: string;
  tabs?: Array<{
    value: string;
    title: string;
    content: FlexibleContentBlock[];
  }>;
  description?: string;
  [key: string]: unknown;
};

const BlockSwitch = ({ block }: { block: FlexibleContentBlock }) => {
  const flexBlock = block as FlexibleContentBlock & { [key: string]: unknown };
  
  switch (block.type) {
    case 'markdown':
      return <MarkdownRenderer content={flexBlock.content} />;
    
    case 'alert':
      return (
        <Alert variant={flexBlock.variant as "default" | "destructive" | undefined} className="my-6">
          {typeof flexBlock.title === 'string' && <AlertTitle>{flexBlock.title}</AlertTitle>}
          <AlertDescription>
            <MarkdownRenderer content={flexBlock.content} />
          </AlertDescription>
        </Alert>
      );
    
    case 'toolRecommendation':
      return <ToolRecommendation tags={[]} currentSlug={String(flexBlock.slug || '')} />;
    
    case 'guideRecommendation':
      return <GuideRecommendation guideSlug={String(flexBlock.slug || '')} reason={String(flexBlock.reason || '')} />;

    case 'conceptRecommendation':
      return <ConceptRecommendation conceptSlug={String(flexBlock.slug || '')} reason={String(flexBlock.reason || '')} />;

    case 'codeBlock':
      return (
        <CodeBlock 
          language={flexBlock.language as string}
          filename={flexBlock.filename as string}
          showLineNumbers={flexBlock.showLineNumbers as boolean}
        >
          {flexBlock.content}
        </CodeBlock>
      );

    case 'card':
      return (
        <Card className="my-6">
          {(typeof flexBlock.title === 'string' || typeof flexBlock.description === 'string') && (
            <CardHeader>
              {typeof flexBlock.title === 'string' && <CardTitle>{flexBlock.title}</CardTitle>}
              {typeof flexBlock.description === 'string' && <CardDescription>{flexBlock.description}</CardDescription>}
            </CardHeader>
          )}
          <CardContent>
            <MarkdownRenderer content={flexBlock.content} />
          </CardContent>
        </Card>
      );

    case 'tabs':
      return (
        <Tabs defaultValue={flexBlock.defaultValue as string} className="my-6">
          <TabsList>
            {((flexBlock.tabs as Array<{value: string; title: string; content: FlexibleContentBlock[]}>) || []).map((tab) => 
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.title}
              </TabsTrigger>
            )}
          </TabsList>
          {((flexBlock.tabs as Array<{value: string; title: string; content: FlexibleContentBlock[]}>) || []).map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="pt-4">
              <ContentRenderer content={tab.content} />
            </TabsContent>
          ))}
        </Tabs>
      );

    default:
      // Pour l'instant, on gère les cas non couverts avec un message d'erreur
      return (
        <div className="p-4 my-4 bg-red-100 border border-red-500 text-red-800 rounded">
          Erreur : Type de bloc inconnu: {JSON.stringify(block)}
        </div>
      );
  }
};

export function ContentRenderer({ content }: { content: FlexibleContentBlock[] }) {
  if (!content || content.length === 0) return null;
  
  return (
    <>
      {content.map((block, index) => (
        <BlockSwitch key={index} block={block} />
      ))}
    </>
  );
}