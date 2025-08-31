export interface PromptVariable {
  name: string;
  description: string;
  type: "string" | "number" | "boolean" | "select";
  required: boolean;
  defaultValue?: string | number | boolean;
 options?: string[];
}

export interface VariableValue {
  name: string;
  value: string | number | boolean;
}

export interface PromptGenerationResult {
 filledTemplate: string;
  variableValues: VariableValue[];
 timestamp: string;
}