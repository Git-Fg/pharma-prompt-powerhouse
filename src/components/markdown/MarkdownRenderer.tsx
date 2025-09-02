// src/components/markdown/MarkdownRenderer.tsx
'use client';

import React from 'react';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

/**
 * Renderer simple pour le contenu Markdown dans les blocs de contenu.
 * Pour l'instant, utilise un rendu basique avec dangerouslySetInnerHTML.
 * TODO: Implémenter un vrai parser Markdown si besoin (remarked, etc.)
 */
export function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  // Rendu basique du Markdown pour l'instant - on peut améliorer avec un vrai parser plus tard
  const processedContent = content
    // Headers
    .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mb-3 text-foreground">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold mb-4 text-foreground">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mb-6 text-foreground">$1</h1>')
    // Bold and italic
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Code inline
    .replace(/`(.*?)`/g, '<code class="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:underline">$1</a>')
    // Line breaks
    .replace(/\n\n/g, '</p><p class="mb-4">')
    .replace(/\n/g, '<br />');

  return (
    <div 
      className={`prose prose-neutral max-w-none ${className}`}
      dangerouslySetInnerHTML={{ 
        __html: `<p class="mb-4">${processedContent}</p>` 
      }}
    />
  );
}