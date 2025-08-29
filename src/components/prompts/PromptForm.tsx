"use client";

import { useActionState, useOptimistic } from "react";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Textarea,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import { Loader2, Sparkles, Copy, Check } from "lucide-react";
import { useState } from "react";

interface PromptFormProps {
  className?: string;
  onSubmit?: (prompt: string) => void;
}

interface PromptData {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
}

// Action simulée pour la démonstration
async function submitPromptAction(prevState: any, formData: FormData) {
  "use server";

  const prompt = formData.get("prompt") as string;
  const category = formData.get("category") as string;

  if (!prompt.trim()) {
    return { error: "Le prompt ne peut pas être vide" };
  }

  if (prompt.length < 10) {
    return { error: "Le prompt doit contenir au moins 10 caractères" };
  }

  // Simulation d'un délai de traitement
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    success: true,
    prompt: {
      id: Date.now().toString(),
      title: prompt.substring(0, 50) + "...",
      content: prompt,
      category,
      tags: [],
    },
  };
}

export function PromptForm({ className, onSubmit }: PromptFormProps) {
  const [state, formAction, isPending] = useActionState(
    submitPromptAction,
    null
  );
  const [optimisticPrompts, setOptimisticPrompts] = useOptimistic<PromptData[]>(
    []
  );
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);

  const handleSubmit = (formData: FormData) => {
    const prompt = formData.get("prompt") as string;
    const category = formData.get("category") as string;

    // Ajout optimiste
    const newPrompt: PromptData = {
      id: `temp-${Date.now()}`,
      title: prompt.substring(0, 50) + "...",
      content: prompt,
      category,
      tags: [],
    };

    setOptimisticPrompts((prev) => [...prev, newPrompt]);

    // Appel de l'action
    formAction(formData);

    // Callback optionnel
    if (onSubmit) {
      onSubmit(prompt);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedPrompt(text);
      setTimeout(() => setCopiedPrompt(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Formulaire principal */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Créer un nouveau prompt
          </CardTitle>
          <CardDescription>
            Utilisez ce formulaire pour créer des prompts efficaces et
            réutilisables
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="category">Catégorie</Label>
              <select
                id="category"
                name="category"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                defaultValue="general"
              >
                <option value="general">Général</option>
                <option value="clinical">Cas clinique</option>
                <option value="research">Recherche</option>
                <option value="education">Éducation</option>
                <option value="analysis">Analyse</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="prompt">Prompt</Label>
              <Textarea
                id="prompt"
                name="prompt"
                placeholder="Entrez votre prompt ici... Utilisez des instructions claires et spécifiques pour obtenir les meilleurs résultats."
                className="min-h-[120px] resize-y"
                required
              />
              <p className="text-xs text-muted-foreground">
                Astuce : Soyez spécifique, incluez le contexte et définissez le
                format de sortie souhaité.
              </p>
            </div>

            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Génération en cours...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Générer le prompt
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Messages d'erreur */}
      {state?.error && (
        <Card className="border-destructive/50 bg-destructive/10">
          <CardContent className="pt-6">
            <p className="text-sm text-destructive">{state.error}</p>
          </CardContent>
        </Card>
      )}

      {/* Messages de succès */}
      {state?.success && (
        <Card className="border-green-500/50 bg-green-500/10">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-green-700 dark:text-green-400">
                Prompt créé avec succès !
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(state.prompt.content)}
                className="h-8 w-8 p-0"
              >
                {copiedPrompt === state.prompt.content ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Prompts optimistes */}
      {optimisticPrompts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Prompts en cours de traitement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {optimisticPrompts.map((prompt) => (
                <div
                  key={prompt.id}
                  className="flex items-center justify-between rounded-lg border bg-muted/50 p-3"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium">{prompt.title}</p>
                    <p className="text-xs text-muted-foreground">
                      Catégorie: {prompt.category}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                    <span className="text-xs text-muted-foreground">
                      Traitement...
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
