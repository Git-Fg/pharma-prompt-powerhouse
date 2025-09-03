// src/components/prompts/PromptEditor.tsx

'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Copy, CheckCircle, Download } from 'lucide-react';
import Link from 'next/link';

interface PromptEditorProps {
  templateToLoad?: string | null;
}

export function PromptEditor({ templateToLoad }: PromptEditorProps) {
  const [userPrompt, setUserPrompt] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (templateToLoad) {
      toast.info('Templates désactivés', {
        description: 'Les templates sont maintenant intégrés dans les workflows. Consultez la section Workflows.',
      });
    }
  }, [templateToLoad]);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success('Copié !', {
        description: 'Le prompt a été copié dans votre presse-papiers.',
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (_err) {
      toast.error('Erreur', {
        description: 'Impossible de copier le texte.',
      });
    }
  };

  const handleDownload = (text: string, filename: string) => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Téléchargé !', {
      description: `Le fichier ${filename} a été téléchargé.`,
    });
  };

  return (
    <div className="grid lg:grid-cols-1 gap-6">
      <div className="space-y-6">
        {/* Template Loading Notice */}
        {templateToLoad && (
          <Card className="border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="text-yellow-800">Templates migrés</CardTitle>
              <CardDescription className="text-yellow-700">
                Les templates de prompts ont été intégrés dans les workflows. Visitez la section Workflows pour accéder aux prompts structurés.
              </CardDescription>
            </CardHeader>
          </Card>
        )}

        {/* Manual Prompt Editor */}
        <Card>
          <CardHeader>
            <CardTitle>✏️ Éditeur de Prompts</CardTitle>
            <CardDescription>
              Créez et testez vos prompts manuellement
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="system-prompt">System Prompt (optionnel)</Label>
              <Textarea
                id="system-prompt"
                placeholder="Définissez le rôle et les instructions pour l'IA..."
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="user-prompt">User Prompt</Label>
              <Textarea
                id="user-prompt"
                placeholder="Écrivez votre prompt principal ici..."
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                className="min-h-[200px]"
              />
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={() => handleCopy(systemPrompt + '\n\n' + userPrompt)} 
                className="flex-1"
                disabled={!userPrompt.trim()}
              >
                {copied ? <CheckCircle className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                Copier tout
              </Button>
              <Button 
                variant="outline"
                onClick={() => handleDownload(systemPrompt + '\n\n' + userPrompt, 'prompt.txt')}
                disabled={!userPrompt.trim()}
              >
                <Download className="w-4 h-4 mr-2" />
                Télécharger
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Help Card */}
        <Card>
          <CardHeader>
            <CardTitle>💡 Conseil</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Pour des prompts pré-configurés et optimisés, consultez nos{' '}
              <Link href="/workflows" className="text-primary hover:underline">
                Workflows Stratégiques
              </Link>{' '}
              qui incluent des prompts testés et documentés.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}