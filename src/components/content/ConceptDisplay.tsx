import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ContentRenderer } from "@/components/shared/ContentRenderer"
import { KeyTakeaways } from "@/components/shared/KeyTakeaways"
import { ContentCard } from "@/components/shared/ContentCard"
import type { Concept, Guide, Workflow } from "@/lib/content-schema"

interface ConceptDisplayProps {
  concept: Concept
  relatedGuides?: Guide[]
  relatedWorkflows?: Workflow[]
}

export function ConceptDisplay({ concept, relatedGuides = [], relatedWorkflows = [] }: ConceptDisplayProps) {
  return (
    <div className="space-y-8">
      {/* En-tête avec métadonnées */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <CardTitle className="text-3xl">{concept.title}</CardTitle>
                <Badge variant="secondary">{concept.category}</Badge>
              </div>
              <p className="text-lg text-muted-foreground">{concept.description}</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Points clés */}
      {concept.keyTakeaways && <KeyTakeaways points={concept.keyTakeaways} />}

      {/* Contenu principal avec onglets */}
      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="content">Contenu</TabsTrigger>
          <TabsTrigger value="guides">Guides liés ({relatedGuides.length})</TabsTrigger>
          <TabsTrigger value="workflows">Workflows ({relatedWorkflows.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>À propos de ce concept</CardTitle>
            </CardHeader>
            <CardContent>
              <ContentRenderer content={concept.content} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guides" className="space-y-4">
          {relatedGuides.length > 0 ? (
            <div className="grid gap-4">
              {relatedGuides.map((guide) => (
                <Card key={guide.slug} className="hover:bg-accent/50 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-lg">{guide.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{guide.description}</p>
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">Aucun guide lié à ce concept</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="workflows" className="space-y-4">
          {relatedWorkflows.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {relatedWorkflows.map((workflow) => (
                <Card key={workflow.slug} className="h-full hover:bg-accent/50 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-lg">{workflow.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{workflow.description}</p>
                    <div className="flex gap-2 pt-2">
                      <Badge variant="outline">{workflow.category}</Badge>
                      <Badge variant="secondary">{workflow.difficulty}</Badge>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">Aucun workflow lié à ce concept</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Section pratique */}
      <Card>
        <CardHeader>
          <CardTitle>Mettons en pratique</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="tools">
              <AccordionTrigger>Outils recommandés</AccordionTrigger>
              <AccordionContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <ContentCard
                    title="Générateur de Flashcards"
                    description="Créez des cartes mémoire pour réviser ce concept"
                    variant="tool"
                    href="/boite-a-outils/flashcards-generator"
                  />
                  <ContentCard
                    title="Éditeur de Prompts"
                    description="Personnalisez des prompts pour ce concept"
                    variant="tool"
                    href="/boite-a-outils/prompt-editor"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}