// @ts-check
import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import tseslint from "typescript-eslint";

export default tseslint.config(
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

  // Configurations de base
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // >>> NOUVEAU : Intégration des règles recommandées de Next.js <<<
  {
    plugins: { "@next/next": nextPlugin },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      // Règles personnalisées pour le projet qui peuvent écraser les recommandations
      "react/no-unescaped-entities": "off",
      "@next/next/no-page-custom-font": "off",
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
  
  // Configuration générale pour les variables non utilisées
  {
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
);
