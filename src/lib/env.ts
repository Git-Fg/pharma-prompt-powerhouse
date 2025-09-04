// =================================================================
// CONFIGURATION D'ENVIRONNEMENT CENTRALISÉE
// =================================================================

/**
 * Configuration centralisée des variables d'environnement.
 * Fournit des fallbacks sécurisés et une validation des variables critiques.
 */
export const env = {
  // URL de base de l'application
  get baseUrl(): string {
    // En production Vercel, utiliser VERCEL_URL si disponible
    if (process.env.VERCEL_URL && process.env.NODE_ENV === 'production') {
      return `https://${process.env.VERCEL_URL}`;
    }
    
    // Sinon utiliser NEXT_PUBLIC_BASE_URL ou fallback
    return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  },

  // URL publique (pour le client)
  get publicBaseUrl(): string {
    return process.env.NEXT_PUBLIC_BASE_URL || 'https://pharma-prompt-powerhouse.vercel.app';
  },

  // Configuration de l'application
  get appConfig() {
    return {
      name: 'Pharma Prompt Powerhouse',
      description: 'Mon carnet de notes, partagé avec ❤️ pour la communauté.',
      author: 'Git-Fg',
      repository: 'https://github.com/Git-Fg/pharma-prompt-powerhouse',
      version: process.env.npm_package_version || '1.0.0',
    };
  },

  // Environnement actuel
  get isDevelopment(): boolean {
    return process.env.NODE_ENV === 'development';
  },

  get isProduction(): boolean {
    return process.env.NODE_ENV === 'production';
  },

  get isTest(): boolean {
    return process.env.NODE_ENV === 'test';
  },

  // Configuration Analytics (si utilisée)
  get analytics() {
    return {
      vercelAnalyticsId: process.env.NEXT_PUBLIC_VERCEL_ANALYTICS_ID,
      googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID,
    };
  },
} as const;

/**
 * Valide les variables d'environnement critiques au démarrage
 */
export function validateEnvironment(): void {
  const requiredVars: Array<[string, string | undefined]> = [
    ['NODE_ENV', process.env.NODE_ENV],
  ];

  const missingVars = requiredVars
    .filter(([, value]) => !value)
    .map(([name]) => name);

  if (missingVars.length > 0) {
    throw new Error(
      `Variables d'environnement manquantes: ${missingVars.join(', ')}`
    );
  }

  // Avertissements pour les variables optionnelles mais recommandées
  if (!process.env.NEXT_PUBLIC_BASE_URL && process.env.NODE_ENV === 'production') {
    console.warn('⚠️ NEXT_PUBLIC_BASE_URL non définie en production');
  }
}

// Validation automatique en développement
if (env.isDevelopment) {
  try {
    validateEnvironment();
  } catch (error) {
    console.error('❌ Erreur de configuration:', error);
  }
}