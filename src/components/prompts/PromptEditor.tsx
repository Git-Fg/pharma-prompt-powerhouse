// src/components/prompts/PromptEditor.tsx

'use client';

import { useState, useEffect } from 'react';
import { content } from '@/lib/content-loader';
import { Prompt as PromptType } from '@/lib/content-schema';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Copy, CheckCircle, Play, Sparkles, Download } from 'lucide-react';
import Link from 'next/link';

interface PromptEditorProps {
  templateToLoad?: string | null;
}

export function PromptEditor({ templateToLoad }: PromptEditorProps) {
  const [promptTemplate, setPromptTemplate] = useState<PromptType | null>(null);
  const [variableValues, setVariableValues] = useState<Record<string, string>>({});
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [generatedSystemPrompt, setGeneratedSystemPrompt] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (templateToLoad) {
      const foundPrompt = content.prompts.find(p => p.slug === templateToLoad);
      if (foundPrompt) {
        setPromptTemplate(foundPrompt);
        const initialValues: Record<string, string> = {};
        foundPrompt.variables?.forEach(varName => {
          initialValues[varName] = '';
        });
        setVariableValues(initialValues);
        setGeneratedPrompt('');
        setGeneratedSystemPrompt('');
      } else {
        toast.error('Erreur', {
          description: `Le template "${templateToLoad}" n'a pas été trouvé.`,
        });
      }
    } else {
      setPromptTemplate(null);
    }
  }, [templateToLoad]);

  const handleVariableChange = (name: string, value: string) => {
    setVariableValues(prev => ({ ...prev, [name]: value }));
  };

  const handleGeneratePrompt = () => {
    if (!promptTemplate?.promptContent) return;

    let finalPrompt = promptTemplate.promptContent;
    let finalSystemPrompt = promptTemplate.systemPromptContent || '';
    
    // Replace variables in both prompts using {{variable}} format
    for (const [key, value] of Object.entries(variableValues)) {
      const placeholder = `{{${key}}}`;
      const replacement = value || `[${key}]`;
      finalPrompt = finalPrompt.replaceAll(placeholder, replacement);
      if (finalSystemPrompt) {
        finalSystemPrompt = finalSystemPrompt.replaceAll(placeholder, replacement);
      }
    }
    
    setGeneratedPrompt(finalPrompt);
    setGeneratedSystemPrompt(finalSystemPrompt);
    
    toast.success('Prompt généré !', {
      description: "Vous pouvez maintenant le copier et l'utiliser.",
    });
  };

  const handleCopy = async (content: string, type: 'prompt' | 'system' = 'prompt') => {
    if (!content) return;
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success('Copié !', {
        description: `Le ${type === 'system' ? 'system prompt' : 'prompt'} a été copié dans le presse-papiers.`
      });
    } catch (_err) {
      toast.error('Erreur', {
        description: 'Impossible de copier.',
      });
    }
  };

  const handleDownload = () => {
    if (!generatedPrompt) return;
    
    let content = '';
    if (generatedSystemPrompt) {
      content += '=== SYSTEM PROMPT ===\n\n';
      content += generatedSystemPrompt;
      content += '\n\n=== USER PROMPT ===\n\n';
    }
    content += generatedPrompt;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${promptTemplate?.slug || 'prompt'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Téléchargé !', {
      description: 'Le prompt a été téléchargé en tant que fichier texte.'
    });
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
        {/* System Prompt if it exists */}
        {promptTemplate.hasSystemPrompt && (
          <Card>
            <CardHeader>
              <CardTitle>🧠 System Prompt</CardTitle>
              <CardDescription>Le rôle et les instructions pour l'IA</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={promptTemplate.systemPromptContent || ''}
                readOnly
                className="min-h-[150px] font-mono bg-muted/50"
              />
            </CardContent>
          </Card>
        )}

        {/* Main Prompt */}
        <Card>
          <CardHeader>
            <CardTitle>🎯 {promptTemplate.hasSystemPrompt ? 'User Prompt' : 'Prompt Principal'}</CardTitle>
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

        {/* Generated content */}
        {(generatedPrompt || generatedSystemPrompt) && (
          <>
            {generatedSystemPrompt && (
              <Card className="border-blue-500/20">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>🧠 System Prompt Généré</CardTitle>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleCopy(generatedSystemPrompt, 'system')}
                    >
                      {copied ? <CheckCircle className="w-4 h-4 mr-2 text-green-600" /> : <Copy className="w-4 h-4 mr-2" />}
                      {copied ? 'Copié !' : 'Copier'}
                    </Button>
                  </div>
                  <CardDescription>
                    À coller dans le champ "System Prompt" de votre outil IA
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={generatedSystemPrompt}
                    readOnly
                    className="min-h-[150px] font-mono"
                  />
                </CardContent>
              </Card>
            )}

            {generatedPrompt && (
              <Card className="border-primary/20">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>🎯 {generatedSystemPrompt ? 'User Prompt' : 'Prompt Final'} Généré</CardTitle>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleCopy(generatedPrompt)}
                      >
                        {copied ? <CheckCircle className="w-4 h-4 mr-2 text-green-600" /> : <Copy className="w-4 h-4 mr-2" />}
                        {copied ? 'Copié !' : 'Copier'}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={handleDownload}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Télécharger .txt
                      </Button>
                    </div>
                  </div>
                  <CardDescription>
                    {generatedSystemPrompt ? 'Votre instruction principale' : 'Prêt à utiliser dans votre outil IA'}
                  </CardDescription>
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
          </>
        )}
      </div>
    </div>
  );
}
