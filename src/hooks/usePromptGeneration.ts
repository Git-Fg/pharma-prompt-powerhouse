"use client";

import { useState, useCallback } from "react";
import { PromptVariable, VariableValue, PromptGenerationResult } from "@/types";

interface UsePromptGenerationProps {
  template: string;
  variables: PromptVariable[];
}

export const usePromptGeneration = ({
  template,
  variables,
}: UsePromptGenerationProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] =
    useState<PromptGenerationResult | null>(null);

  const generatePrompt = useCallback(
    async (values: Record<string, string | number | boolean>) => {
      setIsGenerating(true);

      try {
        // Simuler un délai de génération
        await new Promise((resolve) => setTimeout(resolve, 500));

        let filledTemplate = template;
        const variableValues: VariableValue[] = [];

        variables.forEach((variable) => {
          const value = values[variable.name] || "";
          const placeholder = `{{${variable.name}}}`;
          filledTemplate = filledTemplate.replace(
            new RegExp(placeholder, "g"),
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
        console.error("Erreur lors de la génération du prompt:", error);
      } finally {
        setIsGenerating(false);
      }
    },
    [template, variables]
  );

  const resetPrompt = useCallback(() => {
    setGeneratedPrompt(null);
  }, []);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      console.error("Erreur lors de la copie:", error);
      return false;
    }
  }, []);

  return {
    generatedPrompt,
    isGenerating,
    generatePrompt,
    resetPrompt,
    copyToClipboard,
  };
};
