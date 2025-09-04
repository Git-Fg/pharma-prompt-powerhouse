'use client'

import { Check, Copy, ExternalLink, Settings } from 'lucide-react'
import { useState } from 'react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

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
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Prompt
            <Button
              size="sm"
              variant="outline"
              onClick={() => copyToClipboard(alternativeVersions.standard!, 'standard')}
              className="ml-2"
            >
              {copiedStates.standard ? <Check className="size-4" /> : <Copy className="size-4" />}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="whitespace-pre-wrap bg-muted p-4 rounded-lg text-sm">
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
          <TabsContent value="standard" className="mt-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Version Standard</CardTitle>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(alternativeVersions.standard!, 'standard')}
                  >
                    {copiedStates.standard ? <Check className="size-4" /> : <Copy className="size-4" />}
                  </Button>
                </div>
                <div className="text-sm text-muted-foreground">
                  Pour interfaces de chat classiques
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <pre className="whitespace-pre-wrap bg-muted p-4 rounded-lg text-sm">
                  {alternativeVersions.standard}
                </pre>

                {recommendedTools?.standard && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Outils recommandés :</h4>
                    <div className="flex flex-wrap gap-2">
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
          <TabsContent value="xml" className="mt-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Version XML Structurée</CardTitle>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(alternativeVersions.xml!, 'xml')}
                  >
                    {copiedStates.xml ? <Check className="size-4" /> : <Copy className="size-4" />}
                  </Button>
                </div>
                <div className="text-sm text-muted-foreground">
                  Optimisé pour Claude et modèles sensibles à la structure
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <Settings className="size-4" />
                  <AlertDescription>
                    Cette version utilise des balises XML pour une structuration claire des instructions et une meilleure fiabilité des réponses.
                  </AlertDescription>
                </Alert>

                <pre className="whitespace-pre-wrap bg-muted p-4 rounded-lg text-sm">
                  {alternativeVersions.xml}
                </pre>

                {recommendedTools?.xml && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Outils recommandés :</h4>
                    <div className="flex flex-wrap gap-2">
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
          <TabsContent value="aiStudio" className="mt-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Version AI Studio</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(alternativeVersions.aiStudio?.systemPrompt || '', 'system')}
                    >
                      {copiedStates.system ? <Check className="size-4" /> : <Copy className="size-4" />}
                      System
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(alternativeVersions.aiStudio?.userPrompt || '', 'user')}
                    >
                      {copiedStates.user ? <Check className="size-4" /> : <Copy className="size-4" />}
                      User
                    </Button>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  Optimisé pour les environnements avec System Prompt séparé
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <ExternalLink className="size-4" />
                  <AlertDescription>
                    Copiez le System Prompt dans le champ dédié et le User Prompt dans la zone principale pour une performance optimale.
                  </AlertDescription>
                </Alert>

                <div>
                  <h4 className="text-sm font-medium mb-2">System Prompt :</h4>
                  <pre className="whitespace-pre-wrap bg-muted p-4 rounded-lg text-sm border-l-4 border-blue-500">
                    {alternativeVersions.aiStudio.systemPrompt}
                  </pre>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">User Prompt :</h4>
                  <pre className="whitespace-pre-wrap bg-muted p-4 rounded-lg text-sm border-l-4 border-green-500">
                    {alternativeVersions.aiStudio.userPrompt}
                  </pre>
                </div>

                {recommendedTools?.aiStudio && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Outils recommandés :</h4>
                    <div className="flex flex-wrap gap-2">
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
        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="text-lg">Variables à Remplacer</CardTitle>
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
