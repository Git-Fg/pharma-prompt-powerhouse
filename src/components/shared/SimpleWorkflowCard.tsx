import type { Workflow } from '@/lib/content-schema'
import { ArrowRight, Clock, Target } from 'lucide-react'
import Link from 'next/link'
import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DifficultyBadge } from '@/components/ui/enhanced-badge'
import { getIcon } from '@/types/icon-taxonomy'

interface SimpleWorkflowCardProps {
  workflow: Workflow
}

export function SimpleWorkflowCard({ workflow }: SimpleWorkflowCardProps) {
  const Icon = workflow.icon ? getIcon(workflow.icon) : Target

  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-all duration-200 group">
      <CardHeader className="flex-grow">
        <div className="flex items-center justify-between mb-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon className="size-5 text-primary" />
          </div>
          <div className="flex gap-2">
            <DifficultyBadge difficulty={workflow.difficulty} size="sm" />
            {workflow.estimatedTime && (
              <Badge variant="secondary" className="text-xs">
                <Clock className="w-3 h-3 mr-1" />
                {workflow.estimatedTime}
              </Badge>
            )}
          </div>
        </div>

        <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
          {workflow.title}
        </CardTitle>

        <CardDescription className="line-clamp-3 text-sm leading-relaxed">
          {workflow.description}
        </CardDescription>

        <div className="flex flex-wrap gap-1 pt-3">
          {workflow.tags.slice(0, 3).map((tag: string) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <Link href={`/workflows/${workflow.slug}`}>
          <Button className="w-full group/btn">
            <span>Découvrir la méthode</span>
            <ArrowRight className="size-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
