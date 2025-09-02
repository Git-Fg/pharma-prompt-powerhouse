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

const BlockSwitch = ({ block }: { block: ContentBlock }) => {
  switch (block.type) {
    case 'markdown':
      return <MarkdownRenderer content={block.content} />;
    
    case 'alert':
      return (
        <Alert variant={block.variant} className="my-6">
          {block.title && <AlertTitle>{block.title}</AlertTitle>}
          <AlertDescription>
            <MarkdownRenderer content={block.content} />
          </AlertDescription>
        </Alert>
      );
    
    case 'toolRecommendation':
      return <ToolRecommendation toolSlug={block.slug} reason={block.reason} />;
    
    case 'guideRecommendation':
      return <GuideRecommendation guideSlug={block.slug} reason={block.reason} />;

    case 'conceptRecommendation':
      return <ConceptRecommendation conceptSlug={block.slug} reason={block.reason} />;

    case 'codeBlock':
      return (
        <CodeBlock 
          language={block.language}
          filename={block.filename}
          showLineNumbers={block.showLineNumbers}
        >
          {block.content}
        </CodeBlock>
      );

    case 'card':
      return (
        <Card className="my-6">
          {(block.title || block.description) && (
            <CardHeader>
              {block.title && <CardTitle>{block.title}</CardTitle>}
              {block.description && <CardDescription>{block.description}</CardDescription>}
            </CardHeader>
          )}
          <CardContent>
            <MarkdownRenderer content={block.content} />
          </CardContent>
        </Card>
      );

    case 'tabs':
      return (
        <Tabs defaultValue={block.defaultValue} className="my-6">
          <TabsList>
            {block.tabs.map((tab) => 
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.title}
              </TabsTrigger>
            )}
          </TabsList>
          {block.tabs.map((tab) => (
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