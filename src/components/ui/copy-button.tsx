"use client";

import { forwardRef, useState, ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface CopyButtonProps extends Omit<ComponentProps<typeof Button>, "onClick"> {
  text: string;
  label?: string;
}

export const CopyButton = forwardRef<HTMLButtonElement, CopyButtonProps>(
  ({ text, label = "Copier", className, children, ...props }, ref) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);

        toast.success("Copié !", {
          description: "Le contenu a été copié dans le presse-papiers.",
        });
      } catch (err) {
        console.error("Failed to copy text: ", err);
        toast.error("Erreur", {
          description: "Impossible de copier le contenu.",
        });
      }
    };

    return (
      <Button
        ref={ref}
        size="sm"
        variant="outline"
        onClick={copyToClipboard}
        className={cn(className)}
        {...props}
      >
        {copied ? (
          <>
            <Check className="size-4 mr-1" />
            Copié !
          </>
        ) : (
          <>
            <Copy className="size-4 mr-1" />
            {children || label}
          </>
        )}
      </Button>
    );
  }
);

CopyButton.displayName = "CopyButton";