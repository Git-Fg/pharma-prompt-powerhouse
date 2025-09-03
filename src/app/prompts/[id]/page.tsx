import { notFound } from 'next/navigation';
import { getPromptBySlug } from '@/lib/content-loader';
import { Badge } from '@/components/ui/badge';
import { ContentRenderer } from '@/components/shared/ContentRenderer';
import { CopyButton } from '@/components/ui/copy-button';

interface PromptPageProps {
    params: {
        id: string;
    };
}

export default function PromptPage({ params }: PromptPageProps) {
    const prompt = getPromptBySlug(params.id);

    if (!prompt) {
        notFound();
    }

    const difficultyBadgeColor = {
        débutant: 'bg-green-500',
        intermédiaire: 'bg-yellow-500',
        avancé: 'bg-red-500',
    };

    return (
        <article className="container mx-auto py-8">
            <div className="max-w-4xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">{prompt.title}</h1>
                    <p className="text-lg text-muted-foreground">{prompt.description}</p>
                    <div className="flex flex-wrap items-center gap-2 mt-4">
                        {prompt.tags.map(tag => <Badge key={tag}>{tag}</Badge>)}
                    </div>
                </header>

                {prompt.promptContent && (
                    <div className="bg-card p-4 rounded-lg border my-6">
                        <pre className="whitespace-pre-wrap font-mono text-sm">
                            <code>{prompt.promptContent}</code>
                        </pre>
                        <CopyButton text={prompt.promptContent} />
                    </div>
                )}
                
                <div className="prose dark:prose-invert max-w-none">
                  <ContentRenderer content={prompt.content} />
                </div>

                {prompt.variables && prompt.variables.length > 0 && (
                    <section className="mt-12">
                        <h2 className="text-2xl font-bold mb-4">Variables du Prompt</h2>
                        <ul className="space-y-4">
                            {prompt.variables.map(variable => (
                                <li key={variable} className="p-4 border rounded-md">
                                    <p className="font-mono text-base font-semibold">`{`{${variable}}`}`</p>
                                    <p className="text-muted-foreground">Variable à remplacer par votre contenu</p>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Related Concepts: This section would need to be implemented fully */}
                {/* <section className="mt-12">
                    <h2 className="text-2xl font-bold mb-4">Concepts Associés</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {prompt.conceptSlugs?.map(slug => (
                            // This requires a way to get a concept by slug
                            // const concept = getConceptBySlug(slug);
                            // return concept ? <ConceptCard key={slug} concept={concept} /> : null;
                        ))}
                    </div>
                </section> */}
            </div>
        </article>
    );
}
