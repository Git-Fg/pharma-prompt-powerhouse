"use client";

import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface CopyButtonProps {
  text: string;
  label?: string;
}

export function CopyButton({ text, label = "Copier" }: CopyButtonProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);

      toast({
        title: "Copié !",
        description: "Le contenu a été copié dans le presse-papiers.",
      });
    } catch (err) {
      console.error("Failed to copy text: ", err);
      toast({
        title: "Erreur",
        description: "Impossible de copier le contenu.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button size="sm" variant="outline" onClick={copyToClipboard}>
      <Copy className="w-4 h-4 mr-1" />
      {copied ? "Copié !" : label}
    </Button>
  );
}