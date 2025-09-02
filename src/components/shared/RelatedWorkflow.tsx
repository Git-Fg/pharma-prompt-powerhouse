import Link from 'next/link';
import { getGuideBySlug } from '@/lib/content-loader';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Workflow, CheckCircle, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface RelatedWorkflowProps {
  workflowSlug: string;
  reason: string;
}

export function RelatedWorkflow({ workflowSlug, reason }: RelatedWorkflowProps) {
  // Find workflow in guides (as workflows are part of guides now)
  const workflow = getGuideBySlug(workflowSlug);

  if (!workflow) {
    return (
      <Card className="my-6 border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
        <CardContent className="pt-6">
          <p className="text-amber-800 dark:text-amber-200">
            Workflow "{workflowSlug}" non trouvé dans la collection guides
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="my-6 border-l-4 border-l-purple-500 bg-gradient-to-r from-background to-purple-50/30 dark:to-purple-950/30">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-purple-600" />
              {workflow.title}
            </CardTitle>
            <CardDescription className="text-base mb-3">
              <strong>Pourquoi ce workflow :</strong> {reason}
            </CardDescription>
            <p className="text-sm text-muted-foreground line-clamp-2">{workflow.description}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline" className="bg-background">
            <Workflow className="w-3 h-3 mr-1" />
            Processus
          </Badge>
          {workflow.difficulty && (
            <Badge variant="secondary">
              {workflow.difficulty}
            </Badge>
          )}
          {workflow.estimatedTime && (
            <Badge variant="outline">
              <Clock className="w-3 h-3 mr-1" />
              {workflow.estimatedTime}
            </Badge>
          )}
        </div>

        {/* Compact key takeaways for concise display */}
        {workflow.keyTakeaways && workflow.keyTakeaways.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium mb-2">TLDR :</p>
            <p className="text-sm text-muted-foreground">
              {workflow.keyTakeaways[0]} {workflow.keyTakeaways.length > 1 && `+ ${workflow.keyTakeaways.length - 1} étapes`}
            </p>
          </div>
        )}

        <Button asChild className="w-full">
          <Link 
            href={`/guides/${workflow.slug}`}
            className="inline-flex items-center gap-2"
          >
            <Workflow className="w-4 h-4" />
            Suivre ce workflow
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}