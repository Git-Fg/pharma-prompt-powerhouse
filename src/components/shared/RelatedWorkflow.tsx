import { getGuideBySlug } from '@/lib/content-loader';
import { GuideCard } from '@/components/shared/GuideCard';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Workflow, Info } from 'lucide-react';

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
    <Card className="my-6 bg-primary/5 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-lg text-primary">
          <Workflow className="w-6 h-6" />
          Workflow Recommandé
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3 p-3 bg-background rounded-md border">
          <Info className="w-5 h-5 text-muted-foreground mt-1 flex-shrink-0" />
          <p className="text-muted-foreground"><span className="font-semibold">Pourquoi ce workflow :</span> {reason}</p>
        </div>
        <GuideCard
          slug={workflow.slug}
          title={workflow.title}
          description={workflow.description}
          icon={workflow.icon}
          category={workflow.category}
          difficulty={workflow.difficulty}
          estimatedTime={workflow.estimatedTime}
          isWorkflow={workflow.isWorkflow}
        />
      </CardContent>
    </Card>
  );
}