import { content } from '@/lib/content-loader';
import { Workflow } from 'lucide-react';
import Link from 'next/link';

interface RelatedWorkflowProps {
    workflowSlug: string;
}

/**
 * Component that displays information about a related workflow
 */
export function RelatedWorkflow({ workflowSlug }: RelatedWorkflowProps) {
    const workflow = content.workflows.find(w => w.slug === workflowSlug);
    
    if (!workflow) return null;

    return (
        <div className="mt-8 p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 rounded-r-lg">
            <h3 className="font-bold text-lg flex items-center">
                <Workflow className="mr-2 size-5"/> 
                Workflow Associé
            </h3>
            <p className="mt-2 text-muted-foreground">
                Ce concept fait partie du workflow: {' '}
                <Link 
                    href={`/workflows/${workflowSlug}`}
                    className="text-blue-600 hover:underline font-medium"
                >
                    {workflow.title}
                </Link>
                .
            </p>
            {workflow.description && (
                <p className="mt-2 text-sm text-muted-foreground italic">
                    {workflow.description}
                </p>
            )}
        </div>
    );
}
