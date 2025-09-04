// @ts-check
import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import reactPlugin from "eslint-plugin-react";
import hooksPlugin from "eslint-plugin-react-hooks";
// import tailwindcssPlugin from "eslint-plugin-tailwindcss"; // Disabled for v4 compatibility
import tseslint from "typescript-eslint";
import { FlatCompat } from "@eslint/eslintrc";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Import custom rules
import noHardcodedValues from "./eslint-rules/no-hardcoded-values.js";
import noArbitraryTailwindValues from "./eslint-rules/no-arbitrary-tailwind-values.js";

// Déclarer __filename et __dirname immédiatement après les imports
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Maintenant vous pouvez utiliser __dirname en toute sécurité
const compat = new FlatCompat({
  baseDirectory: __dirname
});

const eslintConfig = [...compat.extends("next/core-web-vitals", "next/typescript"), {
  ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts"]
}, // Fichiers à ignorer
{
  ignores: [
    "node_modules/",
    ".next/",
    ".content-collections/",
    "out/",
    "build/",
    "components.json",
    "postcss.config.mjs",
    "tailwind.config.ts",
    "**/*.d.ts",
    "coverage/",
    "playwright-report/",
    "test-results/",
    "**/*.min.js",
    "eslint-rules/", // Ignore custom rule files
  ],
}, // Configuration de base ESLint
js.configs.recommended, // Configuration TypeScript
...tseslint.configs.recommended, // Configuration React
{
  files: ["**/*.{ts,tsx,js,jsx}"],
  plugins: {
    react: reactPlugin,
  },
  rules: {
    ...reactPlugin.configs["jsx-runtime"].rules,
    "react/no-unescaped-entities": "off"
  },
  settings: {
    react: {
      version: "detect",
    },
  },
}, // Configuration React Hooks
{
  files: ["**/*.{ts,tsx,js,jsx}"],
  plugins: {
    "react-hooks": hooksPlugin,
  },
  rules: {
    ...hooksPlugin.configs.recommended.rules,
  },
}, // Configuration Next.js
{
  files: ["**/*.{ts,tsx,js,jsx}"],
  plugins: {
    "@next/next": nextPlugin,
  },
  rules: {
    ...nextPlugin.configs.recommended.rules,
    ...nextPlugin.configs["core-web-vitals"].rules,
  },
}, // Configuration Tailwind CSS - Disabled due to v4 compatibility issues
// {
//   files: ["**/*.{ts,tsx,js,jsx}"],
//   plugins: {
//     tailwindcss: tailwindcssPlugin,
//   },
//   rules: {
//     // Tailwind-specific rules
//     "tailwindcss/classnames-order": "error",
//     "tailwindcss/enforces-negative-arbitrary-values": "error",
//     "tailwindcss/enforces-shorthand": "error",
//     "tailwindcss/migration-from-tailwind-2": "error",
//     "tailwindcss/no-arbitrary-value": "warn",
//     "tailwindcss/no-custom-classname": "error",
//     "tailwindcss/no-unnecessary-arbitrary-value": "error",
//   },
//   settings: {
//     tailwindcss: {
//       config: "src/app/globals.css", // Point to CSS file with @theme
//       cssFiles: ["src/app/globals.css"],
//     },
//   },
// }, // Configuration Design System Enforcement
{
  files: ["src/**/*.{ts,tsx,js,jsx}"],
  ignores: [
    "src/lib/design-tokens.ts", // Allow design token definitions
    "src/lib/design-system-migrator.ts", // Allow migrator utilities
    "src/components/ui/**/*.{ts,tsx}", // Allow shadcn components
  ],
  plugins: {
    local: {
      rules: {
        "no-hardcoded-values": noHardcodedValues,
        "no-arbitrary-tailwind-values": noArbitraryTailwindValues,
      },
    },
  },
  rules: {
    // Custom rules for design system enforcement
    "local/no-hardcoded-values": ["warn", { // Changed from error to warn
      allowedPatterns: [
        "^var\\(--", // Allow CSS custom properties
        "^calc\\(", // Allow CSS calc functions
        "^theme\\(", // Allow Tailwind theme function
        "^hsl\\(", // Allow HSL functions with variables
        "^oklch\\(", // Allow OKLCH functions with variables
      ],
      enforceDesignTokens: true
    }],
    "local/no-arbitrary-tailwind-values": ["warn", { // Changed from error to warn
      allowedArbitraryValues: [
        "100vh", "100vw", "100%", "50%", "50vh", "50vw",
        "auto", "inherit", "initial", "unset", "none",
        "1fr", "minmax(0,1fr)", "1px", "2px", // Allow small borders
      ],
      strictMode: false
    }],
    
    // Enhanced React rules for better practices
    "react/jsx-props-no-spreading": "warn",
    "react/prop-types": "off", // TypeScript handles this
    "react/jsx-boolean-value": ["error", "never"],
    "react/jsx-curly-brace-presence": ["error", "never"],
    "react/self-closing-comp": "error",
    "react/jsx-fragments": ["error", "syntax"],
  },
}, // Configuration générale pour les variables non utilisées
{
  files: ["**/*.{ts,tsx}"],
  languageOptions: {
    parserOptions: {
      project: './tsconfig.json',
      tsconfigRootDir: import.meta.dirname,
    },
  },
  rules: {
    "no-unused-vars": "off", // Désactivé car géré par TypeScript
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "prefer-const": "error",
    
    // Enhanced TypeScript rules
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    // Disable rules that require type information for config files
    "@typescript-eslint/prefer-nullish-coalescing": "off",
    "@typescript-eslint/prefer-optional-chain": "off",
  },
}, // Configuration for config files without type checking
{
  files: [
    "**/*.config.{js,mjs,ts}",
    "**/*.config.*.{js,mjs,ts}",
    "eslint.config.mjs",
    "next.config.ts",
    "tailwind.config.ts",
    "postcss.config.mjs",
    "vitest.config.ts",
    "playwright.config.ts",
  ],
  ...tseslint.configs.disableTypeChecked,
  rules: {
    "no-console": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-explicit-any": "off",
  },
}, // Configuration pour les composants UI shadcn
{
  files: ["src/components/ui/**/*.{ts,tsx}"],
  rules: {
    "react/display-name": "off",
    "prefer-const": "warn",
    "@typescript-eslint/no-unused-vars": "off",
  },
}, // Configuration pour les fichiers JavaScript purs
{
  files: ["**/*.{js,mjs,jsx}"],
  ...tseslint.configs.disableTypeChecked,
}];

export default eslintConfig;
