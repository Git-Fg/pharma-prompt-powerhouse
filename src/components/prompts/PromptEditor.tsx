"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { PromptVariable } from "@/types";

interface PromptEditorProps {
  template: string;
  variables: PromptVariable[];
  onGenerate: (filledTemplate: string) => void;
  className?: string;
}

export const PromptEditor: React.FC<PromptEditorProps> = ({
  template,
  variables,
  onGenerate,
  className = "",
}) => {
  const [values, setValues] = useState<
    Record<string, string | number | boolean>
  >({});

  const handleValueChange = (
    variableName: string,
    value: string | number | boolean
  ) => {
    setValues((prev) => ({ ...prev, [variableName]: value }));
  };

  const generatePrompt = () => {
    let filledTemplate = template;
    variables.forEach((variable) => {
      const value = values[variable.name] || "";
      const placeholder = `{{${variable.name}}}`;
      filledTemplate = filledTemplate.replace(
        new RegExp(placeholder, "g"),
        String(value)
      );
    });
    onGenerate(filledTemplate);
  };

  const isReadyToGenerate = variables.every(
    (variable) => !variable.required || values[variable.name] !== undefined
  );

  return (
    <div className={`space-y-6 ${className}`}>
      <Card>
        <CardHeader>
          <CardTitle>Personnalisez votre prompt</CardTitle>
          <CardDescription>
            Remplissez les champs ci-dessous pour adapter le prompt à vos
            besoins
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {variables.map((variable) => (
            <div key={variable.name} className="space-y-2">
              <Label htmlFor={variable.name}>
                {variable.name}
                {variable.required && (
                  <span className="text-red-500 ml-1">*</span>
                )}
              </Label>
              {variable.description && (
                <p className="text-sm text-muted-foreground">
                  {variable.description}
                </p>
              )}

              {variable.type === "select" ? (
                <Select
                  value={String(values[variable.name] || "")}
                  onValueChange={(value) =>
                    handleValueChange(variable.name, value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={`Sélectionnez ${variable.name}`}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {variable.options?.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : variable.type === "textarea" ? (
                <Textarea
                  id={variable.name}
                  placeholder={
                    variable.placeholder || `Entrez ${variable.name}`
                  }
                  value={String(values[variable.name] || "")}
                  onChange={(e) =>
                    handleValueChange(variable.name, e.target.value)
                  }
                  rows={3}
                />
              ) : variable.type === "boolean" ? (
                <Select
                  value={String(values[variable.name] || "")}
                  onValueChange={(value) =>
                    handleValueChange(variable.name, value === "true")
                  }
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={`Sélectionnez ${variable.name}`}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Oui</SelectItem>
                    <SelectItem value="false">Non</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  id={variable.name}
                  type={variable.type === "number" ? "number" : "text"}
                  placeholder={
                    variable.placeholder || `Entrez ${variable.name}`
                  }
                  value={String(values[variable.name] || "")}
                  onChange={(e) =>
                    handleValueChange(
                      variable.name,
                      variable.type === "number"
                        ? Number(e.target.value)
                        : e.target.value
                    )
                  }
                />
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Aperçu du prompt</CardTitle>
          <CardDescription>
            Voici comment votre prompt apparaîtra une fois personnalisé
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm whitespace-pre-wrap">
            {template.split("\n").map((line, index) => {
              let processedLine = line;
              variables.forEach((variable) => {
                const placeholder = `{{${variable.name}}}`;
                const value = values[variable.name] || placeholder;
                processedLine = processedLine.replace(
                  new RegExp(placeholder, "g"),
                  String(value)
                );
              });
              return <div key={index}>{processedLine}</div>;
            })}
          </div>
        </CardContent>
      </Card>

      <Button
        onClick={generatePrompt}
        disabled={!isReadyToGenerate}
        className="w-full"
      >
        Générer le prompt
      </Button>
    </div>
  );
};
