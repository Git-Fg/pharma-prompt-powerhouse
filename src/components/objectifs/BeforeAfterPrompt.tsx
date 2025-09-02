'use client';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CodeBlock } from '@/components/ui/code-block';

interface BeforeAfterPromptProps {
  beforePrompt: string;
  afterPrompt: string;
  beforeImageSrc?: string;
  afterImageSrc?: string;
}

export function BeforeAfterPrompt({ beforePrompt, afterPrompt, beforeImageSrc, afterImageSrc }: BeforeAfterPromptProps) {
  return (
    <Tabs defaultValue="before" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="before">❌ Prompt Basique</TabsTrigger>
        <TabsTrigger value="after">✅ Prompt Optimisé</TabsTrigger>
      </TabsList>
      <TabsContent value="before" className="mt-4">
        <CodeBlock language="text">{beforePrompt}</CodeBlock>
        {beforeImageSrc && <Image src={beforeImageSrc} alt="Résultat du prompt basique" width={800} height={400} className="rounded-md border mt-2" />}
      </TabsContent>
      <TabsContent value="after" className="mt-4">
        <CodeBlock language="text">{afterPrompt}</CodeBlock>
        {afterImageSrc && <Image src={afterImageSrc} alt="Résultat du prompt optimisé" width={800} height={400} className="rounded-md border mt-2" />}
      </TabsContent>
    </Tabs>
  );
}