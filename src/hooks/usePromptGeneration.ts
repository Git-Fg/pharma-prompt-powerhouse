'use client';
import { useState, useOptimistic, useTransition } from 'react';
import type {
  PromptVariable,
  VariableValue,
  PromptGenerationResult,
} from '@/types/app';

interface UsePromptGenerationProps {
  template: string;
  variables: PromptVariable[];
}

export const usePromptGeneration = ({
  template,
  variables,
}: UsePromptGenerationProps) => {
  const [isGenerating, startTransition] = useTransition();
  const [generatedPrompt, setGeneratedPrompt] =
    useState<PromptGenerationResult | null>(null);
  const [optimisticPrompt, addOptimisticPrompt] = useOptimistic<
    PromptGenerationResult | null,
    Record<string, string | number | boolean>
  >(generatedPrompt, (state, values) => {
    if (!state) return null;

    let filledTemplate = template;
    const variableValues: VariableValue[] = [];

    variables.forEach(variable => {
      const value = values[variable.name] || '';
      const placeholder = `{{${variable.name}}}`;
      filledTemplate = filledTemplate.replace(
        new RegExp(placeholder, 'g'),
        String(value)
      );
      variableValues.push({ name: variable.name, value });
    });

    return {
      filledTemplate,
      variableValues,
      timestamp: new Date().toISOString(),
    };
  });

  const generatePrompt = async (
    values: Record<string, string | number | boolean>
  ) => {
    // Ajouter le prompt optimiste immédiatement
    addOptimisticPrompt(values);

    startTransition(async () => {
      try {
        // Simuler un délai de génération
        await new Promise(resolve => setTimeout(resolve, 500));

        let filledTemplate = template;
        const variableValues: VariableValue[] = [];

        variables.forEach(variable => {
          const value = values[variable.name] || '';
          const placeholder = `{{${variable.name}}}`;
          filledTemplate = filledTemplate.replace(
            new RegExp(placeholder, 'g'),
            String(value)
          );
          variableValues.push({ name: variable.name, value });
        });

        const result: PromptGenerationResult = {
          filledTemplate,
          variableValues,
          timestamp: new Date().toISOString(),
        };

        setGeneratedPrompt(result);
      } catch (error) {
        console.error('Erreur lors de la génération du prompt:', error);
      }
    });
  };

  const resetPrompt = () => {
    setGeneratedPrompt(null);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      console.error('Erreur lors de la copie:', error);
      return false;
    }
  };

  return {
    generatedPrompt: optimisticPrompt || generatedPrompt,
    isGenerating,
    generatePrompt,
    resetPrompt,
    copyToClipboard,
  };
};
