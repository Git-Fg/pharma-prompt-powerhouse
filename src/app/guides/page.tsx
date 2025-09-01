import { allGuides } from "content-collections";
import { GuideList } from "@/components/guides/GuideList";

export default function GuidesPage() {
  const guides = allGuides;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Mes Fiches & Méthodes</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Voici les fiches de synthèse que j'ai créées au fil de mes
              révisions. Elles représentent ma méthodologie de structuration de
              l'information.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <GuideList initialGuides={guides} />
      </div>
    </div>
  );
}
