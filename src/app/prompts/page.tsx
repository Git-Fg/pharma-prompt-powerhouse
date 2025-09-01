import { allPrompts } from "content-collections";
import { PromptListClient } from "@/components/prompts/PromptListClient";

export default function PromptsPage() {
  const prompts = allPrompts;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">La Banque de Prompts</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Une collection de prompts prêts à l'emploi, conçus pour des cas d'usage pharmaceutiques concrets.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <PromptListClient initialPrompts={prompts} />
      </div>
    </div>
  );
}
