// src/components/prompts/PromptEditor.tsx

'use client';

import { useState, useEffect } from 'react';
import { allPrompts, type Prompt as PromptType } from 'content-collections';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Copy, CheckCircle, Play, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface PromptEditorProps {
  templateToLoad?: string | null;
}

export function PromptEditor({ templateToLoad }: PromptEditorProps) {
  const { toast } = useToast();
  const [promptTemplate, setPromptTemplate] = useState<PromptType | null>(null);
  const [variableValues, setVariableValues] = useState<Record<string, string>>({});
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (templateToLoad) {
      const foundPrompt = allPrompts.find(p => p.slug === templateToLoad);
      if (foundPrompt) {
        setPromptTemplate(foundPrompt);
        const initialValues: Record<string, string> = {};
        foundPrompt.variables?.forEach(varName => {
          initialValues[varName] = '';
        });
        setVariableValues(initialValues);
        setGeneratedPrompt('');
      } else {
        toast({
          title: 'Erreur',
          description: `Le template "${templateToLoad}" n'a pas été trouvé.`,
          variant: 'destructive',
        });
      }
    } else {
      setPromptTemplate(null);
    }
  }, [templateToLoad, toast]);

  const handleVariableChange = (name: string, value: string) => {
    setVariableValues(prev => ({ ...prev, [name]: value }));
  };

  const handleGeneratePrompt = () => {
    if (!promptTemplate?.promptContent) return;

    let finalPrompt = promptTemplate.promptContent;
    for (const [key, value] of Object.entries(variableValues)) {
      // Utiliser replaceAll pour une syntaxe plus simple et éviter les problèmes d'échappement
      finalPrompt = finalPrompt.replaceAll(`{${key}}`, value || `[${key}]`);
    }
    setGeneratedPrompt(finalPrompt);
    toast({
      title: 'Prompt généré !',
      description: "Vous pouvez maintenant le copier et l'utiliser.",
    });
  };

  const handleCopy = async () => {
    if (!generatedPrompt) return;
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({ title: 'Copié !', description: 'Le prompt a été copié dans le presse-papiers.' });
    } catch (_err) { // Renommer la variable pour indiquer qu'elle n'est pas utilisée
      toast({ title: 'Erreur', description: 'Impossible de copier.', variant: 'destructive' });
    }
  };

  if (!promptTemplate) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <Card className="max-w-lg mx-auto">
          <CardHeader>
            <Sparkles className="w-12 h-12 mx-auto text-muted-foreground" />
            <CardTitle className="mt-4">Bienvenue dans l'Éditeur</CardTitle>
            <CardDescription>
              Sélectionnez un prompt depuis la bibliothèque pour commencer l'édition.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/prompts">Explorer les prompts</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Variables du Prompt</CardTitle>
            <CardDescription>Remplissez les champs pour personnaliser le prompt.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {promptTemplate.variables?.map(varName => (
              <div key={varName}>
                <Label htmlFor={varName} className="font-mono text-sm">{`{{${varName}}}`}</Label>
                <Input
                  id={varName}
                  value={variableValues[varName] || ''}
                  onChange={(e) => handleVariableChange(varName, e.target.value)}
                  placeholder={`Entrez une valeur pour ${varName}`}
                />
              </div>
            ))}
            <Button onClick={handleGeneratePrompt} className="w-full">
              <Play className="w-4 h-4 mr-2" />
              Générer le prompt
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Prompt de base</CardTitle>
            <CardDescription>{promptTemplate.title}</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={promptTemplate.promptContent || ''}
              readOnly
              className="min-h-[200px] font-mono bg-muted/50"
            />
          </CardContent>
        </Card>

        {generatedPrompt && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Prompt Final Généré</CardTitle>
                <Button variant="outline" size="sm" onClick={handleCopy}>
                  {copied ? <CheckCircle className="w-4 h-4 mr-2 text-green-600" /> : <Copy className="w-4 h-4 mr-2" />}
                  {copied ? 'Copié !' : 'Copier'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                value={generatedPrompt}
                readOnly
                className="min-h-[200px] font-mono"
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
