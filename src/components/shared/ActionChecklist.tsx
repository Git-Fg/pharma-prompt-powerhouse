'use client'

import { useState } from 'react'
import { Check, CheckCircle2, Circle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'

interface ActionItem {
  id: string
  title: string
  description?: string
  priority?: 'high' | 'medium' | 'low'
}

interface ActionChecklistProps {
  title?: string
  description?: string
  items: ActionItem[]
  variant?: 'default' | 'card' | 'alert'
  allowChecking?: boolean
}

export function ActionChecklist({
  title = 'Plan d\'action',
  description = 'Transformez ces connaissances en actions concrètes :',
  items,
  variant = 'default',
  allowChecking = true,
}: ActionChecklistProps) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())

  const toggleItem = (itemId: string) => {
    if (!allowChecking) {
      return
    }

    const newCheckedItems = new Set(checkedItems)
    if (newCheckedItems.has(itemId)) {
      newCheckedItems.delete(itemId)
    }
    else {
      newCheckedItems.add(itemId)
    }
    setCheckedItems(newCheckedItems)
  }

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 dark:text-red-400'
      case 'medium':
        return 'text-orange-600 dark:text-orange-400'
      case 'low':
        return 'text-blue-600 dark:text-blue-400'
      default:
        return 'text-foreground'
    }
  }

  const getPriorityBadge = (priority?: string) => {
    if (!priority) {
      return null
    }

    const labels: Record<string, string> = {
      high: 'Priorité haute',
      medium: 'Priorité moyenne',
      low: 'Priorité basse',
    }

    return (
      <span className={`text-xs px-2 py-1 rounded-full border ${
        priority === 'high' ? 'bg-red-50 border-red-200 text-red-700 dark:bg-red-950 dark:border-red-800 dark:text-red-300'
          : priority === 'medium' ? 'bg-orange-50 border-orange-200 text-orange-700 dark:bg-orange-950 dark:border-orange-800 dark:text-orange-300'
            : 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-300'
      }`}>
        {labels[priority]}
      </span>
    )
  }

  function ChecklistContent() {
    return (
      <div className="space-y-4">
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
        <div className="space-y-3">
          {items.map((item) => {
            const isChecked = checkedItems.has(item.id)

            return (
              <div
                key={item.id}
                className={`flex items-start gap-3 p-3 rounded-lg border transition-all ${
                  isChecked
                    ? 'bg-green-50/50 border-green-200 dark:bg-green-950/20 dark:border-green-800'
                    : 'bg-background hover:bg-accent/50'
                } ${allowChecking ? 'cursor-pointer' : ''}`}
                onClick={() => toggleItem(item.id)}
              >
                {allowChecking
                  ? (
                      <Checkbox
                        checked={isChecked}
                        onCheckedChange={() => toggleItem(item.id)}
                        className="mt-0.5"
                      />
                    )
                  : (
                      <Circle className="size-5 mt-0.5 text-muted-foreground" />
                    )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={`font-medium text-sm ${
                      isChecked ? 'line-through text-muted-foreground' : getPriorityColor(item.priority)
                    }`}>
                      {item.title}
                    </h4>
                    {getPriorityBadge(item.priority)}
                  </div>
                  {item.description && (
                    <p className={`text-xs ${
                      isChecked ? 'line-through text-muted-foreground' : 'text-muted-foreground'
                    }`}>
                      {item.description}
                    </p>
                  )}
                </div>

                {isChecked && (
                  <CheckCircle2 className="size-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                )}
              </div>
            )
          })}
        </div>

        {allowChecking && checkedItems.size > 0 && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg dark:bg-green-950/20 dark:border-green-800">
            <div className="flex items-center gap-2">
              <Check className="size-4 text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium text-green-700 dark:text-green-300">
                {checkedItems.size}
                {' '}
                sur
                {' '}
                {items.length}
                {' '}
                actions complétées
              </span>
            </div>
            {checkedItems.size === items.length && (
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                Excellent travail ! Vous avez terminé toutes les actions recommandées.
              </p>
            )}
          </div>
        )}
      </div>
    )
  }

  if (variant === 'alert') {
    return (
      <Alert className="mb-8">
        <CheckCircle2 className="size-4" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>
          <div className="mt-4">
            <ChecklistContent />
          </div>
        </AlertDescription>
      </Alert>
    )
  }

  if (variant === 'card') {
    return (
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="size-5" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChecklistContent />
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="mb-8 p-6 border rounded-lg bg-background">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <CheckCircle2 className="size-5" />
        {title}
      </h3>
      <ChecklistContent />
    </div>
  )
}