import { notFound } from 'next/navigation';
import { content, getToolBySlug } from '@/lib/content-loader';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface ToolPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return content.externalTools.map((tool) => ({ slug: tool.slug }));
}

export default function ToolPage({ params }: ToolPageProps) {
  const tool = getToolBySlug(params.slug);

  if (!tool) {
    notFound();
  }

  return (
    <article className="prose dark:prose-invert mx-auto py-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">{tool.title}</h1>
        <p className="text-lg text-muted-foreground">{tool.description}</p>
        <div className="flex justify-center mt-4">
          <Button asChild>
            <a href={tool.url} target="_blank" rel="noopener noreferrer">
              Visiter l'outil <ExternalLink className="ml-2 w-4 h-4" />
            </a>
          </Button>
        </div>
      </header>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {tool.tags.map((tag: string) => <Badge key={tag}>{tag}</Badge>)}
      </div>
      
      {/* You can add more content about the tool here if needed */}

    </article>
  );
}
