"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Save, Copy, Download, Play } from "lucide-react";

interface PromptEditorProps {
  templateToLoad?: string | null;
  initialTitle?: string;
  initialContent?: string;
}

export function PromptEditor({ 
  templateToLoad: _templateToLoad,
  initialTitle = "", 
  initialContent = "" 
}: PromptEditorProps) {
  const { toast } = useToast();
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [isSaving, startSavingTransition] = useTransition();

  const handleSave = () => {
    if (!title.trim()) {
      toast({
        title: "Erreur",
        description: "Le titre est obligatoire.",
        variant: "destructive",
      });
      return;
    }

    if (!content.trim()) {
      toast({
        title: "Erreur",
        description: "Le contenu est obligatoire.",
        variant: "destructive",
      });
      return;
    }

    startSavingTransition(() => {
      // Simulation de sauvegarde
      setTimeout(() => {
        toast({
          title: "Prompt sauvegardé !",
          description: "Votre prompt a été sauvegardé avec succès.",
        });
      }, 1000);
    });
  };

  const handleCopy = async () => {
    const textToCopy = generatedPrompt || content;
    try {
      await navigator.clipboard.writeText(textToCopy);
      toast({
        title: "Copié !",
        description: "Le prompt a été copié dans le presse-papiers.",
      });
    } catch (_err) {
      toast({
        title: "Erreur",
        description: "Impossible de copier le prompt.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    const textToDownload = generatedPrompt || content;
    if (!textToDownload) return;

    const blob = new Blob([textToDownload], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title || "prompt"}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generatePreview = () => {
    setGeneratedPrompt(content);
    toast({
      title: "Aperçu généré",
      description: "Votre prompt est prêt à être utilisé.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Éditeur de Prompts Simplifié</CardTitle>
          <CardDescription>
            Créez et testez vos prompts rapidement
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="prompt-title">Titre du prompt</Label>
            <Input
              id="prompt-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nom de votre prompt"
            />
          </div>

          <div>
            <Label htmlFor="prompt-content">Contenu du prompt</Label>
            <Textarea
              id="prompt-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Rédigez votre prompt ici..."
              className="min-h-[300px] font-mono"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button onClick={handleSave} disabled={isSaving}>
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? "Sauvegarde..." : "Sauvegarder"}
            </Button>
            
            <Button variant="outline" onClick={generatePreview}>
              <Play className="w-4 h-4 mr-2" />
              Générer l'aperçu
            </Button>
            
            <Button variant="outline" onClick={handleCopy}>
              <Copy className="w-4 h-4 mr-2" />
              Copier
            </Button>
            
            <Button variant="outline" onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" />
              Télécharger
            </Button>
          </div>
        </CardContent>
      </Card>

      {generatedPrompt && (
        <Card>
          <CardHeader>
            <CardTitle>Aperçu du Prompt</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={generatedPrompt}
              readOnly
              className="min-h-[200px] font-mono text-sm"
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}