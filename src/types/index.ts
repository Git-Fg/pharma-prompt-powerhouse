/**
 * Point d'entrée principal pour tous les types de l'application
 *
 * Ce fichier ré-exporte les types organisés par responsabilité :
 * - content.ts : Types générés par content-collections
 * - app.ts : Types partagés spécifiques à l'application
 */

// Types de contenu (MDX, guides, etc.)
export * from './content';

// Types applicatifs partagés
export * from './app';
