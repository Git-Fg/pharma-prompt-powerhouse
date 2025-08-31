import { withContentCollections } from "@content-collections/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // Réactiver la validation TypeScript pour la qualité du code
    ignoreBuildErrors: false,
  },
  reactStrictMode: true,
  eslint: {
    // Réactiver le linting pour maintenir la qualité
    ignoreDuringBuilds: false,
  },

  // React Compiler pour les optimisations automatiques
  experimental: {
    reactCompiler: true,
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-icons",
      "react-markdown", // Bonne idée d'optimiser les dépendances MDX
    ],
  },
  // Image optimization
  images: {
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60,
  },
  // Compression
  compress: true,
  // Optimisations de performance
  poweredByHeader: false,
};

export default withContentCollections(nextConfig);
