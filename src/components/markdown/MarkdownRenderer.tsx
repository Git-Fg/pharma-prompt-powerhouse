"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import ShikiHighlighter, { isInlineCode } from "react-shiki";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { CopyButton } from "@/components/ui/copy-button";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

// Composant de coloration syntaxique personnalisé avec bouton de copie
const CodeHighlight = ({
  className,
  children,
  node,
  ...props
}: {
  className?: string;
  children?: React.ReactNode;
  node?: any;
  [key: string]: any;
}) => {
  const code = String(children).trim();
  const match = className?.match(/language-(\w+)/);
  const language = match ? match[1] : undefined;
  const isInline = node ? isInlineCode(node) : undefined;

  return !isInline ? (
    <div className="group relative">
      <ShikiHighlighter
        language={language}
        theme={{
          light: "github-light",
          dark: "github-dark",
        }}
        defaultColor="light"
        showLanguage
        addDefaultStyles
        className="rounded-lg overflow-hidden"
        {...props}
      >
        {code}
      </ShikiHighlighter>
      <CopyButton text={code} />
    </div>
  ) : (
    <code
      className={cn(
        "bg-muted px-1.5 py-0.5 rounded text-sm font-mono",
        className
      )}
      {...props}
    >
      {children}
    </code>
  );
};

export default function MarkdownRenderer({
  content,
  className,
}: MarkdownRendererProps) {
  const { theme } = useTheme();

  return (
    <div
      className={cn("prose prose-gray max-w-none dark:prose-invert", className)}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          code: CodeHighlight,
          table({ children }) {
            return (
              <div className="overflow-x-auto my-6">
                <table className="min-w-full divide-y divide-border border border-border rounded-lg">
                  {children}
                </table>
              </div>
            );
          },
          th({ children }) {
            return (
              <th className="px-6 py-3 bg-muted text-left text-xs font-medium text-muted-foreground uppercase tracking-wider border-b border-border">
                {children}
              </th>
            );
          },
          td({ children }) {
            return (
              <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground border-b border-border">
                {children}
              </td>
            );
          },
          blockquote({ children }) {
            return (
              <blockquote className="border-l-4 border-primary/20 pl-4 italic text-muted-foreground bg-muted/30 py-2 rounded-r">
                {children}
              </blockquote>
            );
          },
          h1({ children }) {
            return (
              <h1 className="text-3xl font-bold text-foreground mb-6 mt-8 scroll-m-20">
                {children}
              </h1>
            );
          },
          h2({ children }) {
            return (
              <h2 className="text-2xl font-semibold text-foreground mb-4 mt-8 scroll-m-20">
                {children}
              </h2>
            );
          },
          h3({ children }) {
            return (
              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6 scroll-m-20">
                {children}
              </h3>
            );
          },
          h4({ children }) {
            return (
              <h4 className="text-lg font-semibold text-foreground mb-2 mt-4 scroll-m-20">
                {children}
              </h4>
            );
          },
          ul({ children }) {
            return (
              <ul className="list-disc list-inside space-y-2 my-4">
                {children}
              </ul>
            );
          },
          ol({ children }) {
            return (
              <ol className="list-decimal list-inside space-y-2 my-4">
                {children}
              </ol>
            );
          },
          li({ children }) {
            return <li className="text-foreground">{children}</li>;
          },
          p({ children }) {
            return <p className="text-foreground leading-7 mb-4">{children}</p>;
          },
          a({ href, children }) {
            return (
              <a
                href={href}
                className="text-primary hover:text-primary/80 underline underline-offset-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            );
          },
          hr() {
            return <hr className="border-border my-8" />;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
