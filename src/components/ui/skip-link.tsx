"use client";

import { cn } from "@/lib/utils";
import { Button } from "./button";

interface SkipLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function SkipLink({ href, children, className }: SkipLinkProps) {
  return (
    <Button
      asChild
      variant="secondary"
      size="sm"
      className={cn(
        "absolute top-4 left-4 z-50 -translate-y-full focus:translate-y-0 transition-transform duration-200",
        "sr-only focus:not-sr-only focus:fixed",
        className
      )}
    >
      <a href={href}>{children}</a>
    </Button>
  );
}