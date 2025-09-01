// No import needed for MDXComponents type
import { CodeBlock } from "@/components/ui/code-block";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Fonction pour utiliser les composants MDX
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useMDXComponents(): Record<string, any> {
  return {
    // Composants de base stylisés
    h1: ({ children }: { children: React.ReactNode }) => (
      <h1 className="text-4xl font-bold tracking-tight mt-8 mb-4">
        {children}
      </h1>
    ),
    h2: ({ children }: { children: React.ReactNode }) => (
      <h2 className="text-3xl font-semibold tracking-tight mt-6 mb-3">
        {children}
      </h2>
    ),
    h3: ({ children }: { children: React.ReactNode }) => (
      <h3 className="text-2xl font-semibold tracking-tight mt-5 mb-2">
        {children}
      </h3>
    ),
    h4: ({ children }: { children: React.ReactNode }) => (
      <h4 className="text-xl font-semibold tracking-tight mt-4 mb-2">
        {children}
      </h4>
    ),
    p: ({ children }: { children: React.ReactNode }) => (
      <p className="leading-7 mb-4 text-base">
        {children}
      </p>
    ),
    code: ({ children, ...props }: { children: React.ReactNode } & React.HTMLAttributes<HTMLElement>) => (
      <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold" {...props}>
        {children}
      </code>
    ),
    pre: ({ children }: { children: React.ReactNode }) => {
      // Convert children to string if it's not already a string
      let codeString: string;
      if (typeof children === 'string') {
        codeString = children;
      } else {
        try {
          // Try to stringify children, but handle circular references
          const cache = new Set();
          codeString = JSON.stringify(children, (key, value) => {
            if (typeof value === 'object' && value !== null) {
              if (cache.has(value)) {
                // Circular reference found, return a placeholder
                return '[Circular Reference]';
              }
              cache.add(value);
            }
            return value;
          }, 2);
        } catch (_error) {
          // If stringify fails, convert to string directly
          codeString = String(children);
        }
      }
      return (
        <CodeBlock className="mb-4 mt-4">
          {codeString}
        </CodeBlock>
      );
    },
    
    // Composants pour les alertes et notes
    Alert: ({ children, type = "info" }: { children: React.ReactNode; type?: "info" | "destructive" }) => (
      <Alert className="my-4" variant={type === "info" ? "default" : type}>
        <AlertDescription>{children}</AlertDescription>
      </Alert>
    ),
    
    // Composants pour les onglets
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
    
    // Badges pour les tags
    Badge: ({ children, variant = "default" }: { children: React.ReactNode; variant?: "default" | "secondary" | "outline" | "destructive" }) => (
      <Badge variant={variant} className="mr-2">
        {children}
      </Badge>
    ),
    
    // Cartes
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    
    // Listes
    ul: ({ children }: { children: React.ReactNode }) => (
      <ul className="list-disc list-inside space-y-2 my-4">
        {children}
      </ul>
    ),
    ol: ({ children }: { children: React.ReactNode }) => (
      <ol className="list-decimal list-inside space-y-2 my-4">
        {children}
      </ol>
    ),
    li: ({ children }: { children: React.ReactNode }) => (
      <li className="text-foreground">{children}</li>
    ),
    
    // Liens
    a: ({ href, children }: { href: string; children: React.ReactNode }) => (
      <a
        href={href}
        className="text-primary hover:text-primary/80 underline underline-offset-4"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    
    // Blocs de citation
    blockquote: ({ children }: { children: React.ReactNode }) => (
      <blockquote className="border-l-4 border-primary/20 pl-4 italic text-muted-foreground bg-muted/30 py-2 rounded-r">
        {children}
      </blockquote>
    ),
    
    // Tableaux
    table: ({ children }: { children: React.ReactNode }) => (
      <div className="overflow-x-auto my-6">
        <table className="min-w-full divide-y divide-border border border-border rounded-lg">
          {children}
        </table>
      </div>
    ),
    th: ({ children }: { children: React.ReactNode }) => (
      <th className="px-6 py-3 bg-muted text-left text-xs font-medium text-muted-foreground uppercase tracking-wider border-b border-border">
        {children}
      </th>
    ),
    td: ({ children }: { children: React.ReactNode }) => (
      <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground border-b border-border">
        {children}
      </td>
    ),
    
    // Séparateurs
    hr: () => (
      <hr className="border-border my-8" />
    ),
  };
}