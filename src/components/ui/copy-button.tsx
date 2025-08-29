"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  text: string;
  className?: string;
  size?: "sm" | "icon" | "lg";
}

export function CopyButton({ text, className, size = "sm" }: CopyButtonProps) {
  const [hasCopied, setHasCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const sizeClasses = {
    sm: "h-8 w-8",
    icon: "h-10 w-10",
    lg: "h-12 w-12",
  };

  const iconSizes = {
    sm: "h-4 w-4",
    icon: "h-5 w-5",
    lg: "h-6 w-6",
  };

  return (
    <Button
      variant="ghost"
      size={size}
      className={cn(
        "absolute right-2 top-2 p-0 opacity-0 transition-all duration-200 hover:bg-accent hover:text-accent-foreground group-hover:opacity-100 hover:scale-105",
        sizeClasses[size],
        className
      )}
      onClick={copyToClipboard}
      aria-label={hasCopied ? "Code copié !" : "Copier le code"}
    >
      {hasCopied ? (
        <Check className={cn("text-green-600", iconSizes[size])} />
      ) : (
        <Copy className={cn(iconSizes[size])} />
      )}
      <span className="sr-only">
        {hasCopied ? "Code copié !" : "Copier le code"}
      </span>
    </Button>
  );
}
