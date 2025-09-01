"use client";

import { MDXContent } from "@content-collections/mdx/react";
import { useMDXComponents } from "@/components/mdx-components";

interface MDXRendererProps {
  code: string;
  components?: Record<string, React.ComponentType<unknown>>;
}

export function MDXRenderer({ code, components: customComponents }: MDXRendererProps) {
  const defaultComponents = useMDXComponents();
  
  return (
    <MDXContent 
      code={code} 
      components={{ ...defaultComponents, ...customComponents }} 
    />
  );
}