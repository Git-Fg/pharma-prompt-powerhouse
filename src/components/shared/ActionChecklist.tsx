'use client'

import { Check, CheckCircle2, Circle } from 'lucide-react'

import { useState } from 'react'

import { SectionCard } from '@/components/shared/SectionCard'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Checkbox } from '@/components/ui/checkbox'
import { actionChecklistItemVariants, actionChecklistPriorityBadgeVariants, actionChecklistSummaryVariants, actionChecklistTitleVariants } from '@/components/ui/variants'
import { createTestIdProps, generateTestId } from '@/lib/test-utils'
import { designTokens } from '@/design-system/tokens'

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
  testId?: string
}

interface ChecklistContentProps {
  items: ActionItem[]
  checkedItems: Set<string>
  allowChecking: boolean
  toggleItem: (itemId: string) => void
  testId?: string
}

function ChecklistContent({
  items,
  checkedItems,
  allowChecking,
  toggleItem,
  testId,
}: ChecklistContentProps) {
  return (
    <div className="space-y-4" style={{ gap: designTokens.spacing.lg }}>
      <div className="space-y-3" style={{ gap: designTokens.spacing.md }}>
        {items.map((item) => {
          const isChecked = checkedItems.has(item.id)

          return (
            <div
              key={item.id}
              {...createTestIdProps(testId ? `${testId}-item-${item.id}` : `checklist-item-${item.id}`)}
              className={actionChecklistItemVariants({ isChecked, allowChecking })}
              onClick={() => toggleItem(item.id)}
            >
              {allowChecking
                ? (
                    <Checkbox
                      {...createTestIdProps(testId ? `${testId}-checkbox-${item.id}` : `checklist-checkbox-${item.id}`)}
                      checked={isChecked}
                      onCheckedChange={() => toggleItem(item.id)}
                      className="mt-0.5"
                    />
                  )
                : (
                    <Circle className="size-5 mt-0.5 text-muted-foreground" />
                  )}

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2" style={{ marginBottom: designTokens.spacing.xs }}>
                  <h4 className={actionChecklistTitleVariants({ isChecked, priority: item.priority || 'default' })}>
                    {item.title}
                  </h4>
                  {item.priority && (
                    <span className={actionChecklistPriorityBadgeVariants({ priority: item.priority })}>
                      {item.priority === 'high' ? 'Priorité haute' : item.priority === 'medium' ? 'Priorité moyenne' : 'Priorité basse'}
                    </span>
                  )}
                </div>
                {item.description && (
                  <p className={`prose-caption prose-caption-sm ${
                    isChecked ? 'line-through text-muted-foreground' : 'text-muted-foreground'
                  }`}
                  >
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
        <div className={actionChecklistSummaryVariants({ hasCompleted: true })}>
          <div className="flex items-center gap-2" style={{ gap: designTokens.spacing.sm }}>
            <Check className="size-4 text-green-600 dark:text-green-400" />
            <span className="prose-caption prose-caption-sm font-medium text-green-700 dark:text-green-300">
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
            <p className="prose-caption prose-caption-xs text-green-600 dark:text-green-400" style={{ marginTop: designTokens.spacing.xs }}>
              Excellent travail ! Vous avez terminé toutes les actions recommandées.
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export function ActionChecklist({
  title = 'Plan d\'action',
  description = 'Transformez ces connaissances en actions concrètes :',
  items,
  variant = 'default',
  allowChecking = true,
  testId,
}: ActionChecklistProps) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(() => new Set())

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

  const checklistProps = {
    items,
    checkedItems,
    allowChecking,
    toggleItem,
    testId,
  }

  const checklistTestId = testId || generateTestId('checklist', 'main', title?.replace(/\s+/g, '-').toLowerCase())

  if (variant === 'alert') {
    return (
      <Alert {...createTestIdProps(checklistTestId)} className="mb-8">
        <CheckCircle2 className="size-4" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>
          <div style={{ marginTop: designTokens.spacing.md }}>
            <ChecklistContent {...checklistProps} />
          </div>
        </AlertDescription>
      </Alert>
    )
  }

  if (variant === 'card') {
    return (
      <SectionCard
        {...createTestIdProps(checklistTestId)}
        title={title}
        description={description}
        icon={CheckCircle2}
        className="mb-8"
      >
        <ChecklistContent {...checklistProps} />
      </SectionCard>
    )
  }

  return (
    <div {...createTestIdProps(checklistTestId)} className="mb-8 p-6 border rounded-lg bg-background">
      <h3 className="font-semibold flex items-center gap-2" style={{ marginBottom: designTokens.spacing.md }}>
        <CheckCircle2 className="size-5" />
        {title}
      </h3>
      <ChecklistContent {...checklistProps} />
    </div>
  )
}
