'use client'

import { ArrowRight, BookOpen, Clock, Search, Target } from 'lucide-react'
import Link from 'next/link'
import { CollectionPageLayout } from '@/components/layout/CollectionPageLayout'
import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useAutoAnimateList } from '@/hooks/useAutoAnimate'
import { useContentFilter } from '@/hooks/useContentFilter'
import { difficultyLabels } from '@/lib/constants'
import { content } from '@/lib/content-loader'
import { getIcon } from '@/types/icon-taxonomy'
import { DifficultyBadge } from '@/components/ui/enhanced-badge'

function WorkflowCard({ workflow }: { workflow: typeof content.workflows[0] }) {
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

export default function WorkflowsPage() {
  const listRef = useAutoAnimateList()

  // Use centralized content filtering
  const {
    filteredItems: filteredWorkflows,
    searchTerm,
    setSearchTerm,
    selectedDifficulty,
    setSelectedDifficulty,
    availableDifficulties,
    resetFilters,
  } = useContentFilter(content.workflows)

  // Calculate statistics
  const totalWorkflows = content.workflows.length
  const beginnerCount = content.workflows.filter(w => w.difficulty === 'débutant').length
  const tagCount = new Set(content.workflows.flatMap(w => w.tags)).size
  const avgTime = Math.round(
    content.workflows.reduce((acc, w) => {
      const timeMatch = w.estimatedTime?.match(/\d+/)
      return acc + (timeMatch ? Number.parseInt(timeMatch[0]) : 15)
    }, 0) / content.workflows.length,
  )

  const stats = [
    { value: totalWorkflows, label: 'Workflows disponibles', type: 'workflows' },
    { value: beginnerCount, label: 'Pour débuter', type: 'guides' },
    { value: tagCount, label: "Cas d'usage", type: 'concepts' },
    { value: `${avgTime}min`, label: 'Temps moyen', type: 'tools' },
  ];

  return (
    <CollectionPageLayout
      title="Workflows Stratégiques"
      description="Mes méthodes éprouvées pour utiliser l'IA efficacement dans vos études. Chaque workflow est une étude de cas personnelle avec ma stratégie pas-à-pas."
      stats={stats}
      contentMaxWidth="6xl"
    >
      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
          <Input
            placeholder="Rechercher un workflow..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex justify-center gap-2 flex-wrap">
          <Button
            variant={selectedDifficulty === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedDifficulty('all')}
          >
            Tous
          </Button>
          {availableDifficulties.map(difficulty => (
            <Button
              key={difficulty}
              variant={selectedDifficulty === difficulty ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedDifficulty(difficulty)}
            >
              {difficultyLabels[difficulty as keyof typeof difficultyLabels] || difficulty}
            </Button>
          ))}
        </div>
      </div>

      {/* Workflows Grid */}
      <div ref={listRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredWorkflows.map(workflow => (
          <WorkflowCard key={workflow.slug} workflow={workflow} />
        ))}
      </div>

      {filteredWorkflows.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold mb-2">Aucun workflow trouvé</h3>
          <p className="text-muted-foreground mb-4">
            Essayez de modifier votre recherche ou vos filtres.
          </p>
          <Button variant="outline" onClick={resetFilters}>
            Réinitialiser les filtres
          </Button>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="mt-16 text-center bg-muted p-6 md:p-8 rounded-lg">
        <h3 className="responsive-subheading mb-4">Nouveau dans l'IA ?</h3>
        <p className="prose-description mb-6">
          Je recommande de commencer par comprendre les concepts essentiels avant de vous lancer
          dans un workflow. Cela vous évitera les erreurs courantes que j'ai faites à mes débuts.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/par-ou-commencer">
            <Button>
              Par où commencer ?
              <ArrowRight className="size-4 ml-2" />
            </Button>
          </Link>
          <Link href="/concepts">
            <Button variant="outline">
              Les concepts essentiels
            </Button>
          </Link>
        </div>
      </div>
    </CollectionPageLayout>
  )
}
