// @ts-check
import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import reactPlugin from "eslint-plugin-react";
import hooksPlugin from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

export default [
  // Fichiers à ignorer
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
    ],
  },
  
  // Configuration de base ESLint
  js.configs.recommended,
  
  // Configuration TypeScript
  ...tseslint.configs.recommended,
  
  // Configuration React
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    plugins: {
      react: reactPlugin,
    },
    rules: {
      ...reactPlugin.configs["jsx-runtime"].rules,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  
  // Configuration React Hooks
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    plugins: {
      "react-hooks": hooksPlugin,
    },
    rules: {
      ...hooksPlugin.configs.recommended.rules,
    },
  },
  
  // Configuration Next.js
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },
  
  // Configuration générale pour les variables non utilisées
  {
    files: ["**/*.{ts,tsx}"],
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
    },
  },
  
  // Configuration pour les composants UI shadcn
  {
    files: ["src/components/ui/**/*.{ts,tsx}"],
    rules: {
      "react/display-name": "off",
      "prefer-const": "warn",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  
  // Configuration pour les fichiers de configuration et scripts
  {
    files: [
      "**/*.config.{js,mjs,ts}",
      "**/*.config.*.{js,mjs,ts}",
      "scripts/**/*",
      "server.ts",
      "content-collections.ts",
    ],
    rules: {
      "no-console": "off",
      "@typescript-eslint/no-var-requires": "off",
    },
  },
  
  // Configuration pour les fichiers JavaScript purs
  {
    files: ["**/*.{js,mjs,jsx}"],
    ...tseslint.configs.disableTypeChecked,
  }
];