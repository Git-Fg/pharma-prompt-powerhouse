'use client'

import { Check, Copy, ExternalLink, Settings } from 'lucide-react'
import { useState } from 'react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { multiFormatPromptCardVariants, multiFormatPromptCodeVariants } from '@/components/ui/variants'
import { cn } from '@/lib/utils'
import { designTokens } from '@/design-system/tokens'

interface MultiFormatPromptProps {
  alternativeVersions?: {
    standard?: string
    xml?: string
    aiStudio?: {
      systemPrompt?: string
      userPrompt?: string
    }
  }
  recommendedTools?: {
    standard?: string[]
    xml?: string[]
    aiStudio?: string[]
  }
  variables?: string[]
  className?: string
}

export default function MultiFormatPrompt({
  alternativeVersions,
  recommendedTools,
  variables,
  className = '',
}: MultiFormatPromptProps) {
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({})

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedStates(prev => ({ ...prev, [key]: true }))
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [key]: false }))
      }, 2000)
    }
    catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const hasMultipleFormats = alternativeVersions
    && Object.values(alternativeVersions).filter(Boolean).length > 1

  if (!hasMultipleFormats && alternativeVersions?.standard) {
    // Single format display
    return (
      <Card className={cn(multiFormatPromptCardVariants({ format: 'standard' }), className)}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Prompt
            <Button
              size="sm"
              variant="outline"
              onClick={() => copyToClipboard(alternativeVersions.standard!, 'standard')}
              style={{ marginLeft: designTokens.spacing.sm }}
            >
              {copiedStates.standard ? <Check style={{ width: '1rem', height: '1rem' }} /> : <Copy style={{ width: '1rem', height: '1rem' }} />}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <pre className={multiFormatPromptCodeVariants({ promptType: 'standard' })}>
            {alternativeVersions.standard}
          </pre>
        </CardContent>
      </Card>
    )
  }

  if (!hasMultipleFormats) {
    return null
  }

  return (
    <div className={className}>
      <Tabs defaultValue="standard" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          {alternativeVersions?.standard && (
            <TabsTrigger value="standard">Standard</TabsTrigger>
          )}
          {alternativeVersions?.xml && (
            <TabsTrigger value="xml">XML Structuré</TabsTrigger>
          )}
          {alternativeVersions?.aiStudio && (
            <TabsTrigger value="aiStudio">AI Studio</TabsTrigger>
          )}
        </TabsList>

        {alternativeVersions?.standard && (
          <TabsContent value="standard" style={{ marginTop: designTokens.spacing.lg }}>
            <Card className={multiFormatPromptCardVariants({ format: 'standard' })}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle style={{ fontSize: designTokens.typography.fontSize.lg }}>Version Standard</CardTitle>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(alternativeVersions.standard!, 'standard')}
                  >
                    {copiedStates.standard ? <Check style={{ width: '1rem', height: '1rem' }} /> : <Copy style={{ width: '1rem', height: '1rem' }} />}
                  </Button>
                </div>
                <div className="text-muted-foreground" style={{ fontSize: designTokens.typography.fontSize.sm }}>
                  Pour interfaces de chat classiques
                </div>
              </CardHeader>
              <CardContent style={{ gap: designTokens.spacing.lg }}>
                <pre className={multiFormatPromptCodeVariants({ promptType: 'standard' })}>
                  {alternativeVersions.standard}
                </pre>

                {recommendedTools?.standard && (
                  <div>
                    <h4 className="font-medium" style={{ fontSize: designTokens.typography.fontSize.sm, marginBottom: designTokens.spacing.sm }}>Outils recommandés :</h4>
                    <div className="flex flex-wrap" style={{ gap: designTokens.spacing.sm }}>
                      {recommendedTools.standard.map(tool => (
                        <Badge key={tool} variant="secondary">{tool}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {alternativeVersions?.xml && (
          <TabsContent value="xml" style={{ marginTop: designTokens.spacing.lg }}>
            <Card className={multiFormatPromptCardVariants({ format: 'xml' })}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle style={{ fontSize: designTokens.typography.fontSize.lg }}>Version XML Structurée</CardTitle>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(alternativeVersions.xml!, 'xml')}
                  >
                    {copiedStates.xml ? <Check style={{ width: '1rem', height: '1rem' }} /> : <Copy style={{ width: '1rem', height: '1rem' }} />}
                  </Button>
                </div>
                <div className="text-muted-foreground" style={{ fontSize: designTokens.typography.fontSize.sm }}>
                  Optimisé pour Claude et modèles sensibles à la structure
                </div>
              </CardHeader>
              <CardContent style={{ gap: designTokens.spacing.lg }}>
                <Alert>
                  <Settings style={{ width: '1rem', height: '1rem' }} />
                  <AlertDescription>
                    Cette version utilise des balises XML pour une structuration claire des instructions et une meilleure fiabilité des réponses.
                  </AlertDescription>
                </Alert>

                <pre className={multiFormatPromptCodeVariants({ promptType: 'xml' })}>
                  {alternativeVersions.xml}
                </pre>

                {recommendedTools?.xml && (
                  <div>
                    <h4 className="font-medium" style={{ fontSize: designTokens.typography.fontSize.sm, marginBottom: designTokens.spacing.sm }}>Outils recommandés :</h4>
                    <div className="flex flex-wrap" style={{ gap: designTokens.spacing.sm }}>
                      {recommendedTools.xml.map(tool => (
                        <Badge key={tool} variant="secondary">{tool}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {alternativeVersions?.aiStudio && (
          <TabsContent value="aiStudio" style={{ marginTop: designTokens.spacing.lg }}>
            <Card className={multiFormatPromptCardVariants({ format: 'aiStudio' })}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle style={{ fontSize: designTokens.typography.fontSize.lg }}>Version AI Studio</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(alternativeVersions.aiStudio?.systemPrompt || '', 'system')}
                    >
                      {copiedStates.system ? <Check style={{ width: '1rem', height: '1rem' }} /> : <Copy style={{ width: '1rem', height: '1rem' }} />}
                      System
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(alternativeVersions.aiStudio?.userPrompt || '', 'user')}
                    >
                      {copiedStates.user ? <Check style={{ width: '1rem', height: '1rem' }} /> : <Copy style={{ width: '1rem', height: '1rem' }} />}
                      User
                    </Button>
                  </div>
                </div>
                <div className="text-muted-foreground" style={{ fontSize: designTokens.typography.fontSize.sm }}>
                  Optimisé pour les environnements avec System Prompt séparé
                </div>
              </CardHeader>
              <CardContent style={{ gap: designTokens.spacing.lg }}>
                <Alert>
                  <ExternalLink style={{ width: '1rem', height: '1rem' }} />
                  <AlertDescription>
                    Copiez le System Prompt dans le champ dédié et le User Prompt dans la zone principale pour une performance optimale.
                  </AlertDescription>
                </Alert>

                <div>
                  <h4 className="text-sm font-medium mb-2">System Prompt :</h4>
                  <pre className={multiFormatPromptCodeVariants({ promptType: 'system' })}>
                    {alternativeVersions.aiStudio.systemPrompt}
                  </pre>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">User Prompt :</h4>
                  <pre className={multiFormatPromptCodeVariants({ promptType: 'user' })}>
                    {alternativeVersions.aiStudio.userPrompt}
                  </pre>
                </div>

                {recommendedTools?.aiStudio && (
                  <div>
                    <h4 className="font-medium" style={{ fontSize: designTokens.typography.fontSize.sm, marginBottom: designTokens.spacing.sm }}>Outils recommandés :</h4>
                    <div className="flex flex-wrap" style={{ gap: designTokens.spacing.sm }}>
                      {recommendedTools.aiStudio.map(tool => (
                        <Badge key={tool} variant="secondary">{tool}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>

      {variables && variables.length > 0 && (
        <Card style={{ marginTop: designTokens.spacing.lg }}>
          <CardHeader>
            <CardTitle style={{ fontSize: designTokens.typography.fontSize.lg }}>Variables à Remplacer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {variables.map(variable => (
                <code key={variable} className="bg-muted px-2 py-1 rounded text-sm">
                  {`{{${variable}}}`}
                </code>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
